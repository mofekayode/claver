import type { Metadata } from "next";
import { Container } from "@/components/container";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us about your space. We’ll come walk it within 24 hours and send a tailored quote the same week.",
};

export default function QuotePage() {
  return (
    <section className="py-16 md:py-24">
      <Container size="narrow">
        <div className="max-w-xl">
          <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
            Request a quote
          </p>
          <h1 className="mt-4 font-serif text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
            Tell us about your space.
          </h1>
          <p className="mt-5 text-muted text-[17px] leading-[1.55]">
            Free walkthrough within 24 hours. Custom quote the same week. No
            pressure, no auto-renewal traps.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
