"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ButtonConnectProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode | boolean;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "ghost";
  target?: string;
  rel?: string;
  download?: boolean;
}

const ArrowIcon = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path
      d="M10.75 8.75L14.25 12L10.75 15.25"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export function ButtonConnect({
  children,
  href,
  onClick,
  icon = true,
  disabled = false,
  className,
  variant = "default",
  target,
  rel,
  download = false,
}: ButtonConnectProps) {
  const isGhost = variant === "ghost";

  const baseClassName = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer select-none overflow-hidden font-mono",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    isGhost
      ? "text-foreground border border-border/80 hover:border-primary/40 hover:bg-primary/5"
      : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 btn-glow",
    className
  );

  const content = (
    <>
      {/* Shimmer overlay for default variant */}
      {!isGhost && (
        <span
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out]" />
        </span>
      )}
      <span className="relative flex items-center gap-2">
        <span>{children}</span>
        {icon && (
          <span className="flex items-center">
            {typeof icon === "boolean" ? <ArrowIcon /> : icon}
          </span>
        )}
      </span>
    </>
  );

  if (href && !disabled) {
    if (download) {
      return (
        <motion.a
          href={href}
          download
          className={baseClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <Link href={href} className={baseClassName} target={target} rel={rel}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      className={baseClassName}
      onClick={onClick}
      disabled={disabled}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
