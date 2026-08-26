import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[background-color,border-color,color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-y-px touch-manipulation disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "min-h-11 rounded-[5px] border border-rule bg-paper text-ink shadow-[0_24px_36px_-24px_rgba(50,50,93,0.35),0_14px_24px_-18px_rgba(0,0,0,0.16)] hover:border-ink hover:bg-ink hover:text-paper",
        secondary:
          "min-h-11 rounded-[5px] border border-ink bg-paper text-ink shadow-[0_16px_32px_-24px_rgba(50,50,93,0.24)] hover:bg-rule",
        ghost:
          "min-h-11 rounded-[5px] border border-rule bg-paper text-ink shadow-[0_12px_28px_-24px_rgba(50,50,93,0.24)] hover:border-ink",
        text: "border-transparent bg-transparent px-0 py-0 text-ink underline decoration-rule decoration-2 underline-offset-4 hover:decoration-ink",
      },
      size: {
        sm: "px-3 py-3 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

type SharedActionProps = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  leadingIcon?: React.ReactNode;
  size?: ButtonSize;
  trailingIcon?: React.ReactNode;
  variant?: ButtonVariant;
};

type ButtonLinkProps = SharedActionProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;

type ButtonButtonProps = SharedActionProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type ButtonProps = ButtonLinkProps | ButtonButtonProps;
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

type PrimaryButtonProps = DistributiveOmit<ButtonProps, "variant">;
type SecondaryButtonProps = DistributiveOmit<ButtonProps, "variant">;
type TextLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
  children: React.ReactNode;
  className?: string;
  href: string;
};

function ActionContent({
  children,
  leadingIcon,
  trailingIcon,
}: Pick<SharedActionProps, "children" | "leadingIcon" | "trailingIcon">) {
  return (
    <>
      {leadingIcon ? <span aria-hidden="true" className="inline-flex">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true" className="inline-flex">{trailingIcon}</span> : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? (variant === "secondary" ? "lg" : "md");
  const className = cn(buttonVariants({ variant, size: variant === "text" ? undefined : size }), props.className);
  const content = <ActionContent leadingIcon={props.leadingIcon} trailingIcon={props.trailingIcon}>{props.children}</ActionContent>;

  if (props.asChild) {
    const {
      asChild: _asChild,
      children: _children,
      className: _className,
      leadingIcon: _leadingIcon,
      size: _size,
      trailingIcon: _trailingIcon,
      variant: _variant,
      ...slotProps
    } = props;
    void _asChild;
    void _children;
    void _className;
    void _leadingIcon;
    void _size;
    void _trailingIcon;
    void _variant;

    return (
      <Slot className={className} {...slotProps}>
        {props.children as React.ReactElement}
      </Slot>
    );
  }

  if (typeof props.href === "string") {
    const {
      asChild: _asChild,
      children: _children,
      className: _className,
      href,
      leadingIcon: _leadingIcon,
      size: _size,
      trailingIcon: _trailingIcon,
      variant: _variant,
      ...anchorProps
    } = props;
    void _asChild;
    void _children;
    void _className;
    void _leadingIcon;
    void _size;
    void _trailingIcon;
    void _variant;

    return (
      <a className={className} href={href} {...anchorProps}>
        {content}
      </a>
    );
  }

  const {
    asChild: _asChild,
    children: _children,
    className: _className,
    leadingIcon: _leadingIcon,
    size: _size,
    trailingIcon: _trailingIcon,
    type,
    variant: _variant,
    ...buttonProps
  } = props;
  void _asChild;
  void _children;
  void _className;
  void _leadingIcon;
  void _size;
  void _trailingIcon;
  void _variant;

  return (
    <button className={className} type={type ?? "button"} {...buttonProps}>
      {content}
    </button>
  );
}

export { buttonVariants };

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
