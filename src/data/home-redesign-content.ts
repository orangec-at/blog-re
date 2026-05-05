export type ContentCta = {
  label: string;
  href: string;
};

export type HeroAuditArea = {
  title: string;
  detail: string;
};

export type HomeRescueHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: ContentCta;
  secondaryCta: ContentCta;
  consoleSummary: string;
  symptomItems: string[];
  auditAreas: HeroAuditArea[];
  outcomeItems: string[];
};

export const homeRescueHero: HomeRescueHero = {
  eyebrow: "FixMyVibe",
  title: "AI가 만든 MVP,\n상용화 전에\n기술 부채부터 고치세요.",
  subtitle:
    "FixMyVibe는 Cursor, v0, Bolt 등으로 빠르게 만든 프로토타입을 진단하고 리모델링해 실제 고객 앞에 내놓을 수 있는 제품 구조로 정리합니다.",
  primaryCta: {
    label: "기술 부채 진단 문의하기",
    href: "/contact",
  },
  secondaryCta: {
    label: "샘플 진단 리포트 읽어보기 →",
    href: "/posts/ai-mvp-technical-debt-audit-sample-report",
  },
  consoleSummary:
    "출시 전에 반드시 막아야 할 P0/P1 리스크와 파일럿 이후로 미뤄도 되는 정리 작업을 분리합니다.",
  symptomItems: [
    "데모에서는 돌아가지만 실제 사용자, 데이터, 결제, 권한 앞에서 불안한 AI-built MVP.",
    "AI-generated shortcuts 때문에 auth, DB, API, error state의 책임 경계가 흐려진 코드베이스.",
    "외주나 추가 개발 전에 무엇을 먼저 고쳐야 하는지 판단하기 어려운 founder 상황.",
  ],
  auditAreas: [
    {
      title: "Technical Debt Audit",
      detail:
        "Auth, data ownership, secrets, deployment, UX failure states를 risk table과 Go / No-Go 판단으로 정리합니다.",
    },
    {
      title: "Remodeling Sprint",
      detail:
        "핵심 user flow를 중심으로 brittle prototype을 상용화 가능한 제품 구조에 가깝게 안정화합니다.",
    },
    {
      title: "Founder Tech Partner",
      detail:
        "AI/외주/개발 의사결정을 founder 옆에서 번역하고 우선순위와 기술 리스크를 지속적으로 관리합니다.",
    },
  ],
  outcomeItems: [
    "무엇이 먼저 깨질 수 있는지 설명하는 샘플형 진단 리포트.",
    "공개 출시 압박이 커지기 전 실행할 2주 / 4주 안정화 경로.",
    "외주, 투자자, 내부 팀과 공유할 수 있는 founder-friendly 기술 의사결정 메모.",
  ],
};
