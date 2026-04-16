export type AboutSnapshot = {
  eyebrow: string;
  title: string;
  body: string;
  highlights: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export const aboutSnapshot: AboutSnapshot = {
  eyebrow: "About",
  title: "Founder-side rescue partner",
  body:
    "WakeyMoment helps founders turn AI-built MVPs into launch-ready products without losing the speed that got the first version out the door.",
  highlights: [
    "Diagnosis-first delivery before expensive rebuilds",
    "Founder-friendly technical translation for non-technical teams",
    "Repair work that stays documented inside the repo instead of disappearing into calls",
  ],
  primaryCtaLabel: "Start with diagnosis",
  primaryCtaHref: "/contact",
};
