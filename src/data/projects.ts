export type ProjectLink = {
  label: string;
  href: string;
};

export type DomainId = "fixmyvibe" | "drawhatha" | "iac";

export type DomainShowcase = {
  id: DomainId;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  highlights: string[];
  featuredDemos: string[];
  links: ProjectLink[];
  refactoringLogHref: string;
};

export type Project = {
  id: string;
  name: string;
  summary: string;
  domainId: DomainId;
  domains: string[];
  highlights: string[];
  links: ProjectLink[];
};

export const domainShowcases: DomainShowcase[] = [
  {
    id: "fixmyvibe",
    name: "FixMyVibe",
    eyebrow: "Automation playbooks",
    headline: "Operational demos for indie music founders",
    summary:
      "A showcase for automation walkthroughs, realtime routing experiments, and the founder-facing docs that keep product and launch copy synchronized.",
    highlights: ["Composable MDX demos", "Realtime routing visualizer", "Founder-ready handoff docs"],
    featuredDemos: ["hello-world"],
    links: [
      { label: "Browse posts", href: "/posts?domain=fixmyvibe" },
      { label: "GitHub repo", href: "https://github.com/orangec-at/fixmyvibe" },
    ],
    refactoringLogHref: "/posts?domain=fixmyvibe",
  },
  {
    id: "drawhatha",
    name: "Drawhatha",
    eyebrow: "Infrastructure notebooks",
    headline: "Bilingual infrastructure logs for APAC product teams",
    summary:
      "A domain page for architecture sketches, migration notes, and bilingual notebook entries that turn platform changes into something operators can actually review.",
    highlights: ["Weekly recap posts", "Korean + English notes", "Migration cutover checkpoints"],
    featuredDemos: [],
    links: [
      { label: "Browse posts", href: "/posts?domain=drawhatha" },
      { label: "Notebook repo", href: "https://github.com/orangec-at/drawhatha-retro" },
    ],
    refactoringLogHref: "/posts?domain=drawhatha",
  },
  {
    id: "iac",
    name: "IaC Sprint Kits",
    eyebrow: "Infrastructure automation",
    headline: "Terraform and Pulumi starter kits for fast-moving founders",
    summary:
      "A landing space for reusable infrastructure modules, bilingual README scaffolding, and the notes that explain why the rollout is safe enough to hand off.",
    highlights: ["Terraform blueprints", "Pulumi examples", "GitHub Actions release checks"],
    featuredDemos: [],
    links: [
      { label: "Browse posts", href: "/posts?domain=iac" },
      { label: "IaC repo", href: "https://github.com/orangec-at/iac-kit" },
    ],
    refactoringLogHref: "/posts?domain=iac",
  },
];

export const projects: Project[] = [
  {
    id: "fixmyvibe",
    name: "FixMyVibe",
    summary: "Automation playbooks and audio pipelines for indie music founders.",
    domainId: "fixmyvibe",
    domains: ["Automation", "Music Tech"],
    highlights: ["Composable MDX demos", "Realtime routing visualizer"],
    links: [
      { label: "Domain page", href: "/domains/fixmyvibe" },
      { label: "GitHub", href: "https://github.com/orangec-at/fixmyvibe" },
    ],
  },
  {
    id: "drawhatha",
    name: "Drawhatha",
    summary: "Infrastructure sketch logs for wellness platforms scaling across APAC.",
    domainId: "drawhatha",
    domains: ["Bilingual Docs", "Infrastructure"],
    highlights: ["Refactoring notebooks", "IaC cutover checklists"],
    links: [
      { label: "Domain page", href: "/domains/drawhatha" },
      { label: "Notebook repo", href: "https://github.com/orangec-at/drawhatha-retro" },
    ],
  },
  {
    id: "iac",
    name: "IaC Sprint Kits",
    summary: "Terraform + Pulumi modules ready for founders with bilingual README scaffolding.",
    domainId: "iac",
    domains: ["Infrastructure", "IaC"],
    highlights: ["Terraform blueprints", "Pulumi examples"],
    links: [
      { label: "Domain page", href: "/domains/iac" },
      { label: "IaC repo", href: "https://github.com/orangec-at/iac-kit" },
    ],
  },
];

export function getAllDomains() {
  return domainShowcases;
}

export function getDomainById(id: string) {
  return domainShowcases.find((domain) => domain.id === id);
}

export function getProjectsForDomain(domainId: string) {
  return projects.filter((project) => project.domainId === domainId);
}
