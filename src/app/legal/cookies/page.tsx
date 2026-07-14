import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Cookies policy for the Tangison Studio website. This site does not use tracking or advertising cookies.",
  alternates: { canonical: "/legal/cookies" },
  openGraph: { title: "Cookies Policy | Studio", description: "Cookies policy for Tangison Studio.", url: "/legal/cookies", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const sections = [
  { heading: "Our approach", body: ["Tangison Studio does not use tracking, advertising, or third-party analytics cookies on this website. We do not profile visitors for advertising purposes."] },
  { heading: "Essential cookies", body: ["The site may use essential cookies where strictly necessary for functionality (for example, remembering that you have dismissed a notice). These cookies cannot be used to track you across sessions or sites."] },
  { heading: "Server logs", body: ["Our hosting provider (Vercel) logs standard request data, including IP address, browser type, and timestamps, for security and operational purposes. This is not a cookie and is not used to build a profile of your activity."] },
  { heading: "Contact form", body: ["Information you submit through the contact form is processed server-side and is not stored in a cookie. See our Privacy Policy for details."] },
  { heading: "Changes to this policy", body: ["If we ever introduce non-essential cookies, we will update this page and provide a clear consent mechanism before any such cookies are set."] },
  { heading: "Contact", body: ["Questions about cookies can be sent to studio@tangison.com."] },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Cookies Policy", url: "/legal/cookies" }]} />
      <WebPageJsonLd title="Cookies Policy" description="Cookies policy for Tangison Studio." url="/legal/cookies" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Legal</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-2">Cookies Policy</h1>
            <p className="font-satoshi text-sm text-ink-muted mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-display font-bold text-ink text-lg mb-3">{s.heading}</h2>
                  <div className="space-y-3">
                    {s.body.map((p, i) => (
                      <p key={i} className="font-satoshi text-sm leading-relaxed text-ink-muted">{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
