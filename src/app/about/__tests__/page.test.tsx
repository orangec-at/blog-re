import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";

describe("AboutPage", () => {
  it("says one engineer, not a team", async () => {
    // The page this replaced opened "Small team, senior product and architecture
    // judgment" and ran on "we", while the home page says "an app of my own".
    // A site whose offer is checking whether a claim is true cannot give two
    // answers to how many people it is.
    render(await AboutPage());

    expect(screen.getByRole("heading", { level: 1, name: /one engineer/i })).toBeVisible();
    expect(screen.queryByText(/small team/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^team snapshot$/i })).not.toBeInTheDocument();
  });

  it("stands on the same three grounds the home page stands on", async () => {
    render(await AboutPage());

    expect(screen.getByText(/six years of engineering/i)).toBeVisible();
    expect(screen.getByText(/shipped to the app store/i)).toBeVisible();
    expect(screen.getByText(/front-end lead on a public-sector platform/i)).toBeVisible();
  });

  it("makes no proof claim the site cannot back", async () => {
    const { container } = render(await AboutPage());

    for (const claim of [/case stud/i, /client result/i, /trusted by/i]) {
      expect(container.textContent).not.toMatch(claim);
    }
  });

  it("names what the service is not", async () => {
    render(await AboutPage());

    expect(screen.getByRole("region", { name: /what this is not/i })).toBeVisible();
    expect(screen.getByText(/not an agency/i)).toBeVisible();
  });

  it("is typeset as a document, with no card shell and no dark band", async () => {
    const { container } = render(await AboutPage());

    // DESIGN.md forbids both by name: no ad-hoc card shells, and panel-dark
    // "is not page chrome, not a CTA background".
    // A dark band, not a dark button: links and buttons are ink by contract, so
    // the assertion is about surfaces that a section paints, not about ink text.
    expect(container.querySelector("section.bg-ink, div.bg-ink, section.bg-panel-dark")).toBeNull();
    expect(container.querySelector(".rounded-lg, .rounded-2xl, .rounded-xl")).toBeNull();
    expect(screen.getByRole("region", { name: /what i bring to it/i })).toBeVisible();
  });
});
