"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Tangison Studio — Logo Component
 *
 * A single, reusable Logo component that replaces 5+ inline <Image> calls.
 * Supports dark/light variants and multiple sizes.
 *
 * Brand rules (from /brand page):
 * - Do not use the mark without the wordmark
 * - Minimum size: 80px wide for digital
 * - Clear space: equal to the height of the "T" on all sides
 * - Dark variant on light backgrounds, light variant on dark backgrounds
 *
 * @param variant - "dark" for light backgrounds, "light" for dark backgrounds
 * @param size - Preset sizes: "sm" (100px), "md" (140px), "lg" (200px)
 * @param href - Link destination (defaults to "/")
 * @param className - Additional CSS classes
 */

type LogoVariant = "dark" | "light";
type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  href?: string;
  className?: string;
  priority?: boolean;
}

const SIZE_MAP: Record<LogoSize, number> = {
  sm: 100,
  md: 140,
  lg: 200,
};

export function Logo({
  variant = "dark",
  size = "md",
  href = "/",
  className = "",
  priority = false,
}: LogoProps) {
  const width = SIZE_MAP[size];
  const height = Math.round(width * (286 / 874)); // Maintain aspect ratio (874×286)
  const src = variant === "dark" ? "/brand/logo-dark.webp" : "/brand/logo-light.webp";
  const alt = "TANGISON STUDIO";

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`select-none ${className}`}
      draggable={false}
    />
  );

  return (
    <Link href={href} aria-label="Tangison Studio — Home" className="inline-block">
      {img}
    </Link>
  );
}
