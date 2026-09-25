import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";
import { createUserSupabaseClient } from "@/lib/supabase-user.server";

const SYSTEM_PROMPT = `You are Nagatha, the user's tough-love accountability buddy: the sarcastic best friend who doesn't do coddling but genuinely cares, and it shows.

Your job: motivate the user to do work, housework, physical exercise, and generally get their life together. You are also a patient, capable tutor for Spanish, Italian, French, German, Korean, Math, and English.

How you operate:
- Roast the procrastination, never the person. Affectionate sarcasm and dry one-liners.
- Keep humor timeless and widely understandable. Pop-culture references are optional seasoning, not the main dish — never lean on any one generation's nostalgia, and mirror whatever era or references the user brings up themselves.
- Always land on something concrete: break the task into a ridiculously small first step, suggest a time-boxed sprint (like 15 minutes), or ask one sharp question that forces a decision.
- Celebrate wins with deadpan enthusiasm ("Look at you, doing laundry like a functioning adult. I'm not crying, you're crying.").
- No toxic positivity, no "live laugh love", no corporate wellness-speak. If you catch yourself sounding like a motivational poster, stop.
- Keep replies punchy — usually under 120 words unless the user asks for a real plan. Short markdown lists are fine.
- When tutoring, first infer or briefly ask the learner's level and goal. Explain one idea at a time, model a clear example, then give a short practice question and wait for their answer. Correct mistakes specifically and kindly. For languages, use the target language at an appropriate level with concise English support when useful; teach pronunciation, vocabulary, grammar, conversation, reading, and writing. For Korean, include Hangul and a simple romanization only when it helps a beginner. For Math, show the method in understandable steps, check the learner's work, and do not merely hand over an answer when they are practicing.
- Build tutoring as a real course, not scattered tips. After a short level-and-goal check, propose a concise sequence of lessons and remember where the learner is in it. Each lesson should have: a clear objective, a brief explanation, two worked examples, guided practice, 3–5 exercises that grow in difficulty, specific feedback after the learner answers, and a short recap or mastery check before advancing. Never answer your own exercises before the learner attempts them unless they ask for the solution.
- Language courses should progressively cover useful vocabulary, pronunciation, grammar, listening-style comprehension, conversation, reading, and writing. Adapt CEFR-style difficulty without burying the learner in labels. Math courses should progress from prerequisites to concepts, worked methods, word problems, and mixed review. English courses may cover reading, writing, grammar, vocabulary, pronunciation, or literature according to the learner's goal.
- When a message includes a voice memo transcript, treat it as speech the learner recorded. State what you heard, compare it with any target phrase in the conversation, identify one or two likely pronunciation trouble spots, give a simple mouth/sound cue and syllable or stress guide, then ask for one focused retry. Never claim certainty about subtle accent features that a transcript cannot establish.
- When a user shares a photo, inspect it carefully and use visible details to answer their request. Be honest about uncertainty, do not identify real people, and do not infer sensitive personal traits. For homework, explain and teach rather than merely supplying answers.
- Keep the Nagatha voice while tutoring, but clarity beats jokes. Never shame someone for not knowing something.
- If the user seems genuinely distressed or mentions something serious, drop the bit completely and be warm, direct, and helpful.`;

type ChatRequestBody = {
  messages?: UIMessage[];
  threadId?: string;
  attachments?: Array<{ path: string; name: string; mediaType: string }>;
};

const ALLOWED_ATTACHMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "audio/wav"]);

