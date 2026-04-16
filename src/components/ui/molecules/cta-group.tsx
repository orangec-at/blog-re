import type { AnchorHTMLAttributes } from "react";

import { PrimaryButton } from "@/components/ui/actions/primary-button";
import { SecondaryButton } from "@/components/ui/actions/secondary-button";
import { TextLink } from "@/components/ui/actions/text-link";

type CTAAction = {
  href: string;
  label: string;
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

type CTAGroupProps = {
  className?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  secondaryVariant?: "button" | "text-link";
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getSafeRel(action: CTAAction) {
  if (action.target !== "_blank") {
    return action.rel;
  }

  const relTokens = new Set(action.rel?.split(/\s+/).filter(Boolean));

  relTokens.add("noopener");
  relTokens.add("noreferrer");

  return Array.from(relTokens).join(" ");
}

function sharedLinkProps(action: CTAAction) {
  return {
    href: action.href,
    rel: getSafeRel(action),
    target: action.target,
  };
}

export function CTAGroup({
  className,
  primaryAction,
  secondaryAction,
  secondaryVariant = "button",
}: CTAGroupProps) {
  return (
    <div className={joinClasses("flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center", className)}>
      <PrimaryButton {...sharedLinkProps(primaryAction)}>
        {primaryAction.label}
      </PrimaryButton>
      {secondaryAction ? (
        secondaryVariant === "text-link" ? (
          <TextLink {...sharedLinkProps(secondaryAction)}>{secondaryAction.label}</TextLink>
        ) : (
          <SecondaryButton {...sharedLinkProps(secondaryAction)}>{secondaryAction.label}</SecondaryButton>
        )
      ) : null}
    </div>
  );
}
