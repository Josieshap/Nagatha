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
  productivity: "Your to-do list is not going to complete itself out of embarrassment. Tap. Two minutes. I'll supervise.",
  anxiety: "Your brain has opened 47 tabs. None of them need solving this minute. Tap. Let's close one gently.",
  sleep: "Your brain has called another meeting. Declined. Tap. Let's get you off the night shift.",
};

const NAG_VOICE = "Stay unmistakably Nagatha, the dry, cheeky, caring friend in cat-eye glasses—not a generic reminder, therapist script, or motivational poster. Open with one original wry observation, then give real help. Roast the predicament, never the person. Keep affectionate snark throughout, not just a token joke followed by bland advice. Use natural conversational language, no emojis, no canned wellness phrases, no 'You've got this'. Keep it under 120 words, with exactly one question. For anxiety or sleep, aim gentle wit at the brain's busy habits, never at suffering or the need to rest. If there is genuine distress or a safety concern, prioritize warm direct support over jokes. ";

export function nagRequestForNotification(id: number): string | null {
  return NAG_IDS.includes(id) ? `${id}:${Date.now()}` : null;
}

export function nagPrompt(request: string | undefined, theme: NagTheme = "productivity"): string | null {
  if (!request || !/^(4242|4243|4244):\d+$/.test(request)) return null;
  if (theme === "anxiety") return NAG_VOICE + "I chose an anxiety nag. Help me take a small grounding pause now: offer one gentle two-minute grounding step, then ask exactly one question about what's weighing on me. Never shame, pressure, diagnose, or promise to cure anxiety. Don't turn this into productivity coaching. Voice example, not a line to repeat: 'Your brain has appointed itself head of every department. Let's give it one job: feel your feet on the floor.'";
  if (theme === "sleep") return NAG_VOICE + "I chose a sleep nag. Help me wind down: offer one concrete two-minute bedtime step, then ask exactly one question about what's keeping me awake. No guilt about resting, no demands to work or exercise, no medical diagnoses or medication advice, and no promise to cure insomnia. Voice example, not a line to repeat: 'We are not holding a committee meeting with every thought you've ever had. Put the phone out of reach and dim one light.'";
  return NAG_VOICE + "I tapped your daily nag. Give me a useful nudge right now, not just a reminder: suggest a concrete two-minute first step I can do immediately, then ask exactly one question about what I need help getting done today. Don't assume you know my tasks or that I ignored earlier reminders. Help me turn my answer into a tiny realistic plan. Voice example, not a line to repeat: 'Waiting to feel motivated? Lovely. Shall we also wait for the laundry to develop ambition? Pick up three things while we negotiate.'";
}