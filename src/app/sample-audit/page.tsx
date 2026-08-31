"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PrimaryButton } from "@/components/ui/button";

type GateStatus = "P0" | "P1" | "PASS";

interface Finding {
  id: string;
  gate: string;
  domain: string;
  status: GateStatus;
  title: string;
  summary: string;
  impact: string;
  attackProof?: string;
  vulnerableCode?: string;
  fixedCode?: string;
  fixTime: string;
}

const FINDINGS: Finding[] = [
  {
    id: "RLS-01",
    gate: "Data Isolation",
    domain: "Auth & RLS",
    status: "P0",
    title: "Cross-Tenant Row Leak via Direct REST API",
    summary:
      "The Next.js UI filters courses and student records by tenant_id, but the PostgreSQL RLS policy on academy_records only checks auth.uid() IS NOT NULL without validating tenant membership.",
    impact: "Any authenticated student from Academy A can read billing, grades, and contact records of Academy B by issuing a direct fetch to the Supabase PostgREST endpoint.",
    attackProof: `// Attacker Session (User A, Academy #102)
const { data } = await supabase
  .from('academy_records')
  .select('*')
  .eq('tenant_id', 999); // Target: Academy #999

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
    domain: "Payments",
    status: "P0",
    title: "Webhook Handler Lacks Idempotency Guard",
    summary:
      "The checkout.session.completed webhook processes student enrollment and subscription credits without recording processed event IDs in an idempotency table.",
    impact: "When Stripe automatically retries webhook delivery upon network jitter, duplicate course credits and duplicate welcome emails are triggered.",
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
    domain: "Ops & Recovery",
    status: "P0",
    title: "Point-in-Time Recovery (PITR) Never Drill-Tested",
    summary:
      "Automated backups are enabled in Supabase settings, but WAL archiving and point-in-time branch restoration have never been tested against a staging database.",
    impact: "In the event of a botched migration or malicious table drop during Beta, estimated Recovery Time Objective (RTO) is undefined and data loss risk is high.",
    attackProof: "Observation: Staging environment has no automated restore script. Recovery runbook missing.",
    vulnerableCode: `# Current State: Default cloud dashboard toggle with no verified restore drill`,
    fixedCode: `# Tested Recovery Procedure:
supabase db dump --data-only > backup_test.sql
# Verified restore to isolated branch in 4 mins 12 secs with 0 data loss`,
    fixTime: "2.5 hours",
  },
  {
    id: "SEC-02",
    gate: "Privilege Escalation",
    domain: "Auth & RLS",
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
    domain: "Schema & Migrations",
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
    domain: "Ops & Recovery",
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
    domain: "Auth & RLS",
    status: "PASS",
    title: "JWT Token Refresh & Password Hashing",
    summary: "Bcrypt hash rounds and Supabase JWT refresh rotation interval are correctly configured.",
    impact: "No security issues identified.",
    fixTime: "0 mins",
  },
  {
    id: "DB-01",
    gate: "Foreign Keys",
    domain: "Schema & Migrations",
    status: "PASS",
    title: "Foreign Key Cascades & Strict Typing",
    summary: "All relational constraints, UUID validation, and deletion cascades are strictly modeled.",
    impact: "No security issues identified.",
    fixTime: "0 mins",
  },
  {
    id: "PAY-02",
    gate: "Price Validation",
    domain: "Payments",
    status: "PASS",
    title: "Server-Side Price ID Enforcement",
    summary: "Stripe Price IDs are mapped on the server; client cannot submit arbitrary billing amounts.",
    impact: "No security issues identified.",
    fixTime: "0 mins",
  },
];

const DOMAINS = ["All", "Auth & RLS", "Schema & Migrations", "Payments", "Ops & Recovery"];

