# Home Hero Diagnostic Console Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework the home hero so it feels like a professional AI MVP rescue intake surface instead of a generic bordered promo card.

**Architecture:** Keep the existing home route composition, but replace the current hero's right-side bordered surface with a denser diagnostic console layout. Move the hero copy and console content into typed data so the messaging and component structure stay reusable.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the new hero contract with tests

**Files:**
- Create: `src/components/home-redesign/__tests__/home-hero.test.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`
- Modify: `src/data/__tests__/redesign-content.test.ts`

**Step 1: Write the failing tests**

- Assert the hero renders a stronger rescue headline and routes the primary CTA to Contact.
- Assert the hero exposes three distinct console sections: symptoms, audit areas, and outcomes.
- Assert the home page still renders the redesigned rescue path around the new hero contract.

**Step 2: Run the focused tests to verify they fail**

Run: `pnpm test src/components/home-redesign/__tests__/home-hero.test.tsx src/app/__tests__/home-page.test.tsx src/data/__tests__/redesign-content.test.ts`

Expected: FAIL because the old hero copy and bordered card structure are still in place.

### Task 2: Refactor hero data and component

**Files:**
- Modify: `src/data/home-redesign-content.ts`
- Modify: `src/components/home-redesign/home-hero.tsx`

**Step 1: Expand typed hero data**

- Add explicit arrays for visible symptoms, audit areas, and outcomes.
- Update the hero title, subtitle, and CTA labels to sound more credible and professional.

**Step 2: Replace the promo card layout**

- Build a diagnostic console surface with internal sections instead of a single repeated card.
- Keep semantic headings and list structure so the hero remains accessible.

**Step 3: Run the focused tests to verify they pass**

Run: `pnpm test src/components/home-redesign/__tests__/home-hero.test.tsx src/app/__tests__/home-page.test.tsx src/data/__tests__/redesign-content.test.ts`

Expected: PASS

### Task 3: Verify the full slice

**Files:**
- Verify only

**Step 1: Run lint + broader home checks**

Run: `pnpm lint`

Expected: PASS

**Step 2: Review the running page**

- Inspect `http://localhost:3000/` in the in-app browser.
- Confirm the hero now reads like a diagnostic service surface, with clearer hierarchy and less card repetition.
