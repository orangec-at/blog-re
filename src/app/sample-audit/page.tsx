import type { Metadata } from "next";
import Link from "next/link";

import {
  ReportLabel,
  ReportList,
  ReportMeta,
  ReportSection,
  ReportTable,
  verdictClass,
} from "@/components/content/report-blocks";
import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/ui/button";
import { verdict } from "@/data/proposal-content";

export const metadata: Metadata = {
  title: "Sample report",
  description:
    "A sample Launch Gate Audit, written against a fictional product: the verdict, every finding with its severity, the evidence behind each P0, and the 48-hour plan.",
  alternates: { canonical: "/sample-audit" },
};

type GateStatus = "P0" | "P1" | "PASS";

interface Finding {
  id: string;
  gate: string;
  status: GateStatus;
  title: string;
  summary: string;
  impact: string;
  attackProof?: string;
  /** What kind of evidence attackProof is — a replay is not an access check. */
  proofLabel?: string;
  vulnerableCode?: string;
  fixedCode?: string;
  fixTime: string;
}

const FINDINGS: Finding[] = [
  {
    id: "RLS-01",
    gate: "Data Isolation",
    status: "P0",
    title: "Cross-Tenant Row Leak via Direct REST API",
    summary:
      "The Next.js UI filters courses and student records by tenant_id, but the PostgreSQL RLS policy on academy_records uses USING (true), so any signed-in user can read every row — tenant membership is never checked.",
    impact: "Any authenticated student from Academy A can read billing, grades, and contact records of Academy B by issuing a direct fetch to the Supabase PostgREST endpoint.",
    proofLabel: "Two-session access check",
    attackProof: `// Session A (User A, Academy #102)
const { data } = await supabase
  .from('academy_records')
  .select('*')
  .eq('tenant_id', 999); // Academy B (#999)

// Result: 200 OK — 48 private student dossiers returned.`,
    vulnerableCode: `-- VULNERABLE: Only checks if user is logged in
CREATE POLICY "Allow select for users" ON academy_records
FOR SELECT TO authenticated
USING (true);`,
    fixedCode: `-- SECURED: Enforces strict tenant boundary via JWT claims
CREATE POLICY "Strict tenant isolation" ON academy_records
FOR SELECT TO authenticated
USING (
  tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::bigint
);`,
    fixTime: "1.5 hours",
  },
  {
    id: "PAY-01",
    gate: "Stripe & Billing",
    status: "P0",
    title: "Webhook Handler Lacks Idempotency Guard",
    summary:
      "The checkout.session.completed webhook processes student enrollment and subscription credits without recording processed event IDs in an idempotency table.",
    impact: "When Stripe automatically retries webhook delivery upon network jitter, duplicate course credits and duplicate welcome emails are triggered.",
    proofLabel: "Webhook replay",
    attackProof: `// Simulated Stripe Webhook Retry (Same Event ID: evt_3N9x...)
POST /api/webhooks/stripe (Delivery #1) -> 200 OK (Credits granted: +100)
POST /api/webhooks/stripe (Delivery #2) -> 200 OK (Credits granted: +100)
// Total credits: 200 (Expected: 100)`,
    vulnerableCode: `// VULNERABLE: Direct DB update without event tracking
if (event.type === 'checkout.session.completed') {
  await grantCredits(session.customer, session.amount_total);
  return res.json({ received: true });
}`,
    fixedCode: `// SECURED: Atomic insert into processed_events table
const { error } = await supabase
  .from('processed_webhook_events')
  .insert({ event_id: event.id, processed_at: new Date().toISOString() });

if (error && error.code === '23505') {
  // 23505 = Unique violation -> already processed
  return res.json({ received: true, deduplicated: true });
}

await grantCredits(session.customer, session.amount_total);`,
    fixTime: "2.0 hours",
  },
  {
    id: "OPS-01",
    gate: "Disaster Recovery",
    status: "P0",
    title: "Point-in-Time Recovery (PITR) Never Drill-Tested",
    summary:
      "Automated backups are enabled in Supabase settings, but WAL archiving and point-in-time branch restoration have never been tested against a staging database.",
    impact: "In the event of a botched migration or malicious table drop during Beta, estimated Recovery Time Objective (RTO) is undefined and data loss risk is high.",
    proofLabel: "Observation",
    attackProof: "Observation: Staging environment has no automated restore script. Recovery runbook missing.",
    vulnerableCode: `# Current State: Default cloud dashboard toggle with no verified restore drill`,
    // The drill has not run, so the patch is the runbook, not a result: the RTO
    // is what step 3 measures.
    fixedCode: `# Recovery drill, on a staging branch:
# 1. Restore to a point in time before a test migration
# 2. Time the restore; compare row counts with the source
# 3. Record the measured RTO in the runbook`,
    fixTime: "2.5 hours",
  },
  {
    id: "SEC-02",
    gate: "Privilege Escalation",
    status: "P1",
    title: "SECURITY DEFINER Function Lacks search_path Hardening",
    summary:
      "A database function used to calculate monthly payouts runs with SECURITY DEFINER privileges but omits SET search_path = public.",
    impact: "Possibility of search_path hijacking if a malicious schema is injected by a compromised role.",
    fixTime: "30 mins",
  },
  {
    id: "MIG-01",
    gate: "Migrations",
    status: "P1",
    title: "Destructive Schema Migration Without Tested Rollback Script",
    summary:
      "Migration 20260815_restructure_plans.sql drops the legacy tier column without a backward-compatible transition phase.",
    impact: "If the new deployment fails in production, rolling back the application will crash because the old column was dropped.",
    fixTime: "1.0 hour",
  },
  {
    id: "MON-01",
    gate: "Monitoring",
    status: "P1",
    title: "Edge Functions Lack Runtime Exception Capture",
    summary:
      "Sentry is configured on the Next.js frontend and Node server, but Supabase Edge Functions fail silently on unhandled promise rejections.",
    impact: "Async webhook and background billing failures will leave no traces in error tracking.",
    fixTime: "45 mins",
  },
  {
    id: "AUTH-01",
    gate: "Password & Tokens",
    status: "PASS",
    title: "JWT Token Refresh & Password Hashing",
    summary: "Bcrypt hash rounds and Supabase JWT refresh rotation interval are correctly configured.",
    impact: "No security issues identified.",
    fixTime: "0 mins",
  },
  {
    id: "DB-01",
    gate: "Foreign Keys",
    status: "PASS",
    title: "Foreign Key Cascades & Strict Typing",
    summary: "All relational constraints, UUID validation, and deletion cascades are strictly modeled.",
    impact: "No security issues identified.",
    fixTime: "0 mins",
  },
  {
    id: "PAY-02",
    gate: "Price Validation",
    status: "PASS",
    title: "Server-Side Price ID Enforcement",
    summary: "Stripe Price IDs are mapped on the server; client cannot submit arbitrary billing amounts.",
    impact: "No security issues identified.",
    fixTime: "0 mins",
  },
];

