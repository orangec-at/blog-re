import type { HTMLAttributes, ReactNode } from "react";

type PillTagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PillTag({ children, className, ...props }: PillTagProps) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center rounded-pill border border-zapier-sand bg-cream px-4 py-1 text-sm font-medium text-zapier-charcoal",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
