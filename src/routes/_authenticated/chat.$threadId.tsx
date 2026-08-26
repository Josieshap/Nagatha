import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { UIMessage } from "ai";
import { getThreadMessages } from "@/lib/chat.functions";
import { ChatWindow } from "@/components/chat-window";
import { Shimmer } from "@/components/ai-elements/shimmer";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  head: () => ({
    meta: [
      { title: "Chat — Nagatha" },
      {
        name: "description",
        content: "Chat with Nagatha, your tough-love AI buddy for work, chores, and exercise.",
      },
    ],
  }),
  component: ThreadPage,
});

function ThreadPage() {
  const { threadId } = Route.useParams();
  const fetchMessages = useServerFn(getThreadMessages);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => fetchMessages({ data: { threadId } }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Shimmer className="text-sm">Dusting off this conversation…</Shimmer>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-1 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Couldn't load this chat. It might have been deleted — or it's hiding from you.
        </p>
      </div>
    );
  }

  const initialMessages: UIMessage[] = data.map((row) => ({
    id: row.id,
    role: row.role as "user" | "assistant",
    parts: [{ type: "text", text: row.content }],
  }));

  return <ChatWindow key={threadId} threadId={threadId} initialMessages={initialMessages} />;
}
