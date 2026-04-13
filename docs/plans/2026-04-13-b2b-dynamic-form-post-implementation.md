# B2B Dynamic Form Post Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new post that showcases a full-width B2B dynamic onboarding form inside post content so visitors can see a realistic web-product scenario.

**Architecture:** Keep the existing post system, but add one dedicated client-side demo component for a workspace onboarding flow. The post page should support a clearly full-width / viewport-style content block inside the article so the demo feels like a real app surface instead of a narrow article widget. Keep the first version hardcoded and frontend-only.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Contentlayer MDX, React Hook Form, Zod, @hookform/resolvers, Vitest, Testing Library.

---

### Task 1: Add form libraries and lock the intended behavior with tests

**Files:**
- Modify: `package.json`
- Create: `src/components/demos/__tests__/workspace-onboarding-demo.test.tsx`
- Optional reference during implementation: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

**Step 1: Write the failing component test for dynamic behavior**

Create `src/components/demos/__tests__/workspace-onboarding-demo.test.tsx` with tests that cover:
- initial core fields render
- selecting a use case reveals context-specific fields
- selecting integrations reveals integration-specific inputs
- enabling compliance reveals advanced requirements
- invalid submit shows validation messages
- valid submit shows a review / success state

Use Testing Library interactions (`render`, `screen`, `userEvent`) and assert on visible text instead of implementation details.

**Step 2: Run the new test to verify it fails**

Run:
```bash
pnpm test src/components/demos/__tests__/workspace-onboarding-demo.test.tsx
```

Expected:
- fail because the component and/or dependencies do not exist yet

**Step 3: Add the minimal dependencies**

Modify `package.json` to add:
- `react-hook-form`
- `zod`
- `@hookform/resolvers`

Then run:
```bash
pnpm install
```

**Step 4: Commit the dependency + failing-test setup**

```bash
git add package.json pnpm-lock.yaml src/components/demos/__tests__/workspace-onboarding-demo.test.tsx
git commit -m "Document the dynamic form showcase plan\n\nAdd the first failing tests and required libraries for a product-style onboarding demo embedded in post content. This keeps the work scoped to one realistic example before any reusable scenario system exists.\n\nConstraint: The first showcase should stay frontend-only and hardcoded\nRejected: Build a generic scenario engine first | too much setup before proving the core experience\nConfidence: high\nScope-risk: narrow\nDirective: Keep the first test suite focused on visible user behavior, not internal form-library details\nTested: New component test fails as expected\nNot-tested: Final integration with post content\n"`
```

### Task 2: Build the hardcoded onboarding demo component

**Files:**
- Create: `src/components/demos/workspace-onboarding-demo.tsx`
- Modify: `src/components/demos/__tests__/workspace-onboarding-demo.test.tsx`

**Step 1: Define the schema and data model**

Inside `src/components/demos/workspace-onboarding-demo.tsx`, define a Zod schema with fields for:
- `companyName`
- `industry`
- `teamSize`
- `useCase`
- `departments` (array)
- `seats`
- `integrations` (array)
- integration-specific nested fields such as `slackWorkspace`, `hubspotPortalId`, `salesforceOrg`
- `needsCompliance` (boolean)
- compliance-specific fields such as `complianceFrameworks`, `securityContact`

Keep the schema explicit rather than generic.

**Step 2: Implement the form UI with React Hook Form**

Create a client component (`'use client'`) that:
- uses `useForm` with the Zod resolver
- groups the UI into visible sections
- renders conditional fields based on current form values
- shows inline validation errors
- keeps a live summary sidebar visible on larger screens
- swaps to a success / review state after a valid submit

Use readable, product-like labels and helper text.

**Step 3: Style the component as a product surface**

Make the component look like a real B2B application screen:
- multi-column layout on desktop
- form on the left
- live summary / state panel on the right
- strong section hierarchy
- visible call-to-action buttons

Do not add backend calls.

**Step 4: Run the focused component test**

Run:
```bash
pnpm test src/components/demos/__tests__/workspace-onboarding-demo.test.tsx
```

Expected:
- pass

**Step 5: Commit the working demo component**

```bash
git add src/components/demos/workspace-onboarding-demo.tsx src/components/demos/__tests__/workspace-onboarding-demo.test.tsx
git commit -m "Show a realistic B2B onboarding flow inside the portfolio\n\nImplement one hardcoded dynamic-form demo with conditional sections, validation, and a live summary so the post can demonstrate product UX instead of just article styling.\n\nConstraint: No backend or persistence in the first showcase\nRejected: Fake API submission flow | adds noise without improving the portfolio proof point\nConfidence: high\nScope-risk: moderate\nDirective: Preserve this component as an opinionated showcase, not a generic form engine\nTested: Focused component test suite\nNot-tested: MDX embedding and page-level layout\n"`
```

### Task 3: Add a real full-width / viewport-style breakout block for post content

**Files:**
- Modify: `src/components/layout/full-width.tsx`
- Modify: `src/components/layout/demo-frame.tsx`
- Modify: `src/app/posts/[slug]/page.tsx`
- Modify: `src/app/posts/[slug]/__tests__/page.test.tsx`

**Step 1: Write or extend a page-level test for the full-width scenario**

Extend `src/app/posts/[slug]/__tests__/page.test.tsx` so it asserts:
- the full-layout post renders a distinct full-width marker / shell
- the content block for the demo is not using the narrow article wrapper only

