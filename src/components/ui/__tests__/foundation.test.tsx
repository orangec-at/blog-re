import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/badge";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip, ChipGroup, InteractiveChip } from "@/components/ui/chip";
import { PillTag } from "@/components/ui/feedback/pill-tag";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { PanelSurface } from "@/components/ui/surfaces/panel-surface";
import { BodyText, DisplayHeading, Eyebrow, SectionHeading } from "@/components/ui/typography";

describe("UI foundation primitives", () => {
  it("renders typography primitives with semantic intent and Stripe-inspired styling", () => {
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
    expect(sectionHeading).toHaveClass("font-display", "text-zapier-black");

    const bodyText = screen.getByText("Clear architecture, calmer delivery, and a launch path.");
    expect(bodyText.tagName).toBe("SPAN");
    expect(bodyText).toHaveClass("text-zapier-charcoal", "font-light");
  });

  it("renders CTA primitives as accessible links and buttons with clear emphasis", () => {
    render(
      <div>
        <PrimaryButton href="/contact" size="md">Book a rescue call</PrimaryButton>
        <SecondaryButton size="lg">Review the rescue plan</SecondaryButton>
        <TextLink href="/services">Explore services</TextLink>
      </div>,
    );

    const primaryLink = screen.getByRole("link", { name: "Book a rescue call" });
    expect(primaryLink).toHaveAttribute("href", "/contact");
    expect(primaryLink).toHaveClass("bg-[#533afd]", "border-[#533afd]", "text-white");

    const secondaryButton = screen.getByRole("button", { name: "Review the rescue plan" });
    expect(secondaryButton).toHaveAttribute("type", "button");
    expect(secondaryButton).toHaveClass("bg-white", "border-[#b9b9f9]", "text-[#533afd]");
    expect(secondaryButton).toHaveClass("px-6", "py-5");

    const textLink = screen.getByRole("link", { name: "Explore services" });
    expect(textLink).toHaveAttribute("href", "/services");
    expect(textLink).toHaveClass("text-[#533afd]");
  });

  it("renders informational and interactive chip atoms", () => {
    render(
      <div>
        <Chip tone="accent">AI MVP Rescue</Chip>
        <ChipGroup aria-label="Filter chips">
          <InteractiveChip href="/services" selected>
            Services
          </InteractiveChip>
          <InteractiveChip href="/posts">Proof</InteractiveChip>
        </ChipGroup>
      </div>,
    );

    const staticChip = screen.getByText("AI MVP Rescue");
    expect(staticChip.tagName).toBe("SPAN");
    expect(staticChip).toHaveClass("rounded-pill");

    const chipGroup = screen.getByLabelText("Filter chips");
    expect(chipGroup).toBeInTheDocument();

    const selectedChip = screen.getByRole("link", { name: "Services" });
    expect(selectedChip).toHaveAttribute("href", "/services");
    expect(selectedChip).toHaveAttribute("aria-current", "page");

    const defaultChip = screen.getByRole("link", { name: "Proof" });
    expect(defaultChip).toHaveAttribute("href", "/posts");
    expect(defaultChip).not.toHaveAttribute("aria-current");
  });

  it("keeps badge variants compact inline labels rather than full-width pills", () => {
    render(
      <div>
        <Badge data-testid="badge-default">Default</Badge>
        <Badge data-testid="badge-accent" variant="accent">Accent</Badge>
        <Badge data-testid="badge-label" variant="label">Label</Badge>
        <Badge data-testid="badge-muted" variant="muted">Muted</Badge>
      </div>,
    );

    const badges = [
      screen.getByTestId("badge-default"),
      screen.getByTestId("badge-accent"),
      screen.getByTestId("badge-label"),
      screen.getByTestId("badge-muted"),
    ];

    for (const badge of badges) {
      expect(badge.tagName).toBe("SPAN");
      expect(badge).toHaveClass("inline-flex", "w-fit", "shrink-0", "whitespace-nowrap", "text-xs");
      expect(badge).not.toHaveClass("w-full", "flex-1", "block", "rounded-pill");
    }

    expect(screen.getByTestId("badge-default")).toHaveClass("rounded-base", "px-2.5", "py-1");
    expect(screen.getByTestId("badge-accent")).toHaveClass("rounded-base", "px-2.5", "py-1");
    expect(screen.getByTestId("badge-label")).toHaveClass("p-0", "uppercase", "text-[#533afd]");
    expect(screen.getByTestId("badge-label")).not.toHaveClass("text-zapier-orange");
    expect(screen.getByTestId("badge-muted")).toHaveClass("p-0", "uppercase");
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

  it("renders card and panel surface shells with their baseline slots and tones", () => {
    render(
      <div>
        <Card data-testid="marketing-card">
          <CardHeader>
            <CardTitle>Reusable marketing card</CardTitle>
          </CardHeader>
          <CardContent>Slot-based card content</CardContent>
          <CardFooter>Next action</CardFooter>
        </Card>
        <PanelSurface as="section" data-testid="legacy-panel" tone="muted">
          Legacy or broad content surface
        </PanelSurface>
      </div>,
    );

    const card = screen.getByTestId("marketing-card");
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveClass("rounded-lg", "border", "bg-cream");
    expect(screen.getByRole("heading", { level: 3, name: "Reusable marketing card" })).toHaveAttribute(
      "data-slot",
      "card-title",
    );
    expect(screen.getByText("Slot-based card content")).toHaveAttribute("data-slot", "card-content");

    const panel = screen.getByTestId("legacy-panel");
    expect(panel.tagName).toBe("SECTION");
    expect(panel).toHaveClass("rounded-3xl", "border", "bg-offwhite");
  });
});
