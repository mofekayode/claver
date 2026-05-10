import { Container } from "@/components/container";

export function LegalProse({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container size="narrow">
        <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
          Legal
        </p>
        <h1 className="mt-4 font-serif text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mt-3 text-[14px] text-muted">
          Effective {effectiveDate}
        </p>

        <div
          className="
            mt-12 max-w-2xl
            text-[16px] leading-[1.7] text-foreground/85
            [&_h2]:font-serif [&_h2]:text-[24px] [&_h2]:tracking-[-0.01em] [&_h2]:mt-12 [&_h2]:mb-3
            [&_h3]:font-serif [&_h3]:text-[19px] [&_h3]:mt-8 [&_h3]:mb-2
            [&_p]:my-4
            [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
            [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline
          "
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
