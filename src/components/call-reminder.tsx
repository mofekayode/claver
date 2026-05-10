import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function CallReminder() {
  return (
    <section
      aria-label="Contact"
      className="border-t border-border/60 py-8 md:py-10"
    >
      <Container size="wide">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[15px] md:text-[16px] text-foreground/80">
            Need to talk to a human?{" "}
            <a
              href={site.phoneHref}
              className="text-foreground font-medium tabular-nums hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Call {site.phone}
            </a>
            <span className="text-muted"> · {site.hours}</span>
          </p>
          <a
            href={site.emailHref}
            className="text-[15px] text-muted hover:text-foreground transition-colors"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
