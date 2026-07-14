import React from "react";
import { SiteShell } from "@/components/tangison/site-shell";

/**
 * EditorialPageShell — shared layout for all interior pages.
 * Wraps SiteShell with consistent editorial spacing and max-width.
 */

interface EditorialPageShellProps {
  children: React.ReactNode;
  /** Dark theme for cinematic pages (work index, process, contact) */
  dark?: boolean;
  /** Max width: "editorial" (800px) or "wide" (1080px) */
  width?: "editorial" | "wide";
}

export function EditorialPageShell({
  children,
  dark = false,
  width = "editorial",
}: EditorialPageShellProps) {
  return (
    <SiteShell>
      <div className={dark ? "bg-atlantic-black text-skeleton-bone" : ""}>
        <div
          className={`mx-auto px-6 ${
            width === "wide" ? "max-w-6xl" : "max-w-4xl"
          }`}
        >
          {children}
        </div>
      </div>
    </SiteShell>
  );
}
