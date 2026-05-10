import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
const all = [];
page.on("request", (r) => {
  if (r.url().includes("i.posthog.com")) all.push(r.url());
});
const cmsg = [];
page.on("console", (m) => cmsg.push(`[${m.type()}] ${m.text().slice(0, 200)}`));

await page.goto("http://localhost:3030/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const probe = await page.evaluate(() => {
  // Try various ways to access posthog
  return {
    windowPosthog: typeof window.posthog,
    posthogModule: !!window.posthog,
    bodyHasPosthogScript: !!document.querySelector('script[src*="posthog"]'),
    headHasPosthogScript: !!document.querySelector('head script[src*="posthog"]'),
    distinctIdCookie: document.cookie.split(";").find(c => c.trim().startsWith("ph_")),
  };
});
console.log("probe:", JSON.stringify(probe, null, 2));
console.log("\nrequests to i.posthog.com:");
all.forEach(u => console.log(" ", u.slice(0, 240)));
console.log("\nconsole messages mentioning posthog:");
cmsg.filter(m => /posthog/i.test(m)).forEach(m => console.log(" ", m));
await browser.close();
