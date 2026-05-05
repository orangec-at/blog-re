import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type ChipTone = "neutral" | "accent" | "inverse";
type ChipSize = "sm" | "md";

type ChipBaseProps = {
  children: ReactNode;
  className?: string;
  size?: ChipSize;
  tone?: ChipTone;
};

type ChipProps = ChipBaseProps & HTMLAttributes<HTMLSpanElement>;

type InteractiveChipLinkProps = ChipBaseProps & {
  count?: string;
  href: string;
  leadingIcon?: ReactNode;
  selected?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;

type InteractiveChipButtonProps = ChipBaseProps & {
  count?: string;
  href?: undefined;
  leadingIcon?: ReactNode;
  selected?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type InteractiveChipProps = InteractiveChipLinkProps | InteractiveChipButtonProps;

type ChipGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const chipSizeClasses: Record<ChipSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
};

const chipToneClasses: Record<ChipTone, string> = {
  neutral: "border-zapier-sand bg-cream text-zapier-charcoal",
  accent: "border-zapier-orange/30 bg-[#fff4ec] text-zapier-black",
  inverse: "border-white/15 bg-white/5 text-[#fff7f2]",
};

export function Chip({ children, className, size = "md", tone = "neutral", ...props }: ChipProps) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center gap-2 rounded-pill border font-medium",
        chipSizeClasses[size],
        chipToneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function InteractiveChip({
  children,
  className,
  count,
  leadingIcon,
  selected = false,
  size = "md",
  tone = "neutral",
  ...props
}: InteractiveChipProps) {
  const sharedClassName = joinClasses(
    "inline-flex items-center justify-center gap-2 rounded-pill border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream touch-manipulation",
    chipSizeClasses[size],
    selected
      ? tone === "inverse"
        ? "border-white/25 bg-white/15 text-[#fffaf6]"
        : "border-zapier-black bg-zapier-black text-cream"
      : chipToneClasses[tone],
    !selected && tone !== "inverse" && "hover:border-zapier-black hover:text-zapier-black",
    !selected && tone === "inverse" && "hover:border-white/30 hover:bg-white/10",
    className,
  );

  const content = (
    <>
      {leadingIcon ? <span aria-hidden="true" className="inline-flex">{leadingIcon}</span> : null}
      <span>{children}</span>
      {count ? (
        <span
          className={joinClasses(
            "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
            selected
              ? "bg-white/15 text-inherit"
              : tone === "inverse"
                ? "bg-white/10 text-[#fffaf6]"
                : "bg-zapier-light-sand text-zapier-black",
          )}
        >
          {count}
        </span>
      ) : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props;
    return (
      <a aria-current={selected ? "page" : undefined} className={sharedClassName} href={href} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type, ...buttonProps } = props;
  return (
    <button aria-pressed={selected} className={sharedClassName} type={type ?? "button"} {...buttonProps}>
      {content}
    </button>
  );
}

export function ChipGroup({ children, className, ...props }: ChipGroupProps) {
  return (
    <div className={joinClasses("flex flex-wrap items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}
