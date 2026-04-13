import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/home/hero";
import { hero } from "@/data/homepage-content";

describe("HeroSection", () => {
  it("renders hero copy and CTAs", () => {
    render(<HeroSection data={hero} />);

    const section = screen.getByTestId("hero-section");
    expect(section).toHaveTextContent(hero.title);
    expect(screen.getByText(hero.primaryCta.label)).toHaveAttribute("href", hero.primaryCta.href);
    expect(screen.getByText(hero.secondaryCta.label)).toHaveAttribute("href", hero.secondaryCta.href);
  });
});
