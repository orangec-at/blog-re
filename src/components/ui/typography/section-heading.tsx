import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionHeadingBaseProps = {
  children: ReactNode;
  className?: string;
};

type SectionHeadingLevelTwoProps = SectionHeadingBaseProps & {
  as?: "h2";
} & Omit<ComponentPropsWithoutRef<"h2">, "as" | "children" | "className">;

type SectionHeadingLevelThreeProps = SectionHeadingBaseProps & {
  as: "h3";
} & Omit<ComponentPropsWithoutRef<"h3">, "as" | "children" | "className">;

type SectionHeadingProps = SectionHeadingLevelTwoProps | SectionHeadingLevelThreeProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
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
