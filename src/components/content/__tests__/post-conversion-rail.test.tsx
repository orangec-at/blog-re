import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostConversionRail, PostMobileConversionRail } from "@/components/content/post-conversion-rail";

const sampleConfig = {
  ctaLabel: "진단 문의",
  description: "샘플을 읽은 뒤 우리 MVP의 리포트가 어떻게 생길지 바로 상담으로 연결합니다.",
  navLabel: "Sample audit report sections",
  railTitle: "샘플 리포트 구성",
  sections: [
    { href: "#executive-summary", label: "Executive Summary" },
    { href: "#system-map", label: "System Map" },
    { href: "#risk-table", label: "Risk Table" },
  ],
  secondaryHref: "/posts/ai-mvp-launch-checklist",
  secondaryLabel: "체크리스트로 돌아가기",
  title: "Executive summary · Risk table · Go / No-Go",
};

describe("PostConversionRail", () => {
  it("renders a desktop guide rail with deliverable CTA hierarchy", () => {
    render(<PostConversionRail config={sampleConfig} />);

    expect(screen.getByTestId("post-conversion-rail")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Sample audit report sections" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Executive Summary" })).toHaveAttribute("href", "#executive-summary");
    expect(screen.getByText("샘플 리포트 구성")).toBeVisible();
    expect(screen.getByText("Executive summary · Risk table · Go / No-Go")).toBeVisible();
    expect(screen.getByRole("link", { name: "진단 문의" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "체크리스트로 돌아가기" })).toHaveAttribute("href", "/posts/ai-mvp-launch-checklist");
  });
});

describe("PostMobileConversionRail", () => {
  it("renders a mobile guide rail with a mobile-specific nav label", () => {
    render(<PostMobileConversionRail config={sampleConfig} />);

    expect(screen.getByTestId("post-mobile-conversion-rail")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile Sample audit report sections" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Risk Table" })).toHaveAttribute("href", "#risk-table");
    expect(screen.getByRole("link", { name: "진단 문의" })).toHaveAttribute("href", "/contact");
  });
});
