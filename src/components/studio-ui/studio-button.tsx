"use client";

import React from "react";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cva } from "class-variance-authority";

/**
 * StudioButton — Tangison's unified button component.
 *
 * Wraps Astryx's accessible Button primitive with Studio's visual identity.
 * Only 3 variants: primary, secondary, inverse.
 * All share: border-radius 9999px, same height/padding/typography, active scale 0.98.
 *
 * Astryx owns: accessible interaction behavior, keyboard handling, focus management.
 * Studio owns: brand tokens, component variants, typography, shape, motion.
 */

const studioButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-satoshi font-medium text-sm",
    "transition-all duration-200",
    "active:scale-[0.98]",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-atlantic-black text-skeleton-bone hover:bg-deep-ocean",
        secondary: "bg-transparent text-ink border border-ink/15 hover:border-ink/30",
        inverse: "bg-signal-teal-button text-signal-white hover:opacity-90",
      },
      size: {
        sm: "px-4 py-2 text-xs min-h-[40px] rounded-full",
        md: "px-6 py-3 text-sm min-h-[48px] rounded-full",
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
  const classes = `${studioButtonVariants({ variant, size })} group ${className || ""}`;

  const content = (
    <>
      {children}
      {hasArrow && (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
          aria-disabled={disabled}
          {...ariaProps}
        >
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
