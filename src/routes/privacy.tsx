import { createFileRoute, Link } from "@tanstack/react-router";
import mascot from "@/assets/nagatha-idle.png";

const TITLE = "Privacy Policy — Nagatha";
const DESC =
  "How Nagatha handles your account, chats, photos, tasks, lesson progress and Sign in with Apple data.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "What we collect",
    p: [
      "Account details: your email address, and a unique account ID. If you sign in with Apple or Google we receive only the details you allow them to share — usually your email and sometimes your name.",
      "Your chats: the messages you send to Nagatha and her replies, so you can come back to them in History.",
      "Photos: images you choose to attach to a chat, such as homework or a messy room you want help with.",
      "Tasks and lessons: the tasks you add to your progress tracker and your lesson scores.",
      "We do not collect your location, contacts, health data, or advertising identifiers, and we do not track you across other apps or websites.",
    ],
  },
  {
    h: "Sign in with Apple",
    p: [
      "If you use Sign in with Apple, Apple confirms who you are and sends us a unique identifier and the email you choose to share. If you pick \"Hide My Email\", we only ever see Apple's private relay address, and messages to it are forwarded by Apple.",
      "We never receive your Apple ID password. You can stop using Sign in with Apple for Nagatha at any time in your iPhone Settings under your name, then Sign-In & Security, Sign in with Apple.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "Only to run Nagatha: to sign you in, show your history, track your progress, and generate Nagatha's replies.",
      "To write a reply, the conversation (including any attached photo) is sent to an AI model provider for processing. They process it on our behalf to produce the reply and do not use it for advertising.",
      "We never sell your data and never use it for ads.",
    ],
  },
  {
    h: "Photos",
    p: [
      "Photos are stored privately. Only you can open them while signed in, through short-lived links. They are never public.",
      "Photos are deleted when you delete the chat they belong to, or when you delete your account.",
    ],
  },
  {
    h: "Sharing chats",
    p: [
      "Nothing is shared unless you tap Share. Sharing creates a private link to that one chat; anyone with the link can view it without an account. Deleting the chat turns the link off.",
    ],
  },
  {
    h: "Keeping and deleting your data",
    p: [
      "We keep your data while your account is active. You can delete any chat from History at any time.",
      "Delete my account (at the bottom of the History panel) permanently removes your account, every chat, photo, task and lesson score. This cannot be undone.",
    ],
  },
  {
    h: "Security",
    p: [
      "Data is encrypted in transit and stored with access rules so each person can only reach their own information.",
    ],
  },
  {
    h: "Children",
    p: [
      "Nagatha is not directed at children under 13, and we do not knowingly collect their information. If you believe a child has created an account, contact us and we will delete it.",
    ],
  },
  {
    h: "Changes and contact",
    p: [
      "If this policy changes we will update this page and the date below.",
      "Questions or deletion requests: privacy@nagatha.app.",
    ],
  },
];

function PrivacyPage() {
  return (
    <div className="bg-paper min-h-screen px-4 py-10">
      <article className="mx-auto max-w-2xl">
        <Link to="/" className="flex items-center gap-3">
          <img src={mascot} alt="Nagatha" className="size-14" width={1024} height={1024} />
          <span className="font-display text-xl font-bold">Nagatha</span>
        </Link>
        <h1 className="font-display mt-8 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated October 4, 2026</p>
        <p className="mt-6">
          Nagatha is nosy about your to-do list, not your personal life. Here's exactly what we keep
          and why.
        </p>
        {SECTIONS.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-display text-2xl font-semibold">{s.h}</h2>
            {s.p.map((t) => (
              <p key={t} className="mt-3 leading-relaxed text-foreground/90">
                {t}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
