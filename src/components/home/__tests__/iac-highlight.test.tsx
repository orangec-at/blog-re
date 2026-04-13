import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IacHighlight } from "@/components/home/iac-highlight";
import { iacHighlight } from "@/data/homepage-content";

describe("IacHighlight", () => {
  it("renders highlight body and tags", () => {
    render(<IacHighlight highlight={iacHighlight} />);

    const section = screen.getByTestId("iac-highlight");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(iacHighlight.title);
    iacHighlight.tags.forEach((tag) => {
      expect(section).toHaveTextContent(tag);
    });
  });
});
