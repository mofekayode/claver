import Image from "next/image";
import { Container } from "@/components/container";

const photoZones = [
  { label: "Restrooms", src: "/report/restrooms.jpg" },
  { label: "Kitchen", src: "/report/kitchen.jpg" },
  { label: "Conference A", src: "/report/conference-a.jpg" },
  { label: "Open desks", src: "/report/open-desks.jpg" },
  { label: "Entryway", src: "/report/entryway.jpg" },
];

const issues = [
  {
    raised: "May 3 · 6:42 PM",
    summary: "Paper towels low, north restroom",
    response: "34 min",
    resolved: "May 4 · 9:15 AM",
  },
  {
    raised: "May 21 · 7:01 PM",
    summary: "Polish missed, kitchen counter",
    response: "12 min",
    resolved: "May 21 · 8:03 PM",
  },
];

export function ReportMock() {
  return (
    <section className="relative pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden">
      <Container size="wide">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
            What you receive
          </p>
          <h2 className="mt-4 font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
            The monthly service report.
          </h2>
          <p className="mt-5 text-muted">
            Sample shown. Yours lands in your inbox on the 1st of each month,
            ready to forward to leadership without editing.
          </p>
        </div>

        <div className="relative mt-14 md:mt-20 mx-auto max-w-5xl">
          {/* Stacked sheet behind for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-8 -bottom-3 h-10 rounded-2xl bg-foreground/[0.04] blur-sm"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-4 -bottom-1.5 h-8 rounded-2xl bg-background ring-1 ring-border/60"
          />

          <article
            className="relative rounded-2xl bg-white ring-1 ring-border/70 shadow-[0_30px_80px_-20px_rgba(28,37,32,0.18)] overflow-hidden"
            aria-label="Sample monthly service report"
          >
            {/* Header strip */}
            <div className="px-7 md:px-10 py-5 md:py-6 border-b border-border/60 flex items-center justify-between bg-subtle/40">
              <span className="font-serif text-[18px] tracking-tight">
                Claver<span className="text-accent">.</span>
              </span>
              <span className="text-[12px] uppercase tracking-[0.14em] text-muted">
                Monthly service report
              </span>
              <span className="text-[13px] text-muted tabular-nums">
                May 2026
              </span>
            </div>

            <div className="px-7 md:px-10 py-9 md:py-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-muted">
                    Property
                  </p>
                  <h3 className="mt-1.5 font-serif text-[24px] md:text-[28px] tracking-[-0.01em]">
                    Your office · Oakland
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="inline-flex h-2 w-2 rounded-full bg-sage" />
                  <span className="text-muted">All visits verified</span>
                </div>
              </div>

              {/* Stats */}
              <dl className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <Stat label="Visits" value="22" hint="Mon–Fri, 6:30 PM" />
                <Stat label="Issues raised" value="2" hint="Both resolved" />
                <Stat label="Avg response" value="23 min" hint="Target < 1 hr" />
              </dl>

              {/* Photo grid */}
              <div className="mt-12">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-serif text-[18px] md:text-[20px] tracking-[-0.005em]">
                    Photo verification
                  </h4>
                  <span className="text-[12px] uppercase tracking-[0.12em] text-muted">
                    132 photos · 6 zones
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
                  {photoZones.map((z) => (
                    <PhotoTile key={z.label} label={z.label} src={z.src} />
                  ))}
                </div>
              </div>

              {/* Issue log */}
              <div className="mt-12">
                <h4 className="font-serif text-[18px] md:text-[20px] tracking-[-0.005em]">
                  Issue log
                </h4>
                <div className="mt-5 rounded-xl ring-1 ring-border/70 overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-subtle/50 text-[12px] uppercase tracking-[0.12em] text-muted">
                    <div className="col-span-3">Raised</div>
                    <div className="col-span-5">Summary</div>
                    <div className="col-span-2">Response</div>
                    <div className="col-span-2">Resolved</div>
                  </div>
                  <ul className="divide-y divide-border/60">
                    {issues.map((i) => (
                      <li
                        key={i.raised}
                        className="grid md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 text-[14px]"
                      >
                        <div className="md:col-span-3 text-muted tabular-nums">
                          {i.raised}
                        </div>
                        <div className="md:col-span-5 text-foreground/90">
                          {i.summary}
                        </div>
                        <div className="md:col-span-2 text-foreground/80 tabular-nums">
                          {i.response}
                        </div>
                        <div className="md:col-span-2 text-sage tabular-nums">
                          {i.resolved}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer meta */}
              <div className="mt-10 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
                <div>
                  Crew this month:{" "}
                  <span className="text-foreground/85">M. Rodriguez</span>,{" "}
                  <span className="text-foreground/85">A. Tan</span>,{" "}
                  <span className="text-foreground/85">J. Park</span>
                </div>
                <div className="tabular-nums">
                  Generated · June 1, 2026 · 7:00 AM PT
                </div>
              </div>
            </div>
          </article>

        </div>
      </Container>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl ring-1 ring-border/70 bg-subtle/30 px-5 py-5 md:px-6 md:py-6">
      <dt className="text-[12px] uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 font-serif text-[32px] md:text-[40px] tabular-nums tracking-[-0.02em] leading-none">
        {value}
      </dd>
      <p className="mt-2 text-[13px] text-muted">{hint}</p>
    </div>
  );
}

function PhotoTile({ label, src }: { label: string; src: string }) {
  return (
    <div className="relative aspect-4/3 rounded-lg ring-1 ring-border/60 overflow-hidden bg-subtle">
      <Image
        src={src}
        alt={`${label} — verified clean`}
        fill
        sizes="(min-width: 768px) 16vw, 33vw"
        className="object-cover"
      />
      {/* Soft gradient overlay so the label/badge stay legible on bright photos */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-foreground/10"
      />
      <div className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sage text-background ring-1 ring-background/60">
        <CheckIcon className="w-3 h-3" />
      </div>
      <div className="absolute bottom-2 left-2 right-2 text-[11px] md:text-[12px] font-medium text-white drop-shadow-sm">
        {label}
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
