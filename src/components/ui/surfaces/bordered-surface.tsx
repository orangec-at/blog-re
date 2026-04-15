import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BorderedSurfaceBaseProps = {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "offwhite";
};

type BorderedSurfaceDivProps = BorderedSurfaceBaseProps & {
  as?: "div";
} & Omit<ComponentPropsWithoutRef<"div">, "as" | "children" | "className">;

type BorderedSurfaceSectionProps = BorderedSurfaceBaseProps & {
  as: "section";
} & Omit<ComponentPropsWithoutRef<"section">, "as" | "children" | "className">;

type BorderedSurfaceArticleProps = BorderedSurfaceBaseProps & {
  as: "article";
} & Omit<ComponentPropsWithoutRef<"article">, "as" | "children" | "className">;

type BorderedSurfaceProps =
  | BorderedSurfaceDivProps
  | BorderedSurfaceSectionProps
  | BorderedSurfaceArticleProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const toneClasses = {
  cream: "bg-cream",
  offwhite: "bg-offwhite",
} as const;

export function BorderedSurface(props: BorderedSurfaceProps) {
  const composedClassName = joinClasses(
    "rounded-lg border border-zapier-sand p-6",
    toneClasses[props.tone ?? "cream"],
    props.className,
  );

  if (props.as === "section") {
    const { as: _as, children, className: _className, tone: _tone, ...sectionProps } = props;
    void _as;
    void _className;
    void _tone;

    return (
      <section className={composedClassName} {...sectionProps}>
        {children}
      </section>
    );
  }

  if (props.as === "article") {
    const { as: _as, children, className: _className, tone: _tone, ...articleProps } = props;
    void _as;
    void _className;
    void _tone;

    return (
      <article className={composedClassName} {...articleProps}>
        {children}
      </article>
    );
  }

  const { as: _as, children, className: _className, tone: _tone, ...divProps } = props;
  void _as;
  void _className;
  void _tone;

  return (
    <div className={composedClassName} {...divProps}>
      {children}
    </div>
  );
}
