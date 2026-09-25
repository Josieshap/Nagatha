import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpen, Calculator, Languages, Route as RouteIcon } from "lucide-react";
import { SUBJECTS } from "@/lib/lesson-curriculum";
import { listLessonProgress } from "@/lib/lessons.functions";
import { LessonProgressBar } from "@/components/lesson-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import mascot from "@/assets/nagatha-reading.png";

export const Route = createFileRoute("/_authenticated/chat/lessons")({
  head: () => ({ meta: [
    { title: "Lessons — Nagatha" },
    { name: "description", content: "Learn Spanish, Italian, French, German, Korean, Math, and English with Nagatha." },
    { property: "og:title", content: "Lessons — Nagatha" },
    { property: "og:description", content: "Seven practical courses, exercises, and saved progress." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: LessonsPage,
});

function LessonsPage() {
  const fetchProgress = useServerFn(listLessonProgress);
  const { data: progress = [] } = useQuery({ queryKey: ["lesson-progress"], queryFn: () => fetchProgress() });
  const completed = progress.filter((row) => row.completed).length;
  const total = SUBJECTS.reduce((sum, subject) => sum + subject.lessons.length, 0);
  const overall = Math.round((completed / total) * 100);

  return (
    <main className="flex-1 overflow-y-auto bg-paper">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <header className="flex items-center gap-5">
          <img src={mascot} alt="Nagatha reading and ready to tutor" className="size-24 shrink-0 object-contain sm:size-32" width={1024} height={1024} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-primary">Nagatha’s classroom</p>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Pick a subject. We’re learning it properly.</h1>
            <p className="mt-2 text-sm text-muted-foreground">Short lessons, actual practice, and progress that cannot be explained away.</p>
          </div>
        </header>

        <section className="mt-7 grid gap-4 border-y py-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <LessonProgressBar value={overall} label={`${completed} of ${total} lessons completed`} />
          <Button asChild variant="outline"><Link to="/chat/planner"><RouteIcon />Make me a study plan</Link></Button>
        </section>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject) => {
            const count = progress.filter((row) => row.subject_id === subject.id && row.completed).length;
            const percent = Math.round((count / subject.lessons.length) * 100);
            const Icon = subject.id === "math" ? Calculator : Languages;
            return (
              <Card key={subject.id} className="flex flex-col rounded-lg shadow-sm">
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-accent text-primary"><Icon className="size-5" /></div>
                  <CardTitle className="font-display text-xl">{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <LessonProgressBar value={percent} label={`${count}/${subject.lessons.length} finished`} />
                  <Button asChild className="w-full"><Link to="/chat/course/$subjectId" params={{ subjectId: subject.id }}><BookOpen />Open course<ArrowRight /></Link></Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}