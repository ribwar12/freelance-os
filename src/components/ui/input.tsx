import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border-2 border-black bg-white px-3.5 py-2 text-xs md:text-sm font-semibold text-black placeholder:text-neutral-500 shadow-retro-sm transition-all focus:outline-none focus:ring-2 focus:ring-retro-yellow focus:shadow-retro disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
