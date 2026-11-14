/**
 * Local QA helper (not part of the production build).
 * Captures desktop + mobile screenshots and checks for console errors,
 * broken images, horizontal overflow and page metadata.
 *
 * Usage: node scripts/preview-dist.mjs 4174   (in another terminal)
 *        QA_BASE_URL=http://localhost:4174 node scripts/qa-screenshots.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const BASE = process.env.QA_BASE_URL || 'http://localhost:4174';
const OUT = path.resolve('qa');
const CHROME =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { path: '/', name: 'home' },
  { path: '/our-systems', name: 'systems' },
  { path: '/how-it-works', name: 'how-it-works' },
  { path: '/our-gardens', name: 'gardens' },
  { path: '/contact', name: 'contact' },
  { path: '/missing-page', name: '404' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });

  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText}`);
    });

    const response = await page.goto(BASE + route.path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);

    // Scroll through the page so lazy-loaded images are requested before checks.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let position = 0;
        const timer = window.setInterval(() => {
          window.scrollBy(0, 700);
          position += 700;
          if (position >= document.body.scrollHeight) {
            window.clearInterval(timer);
            resolve();
          }
        }, 40);
      });
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.loading = 'eager';
      });
    });
    await page.waitForTimeout(500);
    await page.evaluate(async () => {
      const pending = Array.from(document.images).filter((img) => !img.complete);
      await Promise.race([
        Promise.all(
          pending.map(
            (img) =>
              new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              }),
          ),
        ),
        new Promise((resolve) => window.setTimeout(resolve, 5000)),
      ]);
    });
    await page.waitForTimeout(400);
    // Second pass so scroll-reveal sections (e.g. CTA blocks) animate before capture.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let position = 0;
        const timer = window.setInterval(() => {
          window.scrollBy(0, 500);
          position += 500;
          if (position >= document.body.scrollHeight) {
            window.clearInterval(timer);
            resolve();
          }
        }, 60);
      });
    });
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const metrics = await page.evaluate(() => {
      const brokenImages = Array.from(document.images)
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src);
      const title = document.title;
      const descriptions = Array.from(document.querySelectorAll('meta[name="description"]')).map((el) =>
        el.getAttribute('content'),
      );
      const canonicals = Array.from(document.querySelectorAll('link[rel="canonical"]')).map((el) =>
        el.getAttribute('href'),
      );
      const h1 = Array.from(document.querySelectorAll('h1')).map((el) => el.textContent?.trim());
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        brokenImages,
        title,
        descriptions,
        canonicals,
        h1,
      };
    });

    const screenshot = path.join(OUT, `${viewport.name}-${route.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    const expectedCanonical = `https://www.hitechdripbox.com${route.path === '/' ? '/' : route.path}`;
    report.push({
      viewport: viewport.name,
      route: route.path,
      status: response?.status(),
      overflowPx: Math.max(0, metrics.scrollWidth - metrics.innerWidth),
      brokenImages: metrics.brokenImages,
      consoleErrors,
      failedRequests,
      title: metrics.title,
      descriptionCount: metrics.descriptions.length,
      canonicalCount: metrics.canonicals.length,
      canonical: metrics.canonicals[0] ?? null,
      canonicalExpected: expectedCanonical,
      h1Count: metrics.h1.length,
      screenshot: path.relative(process.cwd(), screenshot),
    });

    await page.close();
  }

  await context.close();
}

await browser.close();

console.log(JSON.stringify(report, null, 2));

const problems = report.filter(
  (entry) =>
    entry.overflowPx > 1 ||
    entry.brokenImages.length ||
    entry.consoleErrors.length ||
    entry.failedRequests.length ||
    entry.h1Count !== 1 ||
    entry.descriptionCount !== 1 ||
    entry.canonicalCount !== 1 ||
    (entry.route !== '/missing-page' && entry.canonical !== entry.canonicalExpected),
);

if (problems.length) {
  console.error(`\nQA issues found in ${problems.length} page/viewport combinations.`);
  process.exitCode = 1;
} else {
  console.log('\nQA checks passed: no overflow, broken images, duplicate metadata or console errors.');
}
