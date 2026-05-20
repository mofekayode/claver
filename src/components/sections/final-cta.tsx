import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <Container size="wide">
        <div className="rounded-3xl bg-accent text-background overflow-hidden relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 0, transparent 35%), radial-gradient(circle at 80% 70%, white 0, transparent 30%)",
            }}
          />
          <div className="relative px-8 py-16 md:px-16 md:py-24 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-[13px] uppercase tracking-[0.14em] text-background/70">
                Ready when you are
              </p>
              <h2 className="mt-4 font-serif text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.02em] text-background">
                Get a quote in 24 hours.
              </h2>
              <p className="mt-5 max-w-lg text-background/80 text-[17px] leading-[1.55]">
                Tell us about your space. We’ll come walk it, write a quote
                tailored to your building, and stand behind every visit.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col md:items-end gap-4 md:gap-3 md:text-right">
              <Link
                href="/quote"
                className="inline-flex h-13 items-center justify-center rounded-full px-7 bg-background text-foreground font-medium text-base hover:bg-background/90 transition-colors"
              >
                Request a quote
              </Link>
              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-center sm:self-auto md:self-end text-background/80 hover:text-background transition-colors"
              >
                or book a walkthrough
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
