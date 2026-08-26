import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import mascot from "@/assets/nagatha-mascot.png";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) void navigate({ to: "/auth", replace: true });
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        void navigate({ to: "/auth", replace: true });
      } else {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!ready) {
    return (
      <div className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <img
          src={mascot}
          alt="Nagatha, a grumpy coffee mug coach with a whistle"
          className="size-24 animate-bounce"
          width={1024}
          height={1024}
          loading="lazy"
        />
        <p className="font-display text-lg italic text-muted-foreground">
          Warming up the whistle…
        </p>
      </div>
    );
  }

  return <Outlet />;
}
