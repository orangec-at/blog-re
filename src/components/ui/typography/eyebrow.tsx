import type { ComponentPropsWithoutRef, ReactNode } from "react";

type EyebrowBaseProps = {
  children: ReactNode;
  className?: string;
};

type EyebrowParagraphProps = EyebrowBaseProps & {
  as?: "p";
} & Omit<ComponentPropsWithoutRef<"p">, "as" | "children" | "className">;

type EyebrowSpanProps = EyebrowBaseProps & {
  as: "span";
} & Omit<ComponentPropsWithoutRef<"span">, "as" | "children" | "className">;

type EyebrowProps = EyebrowParagraphProps | EyebrowSpanProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Eyebrow(props: EyebrowProps) {
  const composedClassName = joinClasses(
    "font-sans text-sm font-semibold uppercase tracking-[0.5px] text-zapier-gray",
    props.className,
  );

  if (props.as === "span") {
    const { as: _as, children, className: _className, ...spanProps } = props;
    void _as;
    void _className;

    return (
      <span className={composedClassName} {...spanProps}>
        {children}
      </span>
    );
  }

  const { as: _as, children, className: _className, ...paragraphProps } = props;
  void _as;
  void _className;

  return (
    <p className={composedClassName} {...paragraphProps}>
      {children}
    </p>
  );
}
