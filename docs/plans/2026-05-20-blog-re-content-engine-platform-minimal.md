# Minimal Blog-Re Content Engine Platform Improvements Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Add the smallest safe blog-re platform layer needed to turn approved MDX drafts into publish-ready content without accidental public claims, missing SEO metadata, broken CTA paths, or unverified build output.

**Implementation status:** first safety slice implemented on 2026-05-20 after the approval packet. Completed Tasks 1, 2 partial, 3, 4, and 6 partial: central site config, Contentlayer field consolidation, `pnpm content:check`, placeholder contact removal, absolute post social metadata, production-like draft direct access guard, and verification. Deferred: root/static page metadata, sitemap, robots, RSS, and JSON-LD.

**Architecture:** Keep Contentlayer MDX as the source of content truth and add a small TypeScript config/validation layer around it. Use Next.js App Router metadata conventions for root/page/post SEO, sitemap, robots, and feed endpoints. Put publish safety in local build gates first; defer CMS, analytics, dynamic OG generation, and external distribution until after Jaeil approval.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Contentlayer 0.3, Zod, Vitest, pnpm.

---

## Current repo state this plan assumes

- Workspace: `/Users/mac/workspace/blog-re`.
- Current branch at inspection: `master...origin/master [ahead 1]`.
- Existing WIP must be preserved: `.omx/*`, `content/posts/ai-mvp-launch-checklist.mdx`, `contentlayer.config.ts`, post page tests/UI, article blocks, CTA rail, and SEO/distribution approval packet are already dirty/untracked.
- `contentlayer.config.ts` already has partial SEO/draft fields in WIP: `draft`, `seoTitle`, `seoDescription`, `keywords`, `tags`, `canonicalPath`.
- `src/contentlayer.config.ts` is a stale duplicate and should not remain as a competing source of truth.
- `src/app/posts/[slug]/page.tsx` already has a WIP `generateMetadata` for posts.
- `src/lib/mdx.ts` already filters draft posts from listing/domain routes while still allowing direct draft slug rendering; final publish gate should catch this explicitly.
- Missing platform pieces from infra audit: central site config, root metadataBase/default OG/Twitter, static-page metadata, sitemap, robots, RSS/feed, structured data, and publish-safety script.
- Known risk: `src/data/contacts.ts` still contains `mailto:hello@example.com`; public publish should fail until Jaeil confirms the real contact channel.
- Safety boundaries: no public publish, production deploy, SNS/external send, paid spend, real-client/client-result claims, destructive git, or credential changes.

## Stop / approval gates

Stop and ask Jaeil before:

- changing `draft: true` to `false` for any FMV post;
- replacing `hello@example.com` with a real email/contact credential if it is not already in repo docs;
- deploying to Vercel production or preview for public sharing;
- adding real-client/client-result proof claims;
- sending LinkedIn/X/Substack/community drafts.

## Implementation sequence

### Task 1: Add central site config with safe defaults

**Objective:** Create a single local config for site URL, brand metadata, default social metadata, and CTA/contact placeholders so metadata, sitemap, robots, RSS, and validators do not duplicate strings.

**Files:**
- Create: `src/config/site.ts`
- Test: `src/config/__tests__/site.test.ts`

**Step 1: Write failing test**

```ts
import { describe, expect, it } from "vitest";
import { siteConfig, absoluteUrl, isPlaceholderContact } from "@/config/site";

describe("siteConfig", () => {
  it("normalizes absolute URLs from paths", () => {
    expect(absoluteUrl("/posts/example")).toBe(`${siteConfig.url}/posts/example`);
  });

  it("detects placeholder contact channels", () => {
    expect(isPlaceholderContact("mailto:hello@example.com")).toBe(true);
    expect(isPlaceholderContact("/contact")).toBe(false);
  });
});
```

**Step 2: Run test to verify failure**

Run: `pnpm test -- src/config/__tests__/site.test.ts --run`
Expected: FAIL — module `@/config/site` does not exist.

**Step 3: Write minimal implementation**

```ts
export const siteConfig = {
  name: "wakeymoment",
  title: "wakeymoment — FixMyVibe technical debt rescue",
  description: "Founder-friendly technical debt diagnosis, remodeling, and launch-readiness support for AI-built MVPs.",
  url: "https://wakeymoment.vercel.app",
  locale: "en",
  defaultOgImage: "/og/default.png",
  contactPath: "/contact",
  disallowedPlaceholders: ["hello@example.com", "example.com", "TODO", "TBD"],
} as const;

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteConfig.url}${path}`;
}