// Typeset as the deliverable it shows, on the Report components DESIGN.md owns
// for this page. It used to be a filterable accordion in card shells, with rule
// fills and a shadow: a dashboard, where the site's one claim is that the audit
// is a document a founder reads start to finish. Nothing is hidden behind a
// click now, and nothing on the page needs the client.
// FINDINGS is already in severity order, P0 first; every list below keeps it.
const open = FINDINGS.filter((f) => f.status !== "PASS");
const passed = FINDINGS.filter((f) => f.status === "PASS");
const p0Count = FINDINGS.filter((f) => f.status === "P0").length;
const p1Count = FINDINGS.filter((f) => f.status === "P1").length;

// The home page promises these headings (verdict.sections, from the founder
// summary canon), so the sample fills them in, in that order.
const founderSummary = [
  "Run the two-day patch sprint, then open the closed beta as soon as RLS is verified.",
  `The ${p0Count} P0s in section 05. Nothing else changes the launch decision.`,
  "The P1s go into the next sprint. A full GraphQL migration, microservice decomposition and secondary audit logging can wait until past $10k MRR — do not spend budget on them today.",
  "The frontend UX and database schema show disciplined product thinking. The defects are the boundary oversights typical of fast AI-assisted prototyping, not fundamental design flaws.",
  "Auth and RLS, schema and migrations, payments, and ops and recovery — the areas in section 02. Not a penetration test and not a compliance certification.",
  "Sections 02 and 03 of this report, for the person who will fix them.",
];

const codeClass = "overflow-x-auto border px-4 py-3 font-mono text-xs leading-5 text-ink";

