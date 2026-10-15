// Single source of truth for the free tier and Pro plans. Change the limit here only.
export const FREE_DAILY_MESSAGES = 10;

export const PRO_PLANS = [
  { id: "yearly", label: "$34.99/year", note: "Best value: save 40%", highlight: true },
  { id: "lifetime", label: "Nagatha Lifetime – $39.99 one time", note: "Pay once. She's stuck with you.", highlight: false },
  { id: "monthly", label: "$4.99/month", note: "7-day free trial, then $4.99/month", highlight: false },
] as const;
