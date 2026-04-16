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
  title: "Start your AI MVP rescue diagnosis",
  body:
    "Tell us what feels brittle, blocked, or risky, and we'll help you choose the fastest rescue path for the product.",
};

export const contactGuidance: ContactGuidance = {
  title: "When to contact us",
  items: [
    {
      title: "Your AI-built MVP works in demos only",
      body:
        "Reach out when the product looks convincing in a walkthrough but starts breaking once real users or edge cases appear.",
    },
    {
      title: "The codebase feels impossible to trust",
      body:
        "Diagnosis is the right starting point when nobody on the team can confidently explain what the AI generated or what can be changed safely.",
    },
    {
      title: "You need a founder-friendly rescue plan",
      body:
        "Come in early when you need technical translation, service selection, and a practical next step before the launch slips further.",
    },
  ],
  reassurance: "If you're not sure, start with diagnosis.",
  primaryCta: {
    label: "Start with diagnosis",
    href: "/contact",
  },
};
