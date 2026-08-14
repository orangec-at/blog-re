import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { InquiryFormShell } from "@/components/contact/inquiry-form-shell";
import { ReassuranceNote } from "@/components/contact/reassurance-note";
import { WhenToContactUs } from "@/components/contact/when-to-contact-us";
import { contactGuidance, contactHero } from "@/data/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a practical FixMyVibe technical debt diagnosis inquiry without public launch, pricing, or delivery commitments.",
  alternates: { canonical: "/contact" },
};


export default function ContactPage() {
  return (
    // The root layout already renders <main>; this page is a section inside it.
    <div className="flex flex-col" data-testid="contact-page">
      <ContactHero data={contactHero} />
      <WhenToContactUs data={contactGuidance} />
      <InquiryFormShell cta={contactGuidance.primaryCta} />
      <ReassuranceNote message={contactGuidance.reassurance} />
    </div>
  );
}
