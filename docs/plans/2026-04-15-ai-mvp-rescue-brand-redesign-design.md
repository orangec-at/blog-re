# AI MVP Rescue Brand Redesign Design Doc

## Goal
Reposition WakeyMoment from a general portfolio/blog into an AI-built MVP rescue brand for founders whose prototype or early product is blocked by technical debt, unstable architecture, or weak launch readiness.

## Why this redesign exists
The current site proves capability, but its message is still too broad. The business plan and sales direction are narrower:
- target: non-technical founders and early startup teams
- channel: Upwork, LinkedIn, SNS
- core offer: diagnose and repair AI-built MVPs before they fail in production
- service ladder: FMV Diagnosis -> Architecture Fix -> Virtual CTO

The redesign must make that positioning obvious in the first screen, then drive visitors toward Services and Contact, while keeping existing MDX posts and interactive demos as credibility/supporting evidence.

## Brand positioning
### Primary statement
**We turn AI-built MVPs into launch-ready products.**

### Supporting statement
**Your AI-coded MVP is failing? We fix the vibe before technical debt kills the launch.**

### What we are selling
Not generic web development. Not “AI app builder” hype. The brand is selling:
- AI MVP rescue
- architecture recovery
- founder-friendly technical translation
- long-term technical decision support

### Target audience
- non-technical founders who used AI coding tools to move fast
- early-stage teams stuck between demo/prototype and real product
- clients on Upwork or LinkedIn looking for architecture cleanup, refactoring, or ongoing technical guidance

## Information architecture
### Priority pages (first conversion layer)
1. Home
2. Services
3. Contact

### Supporting trust layer
4. Blog
5. Resources
6. About

### Progressive proof layer
7. Portfolio (kept, expanded later)

## Page roles
### Home
Role: define the problem, declare the positioning, show proof, and route visitors into Services/Contact.

Proposed sections:
1. Hero
2. Pain Point
3. Why This Happens
4. Proof / Result
5. Services Preview
6. Featured Insight / Case
7. Final CTA

### Services
Role: help the visitor choose the right engagement model.

Proposed sections:
1. Services Hero
2. Start Here / service chooser
3. FMV Diagnosis
4. Architecture Fix
5. Virtual CTO
6. Proof links
7. Final CTA

### Contact
Role: lower friction and start the diagnosis/conversation.

Proposed sections:
1. Contact Hero
2. When to Contact Us
3. Inquiry Form
4. Low-friction alternate path
5. Final reassurance CTA

### Blog
Role: educational trust hub for SNS / Upwork / search traffic.

Content types:
- diagnosis posts
- before/after posts
- founder-education posts

Existing MDX posts stay in place and become supporting proof/education content.

### About
Role: briefly answer “why you?”

1st version stays short:
- short hero
- team snapshot
- why we work this way
- CTA

### Portfolio
Role: proof archive. Keep existing posts/domains available, but do not make it the center of the first redesign wave.

### Resources
Role: download + capabilities + founder-friendly trust layer. Already present and should remain as a support page.

## Content model strategy
### Keep in MDX
- blog posts
- case-study-style writeups
- deep technical insights
- interactive showcase posts

### Keep in typed data files
- homepage copy
- services page copy
- about page copy
- contact page copy
- resources/supporting conversion copy
- proof metrics / service summaries / founder problem-solution cards

### Not now
- no custom admin page
- no CMS integration yet
- no draft/publish workflow

## Design system direction
The visual foundation is already defined in `DESIGN.md` and should be treated as the source of truth:
- warm cream surfaces
- Zapier-inspired orange accent
- border-first structure over shadows
- Degular Display / Inter / GT Alpina role separation
- generous spacing with strong CTA emphasis

The redesign should not create page-by-page visual exceptions. It should create reusable system primitives.

## Atomic Design mapping
### Existing state
The repo already has many page-level sections (home cards, domain hero, galleries, CTA sections), but the atom/molecule layer is still thin. The site currently has organism-first growth.

### Target atomic structure
#### Atoms
- Eyebrow
- DisplayHeading
- SectionHeading
- BodyText
- SupportText
- PrimaryButton
- SecondaryButton
- TextLink
- Surface
- BorderedSurface
- PillTag
- FieldLabel
- Input
- Textarea
- Select
- Checkbox
- FieldError

#### Molecules
- CardHeader
- CTAGroup
- MetricCard
- FeatureCard
- ProblemSolutionPair
- FormField
- DownloadCard
- ServiceSummary

#### Organisms
- SiteHeader
- SiteFooter
- HomeHero
- PainPointGrid
- ProofStatStrip
- ServicesPreviewGrid
- FounderProblemSolutionGrid
- ContactFormPanel
- ResourcesDownloadSection
- ServicesDecisionGrid

#### Templates
- LandingPageTemplate
- ServicePageTemplate
- ContentPageTemplate
- ConversionPageTemplate

#### Pages
- Home
- Services
- Contact
- About
- Blog
- Portfolio
- Resources

## Current component reclassification
- `src/components/layout/container.tsx` -> foundation primitive
- `src/components/layout/full-width.tsx` -> template primitive
- `src/components/layout/narrow-page.tsx` -> template primitive
- `src/components/layout/header.tsx` -> organism
- `src/components/layout/footer.tsx` -> organism
- `src/components/layout/demo-frame.tsx` -> organism composed from molecules
- `src/components/demos/device-frame.tsx` -> molecule
- `src/components/demos/demo-placeholder.tsx` -> molecule/light organism
- `src/components/demos/workspace-onboarding-demo.tsx` -> organism
- home section components -> organisms
- domain section components -> organisms
- `src/components/mdx/*` -> rendering infrastructure layer, not part of the atomic design system

## Refactoring principle
Do not delete all existing organisms and start over. Instead:
1. define atoms
2. define molecules
3. refactor existing organisms to consume them
4. then rebuild priority pages using the shared system

## First implementation wave
### Wave 1
- typography atoms
- CTA atoms
- surface/card primitives
- section header / CTA group molecules

### Wave 2
- Home rebuild on top of shared system
- Services page implementation
- Contact page implementation

### Wave 3
- About short version
- blog index copy/positioning adjustment
- portfolio curation/retitling (not major rebuild)

## Explicit non-goals
- full portfolio overhaul in the first wave
- CMS/admin implementation
- deep SEO work in the same redesign slice
- replacing all MDX content architecture

## Success criteria
The redesign is successful when:
1. the first screen clearly says AI-built MVP rescue
2. Home -> Services -> Contact becomes the dominant conversion path
3. Services explains which engagement a founder should choose
4. existing posts continue to serve as educational/proof assets
5. the component system becomes more reusable and less card-fragmented
6. new pages/components can be added without inventing one-off visual patterns
