import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text";
type ButtonSize = "sm" | "md" | "lg";

type SharedActionProps = {
  children: ReactNode;
  className?: string;
  leadingIcon?: ReactNode;
  size?: ButtonSize;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
};

type ButtonLinkProps = SharedActionProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;

type ButtonButtonProps = SharedActionProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type ButtonProps = ButtonLinkProps | ButtonButtonProps;
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

type PrimaryButtonProps = DistributiveOmit<ButtonProps, "variant">;
type SecondaryButtonProps = DistributiveOmit<ButtonProps, "variant">;
type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
  children: ReactNode;
  className?: string;
  href: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-zapier-orange bg-zapier-orange text-cream hover:border-[#c63d00] hover:bg-[#c63d00]",
  secondary:
    "border-zapier-black bg-zapier-black text-cream hover:border-zapier-sand hover:bg-zapier-sand hover:text-zapier-black",
  ghost: "border-zapier-sand bg-cream text-zapier-black hover:border-zapier-black hover:bg-offwhite",
  text: "border-transparent bg-transparent px-0 py-0 text-zapier-black underline decoration-zapier-sand decoration-2 underline-offset-4 hover:text-zapier-charcoal hover:no-underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-5 text-base",
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? (variant === "secondary" ? "lg" : "md");

  const composedClassName = joinClasses(
    "inline-flex items-center justify-center gap-2 rounded-[10px] border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream touch-manipulation",
    variant !== "text" && sizeClasses[size],
    variantClasses[variant],
    props.className,
  );

  const content = (
    <>
      {props.leadingIcon ? <span aria-hidden="true" className="inline-flex">{props.leadingIcon}</span> : null}
      <span>{props.children}</span>
      {props.trailingIcon ? <span aria-hidden="true" className="inline-flex">{props.trailingIcon}</span> : null}
    </>
  );

  if (typeof props.href === "string") {
    const {
      children: _children,
      className: _className,
      href,
      leadingIcon: _leadingIcon,
      size: _size,
      trailingIcon: _trailingIcon,
      variant: _variant,
      ...anchorProps
    } = props;
    void _children;
    void _className;
    void _leadingIcon;
    void _size;
    void _trailingIcon;
    void _variant;

    return (
      <a className={composedClassName} href={href} {...anchorProps}>
        {content}
      </a>
    );
  }

  const {
    children: _children,
    className: _className,
    leadingIcon: _leadingIcon,
    size: _size,
    trailingIcon: _trailingIcon,
    type,
    variant: _variant,
    ...buttonProps
  } = props;
  void _children;
  void _className;
  void _leadingIcon;
  void _size;
  void _trailingIcon;
  void _variant;

  return (
    <button className={composedClassName} type={type ?? "button"} {...buttonProps}>
      {content}
    </button>
  );
}

export function PrimaryButton(props: PrimaryButtonProps) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: SecondaryButtonProps) {
  return <Button {...props} size={props.size ?? "lg"} variant="secondary" />;
}

export function TextLink({ children, className, href, ...props }: TextLinkProps) {
  return (
    <Button {...props} className={className} href={href} variant="text">
      {children}
    </Button>
  );
}
