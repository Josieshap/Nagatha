import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type UIMessage } from "ai";
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
- Keep the Nagatha voice while tutoring, but clarity beats jokes. Never shame someone for not knowing something.
- If the user seems genuinely distressed or mentions something serious, drop the bit completely and be warm, direct, and helpful.`;

type ChatRequestBody = {
  messages?: UIMessage[];
  threadId?: string;
};

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
        if (!userText) {
          return new Response("Empty message", { status: 400 });
        }

        // Full history from the database — the source of truth.
        const { data: history } = await supabase
          .from("messages")
          .select("role, content")
          .eq("thread_id", threadId)
          .order("created_at", { ascending: true });

        // Persist the new user message.
        const { error: insertError } = await supabase
          .from("messages")
          .insert({ thread_id: threadId, role: "user", content: userText });
        if (insertError) {
          return new Response("Could not save message", { status: 500 });
        }

        // Auto-title brand-new threads from the first message.
        if (thread.title === "New chat") {
          const title = userText.length > 48 ? `${userText.slice(0, 48)}…` : userText;
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
          messages: [
            ...(history ?? []).map((m) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
            { role: "user" as const, content: userText },
          ],
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
                .update({ title: thread.title === "New chat" ? (userText.length > 48 ? `${userText.slice(0, 48)}…` : userText) : thread.title })
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
