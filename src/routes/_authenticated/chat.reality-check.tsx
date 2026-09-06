import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Clock, Pause, Play, RotateCcw, Timer } from "lucide-react";
import { toast } from "sonner";
import { estimateTask, type TaskEstimate } from "@/lib/estimate.functions";
import { Button } from "@/components/ui/button";
import mascot from "@/assets/nagatha-work.png";

export const Route = createFileRoute("/_authenticated/chat/reality-check")({
  head: () => ({
    meta: [
      { title: "Reality check — how long will it really take?" },
      {
        name: "description",
        content:
          "Type a task you're dreading and Nagatha tells you how long it actually takes, step by step, then starts the timer.",
      },
      { property: "og:title", content: "Reality check — how long will it really take?" },
      {
        property: "og:description",
        content: "Nagatha gives you an honest time estimate for the task you keep avoiding.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RealityCheck,
});

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const CONFIDENCE_COPY: Record<TaskEstimate["confidence"], string> = {
  high: "Pretty confident",
  medium: "Rough guess",
  low: "Wild guess — it depends on you",
};

function CountdownTimer({ minutes }: { minutes: number }) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    setRemaining(minutes * 60);
    setRunning(false);
    doneRef.current = false;
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          setRunning(false);
          if (!doneRef.current) {
            doneRef.current = true;
            toast.success("Time's up. Told you it wasn't that long.");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4">
      <Timer className="size-5 text-primary" />
      <span className="font-display text-3xl font-bold tabular-nums">{formatClock(remaining)}</span>
      <div className="ml-auto flex gap-2">
        <Button size="sm" onClick={() => setRunning((r) => !r)} className="gap-1.5">
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? "Pause" : remaining === minutes * 60 ? "Start now" : "Resume"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          aria-label="Reset timer"
          onClick={() => {
            setRunning(false);
            doneRef.current = false;
            setRemaining(minutes * 60);
          }}
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function RealityCheck() {
  const [task, setTask] = useState("");
  const run = useServerFn(estimateTask);

  const { mutate, data: estimate, isPending } = useMutation({
    mutationFn: (value: string) => run({ data: { task: value } }),
    onError: (err) => {
      console.error(err);
      toast.error("Nagatha lost her stopwatch. Try that again.");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = task.trim();
    if (value.length < 3 || isPending) return;
    mutate(value);
  };

  return (
    <div className="bg-paper min-h-0 flex-1 overflow-y-auto px-4 py-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="flex items-center gap-3">
          <img
            src={mascot}
            alt="Nagatha holding a clipboard and a stopwatch"
            className="size-16 shrink-0"
            width={1024}
            height={1024}
          />
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">Reality check</h1>
            <p className="text-sm text-muted-foreground">
              Name the thing you're dreading. Find out how short it actually is.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <label htmlFor="task" className="sr-only">
            The task you're avoiding
          </label>
          <textarea
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={3}
            placeholder="e.g. Clean the kitchen, reply to that email I've dodged for a week…"
            className="w-full resize-none rounded-xl border bg-card px-4 py-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" disabled={isPending || task.trim().length < 3} className="gap-2 self-end">
            <Clock className="size-4" />
            {isPending ? "Nagatha's doing the math…" : "How long, really?"}
          </Button>
        </form>

        {estimate && (
          <div className="mt-8 flex flex-col gap-4">
            <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Actual time needed
              </p>
              <p className="font-display mt-1 text-5xl font-bold text-primary">
                {estimate.minutes}
                <span className="ml-1 text-2xl">min</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {CONFIDENCE_COPY[estimate.confidence]}
              </p>
              <p className="font-display mt-3 text-base italic">{estimate.verdict}</p>
            </div>

            <CountdownTimer minutes={estimate.minutes} />

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="font-display text-lg font-bold">The breakdown</h2>
              <ol className="mt-3 flex flex-col gap-2">
                {estimate.steps.map((step, i) => (
                  <li key={`${step.label}-${i}`} className="flex items-baseline gap-3 text-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                      {i + 1}
                    </span>
                    <span className="flex-1">{step.label}</span>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {step.minutes} min
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t pt-3 text-sm">
                <span className="font-semibold">First move: </span>
                {estimate.firstMove}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
