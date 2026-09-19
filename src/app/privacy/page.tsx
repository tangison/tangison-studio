import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildPageMetadata, JsonLdScript, pageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "What The Tangison Studio website collects through its contact and audit forms, how the data is used, and the rights you have over it.",
  path: "/privacy",
  ogTitle: "Privacy Policy | The Tangison Studio",
});

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Who we are",
    body: `${site.legalName}, an independent design and technology studio in ${site.locationPrecise}, operates this website. You can reach us at ${site.email}, by phone at ${site.phone}, or through the contact page.`,
  },
  {
    title: "What the forms collect",
    body: "The contact form collects your name, your email address, and the details you choose to share about your project, which may include a timeline and a budget range. The free audit request form collects your name, your email address, and the website address you want audited. That is all we ask for, and it is all we need to reply.",
  },
  {
    title: "How the data is used",
    body: "Form submissions are used for one purpose: to reply to your enquiry, and, for audit requests, to prepare and deliver your report. We do not sell, rent, or trade personal data. We do not add you to a mailing list, and there is no newsletter to unsubscribe from. If you never hire us, your enquiry is not kept as a marketing asset.",
  },
  {
    title: "Email delivery",
    body: "Messages from these forms are delivered to the studio inbox by a transactional email provider. The provider processes the message to deliver it, and does not use it for its own purposes.",
  },
  {
    title: "No tracking, no analytics",
    body: "This website does not run advertising, does not set tracking cookies, and does not use analytics that identify individual visitors. There are no accounts, no logins, and no third-party scripts that profile you across other sites.",
  },
  {
    title: "Server logs",
    body: "As with all websites, standard server logs may record technical information such as IP address, browser type, and pages requested. This information is retained only as long as necessary for the operation, security, and legal compliance of the site.",
  },
  {
    title: "Your rights",
    body: `Under the Namibian Protection of Personal Information Act 4 of 2021, you may request access to the personal data we hold about you, ask for it to be corrected, or ask for it to be deleted. Write to ${site.email} and we will respond.`,
  },
  {
    title: "Client work on this site",
    body: "Case studies on this site describe delivered work and name the clients behind it with their standing permission. If you are a client and want a reference changed or removed, write to us and we will act on it.",
  },
  {
    title: "Third-party links",
    body: "Links to other websites, including tangison.com and client project sites, are subject to those sites' own privacy policies.",
  },
  {
    title: "Changes",
    body: "We may update this policy as the site changes. The date above reflects the current version.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <JsonLdScript
        data={pageJsonLd(
          "Privacy Policy | The Tangison Studio",
          "What The Tangison Studio website collects through its contact and audit forms, how the data is used, and the rights you have over it.",
          "/privacy",
        )}
      />
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44 pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="h1">Privacy Policy</h1>
          <p className="mt-4 text-ink-muted">Last updated: 20 September 2026</p>
        </div>
        <div className="mt-14 max-w-2xl border-t border-line">
          {SECTIONS.map((s, i) => (
            <div key={s.title} className="py-7 border-b border-line">
              <h2 className="h3">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
