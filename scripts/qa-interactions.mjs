/**
 * Local interaction QA (not part of the production build).
 * Exercises mobile navigation, gallery filters + lightbox, FAQ accordion,
 * enquiry form validation / WhatsApp handoff, contact links and skip link.
 *
 * Usage: node scripts/preview-dist.mjs 4174   (in another terminal)
 *        QA_BASE_URL=http://localhost:4174 node scripts/qa-interactions.mjs
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const BASE = process.env.QA_BASE_URL || 'http://localhost:4174';
const CHROME =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const results = [];
const check = async (name, fn) => {
  try {
    await fn();
    results.push({ name, status: 'passed' });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, status: 'failed', error: error.message });
    console.error(`FAIL ${name}\n     ${error.message}`);
  }
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

// ---------------------------------------------------------------- desktop ---
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const page = await context.newPage();

  // Keep the WhatsApp handoff local/deterministic; we only assert the target URL.
  await context.route('https://wa.me/**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: 'WhatsApp handoff' }),
  );

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  await check('skip link is first in tab order', async () => {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => ({
      text: document.activeElement?.textContent?.trim(),
      href: document.activeElement?.getAttribute('href'),
    }));
    assert.equal(focused.href, '#main-content');
    assert.match(focused.text, /Skip to main content/);
  });

  await check('header call and WhatsApp links are valid', async () => {
    const tel = await page.locator('header a[href^="tel:"]').first().getAttribute('href');
    const wa = await page.locator('header a[href^="https://wa.me/"]').first().getAttribute('href');
    assert.equal(tel, 'tel:+919884035450');
    assert.match(wa, /^https:\/\/wa\.me\/919884035450\?text=/);
  });

  await check('desktop navigation reaches every route', async () => {
    for (const [label, path] of [
      ['Our Systems', '/our-systems'],
      ['How It Works', '/how-it-works'],
      ['Our Gardens', '/our-gardens'],
      ['Contact', '/contact'],
    ]) {
      await page.locator('header nav[aria-label="Primary"] a', { hasText: label }).click();
      await page.waitForURL(`**${path}`);
      assert.equal(new URL(page.url()).pathname, path);
    }
  });

  await page.goto(`${BASE}/our-gardens`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  await check('gallery filters update aria state and card count', async () => {
    const allButton = page.getByRole('button', { name: /^All Gardens/ });
    const vegetablesButton = page.getByRole('button', { name: /^Vegetables/ });
    const allCount = Number((await allButton.innerText()).match(/(\d+)/)?.[1]);
    const vegCount = Number((await vegetablesButton.innerText()).match(/(\d+)/)?.[1]);
    assert.ok(allCount > vegCount && vegCount > 0, 'filter counts should be meaningful');

    await vegetablesButton.click();
    await page.waitForTimeout(200);
    assert.equal(await vegetablesButton.getAttribute('aria-pressed'), 'true');
    assert.equal(await allButton.getAttribute('aria-pressed'), 'false');
    const cards = await page.locator('article').count();
    assert.equal(cards, vegCount);
    const status = await page.locator('[role="status"]').first().innerText();
    assert.match(status, new RegExp(`${vegCount} gardens`));
  });

  await check('lightbox opens, navigates with keyboard and closes on Escape', async () => {
    const firstCard = page.locator('button[aria-label^="Open image:"]').first();
    const firstLabel = await firstCard.getAttribute('aria-label');
    await firstCard.click();

    const dialog = page.locator('[role="dialog"][aria-modal="true"]').last();
    await dialog.waitFor({ state: 'visible' });
    const captionBefore = await page.locator('#lightbox-caption').innerText();
    assert.ok(captionBefore.length > 10);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(250);
    const captionAfter = await page.locator('#lightbox-caption').innerText();
    assert.notEqual(captionAfter, captionBefore, 'right arrow should change the image');

    const insideDialog = await page.evaluate(() => {
      const dialogEl = document.querySelector('[role="dialog"][aria-modal="true"]');
      return dialogEl?.contains(document.activeElement) ?? false;
    });
    assert.equal(insideDialog, true, 'focus should stay inside the lightbox');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    assert.equal(await page.locator('#lightbox-caption').count(), 0);
    const focusedLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
    assert.equal(focusedLabel, firstLabel, 'focus should return to the card that opened the lightbox');
  });

  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  await check('FAQ accordion toggles with aria-expanded', async () => {
    const first = page.locator('#faq-button-space');
    const second = page.locator('#faq-button-plants');
    assert.equal(await first.getAttribute('aria-expanded'), 'true', 'first FAQ starts open');
    await second.click();
    await page.waitForTimeout(200);
    assert.equal(await second.getAttribute('aria-expanded'), 'true');
    assert.equal(await first.getAttribute('aria-expanded'), 'false');
    await second.click();
    await page.waitForTimeout(200);
    assert.equal(await second.getAttribute('aria-expanded'), 'false');
  });

  await check('form blocks invalid submission with accessible errors', async () => {
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();
    await page.waitForTimeout(300);
    const invalidCount = await page.locator('[aria-invalid="true"]').count();
    assert.ok(invalidCount >= 3, `expected required-field errors, got ${invalidCount}`);
    const alertText = await page.locator('form [role="alert"]').first().innerText();
    assert.match(alertText, /name|mobile|city/i);
    const focusedIsInvalid = await page.evaluate(
      () => document.activeElement?.getAttribute('aria-invalid') === 'true',
    );
    assert.equal(focusedIsInvalid, true, 'focus should move to the first invalid field');
  });

  await check('invalid mobile number is rejected', async () => {
    await page.locator('#fullName').fill('Test Visitor');
    await page.locator('#mobile').fill('123');
    await page.locator('#city').fill('Chennai');
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();
    await page.waitForTimeout(250);
    assert.equal(await page.locator('#mobile').getAttribute('aria-invalid'), 'true');
  });

  await check('valid form opens WhatsApp with encoded enquiry', async () => {
    await page.locator('#mobile').fill('98840 35450');
    await page.locator('#email').fill('visitor@example.com');
    await page.locator('#terraceArea').fill('300 sq. ft.');
    await page.locator('#model').selectOption({ index: 1 });
    await page.locator('#message').fill('Testing enquiry handoff.');
    await page.waitForTimeout(1400);

    const popupPromise = context.waitForEvent('page', { timeout: 8000 }).catch(() => null);
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();
    const popup = await popupPromise;
    assert.ok(popup, 'WhatsApp should open in a new tab');
    const popupUrl = popup.url();
    assert.match(popupUrl, /^https:\/\/wa\.me\/919884035450\?text=/);
    const decoded = decodeURIComponent(popupUrl.split('text=')[1]);
    assert.match(decoded, /Test Visitor/);
    assert.match(decoded, /Mobile: 98840 35450/);
    assert.match(decoded, /City \/ Location: Chennai/);
    await popup.close();

    await page.waitForTimeout(400);
    const status = await page.locator('form [role="status"]').innerText();
    assert.match(status, /WhatsApp has opened/i);
    assert.ok(await page.getByRole('link', { name: /Open WhatsApp with these details/i }).isVisible());
  });

  await check('repeat submission is rate limited', async () => {
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Submit Enquiry' }).click();
    await page.waitForTimeout(300);
    const error = await page.locator('form [role="alert"]').last().innerText();
    assert.match(error, /wait \d+ seconds|check your details/i);
  });

  await context.close();
}

// ----------------------------------------------------------------- mobile ---
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  await check('mobile menu opens, traps focus and closes on Escape', async () => {
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await dialog.waitFor({ state: 'visible' });
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    assert.equal(await trigger.getAttribute('aria-expanded'), 'true');

    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(
        () =>
          document
            .querySelector('[role="dialog"][aria-label="Site menu"]')
            ?.contains(document.activeElement) ?? false,
      );
      assert.equal(inside, true, `focus escaped the drawer after ${i + 1} tabs`);
    }

    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  });

  await check('mobile menu navigates and closes', async () => {
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await page.getByRole('dialog', { name: 'Site menu' }).waitFor({ state: 'visible' });
    await page.getByRole('dialog', { name: 'Site menu' }).getByRole('link', { name: 'Our Systems' }).click();
    await page.waitForURL('**/our-systems');
    assert.equal(new URL(page.url()).pathname, '/our-systems');
    await page.waitForTimeout(500);
    assert.equal(await page.getByRole('dialog', { name: 'Site menu' }).count(), 0);
  });

  await check('no horizontal overflow at 320px', async () => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    assert.ok(overflow <= 1, `horizontal overflow of ${overflow}px`);
  });

  await context.close();
}

await browser.close();

const failures = results.filter((result) => result.status === 'failed');
console.log(`\n${results.length - failures.length}/${results.length} interaction checks passed.`);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
