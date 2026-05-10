import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { ThankYouTracker } from "@/components/thank-you-tracker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks — book your walkthrough",
  description:
    "Your quote request is in. Book your free walkthrough now and we'll have a tailored proposal in your inbox the same week.",
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
            We received your details and our team will be in touch within one
            business day. To get a tailored quote faster, book your free
            walkthrough below. It takes 20 minutes, on-site or over a quick
            call, and the quote follows within the week.
          </p>
        </div>

        <div className="mt-12">
          <CalendlyEmbed
            url={site.calendlyUrl}
            prefill={{ name, email }}
          />
        </div>

        <div className="mt-12 rounded-2xl border border-border/70 bg-subtle/40 p-7 md:p-8">
          <p className="text-[14px] uppercase tracking-[0.14em] text-muted">
            Need to reach us sooner?
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[16px]">
            <a
              href={site.phoneHref}
              className="text-foreground font-medium tabular-nums hover:text-accent transition-colors"
            >
              Call {site.phone}
            </a>
            <span className="text-foreground/30" aria-hidden="true">
              ·
            </span>
            <a
              href={site.emailHref}
              className="text-foreground hover:text-accent transition-colors"
            >
              {site.email}
            </a>
          </div>
          <p className="mt-3 text-[14px] text-muted">
            {site.hours}. We respond to every quote request within one business
            day.
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
