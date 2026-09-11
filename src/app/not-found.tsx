import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44 pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          404
        </p>
        <h1 className="h1 max-w-3xl mt-4">This page does not exist.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-muted leading-relaxed">
          The address may be mistyped, or the page moved when the studio site
          was rebuilt. Everything current is one click away: the case studies,
          the services, the insights, and the contact form all still work.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to the studio home
          </Link>
          <Link href="/cases" className="btn btn-outline">
            See the case studies
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact the studio
          </Link>
        </div>
      </section>
    </div>
  );
}
