"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * StudioButton — ONE unified button system.
 * border:0, no outlines, no static borders.
 * Keyboard-only focus-visible halo remains.
 * 3 variants: primary (filled black), secondary (filled tonal), inverse (filled bone).
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-satoshi font-medium text-sm",
    "transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-teal",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-atlantic-black text-skeleton-bone hover:bg-deep-ocean",
        secondary: "bg-ocean-mist text-ink hover:bg-fog-gray",
        inverse: "bg-skeleton-bone text-atlantic-black hover:bg-ocean-mist",
      },
      size: {
        sm: "px-4 py-2 text-xs min-h-[42px] rounded-full",
        md: "px-6 py-3 text-sm min-h-[50px] rounded-full",
        lg: "px-8 py-4 text-base min-h-[56px] rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface StudioButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  size?: "sm" | "md" | "lg";
  hasArrow?: boolean;
  arrowType?: "right" | "up-right";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  "aria-label"?: string;
}

export function StudioButton({
  children,
  variant = "primary",
  size = "md",
  hasArrow = false,
  arrowType = "right",
  href,
  onClick,
  disabled,
  type = "button",
  className,
  ...ariaProps
}: StudioButtonProps) {
  const classes = `${buttonVariants({ variant, size })} group ${className || ""}`;

  const content = (
    <>
      {children}
      {hasArrow && (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/15 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          {arrowType === "up-right" ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5" />
          )}
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} aria-disabled={disabled} {...ariaProps}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} aria-disabled={disabled} {...ariaProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick} {...ariaProps}>
      {content}
    </button>
  );
}
