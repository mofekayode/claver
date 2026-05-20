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
            Prefer to talk first?{" "}
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Book a 30-min walkthrough
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
