# Proposal Home Redesign — Design

Date: 2026-08-26
Status: approved design, not yet implemented
Scope: visual system + home page sections. Other pages receive the new tokens only.

---

## Why

The site does not look like it was made by someone you would trust to judge your
code. That is a product problem, not a taste problem: the entire offer is "an
independent expert checks whether your developer's claim is true," and the page
making that offer has to carry the same authority the offer claims.

Two causes, both found in the repo rather than guessed:

**The visual system belongs to other companies.** `DESIGN.md` opens by naming its
target as "Stripe-style advisory software" and its palette is Stripe's
(`#533AFD`, `#061B31`, `#F6F9FC`), while the Tailwind tokens carrying those
values are named `zapier-*`. Two borrowed identities, layered. Aiming a design at
another company's site is what produced a page that reads as a template.

**The home page was emptied on purpose and never refilled.** An August honesty
pass removed the metric strip, logos and proof claims because there were no
customers to back them — correctly. The home page has carried a headline and
three cards since. `home-redesign/` still holds five components nothing renders.
The result reads as unfinished rather than as restrained.

So the redesign has to solve a specific problem: **build credibility without
social proof.** There are no testimonials, no case studies, no logos, and there
will not be until the first paid audit. Adding them is not an option; the
constraint is real and stays.

## The idea

**The home page is a proposal, not a brochure.**

The buyer arrives from Upwork. What persuades him there is a proposal: it names
his situation, shows the method, shows the artifact he receives, states the
scope, and asks for a decision. A proposal does not need social proof — it
persuades with method and specificity. That is exactly the constraint we are
under, so the form and the constraint fit each other.

The organizing principle for the visuals is the same one that makes fynt.in
convincing — **the page is typeset like a technical document**. Not copied:
fynt.in draws an engineering blueprint because it sells an execution engine. We
sell an audit document, so the page is typeset like an audit report. Same signal
("this person measures things"), expressed in our own object.

## Non-goals

- Page inventory stays as it is. No pages added, removed, or re-navigated.
- `/services`, `/about`, `/posts`, `/resources`, `/domains` keep their current
  structure. They receive new tokens, nothing else.
- No new proof claims. Whatever cannot be backed today stays off the page.
- No scanner, gate-check tool, or interactive diagnosis. That is the product axis
  and it is out of bounds until the first paid audit.

---

## Visual system

**Ground.** Light page, one dark panel. The page is paper because what is sold is
a document. The dark panel is reserved for the system map — the only place the
page shows machinery. `DESIGN.md` already defines `darkPanel` as "the only
approved dark surface, for diagnostic panels, not page chrome," so this continues
an existing rule rather than overturning it.

**Type.** `Newsreader` for headlines — already installed, currently unused.
`Source Sans 3` for body. Monospace for the map, the risk rows, and gate labels.
Serif says document; mono says measurement.

**Color.** The brand purple is retired. On this site color means **verdict**, and
a brand accent competes with that. The palette carries a red for P0, a green for
pass, a grey for deferred, and nothing else chromatic. Links and buttons are ink,
not purple. When color appears on the page, it is always a judgement.

**Document chrome.** Section numbers `01`–`06`, a baseline rule in the left
margin, hairline dividers between sections, and a document identifier with a
revision date in the footer. This is where the "measured" signal lives. We do not
copy fynt.in's ruler ticks — the equivalent move in our object is report
typesetting.

**Tokens.** New semantic names are introduced alongside the existing ones:
`ink`, `paper`, `rule`, `panel`, `p0`, `p1`, `ok`, `deferred`. The home page and
the shared chrome (header, footer) move to them. Every other page keeps
`zapier-*` until it is touched for another reason. The old names are marked
deprecated in `DESIGN.md` with a note that they are values from another
company's system. Migrating all 74 components in one commit was considered and
rejected: a break in that diff would be hard to attribute.

---

## Home sections

Six sections, each with an existing source in the vault. No new marketing copy is
invented for this redesign; where a section needs words, they come from the
canonical document named beside it.

### 01 · Your situation

The hero as committed on 2026-08-26 — headline, subheadline, two CTAs. No change.

Source: `service-packages.md` § Homepage / Services Page Translation.

### 02 · What you actually built

The dark panel. A drawing of the stack the buyer's app is made of, with the
boundaries between layers marked, each boundary carrying the one question an
audit asks there.

Layers, top to bottom: the vibe-coding platform that generated the app, then
browser UI, frontend and route handlers, auth and session, API routes and server
actions, database, third-party providers.

The argument the drawing makes: **the platform generated all of it, and the risk
is not in any one box — it is at the joins.** That is the thing the buyer cannot
see and the reason an outside reader is worth paying.

Source: `sample-audit-report-template.md` § 3 System Map — its layer list and its
Key Boundaries table (boundary, why it matters, audit question).

Open item: the template's boundary list was written against a specific sample app
(a booking product), so one of its five rows is app-specific. The home diagram
needs the general form of that table. Generalizing it is a writing task on the
vault document and must happen before this section is built, not during.

### 03 · How I look

The gates, listed by name, each with its failure mode and its audit question.

