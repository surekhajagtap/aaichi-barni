# AaiChi Barni

A premium D2C storefront for a homemade Khandeshi mango loncha brand.

> **AaiChi Barni — A Taste of Khandesh. Made With a Mother's Touch.**

Next.js 14 (App Router) · TypeScript · Tailwind · a JSON-file database.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

## CI/CD

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) has two jobs.

**`verify`** — on every push and pull request to `master`: **lint → typecheck → build**, then a guard that fails if `data/db.json` ever becomes tracked or the seed picks up real orders. Node 20 with npm caching; a new push cancels the run still in flight.

**`deploy`** — only on pushes to `master`, and only if `verify` passed. Builds and deploys to Vercel, then polls the deployed URL until it returns 200 so a broken deploy fails the run instead of going unnoticed.

### Required repository secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Where it comes from |
| --- | --- |
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | same file |

The deploy job checks all three are present and fails with a named list if any are missing, rather than letting the Vercel CLI produce an opaque auth error.

## Orders in production

**Vercel's filesystem is read-only outside `/tmp`, so the JSON store cannot record orders there.** The code handles this explicitly rather than pretending otherwise:

- Reads work — `next.config.mjs` traces `data/**` into the serverless bundles, which Next cannot infer on its own because the paths are built with `process.cwd()`.
- Writes are attempted, and a read-only failure is caught rather than thrown.
- Orders are emailed to the kitchen via [`src/lib/notify.ts`](src/lib/notify.ts) (Resend REST API, no SDK dependency).
- **If an order is neither saved nor emailed, checkout returns 503 with an honest message.** No customer is ever shown a confirmation for an order that nothing recorded.

Set these environment variables in the Vercel project for email to work:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | From resend.com |
| `ORDER_NOTIFY_EMAIL` | Where orders land |
| `ORDER_FROM_EMAIL` | A verified sender on your Resend domain |
| `RESEND_API_URL` | Optional. Overrides the endpoint; used to point at a mock in tests. |

With no API key set, email is skipped and the JSON store is used — which is what happens in local development.

Order ids are sequential (`AB-1001`) when the store is writable. Without it the counter would restart from the empty seed and hand every order the same id, so a time-ordered id is used instead.

> Long term, replace the four functions in `src/lib/db.ts` with a real database (Vercel Postgres, KV, Turso) and this whole section goes away.

---

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero → emotional intro → collection → the mother → Khandesh → process → why different → bhakri pairing → customer stories → final CTA |
| `/shop` | All four jars, plus the honest note about the fasting preparation |
| `/shop/[slug]` | Product detail: buy panel, *What Does It Taste Like?*, *How Mom Makes It*, *Rooted in Khandesh*, *Perfect With* |
| `/our-story` | The mother's story and how the brand began |
| `/from-khandesh` | The region, mango season, the family table |
| `/how-its-made` | The full seven-step journey, plus what we deliberately don't do |
| `/contact` | Details and a validated message form |
| `/cart`, `/checkout` | Cart page and a pay-on-delivery checkout |

Navigation is `Home · Shop · Our Story · From Khandesh · How It's Made · Contact · Cart`, with **Shop Now** as the primary button.

---

## The database

Deliberately simple: one JSON document read and written only through [`src/lib/db.ts`](src/lib/db.ts).

| File | In git? | What it is |
| --- | --- | --- |
| `data/db.seed.json` | yes | Products only, `orders: []`. **Edit this** to change copy, price, stock or ingredients. |
| `data/db.json` | **no** | The live database. Created from the seed on first read, then accumulates real orders. |

`data/db.json` is gitignored because it holds real customer names, phone numbers and delivery addresses. Never commit it — CI fails the build if it becomes tracked, or if the seed ever ships with a non-empty `orders` array.

- `products` — the four jars.
- `orders` — appended when a checkout succeeds.

Writes go to a temp file and are then renamed, so an interrupted write cannot corrupt the store. **Line prices are always re-read from the database** — the client payload is never trusted for pricing.

`POST /api/orders` validates required fields, email shape and a 6-digit PIN code, and returns field-level errors the checkout form maps back onto the inputs.

