import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getSharedChat } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import mascot from "@/assets/nagatha-idle.png";

const TITLE = "See Nagatha in action — a real chat";
const DESC = "Someone shared their chat with Nagatha, the tough-love AI buddy who gets you moving. Read it, then try her yourself.";

export const Route = createFileRoute("/share/$token")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://nagatha.lovable.app/nagatha-share.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://nagatha.lovable.app/nagatha-share.jpg" },
    ],
  }),
  component: SharePage,
});

function SharePage() {
  const { token } = Route.useParams();
  const fetchChat = useServerFn(getSharedChat);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["shared", token],
    queryFn: () => fetchChat({ data: { token } }),
  });

  const tryNagatha = async () => {
    const { data: s } = await supabase.auth.getSession();
    void navigate({ to: s.session ? "/chat" : "/auth" });
  };

  const cta = (
    <Button size="lg" onClick={() => void tryNagatha()} className="text-base">
      Chat with Nagatha yourself
    </Button>
  );

  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-10 text-center">
        <img src={mascot} alt="Nagatha, the knitted tough-love AI buddy" width={1024} height={1024} className="w-64 max-w-full object-contain sm:w-80" />
        <h1 className="mt-4 font-display text-3xl sm:text-4xl">Someone let Nagatha boss them around.</h1>
        <p className="mt-2 max-w-md text-muted-foreground">Here's how it went. Your turn is one click away.</p>
        <div className="mt-6">{cta}</div>
      </header>

      <main className="mx-auto mt-10 w-full max-w-2xl px-3 pb-16 sm:px-4">
        <div className="flex flex-col gap-6 rounded-2xl border bg-card/70 p-4 sm:p-6">
          {isLoading && <Shimmer className="text-sm">Fetching the receipts…</Shimmer>}
          {!isLoading && !data && (
            <p className="text-center text-sm text-muted-foreground">This shared chat isn't available anymore.</p>
          )}
          {data?.messages.map((m) => (
            <Message key={m.id} from={m.role as "user" | "assistant"} className="min-w-0">
              <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:rounded-2xl group-[.is-user]:text-primary-foreground">
                {m.attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {m.attachments.map((a, i) => (
                      <img key={i} src={a.url} alt={a.name} className="size-24 rounded-lg object-cover" />
                    ))}
                  </div>
                )}
                {m.role === "assistant" ? (
                  <MessageResponse className="chat-markdown">{m.content}</MessageResponse>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </MessageContent>
            </Message>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-display text-xl italic">Think you can handle her?</p>
          {cta}
        </div>
      </main>
    </div>
  );
}
