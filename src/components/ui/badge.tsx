import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "rounded-base border border-zapier-sand bg-cream px-2.5 py-1 text-zapier-charcoal",
        accent: "rounded-base border border-[#b9b9f9] bg-[#f4f7ff] px-2.5 py-1 text-[#533afd]",
        label: "bg-transparent p-0 uppercase tracking-[0.12em] text-[#533afd]",
        muted: "bg-transparent p-0 uppercase tracking-[0.12em] text-zapier-gray",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} data-slot="badge" {...props} />;
}

export { Badge, badgeVariants };
