"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { sendGAEvent } from "@next/third-parties/google";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the conversion event for the quote-form flow exactly once per
 * thank-you page mount, across every analytics destination we're wired to:
 *
 *   - PostHog (primary product analytics)
 *   - GA4 via @next/third-parties (when NEXT_PUBLIC_GA_MEASUREMENT_ID set)
 *   - Google Ads conversion (when NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID + LABEL set)
 *
 * Properties stay PII-light: only booleans, never the email/name itself.
 */
export function ThankYouTracker({
  email,
  name,
}: {
  email?: string;
  name?: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const props = {
      has_name: Boolean(name),
      has_email: Boolean(email),
    };

    // PostHog
    posthog.capture("quote_submitted", props);

    // GA4 — sendGAEvent is a no-op if GoogleAnalytics isn't mounted
    sendGAEvent("event", "generate_lead", {
      ...props,
      // GA4 recommends a currency + value for lead events even when zero.
      // Setting to 0 keeps the event valid without distorting revenue charts.
      currency: "USD",
      value: 0,
    });

    // Google Ads conversion (separate from GA4 — fires only if both ID + label
    // are configured). Format: gtag('event','conversion',{send_to:'AW-XXX/LBL'})
    if (ADS_ID && ADS_LABEL && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: `${ADS_ID}/${ADS_LABEL}`,
      });
    }
  }, [email, name]);
  return null;
}
