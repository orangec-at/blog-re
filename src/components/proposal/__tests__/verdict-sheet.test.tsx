import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VerdictSheet } from "@/components/proposal/verdict-sheet";

const sections = [
  { heading: "The decision", body: "Continue, fix first, or stop." },
  { heading: "What can wait", body: "Named explicitly." },
];

describe("VerdictSheet", () => {
  it("labels itself a sample", () => {
    // Standing approval boundary: a synthetic artifact that is not marked reads
    // as a real client's findings.
    render(<VerdictSheet title="Founder Summary" sampleNotice="Sample — written against a fictional product." sections={sections} />);

    expect(screen.getByText(/^Sample —/)).toBeVisible();
  });

  it("renders each heading of the real artifact in order", () => {
    render(<VerdictSheet title="Founder Summary" sampleNotice="Sample — written against a fictional product." sections={sections} />);

    const headings = screen.getAllByRole("heading", { level: 4 }).map((node) => node.textContent);
    expect(headings).toEqual(["The decision", "What can wait"]);
  });
});
