import { Container } from "@/components/container";
import { QuoteForm } from "@/app/quote/quote-form";
import { PaidLandingTracker } from "@/components/paid-landing-tracker";

/**
 * Single paid landing page for Google Ads traffic. Inclusive headline so
 * visitors from any of our 6 service cities (Oakland, Berkeley, Emeryville,
 * Alameda, Piedmont, San Francisco) feel addressed.
 */
export function PaidLanding() {
  return (
    <>
      <PaidLandingTracker slug="east-bay-commercial-cleaning" city="Bay Area" />

      {/* ===== HERO ===== */}
      <section className="relative pt-12 md:pt-20 pb-10 md:pb-14">
        <Container size="wide">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-[13px] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-sage opacity-60 animate-ping" />
                <span className="relative rounded-full bg-sage h-1.5 w-1.5" />
              </span>
              Now serving the Bay Area
            </div>

            <h1 className="mt-7 font-serif text-[44px] leading-[1.05] tracking-[-0.02em] sm:text-[56px] md:text-[68px] lg:text-[72px]">
              Bay Area commercial cleaning that{" "}
              <span
                className="text-accent italic"
                style={{ fontVariationSettings: "'SOFT' 100" }}
              >
                proves itself
              </span>
              , every visit.
            </h1>

            <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted leading-[1.55]">
              Photo verification, monthly service reports, and 24-hour issue
              resolution. The standard for Bay Area office managers who are
              done chasing their cleaning company.
            </p>

            <p className="mt-5 max-w-2xl text-[15px] text-muted/90">
              Serving Oakland, Berkeley, Emeryville, Alameda, Piedmont, and
              San Francisco.
            </p>

            <ul
              aria-label="Trust signals"
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted"
            >
              <li className="inline-flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-sage" />
                <span>Licensed &amp; insured</span>
              </li>
              <li aria-hidden="true" className="text-foreground/25">·</li>
              <li className="inline-flex items-center gap-2">
                <DocIcon className="w-4 h-4 text-sage" />
                <span>$1M liability coverage</span>
              </li>
              <li aria-hidden="true" className="text-foreground/25">·</li>
              <li className="inline-flex items-center gap-2">
                <PinIcon className="w-4 h-4 text-sage" />
                <span>Bay Area owned &amp; operated</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ===== DIFFERENTIATORS ===== */}
      <section className="border-t border-border/60 bg-subtle/40 py-12 md:py-16">
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-3">
            <DifferentiatorCard
              title="Photo-verified every visit"
              body="Every visit ends with timestamped photos sent to your inbox. No more wondering whether the bathroom actually got cleaned."
              icon={<CameraIcon className="w-5 h-5" />}
            />
            <DifferentiatorCard
              title="$1M bonded & insured"
              body="Full general liability coverage. Background-checked crews. COI available on request before the contract is signed."
              icon={<DocIcon className="w-5 h-5" />}
            />
            <DifferentiatorCard
              title="24-hour issue resolution"
              body="Spotted something we missed? Reply to your service report and we are back on-site within 24 hours, not next week."
              icon={<ClockIcon className="w-5 h-5" />}
            />
          </div>
        </Container>
      </section>

      {/* ===== QUOTE FORM ===== */}
      <section id="quote-form" className="py-16 md:py-20">
        <Container size="narrow">
          <div className="max-w-xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
              Request a quote
            </p>
            <h2 className="mt-4 font-serif text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em]">
              Tell us about your space.
            </h2>
            <p className="mt-5 text-muted text-[17px] leading-[1.55]">
              Free walkthrough within 24 hours. Custom quote the same week. No
              pressure, no auto-renewal traps.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <QuoteForm />
          </div>
        </Container>
      </section>

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <section className="border-t border-border/60 py-14 md:py-20">
        <Container size="narrow">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">
            What happens next
          </p>
          <ol className="mt-6 space-y-5">
            <Step
              n={1}
              title="A 30-minute walkthrough"
              body="We tour your space, look at floor types, traffic patterns, and any special-care areas. No pressure, no commitment."
            />
            <Step
              n={2}
              title="Detailed proposal within 24 hours"
              body="A real proposal with recommended frequency, scope, and pricing. Not a brochure with a generic rate."
            />
            <Step
              n={3}
              title="We get you on the schedule"
              body="If the proposal works, we onboard you with photo verification, your monthly report cadence, and direct lines to your account owner."
            />
          </ol>
        </Container>
      </section>
    </>
  );
}

// ----- subcomponents -----

function DifferentiatorCard({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background p-7">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-5 font-serif text-[22px] leading-[1.15] tracking-[-0.01em]">
        {title}
      </h3>
      <p className="mt-3 text-[15px] text-muted leading-[1.6]">{body}</p>
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-5">
      <div
        aria-hidden="true"
        className="flex-none mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent font-serif text-[18px] tabular-nums"
      >
        {n}
      </div>
      <div>
        <h3 className="font-serif text-[20px] leading-[1.2] tracking-[-0.01em]">
          {title}
        </h3>
        <p className="mt-2 text-[15px] text-muted leading-[1.6]">{body}</p>
      </div>
    </li>
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

function CameraIcon({ className }: { className?: string }) {
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
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
