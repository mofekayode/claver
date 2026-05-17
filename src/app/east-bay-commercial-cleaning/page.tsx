import type { Metadata } from "next";
import { PaidLanding } from "@/components/sections/paid-landing";

const TITLE =
  "East Bay Commercial Cleaning · Photo-Verified Visits · Claver Services";
const DESCRIPTION =
  "Bonded & insured commercial cleaning for East Bay offices, clinics, and retail. Photo-verified every visit, monthly reports, 24-hour issue resolution. Free walkthrough in 24 hours. Serving Oakland, Berkeley, Emeryville, Alameda, Piedmont.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "/east-bay-commercial-cleaning",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: { canonical: "/east-bay-commercial-cleaning" },
  robots: { index: true, follow: true },
};

export default function EastBayLandingPage() {
  return <PaidLanding />;
}
