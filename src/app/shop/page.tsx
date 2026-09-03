import type { Metadata } from "next";
import { getProducts } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import WhyDifferent from "@/components/sections/WhyDifferent";
import FinalCTA from "@/components/sections/FinalCTA";
import { TruckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Shop Khandeshi Mango Loncha",
  description:
    "Four homemade Khandeshi mango loncha jars — sweet, medium spicy, spicy and a fasting preparation. Made by hand in small batches.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <section className="weave border-b border-sand bg-ivory-100 py-14 sm:py-18">
        <div className="shell max-w-prose">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-3 text-display">Khandeshi Mango Loncha — Pick Your Flavour</h1>
          <p className="mt-5 text-lede text-ink-soft">
            Every jar comes from the same batch of hand-picked kairi and the same family recipe.
            What changes is the heat, and one jar changes the spice list altogether.
          </p>
          <p className="mt-5 flex items-center gap-2.5 text-[0.9375rem] text-ink-soft">
            <TruckIcon className="h-5 w-5 shrink-0 text-saffron" />
            Free delivery on orders above &#8377;999 · Dispatched within 2 working days
          </p>
        </div>
      </section>

      <section className="section" aria-label="All products">
        <div className="shell">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.id}>
                <Reveal delay={index * 60} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-14 rounded-card border border-sand bg-ivory-100 p-8 sm:p-10">
            <h2 className="text-h3">A note on the fasting jar</h2>
            <p className="mt-4 max-w-prose text-ink-soft">
              The Upvas Mango Loncha is prepared without onion, garlic, asafoetida, mustard,
              fenugreek or turmeric, and uses rock salt instead of common salt. Fasting practices
              differ from family to family and from tradition to tradition — please read the
              ingredient list on the product page and decide what suits yours. We would rather be
              specific than make a broad claim on your behalf.
            </p>
          </Reveal>
        </div>
      </section>

      <WhyDifferent />
      <FinalCTA />
    </>
  );
}
