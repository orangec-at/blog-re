# Proposal Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page as a six-section proposal typeset like an audit report, and retire the borrowed Stripe/Zapier visual system on the pages it touches.

**Architecture:** One reusable `ProposalSection` wrapper renders six numbered sections on `src/app/page.tsx`. Four content components fill them: `ScopeTable`, `VerdictSheet`, `GateList`, `SystemMapPanel`. New semantic color tokens are added to the Tailwind `@theme` block alongside the existing `zapier-*` names; the home page and shared chrome move to them and other pages are migrated last. Dead components from an abandoned earlier redesign are deleted first so nothing is built on top of them.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4 (`@theme` in `src/app/globals.css`), Vitest 4 + @testing-library/react (jsdom), pnpm. No new dependencies are added by this plan.

**Spec:** `docs/plans/2026-08-26-proposal-home-redesign-design.md`

**Branch:** `design/proposal-home` (already created off `master`, holds the spec commit)

**Prerequisite — `fix/hero-copy-to-canon` must land first.** That branch (`df4a556`)
puts the canonical hero copy on the page and on both opengraph cards. This branch was
cut from `master` and does not contain it, so the hero copy Task 4 quotes and Task 5's
test asserts are not yet in this tree. Before Task 1, either merge that branch to
`master` and rebase this one onto it, or merge it into this branch directly:

```bash
git checkout design/proposal-home
git merge --no-ff fix/hero-copy-to-canon
pnpm check   # expect PASS
```

Verify it took: `grep -c "no way to check" src/app/page.tsx src/app/opengraph-image.tsx`
should report 1 for each. If it reports 0, the merge did not happen and every hero
assertion in this plan will fail for the wrong reason.

Note that Task 5 replaces `src/app/page.tsx` wholesale, so the hero branch's edit to
that one file is superseded. Its edits to the two opengraph routes are not, and they
are the reason the merge cannot simply be skipped.

## Global Constraints

Every task's requirements implicitly include this section.

- **No gate count anywhere on the page.** Not "seven", not "twelve", not "all". The pricing canon sells twelve, the gate document defines seven, two of those seven are alternatives. Write "the gates that apply to your stack".
- **No price figure.** `$1,200` must not appear. Section 05 states the price is fixed and quoted in the first reply.
- **No "downloaded to a terminal" layer** in the system map. It was a guess with a question mark and no source confirms it.
- **No proof claim the site cannot back.** The strings `case stud`, `client result`, and `trusted by` must not render anywhere on the home page. There is an existing test for this and it stays.
- **The sample artifact carries its sample label.** `VerdictSheet` renders a visible sample notice. This is a standing approval boundary, not a style choice.
- **The hero is never animated.** It is the LCP element.
- **`prefers-reduced-motion: reduce` is honored** by every animated element.
- **No animation library.** CSS transitions plus one `IntersectionObserver`. Do not add `framer-motion`, `motion`, `gsap`, or similar.
- **Pages other than `/` get tokens only.** No structural or copy change to `/services`, `/about`, `/posts`, `/resources`, `/domains`.
- **Copy comes from the vault, not from you.** Every user-facing sentence in this plan is quoted from a canonical vault document. Do not improve, shorten, or rewrite it.
- **Definition of done for every task:** `pnpm check` passes (content check, lint, full Vitest suite) and the working tree is committed.

**Mid-plan state:** the branch is not deployable between Task 4 and Task 7 — the home page is missing sections while they are being built one at a time. `master` continues to serve production. This is expected; do not add placeholder content to fill the gap.

---

## File Structure

**Deleted**

| Path | Why |
|---|---|
| `src/components/home-redesign/` | Five components from an abandoned redesign. Nothing renders them. |
| `src/components/marketing/` | Four cards used only by `home-redesign/`. Dead once it goes. |
| `src/data/home-redesign-content.ts` | Feeds only `home-redesign/home-hero.tsx`. |
| `src/data/__tests__/redesign-content.test.ts` | Tests the file above. |

**Created**

| Path | Responsibility |
|---|---|
| `src/components/proposal/proposal-section.tsx` | Numbered section wrapper. Number, heading, body slot. |
| `src/components/proposal/scope-table.tsx` | Included / not included lists for section 05. |
| `src/components/proposal/verdict-sheet.tsx` | The one-page founder summary typeset as an artifact, with sample label. |
| `src/components/proposal/gate-list.tsx` | One row per gate: name, failure mode, audit question. |
| `src/components/proposal/system-map-panel.tsx` | The dark drawing: layers and boundaries. |
| `src/data/proposal-content.ts` | All six sections' copy, quoted from the vault. One source, no inline strings in components. |

**Modified**

| Path | Change |
|---|---|
| `src/app/globals.css` | Add semantic tokens to `@theme`. Remove the decorative `body::before` gradient. |
| `src/app/page.tsx` | Rewritten as six `ProposalSection`s. |
| `src/app/__tests__/home-page.test.tsx` | Rewritten for the new structure; honesty assertions kept. |
| `src/components/layout/header.tsx`, `footer.tsx` | Moved to the new tokens; footer gains the document identifier. |
| `DESIGN.md` | Rewritten. |
| `AGENTS.md`, `CLAUDE.md` | Design-system references updated. |
| `scripts/check-design-ownership.mjs` | `requiredOwners` table updated to the components that exist. |
| `docs/design-system/ui-pattern-inventory.md` | Deleted patterns removed, new ones added. |

---

## Task 1: Delete the abandoned redesign cluster

Nothing is built on top of dead code. This goes first so later tasks cannot accidentally reuse it.

**Files:**
- Delete: `src/components/home-redesign/` (directory, including `__tests__/`)
- Delete: `src/components/marketing/` (directory, including `__tests__/`)
- Delete: `src/data/home-redesign-content.ts`
- Delete: `src/data/__tests__/redesign-content.test.ts`
- Modify: `scripts/check-design-ownership.mjs`
- Modify: `docs/design-system/ui-pattern-inventory.md`

