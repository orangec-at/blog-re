import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("routes founders into the AI MVP rescue conversion flow", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: /ai(?:-built)? mvp rescue/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /services|fmv diagnosis/i })).toBeVisible();

    expect(
      screen.getByText(/prototype.*real product|technical debt|unstable architecture|launch readiness/i),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: /proof|results?/i })).toBeVisible();
    expect(screen.getByText(/fmv diagnosis|architecture fix|virtual cto/i)).toBeVisible();
  });
});
