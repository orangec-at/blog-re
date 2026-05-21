export type ContactChannel = {
  label: string;
  href: string;
  description: string;
};

export const contactChannels: ContactChannel[] = [
  {
    label: "Inquiry form",
    href: "/contact",
    description: "Start with the site contact page until a verified email channel is approved.",
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
