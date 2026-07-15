import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="pt-20 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="aspect-[16/9] overflow-hidden rounded-full bg-ocean-mist mb-8 max-w-md mx-auto">
            <Image src="/images/paintings/not-found-signal-v2.webp" alt="An oil painting of a foggy passage through weathered rocks, suggesting a lost path." width={800} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 400px" />
          </div>
          <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">404</p>
          <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Page not found.</h1>
          <p className="font-satoshi text-lg text-ink-muted mb-8 max-w-md mx-auto">The page you are looking for may have been moved, renamed, or is no longer available.</p>
          <StudioButton href="/" variant="primary" hasArrow arrowType="right">Back home</StudioButton>
        </div>
      </section>
    </SiteShell>
  );
}
