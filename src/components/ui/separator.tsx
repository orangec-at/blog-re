import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  decorative = true,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-orientation={orientation}
      className={cn(orientation === "horizontal" ? "h-px w-full" : "h-full w-px", "shrink-0 bg-zapier-sand", className)}
      data-orientation={orientation}
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      {...props}
    />
  );
}

export { Separator };
