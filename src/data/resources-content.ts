import type { ContactCTA } from "@/data/homepage-content";

export type ResourcesIntro = {
  eyebrow: string;
  title: string;
  body: string;
  downloadLabel: string;
  downloadHref: string;
  downloadNote: string;
};

export type CapabilityItem = {
  name: string;
  summary: string;
  stack: string[];
};

export type FounderHelpItem = {
  title: string;
  problem: string;
  solution: string;
};

export const resourcesIntro: ResourcesIntro = {
  eyebrow: "Resources",
  title: "Resources",
  body:
    "Download the portfolio PDF, scan the capabilities, and reach out when you want founder-friendly refactor help without adding process drag.",
  downloadLabel: "Portfolio PDF",
  downloadHref: "/portfolio.pdf",
  downloadNote:
    "A concise overview of delivery style, stack depth, and the kinds of credibility-first launches I help founders ship.",
};

export const capabilityItems: CapabilityItem[] = [
  {
    name: "Product-facing app builds",
    summary: "Ship app-router pages, typed content, and launch-ready UI without turning the repo into a CMS project.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Infrastructure and automation cleanup",
    summary: "Stabilize brittle deploy steps, IaC notes, and handoff docs so founders can keep shipping after the sprint.",
    stack: ["Terraform", "Pulumi", "GitHub Actions", "AWS"],
  },
  {
    name: "Bilingual launch support",
    summary: "Keep demos, docs, and founder-facing explanations aligned across English and Korean.",
    stack: ["Contentlayer", "MDX", "English", "Korean"],
  },
];

export const founderHelpItems: FounderHelpItem[] = [
  {
    title: "Messy launch path",
    problem: "Visitors can browse the site but still miss the practical next step or proof that the work is real.",
    solution: "I tighten the decision path with clearer pages, stronger CTA copy, and downloadable artifacts that answer founder questions fast.",
  },
  {
    title: "Fragile demo stack",
    problem: "A useful demo exists, but every copy or product tweak risks breaking the story before launch day.",
    solution: "I refactor the experience into typed content and reusable sections so updates stay calm and reviewable.",
  },
  {
    title: "Knowledge stuck in calls",
    problem: "Important implementation details live in Looms and chat threads instead of the repo your team actually ships from.",
    solution: "I turn those decisions into concise notes, walkthroughs, and repo-native docs that founders can reuse after handoff.",
  },
];

export const resourcesFinalCta: ContactCTA = {
  title: "Want a calmer launch path?",
  body: "I help founders turn messy demos, brittle content, and unclear delivery paths into a credible release story visitors can trust.",
  primaryLabel: "Book a refactor",
  primaryHref: "/contact",
  secondaryLabel: "See case studies",
  secondaryHref: "/posts",
};