export function isPlaceholderContact(value: string): boolean {
  return siteConfig.disallowedPlaceholders.some((placeholder) =>
    value.toLowerCase().includes(placeholder.toLowerCase()),
  );
}
```

**Step 4: Run test to verify pass**

Run: `pnpm test -- src/config/__tests__/site.test.ts --run`
Expected: PASS.

**Step 5: Commit after review only**

Do not commit automatically if other workers have dirty WIP. Suggested commit after review: `chore: add site config for content engine`.

---

### Task 2: Consolidate Contentlayer config and frontmatter fields

**Objective:** Ensure there is one Contentlayer schema with the minimal publish-ready frontmatter fields: title, date, updated, summary, domain, layout, draft, author, seoTitle, seoDescription, keywords, tags, canonicalPath, ogImage, and optional demoComponent.

**Files:**
- Modify: `contentlayer.config.ts`
- Modify or delete after confirming imports: `src/contentlayer.config.ts`
- Test: `scripts/check-content-engine.ts` in Task 3 will validate this schema indirectly.

**Step 1: Inspect duplicate usage**

Run: `rg "src/contentlayer.config|contentlayer.config" . --glob '!node_modules' --glob '!.next' --glob '!out'`
Expected: only the root `contentlayer.config.ts` should be used by scripts/config; if `src/contentlayer.config.ts` has no valid consumer, remove it in this task.

**Step 2: Update root schema**

Add only the missing fields to the already-dirty root schema:

```ts
updated: { type: "date" },
author: { type: "string", default: "Jaeil Lee" },
ogImage: { type: "string" },
```

Keep existing fields:

```ts
draft: { type: "boolean", default: false },
seoTitle: { type: "string" },
seoDescription: { type: "string" },
keywords: { type: "list", of: { type: "string" }, default: [] },
tags: { type: "list", of: { type: "string" }, default: [] },
canonicalPath: { type: "string" },
```

**Step 3: Add first draft frontmatter only where already approved**

For `content/posts/ai-mvp-launch-checklist.mdx`, keep `draft: true`. Add only missing fields if absent:

```yaml
updated: "2026-05-20"
author: "Jaeil Lee"
ogImage: "/og/ai-mvp-launch-checklist.png"
```

Do not change publish state.

**Step 4: Run content build**

Run: `pnpm content:build`
Expected: Contentlayer documents generate. If Node v24 still prints `ERR_INVALID_ARG_TYPE`, document it in the handoff; do not hide it.

---

### Task 3: Add publish-safety content gate

**Objective:** Fail fast when content is not safe to publish: placeholder contact channels, published posts missing SEO fields, invalid canonical paths, draft posts included in public indexes, and unapproved client/result claims.

**Files:**
- Create: `scripts/check-content-engine.ts`
- Modify: `package.json`
- Test: `scripts/__tests__/check-content-engine.test.ts` if the script exports pure helpers; otherwise use CLI verification in Step 5.

**Step 1: Write failing helper tests**

```ts
import { describe, expect, it } from "vitest";
import { findUnsafeClaims, validatePostFrontmatter } from "../../scripts/check-content-engine";

describe("content engine checks", () => {
  it("requires SEO fields for non-draft posts", () => {
    const errors = validatePostFrontmatter({
      slug: "example",
      draft: false,
      title: "Example",
      summary: "Short summary",
      canonicalPath: "/posts/example",
      tags: [],
      keywords: [],
    });

    expect(errors).toContain("example: missing seoTitle");
    expect(errors).toContain("example: missing seoDescription");
  });

  it("flags unapproved result/client-proof language", () => {
    expect(findUnsafeClaims("Proof/results for APAC clinics and client case study")).toHaveLength(3);
  });
});
```

**Step 2: Run test to verify failure**

Run: `pnpm test -- scripts/__tests__/check-content-engine.test.ts --run`
Expected: FAIL — script/helper does not exist.

**Step 3: Implement minimal helpers and CLI**

Core rules:

```ts
const unsafeClaimPatterns = [/client result/i, /client case study/i, /proof\/results/i, /APAC clinics/i, /founding duo/i];
const requiredPublishedFields = ["seoTitle", "seoDescription", "canonicalPath", "tags", "keywords"] as const;
```

Validation behavior:

- published post (`draft !== true`) must have `seoTitle`, `seoDescription`, `canonicalPath`, at least 1 tag, at least 1 keyword;
- `canonicalPath` must start with `/posts/` unless it is an absolute URL;
- draft post may miss some SEO fields but should emit warning, not failure;
- repo-wide scan should fail on `hello@example.com`, `example.com` contact links, and unsafe claim patterns outside approved sample/draft docs;
- script prints `content-engine check passed` on success and exits non-zero on errors.

**Step 4: Wire package scripts**

Modify `package.json`:

```json
{
  "scripts": {
    "content:check": "tsx scripts/check-content-engine.ts",
    "check": "pnpm content:check && pnpm lint && pnpm test",
    "prebuild": "pnpm content:check && pnpm content:build"
  }
}
```

If `tsx` is not installed, either use `ts-node` already in devDependencies or add `tsx` only if the team accepts a dependency change. Low-risk default: use `ts-node --project tsconfig.json scripts/check-content-engine.ts`.

**Step 5: Verify**

Run: `pnpm content:check`
Expected now: FAIL until placeholder contact and legacy proof wording are resolved or explicitly allowlisted.

Because this is a safety gate, do not weaken the check just to pass. Instead record the exact blockers.

---

### Task 4: Replace placeholder contact only after approval or gate it

**Objective:** Ensure CTA paths do not lead to an obviously fake email while avoiding unauthorized credential/contact changes.

**Files:**
- Modify: `src/data/contacts.ts`
- Modify: `src/data/__tests__/redesign-content.test.ts` or create `src/data/__tests__/contacts.test.ts`

**Step 1: Write failing test**

```ts
import { describe, expect, it } from "vitest";
import { contactChannels } from "@/data/contacts";
import { isPlaceholderContact } from "@/config/site";

