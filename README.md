# Hi-Tech Drip Box — Website

Production-ready marketing site for **Hi-Tech Drip Box**, a provider of automatic
terrace gardening systems. The site presents two ready-to-install models, the
installation process, real installation photographs and a WhatsApp-first enquiry
flow.

**Tagline:** _Your Space. Your Garden. Automatically._

---

## Contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Scripts](#scripts)
4. [Environment variables](#environment-variables)
5. [Project structure](#project-structure)
6. [Editing content](#editing-content)
7. [Images](#images)
8. [Enquiry form](#enquiry-form)
9. [Supabase setup](#supabase-setup-optional)
10. [Deployment](#deployment)
11. [SEO](#seo)
12. [Accessibility](#accessibility)
13. [Local QA](#local-qa)
14. [Unconfirmed business details](#unconfirmed-business-details)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18.3 + TypeScript 5.7 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3.4 with custom design tokens |
| Routing | React Router 6 |
| Animation | Framer Motion 11 (respects `prefers-reduced-motion`) |
| Icons | Lucide React |
| Forms | React Hook Form 7 + Zod 3 |
| Notifications | React Hot Toast |
| Metadata | React Helmet Async |
| Fonts | Self-hosted Manrope (display) and Inter (body) via Fontsource |
| Images | WebP generated with Sharp |

No UI component library, analytics script, cookie banner or third-party embed is
used. The only external endpoints are WhatsApp (`wa.me`) and, if configured,
Supabase.

---

## Quick start

Requirements:

- Node.js **20 or newer** (developed on Node 22)
- npm 10+

```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev
```

The dev server prints a local URL (normally <http://localhost:5173>).

Production build:

```bash
npm run build
npm run preview
```

`npm run build` runs TypeScript, Vite and a post-build step that writes
per-route HTML files with the correct title, description, canonical and Open
Graph tags (`dist/index.html`, `dist/our-systems/index.html`, etc.).

---

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check, bundle and prerender route metadata into `dist/` |
| `npm run preview` | Preview the production build with Vite |
| `npm run typecheck` | TypeScript project build check (`tsc -b --noEmit`) |
| `npm run lint` | ESLint over the whole project |
| `npm run optimize:images` | Regenerate responsive WebP images from `assets-source/` |
| `node scripts/preview-dist.mjs 4174` | Serve `dist/` like a static host (used for QA) |
| `node scripts/qa-screenshots.mjs` | Capture screenshots and run layout/metadata checks |
| `node scripts/qa-interactions.mjs` | Run keyboard, gallery, form and navigation interaction tests |

The two QA scripts use `playwright-core` with a locally installed Google Chrome.
Override the browser path with `CHROME_PATH` and the target URL with
`QA_BASE_URL` if needed.

---

## Environment variables

Copy `.env.example` to `.env`. All variables are build-time values prefixed with
`VITE_`, so they are public in the browser bundle. Never put a Supabase
service-role key or any other secret here.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_SITE_URL` | Recommended | Public origin used for canonical links, sitemap and social metadata. No trailing slash. Defaults to `https://www.hitechdripbox.com`. |
| `VITE_SUPABASE_URL` | Optional | Supabase project URL. Enables database storage of enquiries. |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase **anon** public key. Used with an insert-only RLS policy. |

If both Supabase variables are absent (the default), the enquiry form opens
WhatsApp with a prefilled message instead of storing data.

---

## Project structure

```text
.
├─ assets-source/          Original unmodified photographs (not shipped)
├─ public/
│  ├─ images/              Generated WebP assets used by the site
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ _redirects           Netlify SPA fallback
├─ qa/                     Local QA screenshots (generated, safe to delete)
├─ scripts/
│  ├─ generate-route-pages.mjs   Post-build metadata + sitemap generation
│  ├─ optimize-images.mjs        Sharp image pipeline
│  ├─ preview-dist.mjs           Static server for dist/
│  ├─ qa-screenshots.mjs         Visual/metadata QA
│  └─ qa-interactions.mjs        Interaction + accessibility QA
├─ src/
│  ├─ components/
│  │  ├─ common/           Buttons, layout primitives, SEO, CTA, reveal
│  │  ├─ contact/          Enquiry form, FAQ accordion, contact cards
│  │  ├─ gardens/          Gallery filters, cards, accessible lightbox
│  │  ├─ home/             Hero, benefits, process steps
│  │  ├─ how-it-works/     System overview illustration section
│  │  ├─ layout/           Header, mobile drawer, footer, page shell
│  │  └─ systems/          Model cards, comparison table, kit grid
│  ├─ data/                Business content (site, systems, gardens, pages)
│  ├─ hooks/               Focus trap + scroll lock
│  ├─ lib/                 SEO, enquiry, WhatsApp, validation, helpers
│  ├─ pages/               Home, Our Systems, How It Works, Our Gardens, Contact, 404
│  └─ types/               Shared TypeScript types
├─ index.html
├─ netlify.toml
├─ vercel.json
└─ tailwind.config.js
```

---

## Editing content

Content is intentionally separated from presentation. Most routine edits only
need one of these files.

### Business details, navigation, benefits, process, FAQs

Edit `src/data/site.ts`:

- `site.name`, `site.tagline`, `site.positioning`
- `site.contactPerson`, `site.phone`, `site.whatsapp`
- `site.serviceAreaNote`, `site.hoursNote`
- `navigation` (labels and paths)
- `benefits`, `processSteps`, `faqs`

`site.email`, `site.address` and `site.social` are currently empty. Components
only render configured values; fill them in when the business confirms them.

### Models, prices and kit contents

Edit `src/data/systems.ts`:

- `systems[]` — name, description, price, pot size, kit summary, image and
  prefilled WhatsApp message
- `kitComponents[]` — the 11 kit items
- `comparisonRows` — the model comparison table

Prices are displayed exactly as supplied by the business
(₹1,40,000 + GST and ₹1,50,000 + GST). Do not add discounts or offers without
written confirmation.

### Gallery

Edit `src/data/gardens.ts`. Each item has:

- `title`, `caption`, `badge`, `categories`
- `featuredOnHome` — controls the four Home page preview cards
- `image.src` (lightbox), `image.card` (grid), alt text and intrinsic size

Available categories come from `gardenFilters` (`vegetables`, `small-trees`,
`flowers`, `creepers`). Counts in the filter buttons are calculated from the
gallery array.

### Page titles and descriptions

Edit `src/data/pages.json`. These values are used by both React Helmet and the
post-build prerender script. After changing a route, update the matching entry
so the static HTML and sitemap stay accurate.

### 404 page

`src/pages/NotFound.tsx` is rendered for unknown routes and marked `noindex`.

---

## Images

Original photographs are stored unchanged in `assets-source/`. The optimized
WebP set in `public/images/` is generated by `scripts/optimize-images.mjs`.

To replace or add a photograph:

1. Put the original `.jpeg` in `assets-source/` using one of the file names
   listed in `scripts/optimize-images.mjs` (for example `bougainvillea.jpeg`).
2. Add or update the corresponding variant entry and output sizes in the script
   if it is a new image.
3. Run `npm run optimize:images`.
4. Update the image path and alt text in `src/data/gardens.ts` (or the relevant
   data file).

The gallery generates two files per source image: a full-size WebP for the
lightbox and a 720×540 card thumbnail for the grid. All `<img>` elements have
explicit width/height and lazy loading except hero images, which load eagerly.

The kit illustrations and category pictograms are custom inline SVGs. They are
stylised placeholders, not photographs of the physical components.

---

## Enquiry form

The form lives in `src/components/contact/EnquiryForm.tsx`.

Behaviour:

1. **Validation** — React Hook Form + Zod. Name (2–80 characters), a valid
   10-digit Indian mobile number and city are required. Email, model, terrace
   area and message are optional.
2. **Spam smoothing** — a hidden honeypot field, a 1.2-second minimum form age
   and a 30-second `localStorage` rate limit. These are UX conveniences, not
   real security.
3. **Supabase configured** — the enquiry is POSTed to the `enquiries` table. On
   success the visitor sees a confirmation. On failure the form offers a
   WhatsApp fallback containing the same details.
4. **Supabase not configured** — the site opens WhatsApp with a prefilled
   message and tells the visitor to press **Send** inside WhatsApp. It never
   claims the enquiry was delivered automatically.

The WhatsApp number is defined once in `src/lib/whatsapp.ts`
(`919884035450`). `tel:` links use `+919884035450`.

To test the form locally without sending a message, use the interaction QA
script; it stubs `wa.me` and asserts the generated URL.

---

## Supabase setup (optional)

Create a project at <https://supabase.com>, then run the following in the SQL
editor.

```sql
create table if not exists public.enquiries (
  id bigint generated by default as identity primary key,
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  mobile text not null check (char_length(mobile) between 10 and 16),
  email text,
  city text not null check (char_length(city) between 2 and 80),
  model text,
  terrace_area text,
  message text,
  source text not null default 'website'
);

alter table public.enquiries enable row level security;

-- The public anon key may only insert. No select/update/delete policy is
-- created, so visitors cannot read or modify enquiries.
create policy "Allow anonymous enquiry inserts"
  on public.enquiries
  for insert
  to anon
  with check (true);
```

Then copy the project URL and anon key into `.env`:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Rebuild after changing environment variables.

Notes:

- An insert-only policy is still open to automated spam. For a public site with
  meaningful traffic, put the insert behind a serverless function or add
  Supabase CAPTCHA / rate limiting.
- View enquiries in the Supabase Table Editor, or add an authenticated admin
  policy later.
- The anon key is designed to be public, but the service-role key must never be
  exposed to the frontend.

---

## Deployment

The site is a static SPA. Build once and upload `dist/`.

### Netlify

`netlify.toml` is included and configures:

- build command `npm run build`
- publish directory `dist`
- SPA fallback to `index.html`
- long-lived caching for `/assets/*` and `/images/*`
- basic security headers

Connect the repository in Netlify, set `VITE_SITE_URL` in the build environment
(and optional Supabase variables), then deploy.

### Vercel

`vercel.json` is included with the same build settings, rewrites and headers.
Import the project, add the environment variables, and deploy.

### Any static host

1. Run `npm run build`.
2. Upload the contents of `dist/` (not the folder itself).
3. Configure the host to serve `404.html`/`index.html` for unknown paths, or use
   the included `_redirects` file on Netlify-style hosts.
4. Point the domain to the host and update `VITE_SITE_URL` if the production
   origin changes, then rebuild.

### Caching

Hashed Vite assets under `/assets/` and generated images under `/images/` can be
cached immutably. Do **not** cache HTML immutably: each route's HTML contains
its own metadata and must be revalidated when the site is redeployed.

---

## SEO

- Unique title, description, canonical, Open Graph and Twitter metadata per
  route via `src/lib/seo.tsx`.
- `Organization` JSON-LD sitewide and `FAQPage` JSON-LD on the Contact page.
- `src/data/pages.json` drives both the runtime metadata and the static
  prerender.
- `scripts/generate-route-pages.mjs` writes route directories and
  `dist/sitemap.xml` after each build.
- `public/robots.txt` points to the sitemap.
- Unknown routes render the 404 page with `noindex`.
- All content is real business information; no invented reviews, ratings,
  statistics or testimonials are marked up as structured data.

When the domain changes, update `VITE_SITE_URL` and rebuild so canonical URLs,
Open Graph URLs and the sitemap all match.

---

## Accessibility

Implemented basics:

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and one `<h1>` per page
- Skip link to `#main-content`
- Visible focus styles and keyboard-operable menus, filters, accordion and
  lightbox
- Mobile drawer and lightbox use `role="dialog"`, `aria-modal`, focus trapping,
  Escape to close, scroll locking and focus restoration
- Gallery filters expose `aria-pressed`; the result count is announced politely
- FAQ buttons use `aria-expanded` / `aria-controls`
- Form fields have labels, hints, `aria-invalid`, `aria-describedby` and
  `role="alert"` error messages
- Decorative images are hidden from assistive technology; informative images
  have descriptive alt text
- Colour contrast kept at WCAG 2.2 AA for body text and controls
- `prefers-reduced-motion` disables scroll reveals and drawer transitions
- Touch targets are at least 44×44 CSS pixels for primary controls

The layout is tested down to 320px wide.

---

## Local QA

Build and serve the static output, then run both scripts:

```bash
npm run build
node scripts/preview-dist.mjs 4174
```

In a second terminal:

```bash
node scripts/qa-screenshots.mjs
node scripts/qa-interactions.mjs
```

`qa-screenshots.mjs` checks every route at 1440×960 and 390×844 for horizontal
overflow, broken images, console errors, failed requests, one `<h1>`, and a
single description/canonical tag. Screenshots are written to `qa/`.

`qa-interactions.mjs` covers the skip link, header links, desktop navigation,
gallery filters, lightbox keyboard navigation and focus restoration, FAQ
accordion state, form validation, the WhatsApp handoff and its encoded payload,
rate limiting, mobile drawer focus trapping/Escape/navigation, and 320px
overflow.

Run the standard checks before shipping:

```bash
npm run typecheck
npm run lint
npm run build
```

---

## Unconfirmed business details

The following details were **not provided** and are deliberately absent or shown
as neutral consultation notes rather than invented facts:

- Email address
- Postal / site address
- Service area, city coverage or travel radius
- Business hours and days
- Instagram / Facebook / other social profiles
- GST number and tax-invoice wording
- Delivery or installation lead time
- Warranty, guarantee or after-sales service terms
- Payment terms, cancellation or refund policy
- Exact dimensions or weight of the full installed system beyond the stated
  ~300 sq. ft. footprint and planter sizes
- Video files for the "See It in Action" section (currently offered on request
  via WhatsApp)
- Customer names, testimonials, reviews, ratings, installation counts or
  performance statistics
- Photographer credit / written consent status for the installation photographs
- Whether prices include or exclude transport, site preparation or electrical
  work beyond the listed kit

Add these to `src/data/site.ts` or the relevant data file only after the
business confirms them. Avoid adding customer quotes, review counts or results
statistics unless they can be verified.

---

## Credits

Photographs: supplied by Hi-Tech Drip Box. Kit and category illustrations:
custom SVG artwork created for this site. Fonts: Manrope and Inter (SIL Open
Font License) via Fontsource.
