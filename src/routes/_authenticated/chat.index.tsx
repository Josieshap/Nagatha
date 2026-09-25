import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Briefcase, Calculator, Dumbbell, Flame, Home, Languages, Timer } from "lucide-react";
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
import { VoiceRecorder } from "@/components/voice-recorder";

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

const QUICK_PROMPTS = [
  { icon: Briefcase, label: "I can't start this work project", text: "I have a work project I keep putting off. Help me actually start it." },
  { icon: Home, label: "My place is a disaster", text: "My place is a mess and I don't know where to start. Roast me, then help me clean it." },
  { icon: Dumbbell, label: "Make me exercise", text: "I've been avoiding exercise. Give me tough love and a plan I'll actually do." },
  { icon: Flame, label: "Just motivate me", text: "I don't even know what I need. Just motivate me." },
];

const TUTORING_PROMPTS = [
  { label: "Spanish", text: "Start my structured Spanish course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "Italian", text: "Start my structured Italian course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "French", text: "Start my structured French course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "German", text: "Start my structured German course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
  { label: "Korean", text: "Start my structured Korean course. Assess my level and goal, make a lesson path, then teach lesson one with Hangul, helpful beginner romanization, examples, exercises, corrections, and review." },
  { label: "Math", text: "Start my structured Math course. Assess my level and topic, make a lesson path, then teach lesson one step by step with worked examples, guided problems, independent exercises, corrections, and review." },
  { label: "English", text: "Start my structured English course. Assess my level and goal, make a lesson path, then teach lesson one with examples, guided practice, exercises, corrections, and a short review." },
];

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
        text: text.trim() || "Please look at this photo and help me with what you see.",
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

  const startVoiceThread = async (file: File, transcript: string) => {
    if (busy) return;
    setBusy(true);
    try {
      const thread = await makeThread();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Please sign in again to send a voice memo.");
      const path = `${userData.user.id}/${thread.id}/${crypto.randomUUID()}.wav`;
      const { error: uploadError } = await supabase.storage.from("chat-images").upload(path, file, { contentType: "audio/wav" });
      if (uploadError) throw new Error(uploadError.message);
      const { data: signed, error: signError } = await supabase.storage.from("chat-images").createSignedUrl(path, 3600);
      if (signError) throw new Error(signError.message);
      sessionStorage.setItem(PENDING_MESSAGE_KEY(thread.id), JSON.stringify({
        text: `Voice memo for pronunciation practice. Nagatha's transcription of what I said: “${transcript}”\n\nTell me what you heard clearly, help me improve the pronunciation, and give me one short phrase to retry.`,
        files: [{ type: "file", filename: file.name, mediaType: "audio/wav", url: signed.signedUrl }],
        attachments: [{ path, name: file.name, mediaType: "audio/wav" }],
      }));
      void navigate({ to: "/chat/$threadId", params: { threadId: thread.id } });
    } catch (error) {
      setBusy(false);
      throw error;
    }
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
          {QUICK_PROMPTS.map(({ icon: Icon, label, text }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => void startThread(text)}
              className="h-auto justify-start whitespace-normal px-4 py-3 text-left"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </Button>
          ))}
        </div>

        <div className="mt-6 w-full border-t pt-5">
          <div className="mb-3 flex items-center gap-2">
            <Languages className="size-4 text-primary" />
            <h2 className="font-display font-bold">Study with Nagatha</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {TUTORING_PROMPTS.map(({ label, text }) => (
              <Button key={label} type="button" size="sm" variant="secondary" disabled={busy} onClick={() => void startThread(text)}>
                {label === "Math" ? <Calculator /> : <Languages />}
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Link
          to="/chat/reality-check"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
        >
          <Timer className="size-4" />
          How long will it actually take?
        </Link>

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
                <VoiceRecorder disabled={busy} onVoiceReady={startVoiceThread} />
                <span className="hidden text-xs text-muted-foreground sm:inline">Photos or pronunciation</span>
              </PromptInputTools>
              <PromptInputSubmit disabled={busy} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
