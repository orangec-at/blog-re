# Design Component System Refactor Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task. Do not implement broad visual polish directly in page files. Each task must preserve or improve component ownership and keep section files thin.

**Goal:** Refactor the FixMyVibe/blog-re design component system so all repeated marketing, proof, metric, CTA, and content surfaces are owned by named reusable components with DESIGN.md contracts, tests, and guardrails.

**Architecture:** `DESIGN.md` remains the design contract registry, `docs/design-system/ui-pattern-inventory.md` remains the ownership map, `src/components/ui/**` owns primitives/molecules, and `src/components/marketing/**` owns productized marketing components. Page/section components should only compose owners, select data, and manage layout.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest + Testing Library, Impeccable, `@google/design.md` lint.

---

## Non-goals

- Do not redesign the whole visual language in one pass.
- Do not add new Composio/Linear/Stripe-inspired decoration directly to page JSX.
- Do not chase Impeccable warnings to zero if they are false positives or make the UI worse.
- Do not touch deploy, Vercel, production domains, or paid/credential settings.
- Do not bulk delete legacy components until routing confirms they are unused.

## Required reading before implementation

- `DESIGN.md`
- `docs/design-system/ui-pattern-inventory.md`
- `src/components/home-redesign/home-hero.tsx`
- `src/components/home-redesign/services-preview-grid.tsx`
- `src/components/marketing/*.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/molecules/metric-card.tsx`
- `src/components/content/article-blocks.tsx`

## Global verification commands

Run after every phase:

```bash
pnpm design:ownership
npx -y @google/design.md lint DESIGN.md
pnpm test src/components/marketing/__tests__/marketing-cards.test.tsx
pnpm check
```

Run when a visible section changed:

```bash
pnpm design:audit:fast
pnpm build
```

Also attach screenshot evidence from the Evidence screenshot loop to the implementation summary before marking the phase complete.

Run URL audit only with a dev server:

```bash
pnpm dev
pnpm design:audit
```

## Evidence screenshot loop

Every implementation loop that changes visible UI must produce screenshot evidence before moving to the next loop. Do not rely only on tests, lint, or design-audit output.

Per visible loop:

1. Start or reuse the local dev server.
2. Capture the affected route before the change if a baseline screenshot is not already available.
3. Implement the task.
4. Capture the affected route after the change.
5. Save screenshots under:
   ```txt
   docs/design-system/evidence/YYYY-MM-DD/<phase-task>/<route>-before.png
   docs/design-system/evidence/YYYY-MM-DD/<phase-task>/<route>-after.png
   ```
6. Add a short note in the task summary:
   ```txt
   Evidence:
   - before: docs/design-system/evidence/...
   - after: docs/design-system/evidence/...
   - visual delta: one sentence
   - remaining risk: one sentence
   ```
7. If the screenshot shows a regression, stop and fix before continuing.

Minimum routes by phase:

- Phase 1: screenshot only if primitive changes visibly affect `/` or `/services`.
- Phase 2: `/` desktop and mobile after each hero extraction task.
- Phase 3: `/` desktop after services/section cleanup; mobile if layout changes.
- Phase 4: `/` desktop and mobile for marketing card family changes.
- Phase 5: one representative `/posts/...` page for article/content changes.
- Phase 6: affected page family route, e.g. `/services`, `/contact`, `/about`, `/domains`.
- Phase 7: full evidence set for `/`, `/services`, `/contact`, `/about`, and one representative post.

Preferred capture method:

- Browser screenshot via Hermes/browser tooling if available.
- If browser tooling cannot save files directly, use Playwright or an equivalent scripted browser capture and record the exact command in the implementation summary.

---

## Phase 0 — Baseline lock and safety

### Task 0.1: Capture current WIP boundary

**Objective:** Know exactly what existed before this refactor and avoid mixing unrelated WIP.

**Files:**
- Inspect only: git status and current changed files

**Steps:**

1. Run:
   ```bash
   git status --short
   git diff --stat
   ```
