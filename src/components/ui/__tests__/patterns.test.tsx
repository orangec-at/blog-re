import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ConsolePanel } from "@/components/ui/surfaces/console-panel";
import { DecisionPanel } from "@/components/ui/patterns/decision-panel";
import { SectionIntro } from "@/components/ui/patterns/section-intro";
import { SignalList } from "@/components/ui/patterns/signal-list";

describe("UI patterns", () => {
  it("renders section intros with optional context aside", () => {
    render(
      <SectionIntro
        aside="Use this when the page needs a conversion note without another standalone card."
        body="A reusable lead-in block for blog sections, service sections, and proof areas."
        eyebrow="Pattern"
        title="Section Intro"
      />,
    );

    expect(screen.getByText("Pattern")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Section Intro" })).toBeInTheDocument();
    expect(
      screen.getByText("A reusable lead-in block for blog sections, service sections, and proof areas."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Use this when the page needs a conversion note without another standalone card."),
    ).toBeInTheDocument();
  });

  it("renders signal lists as readable grouped lists", () => {
    render(
      <SignalList
        items={[
          "Real users hit flows the demo never touched.",
          "Generated abstractions hide where logic actually lives.",
          "Every new feature raises the cost of change.",
        ]}
        title="Symptoms We See First"
      />,
    );

    expect(screen.getByRole("heading", { level: 3, name: "Symptoms We See First" })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders decision panels with fit, outcome, and cta content", () => {
    render(
      <DecisionPanel
        ctaHref="/contact"
        ctaLabel="Start with Diagnosis"
        outcome="A prioritized rescue plan that tells founders what to fix now versus later."
        summary="A fast first pass for teams that know the MVP is unstable but do not yet know the rescue scope."
        title="vibeguard diagnosis"
        whyItFits="Founders who need a clearer technical picture before committing to bigger repair work."
      />,
    );

    expect(screen.getByRole("heading", { level: 3, name: "vibeguard diagnosis" })).toBeInTheDocument();
    expect(screen.getByText("Why it fits")).toBeInTheDocument();
    expect(screen.getByText("What you leave with")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start with Diagnosis" })).toHaveAttribute("href", "/contact");
  });

  it("renders console panels as reusable high-contrast diagnostic surfaces", () => {
    render(
      <ConsolePanel
        heading="Diagnostic Console"
        kicker="Operations Surface"
        summary="Use this shell for triage, audit, and high-density rescue content."
      >
        <p>Panel content stays readable on dark surfaces.</p>
      </ConsolePanel>,
    );

    expect(screen.getByText("Operations Surface")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Diagnostic Console" })).toBeInTheDocument();
    expect(screen.getByText("Use this shell for triage, audit, and high-density rescue content.")).toBeInTheDocument();
    expect(screen.getByText("Panel content stays readable on dark surfaces.")).toBeInTheDocument();
  });
});
