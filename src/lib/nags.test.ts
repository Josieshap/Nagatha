import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { nagPrompt, nagRequestForNotification, parseNagTheme, parseNagTime, normalizeNagTime, nagTimeAfter } from "./nags";

describe("helpful nag destinations", () => {
  test("custom daily nag time preserves any hour and minute", () => {
    assert.deepEqual(parseNagTime("21:37"), { hour: 21, minute: 37 });
    assert.deepEqual(parseNagTime("00:00"), { hour: 0, minute: 0 });
    assert.equal(parseNagTime("24:00"), null);
    assert.equal(parseNagTime("09:60"), null);
    assert.equal(parseNagTime(""), null);
  });
  test("old preset hours remain readable", () => {
    assert.equal(normalizeNagTime("9"), "09:00");
    assert.equal(normalizeNagTime("19"), "19:00");
    assert.equal(normalizeNagTime("21:37"), "21:37");
    assert.equal(normalizeNagTime("off"), "off");
  });
  test("persistent follow-ups stay ten and twenty minutes later across midnight", () => {
    assert.deepEqual(nagTimeAfter({ hour: 23, minute: 55 }, 10), { hour: 0, minute: 5 });
    assert.deepEqual(nagTimeAfter({ hour: 23, minute: 55 }, 20), { hour: 0, minute: 15 });
  });
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