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

  it("shows no price figure", () => {
    const { container } = render(<Home />);

    // Publishing the number is not an approved action; it is quoted in
    // conversation only.
    expect(container.textContent).not.toMatch(/\$\s?\d/);
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
