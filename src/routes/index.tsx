import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import mascot from "@/assets/nagatha-idle.png";
import work from "@/assets/nagatha-work.png";
import chores from "@/assets/nagatha-chores.png";
import exercise from "@/assets/nagatha-exercise.png";
import win from "@/assets/nagatha-win.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nagatha — Your Tough-Love AI Buddy" },
      {
        name: "description",
        content:
          "A sarcastic AI companion that actually gets you off the couch — work, chores, and exercise, one honest nudge at a time.",
      },
      { property: "og:title", content: "Nagatha — Your Tough-Love AI Buddy" },
      {
        property: "og:description",
        content:
          "A sarcastic AI companion that actually gets you off the couch — work, chores, and exercise, one honest nudge at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

const HELPS = [
  {
    src: work,
    alt: "Nagatha holding a clipboard and a stopwatch",
    title: "Work you keep avoiding",
    body: "She breaks the scary task into steps, puts a clock on it, and checks back.",
  },
  {
    src: chores,
    alt: "Nagatha in rubber gloves leaning on a mop",
    title: "Housework, honestly",
    body: "No shame spiral. Just the next fifteen minutes, and then the next.",
  },
  {
    src: exercise,
    alt: "Nagatha with a headband, whistle and dumbbell",
    title: "Moving your body",
    body: "Whistle in mouth, zero patience for 'I'll start Monday.'",
  },
  {
    src: win,
    alt: "Nagatha giving a deadpan thumbs up with confetti",
    title: "Actual credit",
    body: "When you finish, she notices. Grudgingly. But she notices.",
  },
];

function Landing() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        void navigate({ to: "/chat", replace: true });
        return;
      }
      setChecking(false);
    });
  }, [navigate]);

  if (checking) {
    return (
      <div className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <img
          src={mascot}
          alt="Nagatha, a grumpy but caring coach with a whistle"
          className="size-28 animate-bounce"
          width={1024}
          height={1024}
        />
        <p className="font-display text-lg italic text-muted-foreground">
          Warming up the whistle…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <span className="font-display text-xl font-semibold tracking-tight">Nagatha</span>
        <Button asChild variant="ghost" size="sm">
          <Link to="/auth">Sign in</Link>
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-20">
        <section className="flex flex-col items-center gap-8 pt-6 pb-16 text-center md:flex-row md:gap-12 md:text-left">
          <img
            src={mascot}
            alt="Nagatha, a grumpy but caring coach with a whistle"
            className="w-48 shrink-0 drop-shadow-sm md:w-64"
            width={1024}
            height={1024}
          />
          <div className="flex flex-col items-center gap-5 md:items-start">
            <h1 className="font-display text-4xl leading-tight font-semibold text-balance md:text-5xl">
              Meet Nagatha. She is not here to be nice.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty">
              Your tough-love AI buddy for the work, chores, and workouts you keep putting off.
              Dry humor, concrete next steps, and absolutely no motivational posters.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/auth">Get nagged properly</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">I already have an account</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          <h2 className="sr-only">What Nagatha helps with</h2>
          {HELPS.map((item) => (
            <article
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card/70 p-5"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="size-20 shrink-0"
                width={1024}
                height={1024}
                loading="lazy"
              />
              <div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-accent/60 px-6 py-10 text-center">
          <h2 className="font-display text-2xl font-semibold">
            Still reading instead of doing something?
          </h2>
          <p className="max-w-md text-muted-foreground">
            Exactly her point. Start a chat and tell her what you are avoiding.
          </p>
          <Button asChild size="lg">
            <Link to="/auth">Start with Nagatha</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
