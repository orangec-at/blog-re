import type { ReactNode } from "react";

import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { SecondaryButton } from "@/components/ui/actions/secondary-button";
import { PillTag } from "@/components/ui/feedback/pill-tag";

type ChildrenProps = {
  children: ReactNode;
};

type ArticleIntroProps = {
  eyebrow?: string;
  thesis: string;
  points: string[];
};

type CheckListProps = {
  items: string[];
};

type TimelineStep = {
  body: string;
  label: string;
  title: string;
};

type ActionTimelineProps = {
  steps: TimelineStep[];
  title: string;
};

type ExpertInsightProps = ChildrenProps & {
  source?: string;
};

type MiniCaseStudyProps = {
  outcome: string;
  problem: string;
  stats: string[];
  title: string;
};

type RiskSectionProps = {
  body: string;
  checks: string[];
  id?: string;
  index: number;
  noGo: string;
  question: string;
  title: string;
};

type GoNoGoRow = {
  signal: string;
  decision: string;
};

type GoNoGoTableProps = {
  rows: GoNoGoRow[];
};

type ArticleLink = {
  href: string;
  label: string;
};

type ArticleCTAProps = {
  body: string;
  eyebrow?: string;
  primary: ArticleLink;
  secondary?: ArticleLink;
  title: string;
};

