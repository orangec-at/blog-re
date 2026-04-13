export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  domain: string;
  layout: "full" | "narrow";
  demoComponent?: string;
};
