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
    <section className="not-prose my-12 border-y border-rule">
      <div className="border-b border-rule py-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
          {eyebrow}
        </p>
        <p className="mt-4 max-w-3xl text-balance text-2xl font-semibold leading-[1.13] tracking-[-0.035em] text-ink sm:text-3xl">
          {thesis}
        </p>
      </div>
      <ol className="divide-y divide-rule">
        {points.map((point, index) => (
          <li key={point} className="grid gap-3 py-4 sm:grid-cols-[44px_1fr]">
            <span className="font-mono text-[11px] font-semibold text-ink-muted">
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
    <aside className="not-prose my-7 border-l-2 border-ink py-1 pl-5">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">Launch question</p>
      <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-ink sm:text-2xl">
        {children}
      </p>
    </aside>
  );
}

export function NoGoSignal({ children }: ChildrenProps) {
  return (
    <aside className="not-prose my-6 rounded-lg bg-panel-dark p-5 text-paper">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-p0">No-Go signal</p>
      <p className="mt-3 text-base leading-7 text-paper/86">{children}</p>
    </aside>
  );
}

export function CheckList({ items }: CheckListProps) {
  return (
    <ul className="my-5 grid gap-2.5 not-prose">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 py-1.5 text-sm leading-6 text-ink">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/85" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExpertInsight({ children, source = "Expert insight" }: ExpertInsightProps) {
  return (
    <aside className="not-prose my-9 rounded-lg border-l-2 border-ink bg-rule/20 p-5 sm:p-6">
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
    <section className="not-prose my-10 border-y border-rule">
      <div className="border-b border-rule py-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">Mini case study</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-ink sm:text-3xl">
          {title}
        </h3>
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-10">
        <div className="border-b border-rule py-5 lg:border-b-0">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">Problem</p>
          <p className="mt-2 text-base leading-7 text-ink">{problem}</p>
        </div>
        <div className="border-b border-rule py-5 lg:border-b-0">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">Outcome</p>
          <p className="mt-2 text-base leading-7 text-ink">{outcome}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-2 py-4">
        {stats.map((stat) => (
          <div key={stat}>
            <p className="font-mono text-sm text-ink-muted">{stat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ActionTimeline({ steps, title }: ActionTimelineProps) {
  return (
    <section className="not-prose my-10 border-y border-rule py-5">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">Action plan</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-ink sm:text-3xl">{title}</h3>
      <ol className="mt-6 grid gap-3">
        {steps.map((step) => (
          <li key={`${step.label}-${step.title}`} className="grid gap-3 border-t border-rule py-4 sm:grid-cols-[96px_1fr]">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">{step.label}</span>
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
    <section id={id} className="not-prose my-9 scroll-mt-24 border-t border-rule pt-7">
      <div className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              Check {paddedIndex}
            </p>
            <h2 className="m-0 mt-2 max-w-3xl text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-ink sm:text-3xl">
              {title}
            </h2>
          </div>

        </div>
        <p className="max-w-3xl text-[15px] leading-7 text-ink sm:text-base">{body}</p>

        <div className="border-t border-rule py-4">
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Checklist</p>
          <CheckList items={checks} />
        </div>

        <div className="border-t border-rule pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Launch blocker</p>
          <p className="mt-2 text-base font-semibold leading-7 tracking-[-0.015em] text-ink">{question}</p>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            <span className="font-semibold text-p0">No-Go: </span>
            {noGo}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GoNoGoTable({ rows }: GoNoGoTableProps) {
  return (
    <div className="not-prose my-10 border-y border-rule">
      <div className="border-b border-rule py-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">Decision table</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl">A simple Go / No-Go test</h3>
      </div>
      <div className="overflow-x-auto">
        <table aria-label="Go / No-Go decision table" className="min-w-full border-collapse text-left text-sm">
          <thead className="border-b border-ink text-ink">
            <tr>
              <th className="py-3 pr-5 font-mono text-[11px] uppercase tracking-[0.18em]">Signal</th>
              <th className="py-3 font-mono text-[11px] uppercase tracking-[0.18em]">Decision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.signal}-${row.decision}`} className="border-t border-rule">
                <td className="py-4 pr-5 leading-6 text-ink">{row.signal}</td>
                <td className="py-4 font-semibold leading-6 text-ink">{row.decision}</td>
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
    <aside className="not-prose my-10 rounded-lg bg-panel-dark text-paper">
      <div className="border-b border-panel-dark-muted/25 p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-panel-dark-muted">
          {eyebrow}
        </p>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-paper sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-panel-dark-muted">{body}</p>
      </div>
      <div className="flex flex-col gap-3 p-6 sm:flex-row sm:flex-wrap">
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-[5px] bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-panel-dark-muted"
          href={primary.href}
        >
          {primary.label}
        </a>
        {secondary ? (
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-[5px] border border-panel-dark-muted/40 px-4 py-2 text-sm font-semibold text-paper transition hover:border-paper"
            href={secondary.href}
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
    <aside className="not-prose my-10 border-y border-rule">
      <div className="border-b border-rule py-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-ink sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink sm:text-base">{description}</p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-2 py-4">
        {items.map((item) => (
          <div key={item}>
            <p className="font-mono text-sm text-ink-muted">{item}</p>
          </div>
        ))}
      </div>
      {cta ? (
        <div className="border-t border-rule py-4">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-[5px] border border-ink bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:border-ink-muted hover:bg-ink-muted"
            href={cta.href}
          >
            {cta.label}
          </a>
        </div>
      ) : null}
    </aside>
  );
}
