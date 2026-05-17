import { site } from "@/lib/site";
import {
  emailShell,
  emailEyebrow,
  emailHeading,
  emailTable,
  emailCallout,
  formatPacificDateTime,
  escapeHtml,
  type EmailRow,
} from "@/lib/emails/layout";

type QuoteValues = {
  businessName: string;
  contactName: string;
  email: string;
  address: string;
};

export function renderQuoteEmail(values: QuoteValues, submittedAt: Date) {
  const subject = `New quote request — ${values.businessName}`;

  const text = [
    `New quote request — ${site.name}`,
    "",
    `Business:        ${values.businessName}`,
    `Contact:         ${values.contactName}`,
    `Email:           ${values.email}`,
    `Address:         ${values.address}`,
    "",
    `Submitted: ${formatPacificDateTime(submittedAt)} PT`,
  ].join("\n");

  const firstName = values.contactName.split(" ")[0] || values.contactName;

  const rows: EmailRow[] = [
    { label: "Business", value: values.businessName },
    { label: "Contact", value: values.contactName },
    {
      label: "Email",
      value: `<a href="mailto:${escapeHtml(values.email)}" style="color:#1f4632;text-decoration:none;">${escapeHtml(values.email)}</a>`,
      isHtml: true,
    },
    { label: "Address", value: values.address },
  ];

  const body = [
    emailEyebrow("New quote request"),
    emailHeading(values.businessName),
    emailTable(rows),
    emailCallout(
      `Reply directly to this email to reach ${escapeHtml(firstName)}. SLA: respond within one business day. Square footage, frequency, and other scope details will be captured on the walkthrough call.`,
    ),
  ].join("\n");

  const html = emailShell(body, {
    preheader: `${values.businessName} · ${values.address}`,
    footerNote: `Submitted ${formatPacificDateTime(submittedAt)} PT`,
  });

  return { subject, text, html };
}
