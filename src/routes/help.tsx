import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, type FormEvent } from "react";
import { ChatAnnouncer, Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import mascot from "@/assets/nagatha-idle.png";
import { ThemeToggle } from "@/lib/theme";

const TITLE = "Ask Nagatha — Help Desk";
const DESCRIPTION =
  "Questions about signing in, daily nags, lessons or your account? Ask Nagatha's help desk and get a straight (slightly snarky) answer.";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HelpPage,
});

const STARTERS = [
  "My daily nag isn't showing up",
  "How do I change my nag time?",
  "Where is my lesson progress?",
  "How do I delete my account?",
];

function HelpPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/public/support-chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    void sendMessage({ text: t });
    setInput("");
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="flex h-dvh flex-col bg-paper">
      <header className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={mascot} alt="" className="size-10" width={1024} height={1024} />
          <span className="font-display text-lg font-bold">Nagatha Help Desk</span>
        </Link>
        <ThemeToggle className="ml-auto" />
      </header>

      <main id="main-content" tabIndex={-1} className="flex min-h-0 flex-1 flex-col focus:outline-none">
      <h1 className="sr-only">Nagatha Help Desk</h1>
      <ChatAnnouncer status={status} lastAssistantText={([...messages].reverse().find((m) => m.role === "assistant")?.parts ?? []).map((p) => (p.type === "text" ? p.text : "")).join("")} />
      <Conversation className="mx-auto w-full max-w-2xl flex-1 min-h-0">
        <ConversationContent className="px-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <img src={mascot} alt="Nagatha behind the help desk" className="size-32" width={1024} height={1024} />
              <h2 className="font-display text-2xl font-semibold">Something broken? Or just confusing?</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Ask me about signing in, nags, lessons or your account. I'll fix it or tell you who can.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {STARTERS.map((s) => (
                  <Button key={s} variant="outline" size="sm" onClick={() => send(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent>
                {m.parts.map((p, i) =>
                  p.type === "text" ? (
                    m.role === "assistant" ? <MessageResponse key={i}>{p.text}</MessageResponse> : <span key={i}>{p.text}</span>
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && (
            <p role="status" className="font-display text-sm italic text-muted-foreground">Nagatha is sighing and typing…</p>
          )}
          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              Error: your question was not sent. Try again, or email forkyeahbaby@gmail.com.
            </p>
          )}
        </ConversationContent>
      </Conversation>

      <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-2xl gap-2 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask your question…"
          aria-label="Your question"
          maxLength={2000}
          rows={1}
          className="min-h-11 resize-none"
        />
        <Button type="submit" disabled={busy || !input.trim()}>Ask</Button>
      </form>
      </main>
      <footer className="pb-3 text-center text-xs text-muted-foreground">
        Need a human? <a className="underline" href="mailto:forkyeahbaby@gmail.com">forkyeahbaby@gmail.com</a> ·{" "}
        <Link to="/privacy" className="underline">Privacy</Link> ·{" "}
        <Link to="/terms" className="underline">Terms</Link>
      </footer>
    </div>
  );
}
