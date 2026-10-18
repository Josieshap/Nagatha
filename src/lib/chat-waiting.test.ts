import { test } from "node:test";
import assert from "node:assert/strict";
import { isAwaitingReply } from "./chat-waiting";

test("Nagatha waits after her completed reply, not the user's message", () => {
  assert.equal(isAwaitingReply("ready", "assistant"), true);
  assert.equal(isAwaitingReply("ready", "user"), false);
  assert.equal(isAwaitingReply("ready", undefined), false);
});
test("Nagatha never taps while writing or after an error", () => {
  for (const status of ["submitted", "streaming", "error"]) {
    assert.equal(isAwaitingReply(status, "assistant"), false);
  }
});