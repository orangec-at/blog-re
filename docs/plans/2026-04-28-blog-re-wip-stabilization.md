# blog-re WIP Stabilization Plan

> **For Hermes:** Use subagent-driven-development skill for any follow-up implementation beyond the one-line build type fix already applied.

**Goal:** Stabilize the current wakeymoment redesign/design-system WIP so it can be reviewed, committed in logical groups, and prepared for deploy.

**Architecture:** Treat the current WIP as a redesign slice, not as unrelated edits. Preserve the existing AI MVP rescue positioning while grouping changes into docs/plans, UI primitives, layout/navigation, page/content updates, and tests. Do not start new feature work until this WIP is committed or intentionally reverted.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Contentlayer, Vitest, pnpm.

---

## Inspection Snapshot

Date: 2026-04-28
Repo: `/Users/mac/workspace/blog-re`
Branch: `master`
Latest inspected commit: `ec32249 Align the header with the AI MVP rescue conversion path`

Initial state:
- 23 tracked files modified.
- 20 untracked files.
- Existing `.omx` state files are modified and should likely not be part of product commits unless intentionally tracking agent metrics/state.

Quality gates after stabilization pass:
- `pnpm check`: PASS
  - ESLint passed.
  - Vitest passed: 27 files, 51 tests.
- `pnpm build`: PASS
  - Next.js 16.2.3 production build completed.
  - Static/dynamic route generation completed.
  - Contentlayer emitted a Node/clipanion TypeError after generating 2 docs, but the prebuild continued and overall `pnpm build` exited 0. Treat this as a warning to investigate later, not a current blocker.

Fix already applied:
- `src/components/ui/button.tsx`
  - Root cause: `Omit<ButtonProps, "variant">` was applied to a discriminated union and collapsed the `href` branch in a way TypeScript could not prove safe when wrapper components spread props into `<Button />`.
  - Fix: introduced `DistributiveOmit<T, K>` and used it for `PrimaryButtonProps` / `SecondaryButtonProps`.

---

## WIP Grouping

### Group 0: Agent/local state — likely exclude from product commit

Files:
- `.omx/metrics.json`
- `.omx/state/session.json`

Action:
- Review whether these should remain tracked.
- If they are accidental agent runtime noise, revert before product commits.

### Group 1: Repo hygiene

Files:
- `.gitignore`

Action:
- Inspect exact change and commit separately if it prevents recurring local/generated noise.

### Group 2: Planning/design docs

Files:
- `docs/plans/2026-04-17-blog-design-system-design.md`
- `docs/plans/2026-04-17-blog-design-system-implementation.md`
- `docs/plans/2026-04-17-button-chip-appbar-design.md`
- `docs/plans/2026-04-17-button-chip-appbar-implementation.md`
- `docs/plans/2026-04-17-home-hero-diagnostic-console.md`
- `docs/plans/2026-04-28-blog-re-wip-stabilization.md`

Action:
- Commit as docs once content is reviewed.

### Group 3: UI primitives and design-system route

Files:
- `src/components/ui/button.tsx`
- `src/components/ui/chip.tsx`
- `src/components/ui/typography.tsx`
- `src/components/ui/actions/primary-button.tsx`
- `src/components/ui/actions/secondary-button.tsx`
- `src/components/ui/actions/text-link.tsx`
- `src/components/ui/feedback/pill-tag.tsx`
- `src/components/ui/typography/body-text.tsx`
- `src/components/ui/typography/display-heading.tsx`
- `src/components/ui/typography/eyebrow.tsx`
- `src/components/ui/typography/section-heading.tsx`
- `src/components/ui/surfaces/console-panel.tsx`
- `src/components/ui/surfaces/panel-surface.tsx`
- `src/components/ui/patterns/decision-panel.tsx`
- `src/components/ui/patterns/proof-row.tsx`
- `src/components/ui/patterns/section-intro.tsx`
- `src/components/ui/patterns/signal-list.tsx`
- `src/app/design-system/page.tsx`
- `src/app/design-system/__tests__/page.test.tsx`
- `src/components/ui/__tests__/foundation.test.tsx`
- `src/components/ui/__tests__/patterns.test.tsx`

