import Image from "next/image";

/**
 * StudioLogo — minimal Collins-style lockup.
 *
 *   [transparent icon] Studio
 *
 * The official icon asset (/brand/favicon.webp, 499×499) already has a
 * transparent background. No artificial circle, square, or container
 * is added. The icon sits directly on the page background.
 */

interface StudioLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  /** Wordmark text color — defaults to ink (#111315). Use "light" for dark backgrounds. */
  wordmarkColor?: "ink" | "light";
}

export function StudioLogo({
  size = 32,
  showWordmark = true,
  className,
  wordmarkColor = "ink",
}: StudioLogoProps) {
  const textColor = wordmarkColor === "light" ? "#E6F2F1" : "#111315";

  return (
    <span
      className={`inline-flex items-center gap-2 ${className || ""}`}
      style={{ lineHeight: 0 }}
    >
      <Image
        src="/brand/favicon.webp"
        alt="Studio logo"
        width={size}
        height={size}
        className="shrink-0"
        style={{ width: `${size}px`, height: `${size}px` }}
        priority
      />
      {showWordmark && (
        <span
          className="font-display font-bold"
          style={{
            fontSize: `${size * 0.56}px`,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: textColor,
          }}
        >
          Studio
        </span>
      )}
    </span>
  );
}
