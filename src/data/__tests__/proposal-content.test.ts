import { describe, expect, it } from "vitest";

import { gates, scope, systemMap, verdict } from "@/data/proposal-content";

describe("proposal content", () => {
  it("never states a gate count", () => {
    // The pricing canon sells twelve gates, the gate document defines seven, and
    // two of those are alternatives. For a service that checks whether other
    // people's claims are true, an unverified number here is the worst error
    // available. See docs/plans/2026-08-26-proposal-home-redesign-design.md.
    const text = JSON.stringify({ gates, scope, systemMap, verdict }).toLowerCase();
    for (const word of ["twelve", "seven", "12 gate", "7 gate"]) {
      expect(text).not.toContain(word);
    }
  });

  it("never states a price figure", () => {
    expect(JSON.stringify(scope)).not.toMatch(/\$\s?\d/);
  });

  it("gives every gate a failure mode and an audit question", () => {
    expect(gates.length).toBeGreaterThan(0);
    for (const gate of gates) {
      expect(gate.failureMode.length).toBeGreaterThan(0);
      expect(gate.auditQuestion.trim().endsWith("?")).toBe(true);
    }
  });

  it("keeps the terminal step out of the system map", () => {
    // Raised as a guess with a question mark attached; no source confirms it.
    const layers = systemMap.layers.map((layer) => layer.name.toLowerCase()).join(" ");
    expect(layers).not.toContain("terminal");
  });

  it("carries a sample notice on the verdict artifact", () => {
    expect(verdict.sampleNotice.toLowerCase()).toContain("sample");
  });
});
