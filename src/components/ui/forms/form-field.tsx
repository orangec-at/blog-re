import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import { BodyText } from "@/components/ui/typography/body-text";

type FormFieldControlProps = {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

type FormFieldProps = {
  children: ReactElement<FormFieldControlProps>;
  className?: string;
  error?: ReactNode;
  htmlFor: string;
  label: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function joinAttributeValues(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ") || undefined;
}

export function FormField({ children, className, error, htmlFor, label }: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const control = isValidElement<FormFieldControlProps>(children)
    ? cloneElement(children, {
        "aria-describedby": joinAttributeValues(children.props["aria-describedby"], errorId),
        "aria-invalid": error ? true : children.props["aria-invalid"],
      })
    : children;

  return (
    <div className={joinClasses("flex flex-col gap-2", className)}>
      <label className="font-sans text-sm font-semibold text-zapier-black" htmlFor={htmlFor}>
        {label}
      </label>
      {control}
      {error ? (
        <BodyText className="text-sm text-[#b45309] sm:text-sm" id={errorId} role="alert">
          {error}
        </BodyText>
      ) : null}
    </div>
  );
}
