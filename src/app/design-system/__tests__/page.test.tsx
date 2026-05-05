import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DesignSystemPage", () => {
  it("shows the internal design system reference for the blog", async () => {
    const pageModulePath = "../page";
    const { default: DesignSystemPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await DesignSystemPage());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^Design System$/i,
      }),
    ).toBeVisible();

    expect(screen.getByRole("heading", { name: /^Surface Ladder$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^Pattern Examples$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^Decision Panel$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^Diagnostic Console$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^Content Product Blocks$/i })).toBeVisible();
    expect(screen.getByText("Article Intro")).toBeVisible();
    expect(screen.getByText("Decision Question / Risk Signal / Checklist Block")).toBeVisible();
    expect(screen.getByRole("heading", { name: /^Diagnostic Artifact Card$/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /^Post Conversion Rail$/i })).toBeVisible();
    expect(screen.getByTestId("post-conversion-rail")).toBeInTheDocument();
    expect(screen.getByTestId("post-mobile-conversion-rail")).toBeInTheDocument();
  });
});
