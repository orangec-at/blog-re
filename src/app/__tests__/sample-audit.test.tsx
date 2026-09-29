import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SampleAuditPage from "@/app/sample-audit/page";
import { verdict } from "@/data/proposal-content";

const OPEN = ["RLS-01", "PAY-01", "OPS-01", "SEC-02", "MIG-01", "MON-01"];
const PASSED = ["AUTH-01", "DB-01", "PAY-02"];

describe("Sample Audit Page", () => {
  it("opens like a report: title, cover block, sample notice, verdict", () => {
    render(<SampleAuditPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Launch Gate Audit — Sample Report/i })).toBeVisible();
    // ReportMeta's notice always renders, in p1; it is the only thing marking
    // the report as synthetic.
    expect(screen.getByText(verdict.sampleNotice)).toHaveClass("text-p1");
    expect(screen.getByRole("heading", { level: 2, name: /^Verdict$/ })).toBeVisible();
    expect(screen.getByText(/^No-Go for public launch as-is\.$/)).toHaveClass("text-p0");
  });

  it("lists every finding in one table, and only the status column carries colour", () => {
    render(<SampleAuditPage />);

    const [, ...rows] = within(screen.getByRole("table")).getAllByRole("row");
    // nine findings — nothing sits behind a filter or a click.
    expect(rows).toHaveLength(OPEN.length + PASSED.length);

    for (const row of rows) {
      const cells = within(row).getAllByRole("cell");
      cells.forEach((cell, column) => {
        if (column === 1) {
          expect(cell.className).toMatch(/text-(p0|p1|ok)\b/);
        } else {
          expect(cell).toHaveClass("text-ink");
        }
      });
    }
  });

  it("explains every open finding, and only those, without a click", () => {
    render(<SampleAuditPage />);

    const findings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent ?? "");
    expect(findings).toHaveLength(OPEN.length);
    OPEN.forEach((id, i) => expect(findings[i]).toContain(id));
    PASSED.forEach((id) => expect(findings.join(" ")).not.toContain(id));
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("fills in the founder summary headings the home page promises, in order", () => {
    render(<SampleAuditPage />);

    const section = screen.getByRole("region", { name: verdict.title });
    const text = section.textContent ?? "";
    let from = 0;
    for (const { heading } of verdict.sections) {
      const at = text.indexOf(heading, from);
      expect(at, heading).toBeGreaterThanOrEqual(from);
      from = at + heading.length;
    }
  });

  it("carries no card shells, fills or shadows", () => {
    // DESIGN.md: rules, never a card shell or a zebra fill. The page this
    // replaced had all three. The CTA button is the one allowed ink fill.
    const { container } = render(<SampleAuditPage />);
    const offenders = [...container.querySelectorAll('[class*="rounded"], [class*="shadow"], [class*="bg-"]')].filter(
      (el) => el.closest("a")?.getAttribute("href") !== "/contact",
    );
    expect(offenders).toEqual([]);
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
