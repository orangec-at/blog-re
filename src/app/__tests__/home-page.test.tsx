import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("opens with the canonical hero", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^Your developer says it’s done\. You have no way to check\.$/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/before the next milestone payment, the first customers, or the ad spend/i),
    ).toBeVisible();
  });

  it("offers one action and one reference, not two competing buttons", () => {
    render(<Home />);

    // Nothing pinned these before, so the hero's two CTAs could change shape
    // silently. They are not peers: one commissions the work, the other is a
    // look around, and the markup has to keep saying so.
    const commission = screen.getByRole("link", { name: /^Start a review$/i });
    const browse = screen.getByRole("link", { name: /^Read a sample report$/i });

    expect(commission).toHaveAttribute("href", "/contact");
    expect(browse).toHaveAttribute("href", "/posts/ai-mvp-technical-debt-audit-sample-report");
    // The link is underlined with a border rather than text-decoration: this
    // build emits no .underline utility at all, so a text-decoration assertion
    // would pass on a class that renders nothing.
    expect(browse.className).toMatch(/border-b-2/);
    expect(commission.className).not.toMatch(/border-b-2/);
  });

  it("states the scope with its exclusions", () => {
    render(<Home />);

    expect(screen.getByRole("region", { name: /^Scope$/i })).toBeVisible();
    expect(screen.getByText("Full rewrite")).toBeVisible();
  });

  it("shows the artifact the buyer receives, marked as a sample", () => {
    render(<Home />);

    expect(screen.getByRole("region", { name: /^What you get$/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 4, name: /^The decision$/i })).toBeVisible();
    expect(screen.getByText(/^Sample —/)).toBeVisible();
  });

  it("makes no proof claim the site cannot back yet", () => {
    render(<Home />);

    // Carried over from the previous home. There are no customers, so nothing
    // on this page may imply delivered client work until there is a receipt.
    expect(screen.queryByText(/case stud/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/client result/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/trusted by/i)).not.toBeInTheDocument();
  });

  it("shows the price on the page", () => {
    const { container } = render(<Home />);

    // Inverted on 2026-08-26. The figure was withheld while publishing it was
    // an approval gate. It is published now, and a page that argues for
    // predictability should not make the reader ask what it costs.
    expect(container.textContent).toContain("$1,200");
  });

  it("describes the method without claiming a number of gates", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("region", { name: /^How I look at it$/i })).toBeVisible();

    // Scans innerHTML, not textContent: an attribute value like
    // aria-label="Seven gates evaluated" is a real surface for this string,
    // and textContent cannot see it.
    expect(container.innerHTML).not.toMatch(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+)[\s-]+gates?\b/i);
  });

  it("draws the stack and names where it breaks", () => {
    render(<Home />);

    expect(screen.getByRole("region", { name: /^What you actually built$/i })).toBeVisible();
    expect(screen.getByText("Auth → user data")).toBeVisible();
  });

  it("keeps the unverified terminal step out of the drawing", () => {
    const { container } = render(<Home />);

    expect(container.textContent).not.toMatch(/terminal/i);
  });
});
