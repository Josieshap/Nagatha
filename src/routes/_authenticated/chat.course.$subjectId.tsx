import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock3 } from "lucide-react";
import { getSubject } from "@/lib/lesson-curriculum";
import { listLessonProgress } from "@/lib/lessons.functions";
import { LessonProgressBar } from "@/components/lesson-progress-bar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/chat/course/$subjectId")({
  beforeLoad: ({ params }) => { if (!getSubject(params.subjectId)) throw notFound(); },
  head: ({ params }) => {
    const subject = getSubject(params.subjectId);
    const title = `${subject?.name ?? "Course"} lessons — Nagatha`;
    const description = `Learn ${subject?.name ?? "a subject"} with practical lessons and exercises.`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  component: SubjectPage,
  notFoundComponent: () => <main className="p-8">That course wandered off. Very educational of it.</main>,
});

function SubjectPage() {
  const { subjectId } = Route.useParams();
  const subject = getSubject(subjectId);
  const fetchProgress = useServerFn(listLessonProgress);
  const { data: progress = [] } = useQuery({ queryKey: ["lesson-progress"], queryFn: () => fetchProgress() });
  if (!subject) return null;
  const completed = progress.filter((row) => row.subject_id === subject.id && row.completed);
  const percent = Math.round((completed.length / subject.lessons.length) * 100);

  return (
    <main className="flex-1 overflow-y-auto bg-paper">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" size="sm"><Link to="/chat/lessons"><ArrowLeft />All subjects</Link></Button>
        <header className="mt-5 border-b pb-6">
          <p className="text-sm font-semibold text-primary">{subject.greeting}</p>
          <h1 className="font-display mt-1 text-4xl font-bold">{subject.name}</h1>
          <p className="mt-2 text-muted-foreground">{subject.description}</p>
          <div className="mt-5 max-w-md"><LessonProgressBar value={percent} label={`${completed.length} of ${subject.lessons.length} lessons complete`} /></div>
        </header>
        <ol className="mt-6 space-y-3">
          {subject.lessons.map((lesson, index) => {
            const record = progress.find((row) => row.lesson_id === lesson.id);
            return (
              <li key={lesson.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border bg-card/70 p-4">
                <div className="flex size-9 items-center justify-center rounded-full border bg-background font-display font-bold">{index + 1}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">{record?.completed ? <CheckCircle2 className="size-4 text-primary" /> : <Circle className="size-4 text-muted-foreground" />}<h2 className="font-display font-bold">{lesson.title}</h2></div>
                  <p className="mt-1 text-sm text-muted-foreground">{lesson.objective}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{lesson.minutes} minutes{record ? ` · Best score ${record.score}%` : ""}</p>
                </div>
                <Button asChild size="icon" variant="ghost" aria-label={`Open ${lesson.title}`}><Link to="/chat/lesson/$subjectId/$lessonId" params={{ subjectId, lessonId: lesson.id }}><ArrowRight /></Link></Button>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}