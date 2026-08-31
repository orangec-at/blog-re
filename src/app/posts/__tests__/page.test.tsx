import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PostsPage from "@/app/posts/page";

vi.mock("@/lib/mdx", () => ({
  getAllPosts: () => [
    {
      slug: "fix-demo",
      title: "Fix demo",
      summary: "Automation walkthrough",
      date: "2026-04-13",
      domain: "fixmyvibe",
    },
    {
      slug: "b2b-dynamic-onboarding",
      title: "B2B Dynamic Onboarding Workspace",
      summary: "A full-width onboarding form demo.",
      date: "2026-04-14",
      domain: "fixmyvibe",
    },
  ],
}));

describe("PostsPage", () => {
  it("lists every post with its date, under the label the nav uses", () => {
    render(PostsPage());

    // "Proof" is what the header calls this page. The h1 says what the page
    // holds rather than describing a category of writing.
    expect(screen.getByRole("heading", { level: 1, name: /^What I have published$/i })).toBeInTheDocument();

    expect(screen.getByText("Fix demo")).toBeInTheDocument();
    expect(screen.getByText("B2B Dynamic Onboarding Workspace")).toBeInTheDocument();
    expect(screen.getByText("2026-04-13")).toBeInTheDocument();
  });

  it("ships no domain filter while every post carries the same domain", () => {
    render(PostsPage());

    // The filter offered "All" and one domain, so it filtered nothing. It comes
    // back when a second domain does.
    expect(screen.queryByTestId("posts-filter")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^All$/i })).not.toBeInTheDocument();
  });

  it("links each entry to its post", () => {
    render(PostsPage());

    expect(screen.getByRole("link", { name: "Fix demo" })).toHaveAttribute("href", "/posts/fix-demo");
  });
});
