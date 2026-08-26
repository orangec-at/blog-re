import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("states the offer in one heading, one subhead, and two actions", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^Your developer says it’s done\. You have no way to check\.$/i,
      }),
    ).toBeVisible();

    // The subhead carries the three buying moments. Without it the headline names
    // the fear and nothing tells the reader when a review is worth paying for.
    expect(
      screen.getByText(/before the next milestone payment, the first customers, or the ad spend/i),
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

  it("labels the risk rows as a sample so they cannot read as a real client's findings", () => {
    const { container } = render(<Home />);

    // The Technical Debt Audit card shows real rows lifted from the published sample
    // report. Without the label those P0 lines look like someone's actual audit.
    expect(container.textContent).toContain("Sample · risk table");
    expect(container.textContent).toContain("Ownership check not proven server-side");
  });
});
