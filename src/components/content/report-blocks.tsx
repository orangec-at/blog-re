import type { ReactNode } from "react";

// The sample audit report's own furniture. The article components in
// article-blocks.tsx describe what a report contains; these render one.
//
// Colour here is the whole point. DESIGN.md carries p0/p1/ok/deferred and says
// colour on this site means a verdict — a report's severity and status columns
// are the one place on the site where that claim is literally true, so the
// vocabulary is closed and declared rather than matched loosely.

const VERDICT_CLASS: Record<string, string> = {
  // severity
  P0: "text-p0",
  P1: "text-p1",
  P2: "text-deferred",
  P3: "text-deferred",
  // readiness status
  Red: "text-p0",
  Yellow: "text-p1",
  Green: "text-ok",
  // launch decision
  "No-Go": "text-p0",
  "No-Go until verified": "text-p0",
  "No-Go for paid users": "text-p0",
  Conditional: "text-p1",
  "Conditional for private beta only": "text-p1",
  Go: "text-ok",
  // evidence state — not a finding, so it is deferred rather than a severity
  Unknown: "text-deferred",
  Missing: "text-deferred",
  "Weak/unknown": "text-p0",
  "Works in demo": "text-p1",
  Incomplete: "text-p1",
};

function verdictClass(value: string) {
  return VERDICT_CLASS[value.trim()] ?? "";
}

type ReportMetaProps = {
  product: string;
  auditType: string;
  auditDate: string;
  preparedBy: string;
  status: string;
  notice: string;
};

/**
 * The report's cover block. A real audit opens by saying what it is, what it
 * covers and when it was made; this one also has to say it is a sample, which
 * is a standing approval boundary rather than a style choice.
 */
export function ReportMeta({
  product,
  auditType,
  auditDate,
  preparedBy,
  status,
  notice,
}: ReportMetaProps) {
  const rows: Array<[string, string]> = [
    ["Product", product],
    ["Audit type", auditType],
    ["Audit date", auditDate],
    ["Prepared by", preparedBy],
    ["Report status", status],
  ];

  return (
    <section className="not-prose my-10 border-y border-rule">
      <dl className="grid gap-x-6 gap-y-3 py-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 sm:col-span-2 sm:grid-cols-subgrid">
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              {label}
            </dt>
            <dd className="text-sm text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {/* p1, matching VerdictSheet, which owns the sample-notice pattern on the
          home page. Not p0: DESIGN.md asks which finding a verdict colour marks
          and a sample notice marks none - it is the caution the site already
          spells in amber. Mono uppercase is VerdictSheet's because its notice is
          four words; this one is a sentence and stays in prose. */}
      <p className="border-t border-rule py-4 text-sm text-p1">{notice}</p>
    </section>
  );
}

type ReportSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

/**
 * One numbered section of the report. Same grammar as ProposalSection on the
 * home page — mono locator, then a display heading — but set inside the reading
 * column rather than in a page margin, because the article measure has no
 * margin to give it.
 */
export function ReportSection({ number, title, children }: ReportSectionProps) {
  const headingId = `report-${number}`;

  return (
    <section aria-labelledby={headingId} className="not-prose mt-14 border-t border-rule pt-6">
      <p aria-hidden="true" className="font-mono text-sm text-ink-muted">
        {number}
      </p>
      <h2
        id={headingId}
        className="mt-2 font-display text-2xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-5 flex min-w-0 flex-col gap-4 text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}

type ReportTableProps = {
  caption: string;
  headers: string[];
  rows: string[][];
  /** Zero-based columns whose cells are verdicts and may carry a verdict colour. */
  verdictColumns?: number[];
};

/**
 * Every table in the report. Rules, never a card shell or a zebra fill, and the
 * only coloured cells are the ones in verdictColumns — a severity or a launch
 * decision. Scrolls inside its own box so a seven-column risk table cannot push
 * the reading column sideways.
 */
export function ReportTable({ caption, headers, rows, verdictColumns = [] }: ReportTableProps) {
  const verdict = new Set(verdictColumns);

  return (
    <div className="not-prose my-8 min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{caption}</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-y border-ink">
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="py-3 pr-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("|")} className="border-b border-rule align-top">
                {row.map((cell, column) => (
                  <td
                    key={`${column}-${cell}`}
                    className={`py-3 pr-5 leading-6 ${
                      verdict.has(column) ? `font-semibold ${verdictClass(cell)}` : "text-ink"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ReportListProps = {
  caption?: string;
  items: string[];
  ordered?: boolean;
};

/** A named list inside a section — checks, tasks, evidence. Rules, not a card. */
export function ReportList({ caption, items, ordered = false }: ReportListProps) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="not-prose my-6">
      {caption ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{caption}</p>
      ) : null}
      <List className={`mt-3 border-t border-rule ${ordered ? "list-decimal" : "list-disc"}`}>
        {items.map((item) => (
          <li key={item} className="ml-5 border-b border-rule py-3 pl-1 text-sm leading-6 text-ink">
            {item}
          </li>
        ))}
      </List>
    </div>
  );
}
