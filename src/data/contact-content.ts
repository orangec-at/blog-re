// First person, like /about: one engineer does the work, so the page says "I".
// The service is the Launch Gate Audit — service-packages.md § Pricing is the
// canon. "Technical Debt Audit" was the developer-language name it replaced.
export const contact = {
  eyebrow: "Contact",
  headline: "Start with a small review, not a big project.",
  lede:
    "If your MVP runs but you are not sure it is safe to put in front of real users, begin with a bounded audit: what can break before launch, and what to fix in the next two to four weeks.",
  when: {
    caption: "When to write",
    items: [
      {
        title: "Your AI-built MVP works in demos only",
        body: "The product looks convincing in a walkthrough but starts breaking once real users, data, permissions, or edge cases appear.",
      },
      {
        title: "The codebase feels impossible to trust",
        body: "Nobody on the team can confidently explain what the AI generated, or what can be changed safely.",
      },
      {
        title: "You need a plain Go / No-Go",
        body: "You want the launch decision in plain English, and a practical next step, before adding features or hiring another contractor.",
      },
    ],
  },
  form: {
    caption: "Tell me what is blocking launch",
    body: "Leave an address and describe the risk. I reply from a real inbox, and start from the safest next step.",
    reassurance: "If you're not sure, start with the Launch Gate Audit.",
    ctaLabel: "Start with the Launch Gate Audit",
  },
} as const;
