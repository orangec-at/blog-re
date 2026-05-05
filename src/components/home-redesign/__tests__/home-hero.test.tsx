import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeHero } from "@/components/home-redesign/home-hero";
import { homeRescueHero } from "@/data/home-redesign-content";
import { servicesIntro } from "@/data/services-content";

describe("HomeHero", () => {
  it("renders the diagnostic-console-style hero contract", () => {
    render(<HomeHero chooserNote={servicesIntro.chooserNote} data={homeRescueHero} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI가 만든 MVP,\s+상용화 전에\s+기술 부채부터 고치세요\./i,
      }),
    ).toBeVisible();

    expect(screen.getByText(/Cursor, v0, Bolt/)).toBeVisible();

    expect(screen.getByRole("link", { name: /^기술 부채 진단 문의하기$/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /^샘플 진단 리포트 읽어보기 →$/i })).toHaveAttribute("href", "/posts/ai-mvp-technical-debt-audit-sample-report");

    expect(screen.getByRole("heading", { level: 2, name: /^먼저 보는 위험 신호$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^진단 범위$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^받게 되는 결과물$/i })).toBeVisible();
    expect(screen.getAllByText(/진단 리포트/).length).toBeGreaterThan(0);
  });
});
