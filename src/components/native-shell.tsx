import { useEffect } from "react";
import { initNativeShell, listenForNagTaps } from "@/lib/native";

export function NativeShell() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void listenForNagTaps((nag) => {
      sessionStorage.setItem("nagatha:pending-nag", nag);
      // Notification entry is a document navigation, including cold launches.
      // Keep the native bridge independent of React Router's hook context.
      window.location.assign(`/chat?nag=${encodeURIComponent(nag)}`);
    }).then((remove) => {
      if (disposed) remove();
      else cleanup = remove;
    }).catch(() => {});
    void initNativeShell();
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return null;
}
