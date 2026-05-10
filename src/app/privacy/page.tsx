import type { Metadata } from "next";
import Link from "next/link";
import { LegalProse } from "@/components/legal-prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalProse title="Privacy Policy" effectiveDate="May 2026">
      <p>
        This Privacy Policy describes how {site.name} (“we,” “us,” or “our”)
        collects, uses, and shares information when you visit our website,
        request a quote, or do business with us. We treat your information
        the way we expect ours to be treated.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you request a quote or contact us, you choose to share your name,
        business name, phone number, email, building address, and any details
        you include in the “anything we should know” field. We collect that
        information solely to respond to your request.
      </p>
      <p>
        When you visit the website, we automatically receive standard server
        logs (IP address, browser, pages viewed, timestamps) and we may use
        privacy-respecting analytics to understand which pages are useful.
        We do not sell this data.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to quote requests and schedule walkthroughs.</li>
        <li>To deliver and improve our cleaning service if you become a client.</li>
        <li>To send service-related communications (reports, scheduling, billing).</li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers who help us run the
        business (for example, our scheduling, email, and accounting tools),
        and only as needed for them to do their work. We do not sell or rent
        your information.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        We use a small number of cookies for essentials like remembering form
        state and preferences. If we use analytics, it is configured to avoid
        collecting personally identifiable information beyond what is needed
        to count visits.
      </p>

      <h2>Your choices</h2>
      <p>
        You can request access to, correction of, or deletion of your
        information at any time by emailing{" "}
        <a href={site.emailHref}>{site.email}</a>. If you’re a California
        resident, you have additional rights under the CCPA, including the
        right to know what we collect and to request deletion.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards to protect your information, but no
        system is perfectly secure. If you believe your information has been
        compromised, please contact us immediately.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href={site.emailHref}>{site.email}</a> or call{" "}
        <a href={site.phoneHref} className="tabular-nums">
          {site.phone}
        </a>
        . You can also review our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalProse>
  );
}
