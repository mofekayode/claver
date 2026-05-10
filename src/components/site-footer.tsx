import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-subtle/40">
      <Container size="wide">
        <div className="py-14 md:py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-4 text-[15px] text-muted max-w-sm">
              Tech-enabled commercial cleaning. Verified every visit, with the
              reports to prove it.
            </p>

            <div className="mt-6 flex flex-col gap-1.5 text-[15px]">
              <a
                href={site.phoneHref}
                className="text-foreground hover:text-accent transition-colors tabular-nums"
              >
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="text-muted hover:text-foreground transition-colors"
              >
                {site.email}
              </a>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-[13px] text-muted">
              <LeafIcon className="w-4 h-4 text-sage" />
              <span>Licensed and insured</span>
              <span aria-hidden="true">·</span>
              <a
                href="/insurance-certificate.pdf"
                className="underline-offset-4 hover:underline"
              >
                Certificate
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <FooterHeading>Company</FooterHeading>
            <ul className="mt-4 space-y-3 text-[15px]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Request a quote
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <FooterHeading>Service areas</FooterHeading>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-foreground/80">
              {site.serviceAreas.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/70 py-6 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3 text-[13px] text-muted">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[12px] uppercase tracking-[0.12em] text-muted/80 font-medium"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      {children}
    </h3>
  );
}

function LeafIcon({ className }: { className?: string }) {
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
      <path d="M20 4c-7 0-13 4-13 12 0 2 1 4 1 4s2 1 4 1c8 0 12-6 12-13V4h-4z" />
      <path d="M7 20c2-5 6-9 11-11" />
    </svg>
  );
}
