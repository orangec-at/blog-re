# UI Pattern Inventory

Purpose: keep FixMyVibe design work component-first. This is the working map between `DESIGN.md`, reusable implementation components, and page/section usage. If a visual pattern appears in more than one place, improve or create the named owner component instead of adding page-local Tailwind markup.

Last updated: 2026-08-26

## Current architecture rule

- `DESIGN.md` owns the visual contracts and prohibited patterns.
- `src/components/ui/**` owns primitives and low-level molecules.
- `src/components/services/**`, `src/components/content/**`, `src/app/**` should compose existing components and own only data selection, section order, and responsive layout.

## Pattern ownership map

### Report components

These four own the sample audit report, the only page that renders a deliverable rather than
describing one. Contracts are in `DESIGN.md` > Component contracts > Report components.

- `ReportMeta`
  - Owner: `src/components/content/report-blocks.tsx`
  - Role: the report's cover block — product, audit type, date, preparer, status, and the sample notice.
  - Used by: `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`.
  - Status: accepted owner; the sample notice is a standing approval boundary, not a style choice.

- `ReportSection`
  - Owner: `src/components/content/report-blocks.tsx`
  - Role: one numbered section `01`–`12` — mono locator, `--font-display` heading, body.
  - Used by: `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`.
  - Status: accepted owner; do not start a report section any other way.

- `ReportTable`
  - Owner: `src/components/content/report-blocks.tsx`
  - Role: every table in the report, with verdict colour confined to declared columns.
  - Used by: `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`.
  - Status: accepted owner. This is the one place on the site where "colour means a verdict" is literally true.

- `ReportList`
  - Owner: `src/components/content/report-blocks.tsx`
  - Role: a named list inside a section — checks, tasks, evidence.
  - Used by: `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`.
  - Status: accepted owner.

### Proposal components

These five own the home page (`src/app/page.tsx`), section `01`–`06`. Each has a required content order and prohibited shortcuts documented in `DESIGN.md` > Component contracts; this table only tracks ownership and usage.

- `ProposalSection`
  - Owner: `src/components/proposal/proposal-section.tsx`
  - Role: numbered top-level section wrapper — section number, `--font-display` heading, optional dek, body content, closing `rule` divider.
  - Used by: `src/app/page.tsx`.
  - Contract source: `DESIGN.md` > Component contracts > ProposalSection.
  - Status: accepted owner; do not start a section any other way.

- `SystemMapPanel`
  - Owner: `src/components/proposal/system-map-panel.tsx`
  - Role: the system map — layer stack, argument sentence, numbered boundary list. The only component permitted to use `bg-panel-dark`.
  - Used by: `src/app/page.tsx`.
  - Contract source: `DESIGN.md` > Component contracts > SystemMapPanel.
  - Status: accepted owner; unique dark surface on the site.

- `GateList`
  - Owner: `src/components/proposal/gate-list.tsx`
  - Role: gate-by-gate list (name, failure mode, audit question) under "How I look at it".
  - Used by: `src/app/page.tsx`.
  - Contract source: `DESIGN.md` > Component contracts > GateList.
  - Status: accepted owner.

- `VerdictSheet`
  - Owner: `src/components/proposal/verdict-sheet.tsx`
  - Role: the founder-summary artifact shown as evidence under "What you get"; renders as a `<figure>` with an always-visible sample notice.
  - Used by: `src/app/page.tsx`.
  - Contract source: `DESIGN.md` > Component contracts > VerdictSheet.
  - Status: accepted owner.

- `ScopeTable`
  - Owner: `src/components/proposal/scope-table.tsx`
  - Role: included/excluded lists under "Scope", side by side; excluded items always render `deferred`.
  - Used by: `src/app/page.tsx`.
  - Contract source: `DESIGN.md` > Component contracts > ScopeTable.
  - Status: accepted owner.

### Foundation primitives

- `Button`
  - Owner: `src/components/ui/button.tsx`
  - Role: single button primitive for primary/secondary/ghost actions.
  - Used by: header, CTA groups, forms, service/contact flows.
  - Contract source: `DESIGN.md` > Color (buttons are `ink`; verdict colors are not available for buttons).
  - Status: keep as primitive; avoid page-local button classes.

