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
        name: /services|mvp rescue|diagnosis/i,
      }),
    ).toBeVisible();

    expect(screen.getByText(/start with diagnosis|choose the right service|not sure which service/i)).toBeVisible();
    expect(screen.getByRole("heading", { name: /fmv diagnosis/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /architecture fix/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /virtual cto/i })).toBeVisible();

    const contactOrDiagnosisCta =
      screen.queryByRole("link", {
        name: /contact|diagnosis|book/i,
      }) ??
      screen.queryByRole("button", {
        name: /contact|diagnosis|book/i,
      });

    expect(contactOrDiagnosisCta).toBeVisible();
  });
});
