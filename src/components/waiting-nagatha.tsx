import { useState } from "react";
import { Pause, Play } from "lucide-react";
import idle from "@/assets/nagatha-idle.png";
import { Button } from "@/components/ui/button";

export function WaitingNagatha() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative aspect-square w-full" data-waiting-nagatha data-paused={paused}>
      <div role="img" aria-label="Nagatha, arms crossed, tapping her foot impatiently" className="absolute inset-0">
        <img src={idle} alt="" width={1024} height={1024} className="nagatha-waiting-body absolute inset-0 size-full object-contain" />
        <img src={idle} alt="" width={1024} height={1024} className="nagatha-tapping-foot absolute inset-0 size-full object-contain" />
      </div>
      <Button type="button" variant="outline" size="icon" className="nagatha-motion-control absolute bottom-0 right-0 size-11" aria-label={paused ? "Resume Nagatha’s foot tapping" : "Pause Nagatha’s foot tapping"} title={paused ? "Resume animation" : "Pause animation"} onClick={() => setPaused(!paused)}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</Button>
    </div>
  );
}