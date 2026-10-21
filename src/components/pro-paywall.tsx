import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
import { FREE_DAILY_MESSAGES, PRO_PLANS } from "@/lib/plans";

const comingSoon = (what: string) =>
  toast.message(`${what} is coming soon.`, {
    description: `Purchases open once the App Store subscription is approved. Your ${FREE_DAILY_MESSAGES} free messages reset tomorrow.`,
  });

export function ProPaywall({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  // Pricing is unavailable during testing, including any stale caller.
  return null;
}

function PaidPaywall({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-sm overflow-y-auto">
        <DialogHeader className="items-center text-center">
          <img src={NAGATHA_MOODS.idle.src} alt={NAGATHA_MOODS.idle.alt} className="size-20 object-contain" width={1024} height={1024} />
          <DialogTitle className="font-display text-xl">That's your {FREE_DAILY_MESSAGES} free messages for today.</DialogTitle>
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
          {PRO_PLANS.map((plan) => (
            <Button
              key={plan.id}
              variant={plan.highlight ? "default" : "outline"}
              className="h-auto flex-col gap-0.5 whitespace-normal py-2"
              onClick={() => comingSoon(plan.id === "lifetime" ? "Nagatha Lifetime" : "Nagatha Pro")}
            >
              <span className="font-semibold">{plan.label}</span>
              <span className="text-xs font-normal opacity-80">{plan.note}</span>
            </Button>
          ))}
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Fine, I'll wait until tomorrow</Button>
        </div>
        <p className="text-center text-[11px] leading-snug text-muted-foreground">
          Subscriptions renew automatically unless canceled at least 24 hours before the end of the current period. Manage or cancel anytime in your Apple ID account settings. Nagatha Lifetime is a one-time purchase.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
          <button type="button" className="underline" onClick={() => comingSoon("Restore Purchases")}>Restore Purchases</button>
          <Link className="underline" to="/terms">Terms of Use</Link>
          <Link className="underline" to="/privacy">Privacy Policy</Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
