# Credibility-First Launch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Prepare the portfolio/blog for a first credible public deploy by adding a resources page, a downloadable portfolio PDF, a light polish pass, and deployment readiness verification.

**Architecture:** Reuse the existing App Router + typed-data structure already used across the homepage and domain pages. Add a small resources content module, a new `/resources` route, a static PDF asset, and only the minimum supporting polish required to make the first public version feel intentional.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS, Contentlayer MDX, Vitest, Vercel deployment flow.

---

### Task 1: Lock the resources page behavior with tests

**Files:**
- Create: `src/app/resources/__tests__/page.test.tsx`
- Optional reference: `src/app/page.tsx`, `src/components/home/contact-cta.tsx`

**Step 1: Write the failing route test**

Create `src/app/resources/__tests__/page.test.tsx` covering:
- the resources page heading and intro copy
- a visible portfolio download link targeting `/portfolio.pdf`
- at least one capability / service section
- a visible contact CTA

Prefer text and role assertions over snapshots.

**Step 2: Run the targeted test to verify it fails**

Run:
```bash
pnpm test src/app/resources/__tests__/page.test.tsx
```

Expected:
- fail because the route does not exist yet

**Step 3: Commit the failing test**

```bash
git add src/app/resources/__tests__/page.test.tsx
git commit -m "Define the first-launch resources page behavior\n\nAdd the failing route test for the resources page so the first public deploy has a locked conversion-oriented path before implementation begins.\n\nConstraint: First launch should stay small and credible instead of becoming a full SEO/content overhaul\nRejected: Deploy current site without a resources page | leaves no strong decision-making path for visitors\nConfidence: high\nScope-risk: narrow\nDirective: Keep the resources page test focused on visitor-facing outcomes, not layout internals\nTested: pnpm test src/app/resources/__tests__/page.test.tsx (fails as expected)\nNot-tested: Actual route implementation\n"`
```

### Task 2: Add typed resources content and implement `/resources`

**Files:**
- Create: `src/data/resources-content.ts`
- Create: `src/app/resources/page.tsx`
- Optional create: `src/components/resources/*.tsx` only if page extraction is clearly warranted
- Modify: `src/app/resources/__tests__/page.test.tsx`

**Step 1: Add typed resources content**

Create `src/data/resources-content.ts` with explicit structures for:
- page intro
- capability / stack items
- founder-friendly help bullets or cards
- final CTA

Keep the content typed and concise.

**Step 2: Implement the page**

Create `src/app/resources/page.tsx` using existing layout/container patterns. The page should include:
- heading + intro
- capability overview
- download link to `/portfolio.pdf`
- founder-friendly problem/solution section
- final CTA

Do not introduce a new content system or unnecessary abstractions.

**Step 3: Run the targeted route test**

Run:
```bash
pnpm test src/app/resources/__tests__/page.test.tsx
```

Expected:
- pass

**Step 4: Commit the working resources route**

```bash
git add src/data/resources-content.ts src/app/resources/page.tsx src/app/resources/__tests__/page.test.tsx
git commit -m "Add the conversion page for the first public launch\n\nImplement a resources page that gives visitors a clear way to evaluate capabilities, download a portfolio summary, and decide whether to reach out.\n\nConstraint: Use the current typed-data site structure instead of adding a new content workflow\nRejected: Hardcode all content inline without structure | harder to refine after launch\nConfidence: high\nScope-risk: narrow\nDirective: Keep this page practical and decision-oriented rather than turning it into a second homepage\nTested: pnpm test src/app/resources/__tests__/page.test.tsx\nNot-tested: Full site integration\n"`
```

### Task 3: Add the first downloadable PDF asset and source note

**Files:**
- Create: `public/portfolio.pdf`
- Create: `docs/portfolio.pdf.md`
- Optional modify: `README.md` if launch docs should mention the asset

**Step 1: Add editable PDF source notes**

Create `docs/portfolio.pdf.md` with the content outline for the portfolio PDF:
- intro
- capabilities
- featured projects/domains
- contact info
- short process / working style note

**Step 2: Add the first PDF asset**

Create `public/portfolio.pdf` as a simple presentable placeholder or generated first-pass PDF. The critical requirement is that the download works and the file feels intentional enough for a first launch.

**Step 3: Verify the asset is linked from `/resources`**

Run:
```bash
pnpm test src/app/resources/__tests__/page.test.tsx
```

Expected:
- still pass

**Step 4: Commit the PDF asset and notes**

```bash
git add public/portfolio.pdf docs/portfolio.pdf.md
git commit -m "Make the first launch downloadable\n\nAdd the initial portfolio PDF and its editable source notes so the first public release includes a shareable summary artifact.\n\nConstraint: The first PDF only needs to be credible and downloadable, not fully polished\nRejected: Delay launch until a perfect PDF design exists | unnecessary blocker for first deploy\nConfidence: medium\nScope-risk: narrow\nDirective: Keep the PDF source note updated whenever the downloadable asset changes materially\nTested: Resources-page test still passes with the download link present\nNot-tested: PDF visual quality review across devices\n"`
```

### Task 4: Do the launch-polish pass around navigation and CTAs

**Files:**
- Modify: `src/components/layout/header.tsx`
- Modify: `src/app/page.tsx`
- Modify: homepage or contact CTA-related components if needed
- Optional modify: `src/app/posts/page.tsx`, `src/app/domains/[domain]/page.tsx`

**Step 1: Identify the minimum polish needed**

Keep this pass deliberately small. Focus only on:
- navigation coherence around `/resources`
- CTA clarity for visitors arriving from homepage/posts/domains
- obvious text inconsistencies

**Step 2: Add or adjust the smallest necessary UI/content changes**

Examples may include:
- making sure header nav resources link feels intentional
- ensuring at least one homepage CTA can lead naturally to `/resources`
- improving wording around “book/contact/download” without changing architecture

**Step 3: Add or update focused tests only if behavior changes materially**

If navigation/CTA behavior changes in a testable way, extend the closest existing tests rather than adding broad new test files.

**Step 4: Commit the polish pass**

```bash
git add src/components/layout/header.tsx src/app/page.tsx src/components/home src/app/posts/page.tsx src/app/domains/[domain]/page.tsx
git commit -m "Polish the first-launch conversion path\n\nTighten navigation and CTA flow so visitors can move from browsing the portfolio to evaluating services and downloading resources without dead ends.\n\nConstraint: Keep the polish pass small and avoid reopening larger content/design questions before launch\nRejected: Large-scale homepage rewrite | too much risk for the first deploy window\nConfidence: medium\nScope-risk: narrow\nDirective: Prefer copy and path clarity over ornamental UI changes in launch polish passes\nTested: Targeted tests for any changed route/CTA behavior\nNot-tested: Broad visual audit across every page\n"`
```

### Task 5: Sync project docs with the new first-launch scope

**Files:**
- Modify: `README.md`
- Modify: `docs/2026-04-13-blog-re-plan-status.md`
- Modify: `docs/2026-04-13-blog-re-implementation-plan.md`

**Step 1: Update roadmap / plan docs**

Record that:
- the resources page now exists
- the PDF hook is in place
- the first-launch credibility pass is complete or substantially complete
- deployment is the next step

**Step 2: Keep the updates factual**

Do not overstate SEO/analytics work if it is still pending.

**Step 3: Commit doc sync**

```bash
git add README.md docs/2026-04-13-blog-re-plan-status.md docs/2026-04-13-blog-re-implementation-plan.md
git commit -m "Record the first-launch scope in project docs\n\nUpdate the repo docs so the implemented first-launch path matches the site's actual state and the remaining work stays visible.\n\nConstraint: Plan docs should remain a truthful execution record, not an aspirational list\nRejected: Leave the plan stale until after deploy | makes the release harder to reason about\nConfidence: high\nScope-risk: narrow\nDirective: Keep status files in sync whenever launch-facing scope changes\nTested: Docs reviewed manually\nNot-tested: N/A\n"`
```

### Task 6: Verify deploy readiness and capture deployment instructions

**Files:**
- Optional modify: `README.md`
- Optional create/modify: deployment note under `docs/` if new info emerges

**Step 1: Run the full verification suite**

Run:
```bash
pnpm lint
pnpm test
pnpm build
```

Expected:
- lint passes
- tests pass
- build passes

If the known `contentlayer build` Node/Clipanion warning still appears while the final Next build succeeds, record it explicitly as a non-blocking caveat.

**Step 2: Prepare deployment notes**

Capture the minimum deploy information needed for Vercel:
- repo ready state
- build command (`pnpm build` or default Vercel flow)
- any known caveats

**Step 3: Commit the verified launch candidate**

```bash
git add README.md docs src public/portfolio.pdf package.json pnpm-lock.yaml
git commit -m "Prepare the first credible public release\n\nFinish the small pre-deploy additions that make the portfolio feel intentionally launchable: resources page, downloadable PDF, focused polish, and updated project docs.\n\nConstraint: First deploy should maximize credibility without turning into a full prelaunch program\nRejected: Block release on advanced SEO/analytics work | better handled immediately after launch\nConfidence: medium\nScope-risk: moderate\nDirective: Treat post-launch SEO and analytics as the next pass, not hidden scope inside this launch cut\nTested: pnpm lint; pnpm test; pnpm build\nNot-tested: Live Vercel preview / production environment behavior\n"`
```

### Task 7: Deployment handoff

**Files:**
- None required

**Step 1: Review final working tree**

Run:
```bash
git status --short
git diff --stat
```

Expected:
- only intended launch-prep files changed

**Step 2: Hand off to execution choice**

Use `superpowers:executing-plans` if this plan is being implemented in a separate execution run, or continue directly into the Vercel deploy flow if the release candidate is already approved.
