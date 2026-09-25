import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { UIMessage } from "ai";
import { deleteThread, getThreadMessages } from "@/lib/chat.functions";
import { ChatWindow } from "@/components/chat-window";
import { Shimmer } from "@/components/ai-elements/shimmer";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  head: () => ({
    meta: [
      { title: "Chat — Nagatha" },
      {
        name: "description",
        content: "Chat with Nagatha for motivation or tutoring in languages, Math, and English.",
      },
      { property: "og:title", content: "Chat — Nagatha" },
      { property: "og:description", content: "Chat with Nagatha for motivation, practical help, and tutoring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ThreadPage,
});

function ThreadPage() {
  const { threadId } = Route.useParams();
  const fetchMessages = useServerFn(getThreadMessages);
  const removeThread = useServerFn(deleteThread);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    parts: [
      ...(Array.isArray(row.attachments) ? row.attachments : []).map((attachment) => ({
        type: "file" as const,
        filename: attachment.name,
        mediaType: attachment.mediaType,
        url: attachment.url,
      })),
      { type: "text" as const, text: row.content },
    ],
  }));

  const handleDelete = async () => {
    try {
      await removeThread({ data: { threadId } });
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      void navigate({ to: "/chat" });
      toast.success("Chat deleted. Evidence successfully destroyed.");
    } catch {
      toast.error("Couldn't delete that chat. Nagatha keeps receipts anyway.");
    }
  };

  return <ChatWindow key={threadId} threadId={threadId} initialMessages={initialMessages} onDelete={handleDelete} />;
}
