import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/db";
import JarVisual from "@/components/JarVisual";
import Scene from "@/components/Scene";
import Reveal from "@/components/Reveal";
import SpiceMeter from "@/components/SpiceMeter";
import PurchasePanel from "@/components/PurchasePanel";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/sections/FinalCTA";
import { STEPS } from "@/components/sections/Process";
import { AlertIcon, ArrowIcon } from "@/components/icons";

const WASH: Record<string, string> = {
  mango: "from-[#FBEBC6] to-[#F5DCA6]",
  saffron: "from-[#F8E3C3] to-[#EFCE9C]",
  terracotta: "from-[#F6E0D5] to-[#EDC9B7]",
  leaf: "from-[#EDF0E2] to-[#DDE3C6]",
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const others = (await getProducts()).filter((p) => p.slug !== product.slug);

  return (
    <>
      {/* ── PRODUCT ──────────────────────────────────────────────────────── */}
      <div className="shell py-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
            <li>
              <Link href="/" className="cursor-pointer hover:text-terracotta">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="cursor-pointer hover:text-terracotta">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="shell grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <div
          className={`rounded-card bg-gradient-to-b p-8 sm:p-12 ${WASH[product.hue] ?? WASH.mango}`}
        >
          <JarVisual
            hue={product.hue}
            name={product.name}
            className="mx-auto h-auto w-full max-w-sm"
          />
        </div>

        <div>
          <p className="text-label uppercase tracking-[0.14em] text-ink-faint">
            {product.subtitle}
          </p>
          <h1 className="mt-3 text-display">{product.name}</h1>
          <p className="mt-5 max-w-prose text-lede text-ink-soft">{product.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {product.tasteProfile.map((note) => (
              <li
                key={note}
                className="rounded-pill border border-sand bg-ivory-100 px-3.5 py-1.5 text-sm text-ink"
              >
                {note}
              </li>
            ))}
          </ul>

          <dl className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-ink-soft">Spice level</dt>
              <dd className="mt-1.5">
                <SpiceMeter level={product.spiceLevel} label={product.spiceLabel} />
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">Net quantity</dt>
              <dd className="tabular mt-1.5 text-ink">{product.netQuantity}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-ink-soft">Best before</dt>
              <dd className="mt-1.5 text-ink">{product.shelfLife}</dd>
            </div>
          </dl>

          <PurchasePanel product={product} />

          <div className="mt-8 rounded-card border border-sand bg-ivory-100 p-6">
            <h2 className="text-[1.0625rem] font-medium">Ingredients</h2>
            <p className="mt-2.5 text-ink-soft">{product.ingredients.join(", ")}.</p>
            {product.ingredientNote && (
              <p className="mt-4 flex items-start gap-2.5 border-t border-sand pt-4 text-[0.9375rem] text-ink-soft">
                <AlertIcon className="h-5 w-5 shrink-0 text-saffron" />
                <span>{product.ingredientNote}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── WHAT DOES IT TASTE LIKE ──────────────────────────────────────── */}
      <section className="section bg-ivory-100" aria-labelledby="taste-heading">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">The Flavour</p>
            <h2 id="taste-heading" className="mt-3 text-h2">
              What Does It Taste Like?
            </h2>
            <p className="mt-6 max-w-prose text-lede text-ink-soft">{product.tasteNote}</p>
          </Reveal>
          <Reveal delay={80}>
            <Scene
              name="kairi"
              alt="Raw kairi mangoes on a wooden counter, one cut open to show the pale sour flesh"
              className="aspect-[4/3] rounded-card shadow-e2"
            />
          </Reveal>
        </div>
      </section>

      {/* ── HOW MOM MAKES IT (condensed on the PDP) ──────────────────────── */}
      <section className="section" aria-labelledby="pdp-process-heading">
        <div className="shell">
          <Reveal className="max-w-prose">
            <p className="eyebrow">The Making</p>
            <h2 id="pdp-process-heading" className="mt-3 text-h2">
              How Mom Makes It
            </h2>
            <p className="mt-5 text-lede text-ink-soft">
              Seven steps, all of them by hand, none of them hurried.
            </p>
          </Reveal>

          <ol className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item, index) => (
              <li key={item.step}>
                <Reveal delay={index * 45} className="h-full">
                  <div className="card h-full overflow-hidden">
                    <Scene name={item.scene} alt={item.alt} className="aspect-[3/2]" />
                    <div className="p-5">
                      <span className="tabular text-sm text-mango-deep">{item.step}</span>
                      <h3 className="mt-1.5 text-[1.0625rem]">{item.title}</h3>
                      <p className="mt-2 text-[0.9375rem] text-ink-soft">{item.copy}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-9">
            <Link
              href="/how-its-made"
              className="inline-flex cursor-pointer items-center gap-2 font-medium text-terracotta underline-offset-4 hover:underline"
            >
              See the whole process
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── ROOTED IN KHANDESH ───────────────────────────────────────────── */}
      <section className="section bg-ivory-100" aria-labelledby="rooted-heading">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Scene
              name="khandesh"
              alt="Khandesh farmland at golden hour with a mango tree over the fields"
              className="aspect-[5/4] rounded-card shadow-e2"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">The Place</p>
            <h2 id="rooted-heading" className="mt-3 text-h2">
              Rooted in Khandesh
            </h2>
            <p className="mt-6 max-w-prose text-lede text-ink-soft">{product.khandeshNote}</p>
            <Link href="/from-khandesh" className="btn-secondary mt-7">
              About Khandesh
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── PERFECT WITH ─────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="perfect-heading">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">On the Plate</p>
            <h2 id="perfect-heading" className="mt-3 text-h2">
              Perfect With
            </h2>
            <ul className="mt-7 flex flex-wrap gap-2">
              {product.perfectWith.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-sand bg-card px-4 py-2.5 text-[0.9375rem] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="note mt-8 text-[1.625rem]">
              {product.slug === "upvas-mango-loncha"
                ? "Even a fasting plate deserves something to look forward to."
                : "Bhakri and loncha. Nothing else is really required."}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Scene
              name="bhakri"
              alt="A hot jowar bhakri on a steel thali with a spoonful of mango loncha, sliced onion and a green chilli"
              className="aspect-[5/4] rounded-card shadow-e3"
            />
          </Reveal>
        </div>
      </section>

      {/* ── OTHER JARS ───────────────────────────────────────────────────── */}
      <section className="section bg-ivory-100" aria-labelledby="others-heading">
        <div className="shell">
          <Reveal>
            <h2 id="others-heading" className="text-h2">
              The Other Jars
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, index) => (
              <li key={other.id}>
                <Reveal delay={index * 60} className="h-full">
                  <ProductCard product={other} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
