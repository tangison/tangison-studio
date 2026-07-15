import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";
import { ContactForm } from "@/components/studio/contact-form";
import { SlidingGallery } from "@/components/studio/sliding-gallery";
import { socialLinks, googleBusinessProfile } from "@/config/social";
import { BreadcrumbJsonLd, LocalBusinessJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Studio. Tell us what you are working on. We reply to every serious enquiry within two working days.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Studio", description: "Start a project with Studio.", url: "/contact", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />
      <LocalBusinessJsonLd />
      <WebPageJsonLd title="Contact" description="Start a project with Studio." url="/contact" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Contact</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Have something worth building?</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">Tell us what you are working on. We reply to every serious enquiry within two working days.</p>
          </div>
        </section>
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="aspect-[16/9] overflow-hidden rounded-[25px] bg-ocean-mist">
              <Image src="/images/paintings/contact-invitation-v2.webp" alt="An oil painting of a doorway-like gap formed by two weathered rock walls with cold fog passing through." width={1080} height={608} className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 1080px" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
              <div className="space-y-6">
                <div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Email</p>
                  <a href="mailto:studio@tangison.com" className="inline-flex items-center gap-2 text-lg font-medium text-ink hover:text-signal-teal-text transition-colors">
                    <Mail className="w-5 h-5 text-signal-teal-text" /> studio@tangison.com
                  </a>
                </div>
                <div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Location</p>
                  <a href={googleBusinessProfile.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-ink hover:text-signal-teal-text transition-colors">
                    <MapPin className="w-5 h-5 text-signal-teal-text" /> Windhoek, Namibia
                  </a>
                </div>
                <div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Response time</p>
                  <p className="text-base text-ink-muted">Within two working days for all serious enquiries.</p>
                </div>
                <div className="pt-4 border-t border-card-border">
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Social</p>
                  <div className="flex gap-4">
                    {Object.entries(socialLinks).map(([platform, url]) => (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-muted hover:text-ink capitalize transition-colors">{platform}</a>
                    ))}
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
        {/* Windhoek atmosphere — sliding painting gallery */}
        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-signal-teal-text" />
              <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">Windhoek, Namibia</span>
            </div>
            <SlidingGallery
              images={[
                { src: "/images/paintings/contact-gallery-01.webp", alt: "Oil painting of a Namibian desert road at dawn with a signal mast" },
                { src: "/images/paintings/contact-gallery-02.webp", alt: "Oil painting of the Atlantic coastline with dark rocks and a teal signal light" },
                { src: "/images/paintings/contact-gallery-03.webp", alt: "Oil painting of a Windhoek cityscape at early morning" },
                { src: "/images/paintings/contact-invitation-v2.webp", alt: "Oil painting of a telephone receiver beside a handwritten note" },
                { src: "/images/paintings/collaboration-studio-v2.webp", alt: "Oil painting of hands collaborating over sketches" },
              ]}
              interval={5000}
            />
            <p className="mt-4 text-sm text-ink-muted text-center">
              Working from the edge of the Atlantic. Corner of Frans Indongo Street and John Meinert Street, Windhoek.
            </p>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
