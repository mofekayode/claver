"use client";

import Script from "next/script";

export function CalendlyEmbed({
  url,
  prefill,
}: {
  url: string;
  prefill?: { name?: string; email?: string };
}) {
  const params = new URLSearchParams();
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);
  params.set("hide_event_type_details", "1");
  params.set("hide_gdpr_banner", "1");
  params.set("primary_color", "1f4632");
  params.set("text_color", "1c2520");
  params.set("background_color", "faf8f5");

  const widgetUrl = `${url}?${params.toString()}`;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        className="calendly-inline-widget rounded-2xl overflow-hidden ring-1 ring-border/70"
        data-url={widgetUrl}
        style={{ minWidth: "320px", height: "720px" }}
      />
    </>
  );
}
