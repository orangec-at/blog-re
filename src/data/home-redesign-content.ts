export type ContentCta = {
  label: string;
  href: string;
};

export type HomeRescueHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: ContentCta;
  secondaryCta: ContentCta;
};

export const homeRescueHero: HomeRescueHero = {
  eyebrow: "AI MVP rescue",
  title: "Your AI-coded MVP is failing? We fix the vibe.",
  subtitle: "We turn AI-built MVPs into launch-ready products.",
  primaryCta: {
    label: "Start with FMV diagnosis",
    href: "/services",
  },
  secondaryCta: {
    label: "See rescue services",
    href: "/services",
  },
};