- `TextLink`
  - Owner: `src/components/ui/actions/text-link.tsx`
  - Role: low-friction card/footer navigation.
  - Used by: marketing proof/service cards and content rails.
  - Contract source: no dedicated heading in the current `DESIGN.md`; inherits `Button`'s color rule.
  - Status: keep; all card links should use this rather than naked styled anchors.

- `Badge`
  - Owner: `src/components/ui/badge.tsx`
  - Role: compact, content-sized classification labels for shadcn-style `Card` and components.
  - Boundary: default for new reusable cards; must remain inline/`w-fit` and must not become a full-width or rounded-pill chip unless a card contract explicitly documents that exception.
  - Contract source: no dedicated heading in the current `DESIGN.md`; falls under the general "color means a verdict" rule in `DESIGN.md` > Color.
  - Status: accepted primitive; Task 1.2 removed old-orange leakage from the `label` variant, which now uses Primary Purple for Stripe-direction emphasis.

- `PillTag`
  - Owner: `src/components/ui/feedback/pill-tag.tsx`
  - Role: older/full pill classification for legacy sections, existing brand sections, and hero chip rows.
  - Used by: hero, feature cards, demo/content sections.
  - Boundary: do not use in new shadcn-style marketing cards; choose `Badge` there unless a full pill is explicitly required and documented by the owning card.
  - Contract source: no dedicated heading in the current `DESIGN.md`; falls under the general "color means a verdict" rule in `DESIGN.md` > Color.
  - Status: legacy-compatible; keep for intentional rounded-pill chip rows while new card work prefers `Badge`.

- `Card`
  - Owner: `src/components/ui/card.tsx`
  - Role: shadcn-style card shell with header/content/footer slots for reusable cards and section-level wrappers.
  - Boundary: default shell for new productized/repeated cards; use slots (`CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`) rather than page-local `rounded-* border bg-* p-* shadow-*` shells.
  - Contract source: `DESIGN.md` > Do's and Don'ts (ad-hoc card shell guardrails).
  - Status: accepted primitive; do not use legacy surfaces as the default shell for new card families.

- `Separator`
  - Owner: `src/components/ui/separator.tsx`
  - Role: internal card/section rhythm without nested mini-cards.
  - Used by: marketing cards.
  - Status: accepted primitive.

- `Typography primitives`
  - Owner: `src/components/ui/typography/**` and `src/components/ui/typography.tsx`
  - Role: display, section heading, body text, eyebrow labels.
  - Used by: all page and section components.
  - Contract source: `DESIGN.md` > Type.
  - Status: accepted; avoid raw heading/body classes unless the component contract requires a specific exception.

### Reusable molecules and surfaces

- `CTAGroup`
  - Owner: `src/components/ui/molecules/cta-group.tsx`
  - Role: grouped primary/secondary action stack.
  - Used by: hero and CTA sections.
  - Contract source: `DESIGN.md` > Color (buttons are `ink`; verdict colors are not available for buttons).
  - Status: accepted; page sections should not duplicate CTA button pairs.

- `FeatureCard`
  - Owner: `src/components/ui/molecules/feature-card.tsx`
  - Role: generic legacy title/body/tag feature card.
  - Used by: older services/about/home sections.
  - Boundary: keep for existing broad feature grids and incremental cleanup; do not start new productized card families from `FeatureCard`.
  - Contract source: `DESIGN.md` > Do's and Don'ts (ad-hoc card shell guardrails).
  - Status: legacy-compatible molecule; specialized repeated cards should graduate to `Card` composition.

- `MetricCard`
  - Owner: `src/components/ui/molecules/metric-card.tsx`
  - Role: generic metric primitive.
  - Used by: older generic sections.
  - Contract source: no dedicated heading in the current `DESIGN.md`.
  - Status: accepted generic primitive for metric display.

- `BorderedSurface` / `PanelSurface`
  - Owner: `src/components/ui/surfaces/bordered-surface.tsx`, `src/components/ui/surfaces/panel-surface.tsx`
  - Role: legacy or broad content surface primitives.
  - Used by: older molecules/services/content sections.
  - Boundary: use for content panels, existing surface patterns, and incremental cleanup; do not use as page-local shells for new repeated card families.
  - Contract source: `DESIGN.md` > Do's and Don'ts (ad-hoc card shell guardrails); `DESIGN.md` > The dark panel (`panel-dark` is reserved for `SystemMapPanel`).
  - Status: legacy-compatible; do not use as precedent for new marketing card radius/shape decisions. `PanelSurface` currently keeps a `rounded-3xl` legacy exception until a dedicated surface cleanup migrates it.

