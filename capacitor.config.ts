import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration for the native iOS and Android shells around Nagatha.
 *
 * The shell loads Nagatha's live published site, so the web app keeps its
 * SSR backend and Lovable Cloud connection exactly as published. The native
 * plugins (Haptics, Share) are provided by the native shell and picked up by
 * src/lib/native.ts through the injected Capacitor bridge.
 *
 * The `webDir` folder is only a fallback page; the live site is what renders.
 */
const config: CapacitorConfig = {
  appId: "com.nagatha.coach",
  appName: "Nagatha",
  webDir: "capacitor-www",
  server: {
    url: "https://nagatha.lovable.app",
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: { launchShowDuration: 2000, backgroundColor: "#f6efe3", showSpinner: false },
    LocalNotifications: { iconColor: "#c2410c" },
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
