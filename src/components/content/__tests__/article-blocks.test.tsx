import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ArticleIntro,
  ChecklistBlock,
  DecisionQuestion,
  DiagnosticArtifactCard,
  RiskSignal,
} from "@/components/content/article-blocks";

describe("content article blocks", () => {
  it("promotes existing article blocks into the content system", () => {
    render(
      <>
        <ArticleIntro
          eyebrow="Launch readiness"
          thesis="출시 판단은 감이 아니라 산출물로 해야 합니다."
          points={["Risk table", "System map"]}
        />
        <DecisionQuestion>이 MVP를 public launch 해도 되는가?</DecisionQuestion>
        <RiskSignal>권한 검증이 UI에만 있으면 No-Go입니다.</RiskSignal>
        <ChecklistBlock items={["Auth boundary", "Data ownership"]} />
      </>,
    );

    expect(screen.getByText("출시 판단은 감이 아니라 산출물로 해야 합니다.")).toBeVisible();
    expect(screen.getByText("이 MVP를 public launch 해도 되는가?")).toBeVisible();
    expect(screen.getByText("권한 검증이 UI에만 있으면 No-Go입니다.")).toBeVisible();
    expect(screen.getByText("Auth boundary")).toBeVisible();
  });

  it("adds a diagnostic artifact card for productized proof content", () => {
    render(
      <DiagnosticArtifactCard
        eyebrow="Sample deliverable"
        title="진단 리포트 구성"
        description="Founder가 받게 되는 산출물을 먼저 보여줍니다."
        items={["Executive summary", "Risk table", "2주 plan"]}
        cta={{ href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "샘플 리포트 읽기" }}
      />,
    );

    expect(screen.getByText("Sample deliverable")).toBeVisible();
    expect(screen.getByRole("heading", { name: "진단 리포트 구성" })).toBeVisible();
    expect(screen.getByText("Risk table")).toBeVisible();
    expect(screen.getByRole("link", { name: "샘플 리포트 읽기" })).toHaveAttribute(
      "href",
      "/posts/ai-mvp-technical-debt-audit-sample-report",
    );
  });
});