export default function SampleAuditPage() {
  return (
    <Container variant="wide" className="py-12 sm:py-16">
      <article className="mx-auto w-full max-w-[56rem]">
        <header>
          <p className="font-mono text-xs text-ink-muted">DOC-ID: VG-2026-SA09-SYNTHETIC</p>
          <h1 className="mt-4 font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
            Launch Gate Audit — Sample Report
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink">
            The deliverable a founder receives before risking live users or ad spend, shown in full.
          </p>
        </header>

        <ReportMeta
          product="EduPremium SaaS — multi-tenant B2B academy platform (React, TanStack, Supabase, Stripe)"
          auditType="Launch Gate Audit — one week"
          auditDate="2026-09"
          preparedBy="vibeguard (Jaeil Lee)"
          status="Sample"
          notice={verdict.sampleNotice}
        />

        <ReportSection number="01" title="Verdict">
          <p className={`text-xl font-semibold ${verdictClass("No-Go")}`}>No-Go for public launch as-is.</p>
          <p>
            The core workflow is well-architected, but {p0Count} P0 isolation, billing and recovery defects must be
            fixed before public onboarding. Do not rebuild the codebase: all {p0Count} can be closed in a 48-hour
            stabilization pass, about six engineering hours, without touching the existing UI.
          </p>
        </ReportSection>

        <ReportSection number="02" title="Findings">
          <ReportTable
            caption="Every finding, by severity"
            headers={["ID", "Status", "Finding", "Area", "Fix"]}
            rows={FINDINGS.map((f) => [f.id, f.status, f.title, f.gate, f.status === "PASS" ? "—" : f.fixTime])}
            verdictColumns={[1]}
          />
        </ReportSection>

        <ReportSection number="03" title="What each finding means">
          {open.map((f) => (
            <section key={f.id} aria-labelledby={`finding-${f.id}`} className="border-t border-rule pt-5">
              <h3 id={`finding-${f.id}`} className="text-lg font-semibold leading-snug text-ink">
                <span className="font-mono text-sm font-normal text-ink-muted">{f.id}</span>{" "}
                <span className={verdictClass(f.status)}>{f.status}</span> · {f.title}
              </h3>

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <ReportLabel>Diagnosis</ReportLabel>
                  <p className="mt-1">{f.summary}</p>
                </div>
                <div>
                  <ReportLabel>Business impact</ReportLabel>
                  <p className="mt-1">{f.impact}</p>
                </div>

                {f.attackProof ? (
                  <div>
                    <ReportLabel>Verification — {f.proofLabel}</ReportLabel>
                    <pre className={`mt-2 border-rule ${codeClass}`}>
                      <code>{f.attackProof}</code>
                    </pre>
                  </div>
                ) : null}

                {f.vulnerableCode && f.fixedCode ? (
                  <div className="grid min-w-0 gap-4 lg:grid-cols-2">
                    {/* Only the code as found carries a verdict: it is the P0.
                        The patch is unapplied and the finding still open, so it
                        takes a rule, not ok. */}
                    <div className="min-w-0">
                      <ReportLabel>Before</ReportLabel>
                      <pre className={`mt-2 border-p0 ${codeClass}`}>
                        <code>{f.vulnerableCode}</code>
                      </pre>
                    </div>
                    <div className="min-w-0">
                      <ReportLabel>After</ReportLabel>
                      <pre className={`mt-2 border-rule ${codeClass}`}>
                        <code>{f.fixedCode}</code>
                      </pre>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </ReportSection>

        <ReportSection number="04" title="What passed">
          <ReportList items={passed.map((f) => `${f.id} · ${f.title} — ${f.summary}`)} />
        </ReportSection>

        <ReportSection number="05" title="48-hour P0 plan">
          <p>
            These {p0Count} patches move the verdict from No-Go to Go for a closed beta. The {p1Count} P1 findings go
            into the next sprint.
          </p>
          <ReportList
            ordered
            items={[
              "Apply tenant isolation RLS policies — replace open policies with an app_metadata tenant check (1.5h).",
              "Create a processed_events webhook table — make Stripe fulfilment idempotent against retries (2.0h).",
              "Run a staging PITR recovery drill — verify the branch-restore runbook and record the RTO (2.5h).",
            ]}
          />
        </ReportSection>

        <ReportSection number="06" title={verdict.title}>
          {verdict.sections.map((section, i) => (
            <div key={section.heading}>
              <ReportLabel>{section.heading}</ReportLabel>
              <p className={`mt-1 ${i === 0 ? "font-semibold" : ""}`}>{founderSummary[i]}</p>
            </div>
          ))}
        </ReportSection>

        <footer className="mt-16 border-t border-rule pt-10">
          <h2 className="font-display text-2xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-3xl">
            Want this review before your launch?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink">
            The Launch Gate Audit is $1,200 fixed and takes a week. I verify every gate myself, and you receive a
            prioritized risk table, quick wins for the blockers, and a 7, 14 or 30-day next-sprint plan.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <PrimaryButton href="/contact">Start a Launch Gate Audit</PrimaryButton>
            <Link className="text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink" href="/">
              Back to overview
            </Link>
          </div>
        </footer>
      </article>
    </Container>
  );
}
