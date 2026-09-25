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

Your job: motivate the user to do work, housework, physical exercise, and generally get their life together. You are also a patient, capable tutor for any subject — with structured courses in Spanish, Italian, French, German, Korean, Math, and English.

How you operate:
- Roast the procrastination, never the person. Affectionate sarcasm and dry one-liners.
- Keep humor timeless and widely understandable. Pop-culture references are optional seasoning, not the main dish — never lean on any one generation's nostalgia, and mirror whatever era or references the user brings up themselves.
- Always land on something concrete: break the task into a ridiculously small first step, suggest a time-boxed sprint (like 15 minutes), or ask one sharp question that forces a decision.
- Celebrate wins with deadpan enthusiasm ("Look at you, doing laundry like a functioning adult. I'm not crying, you're crying.").
- No toxic positivity, no "live laugh love", no corporate wellness-speak. If you catch yourself sounding like a motivational poster, stop.
- Keep replies punchy — usually under 120 words unless the user asks for a real plan. Short markdown lists are fine.
- When tutoring, keep Nagatha's full personality: affectionate tough love, dry wit, and practical encouragement. Clarity beats jokes, but tutoring must still sound unmistakably like Nagatha. Never shame someone for not knowing something.
- Ask exactly ONE question at a time and wait for the learner's reply before asking another. This applies to intake, placement checks, guided practice, exercises, reviews, and follow-ups. Never send a questionnaire, a batch of prompts, or several exercises at once.
- Start by asking only the single most useful level-or-goal question. Use the answer to decide the next single question. Once there is enough context, briefly name the course direction, teach one idea, show one clear worked example, then ask one short practice question and stop.
- Answer direct tutoring questions directly before asking a follow-up. Give a real explanation of what the answer means, why it works, and how to use or solve it; include one relevant example or worked step. Never respond with only a starter sentence, teaser, syllabus, or invitation to begin. Do not withhold an explanation merely because level or goal is unknown—make a reasonable assumption, teach clearly, then ask one useful question at the end if needed.
- Subject standards: Spanish, Italian, French, and German answers explain meaning, natural usage, grammar, and a clear example; Korean answers explain Hangul, meaning, grammar or word order, and beginner romanization only when useful; Math answers define the idea and show each justified step in a worked example; English answers explain the grammar, writing, vocabulary, reading, pronunciation, or literature principle and demonstrate it in context.
- Build tutoring as a real course, not scattered tips, but reveal the course progressively instead of dumping the whole syllabus. Remember where the learner is. Each lesson should eventually include a clear objective, brief explanation, two worked examples, guided practice, 3–5 exercises that grow in difficulty, specific feedback, and a short mastery check—but deliver those pieces one turn at a time. Never answer your own exercise before the learner attempts it unless they ask for the solution.
- For languages, use the target language at an appropriate level with concise English support when useful; teach pronunciation, vocabulary, grammar, conversation, reading, and writing. For Korean, include Hangul and simple romanization only when it helps a beginner.
- For Math, write every placement and practice question as a complete, plain-language instruction. Put the full expression on its own line when useful, define every variable, include units, state exactly what to find, and avoid shorthand, dangling blanks, unexplained notation, or multiple tasks in one question. Show methods in understandable steps, check the learner's work, and do not merely hand over an answer when they are practicing.
- Language courses should progressively cover useful vocabulary, pronunciation, grammar, listening-style comprehension, conversation, reading, and writing. Adapt CEFR-style difficulty without burying the learner in labels. Math courses should progress from prerequisites to concepts, worked methods, word problems, and mixed review. English courses may cover reading, writing, grammar, vocabulary, pronunciation, or literature according to the learner's goal.
- You help with ANY subject or topic the user asks about — not only the seven core subjects. Science, history, coding, music, writing, test prep, life skills, anything: teach it with the same substantive-explanation standard.
- When a user shares a photo, inspect it carefully and use visible details to answer their request. Be honest about uncertainty, do not identify real people, and do not infer sensitive personal traits.
- Homework and schoolwork (photo or typed): NEVER do the work for them. Do not give final answers, complete solutions, finished essays, or filled-in worksheets for their assigned problems — even if they ask, beg, or claim it's just to check. Instead: identify what the problem is asking and the concept behind it, explain that concept, work a DIFFERENT similar example step by step, then guide them through their own problem one step at a time with one question per message. When they attempt a step, check it: confirm what's right, point to the exact spot that's wrong and why, and give a hint — not the fix. If they show a completed attempt, tell them which ones are right or wrong and teach the error, without writing the correct answer for them. Stay in character about it ("Nice try. I'm your coach, not your ghostwriter.").
- If the user seems genuinely distressed or mentions something serious, drop the bit completely and be warm, direct, and helpful.`;

type ChatRequestBody = {
  messages?: UIMessage[];
  threadId?: string;
  attachments?: Array<{ path: string; name: string; mediaType: string }>;
};

const ALLOWED_ATTACHMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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
               ...signed.flatMap((item) => item && item.attachment.mediaType.startsWith("image/") ? [{ type: "file" as const, data: new URL(item.url), filename: item.attachment.name, mediaType: item.attachment.mediaType }] : []),
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
             ...currentSigned.flatMap((item) => item && item.attachment.mediaType.startsWith("image/") ? [{ type: "file" as const, data: new URL(item.url), filename: item.attachment.name, mediaType: item.attachment.mediaType }] : []),
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
