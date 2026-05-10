"use client";

// We use Next's @next/third-parties for the gtag.js loader, then layer in
// the optional Google Ads conversion tag manually with <Script> when an
// AW-… ID is configured. Keeping both in this one component so the env-gating
// logic lives in one place.

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

export function GoogleAnalytics() {
  return (
    <>
      {GA_ID ? <NextGoogleAnalytics gaId={GA_ID} /> : null}

      {/* Google Ads gtag — only loads if a conversion ID is set AND GA isn't
          already loading the same gtag.js (GA already loads it). When both
          are set, we just register the additional Ads config; gtag.js itself
          is shared. When GA isn't set but Ads is, we have to inject gtag.js
          ourselves. */}
      {ADS_ID && !GA_ID ? (
        <>
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ADS_ID}');
            `}
          </Script>
        </>
      ) : null}

      {ADS_ID && GA_ID ? (
        <Script id="gtag-ads-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('config', '${ADS_ID}');`}
        </Script>
      ) : null}
    </>
  );
}
