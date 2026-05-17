"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Fires once per paid-landing-page mount so we can segment PostHog / GA4
 * funnels by which LP a visitor entered through.
 *
 * Property name `paid_landing_view` is a custom event; queryable via:
 *   SELECT properties.city, count() FROM events
 *   WHERE event = 'paid_landing_view'
 *   GROUP BY properties.city
 */
export function PaidLandingTracker({
  slug,
  city,
}: {
  slug: string;
  city: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    posthog.capture("paid_landing_view", { slug, city });

    sendGAEvent("event", "paid_landing_view", {
      paid_landing_slug: slug,
      paid_landing_city: city,
    });
  }, [slug, city]);
  return null;
}
