import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
const allReq = [];
page.on("pageerror", (e) => errors.push("PE: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("CE: " + m.text()); });
page.on("request", (r) => {
  const u = r.url();
  if (u.includes("googletagmanager.com") || u.includes("google-analytics.com")) {
    allReq.push(r.url());
  }
});
console.log("=== homepage (no Calendly) ===");
await page.goto("http://localhost:3030/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
console.log("home: ga requests:", allReq.length);
allReq.forEach(u => console.log(" ", u.slice(0, 130)));
allReq.length = 0;
console.log("\n=== /quote/thank-you (Calendly iframe present) ===");
await page.goto("http://localhost:3030/quote/thank-you?name=X&email=x@x.com", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log("thank-you: ga requests:", allReq.length);
allReq.forEach(u => console.log(" ", u.slice(0, 130)));
console.log("\nerrors:", errors.length);
await browser.close();
