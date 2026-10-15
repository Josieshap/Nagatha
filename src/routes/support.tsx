import { createFileRoute, Link } from "@tanstack/react-router";
import mascot from "@/assets/nagatha-idle.png";

const TITLE = "Support — Nagatha";
const DESCRIPTION = "Contact Nagatha for help with your account, chats, lessons and daily nags, or send a privacy request.";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="min-h-screen bg-paper px-4 py-10">
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-2xl">
        <Link to="/" className="flex items-center gap-3">
          <img src={mascot} alt="Nagatha" className="size-14" width={1024} height={1024} />
          <span className="font-display text-xl font-bold">Nagatha</span>
        </Link>
        <h1 className="mt-8 font-display text-4xl font-bold">Nagatha Support</h1>
        <section className="mt-6 rounded-2xl border bg-card p-5">
          <h2 className="font-display text-xl font-semibold">Ask Nagatha first</h2>
          <p className="mt-2 text-sm text-muted-foreground">She answers app questions instantly. With commentary.</p>
          <Link to="/help" className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open the help desk</Link>
        </section>
        <p className="mt-6 leading-relaxed">Even Nagatha occasionally needs backup. For help with your account, chats, lessons or daily nags, email us.</p>
        <a href="mailto:forkyeahbaby@gmail.com" className="mt-6 inline-block break-all text-primary underline underline-offset-4">forkyeahbaby@gmail.com</a>
        <p className="mt-6 leading-relaxed">Tell us what happened and whether you’re using the iPhone app or the website. Please don’t send passwords or sensitive photos.</p>
        <section className="mt-8">
          <h2 className="font-display text-2xl font-semibold">Privacy and account deletion</h2>
          <p className="mt-3 leading-relaxed">Use the same email for privacy questions or deletion requests. You can also delete your account from the account controls in the app’s menu.</p>
          <Link to="/privacy" className="mt-4 inline-block text-primary underline underline-offset-4">Privacy Policy</Link>
          <Link to="/terms" className="mt-4 ml-4 inline-block text-primary underline underline-offset-4">Terms of Use</Link>
        </section>
        <footer className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">© 2026 Nagatha. All rights reserved.</footer>
      </main>
    </div>
  );
}