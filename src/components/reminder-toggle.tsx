import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BellRing, Check, MessageSquare } from "lucide-react";
import { NAG_THEME_KEY, parseNagTheme, parseNagTime, normalizeNagTime, nagRequestForNotification, type NagTheme } from "@/lib/nags";
import { loadNagSettings, saveNagSettings } from "@/lib/nag-settings";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { isNativeApp, REMINDER_KEY, REMINDER_MODE_KEY, setDailyReminder, type ReminderMode } from "@/lib/native";

export function ReminderToggle({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const [native, setNative] = useState(false);
  const [time, setTime] = useState("off");
  const [draftTime, setDraftTime] = useState("09:00");
  const [mode, setMode] = useState<ReminderMode>("gentle");
  const [theme, setTheme] = useState<NagTheme>("productivity");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [nagRequest, setNagRequest] = useState<string>();

  useEffect(() => {
    let disposed = false;
    const phone = isNativeApp();
    setNative(phone);
    setNagRequest(nagRequestForNotification(4242) ?? undefined);
    async function restore() {
      try {
        const account = await loadNagSettings();
        if (disposed) return;
        const t = normalizeNagTime(account?.nag_time ?? localStorage.getItem(REMINDER_KEY));
        const m = (account?.nag_mode ?? localStorage.getItem(REMINDER_MODE_KEY)) === "nuke" ? "nuke" : "gentle";
        const th = parseNagTheme(account?.nag_theme ?? localStorage.getItem(NAG_THEME_KEY));
        setTime(t); setMode(m); setTheme(th);
        if (t !== "off") setDraftTime(t);
        localStorage.setItem(REMINDER_KEY, t);
        localStorage.setItem(REMINDER_MODE_KEY, m);
        localStorage.setItem(NAG_THEME_KEY, th);
        // Restore the complete schedule, even when the time itself hasn't changed.
        if (phone && !await setDailyReminder(t === "off" ? null : t, m, th, false)) {
          setNotice("Notifications are not allowed. Enable them for Nagatha in iPhone Settings.");
        }
      } catch {
        if (!disposed) setNotice("Your nag settings could not be restored. Close and reopen the menu to try again.");
      } finally { if (!disposed) setLoading(false); }
    }
    void restore();
    return () => { disposed = true; };
  }, []);

  async function update(nextTime = time, nextMode = mode, nextTheme = theme) {
    if (saving || loading) return;
    if (nextTime !== "off" && !parseNagTime(nextTime)) {
      setNotice("Choose a valid hour and minute."); return;
    }
    setSaving(true); setNotice("");
    try {
      if (native && !await setDailyReminder(nextTime === "off" ? null : nextTime, nextMode, nextTheme)) {
        setNotice("Notifications are not allowed. Enable them for Nagatha in iPhone Settings."); return;
      }
      try {
        await saveNagSettings({ nag_time: nextTime, nag_mode: nextMode, nag_theme: nextTheme });
      } catch (error) {
        if (native) await setDailyReminder(time === "off" ? null : time, mode, theme, false);
        throw error;
      }
      setTime(nextTime); setMode(nextMode); setTheme(nextTheme);
      localStorage.setItem(REMINDER_KEY, nextTime);
      localStorage.setItem(REMINDER_MODE_KEY, nextMode);
      localStorage.setItem(NAG_THEME_KEY, nextTheme);
      toast.success("Nag settings saved.");
    } catch { setNotice("Your nag settings were not saved. Please try again."); }
    finally { setSaving(false); }
  }
  const disabled = saving || loading;
  return (
    <div className="min-w-0 space-y-3 px-3">
      <div className="flex min-h-11 items-center justify-between gap-3">
        <label htmlFor="daily-nag-enabled" className="flex items-center gap-2 text-sm font-semibold"><BellRing className="size-4" aria-hidden="true" />Daily nag</label>
        <Switch id="daily-nag-enabled" checked={time !== "off"} disabled={disabled || !native} onCheckedChange={(on) => void update(on ? draftTime : "off")} aria-describedby="daily-nag-status" />
      </div>
      <p id="daily-nag-status" className="text-sm text-muted-foreground" role="status">{loading ? "Loading nag settings…" : !native ? "Scheduled notifications are available in the Nagatha phone app." : time === "off" ? "Daily nags are off." : `Daily nag at ${time} · phone’s local time${mode === "nuke" ? ", with follow-ups 10 and 20 minutes later." : "."}`}</p>
      <div>
        <label htmlFor="nag-custom-time" className="mb-1 block text-sm font-semibold">Time</label>
        <div className="flex min-w-0 gap-2">
          <Input id="nag-custom-time" type="time" step={60} value={draftTime} onChange={(e) => setDraftTime(e.target.value)} disabled={disabled || !native} className="h-11 min-w-0 flex-1" />
          <Button type="button" size="icon" variant="outline" className="size-11 shrink-0" title="Save nag time" aria-label="Save nag time" disabled={disabled || !native || !parseNagTime(draftTime)} onClick={() => void update(draftTime)}><Check aria-hidden="true" /></Button>
        </div>
      </div>
      <div><label htmlFor="nag-theme" className="block text-sm font-semibold">Theme</label>
        <select id="nag-theme" value={theme} disabled={disabled} onChange={(e) => void update(time, mode, parseNagTheme(e.target.value))} className="mt-1 min-h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground">
          <option value="productivity">Productivity</option><option value="anxiety">Anxiety</option><option value="sleep">Sleep</option>
        </select>
      </div>
      <div><label htmlFor="nag-style" className="block text-sm font-semibold">Style</label>
        <select id="nag-style" value={mode} disabled={disabled || !native} onChange={(e) => void update(time, e.target.value === "nuke" ? "nuke" : "gentle")} className="mt-1 min-h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground">
          <option value="gentle">Gentle · one nag</option><option value="nuke">Persistent · three nags</option>
        </select>
      </div>
      {notice && <p role="alert" className="text-sm text-destructive">{notice}</p>}
      {nagRequest && <Button asChild variant="outline" className="min-h-11 w-full"><Link to="/chat" search={{ nag: nagRequest }} onClick={onNavigate}><MessageSquare aria-hidden="true" />Give me a nag now</Link></Button>}
    </div>
  );
}
