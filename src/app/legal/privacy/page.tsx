import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Tangison Studio. How we handle information collected through this website.",
  alternates: { canonical: "/legal/privacy" },
  openGraph: { title: "Privacy Policy | Studio", description: "Privacy policy for Tangison Studio.", url: "/legal/privacy", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const sections = [
  { heading: "Who we are", body: ["Tangison Studio (\"Studio\", \"we\", \"us\") is a digital product practice based in Windhoek, Namibia, operating as part of Tangison Technologies. This website is available at studio.tangison.com.", "If you have questions about this policy, contact us at studio@tangison.com."] },
  { heading: "What we collect", body: ["We collect two categories of information:", "Information you provide: when you submit the contact form, we receive your name, email address, organization (if provided), budget range (if selected), and your message.", "Technical information: when you visit the site, our hosting provider may log standard request data (IP address, browser type, pages visited, timestamps) for security and operational purposes."] },
  { heading: "How we use your information", body: ["We use the information you provide through the contact form to reply to your enquiry, assess whether we are a good fit for the work you described, and keep a record of the conversation if we begin a project.", "We do not sell, rent, or share your information with third parties for marketing purposes."] },
  { heading: "Cookies", body: ["This website does not use tracking or advertising cookies. We may use essential cookies for site functionality. See our Cookies Policy for details."] },
  { heading: "Third-party services", body: ["The site is hosted on Vercel. If you submit the contact form, the data is processed on our server before being delivered to our email. We do not embed third-party analytics, advertising, or tracking scripts on this site."] },
  { heading: "Data retention", body: ["We retain contact form submissions for as long as is necessary to respond to your enquiry and, if a project results, for the duration of our working relationship. You may request deletion of your data at any time by emailing studio@tangison.com."] },
  { heading: "Your rights", body: ["You have the right to request access to, correction of, or deletion of your personal data. To exercise any of these rights, contact us at studio@tangison.com."] },
  { heading: "Changes to this policy", body: ["We may update this policy from time to time. The updated version will be posted on this page with a revised last-updated date."] },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/legal/privacy" }]} />
      <WebPageJsonLd title="Privacy Policy" description="Privacy policy for Tangison Studio." url="/legal/privacy" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Legal</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-2">Privacy Policy</h1>
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
