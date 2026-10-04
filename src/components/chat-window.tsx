import { useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Share2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { createShareLink } from "@/lib/chat.functions";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
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
import { NAGATHA_MOODS, detectMood } from "@/lib/nagatha-mood";

export const PENDING_MESSAGE_KEY = (threadId: string) => `nagatha:pending:${threadId}`;

type PendingMessage = {
  text: string;
  files?: FileUIPart[];
  attachments?: Array<{ path: string; name: string; mediaType: string }>;
};

function textOf(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function PhotoPreviews() {
  const attachments = usePromptInputAttachments();
  if (attachments.files.length === 0) return null;

  return (
    <PromptInputHeader>
      <Attachments aria-label="Selected photos">
        {attachments.files.map((file) => (
          <Attachment key={file.id} data={file} onRemove={() => attachments.remove(file.id)}>
            <AttachmentPreview />
            <AttachmentRemove />
          </Attachment>
        ))}
      </Attachments>
    </PromptInputHeader>
  );
}

export function ChatWindow({
  threadId,
  initialMessages,
  onDelete,
}: {
  threadId: string;
  initialMessages: UIMessage[];
  onDelete: () => Promise<void>;
}) {
  const queryClient = useQueryClient();
  const makeShareLink = useServerFn(createShareLink);

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

  // Nagatha changes her pose based on what the conversation is about.
  const mood = useMemo(
    () => detectMood(messages.slice(-6).map((m) => textOf(m))),
    [messages],
  );
  const moodInfo = NAGATHA_MOODS[mood];

  // Send the first message carried over from the new-chat screen.
  const sentPending = useRef(false);
  useEffect(() => {
    if (sentPending.current) return;
    const pendingValue = sessionStorage.getItem(PENDING_MESSAGE_KEY(threadId));
    if (pendingValue && initialMessages.length === 0) {
      sentPending.current = true;
      sessionStorage.removeItem(PENDING_MESSAGE_KEY(threadId));
      let pending: PendingMessage;
      try {
        pending = JSON.parse(pendingValue) as PendingMessage;
      } catch {
        pending = { text: pendingValue };
      }
      void sendMessage(
        { text: pending.text, files: pending.files ?? [] },
        { body: { attachments: pending.attachments ?? [] } },
      );
    }
  }, [threadId, initialMessages.length, sendMessage]);

  const handleSubmit = async (message: PromptInputMessage) => {
    const text = message.text.trim();
    if ((!text && message.files.length === 0) || isLoading) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Please sign in again to add a photo.");

      const stored: Array<{ path: string; name: string; mediaType: string }> = [];
      const files: FileUIPart[] = [];
      for (const file of message.files) {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const extension = file.filename?.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
        const path = `${userData.user.id}/${threadId}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("chat-images").upload(path, blob, {
          contentType: file.mediaType,
          upsert: false,
        });
        if (uploadError) throw new Error(uploadError.message);

        const { data: signed, error: signError } = await supabase.storage.from("chat-images").createSignedUrl(path, 3600);
        if (signError) throw new Error(signError.message);
        stored.push({ path, name: file.filename || "Photo", mediaType: file.mediaType });
        files.push({ type: "file", filename: file.filename || "Photo", mediaType: file.mediaType, url: signed.signedUrl });
      }

      await sendMessage(
        { text: text || "Please look at this photo and help me with what you see.", files },
        { body: { attachments: stored } },
      );
    } catch (uploadError) {
      toast.error(uploadError instanceof Error ? uploadError.message : "Couldn't add that photo.");
      throw uploadError;
    }
  };

  const shareConversation = async () => {
    let url: string;
    try {
      const { token } = await makeShareLink({ data: { threadId } });
      url = `${window.location.origin}/share/${token}`;
    } catch {
      toast.error("Couldn't make a share link. Try again in a moment.");
      return;
    }
    try {
      void haptic("light");
      if (await nativeShare({ title: "My chat with Nagatha", text: "Look how Nagatha handled me:", url })) return;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied. Go forth and overshare responsibly.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.message("Share this link:", { description: url, duration: 15000 });
    }
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
      {messages.length > 0 && (
        <aside className="hidden w-48 shrink-0 flex-col items-center border-r bg-card/40 px-4 py-8 text-center lg:flex">
          <img key={mood} src={moodInfo.src} alt={moodInfo.alt} className="w-full max-w-44 animate-in object-contain fade-in zoom-in-75 duration-300" width={1024} height={1024} />
          <p className="mt-3 font-display text-sm italic text-muted-foreground">{moodInfo.caption}</p>
        </aside>
      )}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      {messages.length > 0 && (
        <div className="shrink-0 border-b bg-card/70 px-3 py-2 backdrop-blur lg:hidden sm:px-4">
          <div className="mx-auto grid w-full max-w-2xl grid-cols-[auto_minmax(0,1fr)] items-center gap-3 overflow-hidden">
            <img
              key={mood}
              src={moodInfo.src}
              alt={moodInfo.alt}
              className="size-20 shrink-0 animate-in object-contain fade-in zoom-in-75 duration-300 min-[430px]:size-24 sm:size-28"
              width={1024}
              height={1024}
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-display text-sm italic text-muted-foreground">{moodInfo.caption}</p>
              <div className="mt-2 flex gap-1">
                <Button type="button" size="icon-sm" variant="ghost" aria-label="Share this chat" title="Share this chat" onClick={() => void shareConversation()}>
                  <Share2 />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" size="icon-sm" variant="ghost" aria-label="Delete this chat" title="Delete this chat">
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
                      <AlertDialogDescription>This conversation will be gone for good. Nagatha will pretend not to be sentimental.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep it</AlertDialogCancel>
                      <AlertDialogAction onClick={() => void onDelete()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete chat</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      )}

      <Conversation className="min-h-0 min-w-0 flex-1">
        <ConversationContent className="mx-auto w-full min-w-0 max-w-2xl gap-6 overflow-x-hidden px-3 py-5 sm:px-4 sm:py-6">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <img
                src={NAGATHA_MOODS.idle.src}
                alt={NAGATHA_MOODS.idle.alt}
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
            const photos = message.parts.filter((part): part is FileUIPart => part.type === "file" && part.mediaType.startsWith("image/"));
            if (!text && photos.length === 0) return null;
            return (
              <Message key={message.id} from={message.role} className="min-w-0">
                <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:rounded-2xl group-[.is-user]:text-primary-foreground">
                  {photos.length > 0 && (
                    <Attachments className="mb-2 ml-0 max-w-full" aria-label={`${message.role === "user" ? "Your" : "Nagatha's"} attached photos`}>
                      {photos.map((photo, index) => (
                        <Attachment className="size-20 min-[430px]:size-24" key={`${message.id}-photo-${index}`} data={{ ...photo, id: `${message.id}-photo-${index}` }}>
                          <AttachmentPreview />
                        </Attachment>
                      ))}
                    </Attachments>
                  )}
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

      <div className="shrink-0 border-t bg-background px-3 py-3 sm:px-4">
        <div className="mx-auto w-full min-w-0 max-w-2xl overflow-hidden">
          <PromptInput
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            maxFiles={3}
            maxFileSize={10 * 1024 * 1024}
            onError={({ code }) => toast.error(code === "max_files" ? "Three photos at a time, paparazzi." : code === "max_file_size" ? "That photo is over 10 MB." : "Please choose a JPG, PNG, WebP, or GIF photo.")}
            onSubmit={handleSubmit}
          >
            <PhotoPreviews />
            <PromptInputTextarea
              autoFocus
              placeholder={messages.some((message) => /Spanish|Italian|French|German|Korean|English|lesson|tutor/i.test(textOf(message))) ? "Ask a question about your lesson…" : "Ask Nagatha for help…"}
              aria-label="Message Nagatha"
            />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger tooltip="Add a photo" aria-label="Add a photo" />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments label="Add photos" />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <span className="hidden text-xs text-muted-foreground sm:inline">Add a reference photo</span>
              </PromptInputTools>
              <PromptInputSubmit status={status} disabled={isLoading} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Nagatha roasts with love. Your chores fear her.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
