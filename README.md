# blog-re

React-based portfolio/blog that embeds live component demos per post. Built with Next.js App Router so posts, domain showcases, and resources can share layouts and data modules while deploying to Vercel with SEO defaults.

## Tech Stack
- Next.js 16 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4 design tokens
- ESLint 9 / Prettier defaults
- pnpm 10 workflows

## Getting Started
```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Quality Gates
```bash
pnpm lint         # Next.js ESLint rules
pnpm test         # (Placeholder until tests added)
pnpm check        # Lint + tests once scripts land
```

## Deployment
```bash
pnpm build        # production build
pnpm start        # serve .next output locally
```
Vercel deploys run `pnpm install && pnpm build`.

## Roadmap / TODO
- [x] Task 1 – Repository initialization & tooling
- [ ] Task 2 – Repo hygiene & CI basics
- [ ] Task 3 – Base layout & Tailwind tokens
- [ ] Task 4 – Content dir + MDX loader
- [ ] Task 5 – Homepage typed data modules
- [ ] Task 6 – Landing page sections
- [ ] Task 7 – Posts & layouts (full vs narrow)
- [ ] Task 8 – Domain showcase routes
- [ ] Task 9 – Resources page & PDF hook
- [ ] Task 10 – SEO, sitemap, analytics
- [ ] Task 11 – Deploy to Vercel
- [ ] Task 12 – Supporting repos + profile update
