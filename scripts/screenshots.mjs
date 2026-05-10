import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3030";
const OUT = "screenshots";
const MODES = (process.env.MODES ?? "desktop,mobile").split(",");

const ROUTES = [
  { path: "/", slug: "home" },
  { path: "/quote", slug: "quote" },
  { path: "/how-it-works", slug: "how-it-works" },
  { path: "/services", slug: "services" },
  { path: "/about", slug: "about" },
  { path: "/privacy", slug: "privacy" },
  { path: "/terms", slug: "terms" },
];

const PROFILES = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3 },
};

async function captureRoute(page, profileName, vp, { path, slug }) {
  const url = BASE + path;
  console.log(`[${profileName}] → ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForLoadState("networkidle");
  await page.evaluate(() =>
    document.fonts ? document.fonts.ready : Promise.resolve(),
  );

  const totalHeight = await page.evaluate(() =>
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
    ),
  );

  const vh = vp.height;
  const chunks = Math.ceil(totalHeight / vh);
  console.log(
    `  page is ${totalHeight}px tall — ${chunks} viewport-sized screenshots`,
  );

  for (let i = 0; i < chunks; i++) {
    const y = i * vh;
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(150);
    const out = join(
      OUT,
      profileName,
      `${slug}-${String(i + 1).padStart(2, "0")}.png`,
    );
    await page.screenshot({
      path: out,
      clip: { x: 0, y: 0, width: vp.width, height: vh },
    });
    console.log(`  ✓ ${out}`);
  }
}

async function runProfile(browser, profileName) {
  const vp = PROFILES[profileName];
  if (!vp) throw new Error(`unknown profile: ${profileName}`);
  await mkdir(join(OUT, profileName), { recursive: true });

  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: profileName === "mobile",
    hasTouch: profileName === "mobile",
  });
  const page = await context.newPage();
  try {
    for (const route of ROUTES) {
      await captureRoute(page, profileName, vp, route);
    }
  } finally {
    await context.close();
  }
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  const browser = await chromium.launch();
  try {
    for (const profile of MODES) {
      await runProfile(browser, profile.trim());
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
