import { useEffect } from "react";
import { initNativeShell } from "@/lib/native";

export function NativeShell() {
  useEffect(() => {
    void initNativeShell();
  }, []);
  return null;
}
