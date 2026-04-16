import { ContactHero } from "@/components/contact/contact-hero";
import { InquiryFormShell } from "@/components/contact/inquiry-form-shell";
import { ReassuranceNote } from "@/components/contact/reassurance-note";
import { WhenToContactUs } from "@/components/contact/when-to-contact-us";
import { contactGuidance, contactHero } from "@/data/contact-content";

export default function ContactPage() {
  return (
    <main className="flex flex-col" data-testid="contact-page">
      <ContactHero data={contactHero} />
      <WhenToContactUs data={contactGuidance} />
      <InquiryFormShell cta={contactGuidance.primaryCta} />
      <ReassuranceNote message={contactGuidance.reassurance} />
    </main>
  );
}
