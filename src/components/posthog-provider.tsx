"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const KEY =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

function ensureInitialized() {
  if (initialized) return true;
  if (typeof window === "undefined") return false;
  if (!KEY) return false;
  posthog.init(KEY, {
    api_host: HOST,
    // We capture pageviews manually below so we get App Router transitions.
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    autocapture: true,
    // Don't store anything in localStorage that could complicate GDPR if/when
    // we serve EU traffic. Cookies-only is simpler and adequate for analytics.
    persistence: "cookie",
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") {
        ph.debug(false);
      }
    },
  });
  initialized = true;
  return true;
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ensureInitialized()) return;
    const url =
      pathname +
      (searchParams && searchParams.toString() ? `?${searchParams.toString()}` : "");
    posthog.capture("$pageview", { $current_url: window.location.origin + url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Initialize at mount so we get the first pageview even if the route doesn't
  // change before someone interacts. The Suspense wrapper is required because
  // useSearchParams suspends during initial render in Next 16.
  useEffect(() => {
    ensureInitialized();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </>
  );
}

// To track a custom event from any client component, follow PostHog's
// standard pattern:
//
//   "use client";
//   import posthog from "posthog-js";
//   posthog.capture("event_name", { prop: value });
//
// posthog-js queues events called before init completes, so the call is
// safe even if it runs during the first render before our provider's
// useEffect has fired.
