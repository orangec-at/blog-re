import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { SecondaryButton } from "@/components/ui/actions/secondary-button";
import { TextLink } from "@/components/ui/actions/text-link";
import { PillTag } from "@/components/ui/feedback/pill-tag";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { DisplayHeading } from "@/components/ui/typography/display-heading";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

describe("UI foundation primitives", () => {
  it("renders typography primitives with semantic intent and warm-brand styling", () => {
    render(
      <div>
        <Eyebrow>AI MVP rescue</Eyebrow>
        <DisplayHeading as="h2">Fix the foundation first</DisplayHeading>
        <SectionHeading>What founders get next</SectionHeading>
        <BodyText as="span">Clear architecture, calmer delivery, and a launch path.</BodyText>
      </div>,
    );

    const eyebrow = screen.getByText("AI MVP rescue");
    expect(eyebrow.tagName).toBe("P");
    expect(eyebrow).toHaveClass("uppercase", "text-zapier-gray");

    const displayHeading = screen.getByRole("heading", { level: 2, name: "Fix the foundation first" });
    expect(displayHeading).toHaveClass("font-display", "text-zapier-black");

    const sectionHeading = screen.getByRole("heading", { level: 2, name: "What founders get next" });
    expect(sectionHeading).toHaveClass("font-sans", "text-zapier-black");

    const bodyText = screen.getByText("Clear architecture, calmer delivery, and a launch path.");
    expect(bodyText.tagName).toBe("SPAN");
    expect(bodyText).toHaveClass("text-zapier-charcoal");
  });

  it("renders CTA primitives as accessible links and buttons with clear emphasis", () => {
    render(
      <div>
        <PrimaryButton href="/contact">Book a rescue call</PrimaryButton>
        <SecondaryButton>Review the rescue plan</SecondaryButton>
        <TextLink href="/services">Explore services</TextLink>
      </div>,
    );

    const primaryLink = screen.getByRole("link", { name: "Book a rescue call" });
    expect(primaryLink).toHaveAttribute("href", "/contact");
    expect(primaryLink).toHaveClass("bg-zapier-orange", "border-zapier-orange", "text-cream");

    const secondaryButton = screen.getByRole("button", { name: "Review the rescue plan" });
    expect(secondaryButton).toHaveAttribute("type", "button");
    expect(secondaryButton).toHaveClass("bg-zapier-black", "border-zapier-black", "text-cream");

    const textLink = screen.getByRole("link", { name: "Explore services" });
    expect(textLink).toHaveAttribute("href", "/services");
    expect(textLink).toHaveClass("text-zapier-black");
  });

  it("renders bordered surfaces and pill tags with predictable content containment", () => {
    render(
      <BorderedSurface data-testid="diagnosis-surface" tone="offwhite">
        <BodyText>We start with a diagnosis, not a rewrite.</BodyText>
        <PillTag>Border-first</PillTag>
      </BorderedSurface>,
    );

    const surface = screen.getByTestId("diagnosis-surface");
    expect(surface.tagName).toBe("DIV");
    expect(surface).toHaveClass("bg-offwhite", "border", "border-zapier-sand");
    expect(surface).toContainElement(screen.getByText("We start with a diagnosis, not a rewrite."));

    const pillTag = screen.getByText("Border-first");
    expect(pillTag.tagName).toBe("SPAN");
    expect(pillTag).toHaveClass("rounded-pill", "border-zapier-sand", "bg-cream", "text-zapier-charcoal");
  });
});
