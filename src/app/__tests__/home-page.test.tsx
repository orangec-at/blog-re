import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("renders all homepage sections", () => {
    render(<Home />);

    expect(screen.getByTestId("home-page"));
    expect(screen.getByTestId("hero-section"));
    expect(screen.getByTestId("before-after-board"));
    expect(screen.getByTestId("decision-principles"));
    expect(screen.getByTestId("case-study-grid"));
    expect(screen.getByTestId("refactoring-log"));
    expect(screen.getByTestId("iac-highlight"));
    expect(screen.getByTestId("drawhatha-highlight"));
    expect(screen.getByTestId("contact-cta"));
  });
});
