import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SharedTextProps = {
  children: ReactNode;
  className?: string;
};

type EyebrowParagraphProps = SharedTextProps & {
  as?: "p";
} & Omit<ComponentPropsWithoutRef<"p">, "as" | "children" | "className">;

type EyebrowSpanProps = SharedTextProps & {
  as: "span";
} & Omit<ComponentPropsWithoutRef<"span">, "as" | "children" | "className">;

type EyebrowProps = EyebrowParagraphProps | EyebrowSpanProps;

type DisplayHeadingLevelOneProps = SharedTextProps & {
  as?: "h1";
} & Omit<ComponentPropsWithoutRef<"h1">, "as" | "children" | "className">;

type DisplayHeadingLevelTwoProps = SharedTextProps & {
  as: "h2";
} & Omit<ComponentPropsWithoutRef<"h2">, "as" | "children" | "className">;

type DisplayHeadingProps = DisplayHeadingLevelOneProps | DisplayHeadingLevelTwoProps;

type SectionHeadingLevelTwoProps = SharedTextProps & {
  as?: "h2";
} & Omit<ComponentPropsWithoutRef<"h2">, "as" | "children" | "className">;

type SectionHeadingLevelThreeProps = SharedTextProps & {
  as: "h3";
} & Omit<ComponentPropsWithoutRef<"h3">, "as" | "children" | "className">;

type SectionHeadingProps = SectionHeadingLevelTwoProps | SectionHeadingLevelThreeProps;

type BodyTextParagraphProps = SharedTextProps & {
  as?: "p";
} & Omit<ComponentPropsWithoutRef<"p">, "as" | "children" | "className">;

type BodyTextSpanProps = SharedTextProps & {
  as: "span";
} & Omit<ComponentPropsWithoutRef<"span">, "as" | "children" | "className">;

type BodyTextProps = BodyTextParagraphProps | BodyTextSpanProps;

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

export function DisplayHeading(props: DisplayHeadingProps) {
  const composedClassName = joinClasses(
    "font-display text-4xl font-medium leading-[0.95] text-zapier-black sm:text-5xl",
    props.className,
  );

  if (props.as === "h2") {
    const { as: _as, children, className: _className, ...headingProps } = props;
    void _as;
    void _className;

    return (
      <h2 className={composedClassName} {...headingProps}>
        {children}
      </h2>
    );
  }

  const { as: _as, children, className: _className, ...headingProps } = props;
  void _as;
  void _className;

  return (
    <h1 className={composedClassName} {...headingProps}>
      {children}
    </h1>
  );
}

export function SectionHeading(props: SectionHeadingProps) {
  const composedClassName = joinClasses(
    "font-sans text-3xl font-medium leading-tight text-zapier-black sm:text-5xl sm:leading-[1.04]",
    props.className,
  );

  if (props.as === "h3") {
    const { as: _as, children, className: _className, ...headingProps } = props;
    void _as;
    void _className;

    return (
      <h3 className={composedClassName} {...headingProps}>
        {children}
      </h3>
    );
  }

  const { as: _as, children, className: _className, ...headingProps } = props;
  void _as;
  void _className;

  return (
    <h2 className={composedClassName} {...headingProps}>
      {children}
    </h2>
  );
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
