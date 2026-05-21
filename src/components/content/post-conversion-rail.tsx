import Link from "next/link";

export type RailSection = {
  href: string;
  label: string;
};

export type ConversionRailConfig = {
  ctaLabel: string;
  description: string;
  navLabel: string;
  railTitle: string;
  sections: RailSection[];
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
};

type PostConversionRailProps = {
  config: ConversionRailConfig;
};

export function PostConversionRail({ config }: PostConversionRailProps) {
  return (
    <aside data-testid="post-conversion-rail" className="hidden lg:block">
      <div className="sticky top-24 space-y-4">
        <nav aria-label={config.navLabel} className="rounded-[24px] border border-zapier-sand/60 bg-cream p-4">
          <p className="px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-gray">On this guide</p>
          <div className="mt-3 grid gap-1">
            {config.sections.map((section) => (
              <a key={section.href} href={section.href} className="rounded-xl px-2 py-2.5 text-sm font-medium text-zapier-charcoal transition-colors hover:bg-[#f8f3ea] hover:text-zapier-black">
                {section.label}
              </a>
            ))}
          </div>
        </nav>
        <RailCtaCard config={config} />
      </div>
    </aside>
  );
}

export function PostMobileConversionRail({ config }: PostConversionRailProps) {
  return (
    <section data-testid="post-mobile-conversion-rail" className="mt-8 space-y-4 lg:hidden">
      <nav aria-label={`Mobile ${config.navLabel}`} className="rounded-[22px] border border-zapier-sand/60 bg-cream p-3">
        <p className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-gray">On this guide</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          {config.sections.map((section) => (
            <a key={section.href} href={section.href} className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-zapier-sand bg-cream px-3 py-2 text-xs font-semibold text-zapier-charcoal transition-colors hover:border-zapier-black hover:bg-[#fff4ec]">
              {section.label}
            </a>
          ))}
        </div>
      </nav>
      <RailCtaCard config={config} />
    </section>
  );
}

function RailCtaCard({ config }: PostConversionRailProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[22px] border border-zapier-sand/70 bg-cream p-4 sm:p-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-orange">{config.railTitle}</p>
      <p className="mt-2 break-words text-base font-semibold leading-tight tracking-[-0.02em] text-zapier-black [overflow-wrap:anywhere]">{config.title}</p>
      <p className="mt-2 text-sm leading-6 text-zapier-charcoal">{config.description}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <Link
          href="/contact"
          className="inline-flex min-h-11 justify-center rounded-xl border border-[#c63d00] bg-[#c63d00] px-4 py-2.5 text-sm font-semibold text-[#fffefb] transition-[background-color,border-color,transform] hover:border-zapier-black hover:bg-zapier-black active:translate-y-px"
        >
          {config.ctaLabel}
        </Link>
        {config.secondaryHref && config.secondaryLabel ? (
          <Link
            href={config.secondaryHref}
            className="inline-flex min-h-11 justify-center rounded-xl border border-zapier-sand bg-cream px-4 py-2.5 text-sm font-semibold text-zapier-black transition-[background-color,border-color,transform] hover:border-zapier-black hover:bg-[#fff4ec] active:translate-y-px"
          >
            {config.secondaryLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