2. Note unrelated existing WIP in the implementation summary. Do not revert it.
3. If implementation will be committed, commit only coherent design-system refactor files. Do not include `.omx/**` unless explicitly intended.

**Expected:** Clear list of files touched by this refactor vs previous WIP.

### Task 0.2: Add a baseline visual/structure report

**Objective:** Record current component debt before modifying code.

**Files:**
- Modify: `docs/design-system/ui-pattern-inventory.md`

**Steps:**

1. Run source scan:
   ```bash
   python3 - <<'PY'
   import pathlib, re
   root = pathlib.Path('src/components')
   pat = re.compile(r'(rounded-|border-|bg-|shadow-|absolute|blur-|grid-cols-\[|#[0-9a-fA-F]{3,8})')
   counts = []
   for p in root.rglob('*.tsx'):
       text = p.read_text()
       n = len(pat.findall(text))
       if n:
           counts.append((n, str(p)))
   for n, p in sorted(counts, reverse=True)[:30]:
       print(f'{n:3} {p}')
   PY
   ```
2. Update the inventory “Current source-scan signals” if counts changed materially.
3. Do not fix anything in this task.

**Verification:** Inventory still matches actual code paths.

---

## Phase 1 — Foundation primitives convergence

### Task 1.1: Define Badge vs PillTag boundary

**Objective:** Stop agents from randomly choosing `Badge` or `PillTag`.

**Files:**
- Modify: `DESIGN.md`
- Modify: `docs/design-system/ui-pattern-inventory.md`
- Test: `src/components/ui/__tests__/foundation.test.tsx`

**Design decision:**

- `Badge`: compact labels inside shadcn-style `Card`/marketing components.
- `PillTag`: older/full pill classification in legacy sections or hero chip rows.
- New marketing cards must prefer `Badge` unless a full pill is explicitly required.

**Steps:**

1. Add/extend tests asserting `Badge` variants are compact and do not stretch full width.
2. Update `DESIGN.md` Pill Tag / Badge section with the usage boundary.
3. Update inventory `Badge` / `PillTag` entries.
4. Run:
   ```bash
   pnpm test src/components/ui/__tests__/foundation.test.tsx
   pnpm design:ownership
   ```

**Expected:** New UI work has a documented label primitive choice.

**Evidence:** If the primitive class change is visible on `/` or `/services`, capture before/after screenshots according to the Evidence screenshot loop.

### Task 1.2: Remove accidental orange from new Stripe-direction labels

**Objective:** Prevent old Zapier orange from leaking into new component contracts unless intentional.

**Files:**
- Modify: `src/components/ui/badge.tsx`
- Modify: `DESIGN.md` if color role changes
- Test: `src/components/ui/__tests__/foundation.test.tsx`

**Steps:**

1. Inspect current `Badge` variants.
2. If `variant="label"` uses `text-zapier-orange`, change it to the Stripe-direction primary purple or navy token class.
3. Update tests to assert label/accent variants render the intended classes.
4. Run:
   ```bash
   pnpm test src/components/ui/__tests__/foundation.test.tsx
   pnpm check
   ```

**Expected:** New `Badge` variants no longer accidentally imply the old Zapier design direction.

**Evidence:** Capture before/after screenshots for at least one route where `Badge` is visible, usually `/` or `/services`.

### Task 1.3: Converge ProofMetricCard and MetricCard intentionally

**Objective:** Avoid two metric implementations drifting.

**Files:**
- Modify: `src/components/marketing/proof-metric-card.tsx`
- Maybe modify: `src/components/ui/molecules/metric-card.tsx`
- Test: `src/components/marketing/__tests__/marketing-cards.test.tsx`
- Modify: `DESIGN.md`
- Modify: `docs/design-system/ui-pattern-inventory.md`

**Preferred approach:** `ProofMetricCard` should become a thin semantic wrapper around the generic metric primitive if visual output can remain acceptable.

**Steps:**

