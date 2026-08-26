import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProposalSection } from "@/components/proposal/proposal-section";

describe("ProposalSection", () => {
  it("names the section by its title, not by its number", () => {
    render(
      <ProposalSection number="02" title="What you actually built">
        <p>body</p>
      </ProposalSection>,
    );

    // The number is document furniture. If it lands in the accessible name,
    // screen reader users hear "oh two what you actually built" for every section.
    expect(screen.getByRole("region", { name: /^What you actually built$/i })).toBeVisible();
  });

  it("shows the number and renders its children", () => {
    render(
      <ProposalSection number="02" title="What you actually built">
        <p>body</p>
      </ProposalSection>,
    );

    expect(screen.getByText("02")).toBeVisible();
    expect(screen.getByText("body")).toBeVisible();
  });
});
