import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactCta } from "@/components/home/contact-cta";
import { contactCta } from "@/data/homepage-content";

describe("ContactCta", () => {
  it("shows CTA title and links", () => {
    render(<ContactCta data={contactCta} />);

    const section = screen.getByTestId("contact-cta");
    expect(section).toBeInTheDocument();
    expect(section).toHaveTextContent(contactCta.title);
    expect(screen.getByText(contactCta.primaryLabel)).toHaveAttribute("href", contactCta.primaryHref);
    expect(screen.getByText(contactCta.secondaryLabel)).toHaveAttribute("href", contactCta.secondaryHref);
  });
});
