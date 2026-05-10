"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { renderQuoteEmail } from "@/lib/quote-email";

const SQ_FT_OPTIONS = new Set([
  "<2,500",
  "2,500-5,000",
  "5,000-10,000",
  "10,000-25,000",
  "25,000+",
]);

const FREQUENCY_OPTIONS = new Set([
  "Less than 1x/week",
  "1x/week",
  "2-3x/week",
  "Daily",
  "Not sure yet",
]);

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<QuoteField, string>>;
  values?: Partial<Record<QuoteField, string>>;
};

type QuoteField =
  | "businessName"
  | "contactName"
  | "phone"
  | "email"
  | "address"
  | "squareFootage"
  | "frequency"
  | "notes";

const REQUIRED: QuoteField[] = [
  "businessName",
  "contactName",
  "phone",
  "email",
  "address",
  "squareFootage",
  "frequency",
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
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    squareFootage: String(formData.get("squareFootage") ?? "").trim(),
    frequency: String(formData.get("frequency") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
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

  if (values.phone && values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number";
  }

  if (values.squareFootage && !SQ_FT_OPTIONS.has(values.squareFootage)) {
    errors.squareFootage = "Please choose an option";
  }

  if (values.frequency && !FREQUENCY_OPTIONS.has(values.frequency)) {
    errors.frequency = "Please choose an option";
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

async function sendQuoteEmail(
  values: Record<QuoteField, string>,
  submittedAt: Date,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[quote] RESEND_API_KEY missing — skipping email", values);
    return;
  }

  const to = (
    process.env.QUOTE_TO_EMAILS ||
    "mofekayode@gmail.com,hello@claverservices.com"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Until the claverservices.com domain is verified in Resend, send from the
  // Resend onboarding sender. Once verified, set QUOTE_FROM_EMAIL in env.
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
      console.error("[quote] resend error", result.error);
    }
  } catch (err) {
    // Never block the user's submission on email failure — they still
    // get redirected to the thank-you page and can book the walkthrough.
    console.error("[quote] resend send threw", err);
  }
}
