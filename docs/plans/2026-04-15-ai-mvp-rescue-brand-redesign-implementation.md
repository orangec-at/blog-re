# AI MVP Rescue Brand Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the current site into an AI-built MVP rescue brand with a reusable atomic design system and new Home/Services/Contact-led conversion flow.

**Architecture:** Keep the current Next.js App Router + typed data + MDX structure, but insert a proper design-system layer under `src/components/ui/` and rebuild the priority pages on top of those shared primitives. Existing MDX posts and proof assets remain in place and are reused as supporting content instead of being migrated to a new CMS.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Contentlayer MDX, Vitest, Testing Library.

---

### Task 1: Add route tests that lock the new Home / Services / Contact conversion goals

**Files:**
- Create: `src/app/services/__tests__/page.test.tsx`
- Create: `src/app/contact/__tests__/page.test.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`

**Step 1: Write the failing Home test changes**

Update `src/app/__tests__/home-page.test.tsx` so it verifies the new strategic content instead of the current generic homepage sections. At minimum assert:
- the AI MVP rescue headline direction
- a visible CTA toward Services or FMV Diagnosis
- a visible pain-point/proof/service-preview presence

Keep the test focused on visitor-visible content, not implementation details.

**Step 2: Write the failing Services route test**

Create `src/app/services/__tests__/page.test.tsx` covering:
- page hero
- all three services (FMV Diagnosis, Architecture Fix, Virtual CTO)
- a clear “start with diagnosis” or service-choice affordance
- at least one CTA toward contact/diagnosis

**Step 3: Write the failing Contact route test**

Create `src/app/contact/__tests__/page.test.tsx` covering:
- contact hero
- “when to contact us” guidance
- form presence
- a reassurance statement about diagnosis being the starting point

**Step 4: Run the targeted tests to confirm RED**

Run:
```bash
pnpm test src/app/__tests__/home-page.test.tsx
pnpm test src/app/services/__tests__/page.test.tsx
pnpm test src/app/contact/__tests__/page.test.tsx
```

Expected:
- Home test fails on missing/new messaging
- Services and Contact tests fail because those routes do not exist yet

**Step 5: Commit the RED tests**

```bash
git add src/app/__tests__/home-page.test.tsx src/app/services/__tests__/page.test.tsx src/app/contact/__tests__/page.test.tsx
git commit -m "Define the conversion pages before redesigning them

Lock the new Home, Services, and Contact behavior with failing tests so the redesign can be implemented against explicit visitor-facing outcomes.

Constraint: The redesign must improve the conversion path without replacing the MDX/content architecture
Rejected: Start styling pages before tests exist | too easy to drift into visual changes without message discipline
Confidence: high
Scope-risk: narrow
Directive: Keep route tests centered on visitor-facing messaging and CTA paths, not layout internals
Tested: Targeted route tests fail as expected
Not-tested: Route implementations
"`
```

### Task 2: Create the atomic-design foundation layer under `src/components/ui/`

**Files:**
- Create: `src/components/ui/typography/eyebrow.tsx`
- Create: `src/components/ui/typography/display-heading.tsx`
- Create: `src/components/ui/typography/section-heading.tsx`
- Create: `src/components/ui/typography/body-text.tsx`
- Create: `src/components/ui/actions/primary-button.tsx`
- Create: `src/components/ui/actions/secondary-button.tsx`
- Create: `src/components/ui/actions/text-link.tsx`
- Create: `src/components/ui/surfaces/bordered-surface.tsx`
- Create: `src/components/ui/feedback/pill-tag.tsx`
- Create: `src/components/ui/__tests__/foundation.test.tsx`

**Step 1: Write the failing foundation test**

Create `src/components/ui/__tests__/foundation.test.tsx` to verify:
- typography primitives render semantic text correctly
- CTA primitives render accessible links/buttons
- bordered surface/tag primitives render children/content predictably

Do not snapshot the whole markup. Assert on accessible roles and key class-bearing behavior only where necessary.

**Step 2: Run the foundation test to verify RED**

Run:
```bash
pnpm test src/components/ui/__tests__/foundation.test.tsx
```

Expected:
- fail because the new primitives do not exist yet

**Step 3: Implement the atoms**

Create the foundation components with APIs intentionally small and reusable. Keep styling aligned with `DESIGN.md`:
- warm cream / off-white surfaces
- border-first containment
- Zapier orange CTA emphasis
- typography roles separated by intent, not by page

**Step 4: Re-run the foundation test**

Run:
```bash
pnpm test src/components/ui/__tests__/foundation.test.tsx
```

Expected:
- pass

**Step 5: Commit the foundation layer**

```bash
git add src/components/ui
git commit -m "Create the shared foundation for the brand redesign

