import Image from "next/image";

/**
 * StudioLogo — the primary brand lockup.
 *
 *   [perfect circular icon] Studio
 *
 * The icon container is a mathematically perfect circle:
 *   border-radius: 50%
 *   aspect-ratio: 1 / 1
 *   flex-shrink: 0
 *
 * The icon asset is the OFFICIAL icon from the repository at
 * /public/brand/favicon.webp (499×499). It is NOT redrawn or approximated.
 */

export type LogoVariant = "navy" | "teal" | "black" | "mist";

const variantStyles: Record<LogoVariant, { bg: string }> = {
  navy: { bg: "#153E52" },
  teal: { bg: "#2CB5B4" },
  black: { bg: "#111315" },
  mist: { bg: "#E6F2F1" },
};

interface StudioLogoProps {
  variant?: LogoVariant;
  size?: number;
  showWordmark?: boolean;
  className?: string;
  /** Wordmark text color — defaults to ink (#111315). Use "light" for dark backgrounds. */
  wordmarkColor?: "ink" | "light";
}

export function StudioLogo({
  variant = "navy",
  size = 36,
  showWordmark = true,
  className,
  wordmarkColor = "ink",
}: StudioLogoProps) {
  const { bg } = variantStyles[variant];
  const textColor = wordmarkColor === "light" ? "#E6F2F1" : "#111315";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className || ""}`}
      style={{ lineHeight: 0 }}
    >
      <span
        className="circle-container"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: bg,
          padding: `${size * 0.18}px`,
        }}
        aria-hidden="true"
      >
        <Image
          src="/brand/favicon.webp"
          alt=""
          width={size}
          height={size}
          className="w-full h-full object-contain"
          priority
        />
      </span>
      {showWordmark && (
        <span
          className="font-display font-bold"
          style={{
            fontSize: `${size * 0.5}px`,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: textColor,
            // Explicit background helps axe-core calculate contrast correctly
            // (prevents false positive when text is adjacent to the colored circle)
            background: "transparent",
          }}
        >
          Studio
        </span>
      )}
    </span>
  );
}
