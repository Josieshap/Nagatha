import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { initNativeShell, listenForNagTaps } from "@/lib/native";

export function NativeShell() {
  const navigate = useNavigate();
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void listenForNagTaps((nag) => {
      sessionStorage.setItem("nagatha:pending-nag", nag);
      void navigate({ to: "/chat", search: { nag } });
    }).then((remove) => {
      if (disposed) remove();
      else cleanup = remove;
    }).catch(() => {});
    void initNativeShell();
    return () => { disposed = true; cleanup?.(); };
  }, [navigate]);
  return null;
}
