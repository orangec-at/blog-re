import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ContactPage", () => {
  it("frames contact as the start of a diagnosis conversation", async () => {
    const pageModulePath = "../page";
    const { default: ContactPage } = await import(/* @vite-ignore */ pageModulePath);

    render(await ContactPage());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^AI MVP Technical Debt Audit으로 작게 시작하세요$/i,
      }),
    ).toBeVisible();

    expect(screen.getByText(/^when to contact us$/i)).toBeVisible();
    expect(document.querySelector("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/^work email$/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /^Start with Technical Debt Audit$/i })).toBeVisible();
    expect(screen.getByText(/^If you're not sure, start with Technical Debt Audit\.$/i)).toBeVisible();
  });
});
