import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ContactPage", () => {
  it("makes diagnosis the low-friction way to start the conversation", async () => {
    const pageModulePath = "../page";
    const { default: ContactPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ContactPage());

    expect(screen.getByRole("heading", { level: 1, name: /contact/i })).toBeVisible();
    expect(screen.getByText(/when to contact us|when to reach out/i)).toBeVisible();
    expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /send|submit|start/i })).toBeVisible();
    expect(
      screen.getByText(/start with diagnosis|diagnosis is the right place to start|if you'?re not sure, start with diagnosis/i),
    ).toBeVisible();
  });
});
