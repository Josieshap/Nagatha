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
    const { error } = await context.supabase.from("lesson_progress").upsert({
      user_id: context.userId,
      subject_id: data.subjectId,
      lesson_id: data.lessonId,
      score: data.score,
      completed: data.completed,
      attempts: 1,
      completed_at: data.completed ? new Date().toISOString() : null,
    }, { onConflict: "user_id,subject_id,lesson_id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
