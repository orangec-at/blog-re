import type { ReactNode } from "react";

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
    <section className="not-prose my-12 overflow-hidden rounded-[28px] bg-white shadow-[0_0_0_1px_rgba(32,21,21,0.08),0_12px_38px_rgba(32,21,21,0.06)]">
      <div className="border-b border-ink/8 bg-[radial-gradient(circle_at_top_left,rgba(255,79,0,0.11),transparent_32%),linear-gradient(180deg,#fffefb,#fff8ef)] px-5 py-6 sm:px-7 sm:py-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
          {eyebrow}
        </p>
        <p className="mt-4 max-w-3xl text-balance text-2xl font-semibold leading-[1.13] tracking-[-0.035em] text-ink sm:text-3xl">
          {thesis}
        </p>
      </div>
      <ol className="divide-y divide-ink/8">
        {points.map((point, index) => (
          <li key={point} className="grid gap-3 px-5 py-4 sm:grid-cols-[44px_1fr] sm:px-7">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-[11px] font-semibold text-paper">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] leading-7 text-ink sm:text-base">{point}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LaunchQuestion({ children }: ChildrenProps) {
  return (
    <aside className="my-7 rounded-[24px] border border-rule/20 bg-[#fff6ef] p-5 not-prose shadow-[0_0_0_1px_rgba(255,79,0,0.04)] sm:p-6">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">Launch question</p>
      <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-ink sm:text-2xl">
        {children}
      </p>
    </aside>
  );
}

export function NoGoSignal({ children }: ChildrenProps) {
  return (
    <aside className="my-6 rounded-[24px] border border-ink/90 bg-ink p-5 not-prose text-paper shadow-[0_18px_45px_rgba(32,21,21,0.12)]">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">No-Go signal</p>
      <p className="mt-3 text-base leading-7 text-paper/86">{children}</p>
    </aside>
  );
}

export function CheckList({ items }: CheckListProps) {
  return (
    <ul className="my-5 grid gap-2.5 not-prose">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-xl bg-[#f8f3ea] px-3.5 py-2.5 text-sm leading-6 text-ink">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/85" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExpertInsight({ children, source = "Expert insight" }: ExpertInsightProps) {
  return (
    <aside className="not-prose my-9 rounded-[28px] bg-[#fff8ef] p-5 shadow-[inset_4px_0_0_#ff4f00,0_0_0_1px_rgba(255,79,0,0.12)] sm:p-6">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
        {source}
      </p>
      <blockquote className="mt-3 text-xl font-semibold leading-snug tracking-[-0.035em] text-ink sm:text-2xl">
        “{children}”
      </blockquote>
    </aside>
  );
}

export function MiniCaseStudy({ outcome, problem, stats, title }: MiniCaseStudyProps) {
  return (
    <section className="not-prose my-10 overflow-hidden rounded-[30px] bg-white shadow-[0_0_0_1px_rgba(32,21,21,0.06),0_18px_60px_rgba(32,21,21,0.075)]">
      <div className="border-b border-[#ece6dc] bg-[#fffaf3] px-5 py-5 sm:px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">Mini case study</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-ink sm:text-3xl">
          {title}
        </h3>
      </div>
      <div className="grid gap-px bg-[#ece6dc] lg:grid-cols-[1fr_1fr]">
        <div className="bg-white p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Problem</p>
          <p className="mt-2 text-base leading-7 text-ink">{problem}</p>
        </div>
        <div className="bg-white p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">Outcome</p>
          <p className="mt-2 text-base leading-7 text-ink">{outcome}</p>
        </div>
      </div>
      <div className="grid gap-px bg-[#ece6dc] sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat} className="bg-ink px-5 py-4 text-[#fffefb]">
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
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">Action plan</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-ink sm:text-3xl">{title}</h3>
      <ol className="mt-6 grid gap-3">
        {steps.map((step) => (
          <li key={`${step.label}-${step.title}`} className="grid gap-3 rounded-2xl bg-white p-4 shadow-[0_0_0_1px_rgba(32,21,21,0.055)] sm:grid-cols-[96px_1fr]">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink">{step.label}</span>
            <span>
              <span className="block text-base font-semibold tracking-[-0.02em] text-ink">{step.title}</span>
              <span className="mt-1 block text-sm leading-6 text-ink">{step.body}</span>
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
    <section id={id} className="not-prose my-9 scroll-mt-24 overflow-hidden rounded-[26px] bg-white shadow-[0_0_0_1px_rgba(32,21,21,0.075),0_10px_30px_rgba(32,21,21,0.04)]">
      <div className="grid gap-4 p-5 sm:p-7">
        <div className="flex flex-col gap-3 border-b border-ink/8 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
              Check {paddedIndex}
            </p>
            <h2 className="m-0 mt-2 max-w-3xl text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-ink sm:text-3xl">
              {title}
            </h2>
          </div>
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-[#fffaf3] font-mono text-sm font-semibold text-ink sm:flex">
            {paddedIndex}
          </div>
        </div>
        <p className="max-w-3xl text-[15px] leading-7 text-ink sm:text-base">{body}</p>

        <div className="border-y border-ink/8 py-4">
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Checklist</p>
          <CheckList items={checks} />
        </div>

        <div className="rounded-[20px] border border-rule/20 bg-[#fffaf3] p-4 sm:p-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">Launch blocker</p>
          <p className="mt-2 text-base font-semibold leading-7 tracking-[-0.015em] text-ink">{question}</p>
          <p className="mt-3 border-t border-rule/15 pt-3 text-sm leading-6 text-ink">
            <span className="font-semibold text-ink">No-Go: </span>
            {noGo}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GoNoGoTable({ rows }: GoNoGoTableProps) {
  return (
    <div className="my-10 overflow-hidden rounded-[30px] border border-rule/70 bg-white not-prose shadow-[0_0_0_1px_rgba(32,21,21,0.03),0_18px_60px_rgba(32,21,21,0.07)]">
      <div className="border-b border-rule/60 bg-[#f8f3ea] px-5 py-5 sm:px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">Decision table</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl">Go / No-Go 간단 기준</h3>
      </div>
      <div className="overflow-x-auto">
        <table aria-label="Go / No-Go decision table" className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-ink text-paper">
            <tr>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em]">Signal</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em]">Decision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.signal}-${row.decision}`} className="border-t border-rule/55 odd:bg-white even:bg-[#fffaf3]">
                <td className="px-5 py-4 leading-6 text-ink">{row.signal}</td>
                <td className="px-5 py-4 font-semibold leading-6 text-ink">{row.decision}</td>
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
    <aside className="my-10 overflow-hidden rounded-[32px] bg-ink not-prose text-[#fffefb] shadow-[0_0_0_1px_rgba(32,21,21,0.08),0_24px_70px_rgba(32,21,21,0.18)]">
      <div className="border-b border-paper/10 bg-[radial-gradient(circle_at_top_right,rgba(255,79,0,0.26),transparent_32%),linear-gradient(135deg,#201515,#2b1d1a)] p-6 sm:p-8">
        <PillTag
          className="border-rule/40 bg-[#fff4ec] text-ink"
          style={{ borderColor: "rgba(255,79,0,0.4)", color: "#201515" }}
        >
          {eyebrow}
        </PillTag>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#fffefb] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#fff4ec]">{body}</p>
      </div>
      <div className="flex flex-col gap-3 bg-[#fffdf9] p-5 sm:flex-row sm:flex-wrap sm:p-6">
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-[0_8px_18px_rgba(255,79,0,0.16)] transition-opacity hover:opacity-90"
          href={primary.href}
          style={{ backgroundColor: "#c63d00", color: "#fffefb" }}
        >
          {primary.label}
        </a>
        {secondary ? (
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#fff4ec]"
            href={secondary.href}
            style={{ borderColor: "rgba(32,21,21,0.22)", color: "#201515" }}
          >
            {secondary.label}
          </a>
        ) : null}
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
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-ink sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink sm:text-base">{description}</p>
      </div>
      <div className="grid gap-px bg-[#ece6dc] sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="bg-white px-5 py-4">
            <p className="font-mono text-sm font-semibold tracking-[-0.02em] text-ink">{item}</p>
          </div>
        ))}
      </div>
      {cta ? (
        <div className="border-t border-[#ece6dc] bg-[#201515] p-5">
          <a
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90"
            href={cta.href}
            style={{ backgroundColor: "#c63d00", borderColor: "#c63d00", color: "#fffefb" }}
          >
            {cta.label}
          </a>
        </div>
      ) : null}
    </aside>
  );
}
