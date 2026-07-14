"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Studio — Unified Button Component
 *
 * ONE button system across the entire application.
 * Only three CTA variants allowed:
 *   1. primary  — Atlantic Black bg, Skeleton Bone text
 *   2. secondary — transparent, fine outline
 *   3. inverse  — Signal Teal or Skeleton Bone on dark sections
 *
 * All variants share:
 *   - border-radius: 9999px (fully rounded pill)
 *   - same height scale (min-h-[48px])
 *   - same horizontal padding (px-6)
 *   - same typography (font-satoshi, text-sm, font-medium)
 *   - same active press motion (scale 0.98)
 *   - optional arrow-island treatment
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
        secondary: "bg-transparent text-ink border border-ink/15 hover:border-ink/30",
        inverse: "bg-signal-teal-button text-signal-white hover:opacity-90",
      },
      size: {
        sm: "px-4 py-2 text-xs min-h-[40px]",
        md: "px-6 py-3 text-sm min-h-[48px]",
        lg: "px-8 py-4 text-base min-h-[56px]",
      },
      hasArrow: {
        true: "pr-4",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      hasArrow: false,
    },
  }
);

interface ButtonContentProps {
  children: React.ReactNode;
  hasArrow?: boolean;
  arrowType?: "right" | "up-right";
}

function ButtonContent({ children, hasArrow, arrowType = "right" }: ButtonContentProps) {
  return (
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
}

interface StudioButtonAsButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: "button";
  hasArrow?: boolean;
  arrowType?: "right" | "up-right";
}

interface StudioButtonAsLink
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  as: "link";
  href: string;
  hasArrow?: boolean;
  arrowType?: "right" | "up-right";
}

type StudioButtonProps = StudioButtonAsButton | StudioButtonAsLink;

export function StudioButton(props: StudioButtonProps) {
  const { variant, size, hasArrow, arrowType, children, className, ...rest } = props;
  const classes = `${buttonVariants({ variant, size, hasArrow })} group ${className || ""}`;

  if (props.as === "link") {
    const { href, ...linkRest } = rest as StudioButtonAsLink;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...linkRest}
        >
          <ButtonContent hasArrow={hasArrow} arrowType={arrowType}>
            {children}
          </ButtonContent>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        <ButtonContent hasArrow={hasArrow} arrowType={arrowType}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  const { type = "button" as const, disabled, as: _as, ...buttonProps } = rest as StudioButtonAsButton;
  void _as;
  return (
    <button type={type} disabled={disabled} className={classes} {...buttonProps}>
      <ButtonContent hasArrow={hasArrow} arrowType={arrowType}>
        {children}
      </ButtonContent>
    </button>
  );
}
