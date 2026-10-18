import { supabase } from "@/integrations/supabase/client";

export type NagSettings = { nag_time: string; nag_mode: string; nag_theme: string };

/** Loads the signed-in user's saved nag settings from the account (null if none / signed out). */
export async function loadNagSettings(): Promise<NagSettings | null> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data, error } = await supabase
    .from("nag_settings")
    .select("nag_time, nag_mode, nag_theme")
    .eq("user_id", auth.user.id)
    .maybeSingle();
  if (error) throw new Error("Your nag settings could not be loaded.");
  return data ?? null;
}

/** Saves part of the user's nag settings to their account. */
export async function saveNagSettings(patch: Partial<NagSettings>): Promise<void> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Please sign in again to save your nag settings.");
  const { error } = await supabase
    .from("nag_settings")
    .upsert({ user_id: auth.user.id, ...patch }, { onConflict: "user_id" });
  if (error) throw new Error("Your nag settings could not be saved. Please try again.");
}
