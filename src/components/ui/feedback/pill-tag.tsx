import type { HTMLAttributes, ReactNode } from "react";

import { Chip } from "@/components/ui/chip";

type PillTagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function PillTag({ children, className, ...props }: PillTagProps) {
  return (
    <Chip className={className} {...props}>
      {children}
    </Chip>
  );
}
