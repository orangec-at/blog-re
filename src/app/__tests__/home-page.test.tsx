import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("repositions the home route around AI MVP rescue and next-step conversion", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI가 만든 MVP,\s+상용화 전에\s+기술 부채부터 고치세요\./i,
      }),
    ).toBeVisible();

    expect(screen.getByText(/Cursor, v0, Bolt/)).toBeVisible();

    expect(screen.getAllByRole("link", { name: /^기술 부채 진단 문의하기$/i })[0]).toHaveAttribute("href", "/contact");
    expect(screen.getAllByRole("link", { name: /^샘플 진단 리포트 읽어보기 →$/i })[0]).toHaveAttribute("href", "/posts/ai-mvp-technical-debt-audit-sample-report");
    expect(screen.getByRole("heading", { level: 2, name: /^먼저 보는 위험 신호$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^진단 범위$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^받게 되는 결과물$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^fixmyvibe$/i })).toBeVisible();
    expect(screen.getAllByText(/^AI MVP 기술 부채 진단$/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 2, name: /^AI MVP가 출시 전에 멈추는 이유$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^말보다 증거를 먼저 보여드립니다$/i })).toBeVisible();
    expect(screen.getAllByText(/샘플 진단 리포트/).length).toBeGreaterThan(0);
  });
});
