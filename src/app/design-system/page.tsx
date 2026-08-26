import {
  ArticleIntro,
  ChecklistBlock,
  DecisionQuestion,
  DiagnosticArtifactCard,
  ExpertInsight,
  RiskSignal,
} from "@/components/content/article-blocks";
import { PostConversionRail, PostMobileConversionRail, type ConversionRailConfig } from "@/components/content/post-conversion-rail";
import { Container } from "@/components/layout/container";
import { MobileFloatingAppbarFrame } from "@/components/layout/mobile-floating-appbar";
import { Button, PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/button";
import { Chip, ChipGroup, InteractiveChip } from "@/components/ui/chip";
import { DecisionPanel } from "@/components/ui/patterns/decision-panel";
import { ProofRow } from "@/components/ui/patterns/proof-row";
import { SectionIntro } from "@/components/ui/patterns/section-intro";
import { SignalList } from "@/components/ui/patterns/signal-list";
import { PanelSurface } from "@/components/ui/surfaces/panel-surface";
import { ConsolePanel } from "@/components/ui/surfaces/console-panel";
import { BodyText, Eyebrow, SectionHeading } from "@/components/ui/typography";

const surfaceExamples = [
  {
    name: "Default Panel",
    body: "Use for structured content groups that need clearer containment than a flat section.",
    tone: "default" as const,
  },
  {
    name: "Muted Panel",
    body: "Use for supporting sections and proof content that should stay readable without dominating.",
    tone: "muted" as const,
  },
  {
    name: "Accent Panel",
    body: "Use when a founder-facing note or path recommendation needs extra emphasis.",
    tone: "accent" as const,
  },
];

const designSystemRailConfig: ConversionRailConfig = {
  ctaLabel: "기술 부채 진단 문의하기",
  description: "A reusable conversion rail for product-style articles: section navigation plus the diagnostic next step.",
  navLabel: "Design system article rail preview",
  railTitle: "Conversion rail",
  sections: [
    { href: "#article-intro-preview", label: "Intro" },
    { href: "#risk-signal-preview", label: "Risk" },
    { href: "#artifact-preview", label: "Artifact" },
  ],
  secondaryHref: "/posts/ai-mvp-technical-debt-audit-sample-report",
  secondaryLabel: "샘플 리포트 보기",
  title: "Keep the article path tied to one clear diagnostic action.",
};

export default function DesignSystemPage() {
  return (
    <div className="flex flex-col gap-16 py-4" data-testid="design-system-page">
      <section className="py-12 sm:py-16">
        <Container variant="wide" className="space-y-8">
          <SectionIntro
            aside="This route is the practical reference for building future blog and conversion sections without inventing another card style."
            body="A living reference for the blog's readable color roles, surface hierarchy, and reusable UI patterns."
            eyebrow="Internal reference"
            title="Design System"
            titleAs="h1"
          />
        </Container>
      </section>

      <section className="pb-4">
        <Container variant="wide" className="space-y-8">
          <SectionHeading>Surface Ladder</SectionHeading>
          <div className="grid gap-5 lg:grid-cols-3">
            {surfaceExamples.map((surface) => (
              <PanelSurface key={surface.name} as="article" className="space-y-3" tone={surface.tone}>
                <Eyebrow>{surface.name}</Eyebrow>
                <BodyText>{surface.body}</BodyText>
              </PanelSurface>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container variant="wide" className="space-y-8">
          <SectionHeading>Buttons & Chips</SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <PanelSurface as="article" className="space-y-5" tone="default">
              <Eyebrow>Buttons</Eyebrow>
              <ChipGroup aria-label="Button examples" className="items-stretch">
                <PrimaryButton href="/contact" size="sm">Primary</PrimaryButton>
                <SecondaryButton size="sm">Secondary</SecondaryButton>
                <Button size="sm" variant="ghost">Ghost</Button>
                <TextLink href="/services">Text Link</TextLink>
              </ChipGroup>
            </PanelSurface>

            <PanelSurface as="article" className="space-y-5" tone="muted">
              <Eyebrow>Chips</Eyebrow>
              <ChipGroup aria-label="Chip examples">
                <Chip tone="neutral">Neutral</Chip>
                <Chip tone="accent">Accent</Chip>
                <InteractiveChip href="/services" selected size="sm">Selected</InteractiveChip>
                <InteractiveChip count="4" href="/posts" size="sm">Interactive</InteractiveChip>
              </ChipGroup>
            </PanelSurface>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container variant="wide" className="space-y-8">
          <SectionHeading>Pattern Examples</SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <DecisionPanel
              ctaHref="/contact"
              ctaLabel="Start with Diagnosis"
              outcome="A rescue plan founders can use to align contractors, timelines, and launch risk."
              summary="The default first step when the MVP works in demos but feels brittle under real use."
              title="Decision Panel"
              tone="accent"
              whyItFits="Teams that need a clear technical read before they choose larger rescue work."
            />

            <ConsolePanel
              aside={<span className="rounded-pill border border-rule bg-paper px-4 py-1 text-sm font-semibold text-ink">Reusable dark shell</span>}
              heading="Diagnostic Console"
              kicker="Operational pattern"
              summary="Use for triage, audits, and high-density founder guidance that needs stronger contrast."
            >
              <div className="grid gap-px bg-[#6f6258] lg:grid-cols-2">
                <div className="bg-[#2b211e] p-6">
                  <SignalList
                    headingLevel={3}
                    items={[
                      "Demo stability hides production fragility.",
                      "Logic boundaries are hard to trace.",
                      "Every new feature raises delivery risk.",
                    ]}
                    title="Symptoms"
                    tone="inverse"
                  />
                </div>
                <div className="bg-[#221a18] p-6">
                  <SignalList
                    headingLevel={3}
                    items={[
                      "Rank the launch blockers.",
                      "Separate cleanup from urgent repair.",
                      "Give founders reusable technical guidance.",
                    ]}
                    title="Outcomes"
                    tone="inverse"
                  />
                </div>
              </div>
            </ConsolePanel>
          </div>

          <ProofRow
            ctaHref="/posts"
            ctaLabel="Browse Supporting Writing"
            highlights={["Before/After", "Architecture Notes", "Founder Translation"]}
            summary="A horizontal proof unit that feels more editorial and less like another three-column card."
            title="Proof Row"
          />

          <PanelSurface as="section" className="space-y-5 overflow-hidden" tone="default">
            <Eyebrow>Mobile navigation pattern</Eyebrow>
            <SectionHeading>Floating App Bar</SectionHeading>
            <BodyText>
              A mobile-first bottom app bar built from interactive chips and one primary action.
            </BodyText>
            <div className="relative min-h-28 rounded-[24px] border border-dashed border-rule bg-paper">
              <MobileFloatingAppbarFrame />
            </div>
          </PanelSurface>
        </Container>
      </section>

      <section className="pb-20">
        <Container variant="wide" className="space-y-8">
          <SectionIntro
            aside="Use this section as the source of truth when composing proof articles, diagnostic guides, and founder-facing conversion pages."
            body="The content layer turns weak one-off MDX markup into reusable product blocks: decisions, risk signals, artifacts, and conversion rails."
            eyebrow="Content system"
            title="Content Product Blocks"
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <PanelSurface as="article" className="space-y-4" tone="muted">
                <Eyebrow>Article Intro</Eyebrow>
                <div id="article-intro-preview">
                  <ArticleIntro
                    eyebrow="Diagnostic opening"
                    thesis="Open product-style articles with the decision the founder actually needs to make."
                    points={[
                      "Frame the launch risk in plain business language.",
                      "Preview the diagnostic path before the long-form explanation begins.",
                      "Connect the article to one concrete service artifact.",
                    ]}
                  />
                </div>
              </PanelSurface>

              <PanelSurface as="article" className="space-y-4" tone="default">
                <Eyebrow>Decision Question / Risk Signal / Checklist Block</Eyebrow>
                <div id="risk-signal-preview" className="space-y-4">
                  <DecisionQuestion>Can the founder explain what must be fixed before adding the next feature?</DecisionQuestion>
                  <RiskSignal>If the team can only say “it feels messy,” the next step is diagnosis, not a rewrite.</RiskSignal>
                  <ChecklistBlock
                    items={[
                      "Name the launch-critical user path.",
                      "Separate brittle demo code from real production blockers.",
                      "Decide which fixes must happen before external traffic.",
                    ]}
                  />
                </div>
              </PanelSurface>

              <div id="artifact-preview" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_0.85fr]">
                <DiagnosticArtifactCard
                  cta={{ href: "/posts/ai-mvp-technical-debt-audit-sample-report", label: "샘플 진단 리포트 보기" }}
                  description="Use when the page needs to show the thing FixMyVibe actually delivers, not just promise cleaner code."
                  eyebrow="Artifact preview"
                  items={["Risk map", "Repair sequence", "Founder memo"]}
                  title="Diagnostic Artifact Card"
                />
                <ExpertInsight source="Usage rule">
                  Proof blocks should make the deliverable feel tangible before the founder reaches the contact CTA.
                </ExpertInsight>
              </div>
            </div>

            <div className="space-y-4">
              <SectionHeading className="text-2xl sm:text-3xl">Post Conversion Rail</SectionHeading>
              <PostConversionRail config={designSystemRailConfig} />
              <div className="rounded-[28px] border border-dashed border-rule bg-paper p-4 lg:hidden">
                <PostMobileConversionRail config={designSystemRailConfig} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
