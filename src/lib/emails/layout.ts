// Reusable HTML email building blocks for Claver client communication.
//
// All emails (quote requests, walkthrough confirmations, monthly reports,
// issue alerts, etc.) compose from these primitives. They share the same
// warm-cream shell, brand wordmark, and color tokens as the marketing site,
// so the brand reads consistently across every touchpoint.
//
// Each function returns an HTML string. Compose by concatenating.

import { site } from "@/lib/site";

const COLORS = {
  background: "#faf8f5",
  foreground: "#1c2520",
  muted: "#525a55",
  subtle: "#f0ebe3",
  accent: "#1f4632",
  border: "#e6e1d7",
  white: "#ffffff",
  metaText: "#8a8f8a",
};

const FONT_SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const FONT_SERIF = "Georgia,'Times New Roman',serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Wraps any inner HTML in the brand email shell:
 * - Warm-cream body background
 * - 560px max-width
 * - Claver wordmark at the top
 * - Site URL in the footer
 *
 * Pass `preheader` to set the inbox preview text (the snippet shown in
 * the inbox preview pane next to the subject line).
 */
export function emailShell(
  content: string,
  options: { preheader?: string; footerNote?: string } = {},
): string {
  const preheader = options.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${COLORS.background};">${escapeHtml(options.preheader)}</div>`
    : "";

  const footerNote = options.footerNote
    ? `<div style="margin-top:12px;font-size:12px;color:${COLORS.metaText};">${escapeHtml(options.footerNote)}</div>`
    : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${COLORS.background};font-family:${FONT_SANS};color:${COLORS.foreground};">
    ${preheader}
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <div style="font-family:${FONT_SERIF};font-size:22px;font-weight:600;letter-spacing:-0.02em;">
        ${site.shortName}<span style="color:${COLORS.accent};">.</span>
      </div>
      ${content}
      <div style="margin-top:32px;font-size:12px;color:${COLORS.metaText};">
        ${escapeHtml(site.name)} · <a href="${site.url}" style="color:${COLORS.metaText};text-decoration:underline;">${site.url.replace(/^https?:\/\//, "")}</a>
      </div>
      ${footerNote}
    </div>
  </body>
</html>`;
}

/** Small uppercase tracked label. Use above an `emailHeading`. */
export function emailEyebrow(text: string): string {
  return `<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${COLORS.accent};margin-top:24px;">${escapeHtml(text)}</div>`;
}

/** Serif h1, large display heading. */
export function emailHeading(text: string): string {
  return `<h1 style="font-family:${FONT_SERIF};font-size:28px;line-height:1.15;letter-spacing:-0.02em;margin:8px 0 6px;color:${COLORS.foreground};">${escapeHtml(text)}</h1>`;
}

/** Subline directly under heading, muted color. */
export function emailSubhead(text: string): string {
  return `<div style="color:${COLORS.muted};font-size:14px;">${escapeHtml(text)}</div>`;
}

/** Body paragraph, default size, muted-ish for prose. */
export function emailParagraph(html: string): string {
  return `<p style="margin:16px 0;font-size:15px;line-height:1.6;color:${COLORS.foreground};">${html}</p>`;
}

/** Section divider with optional small label. */
export function emailDivider(label?: string): string {
  if (label) {
    return `<div style="margin:32px 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:0.10em;color:${COLORS.muted};border-top:1px solid ${COLORS.border};padding-top:16px;">${escapeHtml(label)}</div>`;
  }
  return `<div style="margin:32px 0;border-top:1px solid ${COLORS.border};"></div>`;
}

export type EmailRow = {
  label: string;
  /** Plain text, will be HTML-escaped. To pass raw HTML, set `isHtml: true`. */
  value: string;
  isHtml?: boolean;
};

/** Two-column label/value table inside a rounded white card. */
export function emailTable(rows: EmailRow[]): string {
  const inner = rows
    .map(
      ({ label, value, isHtml }) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid ${COLORS.border};color:${COLORS.muted};font-size:13px;text-transform:uppercase;letter-spacing:0.08em;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid ${COLORS.border};color:${COLORS.foreground};font-size:15px;">${isHtml ? value : escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;border-collapse:collapse;background:${COLORS.white};border:1px solid ${COLORS.border};border-radius:12px;overflow:hidden;">${inner}</table>`;
}

/**
 * Pre-formatted notes block with an eyebrow label.
 * Renders nothing if `text` is falsy.
 */
export function emailNotes(label: string, text: string | undefined | null): string {
  if (!text) return "";
  return `
    <div style="margin-top:24px;padding:18px 20px;background:${COLORS.subtle};border-radius:12px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.10em;color:${COLORS.muted};margin-bottom:8px;">${escapeHtml(label)}</div>
      <div style="font-size:15px;color:${COLORS.foreground};line-height:1.55;white-space:pre-wrap;">${escapeHtml(text)}</div>
    </div>`;
}

/** Solid forest-green callout box for SLAs, calls to action, key info. */
export function emailCallout(text: string): string {
  return `
    <div style="margin-top:28px;padding:18px 20px;background:${COLORS.accent};color:${COLORS.background};border-radius:12px;">
      <div style="font-size:14px;line-height:1.55;">${text}</div>
    </div>`;
}

/** Pill button. Use sparingly; not all email clients render colored buttons well. */
export function emailButton(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:${COLORS.accent};color:${COLORS.background};font-size:15px;font-weight:500;text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a>`;
}

/** Format a Date for the small "submitted at" footer text. */
export function formatPacificDateTime(d: Date): string {
  return d.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
    timeStyle: "short",
  });
}
