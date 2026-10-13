import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { nagPrompt, nagRequestForNotification } from "./nags";

describe("helpful nag destinations", () => {
  test("each daily nag and follow-up opens coaching", () => {
    for (const id of [4242, 4243, 4244]) {
      const request = nagRequestForNotification(id);
      assert.notEqual(request, null);
      assert.ok(nagPrompt(request ?? undefined)?.includes("concrete two-minute first step"));
    }
  });
  test("unrelated notifications do not start a nag", () => {
    assert.equal(nagRequestForNotification(99), null);
    assert.equal(nagPrompt("99:123"), null);
    assert.equal(nagPrompt(undefined), null);
  });
});