import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BodyTextBaseProps = {
  children: ReactNode;
  className?: string;
};

type BodyTextParagraphProps = BodyTextBaseProps & {
  as?: "p";
} & Omit<ComponentPropsWithoutRef<"p">, "as" | "children" | "className">;

type BodyTextSpanProps = BodyTextBaseProps & {
  as: "span";
} & Omit<ComponentPropsWithoutRef<"span">, "as" | "children" | "className">;

type BodyTextProps = BodyTextParagraphProps | BodyTextSpanProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BodyText(props: BodyTextProps) {
  const composedClassName = joinClasses(
    "font-sans text-base font-normal leading-5 tracking-[-0.01em] text-zapier-charcoal sm:text-lg sm:leading-6",
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
