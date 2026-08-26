import type { ComponentType } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ServerPostContent } from "@/components/mdx/server-post-content";

type MdxComponents = Record<string, ComponentType<Record<string, unknown>>>;

vi.mock("next-contentlayer/hooks", () => ({
  getMDXComponent: () => {
    return ({ components }: { components: MdxComponents }) => {
      const WorkspaceDemo = components.WorkspaceOnboardingDemo;
      const LaunchQuestion = components.LaunchQuestion;
      const NoGoSignal = components.NoGoSignal;
      const CheckList = components.CheckList;
      const GoNoGoTable = components.GoNoGoTable;
      const ArticleCTA = components.ArticleCTA;
      const ArticleIntro = components.ArticleIntro;
      const RiskSection = components.RiskSection;
      const ExpertInsight = components.ExpertInsight;
      const MiniCaseStudy = components.MiniCaseStudy;
      const ActionTimeline = components.ActionTimeline;
      const DiagnosticArtifactCard = components.DiagnosticArtifactCard;
      const DecisionQuestion = components.DecisionQuestion;
      const ChecklistBlock = components.ChecklistBlock;

      return (
        <>
          {WorkspaceDemo ? (
            <WorkspaceDemo />
          ) : (
            <div data-testid="missing-workspace-demo">Missing workspace demo mapping</div>
          )}
          {LaunchQuestion ? <LaunchQuestion>Can this MVP survive real users?</LaunchQuestion> : null}
          {DecisionQuestion ? <DecisionQuestion>Should this launch now?</DecisionQuestion> : null}
          {NoGoSignal ? <NoGoSignal>Secret exposure is possible.</NoGoSignal> : null}
          {CheckList ? <CheckList items={["Auth boundary", "Data ownership"]} /> : null}
          {ChecklistBlock ? <ChecklistBlock items={["Smoke test", "Rollback path"]} /> : null}
          {ArticleIntro ? (
            <ArticleIntro
              thesis="Launch readiness is a boundary problem."
              points={["Demo works", "Real users need guardrails"]}
            />
          ) : null}
          {RiskSection ? (
            <RiskSection
              index={1}
              title="Auth / session 경계가 명확한가"
              body="로그인이 된다고 해서 auth가 안전한 것은 아니다."
              checks={["User identity", "Workspace boundary"]}
              question="Can user A read user B data?"
              noGo="UI-only authorization is not enough."
            />
          ) : null}
          {ExpertInsight ? (
            <ExpertInsight source="FixMyVibe field note">
              출시 전 진단은 기능 수보다 failure boundary를 먼저 본다.
            </ExpertInsight>
          ) : null}
          {MiniCaseStudy ? (
            <MiniCaseStudy
              title="Private beta 전에 발견한 권한 누수"
              problem="Demo account에서는 문제 없어 보였다."
              outcome="Public launch 전에 P0 risk를 제거했다."
              stats={["2 accounts", "1 P0 risk", "48h stabilization"]}
            />
          ) : null}
          {ActionTimeline ? (
            <ActionTimeline
              title="2주 stabilization timeline"
              steps={[
                { label: "Day 1", title: "Map core flow", body: "가장 위험한 흐름 하나를 고른다." },
                { label: "Day 2", title: "Test boundary", body: "계정 2개로 권한 경계를 확인한다." },
              ]}
            />
          ) : null}
          {GoNoGoTable ? (
            <GoNoGoTable
              rows={[
                { signal: "Secrets may leak", decision: "No-Go" },
                { signal: "P0/P1 risks are bounded", decision: "Limited Go" },
              ]}
            />
          ) : null}
          {ArticleCTA ? (
            <ArticleCTA
              eyebrow="Next step"
              title="기술 부채 진단으로 작게 시작하세요"
              body="샘플 리포트와 문의 CTA를 한 블록으로 묶어 글의 끝을 명확하게 만든다."
              primary={{ href: "/contact", label: "기술 부채 진단 문의하기" }}
              secondary={{ href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "샘플 진단 리포트 보기" }}
            />
          ) : null}
          {DiagnosticArtifactCard ? (
            <DiagnosticArtifactCard
              title="진단 산출물 미리보기"
              description="리포트가 어떤 산출물로 구성되는지 보여준다."
              items={["Executive summary", "Risk table", "2주 plan"]}
              cta={{ href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "샘플 산출물 보기" }}
            />
          ) : null}
        </>
      );
    };
  },
}));

vi.mock("@/components/demos/workspace-onboarding-demo", () => ({
  WorkspaceOnboardingDemo: () => (
    <div data-testid="workspace-demo-marker">Workspace onboarding demo is available in MDX</div>
  ),
}));

describe("ServerPostContent", () => {
  it("exposes the workspace onboarding demo to MDX content", () => {
    render(<ServerPostContent code="ignored" defaultDemoLayout="full" />);

    expect(screen.getByTestId("workspace-demo-marker")).toBeInTheDocument();
  });

  it("exposes article readability components to MDX content", () => {
    render(<ServerPostContent code="ignored" defaultDemoLayout="narrow" />);

    expect(screen.getAllByText("Launch question").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Can this MVP survive real users?")).toBeVisible();
    expect(screen.getByText("Should this launch now?")).toBeVisible();
    expect(screen.getByText("No-Go signal")).toBeVisible();
    expect(screen.getByText("Secret exposure is possible.")).toBeVisible();
    expect(screen.getByText("Auth boundary")).toBeVisible();
    expect(screen.getByText("Rollback path")).toBeVisible();
    expect(screen.getByText("Launch readiness is a boundary problem.")).toBeVisible();
    expect(screen.getByText((content) => content.replace(/\s+/g, " ").trim() === "Check 01")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Auth / session 경계가 명확한가" })).toBeVisible();
    expect(screen.getByText("Can user A read user B data?")).toBeVisible();
    expect(screen.getByText("FixMyVibe field note")).toBeVisible();
    expect(screen.getByText("Private beta 전에 발견한 권한 누수")).toBeVisible();
    expect(screen.getByText("48h stabilization")).toBeVisible();
    expect(screen.getByText("2주 stabilization timeline")).toBeVisible();
    expect(screen.getByText("Map core flow")).toBeVisible();
    expect(screen.getByRole("table", { name: "Go / No-Go decision table" })).toBeVisible();
    expect(screen.getByRole("link", { name: "기술 부채 진단 문의하기" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "샘플 진단 리포트 보기" })).toHaveAttribute(
      "href",
      "/posts/ai-mvp-technical-debt-audit-sample-report",
    );
    expect(screen.getByRole("heading", { name: "진단 산출물 미리보기" })).toBeVisible();
    expect(screen.getByRole("link", { name: "샘플 산출물 보기" })).toHaveAttribute(
      "href",
      "/posts/ai-mvp-technical-debt-audit-sample-report",
    );
  });
});
