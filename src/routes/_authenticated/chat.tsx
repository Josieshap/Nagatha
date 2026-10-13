import { createFileRoute, Link, Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, History, ListChecks, LogOut, Menu, MessageSquare, Plus, Route as RouteIcon, Timer, Trash2, UserX } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listThreads, deleteThread } from "@/lib/chat.functions";
import { deleteAccount } from "@/lib/account.functions";
import { ReminderToggle } from "@/components/reminder-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [
      { title: "Chats — Nagatha" },
      { name: "description", content: "Your conversations with Nagatha, your tough-love AI buddy." },
      { property: "og:title", content: "Chats — Nagatha" },
      { property: "og:description", content: "Your saved conversations with Nagatha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatLayout,
});

function ThreadSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchThreads = useServerFn(listThreads);
  const removeThread = useServerFn(deleteThread);
  const removeAccount = useServerFn(deleteAccount);
  const params = useParams({ strict: false }) as { threadId?: string };
  const [email, setEmail] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await removeAccount();
      await supabase.auth.signOut();
      queryClient.clear();
      toast.success("Account deleted. She'll pretend she isn't hurt.");
      void navigate({ to: "/" });
    } catch {
      toast.error("Couldn't delete your account. Try again in a moment.");
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <nav className="mt-4 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain pb-3" aria-label="Chat history">
        {threads && threads.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {threads.map((thread) => {
              const active = params.threadId === thread.id;
              return (
                <li key={thread.id} className="group relative min-w-0">
                  <SheetClose asChild>
                    <Link
                      to="/chat/$threadId"
                      params={{ threadId: thread.id }}
                      onClick={onNavigate}
                      className={cn(
                         "flex min-w-0 items-center gap-2 rounded-lg px-3 py-2 pr-9 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                      )}
                    >
                      <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{thread.title}</span>
                    </Link>
                  </SheetClose>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label={`Delete chat ${thread.title}`}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                      >
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete “{thread.title}”?</AlertDialogTitle>
                        <AlertDialogDescription>This conversation will be permanently deleted.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep it</AlertDialogCancel>
                        <AlertDialogAction onClick={() => void handleDelete(thread.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete chat</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
        <ReminderToggle />
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={() => void handleSignOut()}
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <UserX className="size-4" />
              Delete my account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently deletes your account, every chat, photo, task and lesson score. There's no undo — not even for Nagatha.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep my account</AlertDialogCancel>
              <AlertDialogAction
                disabled={deleting}
                onClick={() => void handleDeleteAccount()}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? "Deleting…" : "Delete forever"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function ChatLayout() {
  const pathname = useRouterState({ select: (router) => router.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = [
    { to: "/chat", label: "New chat", icon: Plus },
    { to: "/chat/reality-check", label: "Reality check", icon: Timer },
    { to: "/chat/progress", label: "Progress", icon: ListChecks },
    { to: "/chat/lessons", label: "Lessons", icon: BookOpen },
    { to: "/chat/planner", label: "Lesson plan", icon: RouteIcon },
  ] as const;
  const currentPage = pathname.startsWith("/chat/course/") || pathname.startsWith("/chat/lesson/")
    ? "Lessons"
    : navigation.find((item) => item.to !== "/chat" && item.to === pathname)?.label ?? "Chat";

  return (
    <div className="flex h-dvh min-w-0 flex-col overflow-hidden bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <header className="grid min-h-16 shrink-0 grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-3 border-b bg-card/70 px-4 py-2">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="size-11" aria-label="Open navigation menu"><Menu className="size-6" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex h-dvh min-h-0 w-[min(90vw,24rem)] flex-col gap-0 overflow-hidden px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] [&>button]:top-[max(1rem,env(safe-area-inset-top))] [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center">
              <SheetHeader className="px-3 pr-12 text-left"><SheetTitle className="font-display text-2xl">Nagatha</SheetTitle><SheetDescription className="sr-only">Navigation, saved chats, and account settings.</SheetDescription></SheetHeader>
              <nav aria-label="Main navigation" className="mt-5 flex shrink-0 flex-col gap-1 border-b border-sidebar-border pb-4">
                {navigation.map((item) => {
                  const active = item.to === "/chat/lessons"
                    ? currentPage === "Lessons"
                    : pathname === item.to || (item.to === "/chat" && pathname === "/chat/");
                  return (
                    <Button key={item.to} asChild variant="ghost" className={cn("h-11 w-full justify-start gap-3 px-3 text-base", active && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                      <Link to={item.to} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)}><item.icon className="size-5" />{item.label}</Link>
                    </Button>
                  );
                })}
              </nav>
              <h2 className="mt-4 flex shrink-0 items-center gap-2 px-3 text-sm font-semibold text-muted-foreground"><History className="size-4" />Chat history</h2>
              <div className="min-h-0 flex-1"><ThreadSidebar onNavigate={() => setMenuOpen(false)} /></div>
            </SheetContent>
          </Sheet>
        <div className="min-w-0 text-center">
          <Link to="/chat" className="block truncate font-display text-xl font-bold">Nagatha</Link>
          <p className="truncate text-xs text-muted-foreground">{currentPage}</p>
        </div>
        <Button asChild type="button" size="icon" variant="ghost" className="size-11"><Link to="/chat" aria-label="New chat" title="New chat"><Plus className="size-5" /></Link></Button>
      </header>
      <main className="flex min-h-0 min-w-0 flex-1"><Outlet /></main>
    </div>
  );
}
