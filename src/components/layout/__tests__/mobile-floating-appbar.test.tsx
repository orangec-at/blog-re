import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MobileFloatingAppbar } from "@/components/layout/mobile-floating-appbar";

const mockedUsePathname = vi.hoisted(() => vi.fn(() => "/"));

vi.mock("next/navigation", () => ({
  usePathname: mockedUsePathname,
}));

describe("MobileFloatingAppbar", () => {
  beforeEach(() => {
    mockedUsePathname.mockReturnValue("/");
  });

  it("renders mobile navigation chips and a Korean diagnosis action", () => {
    render(<MobileFloatingAppbar />);

    const appbar = screen.getByLabelText("Mobile primary navigation");
    expect(appbar).toBeInTheDocument();

    for (const label of ["Services", "Proof", "About", "Contact"]) {
      expect(within(appbar).getByRole("link", { name: label })).toBeVisible();
    }

    expect(within(appbar).getByRole("link", { name: "진단 문의" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("does not cover product-style article conversion rails", () => {
    mockedUsePathname.mockReturnValue("/posts/ai-mvp-technical-debt-audit-sample-report");

    const { container } = render(<MobileFloatingAppbar />);

    expect(container).toBeEmptyDOMElement();
  });
});
