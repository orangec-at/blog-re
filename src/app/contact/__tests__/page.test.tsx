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
        name: /^start your ai mvp rescue diagnosis$/i,
      }),
    ).toBeVisible();

    expect(screen.getByText(/^when to contact us$/i)).toBeVisible();
    expect(document.querySelector("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/^work email$/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /^start with diagnosis$/i })).toBeVisible();
    expect(screen.getByText(/^if you're not sure, start with diagnosis\.$/i)).toBeVisible();
  });
});
