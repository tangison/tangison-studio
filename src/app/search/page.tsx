import type { Metadata } from "next";
import { SearchClient } from "./search-client";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Search — Articles, Cases, and Pages",
  description:
    "Search everything on The Tangison Studio: 47 research-backed articles on AI adoption in Namibia, 18 case studies, and every page of the studio.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <section className="mx-auto w-full max-w-[900px] px-6 md:px-12 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-2xl">
          <Reveal>
            <h1 className="h1">Find it here.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              Every article, case study, and page on the site, searchable in
              one place.
            </p>
          </Reveal>
        </div>
        <div className="mt-10">
          <Reveal delay={180}>
            <SearchClient />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