**No count appears on this page.** The canonical pricing line claims "twelve
gates," the gate document defines seven, and two of those seven (Supabase,
Firebase) are alternatives rather than additive — so no fixed number is verified.
For a site whose offer is "I check whether claims are true," an unverified number
in the method section is the most expensive possible error. The section reads as
"the gates that apply to your stack," which is also what actually happens.

Source: `ai-mvp-platform-launch-gate.md` — Supabase, Firebase, Cloudflare,
Hosting, Stripe/Billing, Auth Boundary, Monitoring/Observability.

Open item, outside this redesign: `service-packages.md` still sells "12게이트" and
"I verify twelve gates myself." The selling line is larger than the fact and needs
its own correction.

### 04 · What you get

The strongest section on the page. The one-page founder summary, typeset as the
real artifact rather than described — its actual headings, in order: the
decision; what I'd fix before the next milestone; what can wait; about your
current developer; what I looked at; where the detail lives.

This is what replaces testimonials. The visitor sees what arrives if they pay,
which is a stronger claim than a stranger saying it was good.

Carries the sample-only label. That is a standing approval boundary, not a
stylistic choice.

Source: `founder-summary-1page.md`.

### 05 · Scope

One week, fixed price, and an explicit list of what is not included. In proposal
grammar the exclusions build more trust than the inclusions, so they are not
buried. This section also does the job a FAQ would; there is no separate FAQ.

The price figure is left out. Publishing $1,200 is not an approved action — it is
currently quoted in conversation only. The section states that the price is fixed
and quoted in the first reply, and the number goes in when publishing is
approved.

Source: `service-packages.md` § Pricing, `ai-mvp-platform-launch-gate.md`
§ Out of Scope by Default.

### 06 · Why me

The section that has to work with no testimonials: the published methodology
repository, the writing, the working history. Ends with the primary CTA.

Source: `/about` content, `vibe-hardening` public repository.

---

## Components

Deleted: `src/components/home-redesign/` — five components and their tests.
Nothing renders them today and the new home will not either.

Added, five:

| Component | Responsibility |
|---|---|
| `ProposalSection` | Number, title, body slot. Used six times. |
| `SystemMapPanel` | The dark drawing. Layers and boundaries, SVG. |
| `GateList` | Gate name, failure mode, audit question per row. |
| `VerdictSheet` | The founder summary typeset as an artifact, with sample label. |
| `ScopeTable` | Included and not included. |

Reused as-is: `Container`, `Eyebrow`, `BodyText`, `DisplayHeading`, the button
and CTA primitives, `BorderedSurface`.

`DESIGN.md` is rewritten. Its current 417 lines are the rules of the Stripe-derived
system; leaving them in place would put every new component in violation of the
documented contract on the day it is written. `AGENTS.md` and `CLAUDE.md`
references are updated with it.

## Motion

Close to none, deliberately. The only motion that earns its cost on a landing
page is motion that shows the product, and here that is the system map: its
boundary markers light up one at a time as the panel enters view. Everything else
is hover and focus states.

No animation library is added. CSS transitions plus one `IntersectionObserver`
cover it. `prefers-reduced-motion: reduce` is honored — the markers are simply
drawn in place. The hero is never animated; it is the LCP element.

## Testing

The home test file is rewritten for the new structure, and two existing
assertions survive intact because they encode the honesty constraint rather than
the layout:

- no proof claim the site cannot back — no case study, client result, or
  "trusted by" text may appear
- the sample artifact carries its sample label

New assertions: each of the six sections renders with its number and heading; the
system map exposes its boundaries as text for screen readers; the scope section
renders the exclusion list; no price figure appears until that is approved.

`pnpm check` — content check, lint, and the full suite — passes. A production
`pnpm build` passes, including the opengraph routes.

---

## Sequence

1. Generalize the Key Boundaries table in the vault so § 02 has a verified source.
2. Add the new tokens; rewrite `DESIGN.md`; update `AGENTS.md` and `CLAUDE.md`.
3. Move the shared chrome (header, footer) to the new tokens.
4. Build `ProposalSection`, then sections 01, 05, 06 — the text-only ones.
5. Build `VerdictSheet` and section 04.
6. Build `GateList` and section 03.
7. Build `SystemMapPanel` and section 02, with its motion last.
8. Delete `home-redesign/`.
9. Apply new tokens to the remaining pages without touching their structure.

Steps 4 through 7 are ordered by decreasing certainty: the sections whose content
is already settled are built first, and the drawing — the piece with an open
source question — is built last, when the rest of the page can be judged without
it.

## Open items carried out of this design

These are known, named, and deliberately not resolved here:

- The Key Boundaries table needs its general form before § 02 is built.
- `service-packages.md` sells twelve gates; seven are defined. The selling line
  needs correcting, separately from this work.
- The price figure stays off the page until publishing it is approved.
- The layer list in § 02 deliberately omits a "downloaded to a terminal" step.
  It was raised as a guess, with a question mark attached, and no source
  confirms it. The platform layer stays because it is simply true of the buyer's
  app; the terminal step goes in only if evidence turns up.
