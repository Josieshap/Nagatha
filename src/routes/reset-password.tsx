import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authErrorMessage } from "@/lib/auth-errors";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Reset your password — Nagatha" },
    { name: "description", content: "Set a new password for your Nagatha account." },
    { property: "og:title", content: "Reset your password — Nagatha" },
    { property: "og:description", content: "Recover access to your Nagatha account securely." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    if (hash.get("type") !== "recovery") {
      setError("Open the newest password-reset link from your email. If it has expired, request another link.");
      return;
    }
    void supabase.auth.getUser().then(({ data, error: sessionError }) => {
      if (sessionError || !data.user) {
        setError("This reset link is invalid or expired. Request another link and open the newest email.");
      } else {
        setReady(true);
        window.history.replaceState(null, "", window.location.pathname);
      }
    });
  }, []);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      await navigate({ to: "/chat", replace: true });
    } catch (err) {
      setError(authErrorMessage(err));
    } finally { setBusy(false); }
  }
  return <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-bold">Reset your Nagatha password</h1>
      {ready && <form onSubmit={submit} className="mt-6 space-y-4">
        <Label htmlFor="new-password">New password (required)</Label>
        <Input id="new-password" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? "reset-hint reset-error" : "reset-hint"} />
        <p id="reset-hint" className="text-sm text-muted-foreground">Use at least 6 characters.</p>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Saving…" : "Save new password"}</Button>
      </form>}
      {!ready && !error && <p role="status" className="mt-4">Checking your reset link…</p>}
      {error && <p id="reset-error" role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      <footer className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link to="/auth" className="underline">Back to sign in</Link>
        <Link to="/help" className="underline">Help</Link>
        <Link to="/privacy" className="underline">Privacy</Link>
        <Link to="/terms" className="underline">Terms</Link>
      </footer>
    </div>
  </main>;
}