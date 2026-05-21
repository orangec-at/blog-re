import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/mdx", () => ({
  getAllPosts: () => [
    {
      slug: "ai-mvp-technical-debt-audit-sample-report",
      title: "Sample Report",
      date: "2026-05-05",
      summary: "Synthetic sample report",
      url: "/posts/ai-mvp-technical-debt-audit-sample-report",
    },
  ],
}));

import { GET } from "@/app/feed.xml/route";

describe("feed.xml", () => {
  it("returns rss xml without draft posts", async () => {
    const response = await GET();
    const text = await response.text();

    expect(response.headers.get("content-type")).toContain("application/rss+xml");
    expect(text).toContain('<rss version="2.0">');
    expect(text).toContain("ai-mvp-technical-debt-audit-sample-report");
    expect(text).not.toContain("ai-mvp-launch-checklist");
  });
});