export default function SampleAuditPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("RLS-01");

  const filteredFindings =
    selectedDomain === "All"
      ? FINDINGS
      : FINDINGS.filter((f) => f.domain === selectedDomain);

  const p0Count = FINDINGS.filter((f) => f.status === "P0").length;

  return (
    <div className="py-10 sm:py-16 bg-paper text-ink">
      <Container variant="wide">
        {/* Document Stamp Header */}
        <div className="border-b border-rule pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-[3px] bg-ink text-paper font-semibold">
                AUDIT ARTIFACT
              </span>
              <span className="font-mono text-xs text-ink-muted">
                DOC-ID: FMV-2026-SA09-SYNTHETIC
              </span>
            </div>
            <span className="font-mono text-xs text-ink-muted">
              Scope: 12-Gate Launch Readiness Review
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-[-0.03em] mb-3">
            Pre-Launch Technical Debt Audit — Sample Report
          </h1>
          <p className="text-base text-ink-muted max-w-3xl leading-relaxed">
            Prepared for <strong className="text-ink">EduPremium SaaS</strong> (Multi-Tenant B2B Academy Platform · React, TanStack, Supabase, Stripe). 
            This artifact demonstrates the exact diagnostic deliverable a founder receives before risking live users or ad spend.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-rule font-mono text-xs">
            <div>
              <span className="text-ink-muted block">AUDIT WINDOW</span>
              <span className="text-ink font-semibold">1 Week (3–5h review)</span>
            </div>
            <div>
              <span className="text-ink-muted block">CRITICAL RISKS (P0)</span>
              <span className="text-p0 font-semibold">{p0Count} Blockers</span>
            </div>
            <div>
              <span className="text-ink-muted block">FIX TIME TO LAUNCH</span>
              <span className="text-ink font-semibold">~6.0 Hours (2 Days)</span>
            </div>
            <div>
              <span className="text-ink-muted block">DELIVERED BY</span>
              <span className="text-ink font-semibold">FixMyVibe (Jaeil Lee)</span>
            </div>
          </div>
        </div>

        {/* OVERALL VERDICT SECTION */}
        <div className="border border-p0/40 bg-p0/[0.03] rounded-[6px] p-6 sm:p-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-p0 animate-pulse" />
              <h2 className="font-display text-2xl text-ink font-semibold">
                Overall Verdict: ⚠️ NO-GO for Public Launch As-Is
              </h2>
            </div>
            <span className="font-mono text-xs px-3 py-1 bg-p0 text-paper font-semibold rounded-[3px]">
              ACTION REQUIRED
            </span>
          </div>
          <p className="text-base leading-relaxed text-ink mb-6">
            <strong>The core workflow is well-architected, but three P0 isolation and billing vulnerabilities must be patched prior to public onboarding.</strong>{" "}
            Do not rebuild the codebase. All three P0s can be resolved in a <strong>48-hour stabilization pass (~6 engineering hours)</strong> without touching existing UI components.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-p0/20 font-mono text-xs">
            <div className="p-3 bg-paper rounded border border-rule">
              <span className="text-p0 font-bold block mb-1">P0 #1: RLS Leaks Cross-Tenant Data</span>
              <span className="text-ink-muted">UI hides buttons, but direct REST queries expose records across academies.</span>
            </div>
            <div className="p-3 bg-paper rounded border border-rule">
              <span className="text-p0 font-bold block mb-1">P0 #2: Stripe Webhook Replay Risk</span>
              <span className="text-ink-muted">No idempotency table; network retry grants duplicate course credits.</span>
            </div>
            <div className="p-3 bg-paper rounded border border-rule">
              <span className="text-p0 font-bold block mb-1">P0 #3: Untested PITR Disaster Recovery</span>
              <span className="text-ink-muted">No verified restore script if a migration corrupts production data.</span>
            </div>
          </div>
        </div>

        {/* DOMAIN FILTER TABS */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl text-ink font-normal">
            12-Gate Diagnostic Matrix
          </h2>

          <div className="flex flex-wrap gap-1 p-1 bg-rule/40 rounded-[5px] text-xs font-mono">
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1.5 rounded-[4px] transition-colors ${
                  selectedDomain === domain
                    ? "bg-ink text-paper font-semibold shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* FINDINGS ACCORDION / LIST */}
        <div className="border border-rule rounded-[6px] divide-y divide-rule mb-12 bg-paper">
          {filteredFindings.map((f) => {
            const isExpanded = expandedId === f.id;
            return (
              <div key={f.id} className="transition-colors">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : f.id)}
                  className="w-full text-left p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:bg-rule/20"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                        f.status === "P0"
                          ? "bg-p0 text-paper"
                          : f.status === "P1"
                          ? "bg-p1 text-paper"
                          : "bg-ok text-paper"
                      }`}
                    >
                      {f.status}
                    </span>
                    <span className="font-mono text-xs text-ink-muted hidden md:inline">
                      [{f.id}]
                    </span>
                    <span className="font-medium text-ink truncate text-sm sm:text-base">
                      {f.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-ink-muted shrink-0">
                    <span className="hidden sm:inline">{f.gate}</span>
                    <span>Fix: {f.fixTime}</span>
                    <span className="text-ink font-bold">{isExpanded ? "▲" : "▼"}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-rule/10 border-t border-rule text-sm space-y-4">
                    <div>
                      <h4 className="font-mono text-xs font-bold text-ink-muted uppercase mb-1">
                        Diagnosis & Failure Mode
                      </h4>
                      <p className="text-ink leading-relaxed">{f.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs font-bold text-p0 uppercase mb-1">
                        Business Impact
                      </h4>
                      <p className="text-ink leading-relaxed">{f.impact}</p>
                    </div>

                    {f.attackProof && (
                      <div>
                        <h4 className="font-mono text-xs font-bold text-ink-muted uppercase mb-1">
                          Verification Test Proof (Attacker Simulation)
                        </h4>
                        <pre className="p-3 bg-panel-dark text-panel-dark-muted font-mono text-xs rounded overflow-x-auto">
                          <code>{f.attackProof}</code>
                        </pre>
                      </div>
                    )}

                    {f.vulnerableCode && f.fixedCode && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                        <div>
                          <h4 className="font-mono text-xs font-bold text-p0 uppercase mb-1">
                            Before (Vulnerable / Defective)
                          </h4>
                          <pre className="p-3 bg-p0/10 border border-p0/30 text-ink font-mono text-xs rounded overflow-x-auto">
                            <code>{f.vulnerableCode}</code>
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs font-bold text-ok uppercase mb-1">
                            After (Secured Patch — Ready to Apply)
                          </h4>
                          <pre className="p-3 bg-ok/10 border border-ok/30 text-ink font-mono text-xs rounded overflow-x-auto">
                            <code>{f.fixedCode}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 48-HOUR RECOVERY PATH & WHAT CAN WAIT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Box 1: 48-Hour Fix Plan */}
          <div className="border border-rule rounded-[6px] p-6 bg-paper">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-ok font-bold uppercase tracking-wider">
                PHASE 1 REMEDY
              </span>
            </div>
            <h3 className="font-display text-xl text-ink font-normal mb-3">
              48-Hour P0 Remediation Plan
            </h3>
            <p className="text-xs text-ink-muted mb-4 leading-relaxed">
              Applying these 3 targeted patches flips the verdict from <strong>NO-GO</strong> to <strong>GO</strong> for Closed Beta.
            </p>

            <ol className="space-y-3 font-mono text-xs text-ink">
              <li className="p-3 border border-rule rounded flex items-start gap-3">
                <span className="text-p0 font-bold">1</span>
                <div>
                  <strong className="text-ink block">Apply Tenant Isolation RLS Policies</strong>
                  <span className="text-ink-muted">Replace open policies with app_metadata tenant check (1.5h).</span>
                </div>
              </li>
              <li className="p-3 border border-rule rounded flex items-start gap-3">
                <span className="text-p0 font-bold">2</span>
                <div>
                  <strong className="text-ink block">Create processed_events Webhook Table</strong>
                  <span className="text-ink-muted">Make Stripe fulfillment idempotent against retries (2.0h).</span>
                </div>
              </li>
              <li className="p-3 border border-rule rounded flex items-start gap-3">
                <span className="text-p0 font-bold">3</span>
                <div>
                  <strong className="text-ink block">Execute Staging PITR Recovery Drill</strong>
                  <span className="text-ink-muted">Verify branch restore runbook and record 4-min RTO benchmark (2.5h).</span>
                </div>
              </li>
            </ol>
          </div>

          {/* Box 2: Founder Decision Summary */}
          <div className="border border-rule rounded-[6px] p-6 bg-paper">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-ink-muted font-bold uppercase tracking-wider">
                FOUNDER SUMMARY
              </span>
            </div>
            <h3 className="font-display text-xl text-ink font-normal mb-3">
              About Your Current Codebase
            </h3>
            <div className="space-y-4 text-xs text-ink leading-relaxed">
              <div>
                <strong className="text-ink block mb-0.5">What your code says:</strong>
                <p className="text-ink-muted">
                  The frontend UX and database schema show disciplined product thinking. The defects found are standard boundary oversights typical of fast AI-assisted prototyping, not fundamental design flaws.
                </p>
              </div>
              <div>
                <strong className="text-ink block mb-0.5">What can wait (Deferred):</strong>
                <p className="text-ink-muted">
                  Full GraphQL migration, microservice decomposition, and secondary audit logging can wait until &gt;$10k MRR. Do not spend budget on them today.
                </p>
              </div>
              <div className="pt-2 border-t border-rule">
                <strong className="text-ink block mb-0.5">The Recommendation:</strong>
                <p className="text-ink">
                  Proceed with the 2-day patch sprint. Launch Closed Beta immediately upon RLS verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FOOTER */}
        <div className="border-t border-rule pt-10 text-center flex flex-col items-center">
          <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal mb-3">
            Want this exact review before your launch?
          </h3>
          <p className="text-base text-ink-muted max-w-xl mb-6">
            Launch Gate Audit is <strong className="text-ink">$1,200 fixed (1 week)</strong>. I verify the twelve gates myself and you receive a prioritized risk table and a two-week action plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton href="/contact">
              Start a Launch Gate Review
            </PrimaryButton>
            <Link
              href="/"
              className="text-sm font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink px-4 py-3"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
