import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { nagPrompt, nagRequestForNotification, parseNagTheme } from "./nags";

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
  test("productivity nags give a concrete first step", () => {
    assert.ok(nagPrompt("4242:123", "productivity")?.includes("concrete two-minute first step"));
  });
  test("anxiety nags give grounding without productivity pressure", () => {
    const prompt = nagPrompt("4242:123", "anxiety");
    assert.ok(prompt?.includes("grounding"));
    assert.ok(prompt?.includes("Don't turn this into productivity coaching"));
  });
  test("sleep nags give wind-down help without demands to work", () => {
    const prompt = nagPrompt("4242:123", "sleep");
    assert.ok(prompt?.includes("bedtime step"));
    assert.ok(prompt?.includes("no demands to work or exercise"));
  });
  test("only the supported themes are accepted", () => {
    assert.equal(parseNagTheme("anxiety"), "anxiety");
    assert.equal(parseNagTheme("sleep"), "sleep");
    assert.equal(parseNagTheme("productivity"), "productivity");
    assert.equal(parseNagTheme("unknown"), "productivity");
  });
});