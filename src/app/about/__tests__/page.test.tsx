import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("AboutPage", () => {
  it("keeps the About route short and founder-facing", async () => {
    const pageModulePath = "../page";
    const { default: AboutPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await AboutPage());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^small team, senior product and architecture judgment$/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^team snapshot$/i })).toBeVisible();
    expect(
      screen.getByText(/architecture decisions and pm communication stay in the same conversation/i),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: /^start with diagnosis$/i })).toBeVisible();
  });
});
