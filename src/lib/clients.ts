/**
 * Selected client marks for the trust layer and the strip.
 *
 * Logos were pulled from each client's own live website (2026-10-18)
 * and vectorised where the source art allowed a faithful trace; two
 * painterly marks ship as WebP (Clusterleaf, Enchanted Artistry).
 * Same asset set the Technologies site ships - one source of truth.
 */

export interface ClientMark {
  slug: string;
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
}

export const CLIENTS: ClientMark[] = [
  { slug: "bigbrotherguesthouse", name: "Big Brother Guesthouse", href: "https://bigbrotherguesthouse.com", logo: "/images/clients/bigbrotherguesthouse.svg", width: 198, height: 185 },
  { slug: "c4restaurant", name: "C4 Restaurant & Bar", href: "https://www.c4restaurant.com", logo: "/images/clients/c4restaurant.svg", width: 816, height: 246 },
  { slug: "c4studentstay", name: "C4 Student Accommodations", href: "https://c4studentstay.com", logo: "/images/clients/c4studentstay.svg", width: 1499, height: 362 },
  { slug: "clusterleaf", name: "Cluster Leaf Safaris", href: "https://www.clusterleafsafaris.com", logo: "/images/clients/clusterleaf.webp", width: 520, height: 310 },
  { slug: "crescendo", name: "Crescendo Namibia", href: "https://www.crescendona.com", logo: "/images/clients/crescendo.svg", width: 1600, height: 1579 },
  { slug: "dieselman", name: "Dieselman Nam", href: "https://www.dieselman-nam.com", logo: "/images/clients/dieselman.svg", width: 800, height: 656 },
  { slug: "enchanted", name: "Enchanted Artistry CC", href: "https://www.enchantedna.com", logo: "/images/clients/enchanted.webp", width: 520, height: 549 },
  { slug: "giftedwithpurpose", name: "Gifted with Purpose", href: "https://www.giftedwithpurpose.net", logo: "/images/clients/giftedwithpurpose.svg", width: 1024, height: 1014 },
  { slug: "kalinasho", name: "Kalinasho Trading Enterprises", href: "https://kalinasho.com", logo: "/images/clients/kalinasho.svg", width: 1024, height: 1024 },
  { slug: "ligertours", name: "Liger Tours Namibia", href: "https://ligertours.com", logo: "/images/clients/ligertours.svg", width: 2560, height: 841 },
  { slug: "lrclearing", name: "L&R Clearing Agency", href: "https://lrclearing.com", logo: "/images/clients/lrclearing.svg", width: 560, height: 330 },
  { slug: "mendozer", name: "Mendozer Investments", href: "https://mendozer.com", logo: "/images/clients/mendozer.svg", width: 1024, height: 401 },
  { slug: "miway", name: "MI-WAY by Malu Investment", href: "https://mi-way.org", logo: "/images/clients/miway.svg", width: 425, height: 543 },
  { slug: "mundesha", name: "Mundesha Investment One", href: "https://mundesha.com", logo: "/images/clients/mundesha.svg", width: 3510, height: 1107 },
  { slug: "nalago", name: "Nalago Skincare", href: "https://nalago-nam.com", logo: "/images/clients/nalago.svg", width: 1508, height: 693 },
  { slug: "oci", name: "Oom Carlo's Investments", href: "https://oci.com.na", logo: "/images/clients/oci.svg", width: 258, height: 128 },
  { slug: "petrocor", name: "Petrocor", href: "https://petrocor.blackstarhorizon.com", logo: "/images/clients/petrocor.svg", width: 342, height: 561 },
  { slug: "proavia", name: "ProAvia Travel & Tours", href: "https://proaviainc.com", logo: "/images/clients/proavia.svg", width: 196, height: 196 },
  { slug: "reviveautoworks", name: "Revive Auto Works", href: "https://reviveautoworks.cc", logo: "/images/clients/reviveautoworks.svg", width: 452, height: 460 },
  { slug: "smarth2o", name: "Smart H2O Solutions", href: "https://smarth2o.com.na", logo: "/images/clients/smarth2o.svg", width: 883, height: 253 },
  { slug: "weca", name: "Weca Offroad Centre", href: "https://wecaoffroad.com", logo: "/images/clients/weca.svg", width: 196, height: 196 },
];
