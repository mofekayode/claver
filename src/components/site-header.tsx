import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70 border-b border-border/60">
      <Container size="wide">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Wordmark />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-8 text-[15px] text-muted"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/4 transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
            </a>
            <a
              href={site.phoneHref}
              className="hidden md:inline text-[15px] text-muted hover:text-foreground transition-colors tabular-nums"
            >
              {site.phone}
            </a>
            <Button href="/quote" size="md">
              Get a quote
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
