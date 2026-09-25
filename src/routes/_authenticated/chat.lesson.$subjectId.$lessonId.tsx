import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import { toast } from "sonner";
import { getLesson, getSubject, SUBJECT_IDS, type SubjectId } from "@/lib/lesson-curriculum";
import { saveLessonProgress } from "@/lib/lessons.functions";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/chat/lesson/$subjectId/$lessonId")({
  beforeLoad: ({ params }) => { if (!getLesson(params.subjectId, params.lessonId)) throw notFound(); },
  head: ({ params }) => {
    const lesson = getLesson(params.subjectId, params.lessonId);
    const title = `${lesson?.title ?? "Lesson"} — Nagatha`;
    const description = lesson?.objective ?? "A practical lesson and exercises with Nagatha.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
  },
  component: LessonPage,
  notFoundComponent: () => <main className="p-8">Nagatha cannot teach a lesson that does not exist. Yet.</main>,
});

function LessonPage() {
  const { subjectId, lessonId } = Route.useParams();
  const subject = getSubject(subjectId);
  const lesson = getLesson(subjectId, lessonId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const save = useServerFn(saveLessonProgress);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const mutation = useMutation({
    mutationFn: (payload: { score: number; completed: boolean }) => save({ data: { subjectId: subjectId as SubjectId, lessonId, ...payload } }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["lesson-progress"] }),
    onError: () => toast.error("Your progress refused to save. Try once more."),
  });
  if (!subject || !lesson || !SUBJECT_IDS.includes(subjectId as SubjectId)) return null;

  const checkAnswers = () => {
    const correct = lesson.exercises.filter((exercise, index) => Number(answers[index]) === exercise.answer).length;
    const nextScore = Math.round((correct / lesson.exercises.length) * 100);
    setScore(nextScore);
    setChecked(true);
    mutation.mutate({ score: nextScore, completed: nextScore >= 70 });
  };

  return (
    <main className="flex-1 overflow-y-auto bg-paper">
      <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" size="sm"><Link to="/chat/course/$subjectId" params={{ subjectId }}><ArrowLeft />{subject.name}</Link></Button>
        <header className="mt-5 border-b pb-6">
          <p className="flex items-center gap-1 text-sm text-muted-foreground"><Clock3 className="size-4" />{lesson.minutes} minutes</p>
          <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">{lesson.title}</h1>
          <p className="mt-2 text-muted-foreground">{lesson.objective}</p>
        </header>
        <div className="mt-7 space-y-8">
          {lesson.sections.map((section) => <section key={section.heading}><h2 className="font-display text-xl font-bold">{section.heading}</h2><p className="mt-2 leading-7">{section.body}</p><div className="mt-3 space-y-2 border-l-4 border-primary/40 pl-4">{section.examples.map((example) => <p key={example} className="text-sm font-medium">{example}</p>)}</div></section>)}
        </div>
        <section className="mt-10 border-t pt-8">
          <h2 className="font-display text-2xl font-bold">Exercises</h2>
          <p className="mt-1 text-sm text-muted-foreground">No, reading the examples did not magically count as practice.</p>
          <div className="mt-6 space-y-7">
            {lesson.exercises.map((exercise, index) => {
              const selected = Number(answers[index]);
              const correct = selected === exercise.answer;
              return <fieldset key={exercise.question}><legend className="font-semibold">{index + 1}. {exercise.question}</legend><RadioGroup value={answers[index] ?? null} onValueChange={(value) => { setAnswers((old) => ({ ...old, [index]: value })); setChecked(false); }} className="mt-3 gap-2">{exercise.choices.map((choice, choiceIndex) => <div key={choice} className={cn("flex items-center gap-3 rounded-md border bg-card/70 p-3", checked && choiceIndex === exercise.answer && "border-primary bg-accent/50", checked && selected === choiceIndex && !correct && "border-destructive")}><RadioGroupItem value={String(choiceIndex)} id={`q${index}-${choiceIndex}`} /><Label htmlFor={`q${index}-${choiceIndex}`} className="flex-1 cursor-pointer">{choice}</Label></div>)}</RadioGroup>{checked && <div className={cn("mt-3 flex gap-2 rounded-md p-3 text-sm", correct ? "bg-accent/60" : "bg-destructive/10")} >{correct ? <CheckCircle2 className="size-5 shrink-0 text-primary" /> : <CircleAlert className="size-5 shrink-0 text-destructive" />}<span>{exercise.explanation}</span></div>}</fieldset>;
            })}
          </div>
          {checked && <div className="mt-7 rounded-lg border bg-card p-5 text-center"><p className="font-display text-3xl font-bold">{score}%</p><p className="mt-1 text-sm text-muted-foreground">{score >= 70 ? "Passed. Suspiciously competent." : "Not there yet. Review, retry, annoyingly improve."}</p></div>}
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            {checked && score < 70 && <Button type="button" variant="outline" onClick={() => { setAnswers({}); setChecked(false); }}>Retry</Button>}
            {checked && score >= 70 ? <Button type="button" onClick={() => void navigate({ to: "/chat/course/$subjectId", params: { subjectId } })}>Back to course</Button> : <Button type="button" disabled={Object.keys(answers).length !== lesson.exercises.length || mutation.isPending} onClick={checkAnswers}>Check answers</Button>}
          </div>
        </section>
      </article>
    </main>
  );
}