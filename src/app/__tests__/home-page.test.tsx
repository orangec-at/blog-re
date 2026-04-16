import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home Page", () => {
  it("repositions the home route around AI MVP rescue and next-step conversion", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^your ai-coded mvp is failing\? we fix the vibe\.?$/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(
        /^we turn ai-built mvps into launch-ready products\.?$/i,
      ),
    ).toBeVisible();

    const diagnosisCtas = [
      ...screen.queryAllByRole("link", {
        name: /^start with fmv diagnosis$/i,
      }),
      ...screen.queryAllByRole("button", {
        name: /^start with fmv diagnosis$/i,
      }),
    ];

    expect(diagnosisCtas.length).toBeGreaterThan(0);
    expect(diagnosisCtas[0]).toBeVisible();
    expect(screen.getByRole("heading", { name: /^fixmyvibe$/i })).toBeVisible();
    expect(screen.getByText(/^fmv diagnosis$/i)).toBeVisible();
  });
});
