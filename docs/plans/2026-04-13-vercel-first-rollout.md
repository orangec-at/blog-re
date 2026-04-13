# blog-re Vercel-First Rollout Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Finish the initial public release of `blog-re` by deploying to Vercel first, then completing domain showcases, resources, SEO, and required MDX posts with live components.

**Architecture:** Continue using the existing Next.js 15 + Contentlayer stack. Deploy master branch to Vercel and validate preview builds while iterating on remaining features. Domain showcase pages and resources leverage the same data modules and demo components already structured under `src/`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS, Contentlayer MDX, Vitest/Testing Library, pnpm, Vercel.

---

### Task 1: Pre-Deployment Audit

**Files:**
- N/A (verification only)

**Step 1: Install deps & run lint/test/build**
```bash
pnpm install
pnpm lint
pnpm test -- --runInBand
pnpm build
```
Expected: All commands pass; build outputs `.next` locally.

**Step 2: Review README checklist**
- Update `README.md` with current status (Tasks 1-7 complete, Vercel deploy pending).
- Note required environment variables if any.

**Step 3: Commit (if README changed)**
```bash
git add README.md
git commit -m "docs: note pre-deploy checklist"
```

### Task 2: Vercel Deployment (Task 11 from master plan)

**Files:**
- None (Vercel dashboard + repository state)

**Step 1: Push latest master**
```bash
git push origin master
```

**Step 2: Create Vercel project**
- Connect GitHub repo `orangec-at/blog-re`.
- Build command: `pnpm install && pnpm build`.
- Output directory: `.next` (default). No env vars yet.

**Step 3: Verify preview deployment**
- Open Vercel preview URL.
- Check Home (`/`) and sample post `/posts/hello-world` render without errors.

**Step 4: Promote to production**
- Trigger production deploy once preview is clean.
- Record preview + production URL in `README.md`.

**Step 5: Commit docs update**
```bash
git add README.md docs/2026-04-13-blog-re-plan-status.md
git commit -m "docs: record Vercel deployment"
```

### Task 3: Domain Showcase Pages (Task 8)

**Files:**
- Create: `src/app/domains/[domain]/page.tsx`
- Data: extend `src/data/projects.ts`
- Components: `src/components/domains/domain-hero.tsx`, `demo-gallery.tsx`
- Tests: `src/app/domains/__tests__/[domain].test.tsx`

**Step 1: Extend data**
```ts
export const DOMAINS = [
  {
    id: "fixmyvibe",
    title: "FixMyVibe",
    headline: "Refactoring log for operation workflows",
    highlights: [...],
    demos: ["/posts/fixmyvibe-ops"]
  },
  // ...drawhatha...
];
```

**Step 2: Build domain components**
- `domain-hero.tsx`: renders headline, CTA to GitHub repo.
- `demo-gallery.tsx`: loops through demos, embeds `<MDXContent>` if local or external link.

**Step 3: Route implementation**
```tsx
export function generateStaticParams() {
  return DOMAINS.map((d) => ({ domain: d.id }));
}

export default function DomainPage({ params }) {
  const domain = DOMAINS.find((d) => d.id === params.domain);
  if (!domain) notFound();
  return (
    <Container variant="wide">
      <DomainHero domain={domain} />
      <DemoGallery demos={domain.demos} />
    </Container>
  );
}
```

**Step 4: Tests**
```bash
pnpm test src/app/domains/__tests__/fixmyvibe.test.tsx
```

**Step 5: Commit**
```bash
git add src/data projects, components, tests
git commit -m "feat: add domain showcase pages"
```

### Task 4: Resources Page & PDF Hook (Task 9)

**Files:**
- `src/app/resources/page.tsx`
- `docs/portfolio.pdf.md`
- `public/portfolio.pdf`
- Tests: `src/app/resources/__tests__/page.test.tsx`

**Step 1: Draft PDF outline**
- Update `docs/portfolio.pdf.md` with Tech Stack table, project deep dives, philosophy.

**Step 2: Generate placeholder PDF**
```bash
pandoc docs/portfolio.pdf.md -o public/portfolio.pdf
```

**Step 3: Build page**
```tsx
export default function ResourcesPage() {
  return (
    <Container variant="narrow">
      <TechStackTable />
      <DownloadCard href="/portfolio.pdf" />
      <ContactCTA variant="secondary" />
    </Container>
  );
}
```

**Step 4: Test**
```bash
pnpm test src/app/resources/__tests__/page.test.tsx
```

**Step 5: Commit**
```bash
git add docs/portfolio.pdf.md public/portfolio.pdf src/app/resources
git commit -m "feat: add resources page with PDF"
```

### Task 5: SEO, Sitemap, Analytics (Task 10)

**Files:**
- `next-sitemap.config.js`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/app/api/og/route.tsx`
- `src/app/layout.tsx` (metadata updates)

**Step 1: Install tooling**
```bash
pnpm add next-sitemap
```
Add script: `"postbuild": "next-sitemap"`.

**Step 2: Configure metadata**
```ts
export const metadata = {
  metadataBase: new URL("https://blog-re.vercel.app"),
  title: { default: "System Accelerator", template: "%s | System Accelerator" },
  description: "...",
};
```

**Step 3: OG image route**
```tsx
import { ImageResponse } from "next/og";
export const runtime = "edge";
export function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "System Accelerator";
  return new ImageResponse(<OGCard title={title} />, { width: 1200, height: 630 });
}
```

**Step 4: Analytics**
- Install `@vercel/analytics` and add `<Analytics />` to `app/layout.tsx`.

**Step 5: Commit**
```bash
git add next-sitemap.config.js src/app/{sitemap.ts,robots.ts,api/og/route.tsx,layout.tsx}
git commit -m "chore: add SEO, sitemap, and analytics"
```

### Task 6: MDX Posts + Landing Polish

**Files:**
- `content/posts/*.mdx` (3 new posts)
- `src/components/demos/*` for required interactive components
- Tests: `src/app/posts/__tests__/page.test.tsx`

**Step 1: Author MDX posts**
- `fixmyvibe-refactor.mdx`, `drawhatha-retro.mdx`, `ai-case-study.mdx` with frontmatter specifying layout + demo component.

**Step 2: Build demo components**
```tsx
export function OpsDashboardDemo() {
  return (
    <FullWidth>
      <DemoFrame title="FixMyVibe Ops">
        {/* interactive UI */}
      </DemoFrame>
    </FullWidth>
  );
}
```

**Step 3: Update Contentlayer types if new fields added.**

**Step 4: Tests**
```bash
pnpm test src/app/posts/__tests__/page.test.tsx
```

**Step 5: Commit**
```bash
git add content/posts src/components/demos src/lib/mdx.ts
git commit -m "feat: add initial blog posts with live demos"
```

### Task 7: Update Docs & Status

**Files:**
- `docs/2026-04-13-blog-re-plan-status.md`
- `README.md`

**Step 1: Document completion**
- Update status file with tasks finished, remaining work (if any).
- README: add sections for Domains, Resources, SEO, deployment links.

**Step 2: Commit**
```bash
git add docs/2026-04-13-blog-re-plan-status.md README.md
git commit -m "docs: update plan status after rollout"
```

**Step 3: Confirm Vercel deploy**
- Ensure latest commit auto-deploys successfully.
- Tag release: `git tag v0.1.0 && git push origin v0.1.0`.

---
