import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DomainShowcasePage from "@/app/domains/[domain]/page";

vi.mock("@/lib/mdx", () => ({
  getPostsByDomain: (domain: string) =>
    domain === "fixmyvibe"
      ? [
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
  });
});
