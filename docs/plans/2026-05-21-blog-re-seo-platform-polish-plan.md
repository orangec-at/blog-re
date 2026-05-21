# Blog-Re SEO Platform Polish Implementation Plan

> **For Hermes:** Implement only after Jaeil sync/approval. Use TDD for each route/helper and keep publish/deploy/send approval-gated.

**Goal:** Add the remaining low-risk platform polish after the FMV content safety gate: root/static metadata, sitemap, robots, RSS feed, and minimal JSON-LD.

**Architecture:** Reuse `src/config/site.ts`, `src/lib/mdx.ts`, and Contentlayer posts as the source of truth. Keep generated metadata static and deterministic. Exclude `draft: true` posts from sitemap/feed/public route metadata. Avoid analytics, Search Console, dynamic OG image generation, deploys, and external distribution.

**Tech Stack:** Next.js 16 App Router metadata APIs, React 19, TypeScript, Contentlayer 0.3, Vitest, pnpm.

**Implementation status:** completed on 2026-05-21. Added root/static metadata, sitemap, robots, RSS feed, and WebSite/Organization JSON-LD rendering with BlogPosting helpers/tests. Verified `pnpm content:check`, targeted route/helper tests, `pnpm check`, `pnpm build`, and `git diff --check`.

**Current baseline:**
- Latest local blog-re commit before this plan: `afab91e feat: add FMV content safety gate`.
- Remaining pre-implementation dirty files were runtime noise only: `.omx/metrics.json`, `.omx/state/session.json`.
- `pnpm check` and `pnpm build` passed after the safety gate.
- Known warning: Contentlayer 0.3.3 prints `ERR_INVALID_ARG_TYPE` while exiting 0 under current Node.

**Safety boundaries:**
- Do not change `content/posts/ai-mvp-launch-checklist.mdx` from `draft: true`.
- Do not deploy preview/production.
- Do not send LinkedIn/X/Substack/community drafts.
- Do not add analytics/Search Console credentials.
- Do not add real client/result claims.
- Do not commit `.omx/*` runtime state.

---

## Task 1: Root metadata from central site config

**Objective:** Replace the minimal root metadata with site-wide metadataBase, title template, default OpenGraph, and Twitter card settings.

**Files:**
- Modify: `src/app/layout.tsx`
- Optional test: `src/app/__tests__/metadata.test.tsx` if import remains simple.

**Steps:**
1. Import `Metadata`, `absoluteUrl`, and `siteConfig`.
2. Set `metadataBase: new URL(siteConfig.url)`.
3. Set title default/template using `siteConfig.title` and `siteConfig.name`.
4. Add default `description`, canonical `/`, `openGraph`, and `twitter` objects.
5. Run `pnpm lint`.

**Acceptance:**
- No copy claims real client outcomes or guarantees.
- Lint passes.

---

## Task 2: Static route metadata

**Objective:** Add factual page-level metadata for home-adjacent static routes.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Optional: add `src/app/about/page.tsx` and `src/app/domains/page.tsx` if their structure is simple.

**Steps:**
1. Add `import type { Metadata } from "next";` where needed.
2. Export route-specific `metadata` with title, description, and canonical.
3. Keep descriptions service-oriented and conservative.
4. Run `pnpm lint`.

**Acceptance:**
- No external-source statistics, pricing, certification, or guarantee claims.
- Static pages still render.

---

## Task 3: Sitemap route for public routes only

**Objective:** Add `sitemap.xml` using public static routes and `getAllPosts()` only.

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/__tests__/sitemap-robots.test.ts`

**Test first:**
- `sitemap()` includes `https://wakeymoment.vercel.app/`, `/posts`, `/services`, `/resources`, `/contact`.
- `sitemap()` includes published posts.
- `sitemap()` does **not** include `/posts/ai-mvp-launch-checklist` while it remains draft.

**Implementation:**
- Use `MetadataRoute.Sitemap`.
- Use `absoluteUrl()`.
- Static routes: `/`, `/about`, `/services`, `/resources`, `/posts`, `/domains`, `/contact`.
- Post routes from `getAllPosts()`.

**Acceptance:**
- Draft posts excluded.
- Test passes.

---

## Task 4: Robots route

**Objective:** Add `robots.txt` pointing to the sitemap.

**Files:**
- Create: `src/app/robots.ts`
- Extend: `src/app/__tests__/sitemap-robots.test.ts`

**Test first:**
- `robots().sitemap` equals `https://wakeymoment.vercel.app/sitemap.xml`.
- rules allow `/` for `*`.

**Implementation:**
- Use `MetadataRoute.Robots`.
- Return `rules: { userAgent: "*", allow: "/" }` and sitemap URL.

**Acceptance:**
- Test passes.

---

## Task 5: RSS feed route for published posts only

**Objective:** Add a simple deterministic RSS feed that excludes drafts.

**Files:**
- Create: `src/app/feed.xml/route.ts`
- Create: `src/app/feed.xml/__tests__/route.test.ts`

**Test first:**
- `GET()` returns `content-type` including `application/rss+xml`.
- XML contains `<rss version="2.0">`.
- XML does not contain `ai-mvp-launch-checklist` while draft.

**Implementation:**
- Use `getAllPosts()`.
- Escape XML special characters.
- Include item title, link, guid, pubDate, description.

**Acceptance:**
- Feed excludes drafts.
- Test passes.

---

## Task 6: Minimal JSON-LD helpers

**Objective:** Add reusable structured-data builders without overbuilding schema.

**Files:**
- Create: `src/lib/structured-data.ts`
- Create: `src/lib/__tests__/structured-data.test.ts`
- Modify: `src/app/layout.tsx` or create a tiny server component if root WebSite JSON-LD should render globally.
- Optional Modify: `src/app/posts/[slug]/page.tsx` for BlogPosting JSON-LD if low-risk.

**Test first:**
- `buildWebsiteJsonLd()` returns `@type: "WebSite"`, `name`, `url`.
- `buildOrganizationJsonLd()` returns `@type: "Organization"`, `name`, `url`.
- `buildBlogPostingJsonLd()` returns `@type: "BlogPosting"`, `headline`, `url`, `datePublished`, `author`.

**Implementation:**
- Return plain serializable objects.
- Render via `<script type="application/ld+json" suppressHydrationWarning ...>` only after tests pass.

**Acceptance:**
- No fake organization claims beyond `wakeymoment`/FixMyVibe site ownership.
- Test passes.

---

## Task 7: Full gates and handoff update

**Objective:** Verify the platform polish and record what changed.

**Commands:**
```bash
pnpm content:check
pnpm test -- src/app/__tests__/sitemap-robots.test.ts src/app/feed.xml/__tests__/route.test.ts src/lib/__tests__/structured-data.test.ts --run
pnpm check
pnpm build
git diff --check
```

**Docs update:**
- Update this plan's implementation status.
- Append a short entry to `/Users/mac/workspace/vault/business/fixmyvibe/log.md` after implementation.

**Commit hygiene:**
- Include code/docs changes only.
- Exclude `.omx/metrics.json` and `.omx/state/session.json`.
- Suggested commit: `feat: add blog metadata routes`.

---

## Explicitly deferred

- Preview deploy / production deploy.
- Publishing `ai-mvp-launch-checklist`.
- External distribution.
- Dynamic OG images.
- Analytics/Search Console setup.
- CMS/admin workflow.
- Real contact credential changes.
