import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NAGATHA_MOODS } from "@/lib/nagatha-mood";

export function ProPaywall({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const upgrade = (plan: string) => {
    toast.message(`Nagatha Pro (${plan}) is coming soon.`, {
      description: "Purchases open once the App Store subscription is approved. Your 5 free messages reset tomorrow.",
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="items-center text-center">
          <img src={NAGATHA_MOODS.idle.src} alt={NAGATHA_MOODS.idle.alt} className="size-24 object-contain" width={1024} height={1024} />
          <DialogTitle className="font-display text-xl">That's your 5 free messages for today.</DialogTitle>
          <DialogDescription>
            I'd keep going, but I'm not running a charity. Come back tomorrow, or go Pro and keep me on call.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 text-sm">
          {["Unlimited chats, tutoring and games", "Unlimited photo help", "Lessons, tasks and nags stay free"].map((item) => (
            <li key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</li>
          ))}
        </ul>
        <div className="grid gap-2">
          <Button onClick={() => upgrade("monthly")}>Try Pro free for 7 days, then $4.99/month</Button>
          <Button variant="outline" onClick={() => upgrade("yearly")}>$34.99/year (save 40%)</Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Fine, I'll wait until tomorrow</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
