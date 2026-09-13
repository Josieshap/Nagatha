import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Briefcase, Flame, Dumbbell, Home, Timer } from "lucide-react";
import { createThread } from "@/lib/chat.functions";
import { PENDING_MESSAGE_KEY } from "@/components/chat-window";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import mascot from "@/assets/nagatha-idle.png";

export const Route = createFileRoute("/_authenticated/chat/")({
  head: () => ({
    meta: [
      { title: "New chat — Nagatha" },
      {
        name: "description",
        content: "Start a new chat with Nagatha, your tough-love AI buddy.",
      },
    ],
  }),
  component: NewChat,
});

const QUICK_PROMPTS = [
  { icon: Briefcase, label: "I can't start this work project", text: "I have a work project I keep putting off. Help me actually start it." },
  { icon: Home, label: "My place is a disaster", text: "My place is a mess and I don't know where to start. Roast me, then help me clean it." },
  { icon: Dumbbell, label: "Make me exercise", text: "I've been avoiding exercise. Give me tough love and a plan I'll actually do." },
  { icon: Flame, label: "Just motivate me", text: "I don't even know what I need. Just motivate me." },
];

function NewChat() {
  const navigate = useNavigate();
  const makeThread = useServerFn(createThread);
  const [busy, setBusy] = useState(false);

  const startThread = async (text: string) => {
    if (busy || !text.trim()) return;
    setBusy(true);
    try {
      const thread = await makeThread();
      sessionStorage.setItem(PENDING_MESSAGE_KEY(thread.id), text.trim());
      void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't start a chat. Even Nagatha needs a coffee break sometimes.");
      setBusy(false);
    }
  };

  const handleSubmit = (message: PromptInputMessage) => {
    void startThread(message.text);
  };

  return (
    <div className="bg-paper flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-xl flex-col items-center">
        <img
          src={mascot}
          alt="Nagatha, a grumpy but caring coach with a whistle"
          className="size-28 md:size-36"
          width={1024}
          height={1024}
        />
        <h1 className="font-display mt-5 text-center text-2xl font-bold md:text-3xl">
          What are we pretending to avoid today?
        </h1>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          Work, chores, that exercise you swore you'd start in January — pick your poison.
          Nagatha brings the whistle.
        </p>

        <div className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {QUICK_PROMPTS.map(({ icon: Icon, label, text }) => (
            <button
              key={label}
              type="button"
              disabled={busy}
              onClick={() => void startThread(text)}
              className="flex items-center gap-2.5 rounded-xl border bg-card px-4 py-3 text-left text-sm font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </button>
          ))}
        </div>

        <Link
          to="/chat/reality-check"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
        >
          <Timer className="size-4" />
          How long will it actually take?
        </Link>

        <div className="mt-6 w-full">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              placeholder="Tell Nagatha what you're avoiding…"
              aria-label="Message Nagatha"
              disabled={busy}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit disabled={busy} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
