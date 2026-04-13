import { DeviceFrame } from "@/components/demos/device-frame";
import { FullWidth } from "./full-width";

export type DemoLayout = "full" | "narrow";

export type DemoLink = {
  label: string;
  href: string;
};

type DemoMetaProps = {
  stack?: string[];
  links?: DemoLink[];
  className?: string;
};

type DemoFrameProps = {
  title: string;
  description?: string;
  layout?: DemoLayout;
  stack?: string[];
  links?: DemoLink[];
  children: React.ReactNode;
};

const layoutVariants = {
  full: "wide",
  narrow: "narrow",
} as const;

export function DemoMeta({ stack = [], links = [], className = "" }: DemoMetaProps) {
  if (stack.length === 0 && links.length === 0) {
    return null;
  }

  return (
    <div
      data-testid="demo-meta"
      className={`flex flex-col gap-4 rounded-2xl border border-zapier-sand bg-offwhite/90 p-4 ${className}`.trim()}
    >
      {stack.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">Stack</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zapier-sand px-3 py-1 text-xs font-medium text-zapier-charcoal"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {links.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zapier-gray">Links</p>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="inline-flex items-center rounded-full border border-zapier-sand px-3 py-1 text-sm font-semibold text-zapier-orange transition hover:border-zapier-orange"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function DemoFrame({
  title,
  description,
  layout = "narrow",
  stack = [],
  links = [],
  children,
}: DemoFrameProps) {
  return (
    <FullWidth variant={layoutVariants[layout]} className="py-8" contentClassName="space-y-4">
      <div data-testid="demo-frame" className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zapier-gray">Live demo</p>
          <h2 className="text-2xl font-semibold text-zapier-black sm:text-3xl">{title}</h2>
          {description ? <p className="text-base text-zapier-charcoal">{description}</p> : null}
        </div>

        <DeviceFrame>{children}</DeviceFrame>
        <DemoMeta stack={stack} links={links} />
      </div>
    </FullWidth>
  );
}
