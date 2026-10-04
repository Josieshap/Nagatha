import { createFileRoute } from "@tanstack/react-router";

// TEMPORARY one-off seeding endpoint. Removed right after use.
const KEY = "nagatha-seed-7f3e9c21b8a54d06";
const EMAIL = "appreview@nagatha.app";
const PASSWORD = "NagathaReview2026!";

const THREADS: { title: string; msgs: [string, string][] }[] = [
  {
    title: "Getting off the couch",
    msgs: [
      ["user", "I have laundry, dishes, and a 30 minute workout to do and I just want to lie here."],
      ["assistant", "Bold strategy, horizontal. Here's the deal: the couch isn't going anywhere, and neither is the laundry.\n\n1. **Start the washer now** — 2 minutes. The machine does the work while you complain.\n2. **Dishes, 10 minutes.** Set a timer. When it rings, you may stop. You won't, but you may.\n3. **Workout while the washer runs.** 30 minutes. Shoes on first — shoes are a contract.\n\nWhich one are you starting in the next 60 seconds?"],
      ["user", "Fine. Washer."],
      ["assistant", "Look at you, making decisions. Go. Report back when it's spinning, and then we'll talk about those dishes you've been pretending are 'soaking'."],
    ],
  },
  {
    title: "Math homework help",
    msgs: [
      ["user", "Can you just give me the answer to 3x + 7 = 22?"],
      ["assistant", "Nice try. I'm your coach, not your ghostwriter.\n\nLet's do a twin problem instead: **2x + 5 = 13**.\n\n- Subtract 5 from both sides: 2x = 8\n- Divide both sides by 2: x = 4\n- Check: 2(4) + 5 = 13. It works.\n\nThe idea: undo the addition first, then undo the multiplication. Now your turn — what's the first thing you'd do to **3x + 7 = 22**?"],
      ["user", "Subtract 7 from both sides so 3x = 15"],
      ["assistant", "Correct. Annoyingly competent. Now what do you do with that 3 that's clinging to x?"],
    ],
  },
  {
    title: "Italian flashcards",
    msgs: [
      ["user", "Flashcards on Italian food words"],
      ["assistant", "Eight cards, one at a time. No peeking, I'll know.\n\n**Card 1:** What does *il formaggio* mean?"],
      ["user", "cheese"],
      ["assistant", "Correct — **cheese**. Memory trick: think *fromage*, then imagine the Italians making it louder.\n\n**Card 2:** How do you say *the bread*?"],
    ],
  },
];

const TASKS: [string, boolean][] = [
  ["Morning run, 20 minutes", true],
  ["Italian lesson 2", true],
  ["Clean the kitchen", true],
  ["Reply to work emails", true],
  ["Math homework chapter 4", false],
  ["Fold the laundry", false],
  ["Call the dentist", false],
];

export const Route = createFileRoute("/api/public/seed-reviewer")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (request.headers.get("x-seed-key") !== KEY) return new Response("no", { status: 401 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        let user = list?.users.find((u) => u.email === EMAIL);
        if (!user) {
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: EMAIL, password: PASSWORD, email_confirm: true,
          });
          if (error) return new Response(error.message, { status: 500 });
          user = data.user;
        }
        const uid = user!.id;
        await supabaseAdmin.from("threads").delete().eq("user_id", uid);
        await supabaseAdmin.from("tasks").delete().eq("user_id", uid);
        await supabaseAdmin.from("lesson_progress").delete().eq("user_id", uid);
        const base = Date.now() - 3 * 3600_000;
        for (const [ti, t] of THREADS.entries()) {
          const ts = new Date(base + ti * 3600_000);
          const { data: th, error } = await supabaseAdmin.from("threads")
            .insert({ user_id: uid, title: t.title, created_at: ts.toISOString(), updated_at: ts.toISOString() })
            .select("id").single();
          if (error) return new Response(error.message, { status: 500 });
          await supabaseAdmin.from("messages").insert(t.msgs.map(([role, content], i) => ({
            thread_id: th.id, role, content, created_at: new Date(ts.getTime() + i * 60_000).toISOString(),
          })));
        }
        await supabaseAdmin.from("tasks").insert(TASKS.map(([title, done]) => ({
          user_id: uid, title, done, completed_at: done ? new Date().toISOString() : null,
        })));
        const lp = [["italian", "italian-1", 92], ["italian", "italian-2", 83], ["math", "math-1", 100], ["spanish", "spanish-1", 75]] as const;
        await supabaseAdmin.from("lesson_progress").insert(lp.map(([s, l, score]) => ({
          user_id: uid, subject_id: s, lesson_id: l, score, completed: true, attempts: 1, completed_at: new Date().toISOString(),
        })));
        return Response.json({ ok: true, uid });
      },
    },
  },
});
