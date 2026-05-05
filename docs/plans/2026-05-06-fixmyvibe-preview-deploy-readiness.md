# FixMyVibe Preview Deploy Readiness

Last updated: 2026-05-06 00:03 KST

## Purpose

Turn the current FixMyVibe / wakeymoment portfolio WIP into a market-testable preview without doing an unsafe production deploy.

The page is now past the pure polish phase. The next goal is to lock the current local state into reviewable commits, restore Vercel access, ship a preview URL, and use that URL in a small founder-facing market test.

## Current verified state

- Repository: `/Users/mac/workspace/blog-re`
- Branch: `master`
- Upstream: `origin/master`
- Verification command run on 2026-05-05/06:
  - `pnpm check && pnpm build`
- Result:
  - `pnpm lint` passed
  - Vitest: 29 files / 59 tests passed
  - `next build` passed
  - `/design-system` statically generated
  - 19 static pages generated
- Known non-blocking warning:
  - `contentlayer build` prints `TypeError: The "code" argument must be of type number. Received an instance of Object`
  - The command still exits 0 and the Next build succeeds.

## Current deploy blocker

Vercel is not connected locally.

Observed command:

```bash
npx -y vercel@latest whoami --cwd /Users/mac/workspace/blog-re
```

Observed result:

```text
Error: No existing credentials found. Please run `vercel login` or pass "--token"
```

No Vercel deploy should be claimed until this is fixed and verified.

## WIP classification

### Commit candidate 1 — FixMyVibe positioning and conversion copy

Purpose: lock the public-facing service positioning and page-level copy cleanup.

Likely files:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/__tests__/home-page.test.tsx`
- `src/app/contact/__tests__/page.test.tsx`
- `src/app/resources/__tests__/page.test.tsx`
- `src/app/services/__tests__/page.test.tsx`
- `src/components/home-redesign/*`
- `src/components/home-redesign/__tests__/*`
- `src/components/home/__tests__/contact-cta.test.tsx`
- `src/components/services/service-decision-grid.tsx`
- `src/data/contact-content.ts`
- `src/data/home-redesign-content.ts`
- `src/data/resources-content.ts`
- `src/data/services-content.ts`
- `src/data/__tests__/redesign-content.test.ts`

Suggested commit message:

```text
feat: reposition site around FixMyVibe diagnostic conversion
```

### Commit candidate 2 — Product articles and article conversion path

Purpose: lock the sample report/checklist flow and post-specific conversion rails.

Likely files:

- `content/posts/ai-mvp-launch-checklist.mdx`
- `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`
- `content/posts/remodeling-sprint-for-ai-built-apps.mdx`
- `src/app/posts/[slug]/page.tsx`
- `src/app/posts/[slug]/__tests__/page.test.tsx`
- `src/components/layout/mobile-floating-appbar.tsx`
- `src/components/layout/__tests__/mobile-floating-appbar.test.tsx`

Suggested commit message:

```text
feat: add product article conversion flow
```

### Commit candidate 3 — Component system v1.5 and internal preview

Purpose: lock the reusable content/product component layer and design-system preview route.

Likely files:

- `src/app/design-system/`
- `src/components/content/`
- `src/components/mdx/article-components.tsx`
- `src/components/mdx/mdx-content.tsx`
- `src/components/mdx/__tests__/mdx-content.test.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/chip.tsx`
- `src/components/ui/patterns/`
- `src/components/ui/surfaces/`
- `src/components/ui/typography.tsx`
- `src/components/ui/__tests__/foundation.test.tsx`
- `src/components/ui/__tests__/patterns.test.tsx`
- `src/components/ui/actions/*`
- `src/components/ui/feedback/pill-tag.tsx`
- `src/components/ui/typography/*`
- `src/app/globals.css`
- `src/components/layout/header.tsx`
- `src/components/layout/__tests__/header.test.tsx`

Suggested commit message:

```text
feat: harden FixMyVibe component system previews
```

### Commit candidate 4 — Planning docs

Purpose: preserve the reasoning and rollout trail.

Likely files:

- `docs/plans/2026-04-17-blog-design-system-design.md`
- `docs/plans/2026-04-17-blog-design-system-implementation.md`
- `docs/plans/2026-04-17-button-chip-appbar-design.md`
- `docs/plans/2026-04-17-button-chip-appbar-implementation.md`
- `docs/plans/2026-04-17-home-hero-diagnostic-console.md`
- `docs/plans/2026-04-28-blog-re-wip-stabilization.md`
- `docs/plans/2026-05-05-fixmyvibe-local-content-alignment.md`
- `docs/plans/2026-05-05-fixmyvibe-component-system-v15.md`
- `docs/plans/2026-05-06-fixmyvibe-preview-deploy-readiness.md`

Suggested commit message:

```text
docs: capture FixMyVibe preview readiness plan
```

## Files to treat carefully

### `.omx/metrics.json` and `.omx/state/session.json`

These are local agent/session state files and should not be part of the product deploy commit. They are currently modified because local OMX state changed.

Recommended handling before commit:

1. Keep `.gitignore` addition for `.omx/` if the repo should stop tracking new OMX state.
2. Do not include current `.omx/*` state changes in feature commits.
3. If `.omx/*` is already tracked, decide explicitly whether to remove it from git tracking in a separate cleanup commit or restore local changes before product commits.

### `.gitignore`

The current diff adds:

```text
.omx/
```

This is reasonable, but if `.omx/*` is already tracked, `.gitignore` alone will not untrack existing files.

## Preview deploy checklist

### Before Vercel preview deploy

- [x] `pnpm check` passes
- [x] `pnpm build` passes
- [x] product article pages build
- [x] `/design-system` builds
- [x] mobile article CTA overlap checked locally
- [x] design-system desktop/mobile screenshots generated locally
- [ ] WIP split into safe commit groups
- [ ] `.omx` local state excluded from product commits
- [ ] Vercel credentials restored
- [ ] `vercel whoami` passes

### Preview deploy

- [ ] Run preview deploy only after Vercel auth works
- [ ] Capture preview URL
- [ ] Open preview URL in browser
- [ ] Check homepage hero and CTA
- [ ] Check `/posts/ai-mvp-technical-debt-audit-sample-report`
- [ ] Check `/posts/ai-mvp-launch-checklist`
- [ ] Check `/services`
- [ ] Check `/contact`
- [ ] Generate preview screenshots if needed

### Production deploy

Production deploy requires explicit Jaeil approval.

Do not run a production deploy, tag, or paid distribution step without approval.

## Market test checklist after preview URL

The next market test should use a small approved outreach queue, not a broad launch.

- [ ] Draft 5 LinkedIn DM variants
- [ ] Draft 3 Upwork proposal variants
- [ ] Draft 3 cold email variants
- [ ] Create a 10-person founder/tester queue
- [ ] Attach the preview/sample-report link to each message
- [ ] Ask Jaeil for approval before external sending
- [ ] Record responses and objections in vault/business/fixmyvibe

## Recommended immediate next action

1. Exclude `.omx` local state from product commits.
2. Split the current WIP into the four commit candidates above.
3. Ask Jaeil to run Vercel login locally.
4. Deploy preview only after auth is verified.
