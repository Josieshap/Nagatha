import type { SubjectId } from "./lesson-curriculum";

const LESSON_ASIDES: Record<SubjectId, string[]> = {
  spanish: ["The verbs have wardrobe changes. Naturally, we’re expected to keep track.", "Spanish has rules. The exceptions apparently hired better lawyers.", "A tiny ending can change the whole sentence. Dramatic, but useful."],
  italian: ["Italian gives even a verb ending something to say. We’ll let it finish.", "The grammar has opinions. Here’s how to work with them instead of arguing.", "Those little words are doing actual work. Unlike the dust on your textbook."],
  french: ["French has invited several letters to stand around silently. Watch the ones doing the work.", "The grammar looks elaborate. So does a chandelier; we can still turn the light on.", "Yes, the ending matters. It didn’t get dressed up for nothing."],
  german: ["German brought a filing cabinet to a conversation. Let’s label the drawers.", "The word order has a seating plan. Apparently even verbs need reservations.", "The rule is useful once you stop letting its name intimidate the furniture."],
  korean: ["The sentence has a different seating arrangement. English does not own the table.", "Small pieces carry big meaning. Very efficient. Slightly smug.", "The pattern is doing the heavy lifting. We might as well let it."],
  math: ["The symbols are not a secret society. They just have terrible branding.", "One step at a time. The equals sign is not impressed by dramatic leaps.", "The numbers have receipts. Let’s check them instead of negotiating."],
  english: ["The sentence needs structure, not another decorative comma.", "Words can multitask. Unfortunately, we still have to check what job they’re doing.", "The rule exists to make the meaning clear. A radical use of language, I know."],
};

export function lessonAside(subject: SubjectId, index: number): string {
  const asides = LESSON_ASIDES[subject];
  return asides[index % asides.length] ?? asides[0] ?? "";
}

export function exerciseReaction(correct: boolean, index: number): string {
  const lines = correct
    ? ["Correct. That little trap can pack up and go home.", "Yes. The rule has been caught doing exactly what we expected.", "Nailed it. We’ll allow the facts their brief moment of smugness."]
    : ["That option was wearing a convincing disguise. Here’s where it falls apart.", "The trap has collected one point. Rude. Let’s take it apart.", "That answer made a persuasive speech. The rule would like a rebuttal."];
  return lines[index % lines.length] ?? "";
}