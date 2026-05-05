import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ResourcesPage", () => {
  it("renders the first-launch resources conversion path", async () => {
    const pageModulePath = "../page";
    const { default: ResourcesPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ResourcesPage());

    expect(screen.getByRole("heading", { level: 1, name: "FixMyVibe proof resources" })).toBeVisible();
    expect(screen.getByText(/review the sample audit structure/i)).toBeVisible();

    expect(screen.getByRole("heading", { level: 2, name: /capabilities/i })).toBeVisible();
    expect(screen.getAllByText(/risk table/i).length).toBeGreaterThan(0);

    expect(screen.getByRole("link", { name: /샘플 진단 리포트/i })).toHaveAttribute("href", "/posts/ai-mvp-technical-debt-audit-sample-report");

    expect(screen.getByTestId("contact-cta")).toBeVisible();
    expect(screen.getByRole("link", { name: /request an audit/i })).toBeVisible();
  });
});
