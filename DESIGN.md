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

Owner: `src/components/proposal/proposal-section.tsx`. Used by: `src/app/page.tsx`.

- Required content order: section number → `--font-display` heading → optional one-line dek → body content → `rule` divider closing the section.
- The section number and heading share a baseline; the number is `ink-muted`, never a verdict color — it is a locator, not a finding.
- Do not give a section a background fill or a card shell. A section is a run of the page, not a panel.
- Do not nest a `ProposalSection` inside another; sections are siblings under `01`–`06`.

### SystemMapPanel

The system map. Section 02, and the only place `panel-dark` is used.

Owner: `src/components/proposal/system-map-panel.tsx`. Used by: `src/app/page.tsx`.

- Required content order: layer stack, top to bottom in document order → the argument sentence → the boundary list, numbered, each with its between-clause and its audit question.
- Layer and boundary names are rendered as real text nodes (`<li>`, `<p>`, `<span>`), never as SVG paths or CSS-drawn shapes — a screen reader and a search crawler must be able to read what the drawing says, since the panel carries the page's central argument.
- This is the only component permitted to use `bg-panel-dark`; nothing else on the page may reach for that surface.
- Text on the panel uses `paper`, `panel-dark-muted`, and `p0` only — never `ink` or `ink-muted`, which are calibrated against the light `paper` ground, not the dark one.

### GateList

The gate-by-gate list under "How I look at it".

Owner: `src/components/proposal/gate-list.tsx`. Used by: `src/app/page.tsx`.

- Required content order: for each gate, name (mono) → failure mode → audit question, in the data's order — never sorted or reordered by the component.
- Rows are separated by a `rule` top border, not a card shell.
- The component never renders a count of the gates (no "N gates" text or `aria-label`); the page argues from what each gate checks, not from how many there are.

### VerdictSheet

The founder-summary artifact shown as evidence, under "What you get".

Owner: `src/components/proposal/verdict-sheet.tsx`. Used by: `src/app/page.tsx`.

- Required content order: title and sample notice on one header row → each section's heading (mono, uppercase) then its body, in the data's order.
- Rendered as a `<figure>` — a document artifact being shown, not a card or a testimonial quote.
- The sample notice always renders; it is the only thing marking the artifact as a sample rather than delivered client work, so it must never be conditionally hidden.

### ScopeTable

The included/excluded lists under "Scope".

Owner: `src/components/proposal/scope-table.tsx`. Used by: `src/app/page.tsx`.

- Required content order: included list first, excluded list second, side by side — two independent lists, not a `<table>`, since the exclusions have no column to share with the inclusions.
- Excluded items always render in `deferred`, never `p0` or `p1` — being out of scope is not a finding, so it does not get a severity color.

### Report components

The sample audit report (`content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`)
is the one page on the site that renders a deliverable rather than describing one, so it
has its own furniture. Owner for all four: `src/components/content/report-blocks.tsx`.

**`ReportMeta`** — the report's cover block.

- Required content order: product → audit type → audit date → prepared by → report status → sample notice.
- The sample notice always renders, in `p1`, the same caution colour `VerdictSheet` uses for the same job. It is the only thing marking the document as synthetic, so it must never be conditionally hidden.
- It is not a finding, so it never takes `p0`.

**`ReportSection`** — one numbered section, `01`–`12`.

- Required content order: mono section number → `--font-display` heading → body.
- Set inside the reading column rather than a page margin: the article measure has no margin to give it. This is the only permitted difference from `ProposalSection`'s grammar.
- Numbers run in sequence and are never skipped or reordered.

**`ReportTable`** — every table in the report.

- Required content order: mono caption → header row → body rows, in the data's order.
- Only cells in `verdictColumns` may carry colour, and only from the closed vocabulary declared in the component. Every other cell is `ink`.
- Severity, readiness status, and launch decision are verdicts and take `p0`/`p1`/`ok`. Evidence state (`Unknown`, `Missing`) is not a finding and takes `deferred`.
- Rules, never a card shell or a zebra fill. The table scrolls inside its own box so a seven-column risk table cannot push the reading column sideways.

**`ReportList`** — a named list inside a section: checks, tasks, evidence.

- Required content order: optional mono caption → items, in the data's order.
- Rows are separated by `rule` borders, not a card shell or a filled block.

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
- **One exception: the logo mark's red dot.** The mark is a lens aperture — blades
  around a circle, three missing at the upper right, one red dot inside that opening —
  and that dot is identity, not a verdict. It appears in the header lockup and
  `src/app/icon.svg`, nowhere else. Never rotate or animate the mark: radial blades
  share a silhouette with a loading spinner, and motion makes it one.
  Canonical spec: `business/fixmyvibe/design/logo/README.md` in the `vault` repo.
