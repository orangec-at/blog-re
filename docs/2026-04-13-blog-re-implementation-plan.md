# blog-re Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stand up the new `blog-re` repository as a React-based portfolio/blog that embeds live components per post, supports multiple layouts, and ships on Vercel with SEO-ready defaults.

**Architecture:** Next.js 16 App Router, MDX posts pulled from `content/`, demo components colocated under `components/demos`, typed data modules for homepage/case studies/domains, Vercel deploy pipeline. Multi-repo strategy: `blog-re` handles presentation, `fixmyvibe` etc. remain separate showcases.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS, MDX via Contentlayer, ESLint, Vitest, Vercel.

---

## Progress Snapshot (updated 2026-04-14)
- ✅ Tasks 1-7 completed in worktree `blog-re-plan-exec` and merged into master
- ✅ Task 8 completed in worktree `task-7-8-posts-domains`
- ✅ Showcase extension added in the same worktree: full-width B2B dynamic onboarding post with React Hook Form + Zod demo
- ✅ Task 9 completed in worktree `credibility-first-launch`: `/resources` exists and the `portfolio.pdf` download hook is in place
- ⏳ Task 11 is next: deploy the current launch candidate to Vercel
- ⏳ Task 10 remains pending after deploy: SEO, sitemap, and analytics follow-up
- ⏳ Task 12 remains pending: supporting repos and profile updates

