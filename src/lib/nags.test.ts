import { describe, expect, test } from "bun:test";
import { nagPrompt, nagRequestForNotification } from "./nags";

describe("helpful nag destinations", () => {
  test("each daily nag and follow-up opens coaching", () => {
    for (const id of [4242, 4243, 4244]) {
      const request = nagRequestForNotification(id);
      expect(request).not.toBeNull();
      expect(nagPrompt(request ?? undefined)).toContain("concrete two-minute first step");
    }
  });
  test("unrelated notifications do not start a nag", () => {
    expect(nagRequestForNotification(99)).toBeNull();
    expect(nagPrompt("99:123")).toBeNull();
    expect(nagPrompt(undefined)).toBeNull();
  });
});