**Interfaces:**
- Consumes: nothing
- Produces: nothing. This task only removes.

- [ ] **Step 1: Confirm nothing outside the cluster imports it**

Run:
```bash
cd ~/workspace/personal/blog
grep -rn "home-redesign\|ServicePackageCard\|ProofArtifactCard\|PainSignalCard\|ProofMetricCard" src --include="*.ts" --include="*.tsx"
```
Expected: every hit is inside `src/components/home-redesign/`, `src/components/marketing/`, or `src/data/__tests__/redesign-content.test.ts`. If a hit appears anywhere else, stop and report it — the deletion set is wrong.

- [ ] **Step 2: Delete**

```bash
rm -rf src/components/home-redesign src/components/marketing
rm -f src/data/home-redesign-content.ts src/data/__tests__/redesign-content.test.ts
```

- [ ] **Step 3: Run the suite to see what breaks**

Run: `pnpm vitest run`
Expected: PASS. If any test fails, it referenced deleted code and belonged to the cluster — delete that test file too, then re-run.

- [ ] **Step 4: Update the ownership script**

`scripts/check-design-ownership.mjs` hard-codes the deleted files in `requiredOwners`. Replace that array with an empty one and a comment saying why:

```js
// The four marketing cards this table used to guard were only ever rendered by
// src/components/home-redesign/, which the proposal-home redesign deleted. The
// table is empty rather than removed so the next reusable pattern has a place
// to register itself. See docs/plans/2026-08-26-proposal-home-redesign-design.md.
const requiredOwners = [];
```

- [ ] **Step 5: Prune the pattern inventory**

In `docs/design-system/ui-pattern-inventory.md`, delete every entry whose owner or consumer path is under `src/components/home-redesign/` or `src/components/marketing/`. Leave the rest untouched.

- [ ] **Step 6: Verify all three gates**

Run:
```bash
pnpm design:ownership && pnpm check && pnpm build
```
Expected: all three succeed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: delete the abandoned home-redesign cluster

Five components under home-redesign/ and the four marketing cards that
only they rendered. Nothing on the site has referenced any of it since
the home page was cut back in August, and the design-ownership script
was still guarding owner/consumer pairs where the consumer no longer
loaded.

Removing it before the proposal home is built so nothing new is written
against components that were already abandoned once."
```

---

## Task 2: Semantic tokens and the rewritten design system

**Files:**
- Modify: `src/app/globals.css`
- Modify: `DESIGN.md` (full rewrite)
- Modify: `AGENTS.md`, `CLAUDE.md`

**Interfaces:**
- Produces: Tailwind utility classes `bg-paper`, `text-ink`, `text-ink-muted`, `border-rule`, `bg-panel-dark`, `text-panel-dark-muted`, `text-p0`, `text-p1`, `text-ok`, `text-deferred` — used by every later task.

- [ ] **Step 1: Add the tokens**

In `src/app/globals.css`, inside the existing `@theme { … }` block, append below the current `zapier-*` entries:

```css
  /* Proposal system — see DESIGN.md. Semantic names: the value's job, not a
     company's brand. The zapier-* names above hold another system's values and
     are deprecated; pages migrate off them as they are touched. */
  --color-paper: #fdfcfa;
  --color-ink: #16130f;
  --color-ink-muted: #5c564e;
  --color-rule: #e0dbd2;
  --color-panel-dark: #16130f;
  --color-panel-dark-muted: #a8a099;
  --color-p0: #b3261e;
  --color-p1: #9a6700;
  --color-ok: #1a6c37;
  --color-deferred: #6b6259;
```

- [ ] **Step 2: Remove the decorative gradient**

`body::before` paints a pink radial glow and a diagonal band across every page. It is the loudest thing on the site and it says nothing. Delete the whole rule:

```css
body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: "";
  background:
    radial-gradient(circle at 82% 8%, rgba(249, 107, 238, 0.14), transparent 26rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0) 0 52%, rgba(244, 247, 255, 0.78) 52% 72%, rgba(255, 255, 255, 0) 72%);
}
```

- [ ] **Step 3: Point the page ground at paper**

In the same file, change the `html, body` rule's background and text colors:

```css
  background-color: var(--color-paper);
  color: var(--color-ink);
```

- [ ] **Step 4: Rewrite DESIGN.md**

Replace the file entirely. The current version's premise — "should feel like Stripe-style advisory software" — is the cause the spec identifies, so nothing in it is preserved. The new file states, in this order:

1. **Overview.** The page is typeset like an audit report because the product is an audit report. It must not read as a SaaS marketing template, and it must not be aimed at any other company's site.
2. **Color.** The four semantic roles (`ink`, `ink-muted`, `paper`, `rule`) and the four verdict colors (`p0`, `p1`, `ok`, `deferred`). One rule stated plainly: **colour on this site means a verdict.** Links and buttons are ink. Do not introduce a brand accent.
3. **Type.** `--font-display` (Newsreader) for headings, `--font-sans` (Source Sans 3) for body, monospace for the map, gate labels, and risk rows. Serif says document; mono says measurement.
4. **Document chrome.** Section numbers `01`–`06`, hairline `rule` dividers, a document identifier and revision date in the footer.
5. **The dark panel.** `panel-dark` is the only dark surface and it is reserved for the system map. Not for page chrome, not for CTAs.
6. **Component contracts** for `ProposalSection`, `SystemMapPanel`, `GateList`, `VerdictSheet`, `ScopeTable` — each with its required content order and its prohibitions. Write these as the components are built; at this step, write the five headings and the contract for `ProposalSection` only, and note that the rest are filled in by Tasks 5–8.
7. **Deprecated.** The `zapier-*` tokens, named as values from another company's system, with the note that pages migrate off them when touched for other reasons.
8. **Do's and Don'ts**, carrying forward these rules from the old file because they are still right: read this file before changing UI; use token roles rather than arbitrary colors; do not leave large empty panel areas; do not create cards that only look balanced because they have a fixed height.

- [ ] **Step 5: Update the two agent-facing files**

In `AGENTS.md` and `CLAUDE.md`, find every sentence describing the design system as Stripe-derived or naming the purple as the primary interaction color, and replace it with a one-line pointer to `DESIGN.md` plus the single rule that matters most: colour means a verdict.

- [ ] **Step 6: Verify**

Run: `pnpm check && pnpm build`
Expected: PASS. Nothing consumes the new tokens yet, so no visual change is expected except the removed gradient and the paper ground.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add the proposal token set and rewrite the design system

The old DESIGN.md aimed the site at Stripe and the Tailwind tokens
carrying Stripe's palette were named zapier-*. Aiming a design at another
company's site is what produced a page that reads as a template, so the
premise goes rather than the palette alone.

New tokens are semantic: what the value is for, not whose brand it came
from. The verdict colours are the only chromatic ones, because on this
site colour appearing at all should mean a judgement was made.

Also removes the fixed pink radial gradient behind every page. It was the
loudest element on the site and it said nothing."
```

