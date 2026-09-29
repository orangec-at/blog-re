import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SampleAuditPage from "@/app/sample-audit/page";

describe("Sample Audit Page", () => {
  it("opens like a report: title, cover block, sample notice, verdict", () => {
    render(<SampleAuditPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Launch Gate Audit — Sample Report/i })).toBeVisible();
    // ReportMeta's notice always renders; it is the only thing marking the
    // report as synthetic.
    expect(screen.getByText(/written against a fictional product, not a client's app/i)).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /^Verdict$/ })).toBeVisible();
    expect(screen.getByText(/^No-Go for public launch as-is\.$/)).toHaveClass("text-p0");
  });

  it("lists every finding in one table, with severity as the only coloured cell", () => {
    render(<SampleAuditPage />);

    const table = screen.getByRole("table");
    // header row + nine findings — nothing sits behind a filter or a click.
    expect(within(table).getAllByRole("row")).toHaveLength(10);

    const leak = within(table).getByRole("row", { name: /RLS-01/ });
    expect(within(leak).getByText("P0")).toHaveClass("text-p0");
    expect(within(leak).getByText("Cross-Tenant Row Leak via Direct REST API")).toHaveClass("text-ink");

    const passed = within(table).getByRole("row", { name: /PAY-02/ });
    expect(within(passed).getByText("PASS")).toHaveClass("text-ok");
  });

  it("shows the evidence for every open finding without a click", () => {
    render(<SampleAuditPage />);

    expect(screen.getByRole("heading", { level: 3, name: /RLS-01.*Cross-Tenant Row Leak/ })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: /MON-01.*Edge Functions/ })).toBeVisible();
    expect(screen.getByText(/Strict tenant isolation/)).toBeVisible();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders the 48-hour plan and CTA", () => {
    render(<SampleAuditPage />);

    expect(screen.getByRole("heading", { level: 2, name: /48-hour P0 plan/i })).toBeVisible();
    expect(screen.getByText(/Apply tenant isolation RLS policies/i)).toBeVisible();
    expect(screen.getByRole("link", { name: /Start a Launch Gate Audit/i })).toHaveAttribute("href", "/contact");
  });

  it("never states a gate count", () => {
    // The same rule the home page is held to. The pricing canon sells twelve
    // gates, the gate document defines seven, and two of those are alternatives.
    // The page that shows a client what the audit produces cannot be the one
    // place an unverified number survives.
    const { container } = render(<SampleAuditPage />);
    const html = container.innerHTML.toLowerCase();

    for (const word of ["twelve", "seven", "12-gate", "12 gate", "7-gate", "7 gate"]) {
      expect(html).not.toContain(word);
    }
  });
});
