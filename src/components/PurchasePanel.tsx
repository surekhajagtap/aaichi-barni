"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { CheckIcon, MinusIcon, PlusIcon } from "./icons";
import { rupees } from "@/lib/format";
import type { Product } from "@/lib/db";

export default function PurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const line = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    weight: product.weight,
    hue: product.hue,
  };

  const soldOut = product.stock <= 0;
  const max = Math.min(10, product.stock);

  return (
    <div className="mt-8 border-t border-sand pt-8">
      <div className="flex items-baseline gap-3">
        <span className="tabular font-serif text-[2rem] leading-none">
          {rupees(product.price)}
        </span>
        {product.compareAt && (
          <span className="tabular text-ink-faint line-through">{rupees(product.compareAt)}</span>
        )}
        <span className="tabular text-ink-soft">/ {product.weight}</span>
      </div>
      <p className="mt-2 text-sm text-ink-soft">Inclusive of all taxes.</p>

      {soldOut ? (
        <p className="mt-6 rounded-lg bg-ivory-100 p-4 text-ink-soft">
          This batch is finished. The next one is made when the mangoes are ready — write to us and
          we will keep a jar aside.
        </p>
      ) : (
        <>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-pill border border-sand bg-card">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-l-pill text-ink transition-colors duration-enter hover:bg-ivory-100 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="tabular w-10 text-center text-lg font-medium" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(max, q + 1))}
                disabled={quantity >= max}
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-pill text-ink transition-colors duration-enter hover:bg-ivory-100 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            {product.stock <= 25 && (
              <p className="text-sm text-terracotta">
                Small batch — {product.stock} jars left this season.
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                add(line, quantity);
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
              className="btn-secondary h-13 flex-1 text-base"
            >
              <span aria-live="polite" className="inline-flex items-center gap-2">
                {added ? (
                  <>
                    <CheckIcon className="h-5 w-5" />
                    Added to cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                add(line, quantity);
                router.push("/checkout");
              }}
              className="btn-primary h-13 flex-1 text-base"
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
