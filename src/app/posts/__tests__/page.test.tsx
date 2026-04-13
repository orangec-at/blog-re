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
      slug: "infra-log",
      title: "Infra log",
      summary: "Drawhatha recap",
      date: "2026-04-12",
      domain: "drawhatha",
    },
    {
      slug: "b2b-dynamic-onboarding",
      title: "B2B Dynamic Onboarding Workspace",
      summary: "A full-width onboarding form demo.",
      date: "2026-04-14",
      domain: "fixmyvibe",
    },
  ],
  getPostDomains: () => ["drawhatha", "fixmyvibe"],
}));

describe("PostsPage", () => {
  it("renders domain filters and all posts by default", async () => {
    render(await PostsPage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByTestId("posts-filter")).toBeInTheDocument();
    expect(screen.getByText("Fix demo")).toBeInTheDocument();
    expect(screen.getByText("Infra log")).toBeInTheDocument();
    expect(screen.getByText("B2B Dynamic Onboarding Workspace")).toBeInTheDocument();
  });

  it("filters posts by the selected domain", async () => {
    render(await PostsPage({ searchParams: Promise.resolve({ domain: "fixmyvibe" }) }));

    expect(screen.getByText("Fix demo")).toBeInTheDocument();
    expect(screen.getByText("B2B Dynamic Onboarding Workspace")).toBeInTheDocument();
    expect(screen.queryByText("Infra log")).not.toBeInTheDocument();
  });
});
