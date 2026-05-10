import { Container } from "@/components/container";

const props = [
  {
    title: "Verified every visit.",
    body: "AI-powered photo checks confirm every clean meets standard before you ever notice an issue.",
    icon: ShieldIcon,
  },
  {
    title: "Monthly service reports.",
    body: "See exactly what was cleaned, when, and by whom. Zero guesswork, zero surprises.",
    icon: ChartIcon,
  },
  {
    title: "One-hour response promise.",
    body: "Issue with a clean? We respond in under an hour and resolve within 24.",
    icon: ClockIcon,
  },
];

export function ValueProps() {
  return (
    <section className="py-20 md:py-28 border-t border-border/60 bg-subtle/30">
      <Container size="wide">
        <div className="max-w-2xl">
          <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
            Why we exist
          </p>
          <h2 className="mt-4 font-serif text-[34px] md:text-[44px] tracking-[-0.015em] leading-[1.1]">
            Cleaning shouldn’t be a leap of faith.
          </h2>
          <p className="mt-5 text-muted">
            Most cleaning companies disappear after the contract is signed.
            We built the opposite: a service that documents itself, so the
            people responsible for the building never have to wonder.
          </p>
        </div>

        <div className="mt-14 md:mt-20 grid gap-px bg-border/70 md:grid-cols-3 rounded-2xl overflow-hidden border border-border/70">
          {props.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="bg-background p-8 md:p-10 flex flex-col"
            >
              <Icon className="w-7 h-7 text-accent" />
              <h3 className="mt-6 font-serif text-[22px] md:text-[24px] tracking-[-0.01em]">
                {title}
              </h3>
              <p className="mt-3 text-[16px] text-muted leading-[1.55]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16V11" />
      <path d="M12 16V8" />
      <path d="M16 16v-3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
