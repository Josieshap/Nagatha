import idle from "@/assets/nagatha-idle.png";
import work from "@/assets/nagatha-work.png";
import chores from "@/assets/nagatha-chores.png";
import exercise from "@/assets/nagatha-exercise.png";
import win from "@/assets/nagatha-win.png";
import thinking from "@/assets/nagatha-thinking.png";
import pointing from "@/assets/nagatha-pointing.png";
import coffee from "@/assets/nagatha-coffee.png";
import facepalm from "@/assets/nagatha-facepalm.png";
import sleepy from "@/assets/nagatha-sleepy.png";
import shrug from "@/assets/nagatha-shrug.png";
import waiting from "@/assets/nagatha-waiting.png";
import clapping from "@/assets/nagatha-clapping.png";
import wave from "@/assets/nagatha-wave.png";
import eyeroll from "@/assets/nagatha-eyeroll.png";
import cheer from "@/assets/nagatha-cheer.png";
import laptop from "@/assets/nagatha-laptop.png";
import reading from "@/assets/nagatha-reading.png";
import running from "@/assets/nagatha-running.png";
import calm from "@/assets/nagatha-calm.png";
import laundry from "@/assets/nagatha-laundry.png";
import encourage from "@/assets/nagatha-encourage.png";
import bored from "@/assets/nagatha-bored.png";
import surprised from "@/assets/nagatha-surprised.png";
import checklist from "@/assets/nagatha-checklist.png";

export type NagathaMood =
  | "idle"
  | "work"
  | "chores"
  | "exercise"
  | "win"
  | "thinking"
  | "pointing"
  | "coffee"
  | "facepalm"
  | "sleepy"
  | "shrug"
  | "waiting"
  | "clapping"
  | "wave"
  | "eyeroll"
  | "cheer"
  | "laptop"
  | "reading"
  | "running"
  | "calm"
  | "laundry"
  | "encourage"
  | "bored"
  | "surprised"
  | "checklist";

type MoodInfo = {
  src: string;
  alt: string;
  caption: string;
};

export const NAGATHA_MOODS: Record<NagathaMood, MoodInfo> = {
  idle: {
    src: idle,
    alt: "Nagatha the coach, arms crossed with a whistle around her neck",
    caption: "Arms crossed. Waiting.",
  },
  work: {
    src: work,
    alt: "Nagatha holding a clipboard in one hand and a stopwatch in the other",
    caption: "Clipboard out. Clock's running.",
  },
  chores: {
    src: chores,
    alt: "Nagatha in rubber gloves leaning on a mop",
    caption: "Gloves on. That mess isn't fictional.",
  },
  exercise: {
    src: exercise,
    alt: "Nagatha raising a dumbbell, headband on, whistle on a cord",
    caption: "One more rep. I'll wait.",
  },
  win: {
    src: win,
    alt: "Nagatha giving a deadpan thumbs up with confetti",
    caption: "Look at you. Functioning.",
  },
  thinking: {
    src: thinking,
    alt: "Nagatha with a hand on her chin, eyebrow raised",
    caption: "Interesting theory.",
  },
  pointing: {
    src: pointing,
    alt: "Nagatha pointing straight at you, other hand on her hip",
    caption: "Yes. You.",
  },
  coffee: {
    src: coffee,
    alt: "Nagatha holding a steaming mug with both hands",
    caption: "Caffeine first. Excuses later.",
  },
  facepalm: {
    src: facepalm,
    alt: "Nagatha covering her forehead with one hand",
    caption: "We've been here before.",
  },
  sleepy: {
    src: sleepy,
    alt: "Nagatha yawning behind one hand, eyes half closed",
    caption: "Go to bed. Seriously.",
  },
  shrug: {
    src: shrug,
    alt: "Nagatha shrugging with both palms up",
    caption: "Your call. Your consequences.",
  },
  waiting: {
    src: waiting,
    alt: "Nagatha tapping her wristwatch, unimpressed",
    caption: "Still waiting.",
  },
  clapping: {
    src: clapping,
    alt: "Nagatha slow-clapping with a deadpan face",
    caption: "Slow clap. Earned, technically.",
  },
  wave: {
    src: wave,
    alt: "Nagatha waving hello with a small smile",
    caption: "There you are.",
  },
  eyeroll: {
    src: eyeroll,
    alt: "Nagatha rolling her eyes, arms loosely folded",
    caption: "Sure. That's the reason.",
  },
  cheer: {
    src: cheer,
    alt: "Nagatha cheering with both fists in the air",
    caption: "Fine. That deserved cheering.",
  },
  laptop: {
    src: laptop,
    alt: "Nagatha sitting at a desk typing on a laptop",
    caption: "Head down. Keys moving.",
  },
  reading: {
    src: reading,
    alt: "Nagatha reading an open book, one eyebrow raised",
    caption: "Reading counts. Barely.",
  },
  running: {
    src: running,
    alt: "Nagatha jogging mid-stride in a sporty headband",
    caption: "Feet moving. Keep going.",
  },
  calm: {
    src: calm,
    alt: "Nagatha sitting cross-legged, meditating calmly",
    caption: "Breathe. Then get up.",
  },
  laundry: {
    src: laundry,
    alt: "Nagatha holding a full laundry basket, resigned",
    caption: "The pile isn't shrinking on its own.",
  },
  encourage: {
    src: encourage,
    alt: "Nagatha giving a warm thumbs up, hand on her hip",
    caption: "You've got this. Probably.",
  },
  bored: {
    src: bored,
    alt: "Nagatha resting her chin in her hand, bored",
    caption: "Riveting.",
  },
  surprised: {
    src: surprised,
    alt: "Nagatha with both hands raised in disbelief",
    caption: "You actually did it?",
  },
  checklist: {
    src: checklist,
    alt: "Nagatha ticking an item off a notepad with a pencil",
    caption: "One down. Next.",
  },
};

