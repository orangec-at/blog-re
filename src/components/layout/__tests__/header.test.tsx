import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/header";

describe("Header", () => {
  it("locks the one-page contract: wordmark plus a single review CTA", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(within(header).getByRole("link", { name: /vibeguard/i })).toHaveAttribute("href", "/");

    const primaryCta = within(header).getByRole("link", { name: /^Start a review$/i });
    expect(primaryCta).toHaveAttribute("href", "/contact");
  });

  it("links the two pages that carry receipts, and no others", () => {
    render(<Header />);

    const nav = within(screen.getByRole("banner")).getByRole("navigation", { name: /primary/i });

    expect(within(nav).getByRole("link", { name: "Proof" })).toHaveAttribute("href", "/posts");
    expect(within(nav).getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");

    // Three pages stay unlinked on purpose. /services and /resources are written
    // in Korean and this buyer reads English; /domains is other work. A nav item
    // is a promise that the page behind it answers the question the label asks.
    for (const label of ["Services", "Resources", "Domains"]) {
      expect(within(nav).queryByRole("link", { name: label })).not.toBeInTheDocument();
    }

    // Contact is the CTA's destination; a second route to it would be noise.
    expect(within(nav).queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
  });
});
