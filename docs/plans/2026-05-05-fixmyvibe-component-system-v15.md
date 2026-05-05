# FixMyVibe Component System v1.5

## Context

Recent homepage and proof-content work improved the external shape of FixMyVibe, but the component layer is still too weak. The site now wants to behave like a productized diagnostic/content system, while the UI implementation still contains many one-off visual decisions.

This plan does not propose a full redesign. It proposes a small design-system hardening pass before preview/deploy.

## Current diagnosis

### 1. Visual tokens are still inherited from the old direction

Current CSS variables still use names such as `zapier-black`, `zapier-orange`, `zapier-sand`. The values can remain warm, but the naming makes future work drift toward the wrong reference.

Target semantic language:

- `ink`
- `canvas`
- `surface`
- `surface-muted`
- `panel`
- `accent`
- `border`
- `border-strong`
- `console`
- `console-text`
- `console-muted`

### 2. Components exist, but the hierarchy is not stable enough

The useful pieces are now clear:

- `Button`, `CTAGroup`, `MobileFloatingAppbar`
- `PanelSurface`, `ConsolePanel`
- `SectionIntro`, `SignalList`, `DecisionPanel`, `ProofRow`
- MDX article components: `ArticleIntro`, `RiskSection`, `ExpertInsight`, `MiniCaseStudy`, `ActionTimeline`, `ArticleCTA`
- Post conversion rail in `src/app/posts/[slug]/page.tsx`

But these are not yet governed by a single system. Some are generic UI primitives, some are page-specific, and some are article-only. They should be grouped by intent.

### 3. One-off styling is concentrated in the content/product components

A quick grep found many ad-hoc visual classes around rounded shapes, borders, arbitrary colors and shadows. The highest concentration is:

- `src/components/mdx/article-components.tsx`
- `src/components/home-redesign/home-hero.tsx`
- demo components

This is acceptable for initial exploration, but weak as a durable component system.

### 4. CTA rules are not explicit enough

Recent fixes were needed because sample report links looked too weak. The system should encode:

- Primary CTA: contact / diagnosis request
- Secondary CTA: proof/content read path
- Text link: minor navigation only
- Article rail CTA: dark conversion card
- Mobile product article: inline guide/CTA rail; global floating appbar hidden

### 5. Product content components should become first-class

The best design direction came from the checklist/sample-report pages. That direction should be promoted into the system instead of living as MDX-specific one-offs.

## Proposed component taxonomy

### Foundation

- `Button`
- `Chip`
- `PillTag`
- `Typography`
- semantic CSS tokens

### Surfaces

- `Surface` / `PanelSurface`
- `ConsolePanel`
- `ConversionCard`
- `GuideRail`

### Page patterns

- `SectionIntro`
- `SignalList`
- `DecisionPanel`
- `ProofRow`
- `DiagnosticConsoleHero`

### Content/product patterns

- `ArticleIntro`
- `RiskSection`
- `ChecklistBlock`
- `InsightCallout`
- `MiniCaseStudy`
- `ActionTimeline`
- `ArticleCTA`
- `PostConversionRail`
- `PostMobileGuideRail`

## Design direction

Reference mix:

- Vercel: button precision, restraint, typography confidence
- Mintlify: documentation/content readability, guide rail clarity
- Linear: compact hierarchy and strong dark surfaces
- Current FixMyVibe warmth: founder-friendly, not cold enterprise SaaS

Avoid:

- generic repeated bordered cards
- too many arbitrary hex values inside components
- weak text-link CTAs for important proof content
- global mobile nav overlapping article conversion blocks
- copying Zapier naming or visual identity

## Implementation slice

### Slice A — semantic aliases without large visual churn

1. Add semantic CSS aliases in `globals.css`.
2. Keep old `zapier-*` variables temporarily as compatibility aliases.
3. Update high-touch components to use semantic names first:
   - `Button`
   - `PanelSurface`
   - `ConsolePanel`
   - `SignalList`
   - `article-components.tsx`

### Slice B — extract article rails/cards

1. Move `PostConversionRail`, `PostMobileConversionRail`, and `RailCtaCard` out of `src/app/posts/[slug]/page.tsx`.
2. Create `src/components/content/post-conversion-rail.tsx` or similar.
3. Test rail variants directly.

### Slice C — normalize content component names

1. Keep current MDX export names for backward compatibility.
2. Internally align naming:
   - `LaunchQuestion` → `DecisionQuestion` or keep as article-specific alias
   - `NoGoSignal` → `RiskSignal`
   - `CheckList` → `ChecklistBlock`
3. Avoid breaking existing MDX until after deploy.

### Slice D — update `/design-system`

The design-system preview should show:

- tokens and semantic aliases
- CTA hierarchy
- surface ladder
- article/product content blocks
- desktop and mobile rail examples

## Success criteria

- Components communicate intent by name, not only by visual class.
- Important CTAs always have the right hierarchy.
- Product article pages use the same rails/cards as the design-system preview.
- Arbitrary colors/shadows are reduced in top-level components.
- `pnpm check && pnpm build` remains green.

## Non-goals

- No full visual redesign before market test.
- No Storybook setup yet.
- No production deploy as part of this slice.
- No large copy rewrite.
