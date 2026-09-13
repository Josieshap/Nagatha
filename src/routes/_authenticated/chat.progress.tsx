import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addTask, deleteTask, listTasks, setTaskDone } from "@/lib/tasks.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { NAGATHA_MOODS } from "@/lib/nagatha-mood";

export const Route = createFileRoute("/_authenticated/chat/progress")({
  head: () => ({
    meta: [
      { title: "Progress tracker — Nagatha" },
      {
        name: "description",
        content: "List your tasks and see how many you have actually finished.",
      },
      { property: "og:title", content: "Progress tracker — Nagatha" },
      {
        property: "og:description",
        content: "List your tasks and see how many you have actually finished.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

function nag(done: number, total: number) {
  if (total === 0) return "Nothing on the list. Bold strategy.";
  if (done === 0) return "Zero finished. The list is not going to do itself.";
  if (done === total) return "All done. I'm not crying, you are.";
  if (done / total >= 0.5) return "Over halfway. Don't get comfortable.";
  return "A start. Technically.";
}

function ProgressPage() {
  const queryClient = useQueryClient();
  const fetchTasks = useServerFn(listTasks);
  const createTask = useServerFn(addTask);
  const toggleTask = useServerFn(setTaskDone);
  const removeTask = useServerFn(deleteTask);
  const [title, setTitle] = useState("");

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const add = useMutation({
    mutationFn: (value: string) => createTask({ data: { title: value } }),
    onSuccess: () => {
      setTitle("");
      invalidate();
    },
    onError: () => toast.error("That task didn't stick. Try again."),
  });

  const toggle = useMutation({
    mutationFn: (vars: { id: string; done: boolean }) => toggleTask({ data: vars }),
    onSuccess: invalidate,
    onError: () => toast.error("Couldn't update that one."),
  });

  const remove = useMutation({
    mutationFn: (id: string) => removeTask({ data: { id } }),
    onSuccess: invalidate,
    onError: () => toast.error("Couldn't delete that one."),
  });

  const total = tasks?.length ?? 0;
  const done = tasks?.filter((t) => t.done).length ?? 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const mood = total > 0 && done === total ? NAGATHA_MOODS.cheer : NAGATHA_MOODS.checklist;

  return (
    <main className="flex-1 overflow-y-auto bg-paper">
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <header className="flex items-center gap-4">
          <img
            src={mood.src}
            alt={mood.alt}
            className="size-20 shrink-0"
            width={1024}
            height={1024}
          />
          <div>
            <h1 className="font-display text-3xl font-bold">Progress tracker</h1>
            <p className="text-sm text-muted-foreground">{nag(done, total)}</p>
          </div>
        </header>

        <section className="mt-6 rounded-xl border border-border bg-card/70 p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-2xl font-bold">
              {done} <span className="text-muted-foreground">/ {total} finished</span>
            </p>
            <p className="text-sm text-muted-foreground">{pct}%</p>
          </div>
          <div
            className="mt-3 h-3 w-full overflow-hidden rounded-full bg-accent/60"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tasks finished"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </section>

        <form
          className="mt-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const value = title.trim();
            if (!value) return;
            add.mutate(value);
          }}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you avoiding today?"
            aria-label="New task"
            maxLength={200}
          />
          <Button type="submit" disabled={add.isPending || title.trim().length === 0}>
            <Plus className="size-4" />
            Add
          </Button>
        </form>

        <ul className="mt-5 flex flex-col gap-2">
          {isLoading && <li className="text-sm text-muted-foreground">Loading your list…</li>}
          {!isLoading && total === 0 && (
            <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No tasks yet. Add one and we'll see if you follow through.
            </li>
          )}
          {tasks?.map((task) => (
            <li
              key={task.id}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3"
            >
              <Checkbox
                checked={task.done}
                onCheckedChange={(checked) =>
                  toggle.mutate({ id: task.id, done: checked === true })
                }
                aria-label={`Mark ${task.title} as ${task.done ? "not done" : "done"}`}
              />
              <span
                className={cn(
                  "min-w-0 flex-1 break-words text-sm",
                  task.done && "text-muted-foreground line-through",
                )}
              >
                {task.title}
              </span>
              <button
                type="button"
                aria-label={`Delete ${task.title}`}
                onClick={() => remove.mutate(task.id)}
                className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
