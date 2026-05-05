# FixMyVibe Local Content Alignment Handoff

Date: 2026-05-05 01:25 KST
Repo: `/Users/mac/workspace/blog-re`
Status: local-only / no deploy
Source:
- `/Users/mac/workspace/vault/business/fixmyvibe/service-packages.md`
- `/Users/mac/workspace/vault/business/fixmyvibe/sample-audit-report-template.md`
- `/Users/mac/workspace/vault/business/fixmyvibe/content-calendar.md`
- `/Users/mac/workspace/vault/business/fixmyvibe/prd-fmv-portfolio-site.md`

---

## Summary

Aligned the local blog-re/wakeymoment site toward FixMyVibe as a portfolio/blog/service proof surface.

Implemented local copy/content updates only. No public deploy, external outreach, pricing, contract, deadline, production write, or destructive git action was performed.

---

## Changed Scope

### Homepage / global positioning

Updated local typed content so the homepage now presents FixMyVibe as:

> AI가 만든 MVP, 상용화 전에 기술 부채부터 고치세요.

Key CTA paths:
- `/contact` — Technical Debt Audit inquiry.
- `/posts/ai-mvp-technical-debt-audit-sample-report` — sample report proof article.

### Services

Aligned service names to the vault service package factory:

1. AI MVP Technical Debt Audit
2. AI-built App Remodeling Sprint
3. Founder Tech Partner / Virtual CTO Retainer

### Resources / Contact

Reframed resources/contact around the sample audit report and small technical debt diagnosis starting point.

### Blog / Proof content

Added three local MDX posts:

1. `content/posts/ai-mvp-launch-checklist.mdx`
2. `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`
3. `content/posts/remodeling-sprint-for-ai-built-apps.mdx`

These are draft proof posts in the local repo. Public publication/deploy requires Jaeil approval.

---

## Verification

Commands run:

```bash
cd /Users/mac/workspace/blog-re
pnpm check
pnpm build
```

Results:

- `pnpm check`: passed
  - eslint passed
  - vitest passed: 27 test files / 51 tests
- `pnpm build`: exit code 0, Next.js production build passed
  - generated static routes include:
    - `/`
    - `/services`
    - `/contact`
    - `/resources`
    - `/posts/ai-mvp-launch-checklist`
    - `/posts/ai-mvp-technical-debt-audit-sample-report`
    - `/posts/remodeling-sprint-for-ai-built-apps`

Known warning:

```text
contentlayer build generated 5 documents, then printed:
TypeError: The "code" argument must be of type number. Received an instance of Object
```

The overall `pnpm build` command still exited `0` and Next.js build completed successfully. Treat this as a Contentlayer/Clipanion warning to investigate later, not a current build blocker.

### Local route smoke checks

Local server:

```bash
pnpm exec next start -p 3000
```

Checked:

- `http://localhost:3000/` → 200
- `http://localhost:3000/services` → 200
- `http://localhost:3000/contact` → 200
- `http://localhost:3000/posts/ai-mvp-technical-debt-audit-sample-report` → 200
- `http://localhost:3000/posts/ai-mvp-launch-checklist` → 200
- `http://localhost:3000/posts/remodeling-sprint-for-ai-built-apps` → 200

Browser visual QA:
- Homepage loaded and displayed FixMyVibe hero, service cards, CTA, and proof sections.
- Screenshot captured by Hermes browser tool:
  - `/Users/mac/.hermes/cache/screenshots/browser_screenshot_653207f713d849cc8c36ff3546a9d1a4.png`

---

## Files touched by this packet

### New content

- `content/posts/ai-mvp-launch-checklist.mdx`
- `content/posts/ai-mvp-technical-debt-audit-sample-report.mdx`
- `content/posts/remodeling-sprint-for-ai-built-apps.mdx`

### Updated content/data/tests

- `src/data/home-redesign-content.ts`
- `src/data/services-content.ts`
- `src/data/contact-content.ts`
- `src/data/resources-content.ts`
- `src/data/__tests__/redesign-content.test.ts`
- `src/app/__tests__/home-page.test.tsx`
- `src/app/contact/__tests__/page.test.tsx`
- `src/app/resources/__tests__/page.test.tsx`
- `src/app/services/__tests__/page.test.tsx`
- `src/components/home-redesign/__tests__/home-hero.test.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/__tests__/header.test.tsx`
- `src/components/layout/mobile-floating-appbar.tsx`
- `src/components/layout/__tests__/mobile-floating-appbar.test.tsx`

Note: repo already had substantial dirty WIP before this packet. Do not assume all modified files in `git status` belong to this packet.

---

## Open Risks / Needs Review

1. CTA language is improved but still mixed Korean/English by design. Jaeil should review whether first public version should be Korean, English, or bilingual.
2. Contentlayer warning should be investigated later if it becomes a CI blocker.
3. Existing proof cards under Featured Proof Content still include older project summaries; later pass should align domain/project proof text more tightly with FixMyVibe.
4. No deploy has been done. Public deployment remains approval-gated.
5. No outreach/proposal sending has been done. External sending remains approval-gated.

---

## Next Safe Action

Recommended next packet:

```text
FixMyVibe Outreach Draft Factory
```

Goal:
- create `/Users/mac/workspace/vault/business/fixmyvibe/outreach-queue.md` with 5 LinkedIn/Upwork/email draft proposals;
- all items must be `draft` or `needs-review`;
- do not send externally.

Alternative if Jaeil wants to polish the site first:

```text
blog-re visual polish pass
```

Goal:
- unify CTA labels;
- align Featured Proof Content cards;
- capture screenshots for `/`, `/services`, `/contact`, `/resources`, sample post;
- no deploy.
