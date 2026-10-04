import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import mascot from "@/assets/nagatha-facepalm.png";

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border bg-card p-3 shadow-lg"
    >
      <img src={mascot} alt="" className="size-12 shrink-0 object-contain" width={1024} height={1024} />
      <div className="min-w-0 text-sm">
        <p className="flex items-center gap-1.5 font-semibold text-foreground">
          <WifiOff className="size-4" /> You're offline
        </p>
        <p className="text-muted-foreground">Even I can't nag through a dead connection. I'll be here when it's back.</p>
      </div>
    </div>
  );
}
