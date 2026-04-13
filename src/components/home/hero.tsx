import { Container } from "@/components/layout/container";

type CTA = {
  label: string;
  href: string;
};

type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: CTA;
  secondaryCta: CTA;
};

type HeroSectionProps = {
  data: HeroContent;
};

export function HeroSection({ data }: HeroSectionProps) {
  const { eyebrow, title, subtitle, primaryCta, secondaryCta } = data;

  return (
    <section data-testid="hero-section" className="bg-cream py-16 sm:py-24">
      <Container variant="wide" className="flex flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-zapier-gray">{eyebrow}</p>
          <h1 className="text-4xl font-semibold text-zapier-black sm:text-5xl">{title}</h1>
          <p className="max-w-3xl text-lg text-zapier-charcoal">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            className="inline-flex items-center justify-center rounded-lg border border-zapier-orange bg-zapier-orange px-6 py-3 text-base font-semibold text-cream shadow-tab-active transition hover:bg-zapier-orange/90"
            href={primaryCta.href}
          >
            {primaryCta.label}
          </a>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-zapier-sand bg-cream px-6 py-3 text-base font-semibold text-zapier-charcoal transition hover:bg-zapier-sand/40"
            href={secondaryCta.href}
          >
            {secondaryCta.label}
          </a>
        </div>
      </Container>
    </section>
  );
}
