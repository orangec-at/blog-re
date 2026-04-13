import { Container } from "@/components/layout/container";
import type { ContactCTA } from "@/data/homepage-content";

type ContactCtaProps = {
  data: ContactCTA;
};

export function ContactCta({ data }: ContactCtaProps) {
  const { title, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref } = data;

  return (
    <section data-testid="contact-cta" className="bg-zapier-black py-16 text-cream">
      <Container variant="wide" className="rounded-2xl border border-zapier-sand bg-zapier-charcoal p-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-zapier-gray">Let’s refactor together</p>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-base text-cream/80">{body}</p>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <a
            className="inline-flex items-center justify-center rounded-lg border border-zapier-orange bg-zapier-orange px-6 py-3 text-base font-semibold text-cream"
            href={primaryHref}
          >
            {primaryLabel}
          </a>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-zapier-sand px-6 py-3 text-base font-semibold text-cream"
            href={secondaryHref}
          >
            {secondaryLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}
