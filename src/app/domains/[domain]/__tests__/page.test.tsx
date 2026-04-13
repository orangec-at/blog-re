import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DomainShowcasePage from "@/app/domains/[domain]/page";

vi.mock("@/lib/mdx", () => ({
  getPostsByDomain: (domain: string) =>
    domain === "fixmyvibe"
      ? [
          {
            slug: "b2b-dynamic-onboarding",
            title: "B2B Dynamic Onboarding Workspace",
            summary: "A full-width onboarding form demo that adapts to user choices.",
            url: "/posts/b2b-dynamic-onboarding",
            domain: "fixmyvibe",
            layout: "full",
          },
          {
            slug: "hello-world",
            title: "Live Zapier-Style Demo",
            summary: "Sample post showing how demos embed inside MDX.",
            url: "/posts/hello-world",
            domain: "fixmyvibe",
            layout: "full",
          },
        ]
      : [],
}));

describe("DomainShowcasePage", () => {
  it("renders the domain hero and gallery items", async () => {
    render(await DomainShowcasePage({ params: Promise.resolve({ domain: "fixmyvibe" }) }));

    expect(screen.getByTestId("domain-hero")).toBeInTheDocument();
    expect(screen.getByTestId("demo-gallery")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "FixMyVibe" })).toBeInTheDocument();
    expect(screen.getByText("Live Zapier-Style Demo")).toBeInTheDocument();
    expect(screen.getByText("B2B Dynamic Onboarding Workspace")).toBeInTheDocument();
  });
});
