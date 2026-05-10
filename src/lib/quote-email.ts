import { site } from "@/lib/site";
import {
  emailShell,
  emailEyebrow,
  emailHeading,
  emailSubhead,
  emailTable,
  emailNotes,
  emailCallout,
  formatPacificDateTime,
  escapeHtml,
  type EmailRow,
} from "@/lib/emails/layout";

type QuoteValues = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  squareFootage: string;
  frequency: string;
  notes: string;
};

export function renderQuoteEmail(values: QuoteValues, submittedAt: Date) {
  const subject = `New quote request — ${values.businessName} (${values.squareFootage} · ${values.frequency})`;

  const text = [
    `New quote request — ${site.name}`,
    "",
    `Business:        ${values.businessName}`,
    `Contact:         ${values.contactName}`,
    `Phone:           ${values.phone}`,
    `Email:           ${values.email}`,
    `Address:         ${values.address}`,
    `Square footage:  ${values.squareFootage}`,
    `Frequency:       ${values.frequency}`,
    "",
    "Notes:",
    values.notes ? values.notes : "(none)",
    "",
    `Submitted: ${formatPacificDateTime(submittedAt)} PT`,
  ].join("\n");

  const phoneDigits = values.phone.replace(/\D/g, "");
  const firstName = values.contactName.split(" ")[0] || values.contactName;

  const rows: EmailRow[] = [
    { label: "Business", value: values.businessName },
    { label: "Contact", value: values.contactName },
    {
      label: "Phone",
      value: `<a href="tel:${phoneDigits}" style="color:#1f4632;text-decoration:none;">${escapeHtml(values.phone)}</a>`,
      isHtml: true,
    },
    {
      label: "Email",
      value: `<a href="mailto:${escapeHtml(values.email)}" style="color:#1f4632;text-decoration:none;">${escapeHtml(values.email)}</a>`,
      isHtml: true,
    },
    { label: "Address", value: values.address },
    { label: "Square footage", value: values.squareFootage },
    { label: "Frequency", value: values.frequency },
  ];

  const body = [
    emailEyebrow("New quote request"),
    emailHeading(values.businessName),
    emailSubhead(`${values.squareFootage} · ${values.frequency}`),
    emailTable(rows),
    emailNotes("Notes", values.notes),
    emailCallout(
      `Reply directly to this email to reach ${escapeHtml(firstName)}. SLA: respond within one business day.`,
    ),
  ].join("\n");

  const html = emailShell(body, {
    preheader: `${values.businessName} · ${values.squareFootage} · ${values.frequency}`,
    footerNote: `Submitted ${formatPacificDateTime(submittedAt)} PT`,
  });

  return { subject, text, html };
}
