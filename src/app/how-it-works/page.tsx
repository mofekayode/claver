import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Inside the QA system that makes our cleans verifiable. Photo checks, monthly reports, and a one-hour issue response.",
};

const pillars = [
  {
    n: "01",
    title: "Photo verification, every visit",
    body:
      "Each visit ends with photos of high-traffic zones (restrooms, kitchens, entryways, conference rooms) checked against your building’s standard before the crew leaves.",
    detail: [
      "Reference photos captured during onboarding set your standard.",
      "Visit photos compared against the reference, flagged automatically if anything is off.",
      "You see the photos in the next monthly report. Nothing hidden.",
    ],
  },
  {
    n: "02",
    title: "Monthly service reports",
    body:
      "On the first of each month, you get a single PDF showing what was cleaned, when, and by whom. Forward it up the chain without writing a thing.",
    detail: [
      "Per-visit timestamps and crew names, never anonymous.",
      "Issue log with response and resolution times.",
      "Photo highlights, not a wall of images. Built to be skimmed.",
    ],
  },
  {
    n: "03",
    title: "One-hour response, 24-hour resolution",
    body:
      "Something off? Text or email us. A real person responds inside an hour. Most issues are resolved by the next service window, many the same day.",
    detail: [
      "Direct line to your account lead, not a generic ticket queue.",
      "If we missed something, we come back. No invoice gymnastics.",
      "Patterns are tracked so the same issue doesn’t happen twice.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
              How we work
            </p>
            <h1 className="mt-4 font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em]">
              The cleaning company you can{" "}
              <span className="text-accent italic" style={{ fontVariationSettings: "'SOFT' 100" }}>
                actually audit
              </span>
              .
            </h1>
            <p className="mt-6 text-muted text-[18px] leading-[1.55] max-w-2xl">
              Most cleaning is a black box. Ours is a paper trail. Three
              systems work together to make every visit verifiable, without
              adding work to your week.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 bg-subtle/30">
        <Container size="wide">
          <div className="divide-y divide-border/70">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="grid gap-8 md:grid-cols-12 md:gap-16 py-16 md:py-20"
              >
                <div className="md:col-span-4">
                  <div className="font-serif text-accent text-[18px] tabular-nums">
                    {p.n}
                  </div>
                  <h2 className="mt-3 font-serif text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.015em]">
                    {p.title}
                  </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="text-[18px] text-foreground/85 leading-[1.55]">
                    {p.body}
                  </p>
                  <ul className="mt-6 space-y-3 text-[16px] text-muted">
                    {p.detail.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-3 shrink-0 bg-accent rounded-full"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 border-t border-border/60">
        <Container size="wide">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
                What it looks like
              </p>
              <h2 className="mt-4 font-serif text-[36px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
                A monthly report you can forward without editing.
              </h2>
              <p className="mt-5 text-muted max-w-xl">
                Every report starts with the summary your boss wants: visit
                count, issues raised, issues resolved. Then it drills down for
                anyone who actually wants the details.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Button href="/quote" size="lg">
                See it in your inbox
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-border/70 md:grid-cols-3 rounded-2xl overflow-hidden border border-border/70">
            <ReportStat label="Visits this month" value="22" hint="Mon–Fri, 6:30pm" />
            <ReportStat label="Issues raised" value="2" hint="Both resolved" />
            <ReportStat label="Avg. response" value="34 min" hint="Target: < 1 hr" />
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

function ReportStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="bg-background p-8 md:p-10">
      <div className="text-[13px] uppercase tracking-[0.12em] text-muted">
        {label}
      </div>
      <div className="mt-3 font-serif text-[44px] md:text-[52px] tracking-[-0.02em] tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-[14px] text-muted">{hint}</div>
    </div>
  );
}