export function ArticleIntro({ eyebrow = "Launch readiness", points, thesis }: ArticleIntroProps) {
  return (
    <section className="not-prose my-10 overflow-hidden rounded-[32px] bg-zapier-black text-cream shadow-[0_0_0_1px_rgba(32,21,21,0.08),0_24px_70px_rgba(32,21,21,0.16)]">
      <div className="grid gap-px bg-cream/10 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="bg-zapier-black p-6 sm:p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-zapier-orange">
            {eyebrow}
          </p>
          <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
            {thesis}
          </p>
        </div>
        <div className="bg-[#2b1d1a] p-4 sm:p-5">
          <ul className="grid gap-2">
            {points.map((point, index) => (
              <li key={point} className="flex gap-3 rounded-2xl border border-[#fffefb]/12 bg-[#fffefb]/8 p-4 text-sm leading-6 text-[#fff7ef]">
                <span className="font-mono text-xs font-semibold text-zapier-orange">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[#fff7ef]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function LaunchQuestion({ children }: ChildrenProps) {
  return (
    <aside className="my-7 rounded-[24px] border border-zapier-orange/20 bg-[#fff6ef] p-5 not-prose shadow-[0_0_0_1px_rgba(255,79,0,0.04)] sm:p-6">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">Launch question</p>
      <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-zapier-black sm:text-2xl">
        {children}
      </p>
    </aside>
  );
}

export function NoGoSignal({ children }: ChildrenProps) {
  return (
    <aside className="my-6 rounded-[24px] border border-zapier-black/90 bg-zapier-black p-5 not-prose text-cream shadow-[0_18px_45px_rgba(32,21,21,0.12)]">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">No-Go signal</p>
      <p className="mt-3 text-base leading-7 text-cream/86">{children}</p>
    </aside>
  );
}

export function CheckList({ items }: CheckListProps) {
  return (
    <ul className="my-5 grid gap-2.5 not-prose">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-xl bg-[#f8f3ea] px-3.5 py-2.5 text-sm leading-6 text-zapier-charcoal">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zapier-orange/85" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExpertInsight({ children, source = "Expert insight" }: ExpertInsightProps) {
  return (
    <aside className="not-prose my-9 rounded-[28px] bg-[#fff8ef] p-5 shadow-[inset_4px_0_0_#ff4f00,0_0_0_1px_rgba(255,79,0,0.12)] sm:p-6">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">
        {source}
      </p>
      <blockquote className="mt-3 text-xl font-semibold leading-snug tracking-[-0.035em] text-zapier-black sm:text-2xl">
        “{children}”
      </blockquote>
    </aside>
  );
}

export function MiniCaseStudy({ outcome, problem, stats, title }: MiniCaseStudyProps) {
  return (
    <section className="not-prose my-10 overflow-hidden rounded-[30px] bg-white shadow-[0_0_0_1px_rgba(32,21,21,0.06),0_18px_60px_rgba(32,21,21,0.075)]">
      <div className="border-b border-[#ece6dc] bg-[#fffaf3] px-5 py-5 sm:px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-zapier-gray">Mini case study</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-zapier-black sm:text-3xl">
          {title}
        </h3>
      </div>
      <div className="grid gap-px bg-[#ece6dc] lg:grid-cols-[1fr_1fr]">
        <div className="bg-white p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">Problem</p>
          <p className="mt-2 text-base leading-7 text-zapier-charcoal">{problem}</p>
        </div>
        <div className="bg-white p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">Outcome</p>
          <p className="mt-2 text-base leading-7 text-zapier-charcoal">{outcome}</p>
        </div>
      </div>
      <div className="grid gap-px bg-[#ece6dc] sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat} className="bg-zapier-black px-5 py-4 text-[#fffefb]">
            <p className="font-mono text-sm font-semibold tracking-[-0.02em]">{stat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ActionTimeline({ steps, title }: ActionTimelineProps) {
  return (
    <section className="not-prose my-10 rounded-[30px] bg-[#f8f3ea] p-5 shadow-[0_0_0_1px_rgba(32,21,21,0.06)] sm:p-6">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-zapier-gray">Action plan</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-zapier-black sm:text-3xl">{title}</h3>
      <ol className="mt-6 grid gap-3">
        {steps.map((step) => (
          <li key={`${step.label}-${step.title}`} className="grid gap-3 rounded-2xl bg-white p-4 shadow-[0_0_0_1px_rgba(32,21,21,0.055)] sm:grid-cols-[96px_1fr]">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-zapier-orange">{step.label}</span>
            <span>
              <span className="block text-base font-semibold tracking-[-0.02em] text-zapier-black">{step.title}</span>
              <span className="mt-1 block text-sm leading-6 text-zapier-charcoal">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RiskSection({ body, checks, id, index, noGo, question, title }: RiskSectionProps) {
  const paddedIndex = String(index).padStart(2, "0");

  return (
    <section id={id} className="not-prose my-8 scroll-mt-24 overflow-hidden rounded-[30px] border border-[#e3ded3] bg-[#fffefa] shadow-[0_0_0_1px_rgba(32,21,21,0.025),0_16px_50px_rgba(32,21,21,0.055)]">
      <div className="grid gap-px bg-[#e7e1d6] lg:grid-cols-[0.28fr_1fr]">
        <div className="bg-[#f8f3ea] p-5 sm:p-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-zapier-gray">
            Check {paddedIndex}
          </p>
          <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-zapier-black font-mono text-base font-semibold text-[#fffefb] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]">
            {paddedIndex}
          </div>
        </div>
        <div className="bg-[#fffefa] p-5 sm:p-7">
          <h2 className="m-0 text-2xl font-semibold leading-tight tracking-[-0.04em] text-zapier-black sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-zapier-charcoal sm:text-base">{body}</p>
          <div className="mt-5 rounded-2xl bg-white p-3 shadow-[0_0_0_1px_rgba(32,21,21,0.055)]">
            <p className="mb-2 px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-gray">Checklist</p>
            <CheckList items={checks} />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-[#fff6ef] p-4 shadow-[0_0_0_1px_rgba(255,79,0,0.12)]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">Question</p>
              <p className="mt-2 text-base font-semibold leading-7 tracking-[-0.02em] text-zapier-black">{question}</p>
            </div>
            <div className="rounded-2xl bg-zapier-black p-4 text-[#fffefb] shadow-[0_0_0_1px_rgba(32,21,21,0.9)]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">No-Go</p>
              <p className="mt-2 text-sm leading-6 text-[#fff4ec]">{noGo}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoNoGoTable({ rows }: GoNoGoTableProps) {
  return (
    <div className="my-10 overflow-hidden rounded-[30px] border border-zapier-sand/70 bg-white not-prose shadow-[0_0_0_1px_rgba(32,21,21,0.03),0_18px_60px_rgba(32,21,21,0.07)]">
      <div className="border-b border-zapier-sand/60 bg-[#f8f3ea] px-5 py-5 sm:px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-zapier-gray">Decision table</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-zapier-black sm:text-3xl">Go / No-Go 간단 기준</h3>
      </div>
      <div className="overflow-x-auto">
        <table aria-label="Go / No-Go decision table" className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-zapier-black text-cream">
            <tr>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em]">Signal</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em]">Decision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.signal}-${row.decision}`} className="border-t border-zapier-sand/55 odd:bg-white even:bg-[#fffaf3]">
                <td className="px-5 py-4 leading-6 text-zapier-charcoal">{row.signal}</td>
                <td className="px-5 py-4 font-semibold leading-6 text-zapier-black">{row.decision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ArticleCTA({ body, eyebrow = "Next step", primary, secondary, title }: ArticleCTAProps) {
  return (
    <aside className="my-10 overflow-hidden rounded-[32px] bg-zapier-black not-prose text-[#fffefb] shadow-[0_0_0_1px_rgba(32,21,21,0.08),0_24px_70px_rgba(32,21,21,0.18)]">
      <div className="border-b border-cream/10 bg-[radial-gradient(circle_at_top_right,rgba(255,79,0,0.26),transparent_32%),linear-gradient(135deg,#201515,#2b1d1a)] p-6 sm:p-8">
        <PillTag className="border-zapier-orange/40 bg-[#fff4ec] text-zapier-black">{eyebrow}</PillTag>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#fffefb] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#fff4ec]">{body}</p>
      </div>
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:p-6">
        <PrimaryButton href={primary.href}>{primary.label}</PrimaryButton>
        {secondary ? <SecondaryButton href={secondary.href}>{secondary.label}</SecondaryButton> : null}
      </div>
    </aside>
  );
}


export function DecisionQuestion({ children }: ChildrenProps) {
  return <LaunchQuestion>{children}</LaunchQuestion>;
}

export function RiskSignal({ children }: ChildrenProps) {
  return <NoGoSignal>{children}</NoGoSignal>;
}

export function ChecklistBlock({ items }: CheckListProps) {
  return <CheckList items={items} />;
}

type DiagnosticArtifactCardProps = {
  cta?: ArticleLink;
  description: string;
  eyebrow?: string;
  items: string[];
  title: string;
};

export function DiagnosticArtifactCard({
  cta,
  description,
  eyebrow = "Diagnostic artifact",
  items,
  title,
}: DiagnosticArtifactCardProps) {
  return (
    <aside className="not-prose my-10 overflow-hidden rounded-[30px] bg-white shadow-[0_0_0_1px_rgba(32,21,21,0.06),0_18px_60px_rgba(32,21,21,0.075)]">
      <div className="border-b border-[#ece6dc] bg-[#fffaf3] px-5 py-5 sm:px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-zapier-orange">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-zapier-black sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zapier-charcoal sm:text-base">{description}</p>
      </div>
      <div className="grid gap-px bg-[#ece6dc] sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="bg-white px-5 py-4">
            <p className="font-mono text-sm font-semibold tracking-[-0.02em] text-zapier-black">{item}</p>
          </div>
        ))}
      </div>
      {cta ? (
        <div className="border-t border-[#ece6dc] bg-[#201515] p-5">
          <a
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90"
            href={cta.href}
            style={{ backgroundColor: "#ff4f00", borderColor: "#ff4f00", color: "#fffefb" }}
          >
            {cta.label}
          </a>
        </div>
      ) : null}
    </aside>
  );
}
