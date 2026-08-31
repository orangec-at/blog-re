/* eslint-disable react-hooks/static-components --
   The rule guards against a component identity changing between renders and
   throwing away its subtree's state. This is a server component: it renders
   once per request, there is no second render to lose state across, and the
   MDX body is a compiled string that only getMDXComponent can turn into a
   component. The old client renderer disabled the same rule for the same
   reason, with a useMemo that a server component has no use for. */
import { getMDXComponent } from "next-contentlayer/hooks";
import type { ReactNode } from "react";

import DemoPlaceholder from "@/components/demos/demo-placeholder";
import { DeviceFrame } from "@/components/demos/device-frame";
import { WorkspaceOnboardingDemo } from "@/components/demos/workspace-onboarding-demo";
import {
  ActionTimeline,
  ArticleCTA,
  ArticleIntro,
  CheckList,
  ChecklistBlock,
  DecisionQuestion,
  DiagnosticArtifactCard,
  ExpertInsight,
  GoNoGoTable,
  LaunchQuestion,
  MiniCaseStudy,
  NoGoSignal,
  RiskSection,
} from "@/components/content/article-blocks";
import {
  ReportList,
  ReportMeta,
  ReportSection,
  ReportTable,
} from "@/components/content/report-blocks";
import { DemoFrame, DemoMeta, type DemoLayout, type DemoLink } from "@/components/layout/demo-frame";
import { FullWidth } from "@/components/layout/full-width";

type WrapperProps = { children: ReactNode; className?: string };
type DemoProps = {
  title: string;
  description?: string;
  layout?: DemoLayout;
  stack?: string[];
  links?: DemoLink[];
  children: ReactNode;
};

// Renders the article on the server. The previous path loaded the whole MDX
// pipeline through next/dynamic with ssr: false, so every post shipped an
// <article> containing the words "Loading walkthrough…" and nothing else —
// including the sample report this site offers as its only evidence. Search
// engines and anyone whose JavaScript had not arrived saw the placeholder.
//
// Nothing here needed the client. getMDXComponent is a plain function; only its
// useMemo wrapper made the old renderer a client component, and the article
// blocks hold no hooks and no browser APIs. WorkspaceOnboardingDemo is the one
// genuinely interactive component, and it carries its own "use client", so the
// boundary sits around it rather than around every article.
export function ServerPostContent({
  code,
  defaultDemoLayout = "narrow",
}: {
  code: string;
  defaultDemoLayout?: DemoLayout;
}) {
  const Component = getMDXComponent(code);

  const components = {
    DemoPlaceholder,
    WorkspaceOnboardingDemo,
    DeviceFrame,
    Demo: ({ layout = defaultDemoLayout, ...props }: DemoProps) => (
      <DemoFrame layout={layout} {...props} />
    ),
    DemoMeta,
    LaunchQuestion,
    DecisionQuestion,
    NoGoSignal,
    CheckList,
    ChecklistBlock,
    GoNoGoTable,
    ArticleCTA,
    ArticleIntro,
    RiskSection,
    ExpertInsight,
    MiniCaseStudy,
    ActionTimeline,
    DiagnosticArtifactCard,
    ReportMeta,
    ReportSection,
    ReportTable,
    ReportList,
    FullWidth: ({ children, className = "" }: WrapperProps) => (
      <FullWidth className={`py-8 ${className}`.trim()}>{children}</FullWidth>
    ),
    Narrow: ({ children, className = "" }: WrapperProps) => (
      <FullWidth variant="narrow" className={`py-8 ${className}`.trim()}>
        {children}
      </FullWidth>
    ),
  };

  return <Component components={components} />;
}
