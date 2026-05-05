import type { ContactCTA } from "@/data/homepage-content";

export type ResourcesIntro = {
  eyebrow: string;
  title: string;
  body: string;
  downloadLabel: string;
  downloadHref: string;
  downloadNote: string;
};

export type CapabilityItem = {
  name: string;
  summary: string;
  stack: string[];
};

export type FounderHelpItem = {
  title: string;
  problem: string;
  solution: string;
};

export const resourcesIntro: ResourcesIntro = {
  eyebrow: "Resources",
  title: "FixMyVibe proof resources",
  body:
    "Review the sample audit structure, service packages, and proof writing before deciding whether your AI-built MVP needs diagnosis, remodeling, or ongoing technical judgment.",
  downloadLabel: "샘플 진단 리포트",
  downloadHref: "/posts/ai-mvp-technical-debt-audit-sample-report",
  downloadNote:
    "샘플 진단 리포트로 먼저 확인하세요. FixMyVibe는 막연한 기술 부채 불안을 risk table, Go / No-Go 메모, 2–4주 안정화 경로로 바꿉니다.",
};

export const capabilityItems: CapabilityItem[] = [
  {
    name: "AI MVP technical debt audit",
    summary: "Map auth, data, security, maintainability, UX reliability, and deployment risk before the MVP reaches real users.",
    stack: ["Next.js", "React", "TypeScript", "Risk table"],
  },
  {
    name: "Remodeling sprint execution",
    summary: "Stabilize the core flow and product boundaries so the app behaves less like a demo and more like a product.",
    stack: ["React", "QA", "Architecture", "Handoff"],
  },
  {
    name: "Founder-side technical judgment",
    summary: "Translate AI/contractor output into technical decisions a founder can actually use for launch and hiring choices.",
    stack: ["Code review", "Architecture notes", "Roadmaps", "English/Korean"],
  },
];

export const founderHelpItems: FounderHelpItem[] = [
  {
    title: "AI MVP 출시 불안",
    problem: "데모에서는 돌아가지만 실제 사용자가 들어왔을 때 auth, data, deployment, edge case가 버틸지 확신하기 어렵습니다.",
    solution: "기술 부채 진단으로 숨은 리스크를 우선순위 표, 출시 판단, 2–4주 계획으로 바꿉니다.",
  },
  {
    title: "프로토타입과 제품 사이의 간극",
    problem: "AI가 만든 shortcut을 제품 경계로 정리하지 않은 상태라 기능을 추가할수록 유지보수가 더 어려워집니다.",
    solution: "리모델링 스프린트로 핵심 flow 하나를 안정화하고, 책임 경계와 QA/handoff 노트를 남깁니다.",
  },
  {
    title: "Founder 의사결정 과부하",
    problem: "AI 도구, 외주, 제품 압박을 founder가 동시에 관리하지만 tradeoff를 판단해 줄 senior technical partner가 없습니다.",
    solution: "Founder Tech Partner 지원으로 주간 risk review, architecture decision, 실행 가능한 다음 액션을 정리합니다.",
  },
];

export const resourcesFinalCta: ContactCTA = {
  title: "Want to know if your AI-built MVP is launch-ready?",
  body: "Start with a small technical debt audit before you add more features, hire another contractor, or put the product in front of real customers.",
  primaryLabel: "Request an audit",
  primaryHref: "/contact",
  secondaryLabel: "Read the sample report",
  secondaryHref: "/posts/ai-mvp-technical-debt-audit-sample-report",
};
