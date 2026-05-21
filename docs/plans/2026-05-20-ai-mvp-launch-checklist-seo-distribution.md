# AI MVP launch checklist SEO + distribution approval packet

Status: draft-only / approval-ready
Post: `content/posts/ai-mvp-launch-checklist.mdx`
Route: `/posts/ai-mvp-launch-checklist`
Canonical: `/posts/ai-mvp-launch-checklist`
Forbidden without approval: public publish, production deploy, SNS/external send, paid spend, client-result claims.

## SEO metadata

- SEO title: AI MVP 출시 전 체크리스트: 고객 받기 전 7가지 점검
- Meta description: AI 코딩 도구로 만든 MVP를 공개하기 전 auth, RLS, secrets, 결제, 배포 복구, 유지보수 리스크를 점검하는 launch-readiness 체크리스트.
- Primary query intent: AI로 빠르게 만든 MVP를 첫 고객/공개 트래픽 앞에 내놓기 전 무엇을 확인해야 하는지 알고 싶은 founder.
- Primary keywords:
  - AI MVP
  - AI 코딩
  - MVP 출시
  - launch readiness
  - technical debt audit
  - Supabase RLS
  - FixMyVibe
- Tags:
  - AI MVP
  - launch checklist
  - technical debt
  - founder ops

## Internal link plan

Existing links already in the draft:

- `/contact` — primary conversion path for AI MVP Technical Debt Audit inquiry.
- `/posts/ai-mvp-technical-debt-audit-sample-report` — proof/education follow-up showing the sample audit-report output.

Recommended approval-time checks before publish:

1. Keep the sample-report link near the final CTA so the reader can inspect the expected deliverable before contacting.
2. If `/domains/fixmyvibe` has a service-package section at publish time, add one contextual text link from the intro or final CTA block.
3. Do not add claims about real clients, security certification, or guaranteed launch approval.

## Suggested URL/social preview copy

- Preview title: AI MVP 출시 전 체크리스트
- Preview description: 첫 고객을 받기 전 auth, data ownership, secrets, 결제, 배포 복구, handoff 리스크를 risk table로 정리하는 7가지 launch gate.
- Preferred CTA: 샘플 진단 리포트 보기 → `/posts/ai-mvp-technical-debt-audit-sample-report`

## LinkedIn draft

AI 코딩 도구로 MVP를 만들면 데모까지는 정말 빨라집니다.

하지만 “돌아가는 앱”과 “출시 가능한 앱”은 다릅니다.

첫 고객을 받기 전에는 기능을 더 붙이기보다 아래 7가지를 먼저 봐야 합니다.

1. Happy path 밖의 실제 사용자 시나리오
2. Auth/session 경계
3. 데이터 소유권과 Supabase RLS
4. Secrets와 server-only boundary
5. Payment lifecycle
6. Build/deploy/rollback/monitoring
7. 다음 개발자가 이어받을 수 있는 구조

핵심은 겁을 주는 코드 리뷰가 아닙니다.

Founder가 “public launch / private pilot / stabilize first”를 결정할 수 있는 risk table을 만드는 것입니다.

Draft checklist:
/posts/ai-mvp-launch-checklist

주의: 이 글은 정식 보안 인증이나 출시 보장을 말하지 않습니다. AI-built MVP를 공개하기 전 practical launch-readiness를 점검하기 위한 글입니다.

## X / Twitter thread draft

1/ AI 코딩 도구로 만든 MVP는 데모까지 빠릅니다.

하지만 “돌아가는 앱”과 “출시 가능한 앱”은 다릅니다.

첫 고객을 받기 전에는 기능 추가보다 launch gate를 먼저 봐야 합니다.

2/ 1번: Happy path 밖을 보세요.

신규 사용자, 재방문 사용자, 빈 계정, 만료된 session, double submit, 실패한 요청을 따로 확인해야 합니다.

실패했는데 성공처럼 보이면 신뢰가 바로 깨집니다.

3/ 2번: Auth/session은 UI가 아니라 server-side 경계입니다.

버튼을 숨기는 것만으로는 부족합니다. URL 직접 접근, API route, server action에서 권한이 다시 확인되어야 합니다.

4/ 3번: 데이터 소유권과 RLS를 직접 확인하세요.

User A와 User B 테스트 계정으로 교차 접근을 시도해 보세요. 화면에서는 맞아 보여도 query가 넓으면 private data가 섞일 수 있습니다.

5/ 4번: Secrets가 browser, repo, log에 새지 않는지 확인하세요.

Service-role key, Stripe secret key, OAuth token, AI API key는 frontend bundle과 runtime log에서 분리되어야 합니다.

6/ 5번: Checkout 성공이 billing 완성은 아닙니다.

Webhook 검증, subscription 상태, failed payment, refund, cancel, access revocation까지 권한 상태가 맞는지 봐야 합니다.

7/ 6번: Deploy 버튼보다 복구 경로가 먼저입니다.

Production build, preview build, smoke test, rollback note, DB backup/restore, error visibility가 있어야 공개 트래픽을 받기 쉽습니다.

8/ 7번: 다음 개발자가 이어받을 수 있어야 합니다.

Core flow가 어떤 화면, API, DB table을 거치는지 찾을 수 없다면 기능 추가보다 구조 파악이 먼저입니다.

9/ 결론: 리빌드부터 시작하지 말고 risk table부터 만드세요.

Area / Risk / Severity / Evidence / Suggested fix / Owner를 적으면 “일단 내자”와 “전부 다시 만들자” 사이의 판단이 가능해집니다.

10/ Draft checklist:
/posts/ai-mvp-launch-checklist

정식 보안 인증이나 출시 보장이 아니라, founder가 공개 전 launch-readiness를 점검하기 위한 practical checklist입니다.

## Substack/Newsletter note draft

Subject: AI로 만든 MVP를 공개하기 전, 기능 추가보다 먼저 볼 것

AI 코딩 도구를 쓰면 첫 화면과 데모는 빠르게 나옵니다. 하지만 첫 고객을 받기 전에는 “작동한다”보다 “실패했을 때 안전한가”를 봐야 합니다.

이번 draft는 AI-built MVP를 공개하기 전에 확인해야 할 7가지 launch gate를 정리합니다: 실제 사용자 시나리오, auth/session, 데이터 소유권/RLS, secrets, payment lifecycle, deploy recovery, maintainability handoff.

목표는 리빌드 결정을 서두르는 것이 아니라 risk table을 만드는 것입니다. Founder가 public launch, private pilot, stabilize first 중 무엇이 맞는지 결정할 수 있어야 합니다.

Draft: /posts/ai-mvp-launch-checklist

## Community post short draft

AI 코딩 도구로 만든 MVP를 첫 고객 앞에 내놓기 전 체크리스트를 draft로 정리했습니다.

핵심은 “코드가 깨끗한가?”보다 “실제 사용자와 실제 실패 상태를 받아도 안전한가?”입니다.

- auth/session
- data ownership/RLS
- secrets
- payment lifecycle
- deploy/rollback
- maintainability handoff

Draft: /posts/ai-mvp-launch-checklist

## Approval checklist

- [ ] Jaeil approves SEO title and meta description.
- [ ] Jaeil approves `draft: true` removal only when publish is explicitly intended.
- [ ] Jaeil approves which social draft(s) to send.
- [ ] Confirm no real-client proof or guaranteed outcome language was added.
- [ ] Run `pnpm check` and `pnpm build` before any publish/deploy request.
