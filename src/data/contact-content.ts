export type ContentCta = {
  label: string;
  href: string;
};

export type ContactHero = {
  eyebrow: string;
  title: string;
  body: string;
};

export type ContactGuidanceItem = {
  title: string;
  body: string;
};

export type ContactGuidance = {
  title: string;
  items: ContactGuidanceItem[];
  reassurance: string;
  primaryCta: ContentCta;
};

export const contactHero: ContactHero = {
  eyebrow: "Contact",
  title: "AI MVP Technical Debt Audit으로 작게 시작하세요",
  body:
    "지금 MVP가 ‘돌아가긴 하는데 불안한 상태’라면, 먼저 작은 기술 부채 진단으로 출시 전 리스크와 다음 2–4주 우선순위를 정리하세요.",
};

export const contactGuidance: ContactGuidance = {
  title: "When to contact us",
  items: [
    {
      title: "Your AI-built MVP works in demos only",
      body:
        "Reach out when the product looks convincing in a walkthrough but starts breaking once real users, data, permissions, or edge cases appear.",
    },
    {
      title: "The codebase feels impossible to trust",
      body:
        "Technical Debt Audit is the right starting point when nobody on the team can confidently explain what the AI generated or what can be changed safely.",
    },
    {
      title: "You need a founder-friendly Go / No-Go plan",
      body:
        "Come in early when you need technical translation, launch-readiness triage, and a practical next step before adding more features or hiring another contractor.",
    },
  ],
  reassurance: "If you're not sure, start with Technical Debt Audit.",
  primaryCta: {
    label: "Start with Technical Debt Audit",
    href: "/contact",
  },
};
