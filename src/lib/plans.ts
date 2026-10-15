// Single source of truth for the free tier and Pro plans. Change the limit here only.
export const FREE_DAILY_MESSAGES = 10;

export const PRO_PLANS = [
  { id: "yearly", label: "$34.99/year", note: "Best value: save 40%", highlight: true },
  { id: "lifetime", label: "Nagatha Forever – $39.99 one time", note: "No subscription. Pay once, keep her forever.", highlight: false },
  { id: "monthly", label: "$4.99/month", note: "7-day free trial, then $4.99/month", highlight: false },
] as const;

export const TERMS_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
