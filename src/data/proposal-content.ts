export type GateEntry = { name: string; failureMode: string; auditQuestion: string };
export type VerdictHeading = { heading: string; body: string };
export type MapLayer = { name: string };
export type MapBoundary = { id: string; between: string; auditQuestion: string };

// business/fixmyvibe/service-packages.md § Homepage / Services Page Translation
export const hero = {
  headline: "Your developer says it’s done. You have no way to check.",
  subheadline:
    "An independent review of your AI-built or outsourced app — before the next milestone payment, the first customers, or the ad spend. Plain English. Three pages. One decision.",
  primaryCta: { label: "Start a review", href: "/contact" },
  secondaryCta: { label: "Read a sample report", href: "/sample-audit" },
} as const;

// business/fixmyvibe/ai-mvp-platform-launch-gate.md § Platform Gates.
// One failure mode and one audit question per gate, chosen as the most
// legible to a non-technical founder. Order is the document's order.
export const gates: GateEntry[] = [
  {
    name: "Supabase",
    failureMode: "An authenticated user can read or write another user's rows.",
    auditQuestion: "Can user A list, read, update, or delete user B's data?",
  },
  {
    name: "Firebase",
    failureMode: "Security rules allow reads or writes the product never intended.",
    auditQuestion: "Are rules tested against a second signed-in user, not just the owner?",
  },
  {
    name: "Cloudflare",
    failureMode: "Edge configuration exposes origin or bypasses access controls.",
    auditQuestion: "Can the origin be reached directly, around the edge?",
  },
  {
    name: "Hosting",
    failureMode: "Preview environments carry production secrets.",
    auditQuestion: "Are environment values separated between preview and production?",
  },
  {
    name: "Stripe and billing",
    failureMode: "The payment webhook is not idempotent, so a retry charges or grants twice.",
    auditQuestion: "Does replaying the same webhook change the outcome?",
  },
  {
    name: "Auth boundary",
    failureMode: "Ownership is checked in the interface but not on the server.",
    auditQuestion: "Are privileged operations enforced server-side?",
  },
  {
    name: "Monitoring",
    failureMode: "A failure in production leaves no trace anyone can find.",
    auditQuestion: "Can failures be observed after launch?",
  },
];

// business/fixmyvibe/founder-summary-1page.md — the real headings of the artifact.
export const verdict = {
  title: "Founder Summary",
  sampleNotice: "Sample — written against a fictional product, not a client's app.",
  sections: [
    { heading: "The decision", body: "Continue, fix first, or stop — in one line, with the reason." },
    { heading: "What I’d fix before the next milestone", body: "The items that change the decision. Never more than three." },
    { heading: "What can wait", body: "Named explicitly, so the list you are given is the whole list." },
    { heading: "About your current developer", body: "What the code says about how the work was done." },
    { heading: "What I looked at", body: "The scope of the review, so you know what it does not cover." },
    { heading: "If you want the detail", body: "Where the full findings live, for the person who will fix them." },
  ],
} as const;

// business/fixmyvibe/ai-mvp-platform-launch-gate.md § Deliverables and § Out of Scope by Default
export const scope = {
  duration: "One week.",
  // The figure is published as of 2026-08-26. Both competitors on this buyer's
  // shortlist show a price, the number has been fixed since 2026-08-17, and a
  // buyer who is paying for predictability should not have to ask what it costs.
  priceNote: "$1,200 fixed.",
  included: [
    "Executive launch-readiness summary",
    "Platform map: frontend, backend, DB, auth, storage, billing, hosting, edge, observability",
    "Trust boundary table: public and browser-visible versus server-only versus privileged",
    "Data boundary test notes: cross-user access, storage policies, tenant isolation",
    "Money boundary test notes: webhooks, idempotency, billing role mutation",
    "Risk table: severity, likelihood, evidence, suggested fix",
    "Quick wins: one to three day fixes",
    "Next sprint plan: 7, 14, or 30-day options",
  ],
  excluded: [
    "Full rewrite",
    "Penetration test certification",
    "Legal or compliance certification",
    "Guaranteed security claim",
    "Production deploy without explicit approval",
  ],
} as const;

// business/fixmyvibe/sample-audit-report-template.md § 3 System Map.
// Layers are the document's; the boundary list is its general form — the
// source document still describes one specific sample app, and generalizing
// its vault table is scope not yet done.
export const systemMap = {
  layers: [
    { name: "The tool that generated it" },
    { name: "Browser UI" },
    { name: "Frontend and route handlers" },
    { name: "Auth and session" },
    { name: "API routes and server actions" },
    { name: "Database" },
    { name: "Third-party providers" },
  ],
  boundaries: [
    { id: "1", between: "Auth → user data", auditQuestion: "Can one user reach another user's records?" },
    { id: "2", between: "API route → database", auditQuestion: "Are ownership checks enforced server-side?" },
    { id: "3", between: "Third-party token → storage", auditQuestion: "Are tokens stored and scoped safely?" },
    { id: "4", between: "Client → privileged operation", auditQuestion: "Can the browser do what only the server should?" },
    { id: "5", between: "Deployment → runtime logs", auditQuestion: "Can failures be observed after launch?" },
  ],
  argument: "One tool generated all of it. The risk is not inside any box — it is where the boxes meet.",
} as const;

// business/fixmyvibe/service-packages.md § Homepage / Services Page Translation
export const whyMe = {
  body: "Six years of engineering, an app of my own shipped to the App Store, and front-end lead on a public-sector platform. I publish the method before anyone pays for it — the checklist I work from, the way I read a stack, and the writing behind both are open, so you can judge the work before you commission it.",
  ctaLabel: "Get an independent review",
  links: [
    { label: "The method, in public", href: "https://github.com/orangec-at/vibe-hardening" },
    { label: "Writing", href: "/posts" },
    { label: "About", href: "/about" },
  ],
} as const;
