"use client";

import { useEffect } from "react";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SiteShell>
      <section className="pt-20 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Something went wrong.</h1>
          <p className="font-satoshi text-lg text-ink-muted mb-8 max-w-md mx-auto">
            An unexpected error occurred. You can try again or return to the home page.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[25px] bg-atlantic-black text-skeleton-bone font-satoshi font-medium text-sm min-h-[50px] transition-all active:scale-[0.98]"
            >
              Try again
            </button>
            <StudioButton href="/" variant="secondary" hasArrow arrowType="right">
              Return home
            </StudioButton>
          </div>
          {error.digest && process.env.NODE_ENV === "development" && (
            <p className="mt-8 font-jetbrains text-[9px] text-ink-muted uppercase tracking-wider">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
