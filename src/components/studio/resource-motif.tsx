import type { ResourceMotif } from "@/lib/resources";

/**
 * A small geometric mark, one per resource motif. This is the cheapest honest
 * way to give twenty pages twenty identities: the mark, the accent colour and
 * the header rule all key off the same motif, so no two resources read alike
 * even though they share one template.
 */
export function ResourceMotifMark({
  motif,
  color,
  size = 16,
}: {
  motif: ResourceMotif;
  color: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (motif) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="1" y="1" width="6" height="6" fill={color} opacity="0.9" />
          <rect x="9" y="1" width="6" height="6" fill={color} opacity="0.45" />
          <rect x="1" y="9" width="6" height="6" fill={color} opacity="0.45" />
          <rect x="9" y="9" width="6" height="6" fill={color} opacity="0.9" />
        </svg>
      );
    case "rule":
      return (
        <svg {...common}>
          <rect x="1" y="3" width="14" height="2" fill={color} opacity="0.9" />
          <rect x="1" y="7" width="10" height="2" fill={color} opacity="0.6" />
          <rect x="1" y="11" width="6" height="2" fill={color} opacity="0.35" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <rect x="2" y="10" width="12" height="3" fill={color} opacity="0.9" />
          <rect x="3.5" y="6" width="9" height="3" fill={color} opacity="0.6" />
          <rect x="5" y="2" width="6" height="3" fill={color} opacity="0.35" />
        </svg>
      );
    case "arc":
      return (
        <svg {...common}>
          <path d="M1 14 A 13 13 0 0 1 14 1" stroke={color} strokeWidth="2.2" opacity="0.9" />
          <path d="M5 14 A 9 9 0 0 1 14 5" stroke={color} strokeWidth="2.2" opacity="0.45" />
        </svg>
      );
    case "column":
      return (
        <svg {...common}>
          <rect x="1.5" y="2" width="3" height="12" fill={color} opacity="0.9" />
          <rect x="6.5" y="5" width="3" height="9" fill={color} opacity="0.6" />
          <rect x="11.5" y="8" width="3" height="6" fill={color} opacity="0.35" />
        </svg>
      );
    case "step":
    default:
      return (
        <svg {...common}>
          <rect x="1" y="11" width="4" height="4" fill={color} opacity="0.9" />
          <rect x="6" y="7" width="4" height="8" fill={color} opacity="0.6" />
          <rect x="11" y="3" width="4" height="12" fill={color} opacity="0.35" />
        </svg>
      );
  }
}

/**
 * A wide motif rule used under the detail-page hero. Same vocabulary as the
 * mark, drawn at banner scale so each resource opens differently.
 */
export function ResourceMotifRule({
  motif,
  color,
}: {
  motif: ResourceMotif;
  color: string;
}) {
  const common = {
    width: "100%",
    height: 8,
    viewBox: "0 0 400 8",
    preserveAspectRatio: "none" as const,
    fill: "none",
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (motif) {
    case "grid":
      return (
        <svg {...common}>
          {Array.from({ length: 40 }).map((_, i) => (
            <rect key={i} x={i * 10} y="0" width="5" height="8" fill={color} opacity={i % 2 ? 0.25 : 0.75} />
          ))}
        </svg>
      );
    case "rule":
      return (
        <svg {...common}>
          <rect x="0" y="1" width="400" height="2" fill={color} opacity="0.8" />
          <rect x="0" y="5" width="240" height="2" fill={color} opacity="0.35" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <rect x="0" y="0" width="400" height="2.5" fill={color} opacity="0.8" />
          <rect x="0" y="3" width="300" height="2.5" fill={color} opacity="0.5" />
          <rect x="0" y="6" width="180" height="2" fill={color} opacity="0.25" />
        </svg>
      );
    case "arc":
      return (
        <svg {...common}>
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d={`M${i * 25} 8 A 12.5 12.5 0 0 1 ${i * 25 + 25} 8`}
              stroke={color}
              strokeWidth="2"
              opacity={i % 2 ? 0.3 : 0.7}
            />
          ))}
        </svg>
      );
    case "column":
      return (
        <svg {...common}>
          {Array.from({ length: 25 }).map((_, i) => (
            <rect key={i} x={i * 16} y="0" width="3" height="8" fill={color} opacity={0.8 - (i % 5) * 0.13} />
          ))}
        </svg>
      );
    case "step":
    default:
      return (
        <svg {...common}>
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x={i * 20} y={(i % 4) * 2} width="14" height={8 - (i % 4) * 2} fill={color} opacity="0.6" />
          ))}
        </svg>
      );
  }
}
