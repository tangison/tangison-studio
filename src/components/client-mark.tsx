import Image from "next/image";
import { CLIENTS } from "@/lib/clients";

/**
 * Client marks for the trust layer: the same logos the Technologies
 * site ships, keyed by project slug so the featured cases' clients
 * can be shown as real marks instead of plain text names.
 *
 * Marks sit quiet in grayscale and come to full colour as the pointer
 * or keyboard focus reaches them; every one links to the client's own
 * live site (2026-10-18 instruction: the marks go to their sites,
 * never to studio artefacts).
 */

export const CLIENT_BY_SLUG = new Map(CLIENTS.map((c) => [c.slug, c]));

export function ClientMarkLogo({
  mark,
  className = "",
}: {
  mark: (typeof CLIENTS)[number];
  className?: string;
}) {
  return (
    <Image
      src={mark.logo}
      alt={`${mark.name} logo`}
      width={mark.width}
      height={mark.height}
      decoding="async"
      className={`client-logo-mark h-6 w-auto md:h-7 ${className}`}
    />
  );
}
