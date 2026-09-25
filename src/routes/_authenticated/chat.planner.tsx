import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarRange, Route as RouteIcon } from "lucide-react";
import { toast } from "sonner";
import { createThread } from "@/lib/chat.functions";
import { SUBJECTS } from "@/lib/lesson-curriculum";
import { PENDING_MESSAGE_KEY } from "@/components/chat-window";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import mascot from "@/assets/nagatha-checklist.png";

export const Route = createFileRoute("/_authenticated/chat/planner")({
  head: () => ({ meta: [
    { title: "Lesson planner — Nagatha" },
    { name: "description", content: "Create a personalized learning plan with Nagatha." },
    { property: "og:title", content: "Lesson planner — Nagatha" },
    { property: "og:description", content: "Choose a subject, goal, and available time for a practical learning plan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PlannerPage,
});

function PlannerPage() {
  const navigate = useNavigate();
  const makeThread = useServerFn(createThread);
  const [subject, setSubject] = useState("spanish");
  const [time, setTime] = useState("20 minutes, 3 days a week");
  const [goal, setGoal] = useState("");
  const [busy, setBusy] = useState(false);

  const createPlan = async () => {
    if (!goal.trim() || !time.trim()) return;
    setBusy(true);
    try {
      const thread = await makeThread();
      const subjectName = SUBJECTS.find((item) => item.id === subject)?.name ?? subject;
      const prompt = `Act as my ${subjectName} tutor. My goal is: ${goal.trim()}. My available study time is: ${time.trim()}. Keep your Nagatha personality. Do not dump the whole plan at once. Ask me exactly one short question now to clarify the most important missing detail, then wait for my reply. After that, build and teach the plan progressively, one question or exercise per message. If this is Math, make every question complete and unambiguous.`;
      sessionStorage.setItem(PENDING_MESSAGE_KEY(thread.id), JSON.stringify({ text: prompt, files: [], attachments: [] }));
      void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    } catch {
      toast.error("The plan did not save. Nagatha blames paperwork.");
      setBusy(false);
    }
  };

  return <main className="flex-1 overflow-y-auto bg-paper"><div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6"><header className="flex items-center gap-5"><img src={mascot} alt="Nagatha holding a lesson checklist" className="size-24 shrink-0 object-contain sm:size-32" width={1024} height={1024} /><div><p className="text-sm font-semibold text-primary">Custom study plan</p><h1 className="font-display text-3xl font-bold">Tell Nagatha what you’re trying to learn.</h1><p className="mt-2 text-sm text-muted-foreground">She’ll turn the goal and your actual available time into a plan. A revolutionary concept.</p></div></header><div className="mt-8 space-y-6 border-y py-7"><div className="space-y-2"><Label htmlFor="subject">Subject</Label><Select value={subject} onValueChange={setSubject}><SelectTrigger id="subject"><SelectValue /></SelectTrigger><SelectContent>{SUBJECTS.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label htmlFor="goal">What do you want to be able to do?</Label><Textarea id="goal" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="For example: hold a basic conversation before my trip, or understand algebra well enough to pass my exam." maxLength={600} rows={5} /></div><div className="space-y-2"><Label htmlFor="time">Time you can honestly commit</Label><Textarea id="time" value={time} onChange={(event) => setTime(event.target.value)} maxLength={200} rows={2} /></div></div><div className="mt-6 flex flex-wrap justify-end gap-2"><Button asChild variant="outline"><Link to="/chat/lessons"><CalendarRange />Browse lessons</Link></Button><Button type="button" disabled={busy || !goal.trim() || !time.trim()} onClick={() => void createPlan()}><RouteIcon />{busy ? "Making your plan…" : "Build my plan"}</Button></div></div></main>;
}