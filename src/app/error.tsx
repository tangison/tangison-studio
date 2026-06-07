"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-skeleton-bone flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="font-cabinet text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="font-satoshi text-ink-muted text-base sm:text-lg font-light leading-relaxed mb-10">
          An unexpected error occurred. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="bg-signal-teal text-signal-white px-8 py-4 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-signal-teal text-signal-teal px-8 py-4 font-cabinet font-bold text-sm tracking-tight hover:bg-ocean-mist transition-all duration-300"
          >
            Return home
          </Link>
        </div>

        {error.digest && process.env.NODE_ENV === "development" && (
          <div className="mt-12 font-jetbrains text-[9px] text-ink-muted/40 uppercase tracking-wider">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
