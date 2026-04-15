import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("repositions the home route around AI MVP rescue and next-step conversion", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /we turn ai-built mvps into launch-ready products/i,
      }),
    ).toBeVisible();

    const nextStepCta =
      screen.queryByRole("link", {
        name: /services|fmv diagnosis|start with diagnosis/i,
      }) ??
      screen.queryByRole("button", {
        name: /services|fmv diagnosis|start with diagnosis/i,
      });

    expect(nextStepCta).toBeVisible();
    expect(screen.getByText(/technical debt|failing|blocked by/i)).toBeVisible();
    expect(screen.getByText(/proof|result/i)).toBeVisible();
    expect(screen.getByText(/fmv diagnosis|architecture fix|virtual cto/i)).toBeVisible();
  });
});
