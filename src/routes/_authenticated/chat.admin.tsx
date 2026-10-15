import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { checkIsAdmin, getAdminStats } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/chat/admin")({
  head: () => ({ meta: [
    { title: "Admin — Nagatha" },
    { name: "description", content: "See how people are using Nagatha." },
    { property: "og:title", content: "Admin — Nagatha" },
    { property: "og:description", content: "Usage overview for Nagatha." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AdminPage,
});

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—");

function AdminPage() {
  const check = useServerFn(checkIsAdmin);
  const stats = useServerFn(getAdminStats);
  const role = useQuery({ queryKey: ["is-admin"], queryFn: () => check() });
  const q = useQuery({ queryKey: ["admin-stats"], queryFn: () => stats(), enabled: role.data?.isAdmin === true });

  if (role.isLoading) return <p className="p-6 text-muted-foreground">Checking your clearance…</p>;
  if (!role.data?.isAdmin) return <p className="p-6 text-muted-foreground">Nice try. This page is for the admin only.</p>;
  if (q.isLoading) return <p className="p-6 text-muted-foreground">Counting everyone's procrastination…</p>;
  if (q.error || !q.data) return <p className="p-6 text-destructive">Couldn't load stats.</p>;

  const { totals, subjects, users } = q.data;
  const cards: [string, number][] = [
    ["People", totals.users],
    ["New this week", totals.newUsersWeek],
    ["Signed in this week", totals.activeWeek],
    ["Chats", totals.threads],
    ["Messages", totals.messages],
    ["Messages this week", totals.messagesWeek],
    ["Tasks", totals.tasks],
    ["Lessons started", totals.lessons],
    ["Daily nags on", totals.nagsOn],
  ];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 overflow-y-auto p-4 pb-16">
      <h1 className="font-display text-2xl">How Nagatha is being used</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map(([label, n]) => (
          <div key={label} className="rounded-xl border bg-card p-4">
            <div className="text-2xl font-bold">{n}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-2 font-display text-lg">Lessons by subject</h2>
        {subjects.length === 0 ? <p className="text-sm text-muted-foreground">No lessons yet.</p> : (
          <ul className="divide-y rounded-xl border bg-card">
            {subjects.map((s) => (
              <li key={s.id} className="flex justify-between p-3 text-sm capitalize">
                <span>{s.id}</span><span>{s.started} started · {s.completed} finished</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-2 font-display text-lg">People</h2>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr><th className="p-3">Email</th><th className="p-3">Joined</th><th className="p-3">Last sign-in</th><th className="p-3">Chats</th><th className="p-3">Tasks done</th></tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.email + u.joined}>
                  <td className="max-w-[12rem] truncate p-3">{u.email}</td>
                  <td className="p-3">{fmt(u.joined)}</td>
                  <td className="p-3">{fmt(u.lastSignIn)}</td>
                  <td className="p-3">{u.chats}</td>
                  <td className="p-3">{u.tasksDone}/{u.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
