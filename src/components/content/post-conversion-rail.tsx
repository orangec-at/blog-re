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
        <nav aria-label={config.navLabel} className="rounded-[24px] bg-white p-4 shadow-[0_0_0_1px_rgba(32,21,21,0.06)]">
          <p className="px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-gray">On this guide</p>
          <div className="mt-3 grid gap-1">
            {config.sections.map((section) => (
              <a key={section.href} href={section.href} className="rounded-xl px-2 py-2 text-sm font-medium text-zapier-charcoal transition-colors hover:bg-[#f8f3ea] hover:text-zapier-black">
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
      <nav aria-label={`Mobile ${config.navLabel}`} className="rounded-[22px] bg-white p-3 shadow-[0_0_0_1px_rgba(32,21,21,0.06)]">
        <p className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zapier-gray">On this guide</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          {config.sections.map((section) => (
            <a key={section.href} href={section.href} className="shrink-0 rounded-full border border-zapier-sand bg-cream px-3 py-2 text-xs font-semibold text-zapier-charcoal">
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
    <div className="rounded-[24px] bg-[#201515] p-5 text-[#fffefb] shadow-[0_18px_50px_rgba(32,21,21,0.18)]">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff6a1f]">{config.railTitle}</p>
      <p className="mt-3 text-lg font-semibold leading-tight tracking-[-0.035em] text-[#fffefb]">{config.title}</p>
      <p className="mt-3 text-sm leading-6 text-[#f7ded0]">{config.description}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <Link
          href="/contact"
          className="inline-flex justify-center rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90"
          style={{ backgroundColor: "#ff4f00", color: "#fffefb" }}
        >
          {config.ctaLabel}
        </Link>
        {config.secondaryHref && config.secondaryLabel ? (
          <Link
            href={config.secondaryHref}
            className="inline-flex justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold hover:bg-[#fff4ec]"
            style={{ color: "#201515" }}
          >
            {config.secondaryLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
