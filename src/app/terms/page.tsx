import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildPageMetadata, JsonLdScript, pageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms for using The Tangison Studio website, including what the free audit is and is not.",
  path: "/terms",
  ogTitle: "Terms of Service | The Tangison Studio",
});

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "The website",
    body: `This website is operated by ${site.legalName}, ${site.locationPrecise}, Namibia. By using the website you accept these terms.`,
  },
  {
    title: "Information, not advice",
    body: "Content on this website describes the studio and its work. It is provided for general information and does not constitute professional advice, a quotation, or a binding offer. Scope, timeline, and price are agreed in writing before any engagement begins.",
  },
  {
    title: "The free audit",
    body: "The website audit described on this site is genuinely free: no card, no deposit, and no trial that converts into a subscription. The studio audits a fixed number of sites each month because a person does the work, and may pause or close the offer when capacity is full. The audit report is an assessment, not a guarantee of results, and it belongs to the recipient whether or not they ever hire the studio.",
  },
  {
    title: "Intellectual property",
    body: "The Tangison Studio name, logo, and all original content on this website are the property of The Tangison Studio or the Tangison group. Client names, artwork, and case study material are presented with the standing permission of the clients behind them and are used to describe delivered work.",
  },
  {
    title: "No warranty",
    body: "The website and its content are provided as is, without warranties of any kind, express or implied, including availability, accuracy, or fitness for a particular purpose.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, The Tangison Studio is not liable for any loss or damage arising from the use of, or reliance on, this website or its free audit reports.",
  },
  {
    title: "Third parties",
    body: "Links to third-party websites, including tangison.com and client project sites, do not imply endorsement beyond describing delivered work.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the Republic of Namibia. The courts of Windhoek have jurisdiction.",
  },
  {
    title: "Changes",
    body: "We may update these terms from time to time. The date above reflects the current version.",
  },
];

export default function TermsPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <JsonLdScript
        data={pageJsonLd(
          "Terms of Service | The Tangison Studio",
          "Terms for using The Tangison Studio website, including what the free audit is and is not.",
          "/terms",
        )}
      />
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44 pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="h1">Terms of Service</h1>
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