describe("contact channels", () => {
  it("does not expose placeholder contact links", () => {
    expect(contactChannels.some((channel) => isPlaceholderContact(channel.href))).toBe(false);
  });
});
```

**Step 2: Run test to verify failure**

Run: `pnpm test -- src/data/__tests__/contacts.test.ts --run`
Expected: FAIL while `mailto:hello@example.com` remains.

**Step 3: Safe implementation choice**

If Jaeil has not approved a real contact channel, do not invent one. Either:

1. Keep `/contact` as the only public CTA path and remove the fake `mailto:` channel from visible contact cards; or
2. Keep the channel hidden/disabled with copy: `Contact channel pending approval`.

Preferred minimal code if no approved email exists:

```ts
export const contactChannels: ContactChannel[] = [
  {
    label: "Inquiry form",
    href: "/contact",
    description: "Start with the site contact page until a verified email channel is approved.",
  },
];
```

**Step 4: Verify**

Run: `pnpm test -- src/data/__tests__/contacts.test.ts --run`
Expected: PASS.

---

### Task 5: Add root metadata and static page metadata

**Objective:** Improve default SEO/social tags without waiting for dynamic OG generation.

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Optional test: `src/app/__tests__/metadata.test.ts` if metadata exports are easy to import.

**Step 1: Read Next 16 docs before code**

Already verified docs paths:

- `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`

Key rule: `metadata`/`generateMetadata` exports are Server Component only and should not share a route segment.

**Step 2: Update root metadata**

In `src/app/layout.tsx`:

```ts
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
};
```

**Step 3: Add page-level metadata**

For each static route, export a small `metadata` object with route-specific title/description/canonical. Keep copy factual, no client-result claims.

Example for `src/app/resources/page.tsx`:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Founder-friendly resources for AI MVP launch-readiness, technical debt diagnosis, and remodeling decisions.",
  alternates: { canonical: "/resources" },
};
```

**Step 4: Verify**

Run: `pnpm lint`
Expected: PASS.

---

### Task 6: Finish post metadata with absolute URLs and OG image fallback

**Objective:** Build on the existing WIP `generateMetadata` so every post has canonical, OpenGraph, Twitter, author/published/modified metadata, and image fallback.

**Files:**
- Modify: `src/app/posts/[slug]/page.tsx`
- Test: `src/app/posts/[slug]/__tests__/page.test.tsx`

**Step 1: Extend existing metadata test**

Add expectations:

```ts
expect(metadata.openGraph).toMatchObject({
  type: "article",
  url: "https://wakeymoment.vercel.app/posts/ai-mvp-launch-checklist",
  siteName: "wakeymoment",
});
expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
```

**Step 2: Update implementation**

Use `absoluteUrl(canonical)` for `openGraph.url`; use `seo.ogImage ?? siteConfig.defaultOgImage` for images. Keep existing `notFound` behavior unchanged.

**Step 3: Verify**

Run: `pnpm test -- src/app/posts/[slug]/__tests__/page.test.tsx --run`
Expected: PASS.

---

### Task 7: Add sitemap and robots

**Objective:** Use Next.js metadata file conventions to expose crawlable routes and published posts only.

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Test: `src/app/__tests__/sitemap-robots.test.ts`

**Step 1: Read docs before code**

Already verified docs paths:

- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`

**Step 2: Write failing test**

```ts
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("metadata routes", () => {
  it("includes public static routes and excludes draft posts", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://wakeymoment.vercel.app/");
    expect(urls).toContain("https://wakeymoment.vercel.app/posts");
    expect(urls).not.toContain("https://wakeymoment.vercel.app/posts/ai-mvp-launch-checklist");
  });

  it("points robots to the sitemap", () => {
    expect(robots().sitemap).toBe("https://wakeymoment.vercel.app/sitemap.xml");
  });
});
```

**Step 3: Implement sitemap**

```ts
import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { absoluteUrl } from "@/config/site";
import { getAllPosts } from "@/lib/mdx";

