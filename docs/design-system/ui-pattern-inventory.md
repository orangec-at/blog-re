# UI Pattern Inventory

Purpose: keep FixMyVibe design work component-first. This is the working map between `DESIGN.md`, reusable implementation components, and page/section usage. If a visual pattern appears in more than one place, improve or create the named owner component instead of adding page-local Tailwind markup.

Last updated: 2026-05-21

## Current architecture rule

- `DESIGN.md` owns the visual contracts and prohibited patterns.
- `src/components/ui/**` owns primitives and low-level molecules.
- `src/components/marketing/**` owns productized marketing card patterns.
- `src/components/home-redesign/**`, `src/components/services/**`, `src/components/content/**`, `src/app/**` should compose existing components and own only data selection, section order, and responsive layout.

## Pattern ownership map

### Foundation primitives

- `Button`
  - Owner: `src/components/ui/button.tsx`
  - Role: single button primitive for primary/secondary/ghost actions.
  - Used by: header, CTA groups, forms, service/contact flows.
  - Contract source: `DESIGN.md` > Primary Button / Secondary Button.
  - Status: keep as primitive; avoid page-local button classes.

- `TextLink`
  - Owner: `src/components/ui/actions/text-link.tsx`
  - Role: low-friction card/footer navigation.
  - Used by: marketing proof/service cards and content rails.
  - Contract source: `DESIGN.md` > Text Link.
  - Status: keep; all card links should use this rather than naked styled anchors.

- `Badge`
  - Owner: `src/components/ui/badge.tsx`
  - Role: compact, content-sized classification labels for shadcn-style `Card` and marketing components.
  - Used by: `ServicePackageCard`, `ProofArtifactCard`, chooser note.
  - Boundary: default for new marketing cards; must remain inline/`w-fit` and must not become a full-width or rounded-pill chip unless a card contract explicitly documents that exception.
  - Contract source: `DESIGN.md` > Pill Tag / Badge.
  - Status: accepted primitive; Task 1.2 removed old-orange leakage from the `label` variant, which now uses Primary Purple for Stripe-direction emphasis.

- `PillTag`
  - Owner: `src/components/ui/feedback/pill-tag.tsx`
  - Role: older/full pill classification for legacy sections, existing brand sections, and hero chip rows.
  - Used by: hero, feature cards, demo/content sections.
  - Boundary: do not use in new shadcn-style marketing cards; choose `Badge` there unless a full pill is explicitly required and documented by the owning card.
  - Contract source: `DESIGN.md` > Pill Tag / Badge.
  - Status: legacy-compatible; keep for intentional rounded-pill chip rows while new card work prefers `Badge`.

- `Card`
  - Owner: `src/components/ui/card.tsx`
  - Role: shadcn-style card shell with header/content/footer slots for new marketing cards and marketing-owned wrappers.
  - Used by: `src/components/marketing/**` and a few section-level notes.
  - Boundary: default shell for new productized/repeated marketing cards; use slots (`CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`) rather than page-local `rounded-* border bg-* p-* shadow-*` shells.
  - Contract source: `DESIGN.md` > Card shell role boundaries.
  - Status: accepted primitive; do not use legacy surfaces as the default shell for new marketing card families.

- `Separator`
  - Owner: `src/components/ui/separator.tsx`
  - Role: internal card/section rhythm without nested mini-cards.
  - Used by: marketing cards.
  - Status: accepted primitive.

- `Typography primitives`
  - Owner: `src/components/ui/typography/**` and `src/components/ui/typography.tsx`
  - Role: display, section heading, body text, eyebrow labels.
  - Used by: all page and section components.
  - Contract source: `DESIGN.md` > Typography / Section Intro.
  - Status: accepted; avoid raw heading/body classes unless the component contract requires a specific exception.

### Reusable molecules and surfaces

