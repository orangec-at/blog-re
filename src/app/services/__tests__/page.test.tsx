import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ServicesPage", () => {
  it("helps founders choose the right engagement starting with diagnosis", async () => {
    const pageModulePath = "../page";
    const { default: ServicesPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ServicesPage());

    expect(screen.getByRole("heading", { level: 1, name: /services/i })).toBeVisible();
    expect(screen.getByText(/ai(?:-built)? mvp rescue|founder/i)).toBeVisible();

    expect(screen.getByRole("heading", { name: /fmv diagnosis/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /architecture fix/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /virtual cto/i })).toBeVisible();

    expect(screen.getByText(/start here|start with diagnosis|not sure where to start/i)).toBeVisible();
    expect(screen.getByRole("link", { name: /contact|diagnosis/i })).toBeVisible();
  });
});
