import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contactCta } from "@/data/homepage-content";

describe("ResourcesPage", () => {
  it("renders the first-launch resources conversion path", async () => {
    const pageModulePath = "../page";
    const { default: ResourcesPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ResourcesPage());

    expect(screen.getByRole("heading", { level: 1, name: "Resources" })).toBeVisible();
    expect(screen.getByText(/download.*portfolio.*reach out/i)).toBeVisible();

    expect(screen.getByRole("heading", { level: 2, name: /capabilities/i })).toBeVisible();
    expect(screen.getByText(/next\.js/i)).toBeVisible();

    expect(screen.getByRole("link", { name: /portfolio pdf/i })).toHaveAttribute("href", "/portfolio.pdf");

    expect(screen.getByTestId("contact-cta")).toBeVisible();
    expect(screen.getByRole("link", { name: contactCta.primaryLabel })).toBeVisible();
  });
});
