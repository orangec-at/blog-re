import type { Metadata } from "next";

import { InquiryForm } from "@/components/contact/inquiry-form";
import { Container } from "@/components/layout/container";
import { ProposalSection } from "@/components/proposal/proposal-section";
import { contact } from "@/data/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask about a vibeguard Launch Gate Audit: an independent review of your AI-built app before launch, with no rebuild commitment.",
  alternates: { canonical: "/contact" },
};

// The same grammar as /about: a mono margin, hairline rules, no card shells.
// The page this replaced set three cream cards with display type inside them.
export default function ContactPage() {
  return (
    <div data-testid="contact-page">
      <section aria-labelledby="contact-lede" className="py-16 sm:py-24">
        <Container variant="wide">
          <div className="grid gap-8 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-12">
            <p aria-hidden="true" className="font-mono text-sm text-ink-muted">
              {contact.eyebrow}
            </p>

            <div className="flex flex-col gap-5">
              <h1
                id="contact-lede"
                className="max-w-3xl text-balance font-display text-3xl font-normal leading-tight tracking-[-0.03em] text-ink sm:text-4xl"
              >
                {contact.headline}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{contact.lede}</p>
            </div>
          </div>
        </Container>
      </section>

      <ProposalSection number="01" title={contact.when.caption}>
        <ul className="flex max-w-2xl flex-col border-t border-rule">
          {contact.when.items.map((item) => (
            <li key={item.title} className="border-b border-rule py-4">
              <p className="text-base font-semibold leading-relaxed text-ink">{item.title}</p>
              <p className="mt-1 text-base leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </ProposalSection>

      <ProposalSection number="02" title={contact.form.caption}>
        <p className="max-w-2xl text-base leading-relaxed text-ink">{contact.form.body}</p>
        <InquiryForm ctaLabel={contact.form.ctaLabel} />
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{contact.form.reassurance}</p>
      </ProposalSection>
    </div>
  );
}
