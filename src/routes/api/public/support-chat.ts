import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
} from "@/lib/ai-gateway.server";
import { nagathaSystemPrompt } from "@/lib/nagatha-voice.server";

// Public by design: answers app-support questions only, reads/writes no user data.
const SUPPORT_PROMPT = nagathaSystemPrompt(`You are Nagatha working the app's help desk for testers and new users. Stay fully in character: dry, cheeky, affectionate snark, never mean — but every reply must actually solve the problem.

What you know about the app:
- Sign in with email and password. Apple and Google sign-in are temporarily hidden while being tested. New accounts get a confirmation email; check spam if it doesn't arrive.
- Chats, tasks, lesson progress and nag settings are saved to the person's account and come back on any device after signing in.
- Main menu (the three-line button at top left): new chat, chat history, Lessons, Progress, Planner, Reality check ("How long will it actually take?"), nag settings, sign out, delete account.
- Daily nags: in the menu choose a theme (Productivity, Anxiety, Sleep), a time, and a style (Gentle or Persistent nag, which adds two follow-ups 10 and 20 minutes later). Only works in the iPhone app, and notifications must be allowed in iPhone Settings → Notifications → Nagatha. Tapping a nag opens a short coaching chat.
- Photos: tap the camera/attach button in chat. Homework photos get teaching, not answers.
- Lessons: Spanish, Italian, French, German, Korean, Math, English, plus flashcards and guessing games on any subject.
- Sharing a chat creates a public link; deleting a chat removes it. Account deletion is in the menu and removes all data.
- Human help: forkyeahbaby@gmail.com. Privacy policy at /privacy.

Rules: answer in under 120 words with concrete steps. If you don't know or it sounds like a bug, say so honestly and tell them to email forkyeahbaby@gmail.com with what they tapped, what happened, and their phone model. Never invent features. Never ask for passwords. If someone wants coaching or tutoring, tell them to sign in and start a chat.`);

export const Route = createFileRoute("/api/public/support-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: UIMessage[] };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid request", { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        const tooLong = messages.some((m) =>
          m.parts?.some((p) => p.type === "text" && p.text.length > 2000),
        );
        if (!messages.length || tooLong || messages.at(-1)?.role !== "user") {
          return new Response("Invalid request", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const runIdFetch = createLovableAiGatewayRunIdFetch();
        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        const textOnly = messages.map((m) => ({
          ...m,
          parts: m.parts.filter((p) => p.type === "text"),
        }));
        const result = streamText({
          model: lovable.responses("openai/gpt-6-astra"),
          system: SUPPORT_PROMPT,
          maxRetries: 0,
          abortSignal: request.signal,
          providerOptions: {
            openai: { forceReasoning: true, reasoningEffort: "low", store: false },
          },
          messages: await convertToModelMessages(textOnly),
        });
        const response = result.toUIMessageStreamResponse({
          onError: () => "Nagatha's help desk hit a snag. Try again, or email forkyeahbaby@gmail.com.",
        });
        for (const [k, v] of Object.entries(getLovableAiGatewayResponseHeaders?.(runIdFetch) ?? {})) {
          response.headers.set(k, v as string);
        }
        return response;
      },
    },
  },
});
