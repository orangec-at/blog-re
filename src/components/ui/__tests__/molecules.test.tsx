import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormField } from "@/components/ui/forms/form-field";
import { CTAGroup } from "@/components/ui/molecules/cta-group";
import { CardHeader } from "@/components/ui/molecules/card-header";
import { MetricCard } from "@/components/ui/molecules/metric-card";
import { ProblemSolutionPair } from "@/components/ui/molecules/problem-solution-pair";

describe("UI molecules", () => {
  it("renders card headers with optional eyebrow and body copy", () => {
    const { rerender } = render(
      <CardHeader
        body="We diagnose the risky architecture first so founders can decide what to rescue."
        eyebrow="AI MVP rescue"
        title="Find the fastest path back to launch"
      />,
    );

    expect(screen.getByText("AI MVP rescue")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Find the fastest path back to launch" })).toBeInTheDocument();
    expect(
      screen.getByText("We diagnose the risky architecture first so founders can decide what to rescue."),
    ).toBeInTheDocument();

    rerender(<CardHeader title="Keep the title when the rest is optional" />);

    expect(screen.getByRole("heading", { level: 3, name: "Keep the title when the rest is optional" })).toBeInTheDocument();
    expect(screen.queryByText("AI MVP rescue")).not.toBeInTheDocument();
    expect(
      screen.queryByText("We diagnose the risky architecture first so founders can decide what to rescue."),
    ).not.toBeInTheDocument();
  });

  it("renders CTA groups with primary and secondary actions together", () => {
    render(
      <CTAGroup
        primaryAction={{ href: "/contact", label: "Book a rescue call", target: "_blank" }}
        secondaryAction={{ href: "/services", label: "Review rescue services", rel: "author", target: "_blank" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Book a rescue call" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Book a rescue call" })).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Review rescue services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: "Review rescue services" })).toHaveAttribute(
      "rel",
      "author noopener noreferrer",
    );
  });

  it("renders metric cards with a value and label", () => {
    render(<MetricCard label="average days saved before relaunch" value="14" />);

    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("average days saved before relaunch")).toBeInTheDocument();
  });

  it("renders problem and solution copy side by side with clear labels", () => {
    render(
      <ProblemSolutionPair
        problem="The MVP shipped with AI-generated scaffolding and no clear ownership boundaries."
        solution="We replace the brittle paths first, document the system, and give the team a calmer launch plan."
      />,
    );

    expect(screen.getByText("Problem")).toBeInTheDocument();
    expect(screen.getByText("Solution")).toBeInTheDocument();
    expect(
      screen.getByText("The MVP shipped with AI-generated scaffolding and no clear ownership boundaries."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("We replace the brittle paths first, document the system, and give the team a calmer launch plan."),
    ).toBeInTheDocument();
  });

  it("renders form fields with a label, control, and error slot", () => {
    render(
      <FormField error="Use a work email so we can review the stack context." htmlFor="email" label="Work email">
        <input id="email" name="email" type="email" />
      </FormField>,
    );

    expect(screen.getByLabelText("Work email")).toHaveAttribute("id", "email");
    expect(screen.getByLabelText("Work email")).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.getByLabelText("Work email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Use a work email so we can review the stack context.")).toHaveAttribute("id", "email-error");
    expect(screen.getByText("Use a work email so we can review the stack context.")).toHaveAttribute("role", "alert");
  });
});
