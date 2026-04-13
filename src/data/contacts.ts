export type ContactChannel = {
  label: string;
  href: string;
  description: string;
};

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    description: "Best for detailed refactor briefs or sharing repos securely.",
  },
  {
    label: "Calendly",
    href: "https://cal.com/wakeymoment/refactor-intro",
    description: "Book a 30-minute bilingual intro (English & Korean).",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/orangec-at",
    description: "Stay updated on refactoring logs and infra notebook drops.",
  },
];
