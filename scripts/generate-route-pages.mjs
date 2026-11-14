/**
 * Creates static HTML entry points for every route so crawlers and link
 * previews receive the correct title, description, canonical and Open Graph
 * metadata even before the React bundle runs.
 *
 * Runs automatically after `vite build`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pagesPath = path.join(root, 'src', 'data', 'pages.json');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.hitechdripbox.com').replace(/\/$/, '');
const OG_IMAGE = `${SITE_URL}/images/branding/og-image.webp`;

const pages = JSON.parse(await readFile(pagesPath, 'utf8'));
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderHtml(route) {
  const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title data-rh="true">${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta data-rh="true" name="description" content="${description}" />`,
    )
    .replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${escapeHtml(route.heading)} — Hi-Tech Drip Box</h1>`);

  const headTags = `
    <link data-rh="true" rel="canonical" href="${url}" />
    <meta data-rh="true" property="og:type" content="website" />
    <meta data-rh="true" property="og:site_name" content="Hi-Tech Drip Box" />
    <meta data-rh="true" property="og:title" content="${title}" />
    <meta data-rh="true" property="og:description" content="${description}" />
    <meta data-rh="true" property="og:url" content="${url}" />
    <meta data-rh="true" property="og:image" content="${OG_IMAGE}" />
    <meta data-rh="true" property="og:image:alt" content="Hi-Tech Drip Box automated terrace garden installation" />
    <meta data-rh="true" property="og:locale" content="en_IN" />
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:title" content="${title}" />
    <meta data-rh="true" name="twitter:description" content="${description}" />
    <meta data-rh="true" name="twitter:image" content="${OG_IMAGE}" />
  `;

  html = html.replace('</head>', `${headTags}\n  </head>`);
  return html;
}

for (const [key, route] of Object.entries(pages)) {
  const html = renderHtml(route);
  if (route.path === '/') {
    await writeFile(path.join(dist, 'index.html'), html, 'utf8');
    console.log(`prerendered ${key} -> dist/index.html`);
    continue;
  }
  const dir = path.join(dist, route.path.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`prerendered ${key} -> dist${route.path}/index.html`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.values(pages)
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path === '/' ? '/' : route.path}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
console.log('generated dist/sitemap.xml');
