import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { FREE_DAILY_MESSAGES } from "@/lib/plans";

export const getDailyUsage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("get_daily_usage", { _limit: FREE_DAILY_MESSAGES });
    if (error) throw new Error(error.message);
    const d = data as { pro: boolean; used: number; limit: number };
    return { pro: d.pro, used: d.used, limit: d.limit, left: Math.max(0, d.limit - d.used) };
  });
