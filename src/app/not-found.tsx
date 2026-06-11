import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-skeleton-bone flex flex-col items-center justify-center px-6">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/brand/logo-dark.webp"
            alt="TANGISON STUDIO"
            width={874}
            height={286}
            className="h-10 w-auto object-contain mx-auto opacity-30"
          />
        </div>

        {/* Large 404 */}
        <h1 className="font-cabinet text-[8rem] sm:text-[10rem] md:text-[14rem] font-black text-ink/5 leading-none tracking-tighter">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 mb-10">
          <p className="font-satoshi text-ink-muted text-base sm:text-lg font-light max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Return link */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-8 py-4 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
        >
          Return home →
        </Link>
      </div>
    </div>
  );
}
