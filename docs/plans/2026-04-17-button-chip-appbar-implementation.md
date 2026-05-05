# Button, Chip, and Mobile App Bar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build atomic button and chip components, then compose them into a mobile floating app bar and adopt them in the design-system preview and site header.

**Architecture:** Expand the existing button atom into a variant-based API, add a new chip atom module with informational and interactive variants, then create a mobile floating app bar organism built from those atoms. Keep desktop header behavior intact while switching small screens to the new floating pattern.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the atomic API with tests

**Files:**
- Modify: `src/components/ui/__tests__/foundation.test.tsx`
- Create: `src/components/layout/__tests__/mobile-floating-appbar.test.tsx`
- Modify: `src/components/layout/__tests__/header.test.tsx`

**Step 1: Add button and chip assertions**

- Cover button variants and sizes through the public atomic entrypoint.
- Cover informational chip and interactive chip rendering.

**Step 2: Add mobile floating app bar test**

- Assert the app bar renders navigation actions and the diagnosis CTA.

**Step 3: Update header expectations**

- Keep desktop banner/nav assertions.
- Add expectations that a mobile floating app bar contract exists in the rendered header.

**Step 4: Run RED**

Run: `pnpm test src/components/ui/__tests__/foundation.test.tsx src/components/layout/__tests__/mobile-floating-appbar.test.tsx src/components/layout/__tests__/header.test.tsx`

Expected: FAIL because chips and the floating app bar do not exist in their final forms.

### Task 2: Implement atomic button and chip modules

**Files:**
- Modify: `src/components/ui/button.tsx`
- Create: `src/components/ui/chip.tsx`
- Modify: `src/components/ui/feedback/pill-tag.tsx`

**Step 1: Expand button atom**

- Add variant and size props.
- Preserve link/button rendering.
- Keep backward compatibility for current call sites where possible.

**Step 2: Add chip atom**

- Implement `Chip`, `InteractiveChip`, and `ChipGroup`.
- Support tone, size, selected state, and link/button rendering.

**Step 3: Keep compatibility**

- Make `PillTag` a thin compatibility wrapper or alias to the new chip atom.

**Step 4: Run focused tests**

Run: `pnpm test src/components/ui/__tests__/foundation.test.tsx`

Expected: PASS

### Task 3: Implement the mobile floating app bar

**Files:**
- Create: `src/components/layout/mobile-floating-appbar.tsx`
- Modify: `src/components/layout/header.tsx`

**Step 1: Build the app bar**

- Fixed bottom mobile surface
- navigation chips for core routes
- diagnosis CTA button

**Step 2: Wire into header**

- Keep desktop nav/header visible from `md` upward
- show the floating app bar only below that breakpoint

**Step 3: Run header/app-bar tests**

Run: `pnpm test src/components/layout/__tests__/mobile-floating-appbar.test.tsx src/components/layout/__tests__/header.test.tsx`

Expected: PASS

### Task 4: Show the atoms in the design-system page

**Files:**
- Modify: `src/app/design-system/page.tsx`
- Modify: `src/app/design-system/__tests__/page.test.tsx`

**Step 1: Add button and chip examples**

- Show the button ladder
- show informational chips
- show interactive chips
- show the floating app bar preview

**Step 2: Run design-system route test**

Run: `pnpm test src/app/design-system/__tests__/page.test.tsx`

Expected: PASS

### Task 5: Verify the slice

**Files:**
- Verify only

**Step 1: Run verification**

Run: `pnpm lint && pnpm test`

Expected: PASS

**Step 2: Review in the browser**

- Check `/design-system`
- check mobile layout behavior
- confirm buttons/chips feel like real system atoms rather than page-specific helpers