function validAttachments(value: ChatRequestBody["attachments"], userId: string, threadId: string) {
  if (!Array.isArray(value) || value.length > 3) return null;
  const prefix = `${userId}/${threadId}/`;
  const valid = value.every((item) => item && typeof item.path === "string" && item.path.startsWith(prefix) && typeof item.name === "string" && item.name.length <= 255 && ALLOWED_ATTACHMENT_TYPES.has(item.mediaType));
  return valid ? value : null;
}

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response("Unauthorized", { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length);

        let supabase;
        try {
          supabase = createUserSupabaseClient(token);
        } catch {
          return new Response("Backend not configured", { status: 500 });
        }

        const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
        if (claimsError || !claimsData?.claims?.sub) {
          return new Response("Unauthorized", { status: 401 });
        }

        const body = (await request.json()) as ChatRequestBody;
        const { messages, threadId } = body;
        if (!Array.isArray(messages) || typeof threadId !== "string") {
          return new Response("Messages and threadId are required", { status: 400 });
        }

        // Verify the thread belongs to this user (RLS also enforces this).
        const { data: thread } = await supabase
          .from("threads")
          .select("id, title")
          .eq("id", threadId)
          .single();
        if (!thread) {
          return new Response("Thread not found", { status: 404 });
        }

        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.role !== "user") {
          return new Response("Last message must be from the user", { status: 400 });
        }
        const userText = messageText(lastMessage).trim();
        const attachments = validAttachments(body.attachments ?? [], claimsData.claims.sub, threadId);
        if (!attachments) {
          return new Response("Invalid attachment", { status: 400 });
        }
        if (!userText && attachments.length === 0) {
          return new Response("Empty message", { status: 400 });
        }
        const displayText = userText || "Photo reference";

        // Full history from the database — the source of truth.
        const { data: history } = await supabase
          .from("messages")
          .select("role, content, attachments")
          .eq("thread_id", threadId)
          .order("created_at", { ascending: true });

        // Persist the new user message.
        const { error: insertError } = await supabase
          .from("messages")
          .insert({ thread_id: threadId, role: "user", content: userText, attachments });
        if (insertError) {
          return new Response("Could not save message", { status: 500 });
        }

        // Auto-title brand-new threads from the first message.
        if (thread.title === "New chat") {
          const title = displayText.length > 48 ? `${displayText.slice(0, 48)}…` : displayText;
          await supabase.from("threads").update({ title }).eq("id", threadId);
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: {
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
          fetch: runIdFetch.fetch,
        });
        const modelMessages: ModelMessage[] = [];
        for (const message of history ?? []) {
          if (message.role === "assistant") {
            modelMessages.push({ role: "assistant", content: message.content });
            continue;
          }
          const saved = validAttachments(message.attachments as ChatRequestBody["attachments"], claimsData.claims.sub, threadId) ?? [];
          const signed = await Promise.all(saved.map(async (attachment) => {
            const { data } = await supabase.storage.from("chat-images").createSignedUrl(attachment.path, 3600);
            return data?.signedUrl ? { attachment, url: data.signedUrl } : null;
          }));
          modelMessages.push({
            role: "user",
            content: [
               ...signed.filter((item) => item !== null && item.attachment.mediaType.startsWith("image/")).map(({ attachment, url }) => ({ type: "file" as const, data: new URL(url), filename: attachment.name, mediaType: attachment.mediaType })),
              { type: "text" as const, text: message.content },
            ],
          });
        }

        const currentSigned = await Promise.all(attachments.map(async (attachment) => {
          const { data } = await supabase.storage.from("chat-images").createSignedUrl(attachment.path, 3600);
          return data?.signedUrl ? { attachment, url: data.signedUrl } : null;
        }));
        modelMessages.push({
          role: "user",
          content: [
             ...currentSigned.filter((item) => item !== null && item.attachment.mediaType.startsWith("image/")).map(({ attachment, url }) => ({ type: "file" as const, data: new URL(url), filename: attachment.name, mediaType: attachment.mediaType })),
            { type: "text" as const, text: userText || "Please look at this photo and help me with what you see." },
          ],
        });

        const result = streamText({
          model: lovable.responses("openai/gpt-6-astra"),
          system: SYSTEM_PROMPT,
          maxRetries: 0,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "medium",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
          messages: modelMessages,
        });

        const response = result.toUIMessageStreamResponse({
          originalMessages: messages,
          headers: getLovableAiGatewayResponseHeaders(undefined),
          onFinish: async ({ responseMessage }) => {
            const text = messageText(responseMessage).trim();
            if (text) {
              await supabase
                .from("messages")
                .insert({ thread_id: threadId, role: "assistant", content: text });
              // Bump updated_at so the sidebar ordering stays fresh.
              await supabase
                .from("threads")
                .update({ title: thread.title === "New chat" ? (displayText.length > 48 ? `${displayText.slice(0, 48)}…` : displayText) : thread.title })
                .eq("id", threadId);
            }
          },
          onError: (error) => {
            console.error("[chat] stream error:", error);
            return error instanceof Error ? error.message : "The chat request failed.";
          },
        });

        return withLovableAiGatewayRunIdHeader(response, runIdFetch);
      },
    },
  },
});
