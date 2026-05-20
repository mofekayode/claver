"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

/**
 * Paths where the primary nav links and the "Book a walkthrough" link are
 * hidden so paid visitors stay focused on the form. The Claver logo and
 * "Get a quote" button still render.
 */
const PATHS_WITHOUT_NAV = new Set(["/east-bay-commercial-cleaning"]);

export function SiteHeader() {
  const pathname = usePathname();
  const hideNav = PATHS_WITHOUT_NAV.has(pathname);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70 border-b border-border/60">
      <Container size="wide">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Wordmark />
          </Link>

          {hideNav ? null : (
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
          )}

          <div className="flex items-center gap-3 sm:gap-4">
            {hideNav ? null : (
              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline text-[15px] text-muted hover:text-foreground transition-colors"
              >
                Book a walkthrough
              </a>
            )}
            <Button href={hideNav ? "#quote-form" : "/quote"} size="md">
              Get a quote
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
