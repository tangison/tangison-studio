"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

interface Document {
  id: string;
  title: string;
  filename: string;
  description: string;
  category: string;
  num: string;
}

const strategicFrameworks: Document[] = [
  {
    id: "01",
    num: "01",
    title: "The AI Blueprint for Namibian Business",
    filename: "Tangison_01_The_AI_Blueprint_for_Namibian_Business_v2.0.pdf",
    description: "A foundational guide for Namibian organizations looking to adopt AI. Covers strategy, readiness assessment, and practical first steps for business leaders.",
    category: "Strategy",
  },
  {
    id: "02",
    num: "02",
    title: "The AI Maturity Framework",
    filename: "Tangison_02_The_AI_Maturity_Framework_v2.0.pdf",
    description: "A structured framework to assess where your organization stands on the AI maturity curve and how to advance to the next level systematically.",
    category: "Strategy",
  },
  {
    id: "03",
    num: "03",
    title: "The AI ROI Playbook",
    filename: "Tangison_03_The_AI_ROI_Playbook_v2.0.pdf",
    description: "Practical methods for measuring and maximizing return on AI investments. Includes budgeting templates and outcome tracking frameworks.",
    category: "Strategy",
  },
  {
    id: "04",
    num: "04",
    title: "The AI Ethics and Governance Guide",
    filename: "Tangison_04_The_AI_Ethics_and_Governance_Guide_v2.0.pdf",
    description: "Guidelines for responsible AI deployment. Covers bias mitigation, data privacy, transparency requirements, and governance structures for African contexts.",
    category: "Governance",
  },
  {
    id: "05",
    num: "05",
    title: "The AI Talent and Skills Roadmap",
    filename: "Tangison_05_The_AI_Talent_and_Skills_Roadmap_v2.0.pdf",
    description: "A roadmap for building AI capabilities within your team. Identifies key roles, training paths, and skill development strategies for African organizations.",
    category: "Talent",
  },
  {
    id: "06",
    num: "06",
    title: "The AI Vendor and Tool Landscape",
    filename: "Tangison_06_The_AI_Vendor_and_Tool_Landscape_v2.0.pdf",
    description: "An overview of the AI vendor ecosystem and tool landscape relevant to African businesses. Helps organizations evaluate and select the right technology partners.",
    category: "Strategy",
  },
];

const industryGuides: Document[] = [
  {
    id: "07",
    num: "07",
    title: "AI for Agriculture",
    filename: "Tangison_07_AI_for_Agriculture_v2.0.pdf",
    description: "How AI transforms farming and agribusiness in Africa. Precision agriculture, crop monitoring, supply chain optimization, and market access solutions.",
    category: "Industry",
  },
  {
    id: "08",
    num: "08",
    title: "AI for Mining",
    filename: "Tangison_08_AI_for_Mining_v2.0.pdf",
    description: "AI applications in mineral exploration, safety monitoring, and operational efficiency for the African mining sector.",
    category: "Industry",
  },
  {
    id: "09",
    num: "09",
    title: "AI for Tourism",
    filename: "Tangison_09_AI_for_Tourism_v2.0.pdf",
    description: "Leveraging AI to enhance visitor experiences, optimize pricing, and grow Namibia's tourism industry with data-driven insights.",
    category: "Industry",
  },
  {
    id: "10",
    num: "10",
    title: "AI for Fishing and Marine",
    filename: "Tangison_10_AI_for_Fishing_and_Marine_v2.0.pdf",
    description: "AI solutions for sustainable fishing, marine resource management, and coastal industry optimization along Africa's coastlines.",
    category: "Industry",
  },
  {
    id: "11",
    num: "11",
    title: "AI for Banking and Finance",
    filename: "Tangison_11_AI_for_Banking_and_Finance_v2.0.pdf",
    description: "AI-driven risk assessment, fraud detection, and financial inclusion strategies for African banking and financial services.",
    category: "Industry",
  },
  {
    id: "12",
    num: "12",
    title: "AI for Retail and Commerce",
    filename: "Tangison_12_AI_for_Retail_and_Commerce_v2.0.pdf",
    description: "Inventory optimization, customer analytics, and demand forecasting for retail businesses operating in African markets.",
    category: "Industry",
  },
  {
    id: "13",
    num: "13",
    title: "AI for Healthcare",
    filename: "Tangison_13_AI_for_Healthcare_v2.0.pdf",
    description: "AI applications in diagnostics, patient management, and healthcare delivery for resource-constrained African health systems.",
    category: "Industry",
  },
  {
    id: "14",
    num: "14",
    title: "AI for Education",
    filename: "Tangison_14_AI_for_Education_v2.0.pdf",
    description: "Adaptive learning, administrative automation, and skills development through AI for African educational institutions.",
    category: "Industry",
  },
  {
    id: "15",
    num: "15",
    title: "AI for Construction and Real Estate",
    filename: "Tangison_15_AI_for_Construction_and_Real_Estate_v2.0.pdf",
    description: "Project management, safety monitoring, and market analysis using AI in African construction and property development.",
    category: "Industry",
  },
  {
    id: "16",
    num: "16",
    title: "AI for Logistics and Transport",
    filename: "Tangison_16_AI_for_Logistics_and_Transport_v2.0.pdf",
    description: "Route optimization, fleet management, and supply chain visibility through AI for African logistics networks.",
    category: "Industry",
  },
  {
    id: "17",
    num: "17",
    title: "AI for Energy and Utilities",
    filename: "Tangison_17_AI_for_Energy_and_Utilities_v2.0.pdf",
    description: "Grid optimization, predictive maintenance, and energy access solutions powered by AI for African energy infrastructure.",
    category: "Industry",
  },
  {
    id: "18",
    num: "18",
    title: "AI for Media and Creative",
    filename: "Tangison_18_AI_for_Media_and_Creative_v2.0.pdf",
    description: "Content creation, audience analytics, and production workflow automation for Africa's growing media and creative industries.",
    category: "Industry",
  },
  {
    id: "19",
    num: "19",
    title: "AI for Legal Services",
    filename: "Tangison_19_AI_for_Legal_Services_v2.0.pdf",
    description: "Document analysis, compliance automation, and legal research assistance through AI for African legal practitioners.",
    category: "Industry",
  },
  {
    id: "20",
    num: "20",
    title: "AI for Insurance",
    filename: "Tangison_20_AI_for_Insurance_v2.0.pdf",
    description: "Underwriting automation, claims processing, and risk modeling using AI for insurance providers in African markets.",
    category: "Industry",
  },
  {
    id: "21",
    num: "21",
    title: "AI for Manufacturing",
    filename: "Tangison_21_AI_for_Manufacturing_v2.0.pdf",
    description: "Quality control, predictive maintenance, and production optimization through AI for African manufacturing operations.",
    category: "Industry",
  },
  {
    id: "22",
    num: "22",
    title: "AI for Telecom",
    filename: "Tangison_22_AI_for_Telecom_v2.0.pdf",
    description: "Network optimization, customer experience management, and infrastructure planning with AI for African telecommunications.",
    category: "Industry",
  },
  {
    id: "23",
    num: "23",
    title: "AI for Government and Public Services",
    filename: "Tangison_23_AI_for_Government_and_Public_Services_v2.0.pdf",
    description: "Public service delivery, data-driven governance, and administrative efficiency through AI for African government institutions.",
    category: "Industry",
  },
  {
    id: "24",
    num: "24",
    title: "AI for NGOs and Development",
    filename: "Tangison_24_AI_for_NGOs_and_Development_v2.0.pdf",
    description: "Impact measurement, program optimization, and resource allocation using AI for non-governmental organizations across Africa.",
    category: "Industry",
  },
  {
    id: "25",
    num: "25",
    title: "AI for Sports and Entertainment",
    filename: "Tangison_25_AI_for_Sports_and_Entertainment_v2.0.pdf",
    description: "Performance analytics, fan engagement, and event management powered by AI for Africa's sports and entertainment sectors.",
    category: "Industry",
  },
  {
    id: "26",
    num: "26",
    title: "AI for Hospitality",
    filename: "Tangison_26_AI_for_Hospitality_v2.0.pdf",
    description: "Guest experience personalization, revenue management, and operational efficiency through AI for African hospitality businesses.",
    category: "Industry",
  },
];

