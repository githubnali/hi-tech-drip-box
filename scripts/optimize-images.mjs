/**
 * Generates the optimised WebP image set used by the website from the original
 * business photographs in /assets-source.
 *
 * Run with: npm run optimize:images
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'assets-source');
const out = path.join(root, 'public', 'images');

const ensure = (dir) => mkdir(dir, { recursive: true });

const variants = [
  { name: 'terrace-checkered', width: 1500, position: 'centre' },
  { name: 'installers-okra', width: 1500, position: 'centre' },
  { name: 'brinjal-row', width: 1500, position: 'centre' },
  { name: 'hibiscus-planters', width: 1500, position: 'centre' },
  { name: 'brinjal-planter', width: 1500, position: 'centre' },
  { name: 'pomegranate', width: 1500, position: 'centre' },
  { name: 'greenhouse-greens', width: 1500, position: 'centre' },
  { name: 'aerial-layout', width: 1500, position: 'centre' },
  { name: 'aerial-wide', width: 1500, position: 'centre' },
  { name: 'bougainvillea', width: 1500, position: 'centre' },
  { name: 'leafy-greens', width: 1500, position: 'centre' },
];

async function run() {
  await ensure(path.join(out, 'hero'));
  await ensure(path.join(out, 'systems'));
  await ensure(path.join(out, 'gardens'));
  await ensure(path.join(out, 'cta'));
  await ensure(path.join(out, 'branding'));

  const files = await readdir(source);
  const missing = variants.filter((v) => !files.includes(`${v.name}.jpeg`));
  if (missing.length) {
    throw new Error(`Missing source photographs: ${missing.map((m) => m.name).join(', ')}`);
  }

  // Hero images
  await sharp(path.join(source, 'terrace-checkered.jpeg'))
    .resize(1920, 1080, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(path.join(out, 'hero', 'terrace-garden-hero.webp'));

  await sharp(path.join(source, 'terrace-checkered.jpeg'))
    .resize(960, 1100, { fit: 'cover', position: 'centre' })
    .webp({ quality: 76 })
    .toFile(path.join(out, 'hero', 'terrace-garden-hero-mobile.webp'));

  // The greenhouse view clearly shows the complete connected system,
  // including the feeder box and irrigation plumbing.
  await sharp(path.join(source, 'greenhouse-greens.jpeg'))
    .resize(1800, 1000, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile(path.join(out, 'hero', 'garden-systems-hero.webp'));

  // An active, aerial installation view communicates the setup process.
  await sharp(path.join(source, 'aerial-layout.jpeg'))
    .resize(1800, 1000, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile(path.join(out, 'hero', 'how-it-works-hero.webp'));

  // A colourful finished garden is the strongest gallery introduction.
  await sharp(path.join(source, 'bougainvillea.jpeg'))
    .resize(1800, 1000, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(path.join(out, 'hero', 'our-gardens-hero.webp'));

  // The hand inspecting a fruiting plant adds a human, consultative cue.
  await sharp(path.join(source, 'brinjal-planter.jpeg'))
    .resize(1800, 1000, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(path.join(out, 'hero', 'contact-hero.webp'));

  // System model cards
  await sharp(path.join(source, 'brinjal-row.jpeg'))
    .resize(1200, 800, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile(path.join(out, 'systems', 'model-vegetables.webp'));

  await sharp(path.join(source, 'pomegranate.jpeg'))
    .resize(1200, 800, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile(path.join(out, 'systems', 'model-small-trees.webp'));

  // Landscape "system overview" diagram image
  await sharp(path.join(source, 'terrace-checkered.jpeg'))
    .resize(1600, 1000, { fit: 'cover', position: 'centre' })
    .webp({ quality: 78 })
    .toFile(path.join(out, 'systems', 'system-overview.webp'));

  // Final CTA background
  await sharp(path.join(source, 'leafy-greens.jpeg'))
    .resize(1920, 720, { fit: 'cover', position: 'centre' })
    .webp({ quality: 72 })
    .toFile(path.join(out, 'cta', 'final-cta.webp'));

  // Open Graph image
  await sharp(path.join(source, 'terrace-checkered.jpeg'))
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 })
    .toFile(path.join(out, 'branding', 'og-image.webp'));

  // Garden gallery images (full + card thumbnail)
  for (const item of variants) {
    const input = path.join(source, `${item.name}.jpeg`);
    const full = path.join(out, 'gardens', `${item.name}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width: item.width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(full);

    await sharp(input)
      .rotate()
      .resize(720, 540, { fit: 'cover', position: 'centre' })
      .webp({ quality: 72 })
      .toFile(path.join(out, 'gardens', `${item.name}-card.webp`));

    const meta = await sharp(full).metadata();
    console.log(
      `${item.name}: full ${meta.width}x${meta.height}, card 720x540`,
    );
  }

  console.log('\nOptimised images written to public/images');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
