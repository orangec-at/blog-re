export type Principle = {
  id: string;
  label: string;
  title: string;
  body: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  headline: string;
  summary: string;
  stack: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type BeforeAfterCard = {
  before: { title: string; body: string };
  after: { title: string; body: string };
};

export type RefactoringLogEntry = {
  title: string;
  summary: string;
  dated: string;
};

export type Highlight = {
  title: string;
  body: string;
  tags: string[];
};

export type ContactCTA = {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export const hero = {
  eyebrow: "Refactors for founders",
  title: "I turn brittle automations into calm refactors.",
  subtitle:
    "Live-coded walkthroughs, bilingual playbooks, and infrastructure that stays readable even under velocity.",
  primaryCta: { label: "Book a refactor", href: "/contact" },
  secondaryCta: { label: "See case studies", href: "/posts" },
};

export const beforeAfterBoard: BeforeAfterCard[] = [
  {
    before: {
      title: "Linearized demos",
      body: "Hard-coded marketing demos that fall apart when founders tweak copy.",
    },
    after: {
      title: "Composable embeds",
      body: "MDX-driven demos that import actual product components and sync with your git repo.",
    },
  },
  {
    before: {
      title: "Random Looms",
      body: "Five-hour meeting recordings nobody will rewatch.",
    },
    after: {
      title: "Drawhatha logs",
      body: "Annotated recap posts with design diffs, IaC snippets, and bilingual transcripts.",
    },
  },
];

export const principles: Principle[] = [
  {
    id: "design",
    label: "01",
    title: "Design tokens first",
    body: "Every build starts with palette, spacing, and typography decisions captured in Tailwind tokens.",
  },
  {
    id: "demo",
    label: "02",
    title: "Demo the delta",
    body: "Each post embeds live components that contrast the old experience with the refactor in context.",
  },
  {
    id: "bilingual",
    label: "03",
    title: "Bilingual context",
    body: "English + Korean write-ups mean international teams stay aligned without translation debt.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "fixmyvibe",
    name: "FixMyVibe",
    headline: "Automation playbooks for music-tech founders",
    summary:
      "Built end-to-end domain demos and IaC pipelines so the founding duo could ship in two languages without code freeze.",
    stack: ["Next.js", "Supabase", "Terraform"],
    ctaLabel: "View FixMyVibe",
    ctaHref: "/domains/fixmyvibe",
  },
  {
    id: "drawhatha",
    name: "Drawhatha",
    headline: "Infrastructure sketch notes",
    summary:
      "Captured refactor logs, RDS migrations, and design diffs for a wellness platform scaling to APAC clinics.",
    stack: ["Next.js", "Contentlayer", "AWS"],
    ctaLabel: "Read Drawhatha log",
    ctaHref: "/domains/drawhatha",
  },
  {
    id: "iac",
    name: "IaC freelance",
    headline: "IaC sprint kits for hypergrowth",
    summary:
      "Prefab Terraform + Pulumi modules that drop into founders' repos without weeks of onboarding.",
    stack: ["Pulumi", "Terraform", "GitHub Actions"],
    ctaLabel: "Explore IaC kits",
    ctaHref: "/domains/iac",
  },
];

export const refactoringLog: RefactoringLogEntry[] = [
  {
    title: "Realtime demo embeds",
    summary: "Replaced screenshot-driven blog posts with MDX powered by real components.",
    dated: "2026-04-01",
  },
  {
    title: "IaC drawdowns",
    summary: "Codified bilingual IaC playbooks with stack-specific cutover checklists.",
    dated: "2026-03-18",
  },
];

export const iacHighlight: Highlight = {
  title: "IaC sprint kits",
  body: "Founders send me their staging account, I return Terraform modules with bilingual README scaffolding.",
  tags: ["Terraform", "Pulumi", "Founders"],
};

export const drawhathaHighlight: Highlight = {
  title: "Drawhatha logs",
  body: "Weekly infrastructure notebooks that pair architecture sketches with Korean/English notes.",
  tags: ["Notebook", "Bilingual", "Infra"],
};

export const contactCta: ContactCTA = {
  title: "Need your refactor translated?",
  body: "I work directly with founders shipping in English and Korean so demos, IaC, and docs stay synchronized.",
  primaryLabel: "Book a refactor",
  primaryHref: "/contact",
  secondaryLabel: "Browse resources",
  secondaryHref: "/resources",
};
