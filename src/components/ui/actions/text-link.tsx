import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
  children: ReactNode;
  className?: string;
  href: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function TextLink({ children, className, href, ...props }: TextLinkProps) {
  return (
    <a
      className={joinClasses(
        "inline-flex items-center gap-1 font-sans text-base font-semibold text-zapier-black underline decoration-zapier-sand decoration-2 underline-offset-4 transition-colors hover:text-zapier-charcoal hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zapier-black focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
}
