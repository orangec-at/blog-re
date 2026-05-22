---
version: alpha
name: FixMyVibe Stripe Advisory
description: Component-first visual system for the wakeymoment FixMyVibe AI MVP technical debt advisory site.
colors:
  primary: "#533AFD"
  navy: "#061B31"
  body: "#273951"
  muted: "#64748D"
  purpleHover: "#4434D4"
  purpleSoft: "#F4F7FF"
  surface: "#FFFFFF"
  soft: "#F6F9FC"
  darkPanel: "#1C1E54"
  darkPanelMuted: "#C9D0E7"
  success: "#0B6B2A"
  danger: "#C5164E"
typography:
  display:
    fontFamily: Source Sans 3
    fontSize: 3.75rem
    fontWeight: 300
    lineHeight: 1.01
    letterSpacing: "-0.055em"
  display-sm:
    fontFamily: Source Sans 3
    fontSize: 3rem
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.055em"
  section:
    fontFamily: Source Sans 3
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  card-title:
    fontFamily: Source Sans 3
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  body:
    fontFamily: Source Sans 3
    fontSize: 1.125rem
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: "-0.006em"
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 1rem
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "-0.006em"
  label:
    fontFamily: Source Sans 3
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: 5px
  md: 8px
  lg: 14px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sectionY: 56px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.purpleHover}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sm}"
    padding: 12px
  text-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 4px
  pill-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sm}"
    padding: 8px
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: 24px
  card-soft:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: 24px
  console-panel:
    backgroundColor: "{colors.darkPanel}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 24px
  console-panel-muted:
    backgroundColor: "{colors.darkPanel}"
    textColor: "{colors.darkPanelMuted}"
    rounded: "{rounded.md}"
    padding: 24px

  text-muted:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: 4px
  badge-soft:
    backgroundColor: "{colors.purpleSoft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 8px
  status-success:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.success}"
    rounded: "{rounded.sm}"
    padding: 8px
  form-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
    padding: 8px
---

## Overview

FixMyVibe is a premium, founder-facing technical debt advisory surface. The page should feel like Stripe-style advisory software: calm, exact, productized, and trustworthy. It must not feel like a generic AI landing page, a warm Zapier clone, or a random Tailwind sketch.

The design system is component-first. Agents changing UI must preserve the behavior and hierarchy of the components below before changing colors, spacing, or copy layout. If a screen feels wrong, first ask: which component contract is being violated?

## Colors

- **Navy (`#061B31`)**: Primary headings, logo text, strong labels. Never use pure black for core text.
- **Body (`#273951`)**: Default readable body text. Use this instead of muted text for paragraphs that carry meaning.
- **Muted (`#64748D`)**: Metadata, short descriptions, labels. Do not use for long paragraphs or critical conversion copy.
- **Primary Purple (`#533AFD`)**: Sole primary interaction color. Used for primary buttons, active emphasis, and links.
- **Purple Hover (`#4434D4`)**: Hover/focus active background for primary actions.
- **Purple Soft (`#F4F7FF`)**: Light accent surface for selected pills, subtle callouts, and empty-state highlights.
- **Border (`#E5EDF5`)**: Default card and section border.
- **Surface (`#FFFFFF`)**: Cards, header, panels, form fields.
- **Soft (`#F6F9FC`)**: Alternate section background and secondary card surface.
- **Dark Panel (`#1C1E54`)**: Only approved dark surface. Use for diagnostic/product preview panels, not for whole-page chrome.

Do not introduce orange, random blue, black, or arbitrary gray values. If a new color is necessary, add it here first and explain its role.

## Typography

Use `Source Sans 3` for all product and marketing UI. The visual signature is light but readable typography, not bold SaaS noise.

- **Display**: large hero text only. Weight 300, tight tracking, max 3–4 lines. Avoid orphan lines such as a single Korean particle or punctuation-only final line.
- **Section**: section headings. Weight 400; do not make these as fragile as display text.
- **Card title**: product/card headings. Weight 400, compact line-height. If a heading wraps into awkward fragments, rewrite the copy before changing the component.
- **Body**: meaningful paragraphs. Use Body color, not Muted, unless the text is genuinely secondary.
- **Label**: uppercase eyebrows and small metadata. Use sparingly; labels must orient the reader, not decorate the page.

