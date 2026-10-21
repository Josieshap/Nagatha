import { describe, expect, it } from "vitest";
import { authErrorMessage } from "./auth-errors";

describe("tester account recovery", () => {
  it("offers password recovery when credentials fail, including existing social accounts", () => {
    expect(authErrorMessage({ code: "invalid_credentials" })).toContain("Forgot password");
  });
  it("explains email rate limits without encouraging repeated signup", () => {
    expect(authErrorMessage({ code: "over_email_send_rate_limit" })).toContain("wait a minute");
  });
});