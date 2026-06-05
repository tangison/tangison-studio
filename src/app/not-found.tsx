import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Large 404 */}
        <h1 className="font-cabinet text-[8rem] sm:text-[10rem] md:text-[14rem] font-black text-ink/10 leading-none tracking-tighter">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 mb-10">
          <p className="font-satoshi text-ink-muted text-base sm:text-lg font-light max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Return link */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-ink text-warm-white px-8 py-4 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-ink-light transition-colors duration-300 group"
        >
          Return home
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 12L12 4M12 4H6M12 4V10" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