- `ConsolePanel`
  - Owner: `src/components/ui/surfaces/console-panel.tsx`
  - Role: productized diagnostic proof panel.
  - Contract source: no dedicated heading in the current `DESIGN.md`; `panel-dark` is reserved for `SystemMapPanel` (`DESIGN.md` > The dark panel), so this component must not use that surface.
  - Status: important owner component for diagnostic panels.

- `SectionIntro`
  - Owner: `src/components/ui/patterns/section-intro.tsx`
  - Role: standard section eyebrow/title/body/aside layout.
  - Used by: newer pages where adopted.
  - Contract source: no dedicated heading in the current `DESIGN.md`.
  - Status: accepted pattern; sections should prefer this over inline scaffolding where copy shape matches.

## Section ownership map

- Content article blocks
  - Owner: `src/components/content/article-blocks.tsx`
  - Current risk: highest count of direct visual classes in the source scan.
  - Next action: inventory the MDX/article component family separately before changing it; these may be valid content primitives rather than marketing cards.

## Current source-scan signals

A quick scan for card-like classes (`rounded-*`, `border-*`, `bg-*`, `shadow-*`, raw hex colors) shows the heaviest direct visual ownership in the current WIP:

1. `src/components/content/article-blocks.tsx` — 132 matches; article/MDX component system; needs separate content-pattern pass.
2. `src/components/demos/workspace-onboarding-demo.tsx` — 66 matches; demo-specific visual; likely acceptable unless reused.
3. `src/components/content/post-use-case-hero.tsx` — 38 matches; content hero surface; inspect before reusing.
4. `src/components/ui/button.tsx` — 35 matches; primitive owner, acceptable but should stay centralized.
5. `src/components/content/post-conversion-rail.tsx` — 34 matches; content conversion surface; inspect before reusing.
6. `src/components/ui/chip.tsx` — 23 matches; older primitive/legacy classification surface.
7. `src/components/layout/header.tsx` and `src/components/demos/device-frame.tsx` — 13 matches each.
8. `src/components/ui/surfaces/console-panel.tsx` — 12 matches; owner component for diagnostic panels.
9. `src/components/ui/badge.tsx` — 11 matches; primitive owner, acceptable but color-role leakage must be controlled.

Baseline command used on 2026-05-21:

```bash
python3 - <<'PY'
import pathlib, re
root = pathlib.Path('src/components')
pat = re.compile(r'(rounded-|border-|bg-|shadow-|absolute|blur-|grid-cols-\\[|#[0-9a-fA-F]{3,8})')
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

## Migration queue

### P0 guardrails

- Do not add new page-local card, metric, proof, badge, or CTA patterns before checking this inventory and `DESIGN.md`.
- If a pattern appears twice, either reuse an existing owner component or create a new owner component and update `DESIGN.md` in the same change.
- New repeated cards must not be page-local shells. Use `Card` for new shadcn-style marketing cards, `FeatureCard` only for generic legacy feature cards, and `BorderedSurface` / `PanelSurface` only for legacy or broad content surfaces.

### P1 next extraction targets

1. `Badge` vs `PillTag`: usage boundary is documented; `Badge` label old-orange cleanup is complete. Future work should only revisit this if `PillTag` legacy compatibility is intentionally changed.

### P2 later audits

1. Article/content visual primitives (`article-blocks`, `post-use-case-hero`, `post-conversion-rail`).
2. Legacy home components under `src/components/home/**` if they are still routed.
3. Services/about/contact page sections.

## Definition of done for future design changes

A design change is healthy only if all are true:

- Existing owner component was improved, or a new reusable owner component was created intentionally.
- `DESIGN.md` names the owner path, allowed usage, required content order, and prohibited shortcuts.
- Section/page files became thinner or stayed equally thin.
- Tests cover the component contract when the pattern is reusable.
- `pnpm check` and the relevant design audit pass, or remaining advisory warnings are documented.