### Task 1: Repository Initialization & Tooling

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`, `.prettierrc`, `.gitignore`
- Generate: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Docs: `README.md`

**Steps:**
1. Run `pnpm create next-app@latest blog-re --ts --tailwind --eslint --app --src-dir --import-alias "@/*"` inside `/Users/jaylee222/workspace/blog-re`.
2. Verify `pnpm install` completes; run `pnpm lint` to ensure base config works.
3. Configure `.gitignore` to include `.next`, `.vercel`, `node_modules`, `content/*.mdx` build artifacts.
4. Update `README.md` with project purpose, stack summary, and TODO list.
5. Commit `chore: scaffold next.js app`.

### Task 2: Repository Hygiene & CI Basics

**Files:**
- Create: `.editorconfig`, `.nvmrc`, `pnpm-lock.yaml`
- GitHub workflows: `.github/workflows/ci.yml`

**Steps:**
1. Add `.editorconfig` with UTF-8, LF, 2-space indentation, final newline.
2. If using specific Node version (e.g., 20), set `.nvmrc` + update README.
3. Configure ESLint script `"lint": "next lint"`, `"test": "pnpm lint"` (temporarily) and `"check": "pnpm lint && pnpm test"`.
4. Create GitHub Actions workflow:
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v2
           with: { version: 8 }
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm lint
         - run: pnpm test -- --passWithNoTests
   ```
5. Commit `chore: add repo tooling and CI scaffold`.

### Task 3: Base Layout & Tailwind Tokens

**Files:**
- Modify: `src/app/globals.css`, `tailwind.config.ts`
- Create: `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/components/layout/container.tsx`
- Update: `src/app/layout.tsx`

**Steps:**
1. Define CSS variables for color palette and typography in `globals.css`; include `@tailwind base/components/utilities`.
2. Configure Tailwind theme: fonts, extended colors, spacing tokens.
3. Implement `Header` with logo placeholder + nav stubs (Home, Posts, Domains, Resources, Contact).
4. Implement `Footer` with social links, bilingual slogan.
5. Create `Container` component supporting `variant="narrow" | "wide"` props.
6. Wire layout components in `app/layout.tsx` (wrap children in `<Header><main><Footer>` structure).
7. Commit `feat: add base layout and design tokens`.

### Task 4: Content Directory Structure & MDX Loader

**Files:**
- Create directories: `content/posts`, `content/case-studies`, `content/domains`
- Create: `src/lib/mdx.ts`, `src/contentlayer.config.ts` (if using Contentlayer) or custom MDX loader.
- Types: `src/types/frontmatter.ts`

**Steps:**
1. Choose MDX strategy: Contentlayer recommended for typed frontmatter.
2. Configure MDX loader to parse frontmatter fields: `title`, `date`, `summary`, `domain`, `layout`, `demoComponent`.
3. Export helper functions: `getAllPosts()`, `getPostBySlug(slug)` from `src/lib/mdx.ts`.
4. Create sample MDX post that imports `DemoPlaceholder` component.
5. Update `next.config.mjs` to enable MDX (if not using Contentlayer).
6. Commit `feat: lay out content dirs and MDX loader`.

### Task 5: Homepage Typed Data Modules

**Files:**
- Create: `src/data/homepage-content.ts`, `src/data/projects.ts`, `src/data/contacts.ts`
- Tests: `src/data/__tests__/homepage-content.test.ts`

**Steps:**
1. Port the structured copy (hero, before/after, principles, case studies) into `homepage-content.ts` with TypeScript interfaces.
2. Mirror the structure used in previous repo but trimmed for blog-re needs.
3. Add Jest or Vitest (if desired) to verify counts (e.g., 3 primary case studies, 1 supporting, etc.).
4. Commit `feat: add typed homepage copy modules`.

### Task 6: Landing Page Sections

**Files:**
- Create components under `src/components/home/`: `hero.tsx`, `before-after-board.tsx`, `decision-principles.tsx`, `case-study-grid.tsx`, `refactoring-log.tsx`, `iac-highlight.tsx`, `drawhatha-highlight.tsx`, `contact-cta.tsx`
- Update: `src/app/page.tsx`
- Tests: `src/components/home/__tests__/*.test.tsx`

**Steps:**
1. For each section, render data from `homepage-content.ts`.
2. Use `Container` with `variant` to alternate widths.
3. Add data-testid hooks for hero, principles, case studies, etc.
4. Unit test each section with Testing Library to ensure key text and links exist.
5. Snapshot the full landing page to detect regressions.
6. Commit `feat: implement landing page sections`.

### Task 7: Posts & Layouts (Full vs Narrow)

**Files:**
- Layout wrappers: `src/components/layout/full-width.tsx`, `narrow-page.tsx`, `demo-frame.tsx`
- App routes: `src/app/posts/page.tsx`, `src/app/posts/[slug]/page.tsx`
- Demo components: `src/components/demos/demo-placeholder.tsx`, `device-frame.tsx`

**Steps:**
1. Implement layout wrappers that compose `<Container variant="narrow">` and full-bleed sections.
2. `posts/page.tsx`: list all MDX posts with metadata, filter by domain.
3. `posts/[slug]`: load MDX via `getPostBySlug`, render `MDXRemote` (or Contentlayer `generateStaticParams`). Choose layout based on frontmatter.
4. Provide MDX components map to auto-wrap `Demo` blocks in `<FullWidth>` or `<Narrow>` based on props.
5. Add `DemoMeta` component to display stack + repo links.
6. Commit `feat: support posts with dynamic layouts and demos`.

### Task 8: Domain Showcase Routes

**Files:**
- Routes: `src/app/domains/[domain]/page.tsx`
- Data: extend `src/data/projects.ts` with domain groupings.
- Components: `src/components/domains/domain-hero.tsx`, `demo-gallery.tsx`

**Steps:**
1. Define domain metadata: FixMyVibe, Drawhatha, etc., referencing MDX posts or GitHub repos.
2. Create page template that shows domain overview, featured demos, link to refactoring log.
3. Ensure static params cover all domains.
4. Commit `feat: add domain showcase pages`.

### Task 9: Resources Page & PDF Hook

**Files:**
- `src/app/resources/page.tsx`
- `public/portfolio.pdf`
- `docs/portfolio.pdf.md`

**Steps:**
1. Create Markdown outline for PDF; generate initial PDF (out of scope for code but include placeholder file).
2. Resources page lists Tech Stack levels (Expert/Proficient) and provides download button for PDF.
3. Include contact CTA + instructions for non-technical founders.
4. Commit `feat: add resources page with PDF download`.

### Task 10: SEO, Sitemap, Analytics

**Files:**
- `next-sitemap.config.js`
- Update `next.config.mjs` for OG image routes or use `@vercel/og` for `/api/og`.
- `src/app/sitemap.ts`, `src/app/robots.ts`

**Steps:**
1. Install `next-sitemap`, configure baseUrl = production domain.
2. Define dynamic metadata in layout/head using Next.js metadata API.
3. Implement simple OG image handler for posts.
4. Enable Vercel Analytics via `@vercel/analytics/react`.
5. Commit `chore: configure SEO and analytics`.

### Task 11: Deploy to Vercel

**Files:**
- None (config via Vercel dashboard)

**Steps:**
1. `git remote add origin https://github.com/orangec-at/blog-re.git` (already added). Push initial commits after Task 1.
2. Connect repo to Vercel, set build command `pnpm install && pnpm build`.
3. Test preview deployment; verify landing + sample post render. Fix any build issues.
4. Once stable, set custom domain (if desired) and enable production deploy.
5. Commit `docs: add deployment instructions` (if new info captured).

### Task 12: Supporting Repos + Profile Update (Tracked separately)
- Set up `fixmyvibe`, `drawhatha-retro` repos with README, issues, IaC, etc. (outside scope of blog-re repo but gated by landing links).
- Update GitHub profile README to feature `blog-re` + slogan.

---
