import { createFileRoute } from "@tanstack/react-router";
import { createUserSupabaseClient } from "@/lib/supabase-user.server";

const MAX_FILE_BYTES = 9 * 1024 * 1024;

function safeGatewayMessage(value: unknown, fallback: string) {
  if (!value || typeof value !== "object") return fallback;
  const message = (value as Record<string, unknown>)["message"];
  const error = (value as Record<string, unknown>)["error"];
  if (typeof message === "string") return message;
  if (error && typeof error === "object") {
    const nested = (error as Record<string, unknown>)["message"];
    if (typeof nested === "string") return nested;
  }
  return fallback;
}

export const Route = createFileRoute("/api/transcribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return Response.json({ message: "Please sign in again." }, { status: 401 });
        const token = authHeader.slice("Bearer ".length);
        const supabase = createUserSupabaseClient(token);
        const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
        if (claimsError || !claimsData?.claims?.sub) return Response.json({ message: "Please sign in again." }, { status: 401 });
        const declaredLength = Number(request.headers.get("content-length") || 0);
        if (declaredLength > MAX_FILE_BYTES + 100_000) return Response.json({ message: "That voice memo is too large." }, { status: 413 });

        const body = await request.formData();
        const file = body.get("file");
        if (!(file instanceof File) || !file.size || file.size > MAX_FILE_BYTES || !file.type.startsWith("audio/")) {
          return Response.json({ message: "Please record a valid voice memo under 9 MB." }, { status: 400 });
        }
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return Response.json({ message: "Voice transcription isn't configured yet." }, { status: 500 });

        const form = new FormData();
        form.append("model", "google/gemini-3.5-transcribe");
        form.append("file", file, file.name);
        form.append("response_format", "json");
        form.append("stream", "true");
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}` },
          body: form,
        });
        if (!upstream.ok) {
          const payload = await upstream.json().catch(() => null);
          return Response.json({ message: safeGatewayMessage(payload, "The voice memo couldn't be transcribed.") }, { status: upstream.status });
        }
        if (!upstream.body) return Response.json({ message: "The transcription ended before Nagatha heard anything." }, { status: 502 });
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let transcript = "";
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          buffer += decoder.decode(chunk.value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          for (const event of events) {
            const dataLine = event.split("\n").find((line) => line.startsWith("data:"));
            if (!dataLine) continue;
            const raw = dataLine.slice(5).trim();
            if (!raw || raw === "[DONE]") continue;
            const data = JSON.parse(raw) as { type?: string; delta?: string; text?: string; error?: { message?: string } };
            if (data.type === "transcript.text.delta" && data.delta) transcript += data.delta;
            if (data.type === "transcript.text.done" && data.text) transcript = data.text;
            if (data.error?.message) return Response.json({ message: data.error.message }, { status: 502 });
          }
        }
        if (!transcript.trim()) return Response.json({ message: "Nagatha couldn't hear enough speech. Try that again." }, { status: 400 });
        return Response.json({ text: transcript.trim() });
      },
    },
  },
});