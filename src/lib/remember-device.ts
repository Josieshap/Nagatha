import { supabase } from "@/integrations/supabase/client";

const FORGET_KEY = "nagatha:forget-session";
const ALIVE_KEY = "nagatha:session-alive";
export const REMEMBERED_EMAIL_KEY = "nagatha:remembered-email";

/** Call after a successful sign-in. Unchecked = signed out once the app/browser is closed. */
export function applyRememberChoice(remember: boolean, email: string) {
  try {
    if (remember) {
      localStorage.removeItem(FORGET_KEY);
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    } else {
      localStorage.setItem(FORGET_KEY, "1");
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      sessionStorage.setItem(ALIVE_KEY, "1");
    }
  } catch { /* storage unavailable */ }
}

/** On app start: if the user chose not to be remembered and this is a new app session, sign out. */
export async function enforceRememberChoice() {
  try {
    if (localStorage.getItem(FORGET_KEY) !== "1" || sessionStorage.getItem(ALIVE_KEY) === "1") return;
    localStorage.removeItem(FORGET_KEY);
    await supabase.auth.signOut({ scope: "local" });
    if (window.location.pathname.startsWith("/chat")) window.location.replace("/auth");
  } catch { /* ignore */ }
}
