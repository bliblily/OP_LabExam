import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-sans",
  {
    variants: {
      variant: {
        default: "bg-gradient-button text-primary-foreground shadow-button hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-button hover:bg-destructive/90 hover:shadow-lg",
        outline: "border-2 border-border bg-card text-foreground shadow-soft hover:bg-gradient-subtle hover:border-primary/50 hover:shadow-button",
        secondary: "bg-card text-card-foreground border border-border shadow-soft hover:bg-gradient-card hover:shadow-button hover:scale-[1.01]",
        ghost: "text-foreground hover:bg-gradient-subtle hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-light",
        gradient: "bg-gradient-hero text-white shadow-elegant hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        accent: "bg-gradient-accent-button text-accent-foreground shadow-button hover:shadow-glow hover:scale-[1.02]",
        premium: "bg-gradient-to-r from-um-red via-um-red-light to-um-yellow text-white shadow-elegant hover:shadow-glow hover:scale-[1.02] font-medium",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base font-medium",
        xl: "h-14 rounded-lg px-10 text-lg font-medium",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
