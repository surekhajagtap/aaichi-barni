import Link from "next/link";
import { getProducts } from "@/lib/db";
import Scene from "@/components/Scene";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Mother from "@/components/sections/Mother";
import Khandesh from "@/components/sections/Khandesh";
import Process from "@/components/sections/Process";
import WhyDifferent from "@/components/sections/WhyDifferent";
import CustomerStories from "@/components/sections/CustomerStories";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowIcon } from "@/components/icons";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="weave relative overflow-hidden bg-ivory-50" aria-labelledby="hero-heading">
        <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:py-22">
          <div className="animate-rise">
            <p className="eyebrow">AaiChi Barni · Khandeshi Loncha</p>
            <h1 id="hero-heading" className="mt-4 text-display-lg">
              A Taste of Khandesh,
              <br />
              <span className="text-terracotta">Made With Love.</span>
            </h1>
            <p className="mt-6 max-w-prose text-lede text-ink-soft">
              Authentic homemade Khandeshi mango loncha, prepared by hand using a traditional
              family recipe and a whole lot of love.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="btn-primary h-13 px-7 text-base">
                Shop Khandeshi Loncha
                <ArrowIcon className="h-5 w-5" />
              </Link>
              <Link href="/our-story" className="btn-secondary h-13 px-7 text-base">
                Our Story
              </Link>
            </div>

            <dl className="mt-11 grid max-w-lg grid-cols-3 gap-5 border-t border-sand pt-7">
              {[
                ["Small batch", "Made by hand"],
                ["Khandesh", "Jalgaon, Maharashtra"],
                ["No shortcuts", "One family recipe"],
              ].map(([term, detail]) => (
                <div key={term}>
                  <dt className="font-serif text-[1.0625rem] text-ink">{term}</dt>
                  <dd className="mt-1 text-sm text-ink-soft">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Scene
              name="hands"
              alt="A mother's hands over a wide brass basin of spiced mango pieces on a wooden counter, a filled glass jar beside her in warm afternoon light"
              className="aspect-[4/5] rounded-card shadow-e4 sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <p className="note absolute -bottom-4 left-5 rounded-pill bg-ivory-50 px-5 py-2.5 text-[1.375rem] shadow-e2 sm:left-8">
              Made today, just like at home.
            </p>
          </div>
        </div>
      </section>

      {/* ── EMOTIONAL INTRODUCTION ───────────────────────────────────────── */}
      <section className="section bg-ivory-100" aria-labelledby="intro-heading">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="intro-heading" className="text-h2">
              Not Just Pickle. A Taste of Home.
            </h2>
            <p className="mt-7 text-lede text-ink-soft">
              In Khandesh, food is more than a meal. It is tradition, family and memories shared
              around the same table.
            </p>
            <p className="mt-4 text-lede text-ink-soft">
              Our mango loncha brings that feeling to your home — prepared the way it has always
              been prepared at home, with carefully chosen mangoes, traditional spices and a
              mother&rsquo;s touch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PRODUCT COLLECTION ───────────────────────────────────────────── */}
      <section className="section" aria-labelledby="collection-heading">
        <div className="shell">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-prose">
              <p className="eyebrow">The Collection</p>
              <h2 id="collection-heading" className="mt-3 text-h2">
                Khandeshi Mango Loncha — Pick Your Flavour
              </h2>
              <p className="mt-5 text-lede text-ink-soft">
                Same mangoes, same hands, four different levels of heat. Start wherever your plate
                is happiest.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start text-[0.9375rem] font-medium text-terracotta underline-offset-4 hover:underline sm:self-auto"
            >
              See all jars
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.id}>
                <Reveal delay={index * 60} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Mother />
      <Khandesh />
      <Process />
      <WhyDifferent />

      {/* ── THE PAIRING ──────────────────────────────────────────────────── */}
      <section className="section bg-ivory-100" aria-labelledby="pairing-heading">
        <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Scene
              name="bhakri"
              alt="A steel thali with a hot jowar bhakri, a spoonful of mango loncha, sliced onion and a green chilli"
              className="aspect-[5/4] rounded-card shadow-e3"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Perfect With</p>
            <h2 id="pairing-heading" className="mt-3 text-h2">
              Bhakri, and a spoon of loncha.
            </h2>
            <p className="mt-6 max-w-prose text-lede text-ink-soft">
              If there is one plate this jar was made for, it is this one. A hot jowar bhakri, a
              little oil, a spoon of mango loncha on the side. Nothing else is really required.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {["Bhakri", "Roti", "Paratha", "Dal-Rice", "Khichdi", "Curd rice", "Simple homemade meals"].map(
                (item) => (
                  <li
                    key={item}
                    className="rounded-pill border border-sand bg-card px-4 py-2 text-[0.9375rem] text-ink"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
            <p className="note mt-8 text-[1.625rem]">A little jar full of memories.</p>
          </Reveal>
        </div>
      </section>

      <CustomerStories />
      <FinalCTA />
    </>
  );
}
