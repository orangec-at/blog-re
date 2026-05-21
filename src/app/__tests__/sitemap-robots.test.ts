import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/mdx", () => ({
  getAllPosts: () => [
    {
      slug: "ai-mvp-technical-debt-audit-sample-report",
      title: "Sample Report",
      date: "2026-05-05",
      updated: "2026-05-20",
      summary: "Synthetic sample report",
      url: "/posts/ai-mvp-technical-debt-audit-sample-report",
    },
  ],
}));

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("includes public static routes and excludes draft posts", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://wakeymoment.vercel.app/");
    expect(urls).toContain("https://wakeymoment.vercel.app/posts");
    expect(urls).toContain("https://wakeymoment.vercel.app/services");
    expect(urls).toContain("https://wakeymoment.vercel.app/resources");
    expect(urls).toContain("https://wakeymoment.vercel.app/contact");
    expect(urls).toContain("https://wakeymoment.vercel.app/posts/ai-mvp-technical-debt-audit-sample-report");
    expect(urls).not.toContain("https://wakeymoment.vercel.app/posts/ai-mvp-launch-checklist");
  });

  it("points robots to the sitemap", () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://wakeymoment.vercel.app/sitemap.xml",
    });
  });
});
