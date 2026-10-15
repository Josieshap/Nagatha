import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { isAdmin: data === true };
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");

    const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
    const count = async (table: "threads" | "messages" | "tasks" | "lesson_progress" | "nag_settings", since?: string) => {
      let q = db.from(table).select("*", { count: "exact", head: true });
      if (since) q = q.gte("created_at", since);
      const { count: c } = await q;
      return c ?? 0;
    };

    const { data: usersPage } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const users = usersPage?.users ?? [];

    const [threads, messages, messagesWeek, tasks, lessons, nagsOn, lessonRows, threadRows, taskRows] = await Promise.all([
      count("threads"),
      count("messages"),
      count("messages", weekAgo),
      count("tasks"),
      count("lesson_progress"),
      db.from("nag_settings").select("*", { count: "exact", head: true }).neq("nag_time", "off").then((r) => r.count ?? 0),
      db.from("lesson_progress").select("subject_id, completed"),
      db.from("threads").select("user_id, updated_at"),
      db.from("tasks").select("user_id, done"),
    ]);

    const subjects: Record<string, { started: number; completed: number }> = {};
    for (const r of lessonRows.data ?? []) {
      const s = (subjects[r.subject_id] ??= { started: 0, completed: 0 });
      s.started++;
      if (r.completed) s.completed++;
    }

    const perUser = new Map<string, { chats: number; last: string | null; tasks: number; done: number }>();
    for (const t of threadRows.data ?? []) {
      const u = perUser.get(t.user_id) ?? { chats: 0, last: null, tasks: 0, done: 0 };
      u.chats++;
      if (!u.last || t.updated_at > u.last) u.last = t.updated_at;
      perUser.set(t.user_id, u);
    }
    for (const t of taskRows.data ?? []) {
      const u = perUser.get(t.user_id) ?? { chats: 0, last: null, tasks: 0, done: 0 };
      u.tasks++;
      if (t.done) u.done++;
      perUser.set(t.user_id, u);
    }

    const userList = users
      .map((u) => {
        const s = perUser.get(u.id);
        return {
          email: u.email ?? "(no email)",
          joined: u.created_at,
          lastSignIn: u.last_sign_in_at ?? null,
          chats: s?.chats ?? 0,
          tasks: s?.tasks ?? 0,
          tasksDone: s?.done ?? 0,
          lastActive: s?.last ?? null,
        };
      })
      .sort((a, b) => (b.lastActive ?? b.joined).localeCompare(a.lastActive ?? a.joined));

    return {
      totals: {
        users: users.length,
        newUsersWeek: users.filter((u) => u.created_at >= weekAgo).length,
        activeWeek: users.filter((u) => (u.last_sign_in_at ?? "") >= weekAgo).length,
        threads,
        messages,
        messagesWeek,
        tasks,
        lessons,
        nagsOn,
      },
      subjects: Object.entries(subjects).map(([id, v]) => ({ id, ...v })).sort((a, b) => b.started - a.started),
      users: userList,
    };
  });
