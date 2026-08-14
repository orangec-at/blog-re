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
  title: "Start with a small review, not a big project.",
  body:
    "If your MVP runs but you are not sure it is safe to put in front of real users, begin with a bounded audit: what can break before launch, and what to fix in the next two to four weeks.",
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
