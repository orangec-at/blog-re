import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DrawhathaHighlight } from "@/components/home/drawhatha-highlight";
import { drawhathaHighlight } from "@/data/homepage-content";

describe("DrawhathaHighlight", () => {
  it("renders drawhatha highlight", () => {
    render(<DrawhathaHighlight highlight={drawhathaHighlight} />);

    const section = screen.getByTestId("drawhatha-highlight");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(drawhathaHighlight.title);
  });
});
