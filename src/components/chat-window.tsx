import { useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import mascot from "@/assets/nagatha-mascot.png";

export const PENDING_MESSAGE_KEY = (threadId: string) => `nagatha:pending:${threadId}`;

function textOf(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatWindow({
  threadId,
  initialMessages,
}: {
  threadId: string;
  initialMessages: UIMessage[];
}) {
  const queryClient = useQueryClient();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: async () => {
          const { data } = await supabase.auth.getSession();
          return data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {};
        },
        body: { threadId },
      }),
    [threadId],
  );

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onFinish: () => {
      void queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Nagatha choked on her coffee. Give that another shot.");
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Send the first message carried over from the new-chat screen.
  const sentPending = useRef(false);
  useEffect(() => {
    if (sentPending.current) return;
    const pending = sessionStorage.getItem(PENDING_MESSAGE_KEY(threadId));
    if (pending && initialMessages.length === 0) {
      sentPending.current = true;
      sessionStorage.removeItem(PENDING_MESSAGE_KEY(threadId));
      void sendMessage({ text: pending });
    }
  }, [threadId, initialMessages.length, sendMessage]);

  const handleSubmit = (message: PromptInputMessage) => {
    const text = message.text.trim();
    if (!text || isLoading) return;
    void sendMessage({ text });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-2xl gap-6 px-4 py-6">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <img
                src={mascot}
                alt="Nagatha, a grumpy coffee mug coach with a whistle"
                className="size-20"
                width={1024}
                height={1024}
                loading="lazy"
              />
              <p className="font-display text-lg italic text-muted-foreground">
                Well? The couch isn't going to miss you.
              </p>
            </div>
          )}

          {messages.map((message) => {
            const text = textOf(message);
            if (!text) return null;
            return (
              <Message key={message.id} from={message.role}>
                <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:rounded-2xl group-[.is-user]:text-primary-foreground">
                  {message.role === "assistant" ? (
                    <MessageResponse className="chat-markdown">{text}</MessageResponse>
                  ) : (
                    <p className="whitespace-pre-wrap">{text}</p>
                  )}
                </MessageContent>
              </Message>
            );
          })}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer className="text-sm">Nagatha is cracking her knuckles…</Shimmer>
              </MessageContent>
            </Message>
          )}

          {status === "error" && error && (
            <p className="text-center text-sm font-medium text-destructive">
              That one got away from us. Try sending it again.
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t bg-background px-4 py-3">
        <div className="mx-auto w-full max-w-2xl">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              placeholder="Tell Nagatha what you're avoiding…"
              aria-label="Message Nagatha"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={isLoading} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Nagatha roasts with love. Your chores fear her.
          </p>
        </div>
      </div>
    </div>
  );
}
