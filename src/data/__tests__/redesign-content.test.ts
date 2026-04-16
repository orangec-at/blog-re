import { describe, expect, it } from "vitest";

import { aboutSnapshot } from "@/data/about-content";
import { contactGuidance, contactHero } from "@/data/contact-content";
import { homeRescueHero } from "@/data/home-redesign-content";
import { serviceOffers, servicesIntro } from "@/data/services-content";

describe("redesign typed content modules", () => {
  it("captures the AI MVP rescue positioning for the redesigned home flow", () => {
    expect(homeRescueHero.eyebrow).toBe("AI MVP rescue");
    expect(homeRescueHero.title).toMatch(
      /^your ai-coded mvp is failing\? we fix the vibe\.?$/i,
    );
    expect(homeRescueHero.subtitle).toMatch(
      /^we turn ai-built mvps into launch-ready products\.?$/i,
    );
    expect(homeRescueHero.primaryCta.label).toMatch(
      /^start with fmv diagnosis$/i,
    );
  });

  it("defines the three rescue services", () => {
    expect(servicesIntro.title).toMatch(/^ai mvp rescue services$/i);
    expect(servicesIntro.chooserNote).toMatch(
      /start with fmv diagnosis if you're not sure which rescue path you need/i,
    );
    expect(serviceOffers.map((service) => service.name)).toEqual([
      "FMV Diagnosis",
      "Architecture Fix",
      "Virtual CTO",
    ]);
  });

  it("provides a short about snapshot", () => {
    expect(aboutSnapshot.title).toMatch(/founder-side/i);
    expect(aboutSnapshot.body).toMatch(/ai-built mvps/i);
    expect(aboutSnapshot.highlights).toHaveLength(3);
  });

  it("provides contact guidance messaging", () => {
    expect(contactHero.title).toMatch(/^start your ai mvp rescue diagnosis$/i);
    expect(contactGuidance.title).toMatch(/^when to contact us$/i);
    expect(contactGuidance.reassurance).toMatch(
      /^if you're not sure, start with diagnosis\.$/i,
    );
    expect(contactGuidance.primaryCta.label).toMatch(
      /^start with diagnosis$/i,
    );
  });
});
