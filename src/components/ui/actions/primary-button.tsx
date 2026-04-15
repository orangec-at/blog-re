import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonBaseProps = {
  children: ReactNode;
  className?: string;
};

type PrimaryButtonLinkProps = PrimaryButtonBaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;

type PrimaryButtonButtonProps = PrimaryButtonBaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type PrimaryButtonProps = PrimaryButtonLinkProps | PrimaryButtonButtonProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PrimaryButton(props: PrimaryButtonProps) {
  const composedClassName = joinClasses(
    "inline-flex items-center justify-center rounded-[4px] border border-zapier-orange bg-zapier-orange px-4 py-2 text-base font-semibold text-cream transition-colors hover:bg-[#e84700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
    props.className,
  );

  if (typeof props.href === "string") {
    const { children, className: _className, href, ...anchorProps } = props;
    void _className;

    return (
      <a className={composedClassName} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { children, className: _className, type, ...buttonProps } = props;
  void _className;

  return (
    <button className={composedClassName} type={type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
