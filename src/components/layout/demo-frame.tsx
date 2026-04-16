import { DeviceFrame } from "@/components/demos/device-frame";
import { PillTag } from "@/components/ui/feedback/pill-tag";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";
import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";
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
    <BorderedSurface
      data-testid="demo-meta"
      className={`flex flex-col gap-4 rounded-2xl bg-offwhite/90 p-4 ${className}`.trim()}
      tone="offwhite"
    >
      {stack.length > 0 ? (
        <div className="space-y-2">
          <Eyebrow className="text-xs">Stack</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <PillTag key={item} className="px-3 py-1 text-xs">
                {item}
              </PillTag>
            ))}
          </div>
        </div>
      ) : null}

      {links.length > 0 ? (
        <div className="space-y-2">
          <Eyebrow className="text-xs">Links</Eyebrow>
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
    </BorderedSurface>
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
          <Eyebrow>Live demo</Eyebrow>
          <SectionHeading className="text-2xl sm:text-3xl sm:leading-tight">{title}</SectionHeading>
          {description ? <BodyText className="text-base sm:text-base">{description}</BodyText> : null}
        </div>

        <DeviceFrame>{children}</DeviceFrame>
        <DemoMeta stack={stack} links={links} />
      </div>
    </FullWidth>
  );
}
