import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SecondaryButtonBaseProps = {
  children: ReactNode;
  className?: string;
};

type SecondaryButtonLinkProps = SecondaryButtonBaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;

type SecondaryButtonButtonProps = SecondaryButtonBaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type SecondaryButtonProps = SecondaryButtonLinkProps | SecondaryButtonButtonProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SecondaryButton(props: SecondaryButtonProps) {
  const composedClassName = joinClasses(
    "inline-flex items-center justify-center rounded-lg border border-zapier-black bg-zapier-black px-6 py-5 text-base font-semibold text-cream transition-colors hover:border-zapier-sand hover:bg-zapier-sand hover:text-zapier-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
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
