import type { Metadata } from "next";
import Image from "next/image";
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

                  <div className="mt-10">
                    {p.n === "01" && <PhotoGridMock />}
                    {p.n === "02" && <ReportPreviewMock />}
                    {p.n === "03" && <ChatThreadMock />}
                  </div>
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

// ============ MOCKS ============

const PILLAR_1_PHOTOS = [
  { src: "/report/conference-a.jpg", label: "Conference A" },
  { src: "/report/kitchen.jpg", label: "Kitchen" },
  { src: "/report/restrooms.jpg", label: "Restrooms" },
  { src: "/report/open-desks.jpg", label: "Open desks" },
];

function PhotoGridMock() {
  return (
    <figure className="rounded-2xl border border-border/70 bg-background p-5 md:p-6 shadow-[0_24px_60px_-30px_rgba(28,37,32,0.18)]">
      <figcaption className="flex items-center justify-between text-[12px] uppercase tracking-[0.12em] text-muted">
        <span>Visit 14 of 22 · Jun 12, 6:42 PM</span>
        <span className="inline-flex items-center gap-1.5 text-sage normal-case tracking-normal">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sage" /> Verified
        </span>
      </figcaption>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {PILLAR_1_PHOTOS.map((p) => (
          <div
            key={p.src}
            className="relative aspect-4/3 rounded-lg ring-1 ring-border/60 overflow-hidden bg-subtle"
          >
            <Image
              src={p.src}
              alt={`${p.label} — verified clean`}
              fill
              sizes="(min-width: 768px) 14vw, 40vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-foreground/10"
            />
            <div className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sage text-background ring-1 ring-background/60">
              <CheckIcon className="w-3 h-3" />
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-[11px] md:text-[12px] font-medium text-white drop-shadow-sm">
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function ReportPreviewMock() {
  return (
    <figure className="rounded-2xl border border-border/70 bg-background overflow-hidden shadow-[0_24px_60px_-30px_rgba(28,37,32,0.18)]">
      {/* Faux PDF header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-subtle/40 text-[12px] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-sage" />
          May 2026 · Acme HQ
        </span>
        <span className="tabular-nums">claver_report_may_2026.pdf</span>
      </div>

      <div className="p-5 md:p-7">
        <div className="font-serif text-[20px] md:text-[22px] tracking-[-0.01em]">
          Monthly service report
        </div>
        <div className="mt-1 text-[12px] uppercase tracking-[0.12em] text-muted">
          Visits May 1 – May 31 · Crew M. Rodriguez, A. Tan, J. Park
        </div>

        {/* Mini stat strip */}
        <div className="mt-5 grid grid-cols-3 gap-2 md:gap-3">
          <MiniStat label="Visits" value="22" />
          <MiniStat label="Issues" value="2" />
          <MiniStat label="Avg resp" value="34m" />
        </div>

        {/* Photo strip */}
        <div className="mt-5">
          <div className="text-[11px] uppercase tracking-[0.12em] text-muted">
            132 photos · 6 zones
          </div>
          <div className="mt-2 grid grid-cols-6 gap-1.5">
            {PILLAR_1_PHOTOS.slice(0, 4).concat(PILLAR_1_PHOTOS.slice(0, 2)).map((p, i) => (
              <div
                key={`${p.src}-${i}`}
                className="relative aspect-square rounded ring-1 ring-border/60 overflow-hidden bg-subtle"
              >
                <Image src={p.src} alt="" fill sizes="60px" className="object-cover" />
                <div className="absolute top-1 right-1 inline-flex items-center justify-center w-3 h-3 rounded-full bg-sage" />
              </div>
            ))}
          </div>
        </div>

        {/* Issue log header */}
        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.12em] text-muted">
            Issue log
          </div>
          <div className="mt-2 rounded-lg ring-1 ring-border/60 overflow-hidden text-[13px]">
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-subtle/40 text-[11px] uppercase tracking-[0.1em] text-muted">
              <span className="col-span-3">Raised</span>
              <span className="col-span-6">Summary</span>
              <span className="col-span-3 text-right">Resolved</span>
            </div>
            <div className="grid grid-cols-12 gap-2 px-3 py-2.5">
              <span className="col-span-3 text-muted tabular-nums">May 3, 6:42p</span>
              <span className="col-span-6 text-foreground/85">Paper towels low, N restroom</span>
              <span className="col-span-3 text-right text-sage tabular-nums">+ 38m</span>
            </div>
            <div className="grid grid-cols-12 gap-2 px-3 py-2.5 border-t border-border/60">
              <span className="col-span-3 text-muted tabular-nums">May 19, 7:01p</span>
              <span className="col-span-6 text-foreground/85">Conference B chairs misaligned</span>
              <span className="col-span-3 text-right text-sage tabular-nums">+ 24m</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg ring-1 ring-border/60 bg-subtle/30 px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-[0.1em] text-muted">{label}</div>
      <div className="mt-1 font-serif text-[22px] tabular-nums leading-none">{value}</div>
    </div>
  );
}

function ChatThreadMock() {
  return (
    <figure className="rounded-2xl border border-border/70 bg-background overflow-hidden shadow-[0_24px_60px_-30px_rgba(28,37,32,0.18)]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-subtle/40 text-[12px] text-muted">
        <span>Sarah · facilities at Acme HQ</span>
        <span className="tabular-nums">Today · 5:22 PM</span>
      </div>
      <div className="p-5 md:p-6 space-y-3">
        <Bubble side="left" time="5:22 PM">
          Hi, north restroom is out of paper towels. Can someone restock
          before tomorrow morning?
        </Bubble>
        <Bubble side="right" time="5:24 PM">
          On it. Crew lead is en route, ETA 6:00 PM. I&rsquo;ll text you the
          moment it&rsquo;s restocked.
        </Bubble>
        <Bubble side="right" time="6:02 PM">
          Restocked. Photo will be in next week&rsquo;s service report.
        </Bubble>
      </div>
      <div className="px-5 py-3 border-t border-border/60 bg-subtle/30 flex items-center justify-between text-[12px] text-muted">
        <span>Response time: 2 min · Resolution: 38 min</span>
        <span className="inline-flex items-center gap-1.5 text-sage">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sage" /> Logged in May report
        </span>
      </div>
    </figure>
  );
}

function Bubble({
  side,
  time,
  children,
}: {
  side: "left" | "right";
  time: string;
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-[1.45] ${
          isRight
            ? "bg-accent text-background rounded-br-sm"
            : "bg-subtle text-foreground rounded-bl-sm"
        }`}
      >
        <p>{children}</p>
        <div
          className={`mt-1 text-[11px] tabular-nums ${isRight ? "text-background/60" : "text-muted"}`}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
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
