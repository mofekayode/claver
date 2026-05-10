import { Container } from "@/components/container";

const rows = [
  {
    them: "Quality drifts after month two and you start checking corners yourself.",
    us: "Photo verification on every visit catches drift before you ever see it.",
  },
  {
    them: "Issues vanish into a generic ticket queue and reappear next month.",
    us: "Direct line to your account lead. One-hour response. Patterns tracked so they don’t repeat.",
  },
  {
    them: "Crew turnover is constant. New faces every week, no one knows your space.",
    us: "A consistent, vetted crew assigned to your building. Same people, every visit.",
  },
  {
    them: "Reporting is a verbal “we got it” after you flag the problem.",
    us: "A monthly PDF report with timestamps, crew names, photos, and an issue log.",
  },
];

export function WhySwitch() {
  return (
    <section className="py-20 md:py-28 border-t border-border/60">
      <Container size="wide">
        <div className="max-w-2xl">
          <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
            Why switch
          </p>
          <h2 className="mt-4 font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
            You already have a cleaner. Here’s why this is different.
          </h2>
          <p className="mt-5 text-muted">
            Most office managers we talk to don’t hate their cleaning company.
            They just don’t trust it. We built around the four moments that
            usually break that trust.
          </p>
        </div>

        <div className="mt-12 md:mt-16 rounded-2xl border border-border/70 overflow-hidden">
          <div className="hidden md:grid grid-cols-2 bg-subtle/40 px-8 py-4 text-[13px] uppercase tracking-[0.12em] text-muted">
            <div>Most cleaning companies</div>
            <div>Claver</div>
          </div>
          <ul className="divide-y divide-border/70">
            {rows.map(({ them, us }, i) => (
              <li
                key={i}
                className="grid md:grid-cols-2 gap-3 md:gap-10 px-6 md:px-8 py-7 md:py-8"
              >
                <div className="flex gap-3 text-foreground/65">
                  <CrossIcon className="mt-1 w-4 h-4 shrink-0 text-foreground/40" />
                  <span className="text-[16px] leading-[1.55]">{them}</span>
                </div>
                <div className="flex gap-3 text-foreground/95">
                  <CheckIcon className="mt-1 w-4 h-4 shrink-0 text-accent" />
                  <span className="text-[16px] leading-[1.55]">{us}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="M6 18 18 6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
