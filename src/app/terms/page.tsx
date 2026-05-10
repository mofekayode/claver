import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse } from "@/components/legal-prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${site.name} website and services.`,
};

export default function TermsPage() {
  return (
    <LegalProse title="Terms of Service" effectiveDate="May 2026">
      <p>
        These Terms of Service (“Terms”) govern your use of the {site.name}{" "}
        website and any services we provide. By using the site or engaging us
        for cleaning services, you agree to these Terms.
      </p>

      <h2>The site</h2>
      <p>
        We provide this website for informational purposes: to describe our
        services, share our story, and let prospective clients reach us.
        Information here is general and may change without notice.
      </p>

      <h2>Quote requests</h2>
      <p>
        Submitting the quote request form is an inquiry, not a binding
        agreement. We will respond, schedule a walkthrough, and send a
        proposal. A signed service agreement is required before any cleaning
        services begin.
      </p>

      <h2>Service agreements</h2>
      <p>
        Cleaning services are governed by a separate written agreement
        between {site.name} and the client, which will define scope, pricing,
        scheduling, term, cancellation, and any service-level commitments. If
        anything in this Terms page conflicts with that agreement, the
        signed agreement controls.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {site.name} name, logo, copy, and design are our property. Don’t
        copy or rebrand them. You’re welcome to link to any page on this
        site.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The website is provided “as is” without warranties of any kind. We
        try hard to keep information accurate but make no guarantees. To the
        fullest extent allowed by law, we disclaim liability for any damages
        arising from your use of the site.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of California,
        without regard to conflict-of-laws rules. Disputes will be resolved
        in the state or federal courts located in Alameda County, California.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms over time. Updates take effect when posted
        here. Continued use of the site after a change means you accept the
        revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={site.emailHref}>{site.email}</a> or call{" "}
        <a href={site.phoneHref} className="tabular-nums">
          {site.phone}
        </a>
        . Also see our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalProse>
  );
}
