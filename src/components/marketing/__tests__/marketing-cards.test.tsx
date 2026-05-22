import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PainSignalCard } from "@/components/marketing/pain-signal-card";
import { ProofArtifactCard } from "@/components/marketing/proof-artifact-card";
import { ProofMetricCard } from "@/components/marketing/proof-metric-card";
import { ServicePackageCard } from "@/components/marketing/service-package-card";

const serviceOffer = {
  id: "fmv-diagnosis",
  name: "AI MVP 기술 부채 진단",
  summary: "출시 전 리스크를 의사결정 표로 정리합니다.",
  bestFor: "AI-built MVP가 출시, 파일럿, 리팩터링 중 어디에 가까운지 판단해야 하는 founder.",
  outcome: "risk table, Go / No-Go 판단, 2주 / 4주 안정화 계획.",
  ctaLabel: "기술 부채 진단 문의하기",
  ctaHref: "/contact",
};

const proofItem = {
  id: "fixmyvibe",
  name: "FixMyVibe",
  summary: "Automation playbooks and audio pipelines for indie music founders.",
  domainId: "fixmyvibe" as const,
  domains: ["Automation", "Music Tech"],
  highlights: ["Composable MDX demos", "Realtime routing visualizer"],
  links: [
    { label: "Domain page", href: "/domains/fixmyvibe" },
    { label: "GitHub", href: "https://github.com/orangec-at/fixmyvibe" },
  ],
};

describe("marketing card components", () => {
  it("renders a service package card from the DESIGN.md contract", () => {
    render(<ServicePackageCard offer={serviceOffer} packageNumber={1} startHere />);

    expect(screen.getByText("Package 01")).toBeVisible();
    expect(screen.getByText("Start here")).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "AI MVP 기술 부채 진단" })).toBeVisible();
    expect(screen.getByText("추천 대상")).toBeVisible();
    expect(screen.getByText(serviceOffer.bestFor)).toBeVisible();
    expect(screen.getByText("결과물")).toBeVisible();
    expect(screen.getByText(serviceOffer.outcome)).toBeVisible();
    expect(screen.getByRole("link", { name: "기술 부채 진단 문의하기 →" })).toHaveAttribute("href", "/contact");
  });

  it("does not render decorative service chips outside the DESIGN.md card contract", () => {
    render(<ServicePackageCard offer={serviceOffer} packageNumber={1} startHere />);

    expect(screen.queryByText("Auth")).not.toBeInTheDocument();
    expect(screen.queryByText("Security")).not.toBeInTheDocument();
  });

  it("renders a proof artifact card with proof points and bounded links", () => {
    render(<ProofArtifactCard artifact="Automation audit trail" item={proofItem} proof="MVP demo + GitHub" />);

    expect(screen.getByText("Automation audit trail")).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "FixMyVibe" })).toBeVisible();
    expect(screen.getByText("검증 포인트:")).toBeVisible();
    expect(screen.getByText("MVP demo + GitHub")).toBeVisible();
    expect(screen.getByRole("link", { name: "Domain page →" })).toHaveAttribute("href", "/domains/fixmyvibe");
    expect(screen.getByRole("link", { name: "GitHub →" })).toHaveAttribute("href", "https://github.com/orangec-at/fixmyvibe");
  });

  it("renders pain signal and proof metric cards as reusable feature-card variants", () => {
    render(
      <div>
        <PainSignalCard
          index={0}
          problem="데모에서는 돌아가지만 실제 사용자가 들어왔을 때 버틸지 확신하기 어렵습니다."
          solution="리스크를 먼저 분류하고 출시 차단 요소부터 줄입니다."
          title="AI MVP 출시 불안"
        />
        <ProofMetricCard label="샘플 진단 리포트로 실제 deliverable 형태를 먼저 확인" value="Sample" />
      </div>,
    );

    expect(screen.getByRole("heading", { level: 3, name: "AI MVP 출시 불안" })).toBeVisible();
    expect(screen.getByText("다음에 고치는 것")).toBeVisible();
    expect(screen.getByText("Sample")).toBeVisible();
  });

  it("renders proof metric cards as value-first static metrics without extra actions", () => {
    const label = "샘플 진단 리포트로 실제 deliverable 형태를 먼저 확인";
    const { container } = render(<ProofMetricCard label={label} value="Sample" />);
    const card = screen.getByText("Sample").closest("article");

    expect(card).toBeInTheDocument();
    if (!card) {
      throw new Error("ProofMetricCard did not render an article wrapper");
    }
    expect(screen.getByText(label)).toBeVisible();

    const cardText = card.textContent ?? "";
    expect(cardText.indexOf("Sample")).toBeLessThan(cardText.indexOf(label));
    expect(within(card).queryByRole("link")).not.toBeInTheDocument();
    expect(within(card).queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector('[data-slot="badge"]')).not.toBeInTheDocument();
  });
});