Action:
- This is the core atomic/design-system slice.
- Commit after reviewing generated visual/design-system page.

### Group 4: Layout/navigation/mobile appbar

Files:
- `src/app/layout.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/__tests__/header.test.tsx`
- `src/components/layout/mobile-floating-appbar.tsx`
- `src/components/layout/__tests__/mobile-floating-appbar.test.tsx`

Action:
- Commit after confirming desktop/mobile navigation behavior.

### Group 5: Home/services redesign content and sections

Files:
- `src/app/globals.css`
- `src/app/__tests__/home-page.test.tsx`
- `src/app/services/__tests__/page.test.tsx`
- `src/components/home-redesign/home-hero.tsx`
- `src/components/home-redesign/__tests__/home-hero.test.tsx`
- `src/components/home/__tests__/contact-cta.test.tsx`
- `src/components/services/service-decision-grid.tsx`
- `src/data/home-redesign-content.ts`
- `src/data/__tests__/redesign-content.test.ts`

Action:
- This is the conversion-path product slice.
- Commit after checking copy and hero/service CTA flow.

---

## Task Plan

### Task 1: Decide what to do with `.omx` runtime changes

**Objective:** Prevent agent runtime noise from contaminating product commits.

**Files:**
- Review: `.omx/metrics.json`
- Review: `.omx/state/session.json`

**Steps:**
1. Run `git diff -- .omx/metrics.json .omx/state/session.json`.
2. If only runtime metrics/session timestamps changed, revert them.
3. If they intentionally encode project workflow state, document why they remain tracked.
4. Run `git status --short`.

### Task 2: Review `.gitignore` change

**Objective:** Confirm the ignore rule is useful and not hiding important files.

**Files:**
- Review: `.gitignore`

**Steps:**
1. Run `git diff -- .gitignore`.
2. Decide whether it belongs with design-system stabilization or a separate hygiene commit.

### Task 3: Visual smoke test design-system route

**Objective:** Confirm `/design-system` renders the new primitives/patterns.

**Files:**
- `src/app/design-system/page.tsx`
- `src/app/design-system/__tests__/page.test.tsx`

**Steps:**
1. Start local dev server: `pnpm dev`.
2. Open `http://localhost:3000/design-system`.
3. Capture screenshot or visual QA if browser tools are available.
4. Fix only obvious rendering regressions.
5. Re-run `pnpm check` and `pnpm build`.

### Task 4: Visual smoke test conversion pages

**Objective:** Confirm Home → Services → Contact flow is coherent.

**Files:**
- `src/components/home-redesign/home-hero.tsx`
- `src/components/services/service-decision-grid.tsx`
- `src/data/home-redesign-content.ts`

**Steps:**
1. Visit `/`, `/services`, `/contact` locally.
2. Check copy, CTA visibility, mobile navigation, and layout rhythm.
3. Fix only blockers.
4. Re-run `pnpm check` and `pnpm build`.

### Task 5: Commit logical groups

**Objective:** Make the WIP recoverable and reviewable.

**Suggested commit order:**
1. `docs: add redesign stabilization and design-system plans`
2. `feat: add wakeymoment design-system primitives`
3. `feat: add responsive app navigation shell`
4. `feat: refine AI MVP rescue conversion path`
5. `chore: update repo hygiene` if `.gitignore` is separate

**Before each commit:**
- `git diff --stat`
- `pnpm check`
- `pnpm build`

---

## Known Follow-up

Investigate Contentlayer warning:

```text
TypeError: The "code" argument must be of type number. Received an instance of Object
at process.set [as exitCode]
...
Generated 2 documents in .contentlayer
```

Current impact:
- Not blocking `pnpm build`; command exits 0 after Next build passes.

Likely later options:
- pin compatible Node version from `.nvmrc`;
- check Contentlayer 0.3.3 compatibility with current Node/Next stack;
- wrap `contentlayer build` only if it starts returning non-zero.

---

## Current Verified Commands

```bash
pnpm check
pnpm build
```

Both pass as of 2026-04-28 after the `DistributiveOmit` fix.
