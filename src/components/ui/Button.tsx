"use client";

import { motion } from "framer-motion";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#8E4897] hover:bg-[#5C2F65] text-white shadow-lg shadow-purple-glow hover:shadow-xl",
      ghost:
        "bg-transparent border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
      outline:
        "bg-transparent border border-[#8E4897] text-[#8E4897] hover:bg-[#8E4897] hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