const staticRoutes = ["/", "/about", "/services", "/resources", "/posts", "/domains", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: absoluteUrl(post.url),
    lastModified: new Date((post as typeof post & { updated?: string }).updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
```

Remove unused `allPosts` if not needed.

**Step 4: Implement robots**

```ts
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
```

**Step 5: Verify**

Run: `pnpm test -- src/app/__tests__/sitemap-robots.test.ts --run`
Expected: PASS.

---

### Task 8: Add RSS/feed route for published posts only

**Objective:** Provide a simple feed for future content-engine distribution without posting externally.

**Files:**
- Create: `src/app/feed.xml/route.ts`
- Test: `src/app/feed.xml/__tests__/route.test.ts`

**Step 1: Write failing route test**

```ts
import { describe, expect, it } from "vitest";
import { GET } from "@/app/feed.xml/route";

describe("feed.xml", () => {
  it("returns rss xml without draft posts", async () => {
    const response = await GET();
    const text = await response.text();

    expect(response.headers.get("content-type")).toContain("application/rss+xml");
    expect(text).toContain("<rss version=\"2.0\"");
    expect(text).not.toContain("ai-mvp-launch-checklist");
  });
});
```

**Step 2: Implement route**

Use `getAllPosts()` so draft posts are excluded:

```ts
import { absoluteUrl, siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/mdx";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const items = getAllPosts()
    .map((post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${absoluteUrl(post.url)}</link>
        <guid>${absoluteUrl(post.url)}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${escapeXml(post.summary)}</description>
      </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
```

**Step 3: Verify**

Run: `pnpm test -- src/app/feed.xml/__tests__/route.test.ts --run`
Expected: PASS.

---

### Task 9: Add minimal structured data helpers

**Objective:** Add reusable JSON-LD generation for WebSite/Organization and BlogPosting without overbuilding schemas.

**Files:**
- Create: `src/lib/structured-data.ts`
- Test: `src/lib/__tests__/structured-data.test.ts`
- Modify: `src/app/layout.tsx` or create a tiny server component used by root layout
- Modify: `src/app/posts/[slug]/page.tsx`

**Step 1: Write helper tests**

```ts
import { describe, expect, it } from "vitest";
import { buildBlogPostingJsonLd, buildWebsiteJsonLd } from "@/lib/structured-data";

describe("structured data", () => {
  it("builds website json-ld", () => {
    expect(buildWebsiteJsonLd()).toMatchObject({ "@type": "WebSite", name: "wakeymoment" });
  });

  it("builds blog posting json-ld with canonical url", () => {
    expect(buildBlogPostingJsonLd({
      title: "Example",
      description: "Summary",
      url: "/posts/example",
      datePublished: "2026-05-20",
      author: "Jaeil Lee",
    })).toMatchObject({ "@type": "BlogPosting", headline: "Example" });
  });
});
```

**Step 2: Implement helpers**

Return plain objects only. Render them using:

```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Step 3: Verify**

Run: `pnpm test -- src/lib/__tests__/structured-data.test.ts --run`
Expected: PASS.

---

### Task 10: Run full local gates and document blockers

**Objective:** Prove the minimal platform layer is internally safe before any publish/deploy approval packet.

**Files:**
- Modify only if needed: `docs/plans/2026-05-20-blog-re-content-engine-platform-minimal.md` with final blocker notes.

**Step 1: Run checks**

Run in order:

```bash
pnpm content:check
pnpm content:build
pnpm check
pnpm build
```

Expected:

- `pnpm content:check` passes only after contact placeholder and unsafe claims are resolved or explicitly allowlisted.
- `pnpm content:build` may still print the known Contentlayer `ERR_INVALID_ARG_TYPE` noise under Node v24; if so, rerun under Node 20 per `.nvmrc` before changing code.
- `pnpm check` and `pnpm build` should pass before any approval request.

**Step 2: Record final handoff**

Include:

- changed files;
- test/build commands and pass/fail;
- remaining publish blockers;
- confirmation that draft posts remain `draft: true`;
- confirmation that no public deploy/send happened.

---

## What is intentionally deferred

- Dynamic OG image generation.
- Analytics/Search Console setup.
- CMS/admin workflow.
- Automated external distribution.
- Paid marketing.
- Real client/result proof claims.
- Full taxonomy/related-post recommendation engine.
- Production deployment.

## Recommended first implementation slice

If only one small slice is implemented next, do Tasks 1, 3, and 4 first:

1. central site config;
2. publish-safety content gate;
3. placeholder CTA/contact gate.

Reason: these are the lowest-risk changes that prevent accidental unsafe publish. Metadata/sitemap/feed can follow once the gate is in place.