**Step 2: Run the page test to confirm the intended behavior is not fully present yet**

Run:
```bash
pnpm test src/app/posts/[slug]/__tests__/page.test.tsx
```

Expected:
- fail if the layout marker or viewport-style demo block is not present yet

**Step 3: Implement the breakout treatment**

Update the layout helpers so a post can contain a more dramatic full-width section:
- support a true viewport-feeling breakout block
- preserve narrow reading layout before / after the block
- keep the post page accessible and readable on smaller screens

Do not move the whole article to a permanently wide layout; make the breakout intentional.

**Step 4: Re-run the page test**

Run:
```bash
pnpm test src/app/posts/[slug]/__tests__/page.test.tsx
```

Expected:
- pass

### Task 4: Expose the new demo to MDX and author the showcase post

**Files:**
- Modify: `src/components/mdx/mdx-content.tsx`
- Create: `content/posts/b2b-dynamic-onboarding.mdx`
- Optional modify: `src/lib/mdx.ts` (only if needed for ordering/filtering helpers)
- Modify: `src/app/posts/__tests__/page.test.tsx`

**Step 1: Write or extend the posts index test**

Update `src/app/posts/__tests__/page.test.tsx` so it covers the presence of the new post title and confirms posts still render correctly when multiple posts exist.

**Step 2: Run the posts index test**

Run:
```bash
pnpm test src/app/posts/__tests__/page.test.tsx
```

Expected:
- fail if the new scenario is not represented yet

**Step 3: Expose the showcase component to MDX**

Modify `src/components/mdx/mdx-content.tsx` to make `WorkspaceOnboardingDemo` available inside post content.

**Step 4: Author the new MDX post**

Create `content/posts/b2b-dynamic-onboarding.mdx` with:
- frontmatter using `layout: "full"`
- a short intro explaining the scenario
- a full-width breakout section containing `<WorkspaceOnboardingDemo />`
- a short breakdown explaining why RHF + Zod fit this flow

Keep the article concise and portfolio-oriented.

**Step 5: Re-run the posts test**

Run:
```bash
pnpm test src/app/posts/__tests__/page.test.tsx
```

Expected:
- pass

### Task 5: Add focused integration coverage for the new domain / post experience

**Files:**
- Modify: `src/app/domains/[domain]/__tests__/page.test.tsx`
- Optional modify: `src/data/projects.ts`

**Step 1: Update the domain showcase test to account for the new post**

Adjust the domain page test so it can validate that the B2B onboarding post appears in the relevant domain showcase (or at minimum does not break the gallery flow if the new post belongs to an existing domain such as `fixmyvibe`).

**Step 2: Run the domain test**

Run:
```bash
pnpm test src/app/domains/[domain]/__tests__/page.test.tsx
```

Expected:
- pass

**Step 3: Verify the user flow manually in the browser if needed**

Run:
```bash
pnpm dev
```

Check manually:
- `/posts`
- `/posts/b2b-dynamic-onboarding`
- `/domains/fixmyvibe` (or whichever domain owns the post)

Confirm the demo feels clearly larger than article-only content.

### Task 6: Sync docs and run full verification

**Files:**
- Modify: `README.md`
- Modify: `docs/2026-04-13-blog-re-plan-status.md`
- Modify: `docs/2026-04-13-blog-re-implementation-plan.md`

**Step 1: Update project docs**

Record that the repo now includes a dynamic-form showcase post and that full-width in-post demo scenarios are supported.

**Step 2: Run full verification**

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

If `contentlayer build` still prints the known non-fatal Node 22 / Clipanion error during prebuild while the final Next build succeeds, note it explicitly in the final report instead of treating it as a blocker.

**Step 3: Commit the integrated feature**

```bash
git add README.md docs/2026-04-13-blog-re-plan-status.md docs/2026-04-13-blog-re-implementation-plan.md content/posts/b2b-dynamic-onboarding.mdx src/components/mdx/mdx-content.tsx src/components/demos/workspace-onboarding-demo.tsx src/components/layout/full-width.tsx src/components/layout/demo-frame.tsx src/app/posts/[slug]/page.tsx src/app/posts/__tests__/page.test.tsx src/app/posts/[slug]/__tests__/page.test.tsx src/app/domains/[domain]/__tests__/page.test.tsx package.json pnpm-lock.yaml
git commit -m "Prove product-form capability inside post content\n\nAdd a full-width dynamic onboarding showcase so visitors can experience a realistic B2B form flow directly inside a post. The implementation stays intentionally hardcoded to maximize portfolio impact before any reusable scenario system is introduced.\n\nConstraint: The showcase must feel like a real web app while staying frontend-only\nRejected: Build a reusable scenario framework first | delays the clearest visitor-facing proof point\nConfidence: medium\nScope-risk: moderate\nDirective: If this grows beyond one showcase, extract shared patterns only after the second or third scenario exists\nTested: pnpm lint; pnpm test; pnpm build\nNot-tested: Real backend submission or persistence\n"`
```

### Task 7: Prepare execution handoff

**Files:**
- None required

**Step 1: Review the final diff**

Run:
```bash
git status --short
git diff --stat
```

Expected:
- only intended feature files changed

**Step 2: Hand off for execution**

Use `superpowers:executing-plans` in a separate execution flow if this plan is being implemented later.