---

## Task 3: ProposalSection

**Files:**
- Create: `src/components/proposal/proposal-section.tsx`
- Create: `src/components/proposal/__tests__/proposal-section.test.tsx`

**Interfaces:**
- Consumes: `Container` from `@/components/layout/container`
- Produces:
```ts
type ProposalSectionProps = {
  number: string;      // "01" … "06"
  title: string;
  children: React.ReactNode;
  className?: string;
};
export function ProposalSection(props: ProposalSectionProps): JSX.Element
```
The section renders `<section>` with `aria-labelledby`, an `<h2>` carrying `title`, and the number as decorative text excluded from the accessible name.

- [ ] **Step 1: Write the failing test**

Create `src/components/proposal/__tests__/proposal-section.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProposalSection } from "@/components/proposal/proposal-section";

describe("ProposalSection", () => {
  it("names the section by its title, not by its number", () => {
    render(
      <ProposalSection number="02" title="What you actually built">
        <p>body</p>
      </ProposalSection>,
    );

    // The number is document furniture. If it lands in the accessible name,
    // screen reader users hear "oh two what you actually built" for every section.
    expect(screen.getByRole("region", { name: /^What you actually built$/i })).toBeVisible();
  });

  it("shows the number and renders its children", () => {
    render(
      <ProposalSection number="02" title="What you actually built">
        <p>body</p>
      </ProposalSection>,
    );

    expect(screen.getByText("02")).toBeVisible();
    expect(screen.getByText("body")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm vitest run src/components/proposal/__tests__/proposal-section.test.tsx`
Expected: FAIL — cannot resolve `@/components/proposal/proposal-section`.

- [ ] **Step 3: Write the minimal implementation**

Create `src/components/proposal/proposal-section.tsx`:

```tsx
import { Container } from "@/components/layout/container";

type ProposalSectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function ProposalSection({ number, title, children, className = "" }: ProposalSectionProps) {
  const headingId = `section-${number}`;

  return (
    <section aria-labelledby={headingId} className={`border-t border-rule py-16 sm:py-24 ${className}`}>
      <Container variant="wide">
        <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
          {/* The number sits in the margin like a report's section mark. aria-hidden
              keeps it out of the heading's accessible name. */}
          <p aria-hidden="true" className="font-mono text-sm text-ink-muted">
            {number}
          </p>

          <div className="flex flex-col gap-6">
            <h2 id={headingId} className="font-display text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">
              {title}
            </h2>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm vitest run src/components/proposal/__tests__/proposal-section.test.tsx`
Expected: PASS, 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/proposal
git commit -m "feat: add ProposalSection, the numbered section wrapper

Six sections share one shape: a number in the margin, a heading, a body
slot. The number is aria-hidden so the accessible name is the title alone
rather than 'oh two what you actually built'."
```

---

## Task 4: Proposal content module

All six sections' copy in one file, quoted from the vault. Components stay free of inline strings so a copy change is one file, and so the next reader can see at a glance which sentences are canonical.

**Files:**
- Create: `src/data/proposal-content.ts`
- Create: `src/data/__tests__/proposal-content.test.ts`

**Interfaces:**
- Produces:
```ts
export type GateEntry = { name: string; failureMode: string; auditQuestion: string };
export type VerdictHeading = { heading: string; body: string };
export type MapLayer = { name: string };
export type MapBoundary = { id: string; between: string; auditQuestion: string };

export const hero: { headline: string; subheadline: string; primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string } };
export const gates: GateEntry[];
export const verdict: { title: string; sampleNotice: string; sections: VerdictHeading[] };
export const scope: { duration: string; priceNote: string; included: string[]; excluded: string[] };
export const systemMap: { layers: MapLayer[]; boundaries: MapBoundary[]; argument: string };
export const whyMe: { body: string; links: { label: string; href: string }[] };
```

- [ ] **Step 1: Write the failing test**

Create `src/data/__tests__/proposal-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { gates, scope, systemMap, verdict } from "@/data/proposal-content";

