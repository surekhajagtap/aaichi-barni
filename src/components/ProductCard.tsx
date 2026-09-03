import Link from "next/link";
import JarVisual from "./JarVisual";
import SpiceMeter from "./SpiceMeter";
import AddToCartButton from "./AddToCartButton";
import { rupees } from "@/lib/format";
import type { Product } from "@/lib/db";

const WASH: Record<string, string> = {
  mango: "from-[#FBEBC6] to-[#F5DCA6]",
  saffron: "from-[#F8E3C3] to-[#EFCE9C]",
  terracotta: "from-[#F6E0D5] to-[#EDC9B7]",
  leaf: "from-[#EDF0E2] to-[#DDE3C6]",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow duration-enter ease-out hover:shadow-e3">
      <Link
        href={`/shop/${product.slug}`}
        className="cursor-pointer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className={`relative aspect-[4/5] bg-gradient-to-b ${WASH[product.hue] ?? WASH.mango} p-6`}
        >
          <JarVisual
            hue={product.hue}
            name={product.name}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {product.stock <= 25 && product.stock > 0 && (
            <span className="absolute left-4 top-4 rounded-pill bg-ivory-50/95 px-3 py-1.5 text-xs font-medium text-terracotta">
              Small batch · {product.stock} jars left
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-label uppercase tracking-[0.14em] text-ink-faint">
          {product.subtitle}
        </p>

        <h3 className="mt-2 text-[1.25rem] leading-snug">
          <Link
            href={`/shop/${product.slug}`}
            className="cursor-pointer transition-colors duration-enter hover:text-terracotta"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{product.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {product.tasteProfile.map((note) => (
            <li
              key={note}
              className="rounded-pill border border-sand bg-ivory-100 px-2.5 py-1 text-xs text-ink-soft"
            >
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <SpiceMeter level={product.spiceLevel} label={product.spiceLabel} />
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-sand pt-4">
          <p className="flex items-baseline gap-2">
            <span className="tabular text-[1.375rem] font-medium">{rupees(product.price)}</span>
            {product.compareAt && (
              <span className="tabular text-sm text-ink-faint line-through">
                {rupees(product.compareAt)}
              </span>
            )}
            <span className="tabular text-sm text-ink-soft">/ {product.weight}</span>
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <AddToCartButton product={product} className="flex-1" />
          <Link href={`/shop/${product.slug}`} className="btn-secondary px-5">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
