export const NAG_IDS = [4242, 4243, 4244];

export function nagRequestForNotification(id: number): string | null {
  return NAG_IDS.includes(id) ? `${id}:${Date.now()}` : null;
}

export function nagPrompt(request: string | undefined): string | null {
  if (!request || !/^(4242|4243|4244):\d+$/.test(request)) return null;
  return "I tapped your daily nag. Give me a useful nudge right now, not just a reminder: keep your affectionate snark, suggest a concrete two-minute first step I can do immediately, then ask exactly one question about what I need help getting done today. Don't assume you know my tasks or that I ignored earlier reminders. Help me turn my answer into a tiny realistic plan.";
}