describe("proposal content", () => {
  it("never states a gate count", () => {
    // The pricing canon sells twelve gates, the gate document defines seven, and
    // two of those are alternatives. For a service that checks whether other
    // people's claims are true, an unverified number here is the worst error
    // available. See docs/plans/2026-08-26-proposal-home-redesign-design.md.
    const text = JSON.stringify({ gates, scope, systemMap, verdict }).toLowerCase();
    for (const word of ["twelve", "seven", "12 gate", "7 gate"]) {
      expect(text).not.toContain(word);
    }
  });

  it("never states a price figure", () => {
    expect(JSON.stringify(scope)).not.toMatch(/\$\s?\d/);
  });

  it("gives every gate a failure mode and an audit question", () => {
    expect(gates.length).toBeGreaterThan(0);
    for (const gate of gates) {
      expect(gate.failureMode.length).toBeGreaterThan(0);
      expect(gate.auditQuestion.trim().endsWith("?")).toBe(true);
    }
  });

  it("keeps the terminal step out of the system map", () => {
    // Raised as a guess with a question mark attached; no source confirms it.
    const layers = systemMap.layers.map((layer) => layer.name.toLowerCase()).join(" ");
    expect(layers).not.toContain("terminal");
  });

  it("carries a sample notice on the verdict artifact", () => {
    expect(verdict.sampleNotice.toLowerCase()).toContain("sample");
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm vitest run src/data/__tests__/proposal-content.test.ts`
Expected: FAIL — cannot resolve `@/data/proposal-content`.

- [ ] **Step 3: Write the content module**

Create `src/data/proposal-content.ts`. Every string below is quoted from the vault document named in its comment. Do not reword.

```ts
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
  secondaryCta: { label: "Read a sample report", href: "/posts/ai-mvp-technical-debt-audit-sample-report" },
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
  priceNote: "Fixed price, quoted in the first reply.",
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
// Layers are the document's; the boundary list is its general form.
// See Task 7 — the vault table is generalized before this section is built.
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

export const whyMe = {
  body: "I publish the method before anyone pays for it. The checklist I work from, the way I read a stack, and the writing behind both are open — so you can judge the work before you commission it.",
  links: [
    { label: "The method, in public", href: "https://github.com/orangec-at/vibe-hardening" },
    { label: "Writing", href: "/posts" },
    { label: "About", href: "/about" },
  ],
} as const;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm vitest run src/data/__tests__/proposal-content.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/proposal-content.ts src/data/__tests__/proposal-content.test.ts
git commit -m "feat: add the proposal content module

Every user-facing sentence on the new home page, quoted from the vault
document that owns it, in one file. Components take content as data so a
copy change is one file and so the next reader can see which sentences
are canonical rather than invented.

The tests pin the three things the design refuses to say: a gate count,
a price figure, and a terminal step in the stack drawing."
```

---

## Task 5: ScopeTable and the text-only sections (01, 05, 06)

The home page is rewritten here. Sections 02, 03, and 04 arrive in later tasks; the page is intentionally short until then.

**Files:**
- Create: `src/components/proposal/scope-table.tsx`
- Create: `src/components/proposal/__tests__/scope-table.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`

**Interfaces:**
- Consumes: `ProposalSection` (Task 3); `hero`, `scope`, `whyMe` from `@/data/proposal-content` (Task 4); `PrimaryButton`, `SecondaryButton` from `@/components/ui/button`
- Produces:
```ts
type ScopeTableProps = { included: readonly string[]; excluded: readonly string[] };
export function ScopeTable(props: ScopeTableProps): JSX.Element
```

- [ ] **Step 1: Write the failing ScopeTable test**

Create `src/components/proposal/__tests__/scope-table.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScopeTable } from "@/components/proposal/scope-table";

describe("ScopeTable", () => {
  it("labels both lists, so the exclusions cannot be mistaken for inclusions", () => {
    render(<ScopeTable included={["Risk table"]} excluded={["Full rewrite"]} />);

    expect(screen.getByRole("heading", { name: /what this includes/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /what this does not include/i })).toBeVisible();
    expect(screen.getByText("Risk table")).toBeVisible();
    expect(screen.getByText("Full rewrite")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm vitest run src/components/proposal/__tests__/scope-table.test.tsx`
Expected: FAIL — cannot resolve `@/components/proposal/scope-table`.

- [ ] **Step 3: Implement ScopeTable**

Create `src/components/proposal/scope-table.tsx`:

```tsx
type ScopeTableProps = {
  included: readonly string[];
  excluded: readonly string[];
};

// ponytail: two lists, not a table element. Nothing here is tabular data — the
// exclusions have no matching column, they are their own list.
export function ScopeTable({ included, excluded }: ScopeTableProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">What this includes</h3>
        <ul className="flex flex-col gap-2">
          {included.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-ink">{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">What this does not include</h3>
        <ul className="flex flex-col gap-2">
          {excluded.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-deferred">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm vitest run src/components/proposal/__tests__/scope-table.test.tsx`
Expected: PASS.

- [ ] **Step 5: Rewrite the home page test**

Replace `src/app/__tests__/home-page.test.tsx` entirely:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("opens with the canonical hero", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^Your developer says it’s done\. You have no way to check\.$/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/before the next milestone payment, the first customers, or the ad spend/i),
    ).toBeVisible();
  });

  it("states the scope with its exclusions", () => {
    render(<Home />);

    expect(screen.getByRole("region", { name: /^Scope$/i })).toBeVisible();
    expect(screen.getByText("Full rewrite")).toBeVisible();
  });

  it("makes no proof claim the site cannot back yet", () => {
    render(<Home />);

    // Carried over from the previous home. There are no customers, so nothing
    // on this page may imply delivered client work until there is a receipt.
    expect(screen.queryByText(/case stud/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/client result/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/trusted by/i)).not.toBeInTheDocument();
  });

  it("shows no price figure", () => {
    const { container } = render(<Home />);

    // Publishing the number is not an approved action; it is quoted in
    // conversation only.
    expect(container.textContent).not.toMatch(/\$\s?\d/);
  });
});
```

- [ ] **Step 6: Run it to make sure it fails**

Run: `pnpm vitest run src/app/__tests__/home-page.test.tsx`
Expected: FAIL — the current page has no region named "Scope".

- [ ] **Step 7: Rewrite the home page**

Replace `src/app/page.tsx` entirely:

```tsx
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ProposalSection } from "@/components/proposal/proposal-section";
import { ScopeTable } from "@/components/proposal/scope-table";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { hero, scope, whyMe } from "@/data/proposal-content";

export const metadata: Metadata = {
  title: "Home",
  description: hero.subheadline,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div data-testid="home-page">
      <section aria-labelledby="section-01" className="py-16 sm:py-24">
        <Container variant="wide">
          <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
            <p aria-hidden="true" className="font-mono text-sm text-ink-muted">01</p>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                {/* text-balance keeps the second sentence off a one-word line — without
                    it 1280px orphans "check." by itself under a nearly full first line. */}
                <h1
                  id="section-01"
                  className="max-w-3xl text-balance font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl"
                >
                  {hero.headline}
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {hero.subheadline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PrimaryButton>
                <SecondaryButton href={hero.secondaryCta.href}>{hero.secondaryCta.label}</SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProposalSection number="05" title="Scope">
        <p className="text-base leading-relaxed text-ink-muted">
          {scope.duration} {scope.priceNote}
        </p>
        <ScopeTable included={scope.included} excluded={scope.excluded} />
      </ProposalSection>

      <ProposalSection number="06" title="Why me">
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">{whyMe.body}</p>
        <ul className="flex flex-wrap gap-6">
          {whyMe.links.map((link) => (
            <li key={link.href}>
              <a className="text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <PrimaryButton href={hero.primaryCta.href}>Get an independent review</PrimaryButton>
        </div>
      </ProposalSection>
    </div>
  );
}
```

- [ ] **Step 8: Run the suite**

Run: `pnpm check`
Expected: PASS. The home page now renders sections 01, 05, 06.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: rebuild the home page as a proposal, text sections first

Sections 01, 05, and 06 — the ones whose content was already settled.
The hero keeps the canonical copy; scope leads with what the review does
not include, because in proposal grammar the exclusions are what build
trust; why-me stands on published method rather than testimonials there
is no basis for.

02, 03, and 04 follow in their own commits. The page is short until then
rather than padded."
```

---

## Task 6: VerdictSheet and section 04

The strongest section: the artifact typeset rather than described.

**Files:**
- Create: `src/components/proposal/verdict-sheet.tsx`
- Create: `src/components/proposal/__tests__/verdict-sheet.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`

**Interfaces:**
- Consumes: `verdict` from `@/data/proposal-content`
- Produces:
```ts
type VerdictSheetProps = {
  title: string;
  sampleNotice: string;
  sections: readonly { heading: string; body: string }[];
};
export function VerdictSheet(props: VerdictSheetProps): JSX.Element
```

- [ ] **Step 1: Write the failing test**

Create `src/components/proposal/__tests__/verdict-sheet.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VerdictSheet } from "@/components/proposal/verdict-sheet";

const sections = [
  { heading: "The decision", body: "Continue, fix first, or stop." },
  { heading: "What can wait", body: "Named explicitly." },
];

describe("VerdictSheet", () => {
  it("labels itself a sample", () => {
    // Standing approval boundary: a synthetic artifact that is not marked reads
    // as a real client's findings.
    render(<VerdictSheet title="Founder Summary" sampleNotice="Sample — written against a fictional product." sections={sections} />);

    expect(screen.getByText(/^Sample —/)).toBeVisible();
  });

  it("renders each heading of the real artifact in order", () => {
    render(<VerdictSheet title="Founder Summary" sampleNotice="Sample — written against a fictional product." sections={sections} />);

    const headings = screen.getAllByRole("heading", { level: 4 }).map((node) => node.textContent);
    expect(headings).toEqual(["The decision", "What can wait"]);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm vitest run src/components/proposal/__tests__/verdict-sheet.test.tsx`
Expected: FAIL — cannot resolve the module.

- [ ] **Step 3: Implement VerdictSheet**

Create `src/components/proposal/verdict-sheet.tsx`:

```tsx
type VerdictSheetProps = {
  title: string;
  sampleNotice: string;
  sections: readonly { heading: string; body: string }[];
};

// The artifact shown rather than described. This is what stands in for
// testimonials until there are customers: seeing what arrives is a stronger
// claim than a stranger saying it was good.
export function VerdictSheet({ title, sampleNotice, sections }: VerdictSheetProps) {
  return (
    <figure className="m-0 max-w-2xl border border-rule bg-paper">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule px-6 py-4">
        <h3 className="font-display text-lg font-normal text-ink">{title}</h3>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-p1">{sampleNotice}</p>
      </div>

      <div className="flex flex-col gap-6 px-6 py-6">
        {sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-1">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{section.heading}</h4>
            <p className="text-sm leading-relaxed text-ink">{section.body}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm vitest run src/components/proposal/__tests__/verdict-sheet.test.tsx`
Expected: PASS.

- [ ] **Step 5: Add the home page assertion**

In `src/app/__tests__/home-page.test.tsx`, add inside the `describe`:

```tsx
  it("shows the artifact the buyer receives, marked as a sample", () => {
    render(<Home />);

    expect(screen.getByRole("region", { name: /^What you get$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 4, name: /^The decision$/i })).toBeVisible();
    expect(screen.getByText(/^Sample —/)).toBeVisible();
  });
```

- [ ] **Step 6: Run it to make sure it fails**

Run: `pnpm vitest run src/app/__tests__/home-page.test.tsx`
Expected: FAIL — no region named "What you get".

- [ ] **Step 7: Add section 04 to the page**

In `src/app/page.tsx`, import `VerdictSheet` and `verdict`, then insert this block immediately above the `05` section:

```tsx
      <ProposalSection number="04" title="What you get">
        <VerdictSheet title={verdict.title} sampleNotice={verdict.sampleNotice} sections={verdict.sections} />
      </ProposalSection>
```

- [ ] **Step 8: Run the suite**

Run: `pnpm check`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: show the founder summary as an artifact, not a description

Section 04. The one-page verdict typeset with its real headings instead
of a paragraph claiming it exists. This is the section that replaces
testimonials: what arrives if you pay is a stronger claim than someone
you have never met saying it was good.

Marked as a sample in the header, and a test pins that label — an
unmarked synthetic artifact reads as a real client's findings."
```

---

## Task 7: GateList and section 03

**Files:**
- Create: `src/components/proposal/gate-list.tsx`
- Create: `src/components/proposal/__tests__/gate-list.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`

**Interfaces:**
- Consumes: `gates` from `@/data/proposal-content`
- Produces:
```ts
type GateListProps = { gates: readonly { name: string; failureMode: string; auditQuestion: string }[] };
export function GateList(props: GateListProps): JSX.Element
```

- [ ] **Step 1: Write the failing test**

Create `src/components/proposal/__tests__/gate-list.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GateList } from "@/components/proposal/gate-list";

const gates = [
  { name: "Supabase", failureMode: "An authenticated user can read another user's rows.", auditQuestion: "Can user A read user B's data?" },
];

describe("GateList", () => {
  it("pairs each gate with what goes wrong and what is asked", () => {
    render(<GateList gates={gates} />);

    expect(screen.getByText("Supabase")).toBeVisible();
    expect(screen.getByText(/An authenticated user can read another user's rows\./)).toBeVisible();
    expect(screen.getByText(/Can user A read user B's data\?/)).toBeVisible();
  });

  it("states no count", () => {
    const { container } = render(<GateList gates={gates} />);

    expect(container.textContent).not.toMatch(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+)\s+gates\b/i);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm vitest run src/components/proposal/__tests__/gate-list.test.tsx`
Expected: FAIL — cannot resolve the module.

- [ ] **Step 3: Implement GateList**

Create `src/components/proposal/gate-list.tsx`:

```tsx
type GateListProps = {
  gates: readonly { name: string; failureMode: string; auditQuestion: string }[];
};

export function GateList({ gates }: GateListProps) {
  return (
    <ul className="flex flex-col">
      {gates.map((gate) => (
        <li key={gate.name} className="grid gap-2 border-t border-rule py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
          <p className="font-mono text-sm text-ink">{gate.name}</p>

          <div className="flex flex-col gap-1">
            <p className="text-sm leading-relaxed text-ink-muted">{gate.failureMode}</p>
            <p className="text-sm leading-relaxed text-ink">{gate.auditQuestion}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm vitest run src/components/proposal/__tests__/gate-list.test.tsx`
Expected: PASS.

- [ ] **Step 5: Add the home page assertion**

In `src/app/__tests__/home-page.test.tsx`, add:

```tsx
  it("describes the method without claiming a number of gates", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("region", { name: /^How I look at it$/i })).toBeVisible();
    expect(container.textContent).not.toMatch(/\b(twelve|seven|\d+)\s+gates\b/i);
  });
```

- [ ] **Step 6: Run it to make sure it fails**

Run: `pnpm vitest run src/app/__tests__/home-page.test.tsx`
Expected: FAIL — no region named "How I look at it".

- [ ] **Step 7: Add section 03 to the page**

In `src/app/page.tsx`, import `GateList` and `gates`, then insert immediately above the `04` section:

```tsx
      <ProposalSection number="03" title="How I look at it">
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
          The gates that apply to your stack, in order. Each one has a way it fails and a question that
          settles it.
        </p>
        <GateList gates={gates} />
      </ProposalSection>
```

- [ ] **Step 8: Run the suite**

Run: `pnpm check`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: list the gates by name, with no count

Section 03. Each gate carries the way it fails and the question that
settles it, which is more use to the reader than a number would be.

The count is deliberately absent and two tests hold it that way. The
pricing line sells twelve, the gate document defines seven, and two of
those seven are alternatives rather than additive — so no fixed number
is verified. A service whose whole offer is checking whether someone
else's claim is true cannot put an unverified number in its method."
```

---

## Task 8: SystemMapPanel and section 02

Built last: its source table needs a generalization pass in the vault first.

**Files:**
- Create: `src/components/proposal/system-map-panel.tsx`
- Create: `src/components/proposal/__tests__/system-map-panel.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`
- Modify: `DESIGN.md` (fill in the remaining component contracts)

**Interfaces:**
- Consumes: `systemMap` from `@/data/proposal-content`
- Produces:
```ts
type SystemMapPanelProps = {
  layers: readonly { name: string }[];
  boundaries: readonly { id: string; between: string; auditQuestion: string }[];
  argument: string;
};
export function SystemMapPanel(props: SystemMapPanelProps): JSX.Element
```

- [ ] **Step 1: Generalize the source table in the vault**

Before writing any code, open `business/fixmyvibe/sample-audit-report-template.md` § 3 System Map in the vault repo. Its Key Boundaries table was written against a booking product, so the row "Public link → private calendar" is specific to that app. Add a general form of the table — the five boundaries that apply to any AI-built product — matching the five entries already in `src/data/proposal-content.ts`. Commit it in the vault repo, not this one.

If the generalization changes any boundary or its audit question, update `systemMap.boundaries` in `src/data/proposal-content.ts` to match. The vault is the source; the code follows it.

- [ ] **Step 2: Write the failing test**

Create `src/components/proposal/__tests__/system-map-panel.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SystemMapPanel } from "@/components/proposal/system-map-panel";

const layers = [{ name: "Browser UI" }, { name: "Database" }];
const boundaries = [
  { id: "1", between: "Auth → user data", auditQuestion: "Can one user reach another user's records?" },
];

describe("SystemMapPanel", () => {
  it("exposes the layers and boundaries as text, not only as drawing", () => {
    // The panel is the argument of the page. Rendered purely as SVG shapes it
    // would say nothing to a screen reader or to search.
    render(<SystemMapPanel layers={layers} boundaries={boundaries} argument="The risk is where the boxes meet." />);

    expect(screen.getByText("Browser UI")).toBeVisible();
    expect(screen.getByText("Database")).toBeVisible();
    expect(screen.getByText("Auth → user data")).toBeVisible();
    expect(screen.getByText(/Can one user reach another user's records\?/)).toBeVisible();
  });

  it("states the argument the drawing makes", () => {
    render(<SystemMapPanel layers={layers} boundaries={boundaries} argument="The risk is where the boxes meet." />);

    expect(screen.getByText("The risk is where the boxes meet.")).toBeVisible();
  });
});
```

- [ ] **Step 3: Run it to make sure it fails**

Run: `pnpm vitest run src/components/proposal/__tests__/system-map-panel.test.tsx`
Expected: FAIL — cannot resolve the module.

- [ ] **Step 4: Implement SystemMapPanel**

Create `src/components/proposal/system-map-panel.tsx`. The drawing is built from bordered elements and numbered markers rather than a single SVG blob, so the layer and boundary names stay real text.

```tsx
type SystemMapPanelProps = {
  layers: readonly { name: string }[];
  boundaries: readonly { id: string; between: string; auditQuestion: string }[];
  argument: string;
};

// The only dark surface on the site. It holds the drawing and nothing else —
// see DESIGN.md, "The dark panel".
export function SystemMapPanel({ layers, boundaries, argument }: SystemMapPanelProps) {
  return (
    <div className="flex flex-col gap-8 bg-panel-dark p-6 sm:p-10">
      <ol className="flex flex-col gap-px" data-testid="system-map-layers">
        {layers.map((layer, index) => (
          <li
            key={layer.name}
            className="border border-panel-dark-muted/30 px-4 py-3 font-mono text-sm text-paper"
            style={{ marginInline: `${index * 0.5}rem` }}
          >
            {layer.name}
          </li>
        ))}
      </ol>

      <p className="max-w-xl font-display text-lg text-paper">{argument}</p>

      <ul className="flex flex-col gap-4 border-t border-panel-dark-muted/30 pt-6">
        {boundaries.map((boundary) => (
          <li key={boundary.id} className="grid gap-1 sm:grid-cols-[2rem_minmax(0,1fr)]">
            <span aria-hidden="true" className="font-mono text-xs text-p0">{boundary.id}</span>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-sm text-paper">{boundary.between}</p>
              <p className="text-sm leading-relaxed text-panel-dark-muted">{boundary.auditQuestion}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm vitest run src/components/proposal/__tests__/system-map-panel.test.tsx`
Expected: PASS.

- [ ] **Step 6: Add the home page assertion**

In `src/app/__tests__/home-page.test.tsx`, add:

```tsx
  it("draws the stack and names where it breaks", () => {
    render(<Home />);

    expect(screen.getByRole("region", { name: /^What you actually built$/i })).toBeVisible();
    expect(screen.getByText("Auth → user data")).toBeVisible();
  });

  it("keeps the unverified terminal step out of the drawing", () => {
    const { container } = render(<Home />);

    expect(container.textContent).not.toMatch(/terminal/i);
  });
```

- [ ] **Step 7: Run it to make sure it fails**

Run: `pnpm vitest run src/app/__tests__/home-page.test.tsx`
Expected: FAIL — no region named "What you actually built".

- [ ] **Step 8: Add section 02 to the page**

In `src/app/page.tsx`, import `SystemMapPanel` and `systemMap`, then insert immediately below the `01` section:

```tsx
      <ProposalSection number="02" title="What you actually built">
        <SystemMapPanel
          layers={systemMap.layers}
          boundaries={systemMap.boundaries}
          argument={systemMap.argument}
        />
      </ProposalSection>
```

- [ ] **Step 9: Fill in the remaining DESIGN.md contracts**

Task 2 left four component contracts as headings. Write them now that the components exist: `SystemMapPanel`, `GateList`, `VerdictSheet`, `ScopeTable`. Each gets its required content order and its prohibitions — for `SystemMapPanel`, that layer and boundary names must remain real text rather than SVG paths, and that it is the only element permitted to use `panel-dark`.

- [ ] **Step 10: Run every gate**

Run: `pnpm check && pnpm build && pnpm design:ownership`
Expected: all pass.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: draw the stack and mark the boundaries

Section 02, and the only dark surface on the site. Layers from the sample
report's system map, with the five boundaries between them numbered and
each carrying the question an audit asks there.

The argument the panel makes is the reason the service exists: one tool
generated all of it, and the risk is not inside any box but where the
boxes meet. That is the part the buyer cannot see for themselves.

Built from bordered elements rather than one SVG so the layer and
boundary names stay real text for screen readers and search. The layer
list deliberately omits a terminal step — raised as a guess, no source."
```

---

## Task 9: Chrome on the new tokens, and the map's motion

**Files:**
- Modify: `src/components/layout/header.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/components/proposal/system-map-panel.tsx`
- Create: `src/components/proposal/__tests__/system-map-motion.test.tsx`
- Modify: `src/components/layout/__tests__/header.test.tsx` if its assertions reference old token classes

**Interfaces:**
- Consumes: everything from Tasks 2 and 8
- Produces: nothing new

- [ ] **Step 1: Move header and footer to the new tokens**

Replace `zapier-*`, `cream`, and `offwhite` class names in `src/components/layout/header.tsx` and `src/components/layout/footer.tsx` with `paper`, `ink`, `ink-muted`, and `rule`. Do not change the markup, the links, or the copy — only the color classes.

- [ ] **Step 2: Add the document identifier to the footer**

The footer is where a report states what it is. Below the existing links, add:

```tsx
        <p className="font-mono text-xs text-ink-muted">
          wakeymoment · launch-readiness review · rev. 2026-08
        </p>
```

- [ ] **Step 3: Write the failing motion test**

Create `src/components/proposal/__tests__/system-map-motion.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SystemMapPanel } from "@/components/proposal/system-map-panel";

const layers = [{ name: "Browser UI" }];
const boundaries = [
  { id: "1", between: "Auth → user data", auditQuestion: "Can one user reach another user's records?" },
];

describe("SystemMapPanel motion", () => {
  it("renders every boundary even when IntersectionObserver never fires", () => {
    // jsdom has no IntersectionObserver. If the component hid its boundaries
    // until an observer callback ran, they would be invisible to every reader
    // whose browser blocked the script — and to search.
    vi.stubGlobal("IntersectionObserver", undefined);

    render(<SystemMapPanel layers={layers} boundaries={boundaries} argument="The risk is where the boxes meet." />);

    expect(screen.getByText("Auth → user data")).toBeVisible();

    vi.unstubAllGlobals();
  });
});
```

- [ ] **Step 4: Run it to make sure it passes already**

Run: `pnpm vitest run src/components/proposal/__tests__/system-map-motion.test.tsx`
Expected: PASS — the component from Task 8 has no observer yet. This test exists to fail later if Step 5 is implemented by hiding content, which is the mistake it guards against.

- [ ] **Step 5: Add the reveal**

Boundaries are present in the markup from the first paint and start fully opaque in CSS. The animation only runs when a class is added. In `src/app/globals.css`:

```css
/* The map's boundary markers settle in one at a time as the panel enters view.
   They are opaque by default — the animation is additive, so a blocked script,
   a failed observer, or reduced motion all leave the content readable. */
@media (prefers-reduced-motion: no-preference) {
  .map-boundary-armed {
    opacity: 0;
    transform: translateY(6px);
  }

  .map-boundary-revealed {
    opacity: 1;
    transform: none;
    transition: opacity 320ms ease-out, transform 320ms ease-out;
  }
}
```

In `system-map-panel.tsx`, add `"use client"` at the top, arm the markers in a `useEffect` (never during render, so the server output stays opaque), and reveal them on intersection with a per-index delay.

- [ ] **Step 6: Verify motion and reduced motion by hand**

Run: `pnpm dev`, open `http://localhost:3000`, and confirm the markers settle in as the panel scrolls into view. Then enable **System Settings → Accessibility → Display → Reduce motion** on macOS, reload, and confirm every marker is simply present with no movement.

- [ ] **Step 7: Run the suite**

Run: `pnpm check && pnpm build`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: move the chrome to paper and reveal the map's boundaries

Header and footer take the semantic tokens, and the footer gains the line
a report ends with — what this document is and when it was revised.

The map's boundary markers settle in one at a time as the panel enters
view. That is the only motion added: on a landing page the only animation
that earns its cost is the one that shows the product, and here the
product is the drawing.

The markers are opaque in the markup and the animation is additive, so a
blocked script, a failed observer, or reduce-motion all leave the content
readable. A test pins that — hiding content until an observer fires is
the easy way to write this and the wrong one."
```

---

## Task 10: Migrate the remaining pages' tokens

Structure and copy stay exactly as they are. Only color classes change.

**Files:**
- Modify: `src/app/services/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/posts/page.tsx`, `src/app/posts/[slug]/page.tsx`, `src/app/resources/page.tsx`, `src/app/domains/page.tsx`, `src/app/domains/[domain]/page.tsx`
- Modify: the components under `src/components/{about,contact,content,domains,services,ui,mdx}` that carry `zapier-*` classes
- Modify: `src/app/globals.css` (remove the `zapier-*` tokens once nothing references them)

- [ ] **Step 1: Find every remaining reference**

Run:
```bash
grep -rn "zapier-\|bg-cream\|bg-offwhite\|text-console\|accent-surface" src --include="*.tsx" --include="*.css" | wc -l
grep -rln "zapier-\|bg-cream\|bg-offwhite" src --include="*.tsx"
```
Record the count. It is the progress measure for this task.

- [ ] **Step 2: Substitute by role, not by search-and-replace**

Map each old name to the semantic role it was playing:

| Old | New |
|---|---|
| `zapier-black`, `text-strong` | `ink` |
| `zapier-charcoal`, `text-default` | `ink` |
| `zapier-gray`, `text-muted` | `ink-muted` |
| `zapier-sand`, `border-strong` | `rule` |
| `cream`, `offwhite`, `zapier-light-sand`, `panel` | `paper` |
| `zapier-orange`, `accent-surface` | remove — this was the brand purple, and links and buttons are now ink |
| `console-text` | `paper` |
| `console-muted` | `panel-dark-muted` |

Work one file at a time and run `pnpm vitest run` after each. Some tests assert class names; update the assertion when the role is unchanged, and stop and report if a test asserts a *behavior* you are about to change.

- [ ] **Step 3: Update the button variants**

`src/components/ui/button.tsx` hard-codes `#533afd` and `#4434d4` in every variant. Replace: primary becomes ink on paper with a `rule` border, secondary becomes paper with an ink border, `text` becomes ink with a `rule` underline. Keep the focus ring — change its color to `ink`.

- [ ] **Step 4: Delete the old tokens**

Once Step 1's grep returns zero, remove the `zapier-*`, `cream`, `offwhite`, `panel`, `accent-surface`, `console-*`, `text-strong`, `text-default`, `text-muted`, and `border-strong` entries from the `@theme` block, and delete the deprecated section from `DESIGN.md`.

- [ ] **Step 5: Verify every page renders**

Run `pnpm dev` and open `/`, `/services`, `/about`, `/contact`, `/posts`, `/resources`, `/domains`, and one post. Confirm no page has lost its text against its background.

- [ ] **Step 6: Run every gate**

Run: `pnpm check && pnpm build && pnpm design:ownership`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: migrate the remaining pages off the borrowed tokens

Colors only — no page's structure or copy changes. Each old name is
replaced by the semantic role it was actually playing, and the brand
purple is dropped rather than renamed: links and buttons are ink now, so
that colour appearing anywhere on the site means a verdict was made.

The zapier-* names are deleted from the theme now that nothing reads
them. They held another company's palette under a third company's names."
```

---

## Open items carried into execution

Named here so nobody has to rediscover them mid-task.

- **Section 06 has the least-verified content.** `whyMe.body` in Task 4 is written from what the repository shows — the public methodology repo, the writing, the about page. The one person who knows what else belongs there has not said. Before this ships, ask what credentials, history, or public work should appear, and replace the placeholder body with it. This is the section that has to carry credibility with no testimonials, so it is the weakest link in the plan.
- **`service-packages.md` still sells "12게이트" and "I verify twelve gates myself."** The site no longer repeats it, so this plan is not blocked, but the selling line remains larger than the fact.
- **The price figure goes in when publishing it is approved.** `scope.priceNote` is the single line to change.
- **`vibe-hardening` currently holds only a README.** Section 06 links to it as the published method. Either the repository gets its content or the link's label stops promising one.