Add typography, CTA, and surface primitives so the redesign can be composed from reusable system parts instead of one-off section styling.

Constraint: Stay close to the existing DESIGN.md visual language and avoid a second design system
Rejected: Rebuild existing organisms first | would keep the page-specific duplication in place
Confidence: high
Scope-risk: moderate
Directive: New primitives should be generic by role, not named after specific pages
Tested: pnpm test src/components/ui/__tests__/foundation.test.tsx
Not-tested: Page-level integration
"`
```

### Task 3: Add shared molecules for card headers, CTA groups, metrics, and form fields

**Files:**
- Create: `src/components/ui/molecules/card-header.tsx`
- Create: `src/components/ui/molecules/cta-group.tsx`
- Create: `src/components/ui/molecules/metric-card.tsx`
- Create: `src/components/ui/molecules/feature-card.tsx`
- Create: `src/components/ui/molecules/problem-solution-pair.tsx`
- Create: `src/components/ui/forms/form-field.tsx`
- Create: `src/components/ui/__tests__/molecules.test.tsx`

**Step 1: Write the failing molecule test**

Cover:
- card header renders eyebrow/title/body combinations
- CTA group renders primary/secondary actions in one place
- metric card renders value + label
- problem/solution pair renders both sides clearly
- form field renders label + control + error slot

**Step 2: Run RED**

Run:
```bash
pnpm test src/components/ui/__tests__/molecules.test.tsx
```

Expected:
- fail because molecules do not exist yet

**Step 3: Implement the molecules**

Build the molecules on top of the new atoms. Keep APIs deliberately narrow and reusable.

**Step 4: Run GREEN**

Run:
```bash
pnpm test src/components/ui/__tests__/molecules.test.tsx
```

Expected:
- pass

**Step 5: Commit the molecules**

```bash
git add src/components/ui
git commit -m "Add reusable composition blocks for the redesign

Create shared card, CTA, proof, and form molecules so the priority pages can be rebuilt without introducing more page-specific fragments.

Constraint: Molecules must stay small enough to be reused across Home, Services, Contact, and Resources
Rejected: One big generic card component for everything | too vague and hard to reason about
Confidence: high
Scope-risk: moderate
Directive: Prefer a small set of strongly typed molecules over a single ultra-configurable abstraction
Tested: pnpm test src/components/ui/__tests__/molecules.test.tsx
Not-tested: Full page assembly
"`
```

### Task 4: Add typed content modules for Home, Services, About, and Contact

**Files:**
- Create: `src/data/home-redesign-content.ts`
- Create: `src/data/services-content.ts`
- Create: `src/data/about-content.ts`
- Create: `src/data/contact-content.ts`
- Create: `src/data/__tests__/redesign-content.test.ts`

**Step 1: Write the failing typed-data test**

Verify the new data modules contain:
- the agreed AI MVP rescue positioning
- the three services
- a short About snapshot
- contact guidance messaging

**Step 2: Run RED**

Run:
```bash
pnpm test src/data/__tests__/redesign-content.test.ts
```

Expected:
- fail because the new content modules do not exist yet

**Step 3: Implement the typed data files**

Move the new messaging into typed content modules instead of hardcoding it directly in route files.

**Step 4: Run GREEN**

Run:
```bash
pnpm test src/data/__tests__/redesign-content.test.ts
```

Expected:
- pass

**Step 5: Commit the content modules**

```bash
git add src/data
git commit -m "Move the new brand messaging into typed content modules

Capture the AI MVP rescue messaging in data files so page composition can change without scattering core positioning copy across multiple routes.

Constraint: Keep MDX for long-form proof content and use typed data for conversion pages
Rejected: Hardcode all redesign copy directly inside page components | makes iteration slower and less reliable
Confidence: high
Scope-risk: narrow
Directive: Conversion-page copy belongs in typed data unless it becomes long-form editorial content
Tested: pnpm test src/data/__tests__/redesign-content.test.ts
Not-tested: Route integration
"`
```

### Task 5: Rebuild the Home page on top of the new system

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/home-redesign/home-hero.tsx`
- Create: `src/components/home-redesign/pain-point-grid.tsx`
- Create: `src/components/home-redesign/proof-stat-strip.tsx`
- Create: `src/components/home-redesign/services-preview-grid.tsx`
- Create: `src/components/home-redesign/featured-insight-row.tsx`
- Reuse or adapt existing home sections only if they fit the new message
- Modify: `src/app/__tests__/home-page.test.tsx`