## Layout

- Use a clean 12-column mental model: content left, product/diagnostic proof right, then card grids below.
- Hero content and hero proof panel must start on the same vertical axis on desktop. Do not vertically center one side if it creates a blank top band.
- Section vertical padding defaults to 56px. Increase only for intentional chapter breaks.
- Card grids should not look like empty containers. If a card has large unused vertical space, either reduce height or add a defined subcomponent.
- Mobile stacks in this order: headline, subtitle, primary CTA, proof panel, supporting cards.

## Elevation & Depth

Depth is Stripe-like: soft blue-tinted shadows and thin borders.

- Default containment: `1px solid #E5EDF5`.
- Featured card lift: soft blue shadow, never heavy black shadow.
- Dark diagnostic panels use border + inner contrast, not glow.
- Avoid thick borders, orange underline effects, and overly rounded pill surfaces.

## Shapes

- Default radius: 5px for buttons and pills.
- Cards and panels: 8px by default.
- `PanelSurface` is a legacy/broad content-surface exception that currently keeps `rounded-3xl` until a dedicated legacy-surface cleanup migrates it; do not use it as precedent for new marketing cards.
- Large rounded 20px+ pills are not part of this system except mobile floating navigation if already present.
- If an element looks like an input but is a badge, the component is wrong. Badges must be compact, inline, and label-like.

## Components

The component system is a contract registry, not only a vibe guide. Every repeated visual pattern must have one implementation owner. Page and section files may choose data, order sections, and define responsive layout; they must not recreate card, metric, badge, CTA, or proof internals with page-local Tailwind.

Inventory source of truth:

- `docs/design-system/ui-pattern-inventory.md`

Composition rules:

- If a visual pattern appears more than once, improve an existing owner component or create a named reusable component before reusing it.
- New reusable visual components must update this file with: owner path, used-by path, required content order, allowed variants, and prohibited shortcuts.
- Section files under `src/components/home-redesign/**`, `src/components/services/**`, `src/components/content/**`, and `src/app/**` should compose components rather than own card internals.
- Prefer foundation primitives from `src/components/ui/**` before inventing new Tailwind shells.
- `src/components/marketing/**` owns productized marketing cards and proof surfaces.

Card shell role boundaries:

