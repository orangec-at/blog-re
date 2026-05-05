import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ServicesPage", () => {
  it("guides founders to the right rescue engagement", async () => {
    const pageModulePath = "../page";
    const { default: ServicesPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ServicesPage());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^FixMyVibe 서비스 패키지$/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/기술 부채 진단으로 시작하세요/i),
    ).toBeVisible();
    expect(screen.getAllByRole("heading", { name: /^AI MVP 기술 부채 진단$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: /^AI 앱 리모델링 스프린트$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: /^Founder 기술 파트너 \/ Virtual CTO$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^why it fits$/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^what you leave with$/i).length).toBeGreaterThan(0);

    const contactOrDiagnosisCta =
      screen.queryByRole("link", {
        name: /^book a diagnosis call$/i,
      }) ??
      screen.queryByRole("button", {
        name: /^book a diagnosis call$/i,
      });

    expect(contactOrDiagnosisCta).toBeVisible();
  });
});
