export type ContactCTA = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export const contactCta: ContactCTA = {
  title: "Need your refactor translated?",
  body: "I work directly with founders shipping in English and Korean so demos, IaC, and docs stay synchronized.",
  primaryLabel: "Book a refactor",
  primaryHref: "/contact",
  secondaryLabel: "Browse resources",
  secondaryHref: "/resources",
};
