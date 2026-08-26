import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PanelSurfaceTone = "default" | "muted" | "accent";

type PanelSurfaceBaseProps = {
  children: ReactNode;
  className?: string;
  tone?: PanelSurfaceTone;
};

type PanelSurfaceDivProps = PanelSurfaceBaseProps & {
  as?: "div";
} & Omit<ComponentPropsWithoutRef<"div">, "as" | "children" | "className">;

type PanelSurfaceSectionProps = PanelSurfaceBaseProps & {
  as: "section";
} & Omit<ComponentPropsWithoutRef<"section">, "as" | "children" | "className">;

type PanelSurfaceArticleProps = PanelSurfaceBaseProps & {
  as: "article";
} & Omit<ComponentPropsWithoutRef<"article">, "as" | "children" | "className">;

type PanelSurfaceProps = PanelSurfaceDivProps | PanelSurfaceSectionProps | PanelSurfaceArticleProps;

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const toneClasses: Record<PanelSurfaceTone, string> = {
  default: "border-rule bg-paper",
  muted: "border-rule bg-paper",
  accent: "border-rule bg-[#fff4ec]",
};

export function PanelSurface(props: PanelSurfaceProps) {
  const composedClassName = joinClasses(
    "rounded-3xl border p-6 sm:p-8",
    toneClasses[props.tone ?? "default"],
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
