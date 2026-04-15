import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ServicesPage", () => {
  it("guides founders to the right rescue engagement", async () => {
    const pageModulePath = "../page";
    const { default: ServicesPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ServicesPage());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^ai mvp rescue services$/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/start with fmv diagnosis if you're not sure which rescue path you need/i),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: /^fmv diagnosis$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^architecture fix$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^virtual cto$/i })).toBeVisible();

    const contactOrDiagnosisCta =
      screen.queryByRole("link", {
        name: /^book a diagnosis call$/i,
      }) ??
      screen.queryByRole("button", {
        name: /^book a diagnosis call$/i,
      });

    expect(contactOrDiagnosisCta).toBeVisible();
  });
});
