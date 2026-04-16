import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/header";

describe("Header", () => {
  it("locks the redesigned brand, nav, and conversion CTA contract", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(within(header).getByText(/ai mvp rescue/i)).toBeVisible();

    const primaryNav = within(header).getByRole("navigation");

    for (const label of ["Services", "Proof", "About", "Contact"]) {
      expect(within(primaryNav).getByRole("link", { name: label })).toBeVisible();
    }

    for (const label of ["Posts", "Domains", "Resources"]) {
      expect(within(primaryNav).queryByRole("link", { name: label })).not.toBeInTheDocument();
    }

    const primaryCta = within(header).getByRole("link", { name: /start with diagnosis/i });
    expect(primaryCta).toHaveAttribute("href", "/contact");
  });
});
