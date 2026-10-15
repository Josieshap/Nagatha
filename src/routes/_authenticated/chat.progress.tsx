import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addTask, deleteTask, listTasks, setTaskDone } from "@/lib/tasks.functions";
import { haptic } from "@/lib/native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [announcement, setAnnouncement] = useState("");

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const add = useMutation({
    mutationFn: (value: string) => createTask({ data: { title: value } }),
    onSuccess: (_data, value) => {
      setTitle("");
      setAnnouncement(`Added task: ${value}`);
      invalidate();
    },
    onError: () => toast.error("Error: the task was not added. Please try again."),
  });

  const toggle = useMutation({
    mutationFn: (vars: { id: string; done: boolean }) => toggleTask({ data: vars }),
    onSuccess: (_data, vars) => {
      setAnnouncement(vars.done ? "Task marked done." : "Task marked not done.");
      invalidate();
    },
    onError: () => toast.error("Error: the task was not updated. Please try again."),
  });

  const remove = useMutation({
    mutationFn: (id: string) => removeTask({ data: { id } }),
    onSuccess: () => {
      setAnnouncement("Task deleted.");
      invalidate();
    },
    onError: () => toast.error("Error: the task was not deleted. Please try again."),
  });

  const total = tasks?.length ?? 0;
  const done = tasks?.filter((t) => t.done).length ?? 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const mood = total > 0 && done === total ? NAGATHA_MOODS.cheer : NAGATHA_MOODS.checklist;

  return (
    <div className="flex-1 overflow-y-auto bg-paper">
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

        <div role="status" aria-live="polite" className="sr-only">{announcement}</div>
        <Label htmlFor="new-task" className="mt-6 block">New task</Label>
        <form
          className="mt-2 flex gap-2"
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
            id="new-task"
            placeholder="What are you avoiding today?"
            autoComplete="off"
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
                id={`task-${task.id}`}
                className="size-6"
                checked={task.done}
                onCheckedChange={(checked) => {
                  void haptic(checked === true ? "medium" : "light");
                  toggle.mutate({ id: task.id, done: checked === true });
                }}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "min-w-0 flex-1 cursor-pointer break-words py-2 text-sm",
                  task.done && "text-muted-foreground line-through",
                )}
              >
                {task.title}
              </label>
              {task.done && <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">Done</span>}
              <button
                type="button"
                aria-label={`Delete ${task.title}`}
                onClick={() => remove.mutate(task.id)}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
