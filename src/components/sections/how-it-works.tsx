import { Container } from "@/components/container";

const steps = [
  {
    n: "01",
    title: "Free walkthrough",
    body: "We come to your space within 24 hours and see exactly what your building needs.",
  },
  {
    n: "02",
    title: "Custom quote",
    body: "Honest pricing built around your square footage, frequency, and special-care areas.",
  },
  {
    n: "03",
    title: "Vetted crew assigned",
    body: "A consistent, background-checked team, not a rotating cast of strangers.",
  },
  {
    n: "04",
    title: "Verified service",
    body: "Photo-verified visits and a monthly report you can forward to leadership.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <Container size="wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
              How it works
            </p>
            <h2 className="mt-4 font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
              From walkthrough to verified service in days, not weeks.
            </h2>
            <p className="mt-5 text-muted max-w-md">
              The walkthrough is free and the quote arrives the same week.
              We can have you on the schedule within seven days of saying yes.
            </p>
          </div>

          <ol className="md:col-span-8 grid gap-px bg-border/70 sm:grid-cols-2 rounded-2xl overflow-hidden border border-border/70">
            {steps.map((step) => (
              <li key={step.n} className="bg-background p-7 md:p-9">
                <div className="font-serif text-accent text-[18px] tabular-nums">
                  {step.n}
                </div>
                <h3 className="mt-3 font-serif text-[22px] tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] text-muted leading-[1.55]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
