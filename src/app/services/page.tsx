import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Office, medical, retail, and industrial cleaning across the Bay Area. Verified every visit.",
};

const services = [
  {
    title: "Office cleaning",
    summary:
      "Daily and weekly cleans for offices, studios, and co-working spaces, built around how your team actually uses the space.",
    points: [
      "Workstation, common area, and conference-room rotation",
      "Restroom and kitchen verification with photo proof",
      "Light-touch / deep-clean service tiers",
    ],
  },
  {
    title: "Medical & dental",
    summary:
      "Dental and primary-care offices with the cleaning protocols and documentation those environments require.",
    points: [
      "Hospital-grade disinfectants where appropriate",
      "Operating-room turnover sequences documented per visit",
      "OSHA-aware logging you can hand to inspectors",
    ],
  },
  {
    title: "Retail & storefront",
    summary:
      "Boutiques, salons, fitness studios, and storefronts that need to look new every morning the doors open.",
    points: [
      "Pre-open or post-close service windows",
      "Floor-finish care for wood, concrete, and tile",
      "Window and entry treatment on a schedule",
    ],
  },
  {
    title: "Industrial & warehouse",
    summary:
      "Distribution, light-manufacturing, and back-of-house spaces where cleanliness is a safety and OSHA story, not a vibe.",
    points: [
      "Forklift-safe floor care and dust control",
      "Restroom and break-room programs scaled to crew size",
      "After-hours scheduling around your shift patterns",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-12">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
              Services
            </p>
            <h1 className="mt-4 font-serif text-[44px] md:text-[60px] leading-[1.05] tracking-[-0.02em]">
              The same standard, calibrated to your space.
            </h1>
            <p className="mt-6 text-muted text-[18px] leading-[1.55]">
              Every program is custom. We don’t sell packages. We walk your
              building, design a scope, and bring a vetted crew that fits.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container size="wide">
          <div className="grid gap-px bg-border/70 md:grid-cols-2 rounded-2xl overflow-hidden border border-border/70">
            {services.map((s) => (
              <article
                key={s.title}
                className="bg-background p-8 md:p-10 flex flex-col"
              >
                <h2 className="font-serif text-[26px] md:text-[28px] tracking-[-0.01em]">
                  {s.title}
                </h2>
                <p className="mt-3 text-[16px] text-muted leading-[1.55]">
                  {s.summary}
                </p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-foreground/85">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quote"
                  className="mt-8 inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors text-[15px] font-medium"
                >
                  Request a quote
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container size="wide">
          <div className="rounded-2xl border border-border/70 bg-subtle/40 px-7 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="max-w-2xl">
              <h2 className="font-serif text-[22px] md:text-[26px] tracking-[-0.01em]">
                Don’t see your space?
              </h2>
              <p className="mt-2 text-[15px] md:text-[16px] text-muted leading-[1.55]">
                We work with mixed-use buildings, multi-tenant suites, and
                unusual layouts. Tell us what you have.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex h-12 items-center justify-center rounded-full px-6 bg-accent text-background font-medium text-[15px] hover:bg-accent-hover transition-colors whitespace-nowrap self-start md:self-auto"
            >
              Tell us about your space
            </Link>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
