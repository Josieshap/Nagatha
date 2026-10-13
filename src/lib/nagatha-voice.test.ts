import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { NAGATHA_VOICE_POLICY } from "./nagatha-voice.server";

describe("Nagatha's universal voice policy", () => {
  it("keeps the user-requested super-snarky default", () => {
    assert.equal(NAGATHA_VOICE_POLICY.snarkIntensity, "super snarky");
  });
  it("never permits mean personal attacks", () => {
    assert.equal(NAGATHA_VOICE_POLICY.allowPersonalAttacks, false);
    assert.ok(NAGATHA_VOICE_POLICY.protect.includes("intelligence"));
    assert.ok(NAGATHA_VOICE_POLICY.protect.includes("worth"));
    assert.ok(NAGATHA_VOICE_POLICY.protect.includes("distress"));
  });
  it("prioritizes serious distress over humor", () => {
    assert.equal(NAGATHA_VOICE_POLICY.seriousDistressOverridesHumor, true);
  });
});