- `CTAGroup`
  - Owner: `src/components/ui/molecules/cta-group.tsx`
  - Role: grouped primary/secondary action stack.
  - Used by: hero and CTA sections.
  - Contract source: `DESIGN.md` > Primary Button / Secondary Button / Final CTA Block.
  - Status: accepted; page sections should not duplicate CTA button pairs.

- `FeatureCard`
  - Owner: `src/components/ui/molecules/feature-card.tsx`
  - Role: generic legacy title/body/tag feature card.
  - Used by: older services/about/home sections.
  - Boundary: keep for existing broad feature grids and incremental cleanup; do not start new productized marketing card families from `FeatureCard`.
  - Contract source: `DESIGN.md` > Card shell role boundaries / Feature Card.
  - Status: legacy-compatible molecule; specialized repeated marketing cards should graduate to `Card` composition under `src/components/marketing/**`.

- `MetricCard`
  - Owner: `src/components/ui/molecules/metric-card.tsx`
  - Role: generic metric primitive.
  - Used by: older generic sections and `ProofMetricCard`.
  - Contract source: `DESIGN.md` > Proof Metric Card.
  - Status: accepted generic primitive; `ProofMetricCard` now wraps this for marketing semantics instead of maintaining a separate shell.

- `BorderedSurface` / `PanelSurface`
  - Owner: `src/components/ui/surfaces/bordered-surface.tsx`, `src/components/ui/surfaces/panel-surface.tsx`
  - Role: legacy or broad content surface primitives.
  - Used by: older molecules/services/content sections.
  - Boundary: use for content panels, existing surface patterns, and incremental cleanup; do not use as page-local shells for new repeated card families.
  - Contract source: `DESIGN.md` > Card shell role boundaries / Feature Card / Diagnostic Console Panel.
  - Status: legacy-compatible; do not use as precedent for new marketing card radius/shape decisions. `PanelSurface` currently keeps a `rounded-3xl` legacy exception until a dedicated surface cleanup migrates it.

- `ConsolePanel`
  - Owner: `src/components/ui/surfaces/console-panel.tsx`
  - Role: productized diagnostic proof panel.
  - Used by: `src/components/home-redesign/home-hero.tsx`.
  - Contract source: `DESIGN.md` > Diagnostic Console Panel.
  - Status: important owner component. The remaining hero-local diagnostic rows should be candidates for subcomponents, not more inline markup.

- `SectionIntro`
  - Owner: `src/components/ui/patterns/section-intro.tsx`
  - Role: standard section eyebrow/title/body/aside layout.
  - Used by: newer pages where adopted.
  - Contract source: `DESIGN.md` > Section Intro.
  - Status: underused in `home-redesign`; next cleanup should replace repeated section intro scaffolding where copy shape matches.

### Marketing-specific components

- `ServicePackageCard`
  - Owner: `src/components/marketing/service-package-card.tsx`
  - Used by: `src/components/home-redesign/services-preview-grid.tsx`.
  - Contract source: `DESIGN.md` > Service Package Card.
  - Status: accepted owner for the three core service packages.
  - Do not: recreate service/package cards inside section files, add floating chips/progress rows, or create another service card variant without updating `DESIGN.md`.

- `ProofArtifactCard`
  - Owner: `src/components/marketing/proof-artifact-card.tsx`
  - Used by: `src/components/home-redesign/featured-insight-row.tsx`.
  - Contract source: `DESIGN.md` > Proof Artifact Card.
  - Status: accepted owner for proof/project artifact cards.
  - Do not: use nested cards or fake dashboard rows for proof unless the artifact is an actual chart/report component.

- `PainSignalCard`
  - Owner: `src/components/marketing/pain-signal-card.tsx`
  - Used by: `src/components/home-redesign/pain-point-grid.tsx`.
  - Contract source: `DESIGN.md` > Feature Card / Pain Signal Card.
  - Status: accepted owner for problem/next-fix signal cards.
  - Do not: duplicate the problem/solution card shape directly in grids.

