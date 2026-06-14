"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Tangison Studio — Button Component
 *
 * Replaces 6+ duplicated button class patterns across the site with
 * a single, variant-driven component built on CVA.
 *
 * Brand system reference:
 * - Primary: Signal Teal bg, Skeleton Bone text
 * - Secondary: Atlantic Black bg, Skeleton Bone text
 * - Ghost: Transparent bg, ink text, visible border
 * - Outline: Signal Teal text, Signal Teal border
 *
 * All buttons use 8px border-radius (per Studio design language v2.0).
 * Minimum touch target: 44px height on mobile.
 */

const buttonVariants = cva(
  // Base classes — applied to ALL variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-satoshi font-medium text-sm tracking-[0.02em]",
    "transition-all duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-teal",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-signal-teal text-skeleton-bone",
          "hover:bg-signal-teal-light hover:shadow-[0_4px_20px_rgba(44,181,180,0.25)]",
          "active:scale-[0.98]",
        ].join(" "),
        secondary: [
          "bg-atlantic-black text-skeleton-bone",
          "hover:bg-steel-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
          "active:scale-[0.98]",
        ].join(" "),
        ghost: [
          "bg-transparent text-ink border border-ink/10",
          "hover:bg-skeleton-bone hover:border-ink/20",
          "active:scale-[0.98]",
        ].join(" "),
        outline: [
          "bg-transparent text-signal-teal border border-signal-teal/30",
          "hover:bg-signal-teal-muted hover:border-signal-teal/50",
          "active:scale-[0.98]",
        ].join(" "),
      },
      size: {
        sm: "px-4 py-2 text-xs min-h-[36px]",
        md: "px-6 py-3 text-sm min-h-[44px]",
        lg: "px-8 py-4 text-base min-h-[52px]",
      },
      showArrow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        showArrow: true,
        className: "pr-4",
      },
      {
        variant: "secondary",
        showArrow: true,
        className: "pr-4",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      showArrow: false,
    },
  }
);

interface StudioButtonBaseProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

interface StudioButtonAsButton extends StudioButtonBaseProps {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface StudioButtonAsLink extends StudioButtonBaseProps {
  href: string;
  external?: boolean;
}

type StudioButtonProps = StudioButtonAsButton | StudioButtonAsLink;

export function StudioButton({
  children,
  className = "",
  variant,
  size,
  showArrow,
  ...props
}: StudioButtonProps) {
  const arrow = showArrow ? (
    <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
  ) : null;

  const classes = `${buttonVariants({ variant, size, showArrow })} group ${className}`;

  // Render as <Link> if href is provided
  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  // Render as <button>
  const { onClick, type = "button", disabled } = props as StudioButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
      {arrow}
    </button>
  );
}
