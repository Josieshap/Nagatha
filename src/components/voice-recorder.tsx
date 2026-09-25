import { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { recordWav } from "@/lib/record-wav";
import { supabase } from "@/integrations/supabase/client";

type Recorder = Awaited<ReturnType<typeof recordWav>>;

export function VoiceRecorder({
  disabled,
  onVoiceReady,
}: {
  disabled?: boolean;
  onVoiceReady: (file: File, transcript: string) => Promise<void>;
}) {
  const recorderRef = useRef<Recorder | undefined>(undefined);
  const [recording, setRecording] = useState(false);
  const [working, setWorking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [preview, setPreview] = useState<{ file: File; url: string }>();

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  useEffect(() => () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
  }, [preview]);

  const start = async () => {
    try {
      recorderRef.current = await recordWav();
      setSeconds(0);
      setRecording(true);
    } catch (error) {
      const denied = error instanceof DOMException && error.name === "NotAllowedError";
      toast.error(denied ? "Microphone access is needed to record a voice memo." : "The microphone couldn't start. Please try again.");
    }
  };

  const stop = async () => {
    const recorder = recorderRef.current;
    if (!recorder) return;
    setRecording(false);
    recorderRef.current = undefined;
    try {
      const file = await recorder.stop();
      if (file.size > 9 * 1024 * 1024) throw new Error("That voice memo is too large. Keep it under a few minutes and try again.");
      setPreview({ file, url: URL.createObjectURL(file) });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "That recording didn't save.");
    }
  };

  const discard = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(undefined);
    setSeconds(0);
  };

  const send = async () => {
    if (!preview) return;
    setWorking(true);
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) throw new Error("Please sign in again before sending a voice memo.");
      const form = new FormData();
      form.append("file", preview.file, preview.file.name);
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: { Authorization: `Bearer ${data.session.access_token}` },
        body: form,
      });
      const result = await response.json().catch(() => ({ message: "The voice memo couldn't be transcribed." })) as { text?: string; message?: string };
      if (!response.ok || !result.text?.trim()) throw new Error(result.message || "Nagatha couldn't hear enough speech. Try that again.");
      await onVoiceReady(preview.file, result.text.trim());
      discard();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "That voice memo couldn't be sent.");
    } finally {
      setWorking(false);
    }
  };

  if (preview) {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border bg-muted/50 p-2">
        <audio className="h-8 min-w-0 flex-1" controls src={preview.url} aria-label="Voice memo preview" />
        <Button type="button" size="icon-sm" variant="ghost" onClick={discard} disabled={working} aria-label="Discard voice memo" title="Discard voice memo"><Trash2 /></Button>
        <Button type="button" size="sm" onClick={() => void send()} disabled={working}>{working ? "Listening…" : "Send"}</Button>
      </div>
    );
  }

  return recording ? (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-destructive">Recording {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</span>
      <Button type="button" size="icon-sm" variant="destructive" onClick={() => void stop()} aria-label="Stop recording" title="Stop recording"><Square /></Button>
    </div>
  ) : (
    <Button type="button" size="icon-sm" variant="ghost" onClick={() => void start()} disabled={disabled || working} aria-label="Record a voice memo" title="Record pronunciation"><Mic /></Button>
  );
}