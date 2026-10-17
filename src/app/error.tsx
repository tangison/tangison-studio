"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Branded 500 fallback (webmaster checklist: /500 must exist as a branded
 * error screen with recovery navigation). error.tsx catches render and
 * server errors at the route-segment level; global-error.tsx below it
 * covers the root layout itself. Both keep the studio voice and both
 * offer a way back instead of a raw stack trace.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the digest for support conversations without leaking internals.
    console.error("Studio route error:", error.digest ?? "unknown");
  }, [error]);

  return (
    <div className="theme-ink bg-paper text-ink min-h-[80vh]">
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44 pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          500
        </p>
        <h1 className="h1 max-w-3xl mt-4">
          Something broke on our side.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-muted leading-relaxed">
          The page exists but refused to render this time. Trying again
          usually clears it. If it keeps happening, tell the studio and we
          will fix the underlying fault, not just the symptom.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try this page again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to the studio home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact the studio
          </Link>
        </div>
      </section>
    </div>
  );
}