- `ProofMetricCard`
  - Owner: `src/components/marketing/proof-metric-card.tsx`
  - Used by: `src/components/home-redesign/proof-stat-strip.tsx`.
  - Contract source: `DESIGN.md` > Proof Metric Card.
  - Status: accepted semantic wrapper over `MetricCard` for compact home proof metrics.
  - Do not: add CTA links, badges, nested metadata, or vague number-only cards.

## Section ownership map

- Home hero
  - Owner: `src/components/home-redesign/home-hero.tsx`
  - Current component owners used: `Container`, `CTAGroup`, `PillTag`, `SignalList`, `ConsolePanel`, typography primitives.
  - Debt: still owns multiple diagnostic-console internals inline (`auditRows`, dark grid cells, scope rows). Next cleanup should extract `DiagnosticPriorityGrid` and/or `AuditScopeList` under `src/components/marketing/` or `src/components/ui/patterns/`.

- Services preview
  - Owner: `src/components/home-redesign/services-preview-grid.tsx`
  - Current component owners used: `ServicePackageCard`, `Card`, `Badge`, typography primitives.
  - Debt: chooser note is still a section-local card. If reused elsewhere, extract `ChooserNoteCard` or turn it into a `SectionIntro` aside.

- Featured proof row
  - Owner: `src/components/home-redesign/featured-insight-row.tsx`
  - Current component owners used: `ProofArtifactCard`, typography primitives.
  - Status: thin enough; keep proof card internals inside `ProofArtifactCard`.

- Pain point grid
  - Owner: `src/components/home-redesign/pain-point-grid.tsx`
  - Current component owners used: `PainSignalCard`, typography primitives.
  - Status: thin enough; consider `SectionIntro` migration only if it improves consistency without hiding copy intent.

- Proof stat strip
  - Owner: `src/components/home-redesign/proof-stat-strip.tsx`
  - Current component owners used: `ProofMetricCard`, typography primitives.
  - Status: thin enough.

- Content article blocks
  - Owner: `src/components/content/article-blocks.tsx`
  - Current risk: highest count of direct visual classes in the source scan.
  - Next action: inventory the MDX/article component family separately before changing it; these may be valid content primitives rather than marketing cards.

## Current source-scan signals

A quick scan for card-like classes (`rounded-*`, `border-*`, `bg-*`, `shadow-*`, raw hex colors) shows the heaviest direct visual ownership in the current WIP:

1. `src/components/content/article-blocks.tsx` — 132 matches; article/MDX component system; needs separate content-pattern pass.
2. `src/components/demos/workspace-onboarding-demo.tsx` — 66 matches; demo-specific visual; likely acceptable unless reused.
3. `src/components/home-redesign/home-hero.tsx` — 59 matches; hero diagnostic console internals; next extraction target.
4. `src/components/content/post-use-case-hero.tsx` — 38 matches; content hero surface; inspect before reusing.
5. `src/components/ui/button.tsx` — 35 matches; primitive owner, acceptable but should stay centralized.
6. `src/components/content/post-conversion-rail.tsx` — 34 matches; content conversion surface; inspect before reusing.
7. `src/components/ui/chip.tsx` — 23 matches; older primitive/legacy classification surface.
8. `src/components/layout/header.tsx` and `src/components/demos/device-frame.tsx` — 13 matches each.
9. `src/components/ui/surfaces/console-panel.tsx` — 12 matches; owner component for diagnostic panels.
10. `src/components/ui/badge.tsx` — 11 matches; primitive owner, acceptable but color-role leakage must be controlled.

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

1. `home-hero.tsx`: extract diagnostic priority/scope rows out of inline markup.
2. `services-preview-grid.tsx`: decide whether chooser note becomes `SectionIntro.aside` or a named `ChooserNoteCard`.
3. `Badge` vs `PillTag`: usage boundary is documented; `Badge` label old-orange cleanup is complete. Future work should only revisit this if `PillTag` legacy compatibility is intentionally changed.

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
