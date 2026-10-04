// Thin bridge for phone features. Uses the native app shell's plugins when Nagatha
// runs inside a wrapped iOS/Android app, and falls back to web APIs otherwise.

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
