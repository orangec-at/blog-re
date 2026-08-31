import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SampleAuditPage from "@/app/sample-audit/page";

describe("Sample Audit Page", () => {
  it("renders the audit artifact header and overall verdict", () => {
    render(<SampleAuditPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Pre-Launch Technical Debt Audit — Sample Report/i,
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Overall Verdict: ⚠️ NO-GO for Public Launch As-Is/i,
      }),
    ).toBeVisible();
  });

  it("renders the diagnostic matrix with domain filtering", () => {
    render(<SampleAuditPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /^Diagnostic Matrix$/i,
      }),
    ).toBeVisible();

    // Default shows All findings including P0 RLS finding
    expect(screen.getByText(/Cross-Tenant Row Leak via Direct REST API/i)).toBeVisible();

    // Filter by Payments
    const paymentsBtn = screen.getByRole("button", { name: /^Payments$/i });
    fireEvent.click(paymentsBtn);

    expect(screen.getByText(/Webhook Handler Lacks Idempotency Guard/i)).toBeVisible();
    expect(screen.queryByText(/Cross-Tenant Row Leak via Direct REST API/i)).toBeNull();
  });

  it("renders the 48-hour remediation plan and CTA", () => {
    render(<SampleAuditPage />);

    expect(screen.getByText(/48-Hour P0 Remediation Plan/i)).toBeVisible();
    expect(screen.getByText(/Apply Tenant Isolation RLS Policies/i)).toBeVisible();

    const ctaLink = screen.getByRole("link", { name: /Start a Launch Gate Review/i });
    expect(ctaLink).toHaveAttribute("href", "/contact");
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
