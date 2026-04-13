import { describe, expect, it } from "vitest";
import {
  hero,
  beforeAfterBoard,
  principles,
  caseStudies,
  refactoringLog,
  iacHighlight,
  drawhathaHighlight,
  contactCta,
} from "@/data/homepage-content";

describe("homepage content modules", () => {
  it("exposes hero copy", () => {
    expect(hero.title).toMatch(/refactor/i);
    expect(hero.primaryCta.href).toBe("/contact");
  });

  it("includes before/after cards", () => {
    expect(beforeAfterBoard).toHaveLength(2);
    expect(beforeAfterBoard[0].before.title).toBeTruthy();
  });

  it("defines three principles", () => {
    expect(principles).toHaveLength(3);
    const labels = principles.map((p) => p.label);
    expect(labels).toEqual(["01", "02", "03"]);
  });

  it("includes three case studies", () => {
    expect(caseStudies).toHaveLength(3);
    expect(caseStudies.map((c) => c.id)).toContain("fixmyvibe");
  });

  it("includes refactoring log entries", () => {
    expect(refactoringLog.length).toBeGreaterThan(0);
    expect(refactoringLog[0].dated).toMatch(/2026/);
  });

  it("provides highlights and CTAs", () => {
    expect(iacHighlight.tags).toContain("Terraform");
    expect(drawhathaHighlight.title).toMatch(/Drawhatha/);
    expect(contactCta.primaryHref).toBe("/contact");
  });
});
