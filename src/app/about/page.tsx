import type { Metadata } from "next";
import { Container } from "@/components/container";
import { FinalCta } from "@/components/sections/final-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why we started ${site.name}, and what we’re trying to fix in commercial cleaning.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 md:pt-28 pb-16 md:pb-20">
        <Container size="narrow">
          <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
            About {site.shortName}
          </p>
          <h1 className="mt-4 font-serif text-[44px] md:text-[60px] leading-[1.05] tracking-[-0.02em]">
            We started this because the bar was on the floor.
          </h1>
          <p className="mt-7 text-[19px] md:text-[20px] text-foreground/85 leading-[1.55]">
            Anyone who’s managed a commercial space knows the cycle. You hire
            a cleaner. They’re great for two months. Then a message arrives
            at 8:42 a.m. The bathrooms didn’t get touched. You email. You
            wait. You start checking corners yourself.
          </p>

          <div className="mt-12 space-y-7 text-[17px] text-foreground/80 leading-[1.7]">
            <p>
              We didn’t want to build another cleaning company. We wanted to
              build the one that ends that cycle. The premise is simple: if a
              clean isn’t verified, it didn’t happen. And the burden of proof
              should be ours, not yours.
            </p>
            <p>
              That means photos that confirm every visit met your standard.
              Reports that say what was done and who did it. A real human you
              can text who answers in under an hour. Nothing fancy. Just the
              service the industry should have been delivering for decades.
            </p>
            <p>
              We’re a Bay Area company. We pay our people fairly, we carry
              real liability coverage, and we treat every quote like the
              start of a five-year relationship. We’re building this company
              one walkthrough at a time, and we’d rather earn your business
              with the first clean than impress you with the marketing.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-border/70 sm:grid-cols-3 rounded-2xl overflow-hidden border border-border/70">
            <Value title="Verifiable" body="If we can’t prove it happened, it didn’t." />
            <Value title="Considerate" body="We work around your team, not over them." />
            <Value title="Durable" body="We design programs to outlast turnover, yours and ours." />
          </div>
        </Container>
      </section>

      <FounderNote />

      <FinalCta />
    </>
  );
}

function Value({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-background p-7 md:p-8">
      <h3 className="font-serif text-[20px] tracking-[-0.01em]">{title}</h3>
      <p className="mt-2 text-[15px] text-muted leading-[1.55]">{body}</p>
    </div>
  );
}

function FounderNote() {
  const { founder, email, emailHref } = site;
  return (
    <section className="border-t border-border/60 bg-subtle/30 py-20 md:py-24">
      <Container size="narrow">
        <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
          A note from the founder
        </p>

        <div className="mt-6 flex items-center gap-5">
          <div
            aria-hidden="true"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent text-background flex items-center justify-center font-serif text-[24px] md:text-[26px] tracking-[-0.01em] ring-1 ring-border/40"
          >
            {founder.initials}
          </div>
          <div>
            <div className="font-serif text-[20px] md:text-[22px] tracking-[-0.01em]">
              {founder.name}
            </div>
            <div className="text-[14px] text-muted">
              {founder.title}, {site.name}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-5 text-[17px] text-foreground/85 leading-[1.7]">
          <p>
            I started {site.shortName} because I kept hearing the same story
            from friends who run offices, clinics, and small studios. They’d
            hire a cleaning company, things would be great for two months,
            then quality would slowly slip. By month four they were checking
            corners themselves. By month six they were quietly looking for a
            replacement.
          </p>
          <p>
            The problem isn’t that cleaners are lazy. It’s that nobody is
            watching. Most cleaning companies don’t have systems to catch
            quality drift, so it falls on the customer to notice. That’s
            backwards.
          </p>
          <p>
            {site.shortName} is built so the burden of proof sits with us.
            Every visit is photo-verified. Every issue is logged with a
            response time. Every month, you get a report you can forward
            without editing.
          </p>
          <p>
            If something is ever off, my email is on this page.{" "}
            <a
              href={emailHref}
              className="text-accent hover:text-accent-hover underline-offset-4 hover:underline"
            >
              {email}
            </a>
            . I’d rather hear from you directly than have you discover the
            problem by walking the building.
          </p>
        </div>
      </Container>
    </section>
  );
}
