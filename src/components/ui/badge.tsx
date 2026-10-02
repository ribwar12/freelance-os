import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border-2 border-black px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider select-none font-mono shadow-[2px_2px_0px_#000000]",
  {
    variants: {
      variant: {
        default: "bg-retro-yellow text-black",
        secondary: "bg-retro-lavender text-black",
        outline: "bg-white text-black",
        paid: "bg-retro-mint text-black",
        pending: "bg-retro-yellow text-black",
        overdue: "bg-retro-coral text-black",
        draft: "bg-retro-slate text-black",
        live: "bg-emerald-300 text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
