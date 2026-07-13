/**
 * Studio — Three capability groups and nine outcome-led programs.
 *
 * Replaces the flat seven-service presentation.
 * Source: Follow-up directive sections 4 and 5.
 *
 * Old services → New capability mapping:
 *   Brand Systems, Creative Direction          → BRAND
 *   Website Design, Website Development,
 *   Application Design, Product Design,
 *   Design Systems                             → PRODUCT
 *   (new)                                      → INTELLIGENCE
 */

export type CapabilityId = "brand" | "product" | "intelligence";

export interface Program {
  id: string;
  name: string;
  capability: CapabilityId;
  situation: string;
  transformation: string;
  outputs: string[];
  exampleSlug?: string;
}

export interface Capability {
  id: CapabilityId;
  number: string;
  name: string;
  shortDescription: string;
  purpose: string;
  includes: string[];
  programs: Program[];
  /** Old service slugs that redirect to this capability */
  relatedServices: string[];
  /** Visual mode: studio (oil-painted) or intelligence (technical) */
  visualMode: "studio" | "intelligence";
}

export const capabilities: Capability[] = [
  {
    id: "brand",
    number: "01",
    name: "Brand",
    shortDescription:
      "Identity and systems that make organizations easier to recognize, understand and trust.",
    purpose:
      "Help organizations become clear, recognizable and coherent.",
    includes: [
      "Brand strategy",
      "Positioning",
      "Visual identity",
      "Verbal direction",
      "Brand systems",
      "Creative direction",
      "Campaign identity",
      "Digital brand application",
    ],
    relatedServices: ["brand-systems", "creative-direction"],
    visualMode: "studio",
    programs: [
      {
        id: "find-your-position",
        name: "Find Your Position",
        capability: "brand",
        situation:
          "For organizations that need a clearer market position, message and point of view.",
        transformation:
          "A defined position that every subsequent decision can be measured against.",
        outputs: [
          "Positioning statement",
          "Audience and competitor mapping",
          "Messaging framework",
          "Brand voice direction",
        ],
      },
      {
        id: "build-the-identity",
        name: "Build the Identity",
        capability: "brand",
        situation:
          "For new organizations or brands that need a complete visual and verbal system.",
        transformation:
          "A coherent identity the organization can apply consistently from day one.",
        outputs: [
          "Visual identity",
          "Logo and lockup system",
          "Colour and type system",
          "Brand guidelines",
        ],
      },
      {
        id: "refresh-the-brand",
        name: "Refresh the Brand",
        capability: "brand",
        situation:
          "For established organizations whose identity no longer reflects their value.",
        transformation:
          "An identity that catches up to where the organization has already grown.",
        outputs: [
          "Identity audit",
          "Refined visual system",
          "Updated guidelines",
          "Migration plan",
        ],
      },
    ],
  },
  {
    id: "product",
    number: "02",
    name: "Product",
    shortDescription:
      "Websites and digital products designed around real users, business goals and long-term operation.",
    purpose: "Create digital platforms that make the brand useful.",
    includes: [
      "Website strategy",
      "User experience",
      "User-interface design",
      "Website development",
      "Web applications",
      "Product design",
      "Prototyping",
      "Design systems",
      "Content architecture",
      "Performance and accessibility",
    ],
    relatedServices: [
      "website-design",
      "website-development",
      "application-design",
      "product-design",
      "design-systems",
    ],
    visualMode: "studio",
    programs: [
      {
        id: "launch-the-platform",
        name: "Launch the Platform",
        capability: "product",
        situation:
          "For organizations that need a new high-quality website or digital service.",
        transformation:
          "A production website that represents the organization and converts visitors.",
        outputs: [
          "Discovery and strategy",
          "Design and development",
          "Launch and handover",
          "Documentation",
        ],
        exampleSlug: "proavia",
      },
      {
        id: "improve-the-journey",
        name: "Improve the Journey",
        capability: "product",
        situation:
          "For organizations losing customers through unclear, outdated or inefficient experiences.",
        transformation:
          "A journey that keeps customers moving toward the action that matters.",
        outputs: [
          "UX audit",
          "Journey redesign",
          "Updated interface",
          "Conversion path optimization",
        ],
      },
      {
        id: "build-the-product",
        name: "Build the Product",
        capability: "product",
        situation:
          "For portals, dashboards, applications and new digital-product ideas.",
        transformation:
          "A working product that real users can use every day.",
        outputs: [
          "Product strategy",
          "UI/UX design",
          "Application development",
          "Design system",
        ],
        exampleSlug: "smefrog",
      },
    ],
  },
  {
    id: "intelligence",
    number: "03",
    name: "Intelligence",
    shortDescription:
      "Applied intelligence, automation and custom systems that turn digital products into working infrastructure.",
    purpose: "Build the systems behind the interface.",
    includes: [
      "Applied AI",
      "AI agents",
      "Workflow automation",
      "Custom integrations",
      "Knowledge systems",
      "Self-hosted infrastructure",
      "Internal tools",
      "Intelligent product features",
    ],
    relatedServices: [],
    visualMode: "intelligence",
    programs: [
      {
        id: "automate-the-work",
        name: "Automate the Work",
        capability: "intelligence",
        situation:
          "For repetitive processes, disconnected tools and manual operational tasks.",
        transformation:
          "Manual work moved into automated flows that run without supervision.",
        outputs: [
          "Process mapping",
          "Automation build",
          "Integration setup",
          "Documentation and handover",
        ],
      },
      {
        id: "add-intelligence",
        name: "Add Intelligence",
        capability: "intelligence",
        situation:
          "For products that need AI search, assistants, recommendations or agent-based functionality.",
        transformation:
          "AI features that solve a specific user problem rather than demonstrating a model.",
        outputs: [
          "Feature scoping",
          "Model and provider selection",
          "Integration build",
          "Evaluation framework",
        ],
      },
      {
        id: "own-the-infrastructure",
        name: "Own the Infrastructure",
        capability: "intelligence",
        situation:
          "For organizations that need controlled, self-hosted or privacy-conscious intelligent systems.",
        transformation:
          "Intelligence infrastructure the organization controls directly.",
        outputs: [
          "Infrastructure architecture",
          "Self-hosted deployment",
          "Security and access controls",
          "Operational documentation",
        ],
      },
    ],
  },
];

export function getCapability(id: CapabilityId): Capability | undefined {
  return capabilities.find((c) => c.id === id);
}

/**
 * Maps an old service slug to its new capability.
 * Used by the /services/[slug] redirect route.
 */
export function mapServiceToCapability(slug: string): CapabilityId | null {
  for (const cap of capabilities) {
    if (cap.relatedServices.includes(slug)) {
      return cap.id;
    }
  }
  return null;
}

export const allPrograms: Program[] = capabilities.flatMap((c) => c.programs);

export function getProgram(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id);
}
