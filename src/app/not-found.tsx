import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container size="narrow">
        <p className="font-serif text-[80px] md:text-[110px] leading-none tracking-[-0.04em] text-accent">
          404
        </p>
        <h1 className="mt-6 font-serif text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em]">
          We couldn’t find that page.
        </h1>
        <p className="mt-5 text-[17px] text-muted leading-[1.55] max-w-lg">
          The link may be old or the page may have moved. Try one of these
          instead, or get in touch and we’ll point you the right way.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            Get a free quote
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-14 pt-8 border-t border-border/70">
          <p className="text-[12px] uppercase tracking-[0.14em] text-muted">
            Popular pages
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-[15px]">
            {[
              { href: "/services", label: "Services" },
              { href: "/how-it-works", label: "How we work" },
              { href: "/about", label: "About" },
              { href: "/quote", label: "Request a quote" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 py-1 text-foreground/80 hover:text-accent transition-colors"
                >
                  <span aria-hidden="true" className="text-accent/60">
                    →
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-[14px] text-muted">
          Still stuck? Email us at{" "}
          <a
            href={site.emailHref}
            className="text-foreground hover:text-accent transition-colors"
          >
            {site.email}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
