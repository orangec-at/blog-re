import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/header";

describe("Header", () => {
  it("locks the one-page contract: wordmark plus a single review CTA", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(within(header).getByRole("link", { name: /wakeymoment/i })).toHaveAttribute("href", "/");

    const primaryCta = within(header).getByRole("link", { name: /^Start a review$/i });
    expect(primaryCta).toHaveAttribute("href", "/contact");
  });

  it("ships no navigation while the inner pages carry no receipts", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(within(header).queryByRole("navigation")).not.toBeInTheDocument();

    for (const label of ["Services", "Proof", "About", "Contact", "Posts", "Domains", "Resources"]) {
      expect(within(header).queryByRole("link", { name: label })).not.toBeInTheDocument();
    }

    expect(screen.queryByLabelText("Mobile primary navigation")).not.toBeInTheDocument();
  });
});
