export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  summary: string;
  domains: string[];
  highlights: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "fixmyvibe",
    name: "FixMyVibe",
    summary: "Automation playbooks and audio pipelines for indie music founders.",
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
    domains: ["Infrastructure", "IaC"],
    highlights: ["Terraform blueprints", "Pulumi examples"],
    links: [
      { label: "Domain page", href: "/domains/iac" },
      { label: "IaC repo", href: "https://github.com/orangec-at/iac-kit" },
    ],
  },
];
