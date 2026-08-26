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

  it("carries the header's links and the same English action", () => {
    render(<MobileFloatingAppbar />);

    const appbar = screen.getByLabelText("Mobile primary navigation");
    expect(appbar).toBeInTheDocument();

    for (const label of ["Proof", "About", "Contact"]) {
      expect(within(appbar).getByRole("link", { name: label })).toBeVisible();
    }

    // Services is gone from both navs: the page is written in Korean and this
    // site's buyer arrives from Upwork in English.
    expect(within(appbar).queryByRole("link", { name: "Services" })).not.toBeInTheDocument();

    // The action was labelled 진단 문의 on an otherwise English site.
    expect(within(appbar).getByRole("link", { name: "Start a review" })).toHaveAttribute(
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