1. Add test that `ProofMetricCard` renders value then label and has no links/buttons/badges.
2. Refactor `ProofMetricCard` to use `MetricCard` if possible.
3. If the generic `MetricCard` visual is too legacy, add a minimal variant to `MetricCard` instead of keeping two unrelated shells.
4. Update DESIGN.md ownership note: `ProofMetricCard` is semantic wrapper over `MetricCard`, or document why not.
5. Run:
   ```bash
   pnpm test src/components/marketing/__tests__/marketing-cards.test.tsx src/components/ui/__tests__/molecules.test.tsx
   pnpm check
   ```

**Expected:** Metric ownership is explicit; no duplicated metric shell logic.

**Evidence:** Capture before/after screenshots of `/` around the proof metric strip if rendered output changes.

### Task 1.4: Standardize Card shell roles

**Objective:** Make `Card`, `FeatureCard`, `BorderedSurface`, and `PanelSurface` usage boundaries clear.

**Files:**
- Modify: `DESIGN.md`
- Modify: `docs/design-system/ui-pattern-inventory.md`
- Maybe modify tests: `src/components/ui/__tests__/molecules.test.tsx`, `src/components/ui/__tests__/foundation.test.tsx`

**Boundary:**

- `Card`: new shadcn-style marketing cards.
- `FeatureCard`: generic legacy feature card.
- `BorderedSurface` / `PanelSurface`: legacy or broad content surfaces.
- New repeated cards must not be page-local shells.

**Steps:**

1. Update docs with exact usage boundary.
2. Add a small test if any component lacks baseline render coverage.
3. Run:
   ```bash
   pnpm test src/components/ui/__tests__/foundation.test.tsx src/components/ui/__tests__/molecules.test.tsx
   ```

**Expected:** Future work knows which surface primitive to use.

---

## Phase 2 — Home hero extraction

### Task 2.1: Extract DiagnosticPriorityGrid

**Objective:** Remove priority row/grid internals from `home-hero.tsx`.

**Files:**
- Create: `src/components/marketing/diagnostic-priority-grid.tsx`
- Test: `src/components/marketing/__tests__/diagnostic-priority-grid.test.tsx`
- Modify: `src/components/home-redesign/home-hero.tsx`
- Modify: `DESIGN.md`
- Modify: `docs/design-system/ui-pattern-inventory.md`
- Modify: `scripts/check-design-ownership.mjs` if this becomes a required owner

**Component API:**

```ts
type DiagnosticPriority = {
  label: string;
  name: string;
  value: string;
};

export function DiagnosticPriorityGrid({ items }: { items: DiagnosticPriority[] }) { ... }
```

**Steps:**

1. Write failing test for three priority rows: P0/P1/P2 labels, names, values.
2. Create component with current visual classes moved from `home-hero.tsx`.
3. Replace inline priority grid in `home-hero.tsx` with `<DiagnosticPriorityGrid items={auditRows} />`.
4. Add ownership contract to DESIGN.md under Diagnostic Console Panel or a new Diagnostic Priority Grid section.
5. Update inventory.
6. Run:
   ```bash
   pnpm test src/components/marketing/__tests__/diagnostic-priority-grid.test.tsx src/components/home-redesign/__tests__/home-hero.test.tsx
   pnpm design:ownership
   pnpm check
   ```

**Expected:** Hero loses one inline dashboard-like visual block.

**Evidence:** Capture `/` desktop and mobile before/after screenshots for this task. The visual delta should be “no intentional visual change; markup moved behind owner component” unless the component contract explicitly improves spacing.

### Task 2.2: Extract AuditScopeList

**Objective:** Remove diagnostic scope row internals from `home-hero.tsx`.

**Files:**
- Create: `src/components/marketing/audit-scope-list.tsx`
- Test: `src/components/marketing/__tests__/audit-scope-list.test.tsx`
- Modify: `src/components/home-redesign/home-hero.tsx`
- Modify: `DESIGN.md`
- Modify: `docs/design-system/ui-pattern-inventory.md`

**Component API:**

```ts
type AuditScopeItem = {
  title: string;
  detail: string;
};

export function AuditScopeList({ items, title = '진단 범위' }: { items: AuditScopeItem[]; title?: string }) { ... }
```

