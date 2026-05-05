# Blog Design System Design Doc

## Goal
Create a blog-specific design system for WakeyMoment so the site stops drifting into repeated bordered cards and starts feeling like a focused AI MVP rescue publication and service brand.

## Why this exists
The current UI layer has useful primitives, but they are too generic to shape the page. Most sections still collapse into the same bordered-card pattern, which flattens hierarchy and weakens professional trust.

The new system should solve three practical problems:
- improve contrast and readability
- give the blog and conversion pages recognizable layout patterns
- make future sections easier to assemble from reusable components instead of one-off card grids

## Scope
This is a medium-weight design system, not a full Storybook program.

Included:
- semantic color and surface tokens
- reusable page patterns for editorial + conversion content
- an internal `/design-system` preview page
- adoption on the highest-impact screens first

Not included:
- Storybook setup
- animation library changes
- a full site-wide rewrite in one pass

## System principles
### 1. Readability first
Warm tone stays, but contrast must get stronger. Decorative warmth cannot override legibility.

### 2. Patterns over generic cards
The site needs named UI patterns with intent:
- diagnostic console
- section intro
- signal list
- decision panel
- proof row

These patterns should replace repeated “card with title/body/link” usage where possible.

### 3. Blog + service brand coexistence
This is not a SaaS dashboard and not a pure editorial magazine. The system has to support:
- conversion surfaces for Services and Contact
- editorial proof blocks for posts and resources
- founder-friendly explanation components

### 4. Internal preview instead of Storybook
The repo needs a live page that shows:
- tokens
- surface hierarchy
- reusable patterns
- real copy examples

That page becomes the day-to-day reference for building new sections.

## Visual direction
### Colors
Keep the current warm base palette, but shift to semantic roles:
- canvas
- surface
- muted surface
- panel
- console
- text strong
- text default
- text muted
- accent
- border default
- border strong

Dark surfaces must use explicit high-contrast text roles instead of ad hoc custom hex values.

### Surfaces
The current design mostly has one surface shape: bordered card.

Target hierarchy:
1. `flat` — no containment, page-level layout
2. `soft` — light tint with subtle border
3. `panel` — stronger structure for grouped content
4. `console` — dark, operational, high-density diagnostic areas
5. `accent` — highlighted warm surface for important founder guidance

### Typography
Keep the existing role split, but use stronger defaults:
- display heading stays expressive and large
- section headings should balance better and avoid widows
- body text should default to the higher-contrast body role
- muted text should be reserved for labels and helper text only

## Component system additions
### Foundation
- semantic CSS tokens in `globals.css`
- stronger readable defaults for body and muted text
- shared surface variants

### New reusable patterns
- `SectionIntro`: eyebrow, heading, supporting text, optional aside
- `SignalList`: compact list for symptoms, outcomes, principles
- `DecisionPanel`: service-choice surface with sections for fit, outcome, CTA
- `ProofRow`: horizontal or stacked proof unit with highlights and action
- `ConsolePanel`: dark operational shell for diagnostic content

### Preview route
`/design-system` should render:
- token chips / examples
- typography roles
- surface ladder
- pattern examples with realistic site copy

## First adoption targets
### Home Hero
Already moving toward diagnostic-console language; should be rebuilt on top of the new `ConsolePanel` and `SignalList`.

### Services chooser
Should move away from repeated `FeatureCard` usage and use `DecisionPanel`.

### Follow-up targets
- home pain-point section
- proof/content row
- resources highlights

## Success criteria
The slice is successful when:
1. the home and services pages no longer feel like repeated bordered-card layouts
2. text contrast improves on important surfaces
3. the repo has a reusable internal design-system reference page
4. new sections can be composed from named patterns instead of inventing another card variant
