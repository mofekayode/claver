/**
 * Per-city configuration for the paid landing pages.
 *
 * Each entry produces a route at `/<slug>` rendered by `src/app/[slug]/page.tsx`.
 * The route is statically generated and `dynamicParams = false`, so only these
 * 5 slugs will respond — every other URL 404s, no accidental SEO leakage.
 */

export type CitySlug =
  | "oakland-commercial-cleaning"
  | "berkeley-commercial-cleaning"
  | "emeryville-commercial-cleaning"
  | "alameda-commercial-cleaning"
  | "piedmont-commercial-cleaning";

export type CityConfig = {
  /** URL slug (without leading slash). */
  slug: CitySlug;
  /** Plain city name used in copy ("Oakland"). */
  city: string;
  /** Browser tab + Google result title. */
  metaTitle: string;
  /** SERP snippet — 150-160 chars ideal. */
  metaDescription: string;
  /** Short eyebrow line under the badge. Highlights local context. */
  localFlavor: string;
  /** Short phrase used at the bottom of the page after city service list. */
  nearbyText: string;
};

export const CITIES: Record<CitySlug, CityConfig> = {
  "oakland-commercial-cleaning": {
    slug: "oakland-commercial-cleaning",
    city: "Oakland",
    metaTitle:
      "Oakland Commercial Cleaning · Photo-Verified Visits · Claver Services",
    metaDescription:
      "Bonded & insured commercial cleaning for Oakland offices, clinics, and retail. Photo-verified every visit, monthly reports, 24-hour issue resolution. Free walkthrough in 24 hours.",
    localFlavor:
      "Serving downtown Oakland, Jack London Square, Uptown, Rockridge, and the rest of the East Bay.",
    nearbyText:
      "Oakland-based teams also serve Berkeley, Emeryville, Alameda, and Piedmont.",
  },
  "berkeley-commercial-cleaning": {
    slug: "berkeley-commercial-cleaning",
    city: "Berkeley",
    metaTitle:
      "Berkeley Commercial Cleaning · Photo-Verified Visits · Claver Services",
    metaDescription:
      "Bonded & insured commercial cleaning for Berkeley offices, clinics, and retail. Photo-verified every visit, monthly reports, 24-hour issue resolution. Free walkthrough in 24 hours.",
    localFlavor:
      "Serving Downtown Berkeley, North Berkeley, the UC campus area, and Fourth Street.",
    nearbyText:
      "Berkeley-based teams also serve Oakland, Emeryville, Alameda, and Piedmont.",
  },
  "emeryville-commercial-cleaning": {
    slug: "emeryville-commercial-cleaning",
    city: "Emeryville",
    metaTitle:
      "Emeryville Commercial Cleaning · Photo-Verified Visits · Claver Services",
    metaDescription:
      "Bonded & insured commercial cleaning for Emeryville offices, biotech labs, and retail. Photo-verified every visit, monthly reports, 24-hour issue resolution. Free walkthrough in 24 hours.",
    localFlavor:
      "Serving the Bay Street corridor, Powell Street campuses, Watergate, and the Emeryville Marina office parks.",
    nearbyText:
      "Emeryville-based teams also serve Oakland, Berkeley, Alameda, and Piedmont.",
  },
  "alameda-commercial-cleaning": {
    slug: "alameda-commercial-cleaning",
    city: "Alameda",
    metaTitle:
      "Alameda Commercial Cleaning · Photo-Verified Visits · Claver Services",
    metaDescription:
      "Bonded & insured commercial cleaning for Alameda offices, clinics, and retail. Photo-verified every visit, monthly reports, 24-hour issue resolution. Free walkthrough in 24 hours.",
    localFlavor:
      "Serving Park Street, Webster Street, Marina Village, Alameda Point, and Harbor Bay.",
    nearbyText:
      "Alameda-based teams also serve Oakland, Berkeley, Emeryville, and Piedmont.",
  },
  "piedmont-commercial-cleaning": {
    slug: "piedmont-commercial-cleaning",
    city: "Piedmont",
    metaTitle:
      "Piedmont Commercial Cleaning · Photo-Verified Visits · Claver Services",
    metaDescription:
      "Bonded & insured commercial cleaning for Piedmont small businesses, offices, and clinics. Photo-verified every visit, monthly reports, 24-hour issue resolution. Free walkthrough in 24 hours.",
    localFlavor:
      "Serving Highland Avenue, the Piedmont commercial corridor, and the surrounding Oakland hills.",
    nearbyText:
      "Piedmont-based teams also serve Oakland, Berkeley, Emeryville, and Alameda.",
  },
};

export const CITY_SLUGS = Object.keys(CITIES) as CitySlug[];

export function isCitySlug(value: string): value is CitySlug {
  return value in CITIES;
}
