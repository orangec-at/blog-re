# Blog Design System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a blog-specific design system with semantic tokens, reusable patterns, an internal preview page, and immediate adoption on the highest-impact conversion surfaces.

**Architecture:** Extend the existing `src/components/ui/` layer with semantic surfaces and named pattern components, then expose them on a `/design-system` route for internal reference. Refactor the home hero and services chooser to consume the new patterns so the system proves itself on real pages immediately.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the new system contract with failing tests

**Files:**
- Create: `src/components/ui/__tests__/patterns.test.tsx`
- Create: `src/app/design-system/__tests__/page.test.tsx`
- Modify: `src/app/services/__tests__/page.test.tsx`

**Step 1: Write the failing pattern tests**

- Cover `SectionIntro`, `SignalList`, `DecisionPanel`, and `ConsolePanel`.
- Assert visitor-visible structure, headings, and CTA behavior rather than snapshots.

**Step 2: Write the failing design-system page test**

- Assert the route renders a visible “Design System” heading.
- Assert it shows token/surface examples and at least one pattern example.

**Step 3: Expand the services route test**

- Assert the service chooser uses more decision-oriented content rather than generic snapshot card copy.

**Step 4: Run RED**

Run: `pnpm test src/components/ui/__tests__/patterns.test.tsx src/app/design-system/__tests__/page.test.tsx src/app/services/__tests__/page.test.tsx`

Expected: FAIL because the route and new patterns do not exist yet.

### Task 2: Implement semantic tokens and reusable UI patterns

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/ui/surfaces/panel-surface.tsx`
- Create: `src/components/ui/surfaces/console-panel.tsx`
- Create: `src/components/ui/patterns/section-intro.tsx`
- Create: `src/components/ui/patterns/signal-list.tsx`
- Create: `src/components/ui/patterns/decision-panel.tsx`
- Create: `src/components/ui/patterns/proof-row.tsx`

**Step 1: Add semantic tokens**

- Introduce CSS variables for readable text roles, surface roles, and stronger border roles.
- Keep the current warm palette but remove hardcoded one-off contrast tweaks where possible.

**Step 2: Build the surface hierarchy**

- Add a reusable `PanelSurface`.
- Add a reusable `ConsolePanel`.

**Step 3: Build page patterns**

- Implement `SectionIntro`, `SignalList`, `DecisionPanel`, and `ProofRow`.
- Keep APIs small and specific to the real content shapes already used in the repo.

**Step 4: Run the pattern tests**

Run: `pnpm test src/components/ui/__tests__/patterns.test.tsx`

Expected: PASS

### Task 3: Add the internal preview route

**Files:**
- Create: `src/app/design-system/page.tsx`
- Create: `src/app/design-system/__tests__/page.test.tsx`

**Step 1: Build the preview page**

- Show token examples, typography, surfaces, and real pattern examples.
- Keep it practical rather than exhaustive.

**Step 2: Run the route test**

Run: `pnpm test src/app/design-system/__tests__/page.test.tsx`

Expected: PASS

### Task 4: Adopt the system on real pages

**Files:**
- Modify: `src/components/home-redesign/home-hero.tsx`
- Modify: `src/components/services/service-decision-grid.tsx`
- Modify: `src/app/services/page.tsx` if copy/test coverage needs alignment

**Step 1: Refactor the home hero**

- Replace ad hoc hero internals with `ConsolePanel`, `SectionIntro`, and `SignalList`.

**Step 2: Refactor the service chooser**

- Replace repeated `FeatureCard` usage with `DecisionPanel`.

**Step 3: Re-run focused route tests**

Run: `pnpm test src/app/__tests__/home-page.test.tsx src/app/services/__tests__/page.test.tsx src/components/home-redesign/__tests__/home-hero.test.tsx`

Expected: PASS

### Task 5: Verify the slice

**Files:**
- Verify only

**Step 1: Run broader verification**

Run: `pnpm lint && pnpm test`

Expected: PASS

**Step 2: Review in the app**

- Open `http://localhost:3000/` and `http://localhost:3000/design-system`
- Confirm contrast and hierarchy improved, and the new patterns feel like a real reusable system instead of another set of cards.