**Steps:**

1. Write failing test for section title, numbered items, item details.
2. Move current `진단 범위` markup into the component.
3. Replace inline scope section in `home-hero.tsx`.
4. Update DESIGN.md and inventory.
5. Run:
   ```bash
   pnpm test src/components/marketing/__tests__/audit-scope-list.test.tsx src/components/home-redesign/__tests__/home-hero.test.tsx
   pnpm check
   ```

**Expected:** Home hero becomes mostly composition of `ConsolePanel`, `DiagnosticPriorityGrid`, `SignalList`, `AuditScopeList`, and `CTAGroup`.

**Evidence:** Capture `/` desktop and mobile before/after screenshots for this task. The visual delta should be documented explicitly, even if it is intended to be unchanged.

### Task 2.3: Add hero composition guard test

**Objective:** Lock in the “thin hero” architecture.

**Files:**
- Modify: `src/components/home-redesign/__tests__/home-hero.test.tsx`

**Steps:**

1. Add assertions that hero still renders: main headline, CTA group actions, console heading, priority labels, scope heading, outcome heading.
2. Keep the test behavior-oriented, not class-string based.
3. Run:
   ```bash
   pnpm test src/components/home-redesign/__tests__/home-hero.test.tsx
   ```

**Expected:** Refactors preserve hero content while allowing internals to move into owner components.

---

## Phase 3 — Section intro and chooser-note cleanup

### Task 3.1: Decide and implement Services chooser note ownership

**Objective:** Remove the last section-local card-like note from `services-preview-grid.tsx`.

**Files:**
- Preferred create: `src/components/marketing/chooser-note-card.tsx`
- Preferred test: `src/components/marketing/__tests__/chooser-note-card.test.tsx`
- Modify: `src/components/home-redesign/services-preview-grid.tsx`
- Modify: `DESIGN.md`
- Modify: `docs/design-system/ui-pattern-inventory.md`

**Decision rule:**

- If chooser note is a reusable pattern, create `ChooserNoteCard`.
- If it is only a section aside, use `SectionIntro` `aside` instead and remove the extra `Card`.

**Preferred approach:** Create `ChooserNoteCard` only if the same pattern will appear on services/contact pages. Otherwise, convert to `SectionIntro` aside.

**Steps:**

1. Inspect services/contact pages for similar chooser/advisory notes.
2. Pick one approach and document the decision in inventory.
3. Write/adjust test for `ServicesPreviewGrid` to preserve chooser note text.
4. Refactor.
5. Run:
   ```bash
   pnpm test src/app/__tests__/home-page.test.tsx
   pnpm check
   ```

**Expected:** Services preview section no longer owns an ad-hoc card shell.

**Evidence:** Capture `/` desktop before/after screenshots focused on the services preview area. Capture mobile too if the section layout changes.

### Task 3.2: Adopt SectionIntro where it reduces duplication

**Objective:** Use the existing `SectionIntro` owner for repeated eyebrow/title/body section headers without hiding unique copy.

**Files:**
- Modify candidates:
  - `src/components/home-redesign/featured-insight-row.tsx`
  - `src/components/home-redesign/pain-point-grid.tsx`
  - `src/components/home-redesign/proof-stat-strip.tsx`
  - `src/components/home-redesign/services-preview-grid.tsx`
- Tests: existing home/app tests

**Steps:**

1. For each section, compare current intro shape to `SectionIntro` API.
2. Refactor only sections where output remains equivalent and code gets thinner.
3. Do not force `SectionIntro` if the custom grid layout is clearer.
4. Run:
   ```bash
   pnpm test src/app/__tests__/home-page.test.tsx
   pnpm check
   ```

**Expected:** Repeated intro scaffolding reduces, but layout intent stays clear.

**Evidence:** Capture `/` desktop before/after screenshots. Capture mobile if section spacing, stacking, or line wrapping changes.

---

## Phase 4 — Marketing card visual consistency pass

