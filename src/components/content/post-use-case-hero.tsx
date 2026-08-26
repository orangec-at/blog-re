import Link from "next/link";

type HeroLink = {
  href: string;
  label: string;
};

type HeroMeta = {
  label: string;
  value: string;
};

export type PostUseCaseHeroProps = {
  backHref?: string;
  backLabel?: string;
  bestFor: string[];
  eyebrow: string;
  meta: HeroMeta[];
  primary: HeroLink;
  secondary: HeroLink;
  summary: string;
  title: string;
};

export function PostUseCaseHero({
  backHref = "/posts",
  backLabel = "All posts",
  bestFor,
  eyebrow,
  meta,
  primary,
  secondary,
  summary,
  title,
}: PostUseCaseHeroProps) {
  return (
    <section
      aria-label="Post use-case summary"
      className="mx-auto grid max-w-6xl gap-5 rounded-[28px] border border-rule/60 bg-[#fffdf9] p-4 sm:gap-8 sm:p-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-8"
    >
      <div className="min-w-0 space-y-4 sm:space-y-5">
        <Link
          href={backHref}
          className="inline-flex min-h-11 items-center text-sm font-semibold text-ink-muted hover:text-ink"
        >
          ← {backLabel}
        </Link>
        <div className="space-y-3 sm:space-y-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink sm:text-xs sm:tracking-[0.24em]">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl break-words text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-ink sm:text-6xl sm:leading-[1.05] sm:tracking-[-0.055em]">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink sm:text-lg">
            {summary}
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
          <Link
            href={primary.href}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-[background-color,border-color,transform] hover:border-ink hover:bg-ink active:translate-y-px"
          >
            {primary.label}
          </Link>
          <Link
            href={secondary.href}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-rule bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-[background-color,border-color,transform] hover:border-ink hover:bg-rule/30 active:translate-y-px"
          >
            {secondary.label}
          </Link>
        </div>
        <dl className="flex flex-wrap gap-2 pt-1 sm:grid sm:grid-cols-3 sm:pt-2">
          {meta.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="rounded-full border border-rule/60 bg-paper px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3"
            >
              <dt className="inline font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted sm:block sm:text-[10px] sm:tracking-[0.2em]">
                {item.label}
              </dt>
              <dd className="ml-1 inline text-xs font-semibold text-ink sm:ml-0 sm:mt-1 sm:block sm:text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className="rounded-[22px] border border-rule/70 bg-paper p-4 text-ink sm:rounded-[26px] sm:p-5 lg:border-ink lg:bg-[#201515] lg:p-6 lg:text-paper">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink sm:text-[11px] sm:tracking-[0.24em] lg:text-[#ff6a1f]">
          Best for
        </p>
        <ul className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
          {bestFor.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-ink lg:text-[#fff7ef]">
              <span
                aria-hidden="true"
                className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-paper"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