function DocumentCard({ doc, index }: { doc: Document; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-black/[0.06] bg-signal-white p-6 md:p-8 flex flex-col hover:border-black/[0.1] transition-all duration-500"
    >
      {/* Document number + category */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em]">
          {doc.num}
        </span>
        <span className="font-jetbrains text-[9px] text-ink-muted/50 uppercase tracking-[0.15em]">
          {doc.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-3 group-hover:text-signal-teal transition-colors duration-300">
        {doc.title}
      </h3>

      {/* Description */}
      <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-6 flex-1">
        {doc.description}
      </p>

      {/* Download link */}
      <div className="pt-4 border-t border-black/[0.04]">
        <a
          href={`/documents/${doc.filename}`}
          download
          className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-signal-teal transition-colors duration-300"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      </div>
    </motion.div>
  );
}

export function ResourcesPage() {
  return (
    <SiteShell>
      {/* Section 1: Page Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20" aria-label="Resources header">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-signal-teal transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Insights
            </Link>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              RESOURCES
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              AI Guides and Frameworks
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Comprehensive resources for organizations adopting AI in Africa. Strategy frameworks, implementation playbooks, and industry-specific guides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Strategic Frameworks */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Strategic frameworks">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">
            Strategic Frameworks
          </motion.h2>
          <motion.p {...fadeUp} className="font-satoshi text-ink-muted text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
            Start here. These six documents provide the foundation for understanding, planning, and governing AI adoption in your organization.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicFrameworks.map((doc, i) => (
              <DocumentCard key={doc.id} doc={doc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Industry-Specific Guides */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20" aria-label="Industry-specific AI guides">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">
            Industry-Specific AI Guides
          </motion.h2>
          <motion.p {...fadeUp} className="font-satoshi text-ink-muted text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
            Twenty sector-specific guides covering how AI applies to your industry in African contexts. Each guide includes use cases, implementation paths, and local considerations.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryGuides.map((doc, i) => (
              <DocumentCard key={doc.id} doc={doc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black" aria-label="Get started">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] text-signal-teal/50 uppercase tracking-[0.3em] mb-4 block">
              Next Step
            </span>
            <h2 className="font-cabinet text-3xl md:text-5xl tracking-tight text-skeleton-bone mb-6">
              Ready to put AI to work?
            </h2>
            <p className="font-satoshi text-fog-gray/60 text-lg mb-10 font-light leading-relaxed">
              These guides are a starting point. Talk to us about implementing AI solutions for your specific needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-skeleton-bone text-atlantic-black px-8 py-4 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-fog-gray transition-all duration-300 group"
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
