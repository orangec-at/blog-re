export type ContentCta = {
  label: string;
  href: string;
};

export type ServicesIntro = {
  eyebrow: string;
  title: string;
  body: string;
  chooserNote: string;
  primaryCta: ContentCta;
};

export type ServiceOffer = {
  id: string;
  name: string;
  summary: string;
  bestFor: string;
  outcome: string;
  ctaLabel: string;
  ctaHref: string;
};

export const servicesIntro: ServicesIntro = {
  eyebrow: "Services",
  title: "FixMyVibe 서비스 패키지",
  body:
    "AI로 만든 MVP 상태에 따라 진단, 리모델링 스프린트, founder-side 기술 판단 지원 중 하나로 작게 시작합니다.",
  chooserNote:
    "출시, 리팩터링, 재구축, 중단 중 무엇을 택해야 할지 애매하다면 기술 부채 진단으로 시작하세요.",
  primaryCta: {
    label: "기술 부채 진단 문의하기",
    href: "/contact",
  },
};

export const serviceOffers: ServiceOffer[] = [
  {
    id: "fmv-diagnosis",
    name: "AI MVP 기술 부채 진단",
    summary:
      "고객이 먼저 발견하기 전에 auth, data, security, maintainability, UX reliability, launch-readiness 리스크를 의사결정 표로 정리합니다.",
    bestFor:
      "Cursor/v0/Bolt식 MVP가 출시, 파일럿, 리팩터링, 중단 중 어디에 가까운지 판단해야 하는 founder.",
    outcome:
      "샘플 리포트 형식의 risk table, Go / No-Go 판단, 2주 / 4주 안정화 계획.",
    ctaLabel: "기술 부채 진단 문의하기",
    ctaHref: "/contact",
  },
  {
    id: "architecture-fix",
    name: "AI 앱 리모델링 스프린트",
    summary:
      "무제한 기능 개발로 번지지 않도록 핵심 user flow, error state, data boundary, handoff note를 제한된 스프린트 안에서 안정화합니다.",
    bestFor:
      "데모는 가능하지만 사용자, 파일럿, 투자자/고객 검토 앞에서는 실제 제품처럼 동작해야 하는 AI-built prototype 팀.",
    outcome:
      "더 안정적인 핵심 flow, 명확한 architecture seam, QA note, 다음 productization 계획.",
    ctaLabel: "리모델링 스프린트 상담하기",
    ctaHref: "/contact",
  },
  {
    id: "virtual-cto",
    name: "Founder 기술 파트너 / Virtual CTO",
    summary:
      "AI 도구, 외주, junior team과 함께 일하는 founder가 무엇을 만들고, 고치고, 미루고, 멈출지 판단하도록 돕는 지속 기술 파트너십입니다.",
    bestFor:
      "full-time CTO 없이 code review, architecture decision, 외부 개발 산출물 검토, product-development 우선순위가 필요한 founder-led team.",
    outcome:
      "주간 기술 risk review, decision memo, code/architecture review, founder가 바로 실행할 수 있는 next action.",
    ctaLabel: "기술 파트너 지원 상담하기",
    ctaHref: "/contact",
  },
];
