---
version: alpha
name: FixMyVibe Proposal
description: Design system for the wakeymoment FixMyVibe technical debt audit proposal site.
colors:
  paper: "#fdfcfa"
  ink: "#16130f"
  inkMuted: "#5c564e"
  rule: "#e0dbd2"
  panelDark: "#16130f"
  panelDarkMuted: "#a8a099"
  p0: "#b3261e"
  p1: "#9a6700"
  ok: "#1a6c37"
  deferred: "#6b6259"
---

## Overview

The page is typeset like an audit report, because the product is an audit report. Every layout, type, and color decision below serves that one idea: a founder should feel like they are reading a document someone examined their system and rendered a judgment on, not browsing a SaaS marketing template.

This must not read as generic advisory software, and it must not be aimed at any other company's site. There is no reference brand to imitate here. If a screen looks like it borrowed its identity from somewhere else, that is the defect to fix — not a starting point to refine.

The design system is component-first. Agents changing UI must preserve the behavior and hierarchy of the component contracts below before changing colors, spacing, or copy layout. If a screen feels wrong, first ask: which component contract is being violated?

## Color

Four semantic roles carry the page:

- **`ink`** (`#16130f`) — primary text. Headings, body copy, document chrome. Never pure black.
- **`ink-muted`** (`#5c564e`) — secondary text. Metadata, captions, footer detail. Not for paragraphs that carry the argument.
- **`paper`** (`#fdfcfa`) — the page ground. The only light surface.
- **`rule`** (`#e0dbd2`) — hairline dividers, section borders, table rules. Never a fill color.

Four verdict colors, and nothing else is chromatic:

- **`p0`** (`#b3261e`) — a P0 finding. Highest severity.
- **`p1`** (`#9a6700`) — a P1 finding.
- **`ok`** (`#1a6c37`) — a clean or passed check.
- **`deferred`** (`#6b6259`) — a finding explicitly deferred, not resolved.

**Colour on this site means a verdict.** It marks a finding's severity or status — nothing else earns it. Links and buttons are `ink`. Do not introduce a brand accent, a hover-purple, or any color whose only job is to look interactive. If you reach for a fifth color, the question is not "which token is closest" — it is "what verdict is this," and if the answer is none, the element should be `ink`, `ink-muted`, or `rule`.

## Type

- **`--font-display`** (Newsreader) — headings. Serif says *document*.
- **`--font-sans`** (Source Sans 3) — body copy.
- **Monospace** — the system map, gate labels, and risk rows. Mono says *measurement*: a value that was read off an instrument, not composed.

Do not use display type for anything that isn't a heading, and do not use monospace for prose. The pairing is the signal; mixing them past this pattern erodes it.

## Document chrome

The page carries the furniture of a report, not a marketing site:

- Section numbers `01`–`06`, set in sequence, never skipped or reordered.
- Hairline `rule` dividers between sections and within tables — thin, never a heavy border or a shadow.
- A document identifier and revision date in the footer, the way a PDF audit would carry a version stamp.

## The dark panel

`panel-dark` is the only dark surface on the site, and it is reserved for the system map. It is not page chrome, not a CTA background, not a section alternate-background. If a screen wants a second dark surface, that is a sign the map is being used for something it isn't — fix the layout, not the rule.

## Component contracts

Every repeated visual pattern must have one implementation owner. Page and section files may choose data, order sections, and define responsive layout; they must not recreate section, panel, or list internals with page-local Tailwind.

### ProposalSection

The numbered top-level section wrapper. Every `01`–`06` section on the page is one of these — there is no second way to start a section.

- Required content order: section number → `--font-display` heading → optional one-line dek → body content → `rule` divider closing the section.
- The section number and heading share a baseline; the number is `ink-muted`, never a verdict color — it is a locator, not a finding.
- Do not give a section a background fill or a card shell. A section is a run of the page, not a panel.
- Do not nest a `ProposalSection` inside another; sections are siblings under `01`–`06`.

### SystemMapPanel

Owner and contract to be written when this component is built (Tasks 5–8).

### GateList

Owner and contract to be written when this component is built (Tasks 5–8).

### VerdictSheet

Owner and contract to be written when this component is built (Tasks 5–8).

### ScopeTable

Owner and contract to be written when this component is built (Tasks 5–8).

## Deprecated

The `zapier-*` tokens in `src/app/globals.css` (`--color-zapier-black`, `--color-zapier-charcoal`, `--color-zapier-gray`, `--color-zapier-sand`, `--color-zapier-light-sand`, `--color-zapier-orange`, and the `cream`/`offwhite`/`panel`/`accent-surface`/`console-*`/`text-*`/`border-strong` tokens that shipped alongside them) hold another company's palette values under borrowed names. They are deprecated, not deleted: existing pages still depend on them. Migrate a page off `zapier-*` and onto the semantic tokens above when you touch that page for another reason — do not do a standalone token-migration pass.

## Do's and Don'ts

### Do

- Read this file before changing UI.
- Use token roles rather than arbitrary colors.
- Treat every color as a verdict claim: before using `p0`/`p1`/`ok`/`deferred`, be able to say which finding it marks.
- Keep the `panel-dark` surface unique to the system map.
- Update this file when a new reusable component pattern is accepted.

### Don't

- Do not leave large empty panel areas.
- Do not create cards that only look balanced because they have a fixed height.
- Do not create ad-hoc card shells by repeating `rounded-* border bg-* p-* shadow-*` in page/section files when an owner component exists.
- Do not add page-local cards, metrics, or CTA groups when an owner component exists.
- If a visual pattern appears more than once, improve an existing owner component or create a named reusable component before reusing it.
- Do not introduce a brand accent color. Color means a verdict or it doesn't belong.
