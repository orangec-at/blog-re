import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DisplayHeadingBaseProps = {
  children: ReactNode;
  className?: string;
};

type DisplayHeadingLevelOneProps = DisplayHeadingBaseProps & {
  as?: "h1";
} & Omit<ComponentPropsWithoutRef<"h1">, "as" | "children" | "className">;

type DisplayHeadingLevelTwoProps = DisplayHeadingBaseProps & {
  as: "h2";
} & Omit<ComponentPropsWithoutRef<"h2">, "as" | "children" | "className">;

type DisplayHeadingProps = DisplayHeadingLevelOneProps | DisplayHeadingLevelTwoProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
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
