"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { renderQuoteEmail } from "@/lib/quote-email";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<QuoteField, string>>;
  values?: Partial<Record<QuoteField, string>>;
};

type QuoteField = "businessName" | "contactName" | "email" | "address";

const REQUIRED: QuoteField[] = [
  "businessName",
  "contactName",
  "email",
  "address",
];

export async function submitQuote(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot: real users never see/fill the "website" field. If a submission
  // has it set, silently pretend success so the bot moves on without retry,
  // but never deliver, log, or email anything.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot.length > 0) {
    console.warn("[quote] honeypot tripped, ignoring submission");
    redirect("/quote/thank-you");
  }

  const values: Record<QuoteField, string> = {
    businessName: String(formData.get("businessName") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
  };

  const errors: Partial<Record<QuoteField, string>> = {};

  for (const field of REQUIRED) {
    if (!values[field]) {
      errors[field] = "Required";
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const submittedAt = new Date();

  // Belt-and-suspenders: capture the full submission as a PostHog event
  // BEFORE the email send. If Resend ever fails again (as it did silently
  // for the empty-API-key case on 2026-05-24), every form field is still
  // recoverable from PostHog. The thank-you redirect only carries name +
  // email — businessName and address would otherwise be lost.
  await capturePostHogServerEvent(values, submittedAt);

  // Email via Resend (primary delivery path).
  await sendQuoteEmail(values, submittedAt);

  // Optional webhook fan-out (e.g. Zapier/n8n) — kept as a side channel.
  const webhook = process.env.QUOTE_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          submittedAt: submittedAt.toISOString(),
          source: "cleanco-web/quote",
        }),
      });
    } catch (err) {
      console.error("[quote] webhook delivery failed", err);
    }
  }

  const params = new URLSearchParams({
    name: values.contactName,
    email: values.email,
  });
  redirect(`/quote/thank-you?${params.toString()}`);
}

/**
 * Server-side PostHog capture so every form submission lands in PostHog
 * with the FULL field set, regardless of what happens with the email path.
 * Uses the public capture endpoint with the project token; the token is
 * the same value already exposed to the client via NEXT_PUBLIC_*.
 */
async function capturePostHogServerEvent(
  values: Record<QuoteField, string>,
  submittedAt: Date,
) {
  const token =
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!token) {
    console.error(
      "[quote][POSTHOG_FAILURE] PostHog token missing — full payload not captured",
      JSON.stringify({
        reason: "missing_token",
        businessName: values.businessName,
        email: values.email,
      }),
    );
    return;
  }
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    const res = await fetch(`${host}/capture/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: ctrl.signal,
      body: JSON.stringify({
        api_key: token,
        event: "quote_submitted_server",
        distinct_id: values.email,
        timestamp: submittedAt.toISOString(),
        properties: {
          businessName: values.businessName,
          contactName: values.contactName,
          email: values.email,
          address: values.address,
          submittedAt: submittedAt.toISOString(),
          source: "cleanco-web/quote/actions",
          $process_person_profile: false,
        },
      }),
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.error(
        "[quote][POSTHOG_FAILURE] capture returned non-2xx",
        JSON.stringify({ status: res.status, businessName: values.businessName }),
      );
    }
  } catch (err) {
    // Never block the submission on PostHog. Log loudly so we know.
    console.error(
      "[quote][POSTHOG_FAILURE] capture threw",
      JSON.stringify({
        error: err instanceof Error ? { name: err.name, message: err.message } : String(err),
        businessName: values.businessName,
        email: values.email,
      }),
    );
  }
}

async function sendQuoteEmail(
  values: Record<QuoteField, string>,
  submittedAt: Date,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Loud + structured so Vercel function logs / log drains can alert on it.
    console.error(
      "[quote][EMAIL_FAILURE] RESEND_API_KEY is missing or empty",
      JSON.stringify({
        reason: "missing_api_key",
        businessName: values.businessName,
        email: values.email,
        submittedAt: submittedAt.toISOString(),
      }),
    );
    return;
  }

  const to = (
    process.env.QUOTE_TO_EMAILS ||
    "mofekayode@gmail.com,hello@claverservices.com"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const from = process.env.QUOTE_FROM_EMAIL
    ? `Claver <${process.env.QUOTE_FROM_EMAIL}>`
    : "Claver <onboarding@resend.dev>";

  const { subject, html, text } = renderQuoteEmail(values, submittedAt);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject,
      html,
      text,
    });
    if (result.error) {
      console.error(
        "[quote][EMAIL_FAILURE] Resend returned an error",
        JSON.stringify({
          reason: "resend_api_error",
          error: result.error,
          businessName: values.businessName,
          email: values.email,
        }),
      );
    } else {
      console.log(
        "[quote] email delivered",
        JSON.stringify({ id: result.data?.id, businessName: values.businessName }),
      );
    }
  } catch (err) {
    // Never block the user's submission on email failure — they still
    // get redirected to the thank-you page and can book the walkthrough.
    console.error(
      "[quote][EMAIL_FAILURE] Resend send threw",
      JSON.stringify({
        reason: "thrown_exception",
        error: err instanceof Error ? { name: err.name, message: err.message } : String(err),
        businessName: values.businessName,
        email: values.email,
      }),
    );
  }
}