### Task 4.1: Normalize marketing card typography and spacing

**Objective:** Make `ServicePackageCard`, `ProofArtifactCard`, `PainSignalCard`, and `ProofMetricCard` feel like one family.

**Files:**
- Modify:
  - `src/components/marketing/service-package-card.tsx`
  - `src/components/marketing/proof-artifact-card.tsx`
  - `src/components/marketing/pain-signal-card.tsx`
  - `src/components/marketing/proof-metric-card.tsx`
- Test: `src/components/marketing/__tests__/marketing-cards.test.tsx`
- Maybe modify: `src/components/ui/card.tsx`, `src/components/ui/badge.tsx`

**Rules:**

- Use the same card shell strategy.
- Keep required content order from DESIGN.md.
- Avoid nested cards, fake dashboards, decorative progress rows.
- Keep Korean/English headings from wrapping awkwardly.

**Steps:**

1. Add/strengthen tests for content order using `getByText` positions where practical.
2. Normalize shared spacing via `CardHeader`, `CardContent`, `CardFooter`, `Separator`.
3. Move common repeated row pattern into a helper component only if it appears twice within marketing cards.
4. Run:
   ```bash
   pnpm test src/components/marketing/__tests__/marketing-cards.test.tsx
   pnpm design:audit:fast
   pnpm check
   ```

**Expected:** Cards look and behave as a coherent system, not four separate one-offs.

**Evidence:** Capture `/` desktop and mobile before/after screenshots covering service cards, proof cards, pain cards, and metric strip. If one screenshot cannot show all cards, capture multiple scroll positions under the same phase-task folder.

### Task 4.2: Add structural anti-slop check for page-local cards

**Objective:** Catch future page-local card shells before review.

**Files:**
- Create or modify: `scripts/check-design-ownership.mjs`
- Maybe add script: `package.json`

**Approach:** Extend `design:ownership` with a conservative scan that reports, not necessarily fails at first, if section files contain suspicious repeated `rounded-* border bg-* shadow-*` combos.

**Steps:**

1. Scan only high-risk directories first:
   - `src/components/home-redesign/**`
   - `src/app/**`
2. Allowlist known owner files and acceptable layout wrappers.
3. Initially print warnings instead of failing, unless the pattern is clearly forbidden.
4. Document allowlist in script comments.
5. Run:
   ```bash
   pnpm design:ownership
   ```

**Expected:** We get a maintainable guard without blocking legitimate layout work.

---

## Phase 5 — Content/article component inventory and extraction

### Task 5.1: Inventory content component patterns

**Objective:** Handle `article-blocks.tsx` separately instead of treating article components as marketing cards.

**Files:**
- Create: `docs/design-system/content-pattern-inventory.md`
- Inspect:
  - `src/components/content/article-blocks.tsx`
  - `src/components/content/post-use-case-hero.tsx`
  - `src/components/content/post-conversion-rail.tsx`
  - `src/components/mdx/article-components.tsx`

**Steps:**

1. List content-specific patterns: callout, checklist, article section, conversion rail, post hero, use-case block.
2. Mark owner component for each.
3. Mark which classes are legitimate content layout vs removable one-off visual styling.
4. Do not refactor in this task.

**Expected:** Content system has its own ownership map.

### Task 5.2: Extract repeated article surfaces if needed

**Objective:** Reduce direct visual classes in article/content components only after inventory.

**Files:**
- Modify based on Task 5.1 findings.
- Tests:
  - `src/components/content/__tests__/article-blocks.test.tsx`
  - `src/components/content/__tests__/post-conversion-rail.test.tsx`
  - `src/components/mdx/__tests__/mdx-content.test.tsx`

**Steps:**

1. Pick one repeated content pattern only.
2. Write failing/strengthened test for that pattern.
3. Extract owner component or primitive.
4. Update content inventory and, if reusable broadly, DESIGN.md.
5. Run targeted tests and `pnpm check`.

**Expected:** Article/content cleanup is deliberate, not a blind class purge.

