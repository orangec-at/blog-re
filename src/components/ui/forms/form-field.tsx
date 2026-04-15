import type { ReactNode } from "react";

import { BodyText } from "@/components/ui/typography/body-text";

type FormFieldProps = {
  children: ReactNode;
  className?: string;
  error?: ReactNode;
  htmlFor: string;
  label: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FormField({ children, className, error, htmlFor, label }: FormFieldProps) {
  return (
    <div className={joinClasses("flex flex-col gap-2", className)}>
      <label className="font-sans text-sm font-semibold text-zapier-black" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <BodyText className="text-sm text-[#b45309] sm:text-sm" role="alert">
          {error}
        </BodyText>
      ) : null}
    </div>
  );
}
