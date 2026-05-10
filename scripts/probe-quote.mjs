import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const errors = [], warns = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => {
  const t = m.type(), text = m.text();
  if (t === "error") errors.push("CONSOLE_ERR: " + text);
  if (t === "warning") warns.push("WARN: " + text);
});
await page.goto("http://localhost:3030/quote", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const dump = await page.evaluate(() => {
  const inputs = Array.from(document.querySelectorAll("input")).map(i => ({
    name: i.name, type: i.type, autocomplete: i.autocomplete,
  }));
  const gmp = document.querySelector("gmp-place-autocomplete");
  const placeholder = document.querySelector('[aria-hidden="true"]')?.textContent?.trim().slice(0, 60);
  const scriptKey = (Array.from(document.scripts).find(s => s.src.includes("maps.googleapis"))?.src || "(none)").slice(0, 110);
  return { inputs, hasGmp: !!gmp, gmpInner: gmp ? gmp.outerHTML.slice(0, 200) : null, placeholder, scriptKey };
});
console.log(JSON.stringify(dump, null, 2));
console.log("errors:", errors.length); errors.slice(0, 6).forEach(e => console.log(" ", e));
console.log("warns:", warns.length); warns.slice(0, 6).forEach(w => console.log(" ", w));
await browser.close();
