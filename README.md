# AaiChi Barni

A premium D2C storefront for a homemade Khandeshi mango loncha brand.

> **AaiChi Barni — A Taste of Khandesh. Made With a Mother's Touch.**

Next.js 14 (App Router) · TypeScript · Tailwind · statically exported to GitHub Pages.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build      # static export into ./out
```

`npm run build` writes plain HTML to `out/`. There is no `npm start` — nothing needs a server.

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
| `/cart`, `/checkout` | Cart page and checkout |

Navigation is `Home · Shop · Our Story · From Khandesh · How It's Made · Contact · Cart`, with **Shop Now** as the primary button.

## The catalogue

Products live in [`data/db.seed.json`](data/db.seed.json) and are read by [`src/lib/db.ts`](src/lib/db.ts) **at build time only** — the values are baked into the exported HTML. Edit the seed and redeploy to change copy, price, stock or ingredients; no code change needed.

`data/db.json` is gitignored. It was the writable store from when this ran on a server, and it may still exist locally with old orders in it. It holds real customer names, phone numbers and addresses, so it must never be committed — CI fails the build if it becomes tracked, or if the seed ever ships with a non-empty `orders` array.

## CI/CD

Live at **https://surekhajagtap.github.io/aaichi-barni/**

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) has three jobs:

1. **`verify`** — on every push and pull request to `master`: lint → typecheck → build, plus a guard that fails if `data/db.json` becomes tracked or the seed picks up real orders.
2. **`build-pages`** — exports the static site with the correct base path and uploads it.
3. **`deploy`** — publishes to GitHub Pages, then polls the live URL until it returns 200 so a broken deploy fails the run instead of going unnoticed.

### The approval gate

`deploy` targets the `github-pages` environment, which has a **required reviewer** on it. Every run stops before publishing and waits for a human to approve it in the Actions tab. Nothing reaches the live site unseen.

Manage reviewers under **Settings → Environments → github-pages**. This needs a public repo or GitHub Pro — the free plan does not allow protection rules on private repos.

## Orders

GitHub Pages is static hosting: there is no server, so there are no API routes. Orders are posted straight from the browser to a hosted form endpoint, which emails them to the kitchen. See [`src/lib/order.ts`](src/lib/order.ts).

**Until you configure an endpoint, checkout honestly says ordering is not open yet** and points people at the contact page. It does not present a form that quietly goes nowhere.

To switch ordering on, add these under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Value |
| --- | --- |
| `ORDER_FORM_ENDPOINT` | e.g. `https://api.web3forms.com/submit` or your Formspree URL |
| `ORDER_FORM_KEY` | Web3Forms access key. Leave unset for Formspree. |

These are **variables, not secrets**, deliberately: they are baked into the browser bundle and are designed to be public. Do not put anything genuinely secret here.

Order references are generated in the browser (`AB-` plus a time-ordered suffix) so two orders placed seconds apart cannot collide.

> Whenever the brand outgrows this, replace the two functions in `src/lib/db.ts` and `src/lib/order.ts` with a real backend, and drop `output: "export"` from `next.config.mjs`.

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

- Static export builds clean; all 13 pages emitted, including `404.html`.
- Served the exported site under its `/aaichi-barni/` base path: every asset — CSS, all JS chunks, all three fonts, the grain tile — returns 200, with no console errors.
- Cart and quantity flows exercised end to end in the browser.
- Empty-submit validation sets `aria-invalid`, announces via `role="alert"`, and moves focus to the first invalid field.
- No horizontal scroll at 375px; body text 16px.
- Every rendered text/background pair meets WCAG AA for its size.
- Grain is one cached 80×80 noise tile, not a per-scene `feTurbulence` filter — the latter made a dozen scenes per page expensive to rasterise.

---

## Still open

- **Real photography.** See above. Everything else is downstream of this.
- **Customer stories.** [`CustomerStories.tsx`](src/components/sections/CustomerStories.tsx) ships an honest empty state on purpose — the brief says to use real reviews once available and not to invent testimonials. Fill the `REVIEWS` array when genuine ones exist and the grid renders automatically.
- **Ordering is off** until `ORDER_FORM_ENDPOINT` is set — see the Orders section above.
- **Payments.** Checkout is pay-on-delivery; no card details are collected anywhere on the site.
- **Contact form** validates and confirms client-side but does not yet send mail. Point it at the same form endpoint as checkout to fix that.
- Placeholder contact details in `src/app/contact/page.tsx` need the real email and phone number.
