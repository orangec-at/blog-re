import type { ReactNode } from "react";

import { PillTag } from "@/components/ui/feedback/pill-tag";
import { BorderedSurface } from "@/components/ui/surfaces/bordered-surface";

import { CardHeader } from "./card-header";

type FeatureCardProps = {
  body?: string;
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  tag?: string;
  title: string;
  tone?: "cream" | "offwhite";
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FeatureCard({
  body,
  children,
  className,
  eyebrow,
  tag,
  title,
  tone = "cream",
}: FeatureCardProps) {
  return (
    <BorderedSurface
      as="article"
      className={joinClasses("flex flex-col gap-4", className)}
      tone={tone}
    >
      {tag ? <PillTag>{tag}</PillTag> : null}
      <CardHeader body={body} eyebrow={eyebrow} title={title} />
      {children ? <div>{children}</div> : null}
    </BorderedSurface>
  );
}
