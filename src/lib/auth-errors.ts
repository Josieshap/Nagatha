export function authErrorMessage(error: unknown): string {
  const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
  if (code === "invalid_credentials") return "Email or password is incorrect. Try again, or use Forgot password to set a password for an existing account.";
  if (code === "email_not_confirmed") return "This account still needs confirmation. Use Forgot password to request a fresh link and regain access.";
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") return "Please wait a minute before requesting another email. Use only the newest link.";
  if (code === "user_already_exists") return "An account already uses this email. Sign in or use Forgot password.";
  return error instanceof Error ? error.message : "Unable to sign in. Please try again.";
}