import { useEffect, useState } from "react";
import { BellRing, Zap, Heart, Check } from "lucide-react";
import { NAG_THEME_KEY, parseNagTheme, parseNagTime, normalizeNagTime, type NagTheme } from "@/lib/nags";
import { loadNagSettings, saveNagSettings } from "@/lib/nag-settings";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  isNativeApp,
  nukeBuzz,
  REMINDER_KEY,
  REMINDER_MODE_KEY,
  setDailyReminder,
  type ReminderMode,
} from "@/lib/native";

export function ReminderToggle() {
  const [native, setNative] = useState(false);
  const [hour, setHour] = useState<string>("off");
  const [mode, setMode] = useState<ReminderMode>("gentle");
  const [theme, setTheme] = useState<NagTheme>("productivity");
  const [draftTime, setDraftTime] = useState("09:00");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const isNative = isNativeApp();
    setNative(isNative);
    const saved = normalizeNagTime(localStorage.getItem(REMINDER_KEY));
    setHour(saved);
    if (saved !== "off") setDraftTime(saved);
    setMode((localStorage.getItem(REMINDER_MODE_KEY) as ReminderMode) ?? "gentle");
    setTheme(parseNagTheme(localStorage.getItem(NAG_THEME_KEY)));

    // Account copy wins: restores nags on a new phone or after reinstalling.
    void loadNagSettings().then(async (s) => {
      if (!s) {
        void saveNagSettings({ nag_time: saved, nag_mode: localStorage.getItem(REMINDER_MODE_KEY) ?? "gentle", nag_theme: parseNagTheme(localStorage.getItem(NAG_THEME_KEY)) });
        return;
      }
      const t = normalizeNagTime(s.nag_time);
      const m: ReminderMode = s.nag_mode === "nuke" ? "nuke" : "gentle";
      const th = parseNagTheme(s.nag_theme);
      setHour(t);
      if (t !== "off") setDraftTime(t);
      setMode(m);
      setTheme(th);
      localStorage.setItem(REMINDER_KEY, t);
      localStorage.setItem(REMINDER_MODE_KEY, m);
      localStorage.setItem(NAG_THEME_KEY, th);
      if (isNative && t !== saved) await setDailyReminder(t === "off" ? null : t, m, th);
    });
  }, []);

  async function changeTheme(value: string) {
    const next = parseNagTheme(value);
    if (native && hour !== "off" && !(await setDailyReminder(hour, mode, next))) {
      toast.error("Couldn't update your nags. Check notification permissions and try again.");
      return;
    }
    setTheme(next);
    localStorage.setItem(NAG_THEME_KEY, next);
    void saveNagSettings({ nag_theme: next });
    toast.success("Nag theme saved.");
  }

  async function apply(nextHour: string, nextMode: ReminderMode) {
    if (nextHour !== "off" && !parseNagTime(nextHour)) {
      toast.error("Choose a valid hour and minute.");
      return false;
    }
    setSaving(true);
    let ok = false;
    try {
      ok = await setDailyReminder(nextHour === "off" ? null : nextHour, nextMode, theme);
    } catch {
      toast.error("Error: your nag was not saved. Please try again.");
      return false;
    } finally { setSaving(false); }
    if (!ok) {
      toast.error("Nags are off. Allow notifications for Nagatha in your phone Settings.");
      return false;
    }
    setHour(nextHour);
    setMode(nextMode);
    localStorage.setItem(REMINDER_KEY, nextHour);
    localStorage.setItem(REMINDER_MODE_KEY, nextMode);
    void saveNagSettings({ nag_time: nextHour, nag_mode: nextMode });
    return true;
  }

  async function changeHour(value: string) {
    if (await apply(value, mode))
      toast.success(value === "off" ? "Nags off. Bold choice." : "Daily nag set. Tap it and we'll make a tiny plan.");
  }

  async function changeMode(value: ReminderMode) {
    if (value === "nuke") void nukeBuzz();
    if (hour === "off") {
      setMode(value);
      localStorage.setItem(REMINDER_MODE_KEY, value);
      void saveNagSettings({ nag_mode: value });
    } else if (!(await apply(hour, value))) return;
    toast.success(
      value === "nuke"
         ? "Persistent nag. Sound, a buzz preview, and two extra nudges. Tap any nag for help."
        : "Gentle mode. A quiet tap. Don't make me regret it.",
    );
  }

  return (
    <div className="w-full">
      <label className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
        <Heart className="size-4" />
        <span className="flex-1">Nag theme</span>
        <select className="rounded-md border bg-background px-2 py-1 text-sm text-foreground" value={theme} onChange={(e) => void changeTheme(e.target.value)} aria-label="Nag theme">
          <option value="productivity">Productivity</option>
          <option value="anxiety">Anxiety</option>
          <option value="sleep">Sleep</option>
        </select>
      </label>
      {native && <>
      <label className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
        <BellRing className="size-4" />
        <span className="flex-1">Daily nag</span>
        <Switch checked={hour !== "off"} disabled={saving} onCheckedChange={(enabled) => void changeHour(enabled ? draftTime : "off")} aria-label="Enable daily nag" />
      </label>
      <div className="flex w-full items-center gap-2 px-4 py-2">
        <label htmlFor="nag-custom-time" className="flex-1 text-sm text-muted-foreground">Nag time</label>
        <Input id="nag-custom-time" type="time" step={60} aria-label="Daily nag time" value={draftTime} onChange={(e) => setDraftTime(e.target.value)} className="w-32 min-w-0" disabled={saving} />
        <Button size="icon" variant="outline" title="Save nag time" aria-label="Save nag time" disabled={saving || !parseNagTime(draftTime)} onClick={() => void changeHour(draftTime)}><Check className="size-4" /></Button>
      </div>
      <label className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
        <Zap className="size-4" />
        <span className="flex-1">Nag style</span>
        <select
          className="rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          value={mode}
          onChange={(e) => void changeMode(e.target.value as ReminderMode)}
           aria-label="Nag style"
        >
          <option value="gentle">Gentle</option>
           <option value="nuke">Persistent nag</option>
        </select>
      </label>
      </>}
    </div>
  );
}
