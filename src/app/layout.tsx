import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import { CallReminder } from "@/components/call-reminder";
import { PostHogProvider } from "@/components/posthog-provider";
import { GoogleAnalytics } from "@/components/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const SITE_NAME = "Claver Services";
const SITE_DESCRIPTION =
  "Tech-enabled commercial cleaning. Photo verification every visit, monthly service reports, 24-hour issue resolution.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.claverservices.com"),
  title: {
    default: `${SITE_NAME} · Commercial cleaning that proves itself`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} · Commercial cleaning that proves itself`,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Commercial cleaning that proves itself`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocalBusinessSchema />
        <PostHogProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <CallReminder />
          <SiteFooter />
        </PostHogProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
