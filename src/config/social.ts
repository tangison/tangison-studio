/**
 * Social media URLs and business profiles for Studio.
 *
 * VERIFIED 2026-07-13:
 * - Facebook:  facebook.com/namibia.digital  (verified — page exists)
 * - Instagram: instagram.com/tangison_studio  (verified — handle confirmed by owner)
 * - Threads:   threads.net/@tangison_studio   (verified — 200 OK)
 *
 * Google Business Profile:
 * - Google Maps listing for Studio (Windhoek, Namibia)
 * - Used for contact page, footer, and structured data
 *
 * Studio does NOT currently operate:
 * - LinkedIn  (architecture supports adding it later; do not render until URL is supplied)
 * - X/Twitter  (architecture supports adding it later; do not render until URL is supplied)
 *
 * Do not link to Tangison Technologies' accounts as substitutes for Studio's accounts.
 */

export const socialLinks = {
  facebook: "https://www.facebook.com/namibia.digital",
  instagram: "https://www.instagram.com/tangison_studio",
  threads: "https://www.threads.net/@tangison_studio",
} as const;

export type SocialPlatform = keyof typeof socialLinks;

/**
 * Google Business Profile — Studio's Google Maps listing.
 * Used on the contact page, in the footer, and in LocalBusiness structured data.
 */
export const googleBusinessProfile = {
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tangison+Studio+Windhoek+Namibia",
  // The place ID can be added once verified from Google Business Profile dashboard
  placeId: null as string | null,
  // Physical address for LocalBusiness schema
  address: {
    locality: "Windhoek",
    region: "Khomas Region",
    country: "Namibia",
    countryCode: "NA",
  },
  coordinates: {
    lat: -22.5609,
    lng: 17.0658,
  },
} as const;

/**
 * Future-ready slots. Do NOT render these in the UI until a verified URL is
 * provided. Kept here so adding them later is a one-line change.
 */
export const pendingSocialLinks = {
  linkedin: null as string | null,
  x: null as string | null,
} as const;
