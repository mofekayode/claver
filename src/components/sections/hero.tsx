import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";

export function Hero() {
  return (
    <section className="relative pt-16 md:pt-28 pb-20 md:pb-28">
      <Container size="wide">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-[13px] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-sage opacity-60 animate-ping"></span>
              <span className="relative rounded-full bg-sage h-1.5 w-1.5"></span>
            </span>
            Now serving the Bay Area
          </div>

          <h1 className="mt-7 font-serif text-[44px] leading-[1.05] tracking-[-0.02em] sm:text-[56px] md:text-[68px] lg:text-[76px]">
            Commercial cleaning that{" "}
            <span className="text-accent italic" style={{ fontVariationSettings: "'SOFT' 100" }}>
              proves itself
            </span>
            , every visit.
          </h1>

          <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
            Photo verification, monthly service reports, and 24-hour issue
            resolution. The standard for office managers who are done chasing
            their cleaning company.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/quote" size="lg">
              Get a free quote
            </Button>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center gap-2 px-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              See how it works
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10" />
                <path d="m9 4 4 4-4 4" />
              </svg>
            </Link>
          </div>

          <p className="mt-5 text-[14px] text-muted/90">
            Tailored quotes. No surprise fees, no auto-renewal traps.
          </p>

          <ul
            aria-label="Trust signals"
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted"
          >
            <li className="inline-flex items-center gap-2">
              <ShieldIcon className="w-4 h-4 text-sage" />
              <span>Licensed &amp; insured</span>
            </li>
            <li aria-hidden="true" className="text-foreground/25">
              ·
            </li>
            <li className="inline-flex items-center gap-2">
              <DocIcon className="w-4 h-4 text-sage" />
              <span>$1M liability coverage</span>
            </li>
            <li aria-hidden="true" className="text-foreground/25">
              ·
            </li>
            <li className="inline-flex items-center gap-2">
              <PinIcon className="w-4 h-4 text-sage" />
              <span>Bay Area owned &amp; operated</span>
            </li>
          </ul>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-10 border-t border-border/70 pt-10">
          <Stat label="Issue response" value="< 1 hour" />
          <Stat label="Visits verified" value="100%" />
          <Stat label="Reports cadence" value="Monthly" />
          <Stat label="Insurance" value="$1M / occurrence" />
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-serif text-[28px] md:text-[32px] tracking-tight text-foreground tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-[13px] uppercase tracking-[0.1em] text-muted">
        {label}
      </div>
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function DocIcon({ className }: { className?: string }) {
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
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
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
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
