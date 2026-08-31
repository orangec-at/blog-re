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
import { absoluteUrl } from "@/config/site";

describe("metadata routes", () => {
  it("includes public static routes and excludes draft posts", () => {
    const urls = sitemap().map((entry) => entry.url);

    // /services, /resources, /domains and /design-system were deleted rather
    // than left unlinked: two were written in Korean for a buyer who reads
    // English, one showcased other work, and the last was an internal catalog.
    for (const path of ["/", "/about", "/posts", "/contact"]) {
      expect(urls).toContain(absoluteUrl(path));
    }

    expect(urls).toContain(absoluteUrl("/posts/ai-mvp-technical-debt-audit-sample-report"));
    expect(urls).not.toContain(absoluteUrl("/posts/ai-mvp-launch-checklist"));
  });

  it("points robots to the sitemap", () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: absoluteUrl("/sitemap.xml"),
    });
  });

  it("builds absolute urls against the deployment's own production domain", () => {
    // Regression: these were pinned to a literal domain, so deleting that Vercel
    // project left the whole site advertising URLs that 404.
    expect(absoluteUrl("/")).toMatch(/^https:\/\/[^/]+\/$/);
    expect(absoluteUrl("/")).not.toContain("undefined");
  });
});
