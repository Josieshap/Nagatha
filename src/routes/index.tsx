import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import mascot from "@/assets/nagatha-idle.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nagatha — Your Tough-Love AI Buddy" },
      {
        name: "description",
        content:
          "A sarcastic Gen X AI companion that actually gets you off the couch — work, chores, and exercise, one roast at a time.",
      },
      { property: "og:title", content: "Nagatha — Your Tough-Love AI Buddy" },
      {
        property: "og:description",
        content:
          "A sarcastic Gen X AI companion that actually gets you off the couch — work, chores, and exercise, one roast at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      void navigate({ to: data.session ? "/chat" : "/auth", replace: true });
    });
  }, [navigate]);

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
