import idle from "@/assets/nagatha-idle.png";
import work from "@/assets/nagatha-work.png";
import chores from "@/assets/nagatha-chores.png";
import exercise from "@/assets/nagatha-exercise.png";
import win from "@/assets/nagatha-win.png";

export type NagathaMood = "idle" | "work" | "chores" | "exercise" | "win";

type MoodInfo = {
  src: string;
  alt: string;
  caption: string;
};

export const NAGATHA_MOODS: Record<NagathaMood, MoodInfo> = {
  idle: {
    src: idle,
    alt: "Nagatha the coach, arms crossed with a whistle",
    caption: "Arms crossed. Waiting.",
  },
  work: {
    src: work,
    alt: "Nagatha holding a clipboard and a stopwatch",
    caption: "Clipboard out. Clock's running.",
  },
  chores: {
    src: chores,
    alt: "Nagatha in rubber gloves leaning on a mop",
    caption: "Gloves on. That mess isn't fictional.",
  },
  exercise: {
    src: exercise,
    alt: "Nagatha with a headband, whistle and dumbbell",
    caption: "Whistle in. One more rep.",
  },
  win: {
    src: win,
    alt: "Nagatha giving a deadpan thumbs up with confetti",
    caption: "Look at you. Functioning.",
  },
};

const PATTERNS: Array<[NagathaMood, RegExp]> = [
  [
    "win",
    /\b(did it|done|finished|finally|crushed it|nailed it|completed|i went|i did|success|proud|streak)\b/i,
  ],
  [
    "exercise",
    /\b(exercise|workout|work out|gym|run(ning)?|jog|walk|yoga|stretch|lift|weights|cardio|push[- ]?ups|steps|bike|swim|fitness)\b/i,
  ],
  [
    "chores",
    /\b(clean|cleaning|tidy|laundry|dishes|vacuum|mop|chore|housework|declutter|trash|garbage|kitchen|bedroom|apartment|mess|messy)\b/i,
  ],
  [
    "work",
    /\b(work|project|deadline|email|report|study|studying|exam|homework|task|client|meeting|focus|write|writing|code|coding|admin|taxes|invoice)\b/i,
  ],
];

/** Pick a pose from the most recent messages — newest text wins. */
export function detectMood(texts: string[]): NagathaMood {
  for (let i = texts.length - 1; i >= 0; i--) {
    const text = texts[i];
    if (!text) continue;
    for (const [mood, pattern] of PATTERNS) {
      if (pattern.test(text)) return mood;
    }
  }
  return "idle";
}