**Step 1: Use the existing failing Home test as the contract**

Do not add implementation before the updated Home test is red for the intended reasons.

**Step 2: Build the new home organisms from shared atoms/molecules**

The page should include:
- hero with AI MVP rescue headline
- pain point section
- proof/result section
- services preview
- featured proof content links
- final CTA path toward services/contact/resources

**Step 3: Run the Home test**

Run:
```bash
pnpm test src/app/__tests__/home-page.test.tsx
```

Expected:
- pass

**Step 4: Add/adjust focused subcomponent tests only where needed**

If a new home organism contains non-trivial conditional behavior, add a focused test in `src/components/home-redesign/__tests__/`.

**Step 5: Commit the new Home page**

```bash
git add src/app/page.tsx src/components/home-redesign src/app/__tests__/home-page.test.tsx
git commit -m "Make the homepage say what the business actually sells

Rebuild the Home page around AI-built MVP rescue, proof, and service routing so the first screen finally matches the sales narrative.

Constraint: Keep the page grounded in the existing design system rather than introducing a second visual language
Rejected: Cosmetic hero copy swap without structural changes | not enough to fix the conversion path
Confidence: medium
Scope-risk: moderate
Directive: Home should route visitors to Services and Contact first, while using proof content only as support
Tested: pnpm test src/app/__tests__/home-page.test.tsx
Not-tested: Full app verification
"`
```

### Task 6: Build the Services page and service-selection flow

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/components/services/services-hero.tsx`
- Create: `src/components/services/service-decision-grid.tsx`
- Create: `src/components/services/service-detail-section.tsx`
- Create: `src/components/services/final-services-cta.tsx`
- Modify: `src/app/services/__tests__/page.test.tsx`

**Step 1: Use the failing Services test as the contract**

Ensure the test covers all three services and a diagnosis-first recommendation.

**Step 2: Implement the route**

The page should include:
- services hero
- “start here” chooser
- FMV Diagnosis section
- Architecture Fix section
- Virtual CTO section
- proof/supporting content links
- final CTA that points uncertain visitors back to diagnosis

**Step 3: Run GREEN**

Run:
```bash
pnpm test src/app/services/__tests__/page.test.tsx
```

Expected:
- pass

**Step 4: Commit**

```bash
git add src/app/services src/components/services
git commit -m "Turn the offers into a real service selection page

Build the Services page so founders can understand which engagement fits their situation instead of reading a generic service list.

Constraint: Keep FMV Diagnosis as the lowest-friction entry point
Rejected: Equal-weight service cards with no decision logic | weaker conversion for uncertain visitors
Confidence: medium
Scope-risk: moderate
Directive: Services should feel like a buyer guide, not a brochure
Tested: pnpm test src/app/services/__tests__/page.test.tsx
Not-tested: Full app verification
"`
```

### Task 7: Build the Contact page and inquiry flow shell

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/components/contact/contact-hero.tsx`
- Create: `src/components/contact/when-to-contact-us.tsx`
- Create: `src/components/contact/inquiry-form-shell.tsx`
- Create: `src/components/contact/reassurance-note.tsx`
- Modify: `src/app/contact/__tests__/page.test.tsx`

**Step 1: Use the failing Contact test as the contract**

**Step 2: Implement the route with the minimum viable contact structure**

Required content:
- contact hero
- “when to contact us” guidance
- inquiry form shell (even if submission handling is not yet wired)
- reassurance note that diagnosis is the right start when uncertain

**Step 3: Run GREEN**

Run:
```bash
pnpm test src/app/contact/__tests__/page.test.tsx
```

Expected:
- pass

**Step 4: Commit**

```bash
git add src/app/contact src/components/contact
git commit -m "Make the contact page feel like a diagnosis starting point

Replace the generic contact destination with a founder-friendly conversion page that explains when to reach out and lowers friction around starting with diagnosis.

Constraint: Do not overbuild form handling before the page structure is validated
Rejected: Long enterprise contact form from the start | too much friction for early leads
Confidence: medium
Scope-risk: moderate
Directive: Contact should feel like the start of a working session, not a cold sales form
Tested: pnpm test src/app/contact/__tests__/page.test.tsx
Not-tested: Real submission backend
"`
```

### Task 8: Add the short About page and reposition the blog index copy

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/components/about/about-hero.tsx`
- Create: `src/components/about/team-snapshot.tsx`
- Create: `src/components/about/why-we-work-this-way.tsx`
- Modify: `src/app/posts/page.tsx`
- Optional create: `src/app/about/__tests__/page.test.tsx`

