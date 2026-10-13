// Thin bridge for phone features. Uses the native app shell's plugins when Nagatha
// runs inside a wrapped iOS/Android app, and falls back to web APIs otherwise.
import { LocalNotifications, type LocalNotificationSchema } from "@capacitor/local-notifications";
import { NAG_IDS, nagRequestForNotification } from "./nags";

type CapacitorGlobal = {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
  Plugins?: Record<string, Record<string, (...args: unknown[]) => Promise<unknown>> | undefined>;
};

function cap(): CapacitorGlobal | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
}

export function isNativeApp(): boolean {
  return Boolean(cap()?.isNativePlatform?.());
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return isNativeApp() || window.matchMedia?.("(display-mode: standalone)").matches;
}

export async function haptic(style: "light" | "medium" | "heavy" = "light"): Promise<void> {
  try {
    const plugin = cap()?.Plugins?.["Haptics"];
    if (plugin?.["impact"]) {
      await plugin["impact"]({ style: style.toUpperCase() });
      return;
    }
    navigator.vibrate?.(style === "heavy" ? 30 : style === "medium" ? 20 : 10);
  } catch {
    // Haptics are a nicety; ignore failures.
  }
}

/** Returns true when a share sheet was shown. */
export async function nativeShare(opts: { title: string; text?: string; url: string }): Promise<boolean> {
  const plugin = cap()?.Plugins?.["Share"];
  if (plugin?.["share"]) {
    await plugin["share"](opts);
    return true;
  }
  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share(opts);
    return true;
  }
  return false;
}

function plugin(name: string) {
  return cap()?.Plugins?.[name];
}

/** Opens the native camera (app) or the phone camera via a file input (web). */
export async function takePhoto(): Promise<File | null> {
  const camera = plugin("Camera");
  if (camera?.["getPhoto"]) {
    try {
      const photo = (await camera["getPhoto"]({
        quality: 80,
        resultType: "dataUrl",
        source: "PROMPT",
        width: 1600,
        correctOrientation: true,
        promptLabelHeader: "Show Nagatha your work",
        promptLabelPhoto: "Choose from library",
        promptLabelPicture: "Take a photo",
      })) as { dataUrl?: string; format?: string };
      if (!photo.dataUrl) return null;
      const blob = await (await fetch(photo.dataUrl)).blob();
      const ext = photo.format ?? "jpeg";
      return new File([blob], `photo-${Date.now()}.${ext}`, { type: blob.type || `image/${ext}` });
    } catch {
      return null; // user cancelled
    }
  }
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.setAttribute("capture", "environment");
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });
}

const REMINDER_ID = 4242;
export const REMINDER_KEY = "nagatha:daily-reminder";

/** Schedules a daily local notification at the given hour. Returns false if not allowed. */
export const REMINDER_MODE_KEY = "nagatha:reminder-mode";
export type ReminderMode = "gentle" | "nuke";

/** Buzzes the phone hard, three times. */
export async function nukeBuzz(): Promise<void> {
  const h = plugin("Haptics");
  if (h?.["vibrate"]) {
    for (let i = 0; i < 3; i++) {
      await h["vibrate"]({ duration: 400 });
      await new Promise((r) => setTimeout(r, 500));
    }
    return;
  }
  navigator.vibrate?.([400, 150, 400, 150, 400]);
}

export async function setDailyReminder(hour: number | null, mode: ReminderMode = "gentle"): Promise<boolean> {
  if (!isNativeApp()) return false;
  const ln = LocalNotifications;
  await ln.cancel({ notifications: NAG_IDS.map((id) => ({ id })) });
  if (hour === null) return true;
  const perm = await ln.requestPermissions();
  if (perm?.display !== "granted") return false;
  const lines = [
    "Your to-do list called. Tap here; we'll pick one tiny first step.",
    "Two minutes. That's all I'm asking. Tap for a plan you can actually start.",
    "The couch will still be there. Tap here and let's make starting less painful.",
  ];
  const notifications: LocalNotificationSchema[] = [
      {
        id: REMINDER_ID,
        title: "Your daily nag",
        body: lines[new Date().getDate() % lines.length] ?? lines[0] ?? "Tap here for a helpful nag.",
        schedule: { on: { hour, minute: 0 }, repeats: true, allowWhileIdle: true },
        ...(mode === "nuke" ? { sound: "default" } : {}),
      },
      ...(mode === "nuke"
        ? [
             { id: REMINDER_ID + 1, title: "A nag, not a lecture", body: "Still stuck? Tap here. We'll shrink the task, not your dignity.", sound: "default",
              schedule: { on: { hour, minute: 10 }, repeats: true, allowWhileIdle: true } },
             { id: REMINDER_ID + 2, title: "One tiny step", body: "No grand life overhaul. Tap here and we'll start with two minutes.", sound: "default",
              schedule: { on: { hour, minute: 20 }, repeats: true, allowWhileIdle: true } },
          ]
        : []),
    ];
  await ln.schedule({ notifications });
  return true;
}

/** Registers early so notification taps also work when launching the app. */
export async function listenForNagTaps(onNag: (request: string) => void): Promise<() => void> {
  if (!isNativeApp()) return () => {};
  const listener = await LocalNotifications.addListener("localNotificationActionPerformed", (action) => {
    const request = nagRequestForNotification(action.notification.id);
    if (!request) return;
    onNag(request);
    // Clear displayed nags once opened; daily schedules remain enabled.
    void LocalNotifications.removeDeliveredNotificationsById({ ids: NAG_IDS }).catch(() => {});
  });
  return () => { void listener.remove(); };
}

/** Styles the native status bar and hides the launch screen once the web app is ready. */
export async function initNativeShell(): Promise<void> {
  if (!isNativeApp()) return;
  try {
    await plugin("StatusBar")?.["setStyle"]?.({ style: "LIGHT" });
    await plugin("SplashScreen")?.["hide"]?.({ fadeOutDuration: 250 });
    const app = plugin("App");
    await app?.["addListener"]?.("backButton", () => window.history.back());
  } catch {
    // Native polish only.
  }
}
