import { useEffect, useState } from "react";
import { BellRing, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  isNativeApp,
  nukeBuzz,
  REMINDER_KEY,
  REMINDER_MODE_KEY,
  setDailyReminder,
  type ReminderMode,
} from "@/lib/native";

const HOURS = [7, 9, 12, 17, 19];

export function ReminderToggle() {
  const [native, setNative] = useState(false);
  const [hour, setHour] = useState<string>("off");
  const [mode, setMode] = useState<ReminderMode>("gentle");

  useEffect(() => {
    setNative(isNativeApp());
    setHour(localStorage.getItem(REMINDER_KEY) ?? "off");
    setMode((localStorage.getItem(REMINDER_MODE_KEY) as ReminderMode) ?? "gentle");
  }, []);

  if (!native) return null;

  async function apply(nextHour: string, nextMode: ReminderMode) {
    const ok = await setDailyReminder(nextHour === "off" ? null : Number(nextHour), nextMode);
    if (!ok) {
      toast.error("Notifications are off. Turn them on for Nagatha in Settings.");
      return false;
    }
    setHour(nextHour);
    setMode(nextMode);
    localStorage.setItem(REMINDER_KEY, nextHour);
    localStorage.setItem(REMINDER_MODE_KEY, nextMode);
    return true;
  }

  async function changeHour(value: string) {
    if (await apply(value, mode))
      toast.success(value === "off" ? "Reminders off. Bold choice." : "Fine. I'll nag you daily.");
  }

  async function changeMode(value: ReminderMode) {
    if (value === "nuke") void nukeBuzz();
    if (hour === "off") {
      setMode(value);
      localStorage.setItem(REMINDER_MODE_KEY, value);
    } else if (!(await apply(hour, value))) return;
    toast.success(
      value === "nuke"
        ? "Nuke mode. Buzzing, sound, and two follow-ups if you ignore me."
        : "Gentle mode. A quiet tap. Don't make me regret it.",
    );
  }

  return (
    <div className="w-full">
      <label className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
        <BellRing className="size-4" />
        <span className="flex-1">Daily nag</span>
        <select
          className="rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          value={hour}
          onChange={(e) => void changeHour(e.target.value)}
          aria-label="Daily reminder time"
        >
          <option value="off">Off</option>
          {HOURS.map((h) => (
            <option key={h} value={String(h)}>
              {h === 12 ? "12 pm" : h > 12 ? `${h - 12} pm` : `${h} am`}
            </option>
          ))}
        </select>
      </label>
      <label className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
        <Zap className="size-4" />
        <span className="flex-1">Nag style</span>
        <select
          className="rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          value={mode}
          onChange={(e) => void changeMode(e.target.value as ReminderMode)}
          aria-label="Reminder style"
        >
          <option value="gentle">Gentle</option>
          <option value="nuke">Nuke (buzz)</option>
        </select>
      </label>
    </div>
  );
}
