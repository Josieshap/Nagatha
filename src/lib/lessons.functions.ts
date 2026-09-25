import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { SUBJECT_IDS } from "@/lib/lesson-curriculum";

const SubjectId = z.enum(SUBJECT_IDS);

export const listLessonProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("lesson_progress").select("subject_id, lesson_id, completed, score, attempts, completed_at");
    if (error) throw new Error(error.message);
    return data;
  });

export const saveLessonProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ subjectId: SubjectId, lessonId: z.string().min(1).max(80), score: z.number().int().min(0).max(100), completed: z.boolean() }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: previous } = await context.supabase
      .from("lesson_progress")
      .select("attempts, score, completed")
      .eq("user_id", context.userId)
      .eq("subject_id", data.subjectId)
      .eq("lesson_id", data.lessonId)
      .maybeSingle();
    const { error } = await context.supabase.from("lesson_progress").upsert({
      user_id: context.userId,
      subject_id: data.subjectId,
      lesson_id: data.lessonId,
      score: Math.max(previous?.score ?? 0, data.score),
      completed: previous?.completed === true || data.completed,
      attempts: (previous?.attempts ?? 0) + 1,
      completed_at: previous?.completed === true ? undefined : data.completed ? new Date().toISOString() : null,
    }, { onConflict: "user_id,subject_id,lesson_id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
