# Credibility-First Launch Design

## Goal
Ship the portfolio/blog as a first public release that feels intentionally complete and credible, without waiting for the full SEO/analytics/deployment roadmap to be finished.

## Chosen Direction
Prioritize a **credibility-first launch** instead of either a bare-bones immediate deploy or an SEO-first delay. The first deploy should already include a clear conversion path for visitors who want to understand services, download a portfolio summary, and decide whether to reach out.

## Included in First Launch
- Homepage
- Posts index and post detail pages
- Domain showcase pages
- New `/resources` page
- Downloadable `portfolio.pdf`
- Small polish pass across CTAs/navigation/content consistency
- Deployment to Vercel after verification

## Explicitly Out of Scope
- advanced SEO system
- OG image generation
- analytics wiring
- post-launch discoverability optimization
- supporting repo/profile overhaul
- generic CMS/content infrastructure for resources

## Experience Principles
1. **Visitors should understand what is being offered quickly.**
2. **There must be a practical next step**: browse, download, contact, or book.
3. **The site should feel intentional**, not like an unfinished internal preview.
4. **The implementation should stay small** and reuse the existing typed-data + App Router architecture.

## `/resources` Page Role
The resources page is the decision-making page for visitors who are already interested. It should provide:
- plain-language explanation of who the work is for
- capability/stack overview
- downloadable portfolio PDF
- founder-friendly examples of problems solved
- a final CTA to contact or book

## `/resources` Structure
1. Intro / positioning block
2. Capabilities or stack table
3. Download section for `portfolio.pdf`
4. Founder-friendly “what I can help with” section
5. Final CTA

## PDF First Version
The PDF should be deliberately simple and usable, not overdesigned. A first version should include:
- short intro
- selected capabilities
- featured projects / domains
- contact info
- short “how I work” section

This can ship as a placeholder-quality asset as long as it feels presentable and downloadable.

## Technical Approach
Use the existing site architecture and avoid new systems:
- App Router route at `src/app/resources/page.tsx`
- typed content module such as `src/data/resources-content.ts`
- static PDF file at `public/portfolio.pdf`
- editable source note at `docs/portfolio.pdf.md`
- reuse existing layout/container/CTA patterns

## Success Criteria
A first-time visitor can:
- understand what the site owner builds
- view at least one strong interactive showcase
- browse domains and posts
- download a portfolio PDF
- find a clear contact path

## Post-Launch Sequence
After the first deploy, the next pass should cover:
1. metadata / SEO
2. sitemap / robots
3. analytics
4. PDF upgrade
5. supporting repo/profile polish
