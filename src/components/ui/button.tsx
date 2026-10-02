import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs md:text-sm font-black transition-all border-2 border-black select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black active:translate-x-[2px] active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-retro-yellow text-black shadow-retro hover:shadow-retro-lg active:shadow-retro-sm",
        secondary: "bg-retro-mint text-black shadow-retro hover:shadow-retro-lg active:shadow-retro-sm",
        lavender: "bg-retro-lavender text-black shadow-retro hover:shadow-retro-lg active:shadow-retro-sm",
        outline: "bg-white text-black shadow-retro hover:shadow-retro-lg active:shadow-retro-sm",
        destructive: "bg-retro-coral text-black shadow-retro hover:shadow-retro-lg active:shadow-retro-sm",
        dark: "bg-black text-white shadow-retro hover:bg-neutral-900 active:shadow-retro-sm",
        ghost: "border-transparent hover:bg-neutral-200/60 shadow-none hover:shadow-none active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-base font-black",
        icon: "h-9 w-9 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
