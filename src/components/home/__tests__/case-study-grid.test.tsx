import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyGrid } from "@/components/home/case-study-grid";
import { caseStudies } from "@/data/homepage-content";

describe("CaseStudyGrid", () => {
  it("renders study cards and CTA links", () => {
    render(<CaseStudyGrid caseStudies={caseStudies} />);

    const section = screen.getByTestId("case-study-grid");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(caseStudies[0].name);
    const ctaLink = screen.getByRole("link", {
      name: new RegExp(caseStudies[0].ctaLabel, "i"),
    });
    expect(ctaLink).toHaveAttribute("href", caseStudies[0].ctaHref);
  });
});
