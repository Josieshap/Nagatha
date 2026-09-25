import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Briefcase, Calculator, Dumbbell, Flame, Home, Languages, Timer } from "lucide-react";
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
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/chat/")({
  head: () => ({
    meta: [
      { title: "New chat — Nagatha" },
      {
        name: "description",
        content: "Start a new chat with Nagatha for motivation or tutoring.",
      },
      { property: "og:title", content: "New chat — Nagatha" },
      { property: "og:description", content: "Get tough-love motivation or tutoring from Nagatha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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

const TUTORING_PROMPTS = [
  { label: "Spanish", text: "Start my structured Spanish course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "Italian", text: "Start my structured Italian course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "French", text: "Start my structured French course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "German", text: "Start my structured German course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "Korean", text: "Start my structured Korean course. Assess my level and goal, make a lesson path, then teach lesson one with Hangul, helpful beginner romanization, examples, exercises, corrections, and review." },
  { label: "Math", text: "Start my structured Math course. Assess my level and topic, make a lesson path, then teach lesson one step by step with worked examples, guided problems, independent exercises, corrections, and review." },
  { label: "English", text: "Start my structured English course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
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
    <div className="bg-paper flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8">
      <div className="flex w-full max-w-xl shrink-0 flex-col items-center">
        <img
          src={mascot}
          alt="Nagatha, a grumpy but caring coach with a whistle"
          className="size-28 shrink-0 object-contain md:size-36"
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
            <Button
              key={label}
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => void startThread(text)}
              className="h-auto justify-start whitespace-normal px-4 py-3 text-left"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </Button>
          ))}
        </div>

        <div className="mt-6 w-full border-t pt-5">
          <div className="mb-3 flex items-center gap-2">
            <Languages className="size-4 text-primary" />
            <h2 className="font-display font-bold">Study with Nagatha</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {TUTORING_PROMPTS.map(({ label, text }) => (
              <Button key={label} type="button" size="sm" variant="secondary" disabled={busy} onClick={() => void startThread(text)}>
                {label === "Math" ? <Calculator /> : <Languages />}
                {label}
              </Button>
            ))}
          </div>
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
