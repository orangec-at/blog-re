# wakeymoment

React-based portfolio/blog that embeds live component demos per post. Built with Next.js App Router so posts, domain showcases, and resources can share layouts and data modules while deploying to Vercel with SEO defaults.

## Tech Stack
- Next.js 16 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4 design tokens
- Contentlayer MDX + client-side demo components
- React Hook Form + Zod for interactive product showcases
- ESLint 9 + Vitest
- pnpm 10 workflows

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
```

## Deployment
```bash
pnpm build        # production build
pnpm start        # serve .next output locally
```
Vercel deploys run `pnpm install && pnpm build`.

Current launch status: the `/resources` page and `portfolio.pdf` download are in place. Deployment to Vercel is the next step, while SEO/sitemap/analytics work remains pending.

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
- [ ] Task 11 – Deploy to Vercel (next)
- [ ] Task 10 – SEO, sitemap, analytics (after deploy)
- [ ] Task 12 – Supporting repos + profile update
