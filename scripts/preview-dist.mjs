/**
 * Minimal static server for QA that behaves like a static host:
 * directory index files are served, unknown paths fall back to index.html.
 * Usage: node scripts/preview-dist.mjs [port]
 */
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const port = Number(process.argv[2] || 4174);
const root = path.resolve('dist');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
};

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  let filePath = path.join(root, urlPath);

  if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');
  else if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  else if (!path.extname(filePath) && existsSync(`${filePath}.html`)) filePath = `${filePath}.html`;

  if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = path.join(root, 'index.html');
  }

  response.writeHead(200, {
    'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Static dist preview: http://localhost:${port}`);
});
