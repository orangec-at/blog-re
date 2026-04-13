# blog-re Plan Status (2026-04-13)

## Completed
1. **Task 1-7 (worktree `blog-re-plan-exec`)**
   - Scaffolded Next.js 16 project with Tailwind, ESLint, CI.
   - Configured Contentlayer, MDX loader, typed data modules.
   - Implemented homepage sections (hero, before/after, case studies, refactoring log, IaC, Drawhatha, contact) with tests.
   - Built posts listing + `[slug]` routes with demo placeholder, layout support groundwork.
2. **Task 8 (worktree `task-7-8-posts-domains`)**
   - Finished Task 7 post-layout work: added narrow/full demo wrappers, domain filtering, device-framed MDX demos, and post-page layout selection from frontmatter.
   - Added `/domains` index plus `/domains/[domain]` showcase routes with static params, featured demo gallery, and associated repo cards.
   - Added tests covering posts filtering, post layout wiring, and domain showcase rendering.
3. **Showcase extension (2026-04-14)**
   - Added a full-width B2B dynamic onboarding post that embeds a React Hook Form + Zod workflow directly inside MDX content.
   - Preserved narrow reading width around breakout demo sections so full-screen-ish product UI can live inside editorial posts.
   - Added MDX renderer coverage plus updated posts/domain tests for the new showcase scenario.

## Pending
1. **Task 9 – Resources Page & PDF Hook**
   - `/resources`, Tech Stack table, portfolio.pdf scaffold.
2. **Task 10 – SEO, Sitemap, Analytics**
   - `next-sitemap`, metadata API, OG image, Vercel analytics.
3. **Task 11 – Deploy to Vercel**
   - Push to GitHub, connect to Vercel, verify preview.
4. **Task 12 – Supporting Repos & Profile**
   - Set up `fixmyvibe`, `drawhatha-retro`, profile updates.

## Next Steps
- Continue from Task 9 in a fresh worktree or master branch.
- After each task, update this status file and implementation plan.
- When Tasks 9-12 complete, archive this plan and start execution for remaining repos.