To move to a real database later, replace the four exported functions in `src/lib/db.ts`. Nothing else imports the JSON.

> One dev-mode quirk: writing `data/db.json` sits inside the directory Next watches, so placing an order in `npm run dev` triggers a recompile. Production (`npm start`) is unaffected.

---

## Replacing the illustrations with real photography

**This is the most important upgrade this site can get.** The brand brief calls for authentic photography — the mother, her hands, kairi, Khandeshi spices, glass jars, bhakri, the family table. Until those photographs exist, every photo slot renders a warm hand-composed SVG scene at the exact final aspect ratio, so **nothing will shift when the real images land**.

Each slot already carries the art direction as its `alt` text — read those first; they describe the shot to take.

Slots live in [`src/components/Scene.tsx`](src/components/Scene.tsx): `hands`, `kairi`, `spices`, `mother`, `jars`, `bhakri`, `kitchen`, `khandesh`, `cutting`, `mixing`, `packing`, `table`.

To swap one in, replace the `<svg>` inside `Scene` with `next/image`:

```tsx
import Image from "next/image";

<Image
  src={`/photos/${name}.jpg`}
  alt={alt}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

Keep the grain overlay — it ties illustration and photography together during the transition.

The product jar is drawn separately in [`src/components/JarVisual.tsx`](src/components/JarVisual.tsx) on a 3:4 frame. Shoot packshots at 3:4 and swap that component the same way.

### Photography direction

Natural · warm · real · homemade · emotional. Afternoon window light, wooden surfaces, brass and steel vessels, no obvious stock photography, no styled commercial food shots.

---

## Design system

Tokens live in [`tailwind.config.ts`](tailwind.config.ts) and [`src/app/globals.css`](src/app/globals.css). Never hardcode a hex in a component.

**Colour** — warm ivory paper, mango, saffron, terracotta, deep-brown ink and one muted leaf green.

| Token | Hex | Use |
| --- | --- | --- |
| `ivory-50 / 100 / 200` | `#FDFAF4` `#F8F1E4` `#F1E5D0` | Page and alternating sections |
| `ink` / `ink-soft` / `ink-faint` | `#2E1C12` `#6A5142` `#786454` | Body, secondary, captions |
| `terracotta` | `#A8401C` | Primary action (6.15:1 with white) |
| `saffron` | `#9C570C` | Eyebrows, small accent text |
| `mango` / `mango-deep` | `#E8A317` `#946005` | Decorative fill / mango as text |
| `leaf` | `#5C6B3C` | Success and the upvas jar |

Bright mango and saffron appear **only as illustration fills**. Anything carrying text is darkened until it clears **4.5:1 on ivory-50, ivory-100 and card alike** — verified in-browser, not by eye.

**Type** — Playfair Display for emotional storytelling, Inter for product info and UI, Caveat used sparingly for a mother's handwritten notes (`.note`).

**Motion** — 150–300ms, transform and opacity only, exits ~65% of enter duration, scroll reveals via `IntersectionObserver`, and everything disabled under `prefers-reduced-motion`.

---

## What was verified

- `next build` passes clean; 16 routes generated.
- Full purchase path exercised end to end: add to cart → quantity → checkout → order `AB-1001` persisted with correct totals.
- Empty-submit validation sets `aria-invalid`, announces via `role="alert"`, and moves focus to the first invalid field.
- No horizontal scroll at 375px; body text 16px.
- Every rendered text/background pair meets WCAG AA for its size.
- Grain is one cached 80×80 noise tile, not a per-scene `feTurbulence` filter — the latter made a dozen scenes per page expensive to rasterise.

---

## Still open

- **Real photography.** See above. Everything else is downstream of this.
- **Customer stories.** [`CustomerStories.tsx`](src/components/sections/CustomerStories.tsx) ships an honest empty state on purpose — the brief says to use real reviews once available and not to invent testimonials. Fill the `REVIEWS` array when genuine ones exist and the grid renders automatically.
- **Payments.** Checkout is pay-on-delivery; no card details are collected anywhere on the site.
- **Contact form** validates and confirms client-side but does not yet send mail.
- Placeholder contact details in `src/app/contact/page.tsx` need the real email and phone number.
