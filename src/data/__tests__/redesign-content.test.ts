import { describe, expect, it } from "vitest";

import { aboutSnapshot } from "@/data/about-content";
import { contactGuidance, contactHero } from "@/data/contact-content";
import { homeRescueHero } from "@/data/home-redesign-content";
import { serviceOffers, servicesIntro } from "@/data/services-content";

describe("redesign typed content modules", () => {
  it("captures the FixMyVibe positioning for the redesigned home flow", () => {
    expect(homeRescueHero.eyebrow).toBe("FixMyVibe");
    expect(homeRescueHero.title).toBe(
      "AI가 만든 MVP,\n상용화 전에\n기술 부채부터 고치세요.",
    );
    expect(homeRescueHero.subtitle).toMatch(/Cursor, v0, Bolt/);
    expect(homeRescueHero.primaryCta.label).toBe("기술 부채 진단 문의하기");
    expect(homeRescueHero.primaryCta.href).toBe("/contact");
    expect(homeRescueHero.secondaryCta.label).toBe("샘플 진단 리포트 읽어보기 →");
    expect(homeRescueHero.outcomeItems[0]).toMatch(/진단 리포트/);
  });

  it("defines the three FixMyVibe service packages", () => {
    expect(servicesIntro.title).toMatch(/^FixMyVibe 서비스 패키지$/i);
    expect(servicesIntro.chooserNote).toMatch(
      /기술 부채 진단으로 시작/i,
    );
    expect(serviceOffers.map((service) => service.name)).toEqual([
      "AI MVP 기술 부채 진단",
      "AI 앱 리모델링 스프린트",
      "Founder 기술 파트너 / Virtual CTO",
    ]);
  });

  it("provides a short about snapshot", () => {
    expect(aboutSnapshot.title).toMatch(/founder-side/i);
    expect(aboutSnapshot.body).toMatch(/ai-built mvps/i);
    expect(aboutSnapshot.highlights).toHaveLength(3);
  });

  it("provides contact guidance messaging", () => {
    expect(contactHero.title).toMatch(/^AI MVP Technical Debt Audit으로 작게 시작하세요$/i);
    expect(contactGuidance.title).toMatch(/^when to contact us$/i);
    expect(contactGuidance.reassurance).toMatch(
      /^if you're not sure, start with technical debt audit\.$/i,
    );
    expect(contactGuidance.primaryCta.label).toMatch(
      /^start with technical debt audit$/i,
    );
  });
});