const PATTERNS: Array<[NagathaMood, RegExp]> = [
  [
    "cheer",
    /\b(crushed it|nailed it|smashed it|best day|so proud|huge win|personal best|pr\b)/i,
  ],
  [
    "win",
    /\b(did it|done|finished|finally|completed|i went|i did|success|proud|streak)\b/i,
  ],
  ["clapping", /\b(eventually|took me all day|better late|at last)\b/i],
  [
    "surprised",
    /\b(actually did|wow|can't believe|cannot believe|unbelievable|shocked)\b/i,
  ],
  [
    "facepalm",
    /\b(again|forgot|overslept|skipped|gave up|failed|messed up|procrastinat)/i,
  ],
  ["eyeroll", /\b(excuse|busy|no time|tomorrow|later|maybe|i guess)\b/i],
  ["sleepy", /\b(tired|exhausted|sleep|sleepy|bed|nap|insomnia|up late)\b/i],
  ["calm", /\b(stress|stressed|anxious|anxiety|overwhelm|panic|breathe|meditat)/i],
  ["coffee", /\b(coffee|tea|caffeine|espresso|morning|wake up|breakfast)\b/i],
  [
    "running",
    /\b(run(ning)?|jog|jogging|walk|walking|steps|bike|cycling|swim)\b/i,
  ],
  [
    "exercise",
    /\b(exercise|workout|work out|gym|yoga|stretch|lift|weights|cardio|push[- ]?ups|fitness)\b/i,
  ],
  ["laundry", /\b(laundry|washing|folding|clothes|ironing)\b/i],
  [
    "chores",
    /\b(clean|cleaning|tidy|dishes|vacuum|mop|chore|housework|declutter|trash|garbage|kitchen|bedroom|apartment|mess|messy)\b/i,
  ],
  ["reading", /\b(read|reading|book|chapter|article|study|studying|revise)\b/i],
  ["laptop", /\b(code|coding|email|inbox|spreadsheet|writing|write|type|laptop|computer)\b/i],
  ["checklist", /\b(list|checklist|plan|planning|todo|to[- ]do|schedule|organi[sz]e)\b/i],
  [
    "work",
    /\b(work|project|deadline|report|exam|homework|task|client|meeting|focus|admin|taxes|invoice)\b/i,
  ],
  ["waiting", /\b(in a minute|hold on|wait|soon|still)\b/i],
  ["thinking", /\b(not sure|don'?t know|confus|which|should i|maybe i)\b/i],
  ["shrug", /\b(whatever|meh|doesn'?t matter|up to you|no idea)\b/i],
  ["bored", /\b(boring|bored|dull|tedious|same old)\b/i],
  ["encourage", /\b(can'?t do|too hard|scared|nervous|doubt|help me|struggl)/i],
  ["pointing", /\b(who|me\?|why me|blame)\b/i],
  ["wave", /\b(hi|hey|hello|good morning|i'?m back|long time)\b/i],
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
