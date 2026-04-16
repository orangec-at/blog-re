# wakeymoment

AI MVP rescue site for founders whose prototype, launch content, or early product needs calmer technical direction before the next release. Built with Next.js App Router so Home, Services, Contact, and About carry the conversion path while posts, domain showcases, and resources stay available as supporting proof.

## Tech Stack
- Next.js 16 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4
- Contentlayer MDX + client-side demo components
- Atomic UI foundation under `src/components/ui/`
- React Hook Form + Zod for interactive product showcases
- ESLint 9 + Vitest
- pnpm 10 workflows

## Current Product Slice
- AI MVP rescue positioning now drives the primary Home → Services → Contact path, with `/about` as a short trust page.
- Shared atomic-design primitives and molecules power the redesigned conversion pages.
- Existing posts, domain showcases, the `/resources` page, and `portfolio.pdf` remain in place as supporting or progressive proof assets.
- SEO/sitemap/analytics, CMS/admin workflows, and a full portfolio overhaul are not done in this slice.

## Getting Started
```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Quality Gates
```bash
pnpm lint         # Next.js ESLint rules
pnpm test         # Vitest component / route coverage
pnpm check        # Lint + tests
pnpm build        # production build
```

## Deployment
```bash
pnpm start        # serve .next output locally after pnpm build
```
Vercel deployment is still a follow-up step for the latest redesign candidate.

## Roadmap / TODO
- [x] Task 1 – Repository initialization & tooling
- [x] Task 2 – Repo hygiene & CI basics
- [x] Task 3 – Base layout & Tailwind tokens
- [x] Task 4 – Content dir + MDX loader
- [x] Task 5 – Homepage typed data modules
- [x] Task 6 – Landing page sections
- [x] Task 7 – Posts & layouts (full vs narrow)
- [x] Task 8 – Domain showcase routes
- [x] Showcase extension – Full-width B2B dynamic onboarding demo post
- [x] Task 9 – Resources page & PDF hook
- [x] Redesign slice – AI MVP rescue positioning, new conversion pages, atomic foundation
- [ ] Deploy the latest redesign candidate to Vercel
- [ ] SEO, sitemap, analytics follow-up
- [ ] Portfolio curation/retitling beyond the current first-pass proof assets
- [ ] CMS/admin workflow (not started / out of scope for current slice)
- [ ] Supporting repos + profile update
