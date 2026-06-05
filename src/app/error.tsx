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
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Title */}
        <h1 className="font-cabinet text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="font-satoshi text-ink-muted text-base sm:text-lg font-light leading-relaxed mb-10">
          An unexpected error occurred. Please try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="bg-ink text-warm-white px-8 py-4 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-ink-light transition-colors duration-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-ink/20 text-ink px-8 py-4 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-ink/5 transition-colors duration-300"
          >
            Return home
          </Link>
        </div>

        {/* Error digest — development only */}
        {error.digest && process.env.NODE_ENV === "development" && (
          <div className="mt-12 font-jetbrains text-[9px] text-ink-muted/40 uppercase tracking-wider">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