- `Card` (`src/components/ui/card.tsx`) is the shadcn-style foundation shell for new marketing cards and marketing-owned wrappers. Use it with `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, and `CardDescription` when a card needs explicit slots or will be composed by `src/components/marketing/**`.
- `FeatureCard` (`src/components/ui/molecules/feature-card.tsx`) is the generic legacy feature card for older title/body/tag cards. Keep it for existing broad feature grids; do not use it as the default shell for new productized marketing cards.
- `BorderedSurface` (`src/components/ui/surfaces/bordered-surface.tsx`) and `PanelSurface` (`src/components/ui/surfaces/panel-surface.tsx`) are legacy or broad content surfaces. Use them for incremental cleanup, content panels, or existing surface patterns, not for new repeated card families.
- New repeated card patterns must have a named reusable owner (`Card` composition, `FeatureCard`, `MetricCard`, or a `src/components/marketing/**` component). They must not be page-local shells built from repeated `rounded-* border bg-* p-* shadow-*` classes.

Prohibited page-local patterns:

- Do not create ad-hoc card shells by repeating `rounded-* border bg-* p-* shadow-*` in page/section files when `Card`, `FeatureCard`, `MetricCard`, `BorderedSurface`, `PanelSurface`, or a marketing card owner exists.
- Do not add floating chips, fake progress bars, dashboard rows, metric cards, or decorative badges unless their owner component and contract are added here first.
- Do not call a page-local JSX/Tailwind change “component-level” work unless a reusable component was actually created or improved.
- Do not make visual polish by increasing section complexity. A healthy redesign makes owner components clearer and page files thinner.

### Primary Button

Use for the single strongest next action in a section: contact, diagnosis request, or booking intent.

- Token entry: `button-primary`
- Background: `{colors.primary}`
- Text: white
- Radius: `{rounded.sm}`
- Shadow: soft blue/purple lift, not black elevation
- Copy: action-oriented, not generic. Good: “기술 부채 진단 문의하기”. Bad: “Learn more”.
- Page rule: one primary button per visual cluster. Header CTA and hero CTA may duplicate only when they serve the same destination.

### Secondary Button

Use for second action next to a primary CTA, usually sample report or proof.

- Token entry: `button-secondary`
- White surface, purple text, purple-tinted border.
- Must not compete visually with primary.
- Do not use dark filled secondary buttons in this Stripe direction.

### Text Link

Use for low-friction navigation under a card or final CTA.

- Token entry: `text-link`
- Purple text with subtle underline.
- Must read as a link, not plain body copy.
- Avoid centering a lone text link below large whitespace unless it belongs to a deliberate CTA stack.

### Pill Tag / Badge

Use to classify, not to act. Examples: “구조 복구”, “출시 준비도”, “AI MVP Rescue”. The boundary is intentional so agents do not pick between the two by visual taste alone.

- `Badge` owner: `src/components/ui/badge.tsx`.
- `Badge` token entries: `pill-tag` for the neutral/default compact shape and `badge-soft` for the purple-soft accent shape; code variants currently include `default`, `accent`, `label`, and `muted`. The `label` variant uses Primary Purple for Stripe-direction emphasis, not legacy orange naming/classes.
- Use `Badge` for compact labels inside shadcn-style `Card` and `src/components/marketing/**` components.
- New marketing cards must prefer `Badge` unless the component contract explicitly requires a larger full pill.
- `Badge` must stay compact, inline, `w-fit`/content-sized, and label-like; it must never stretch full width, look like a form input, or use the older full-pill chip shape by accident.
- `PillTag` owner: `src/components/ui/feedback/pill-tag.tsx`.
- Use `PillTag` only for older/full pill classification in legacy sections, existing brand sections, or hero chip rows where the rounded-pill chip shape is intentional.
- Do not introduce `PillTag` inside new shadcn-style marketing cards. If a full pill is explicitly required there, document that exception in the card contract.
- If clickable, use an interactive chip component with explicit hover/focus state and destination.

### Feature Card

Use for generic legacy title/body/tag feature cards in older pain point, service, proof path, and package-summary grids. New shadcn-style marketing cards should use `Card` directly or a named component under `src/components/marketing/**` instead of starting from `FeatureCard`.

- Token entry: `card-default` or `card-soft`
- Owner: `src/components/ui/molecules/feature-card.tsx`.
- Required internal order: optional badge → title → one body paragraph → optional metadata/action.
- Body copy must explain the user value, not restate the title.
- Avoid cards with only a large number and vague label unless the metric is self-evident.
- Equal-height cards are allowed only when content density is balanced.
- Do not use `FeatureCard`, `BorderedSurface`, or `PanelSurface` to create a new repeated marketing card family when a `Card`-based owner component should exist.

### Service Package Card

Specialized feature card for the three core offers:

1. AI MVP Technical Debt Audit
2. Remodeling Sprint
3. Founder Tech Partner / Virtual CTO

Ownership:
- Implementation owner: `src/components/marketing/service-package-card.tsx` (`ServicePackageCard`).
- Used by: `src/components/home-redesign/services-preview-grid.tsx`.
- Foundation primitives: `Card`, `Badge`, `Separator`, `TextLink`.

Rules:
- Each card must answer: recommended for, output, next action.
- Required order: compact package label → optional compact “Start here” badge → title → one summary paragraph → recommended-for row → output row → next-action text link.
- Do not make title typography so large that Korean/English wraps into broken fragments.
- Do not add decorative floating chips, progress bars, or grid-paper effects unless this contract is updated first.
- The first card may carry a compact “Start here” badge, but that badge must not look like an input or full-width banner.
- Do not recreate package-card markup directly inside a page or section file.

### Proof Artifact Card

Use for project proof, sample reports, repo links, and domain evidence. It should prove that the service has actual artifacts without turning the card into a dashboard mockup.

Ownership:
- Implementation owner: `src/components/marketing/proof-artifact-card.tsx` (`ProofArtifactCard`).
- Used by: `src/components/home-redesign/featured-insight-row.tsx`.
- Foundation primitives: `Card`, `Badge`, `Separator`, `TextLink`.

Rules:
- Required order: artifact type label → compact proof label → title → one summary paragraph → proof/highlight points → verification point → one or two links.
- Links use `text-link` and should include directional copy such as “Domain page →”.
- Do not use nested cards, progress bars, or decorative chart rows for proof unless the artifact is an actual chart.
- Do not recreate proof/project cards directly inside a page or section file.

### Pain Signal Card

Specialized feature card for the founder pain-point grid. It explains a concrete failure mode and the next type of repair without turning the grid into generic advice cards.

Ownership:
- Implementation owner: `src/components/marketing/pain-signal-card.tsx` (`PainSignalCard`).
- Used by: `src/components/home-redesign/pain-point-grid.tsx`.
- Foundation primitives: `Card`, `Separator`, `Eyebrow`, `BodyText`.

Rules:
- Required order: subtle numeric marker → title → problem paragraph → “다음에 고치는 것” label → solution paragraph.
- The numeric marker is decorative and must stay low contrast; it should not become the main content.
- Do not duplicate the problem/solution card shape directly inside grids.
- Do not add CTA buttons or proof badges inside pain cards; route those to service/proof sections.

### Proof Metric Card

Use for compact proof/result metrics such as sample report availability, number of proof stories, or service paths.

Ownership:
- Implementation owner: `src/components/marketing/proof-metric-card.tsx` (`ProofMetricCard`).
- Used by: `src/components/home-redesign/proof-stat-strip.tsx`.
- Foundation primitive: `src/components/ui/molecules/metric-card.tsx` (`MetricCard`).
- `ProofMetricCard` is a thin semantic wrapper over `MetricCard` for home proof/result copy; keep visual changes in the generic primitive unless the marketing contract diverges intentionally.

Rules:
- Required order: value → specific explanatory label.
- Avoid vague large numbers; the label must make the metric self-evident.
- Do not add secondary CTAs or nested metadata inside metric cards.
- Do not recreate metric-card markup directly inside a page or section file.

### Diagnostic Console Panel

The console panel is the main productized proof component. It must never look like an empty decorative rectangle.

- Token entry: `console-panel`
- Top white header area must contain enough content to look intentional: title, short summary, status badge, or 2–3 compact report rows.
- Dark body must show structured diagnostic content: risk signals, audit scope, outcomes, or a report preview.
- Secondary text in dark panels must remain readable; prefer `{colors.darkPanelMuted}` over low-opacity white.
- The panel should prove the service has a method. It is not just visual contrast.

### Section Intro

Every major section should have:

- label/eyebrow
- section heading
- one short explanatory paragraph

Do not add decorative labels that do not clarify the section’s job.

### Final CTA Block

The final CTA must reduce decision pressure.

- One primary action.
- One proof/sample action.
- Optional tertiary link only if visually grouped and not floating in excessive whitespace.
- Copy should say what happens next, not just repeat package names.

### Contact Form

The contact form is lightweight but must feel trustworthy.

- Fields: email + risk description are acceptable.
- Required state must be visually clear.
- Add privacy reassurance before production: “We only use this email to respond to your inquiry.”
- Submit button uses `button-primary`.
- Validation errors use danger only for actual errors.

## Do's and Don'ts

### Do

- Read this file before changing UI components.
- Check `docs/design-system/ui-pattern-inventory.md` before adding any repeated visual pattern.
- Use token roles, not arbitrary colors.
- Improve a weak screen by fixing component contracts first: button hierarchy, card structure, badge shape, console content.
- Keep body text readable; premium does not mean pale.
- Use the diagnostic console to demonstrate method and judgment.
- Update this file when a new reusable component pattern is accepted.
- Add or update component-contract tests for reusable card/metric/proof patterns.

### Don't

- Do not add one-off Tailwind colors that are not represented here.
- Do not use orange or the old Zapier-inspired warmth.
- Do not make decorative badges look like inputs.
- Do not leave large empty panel areas unless they are intentionally reserved and labeled.
- Do not create cards that only look balanced because they have fixed height.
- Do not make all typography ultra-light; reserve light display treatment for hero moments.
- Do not introduce a new component variant in code without adding its rule here.
- Do not add page-local cards, metrics, proof badges, or CTA groups when an owner component exists.
- Do not make visual reference work by layering decorative JSX into a page file; translate the reference into a named component contract first.
