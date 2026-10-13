import { z } from "zod";

export const NAG_IDS = [4242, 4243, 4244];
const nagTimeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export function parseNagTime(value: unknown): { hour: number; minute: number } | null {
  const result = nagTimeSchema.safeParse(value);
  if (!result.success) return null;
  const [hour, minute] = result.data.split(":").map(Number);
  if (hour === undefined || minute === undefined) return null;
  return { hour, minute };
}
export function normalizeNagTime(value: string | null): string {
  if (value && parseNagTime(value)) return value;
  if (value && /^(\d|1\d|2[0-3])$/.test(value)) return `${value.padStart(2, "0")}:00`;
  return "off";
}
export function nagTimeAfter(time: { hour: number; minute: number }, offset: number) {
  const total = (time.hour * 60 + time.minute + offset) % 1440;
  return { hour: Math.floor(total / 60), minute: total % 60 };
}
export const NAG_THEME_KEY = "nagatha:nag-theme";
export const NAG_THEMES = ["productivity", "anxiety", "sleep"] as const;
export type NagTheme = (typeof NAG_THEMES)[number];
export function parseNagTheme(value: unknown): NagTheme {
  return value === "anxiety" || value === "sleep" ? value : "productivity";
}

export const NAG_NOTIFICATION_TEXT: Record<NagTheme, string> = {
  productivity: "Your to-do list called. Tap here; we'll pick one tiny first step.",
  anxiety: "Your brain doesn't have to solve everything tonight. Tap for a small grounding pause.",
  sleep: "The day can clock out now. Tap here for a small wind-down step.",
};

export function nagRequestForNotification(id: number): string | null {
  return NAG_IDS.includes(id) ? `${id}:${Date.now()}` : null;
}

export function nagPrompt(request: string | undefined, theme: NagTheme = "productivity"): string | null {
  if (!request || !/^(4242|4243|4244):\d+$/.test(request)) return null;
  if (theme === "anxiety") return "I chose an anxiety nag. Help me take a small grounding pause now: offer one gentle two-minute grounding step, then ask exactly one question about what's weighing on me. Keep Nagatha's dry warmth, but never shame, pressure, diagnose, or promise to cure anxiety. If I'm distressed, drop the roast and be kind. Don't turn this into productivity coaching.";
  if (theme === "sleep") return "I chose a sleep nag. Help me wind down: offer one concrete two-minute bedtime step, then ask exactly one question about what's keeping me awake. Keep Nagatha's affectionate dry humor, but no guilt about resting, no demands to work or exercise, no medical diagnoses or medication advice, and no promise to cure insomnia.";
  return "I tapped your daily nag. Give me a useful nudge right now, not just a reminder: keep your affectionate snark, suggest a concrete two-minute first step I can do immediately, then ask exactly one question about what I need help getting done today. Don't assume you know my tasks or that I ignored earlier reminders. Help me turn my answer into a tiny realistic plan.";
}