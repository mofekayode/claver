import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { ThankYouTracker } from "@/components/thank-you-tracker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks, book your walkthrough",
  description:
    "Your quote request is in. Book your free walkthrough now and you'll have a tailored proposal in your inbox within 24 hours of the visit.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const firstName = stringFromParam(params.name)?.split(" ")[0];
  const name = stringFromParam(params.name);
  const email = stringFromParam(params.email);

  return (
    <section className="py-16 md:py-24">
      <ThankYouTracker name={name} email={email} />
      <Container size="narrow">
        <div className="max-w-2xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-sage">
            <CheckIcon className="w-6 h-6" />
          </div>
          <p className="mt-6 text-[13px] uppercase tracking-[0.14em] text-accent">
            Request received
          </p>
          <h1 className="mt-3 font-serif text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
            {firstName ? `Thanks, ${firstName}.` : "Thanks."} Your quote is in
            motion.
          </h1>
          <p className="mt-5 text-[17px] text-muted leading-[1.55]">
            I&rsquo;ll be in touch within one business day.
          </p>
          <p className="mt-4 text-[17px] text-muted leading-[1.55]">
            To move faster, book your free 30-minute walkthrough below.
            Commercial cleaning quotes need a site visit because every space is
            different. After we walk through, I&rsquo;ll send your detailed
            proposal within 24 hours.
          </p>
          <p className="mt-4 text-[15px] text-sage font-medium">
            No pressure, no commitment.
          </p>
        </div>

        <div className="mt-12">
          <CalendlyEmbed
            url={site.calendlyUrl}
            prefill={{ name, email }}
          />
        </div>

        <div className="mt-10 flex items-center gap-3">
          <span
            className="h-px w-8 bg-border"
            aria-hidden="true"
          />
          <p className="font-serif italic text-[16px] text-foreground/75">
            {site.founder.name}, {site.founder.title}
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors text-[15px]"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}

function stringFromParam(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}
