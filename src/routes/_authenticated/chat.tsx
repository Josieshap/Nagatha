import { createFileRoute, Link, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ListChecks, LogOut, Menu, MessageSquare, Plus, Timer, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listThreads, deleteThread } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import mascot from "@/assets/nagatha-idle.png";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [
      { title: "Chats — Nagatha" },
      { name: "description", content: "Your conversations with Nagatha, your tough-love AI buddy." },
    ],
  }),
  component: ChatLayout,
});

function ThreadSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchThreads = useServerFn(listThreads);
  const removeThread = useServerFn(deleteThread);
  const params = useParams({ strict: false }) as { threadId?: string };
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const { data: threads } = useQuery({
    queryKey: ["threads"],
    queryFn: () => fetchThreads(),
  });

  const handleDelete = async (threadId: string) => {
    try {
      await removeThread({ data: { threadId } });
      void queryClient.invalidateQueries({ queryKey: ["threads"] });
      if (params.threadId === threadId) {
        void navigate({ to: "/chat" });
      }
    } catch {
      toast.error("Couldn't delete that chat. Nagatha keeps receipts anyway.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <img
          src={mascot}
          alt="Nagatha mascot"
          className="size-9"
          width={1024}
          height={1024}
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="font-display text-lg font-bold leading-tight">Nagatha</p>
          <p className="text-xs text-muted-foreground leading-tight">Tough love, on tap</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-3">
        <Button asChild className="w-full justify-start gap-2">
          <Link to="/chat" onClick={onNavigate}>
            <Plus className="size-4" />
            New chat
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <Link to="/chat/reality-check" onClick={onNavigate}>
            <Timer className="size-4" />
            Reality check
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <Link to="/chat/progress" onClick={onNavigate}>
            <ListChecks className="size-4" />
            Progress tracker
          </Link>
        </Button>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-3" aria-label="Chat threads">
        {threads && threads.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {threads.map((thread) => {
              const active = params.threadId === thread.id;
              return (
                <li key={thread.id} className="group relative">
                  <Link
                    to="/chat/$threadId"
                    params={{ threadId: thread.id }}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 pr-9 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                    )}
                  >
                    <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{thread.title}</span>
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete chat ${thread.title}`}
                    onClick={() => void handleDelete(thread.id)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-3 text-xs text-muted-foreground">
            No chats yet. Procrastinating on starting one? Noted.
          </p>
        )}
      </nav>

      <div className="border-t border-sidebar-border px-3 py-3">
        {email && <p className="truncate px-2 pb-2 text-xs text-muted-foreground">{email}</p>}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={() => void handleSignOut()}
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

function ChatLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
        <ThreadSidebar />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-sidebar-border bg-sidebar shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent"
            >
              <X className="size-5" />
            </button>
            <ThreadSidebar onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b px-3 py-2.5 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-1.5 text-foreground hover:bg-accent"
          >
            <Menu className="size-5" />
          </button>
          <img
            src={mascot}
            alt=""
            className="size-6"
            width={1024}
            height={1024}
            loading="lazy"
          />
          <span className="font-display font-bold">Nagatha</span>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
