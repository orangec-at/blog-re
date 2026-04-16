export type ContentCta = {
  label: string;
  href: string;
};

export type ServicesIntro = {
  eyebrow: string;
  title: string;
  body: string;
  chooserNote: string;
  primaryCta: ContentCta;
};

export type ServiceOffer = {
  id: string;
  name: string;
  summary: string;
  bestFor: string;
  outcome: string;
  ctaLabel: string;
  ctaHref: string;
};

export const servicesIntro: ServicesIntro = {
  eyebrow: "Services",
  title: "AI MVP rescue services",
  body:
    "Choose the rescue path that matches your product risk, delivery pressure, and current technical debt.",
  chooserNote:
    "Start with FMV diagnosis if you're not sure which rescue path you need.",
  primaryCta: {
    label: "Book a diagnosis call",
    href: "/contact",
  },
};

export const serviceOffers: ServiceOffer[] = [
  {
    id: "fmv-diagnosis",
    name: "FMV Diagnosis",
    summary:
      "A rapid product-and-code review that identifies the riskiest AI-generated shortcuts before they slow the launch.",
    bestFor:
      "Founders who need a clear decision path before committing to a bigger rescue engagement.",
    outcome:
      "A prioritized rescue plan covering product risk, code quality, and next technical steps.",
    ctaLabel: "Start with FMV diagnosis",
    ctaHref: "/contact",
  },
  {
    id: "architecture-fix",
    name: "Architecture Fix",
    summary:
      "Stabilize brittle flows, untangle fragile abstractions, and rebuild the parts of the MVP that cannot survive real users.",
    bestFor:
      "Teams whose prototype works in demos but breaks under real product complexity or launch pressure.",
    outcome:
      "A calmer app foundation with clearer boundaries, safer refactors, and launch-ready implementation notes.",
    ctaLabel: "Plan an architecture fix",
    ctaHref: "/contact",
  },
  {
    id: "virtual-cto",
    name: "Virtual CTO",
    summary:
      "Ongoing founder-side technical guidance for teams that need strategy, tradeoff framing, and cleanup direction after the initial rescue.",
    bestFor:
      "Startups that need technical translation, architecture decisions, and steady oversight without a full-time CTO hire.",
    outcome:
      "A trusted operator who helps founders keep shipping while the product and engineering direction stay aligned.",
    ctaLabel: "Talk about virtual CTO support",
    ctaHref: "/contact",
  },
];
