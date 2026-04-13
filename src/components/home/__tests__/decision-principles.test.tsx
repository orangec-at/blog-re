import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DecisionPrinciples } from "@/components/home/decision-principles";
import { principles } from "@/data/homepage-content";

describe("DecisionPrinciples", () => {
  it("renders principle labels and titles", () => {
    render(<DecisionPrinciples principles={principles} />);

    const section = screen.getByTestId("decision-principles");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(principles[0].label);
    expect(section).toHaveTextContent(principles[0].title);
  });
});
