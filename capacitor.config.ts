import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration for the native iOS shell around Nagatha.
 *
 * The shell loads Nagatha's live published site, so the web app keeps its
 * SSR backend and Lovable Cloud connection exactly as published. The native
 * plugins (Haptics, Share) are provided by the iOS shell and picked up by
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
  ios: {
    contentInset: "always",
  },
};

export default config;
