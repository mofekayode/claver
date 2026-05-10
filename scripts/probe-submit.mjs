import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push("PE: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("CE: " + m.text()); });

await page.goto("http://localhost:3030/quote", { waitUntil: "networkidle" });
await page.waitForSelector('input[name="businessName"]');

await page.fill('input[name="businessName"]', "E2E Test Co");
await page.fill('input[name="contactName"]', "Mofe E2E");
await page.fill('input[name="phone"]', "5106891362");
await page.fill('input[name="email"]', "mofekayode@gmail.com");
await page.fill('input[name="address"]', "1234 Broadway, Oakland, CA");
await page.click('label:has-text("5,000-10,000")');
await page.click('label:has-text("2-3x/week")');
await page.fill('textarea[name="notes"]', "End-to-end pipeline test from headless browser. Glass entry, after-hours access via lobby code.");

await page.click('button[type="submit"]');

// Wait for redirect to thank-you page
await page.waitForURL(/\/quote\/thank-you/, { timeout: 15000 });
const url = page.url();
const heading = await page.locator("h1").first().textContent();

console.log("✓ form submitted");
console.log("  redirected to:", url);
console.log("  page heading:", heading);
console.log("  errors:", errors.length);
errors.slice(0, 5).forEach((e) => console.log("   ", e));
await browser.close();
