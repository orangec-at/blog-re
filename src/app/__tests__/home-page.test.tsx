import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("states the offer in one heading and two actions", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^Launch-readiness engineering for software built with AI\.$/i,
      }),
    ).toBeVisible();

    expect(screen.getByRole("link", { name: /^Start a review$/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /^Read a sample report$/i })).toHaveAttribute(
      "href",
      "/posts/ai-mvp-technical-debt-audit-sample-report",
    );
  });

  it("shows three offers, each carrying an availability line instead of a case study", () => {
    render(<Home />);

    const offers = [
      ["Launch Readiness Review", "Next available September '26"],
      ["Technical Debt Audit", "Next available October '26"],
      ["Founder Tech Partner", "Currently full"],
    ] as const;

    for (const [name, availability] of offers) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeVisible();
      expect(screen.getByText(availability)).toBeVisible();
    }
  });

  it("makes no proof claim the site cannot back yet", () => {
    render(<Home />);

    // The old home shipped a metric strip built from array lengths. Nothing on this page
    // may imply delivered client work until there is a receipt to link to.
    expect(screen.queryByText(/case stud/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/client result/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/trusted by/i)).not.toBeInTheDocument();
  });
});
