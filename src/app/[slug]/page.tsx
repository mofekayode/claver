import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PaidLanding } from "@/components/sections/paid-landing";
import {
  CITIES,
  CITY_SLUGS,
  isCitySlug,
  type CitySlug,
} from "@/lib/paid-landing-cities";

type Params = Promise<{ slug: string }>;

// Strict matching: only the 5 city slugs render; everything else 404s,
// preventing accidental SEO leakage on arbitrary paths.
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: CitySlug }> {
  return CITY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCitySlug(slug)) return {};
  const city = CITIES[slug];
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      type: "website",
      url: `/${city.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
    },
    alternates: { canonical: `/${city.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CityLandingPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  if (!isCitySlug(slug)) notFound();
  return <PaidLanding city={CITIES[slug]} />;
}
