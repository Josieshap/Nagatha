import { test } from "node:test";
import assert from "node:assert/strict";
import { authErrorMessage } from "./auth-errors";

test("offers password recovery when credentials fail, including existing social accounts", () => {
  assert.match(authErrorMessage({ code: "invalid_credentials" }), /Forgot password/);
});
test("explains email rate limits without encouraging repeated signup", () => {
  assert.match(authErrorMessage({ code: "over_email_send_rate_limit" }), /wait a minute/);
});