**Step 1: Write a failing About route test if needed**

Keep it small. Assert:
- short team snapshot exists
- architecture + PM communication advantage is stated
- CTA present

**Step 2: Implement About as a short trust page**

Do not turn it into a long founder-story page.

**Step 3: Update blog/posts index copy**

Reposition the posts page as founder-facing technical insight, not a generic engineering blog.

**Step 4: Run targeted tests**

Run the About test (if created) and any affected posts-page test.

**Step 5: Commit**

```bash
git add src/app/about src/components/about src/app/posts/page.tsx src/app/about/__tests__/page.test.tsx src/app/posts/__tests__/page.test.tsx
git commit -m "Align the trust pages with the new positioning

Add a short About page and shift the blog index copy so the supporting pages reinforce the AI MVP rescue story instead of reading like a generic portfolio site.

Constraint: Keep About intentionally short in the first redesign wave
Rejected: Full company-story rewrite | lower priority than the conversion pages
Confidence: medium
Scope-risk: narrow
Directive: Treat About and Blog as support pages for the sales narrative, not separate brand universes
Tested: Targeted route tests
Not-tested: Full app verification
"`
```

### Task 9: Refactor existing organisms to consume shared primitives where it matters most

**Files:**
- Modify selected existing components only where duplication is highest:
  - `src/components/home/contact-cta.tsx`
  - `src/components/domains/domain-hero.tsx`
  - `src/components/domains/demo-gallery.tsx`
  - `src/components/layout/demo-frame.tsx`
- Add/update focused tests if public behavior changes

**Step 1: Identify the smallest worthwhile refactor set**

Do not boil the ocean. Refactor only the components that most clearly duplicate the new card/header/CTA patterns.

**Step 2: Replace duplicated structure with shared atoms/molecules**

Keep markup/accessibility behavior stable.

**Step 3: Run affected tests**

Run only the tests for the touched components/routes first, then defer the full suite to Task 10.

**Step 4: Commit**

```bash
git add src/components/home/contact-cta.tsx src/components/domains/domain-hero.tsx src/components/domains/demo-gallery.tsx src/components/layout/demo-frame.tsx
git commit -m "Reduce organism-level duplication in the existing site

Refactor the highest-value existing sections to consume the new shared primitives so the redesign system starts paying down the current card/CTA fragmentation.

Constraint: Avoid a full component-directory rewrite in one pass
Rejected: Leave every legacy section untouched | would keep the system split between old and new composition models
Confidence: medium
Scope-risk: moderate
Directive: Refactor only where the shared primitives make the code simpler, not just more abstract
Tested: Targeted component/route tests
Not-tested: Full app verification
"`
```

### Task 10: Sync docs and run full verification

**Files:**
- Modify: `README.md`
- Modify: `docs/2026-04-13-blog-re-plan-status.md`
- Modify: `docs/2026-04-13-blog-re-implementation-plan.md`
- Optional create/update: design-note docs if useful

**Step 1: Update docs to match the redesign slice**

Record:
- AI MVP rescue positioning shift
- new conversion pages
- atomic-design foundation work
- portfolio still progressive / partial

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

If the known `contentlayer build` Node/Clipanion warning still appears while the final build succeeds, record it as a non-blocking caveat.

**Step 3: Commit the verified redesign slice**

```bash
git add README.md docs src package.json pnpm-lock.yaml
git commit -m "Shift the site to the AI MVP rescue story

Complete the first redesign wave: shared design-system foundations, new conversion pages, updated messaging, and route structure that match the actual business model.

Constraint: The redesign must preserve working MDX proof content while changing the conversion narrative
Rejected: Full site rewrite with no reuse of current assets | unnecessary risk and waste
Confidence: medium
Scope-risk: broad
Directive: Future pages should be composed from the shared system first, with page-specific organisms only where the system genuinely cannot express the need
Tested: pnpm lint; pnpm test; pnpm build
Not-tested: Manual visual QA across every page and viewport
"`
```

### Task 11: Prepare execution handoff

**Files:**
- None required

**Step 1: Review final working tree**

Run:
```bash
git status --short
git diff --stat
```

Expected:
- only intended redesign files changed

**Step 2: Hand off**

Use `superpowers:executing-plans` in a separate run or continue with subagent-driven execution in the current worktree.
