import { useEffect, useState } from "react";
import { BellRing } from "lucide-react";
import { toast } from "sonner";
import { isNativeApp, REMINDER_KEY, setDailyReminder } from "@/lib/native";

const HOURS = [7, 9, 12, 17, 19];

export function ReminderToggle() {
  const [native, setNative] = useState(false);
  const [hour, setHour] = useState<string>("off");

  useEffect(() => {
    setNative(isNativeApp());
    setHour(localStorage.getItem(REMINDER_KEY) ?? "off");
  }, []);

  if (!native) return null;

  async function change(value: string) {
    const ok = await setDailyReminder(value === "off" ? null : Number(value));
    if (!ok) {
      toast.error("Notifications are off. Turn them on for Nagatha in Settings.");
      return;
    }
    setHour(value);
    localStorage.setItem(REMINDER_KEY, value);
    toast.success(value === "off" ? "Reminders off. Bold choice." : "Fine. I'll nag you daily.");
  }

  return (
    <label className="flex w-full items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
      <BellRing className="size-4" />
      <span className="flex-1">Daily nag</span>
      <select
        className="rounded-md border bg-background px-2 py-1 text-sm text-foreground"
        value={hour}
        onChange={(e) => void change(e.target.value)}
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
  );
}
