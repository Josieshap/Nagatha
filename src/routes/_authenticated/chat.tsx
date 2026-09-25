import { createFileRoute, Link, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { History, ListChecks, LogOut, MessageSquare, Plus, Timer, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listThreads, deleteThread } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import mascot from "@/assets/nagatha-idle.png";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
      <nav className="mt-4 flex-1 overflow-y-auto pb-3" aria-label="Chat history">
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
  return (
    <div className="flex h-dvh min-w-0 flex-col bg-background">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-card/70 px-3 py-2 sm:px-5">
        <Link to="/chat" className="flex min-w-0 items-center gap-2 font-display font-bold">
          <img src={mascot} alt="" className="size-8 shrink-0 object-contain" width={1024} height={1024} />
          <span className="truncate">Nagatha</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <Button asChild type="button" size="sm" variant="ghost"><Link to="/chat"><Plus />New</Link></Button>
          <Button asChild type="button" size="sm" variant="ghost"><Link to="/chat/reality-check"><Timer /><span className="hidden sm:inline">Reality check</span></Link></Button>
          <Button asChild type="button" size="sm" variant="ghost"><Link to="/chat/progress"><ListChecks /><span className="hidden sm:inline">Progress</span></Link></Button>
          <Sheet>
            <SheetTrigger asChild><Button type="button" size="sm" variant="outline"><History />History</Button></SheetTrigger>
            <SheetContent className="flex w-[min(90vw,24rem)] flex-col p-5">
              <SheetHeader className="pr-8"><SheetTitle className="font-display">Chat history</SheetTitle><SheetDescription>Pick up where you left off.</SheetDescription></SheetHeader>
              <ThreadSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex min-h-0 min-w-0 flex-1"><Outlet /></main>
    </div>
  );
}