**Evidence:** Capture a representative `/posts/...` desktop screenshot before/after each visible content component extraction. Capture mobile when article reading width or conversion rail layout changes.

---

## Phase 6 — Services/about/contact page alignment

### Task 6.1: Scan page section components for local cards/CTAs

**Objective:** Extend the component-first cleanup beyond Home.

**Files to inspect:**

- `src/components/services/*.tsx`
- `src/components/about/*.tsx`
- `src/components/contact/*.tsx`
- `src/components/domains/*.tsx`

**Steps:**

1. Run source scan limited to these directories.
2. Classify findings as:
   - legitimate section layout
   - should use existing primitive
   - should become new owner component
3. Update `docs/design-system/ui-pattern-inventory.md` with P2/P3 queue.

**Expected:** We know the next wave before touching code.

### Task 6.2: Refactor one page family at a time

**Objective:** Avoid massive risky rewrites.

**Order:**

1. Services page
2. Contact page
3. About page
4. Domains page

**Steps per page family:**

1. Strengthen/confirm page test.
2. Replace local card/CTA/badge patterns with existing owner components.
3. Create new owner component only if pattern repeats or has durable product meaning.
4. Update DESIGN.md/inventory for every new owner.
5. Run the page test and `pnpm check`.

**Expected:** Pages get thinner gradually with no routing/content regression.

**Evidence:** Capture before/after screenshots for the affected route in each page family. Required minimum: desktop for every affected route; mobile if layout/stacks changed.

---

## Phase 7 — Visual QA and final polish

### Task 7.1: Run rendered audit and classify findings

**Objective:** Separate real design problems from detector false positives.

**Precondition:** Local dev server running.

**Commands:**

```bash
pnpm dev
pnpm design:audit
pnpm design:audit:fast
```

**Steps:**

1. Record findings in implementation summary.
2. Classify each as real/advisory/false positive.
3. Fix only real issues that map to component contracts.
4. Do not add page-local styling to silence warnings.

**Expected:** Remaining warnings are understood.

### Task 7.2: Screenshot review

**Objective:** Verify actual visual result, not only tests.

**Pages:**

- `/`
- `/services`
- `/contact`
- `/about`
- representative `/posts/...`

**Steps:**

1. Capture desktop screenshots.
2. Capture mobile screenshots for the home page and one content page.
3. Check:
   - card family consistency
   - no accidental nested mini-cards
   - readable body copy
   - no old orange leakage unless intentional
   - CTA hierarchy clear
   - page files stayed thinner

**Expected:** Visual deltas are visible and aligned with DESIGN.md.

---

## Final acceptance criteria

The refactor is complete when:

- `DESIGN.md` names owner paths for all durable repeated visual patterns touched.
- `docs/design-system/ui-pattern-inventory.md` is updated with current ownership and migration status.
- Home hero no longer owns diagnostic grid/scope visual internals inline.
- Services chooser note has a documented owner or is folded into `SectionIntro` intentionally.
- `Badge` vs `PillTag`, `Card` vs `FeatureCard`/`BorderedSurface`, and `ProofMetricCard` vs `MetricCard` boundaries are documented.
- Marketing card tests cover all accepted card contracts.
- `pnpm design:ownership` passes.
- `npx -y @google/design.md lint DESIGN.md` passes with 0 errors/warnings.
- `pnpm check` passes.
- `pnpm design:audit:fast` has no unclassified real issues.
- Any URL audit false positives are documented instead of blindly patched.
- Every visible implementation loop has before/after screenshot evidence saved under `docs/design-system/evidence/YYYY-MM-DD/<phase-task>/` or a written explanation for why no visible screenshot was required.

## Suggested commit boundaries

1. `docs: add design component refactor plan`
2. `refactor: clarify design primitive ownership`
3. `refactor: extract diagnostic hero components`
4. `refactor: thin home redesign sections`
5. `refactor: normalize marketing card components`
6. `docs: inventory content component patterns`
7. `test: add design ownership guardrails`

Do not squash into one huge commit unless Jaeil asks.
