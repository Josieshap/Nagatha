import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Briefcase, BookOpen, Dumbbell, Flame, Home, Route as RouteIcon, Timer } from "lucide-react";
import { createThread } from "@/lib/chat.functions";
import { PENDING_MESSAGE_KEY } from "@/components/chat-window";
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
import { Attachment, AttachmentPreview, AttachmentRemove, Attachments } from "@/components/ai-elements/attachments";
import mascot from "@/assets/nagatha-idle.png";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/chat/")({
  head: () => ({
    meta: [
      { title: "New chat — Nagatha" },
      {
        name: "description",
        content: "Start a new chat with Nagatha for motivation or tutoring.",
      },
      { property: "og:title", content: "New chat — Nagatha" },
      { property: "og:description", content: "Get tough-love motivation or tutoring from Nagatha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewChat,
});

const QUICK_PROMPTS: Array<{ icon: typeof Briefcase; label: string; text: string; to?: string }> = [
  { icon: Briefcase, label: "I can't start this work project", text: "I have a work project I keep putting off. Help me actually start it." },
  { icon: Home, label: "My place is a disaster", text: "My place is a mess and I don't know where to start. Roast me, then help me clean it." },
  { icon: Dumbbell, label: "Make me exercise", text: "I've been avoiding exercise. Give me tough love and a plan I'll actually do." },
  { icon: Flame, label: "Just motivate me", text: "I don't even know what I need. Just motivate me." },
  { icon: Timer, label: "How long will it actually take?", text: "", to: "/chat/reality-check" },
];

const LANGUAGE_TOPICS = ["grammar", "verb conjugation", "vocabulary", "pronunciation", "conversation"];
const HELP_TOPICS: Record<string, string[]> = {
  Spanish: LANGUAGE_TOPICS,
  Italian: LANGUAGE_TOPICS,
  French: LANGUAGE_TOPICS,
  German: LANGUAGE_TOPICS,
  Korean: ["Hangul", "grammar", "vocabulary", "pronunciation", "conversation"],
  Math: ["fractions", "algebra", "geometry", "word problems", "percentages"],
  English: ["grammar", "writing", "vocabulary", "reading comprehension", "punctuation"],
};

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

function NewChat() {
  const navigate = useNavigate();
  const makeThread = useServerFn(createThread);
  const [busy, setBusy] = useState(false);
  const [helpSubject, setHelpSubject] = useState<string | null>(null);

  const startThread = async (text: string, files: PromptInputMessage["files"] = []) => {
    if (busy || (!text.trim() && files.length === 0)) return;
    setBusy(true);
    try {
      const thread = await makeThread();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Please sign in again to add a photo.");
      const stored: Array<{ path: string; name: string; mediaType: string }> = [];
      const signedFiles = [];
      for (const file of files) {
        const blob = await (await fetch(file.url)).blob();
        const extension = file.filename?.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
        const path = `${userData.user.id}/${thread.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("chat-images").upload(path, blob, { contentType: file.mediaType });
        if (uploadError) throw new Error(uploadError.message);
        const { data: signed, error: signError } = await supabase.storage.from("chat-images").createSignedUrl(path, 3600);
        if (signError) throw new Error(signError.message);
        stored.push({ path, name: file.filename || "Photo", mediaType: file.mediaType });
        signedFiles.push({ type: "file" as const, filename: file.filename || "Photo", mediaType: file.mediaType, url: signed.signedUrl });
      }
      sessionStorage.setItem(PENDING_MESSAGE_KEY(thread.id), JSON.stringify({
        text: text.trim() || "Please look at this photo and teach me how to do it myself.",
        files: signedFiles,
        attachments: stored,
      }));
      void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't start a chat. Even Nagatha needs a coffee break sometimes.");
      setBusy(false);
    }
  };

  const handleSubmit = (message: PromptInputMessage) => {
    return startThread(message.text, message.files);
  };

  return (
    <div className="bg-paper flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8">
      <div className="flex w-full max-w-xl shrink-0 flex-col items-center">
        <img
          src={mascot}
          alt="Nagatha, a grumpy but caring coach with a whistle"
          className="size-28 shrink-0 object-contain md:size-36"
          width={1024}
          height={1024}
        />
        <h1 className="font-display mt-5 text-center text-2xl font-bold md:text-3xl">
          What should Nagatha help with today?
        </h1>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          Work, chores, that exercise you swore you'd start in January — pick your poison.
          Nagatha brings the whistle.
        </p>

        <div className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {QUICK_PROMPTS.map(({ icon: Icon, label, text, to }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => (to ? void navigate({ to }) : void startThread(text))}
              className="h-auto justify-start whitespace-normal px-4 py-3 text-left"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </Button>
          ))}
        </div>

        <div className="mt-6 w-full border-t pt-5">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            <h2 className="font-display font-bold">Learn something. It won't kill you.</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button asChild type="button" variant="secondary"><Link to="/chat/lessons"><BookOpen />Browse seven courses</Link></Button>
            <Button asChild type="button" variant="outline"><Link to="/chat/planner"><RouteIcon />Make a lesson plan</Link></Button>
          </div>
          <p className="mt-5 text-sm font-semibold">Get help with something specific</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a subject">
            {Object.keys(HELP_TOPICS).map((name) => (
              <Button key={name} type="button" size="sm" variant={helpSubject === name ? "default" : "outline"} onClick={() => setHelpSubject(helpSubject === name ? null : name)}>
                {name}
              </Button>
            ))}
          </div>
          {helpSubject && (
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`${helpSubject} topics`}>
              {HELP_TOPICS[helpSubject]!.map((topic) => (
                <Button key={topic} type="button" size="sm" variant="secondary" disabled={busy}
                  onClick={() => void startThread(`I need help with ${helpSubject} ${topic}. Teach me the most important part of it right away with a clear explanation and an example, then give me one short practice question.`)}>
                  {topic}
                </Button>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-muted-foreground">Or type anything — any subject — or snap a photo of your homework. Nagatha teaches you how; she won't do it for you.</p>
        </div>

        <div className="mt-6 w-full">
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
              placeholder="Ask Nagatha for help or start a lesson…"
              aria-label="Message Nagatha"
              disabled={busy}
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
              <PromptInputSubmit disabled={busy} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
