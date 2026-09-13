import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObject } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const estimateSchema = z.object({
  minutes: z.number(),
  confidence: z.enum(["low", "medium", "high"]),
  verdict: z.string(),
  steps: z.array(
    z.object({
      label: z.string(),
      minutes: z.number(),
    }),
  ),
  firstMove: z.string(),
});

export type TaskEstimate = z.infer<typeof estimateSchema>;

const SYSTEM = `You are Nagatha, a tough-love accountability coach. You estimate how long a task ACTUALLY takes — not the bloated version in someone's head.

Rules:
- Be realistic but lean toward the honest low end; most dreaded tasks are shorter than people fear. Total minutes between 1 and 480.
- Break it into 2-5 concrete steps, each between 1 and 240 minutes, whose minutes roughly add up to the total.
- "verdict" is one short sarcastic-but-warm line about the gap between dread and reality (max 20 words).
- "firstMove" is a stupidly small first action they can do in under 2 minutes.
- Humor is dry and timeless — no generational in-jokes, no emojis, no motivational-poster language.`;

export const estimateTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ task: z.string().trim().min(3).max(500) }).parse(input),
  )
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);
    const { object } = await generateObject({
      model: gateway("google/gemini-3.7-flash"),
      schema: estimateSchema,
      system: SYSTEM,
      prompt: `Task: ${data.task}`,
    });

    return object;
  });
