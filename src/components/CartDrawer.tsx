"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { CloseIcon, MinusIcon, PlusIcon, TruckIcon } from "./icons";
import { rupees, shippingFor, FREE_SHIPPING_THRESHOLD } from "@/lib/format";

const HUE: Record<string, string> = {
  mango: "bg-mango",
  saffron: "bg-saffron",
  terracotta: "bg-terracotta",
  leaf: "bg-leaf",
};

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, setQuantity, remove } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const shipping = shippingFor(subtotal);
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-drawer" role="dialog" aria-modal="true" aria-label="Your cart">
      <button
        type="button"
        className="absolute inset-0 animate-fade cursor-default bg-ink/50"
        onClick={closeCart}
        aria-label="Close cart"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slideIn flex-col bg-ivory-50 shadow-e4 focus:outline-none"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-sand px-5">
          <h2 className="font-serif text-xl">Your Barni</h2>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors duration-enter hover:bg-ivory-100"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-serif text-h3">Your cart is still empty.</p>
            <p className="max-w-xs text-ink-soft">
              Four jars, one recipe, and a very old family habit of feeding people well.
            </p>
            <Link href="/shop" onClick={closeCart} className="btn-primary mt-2">
              Pick your flavour
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {toFreeShipping > 0 ? (
                <p className="mb-4 flex items-start gap-2.5 rounded-lg bg-ivory-100 p-3.5 text-sm text-ink-soft">
                  <TruckIcon className="h-5 w-5 shrink-0 text-saffron" />
                  <span>
                    Add <strong className="tabular text-ink">{rupees(toFreeShipping)}</strong> more
                    for free delivery.
                  </span>
                </p>
              ) : (
                <p className="mb-4 flex items-center gap-2.5 rounded-lg bg-leaf-tint p-3.5 text-sm text-ink">
                  <TruckIcon className="h-5 w-5 shrink-0 text-leaf" />
                  Delivery is on us.
                </p>
              )}

              <ul className="flex flex-col gap-3">
                {lines.map((line) => (
                  <li key={line.slug} className="card flex gap-3.5 p-3">
                    <div
                      className={`flex h-[86px] w-[68px] shrink-0 items-end justify-center rounded-lg ${
                        HUE[line.hue] ?? "bg-mango"
                      } bg-opacity-90`}
                      aria-hidden="true"
                    >
                      <span className="mb-2 h-12 w-8 rounded-sm bg-ivory-50/85" />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/shop/${line.slug}`}
                        onClick={closeCart}
                        className="cursor-pointer font-serif text-[1.0625rem] leading-snug hover:text-terracotta"
                      >
                        {line.name}
                      </Link>
                      <p className="tabular mt-0.5 text-sm text-ink-soft">
                        {line.weight} · {rupees(line.price)}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-pill border border-sand">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity - 1)}
                            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-l-pill text-ink transition-colors duration-enter hover:bg-ivory-100"
                            aria-label={`Reduce quantity of ${line.name}`}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span
                            className="tabular w-7 text-center text-[0.9375rem] font-medium"
                            aria-live="polite"
                          >
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity + 1)}
                            disabled={line.quantity >= 10}
                            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-r-pill text-ink transition-colors duration-enter hover:bg-ivory-100 disabled:pointer-events-none disabled:opacity-40"
                            aria-label={`Increase quantity of ${line.name}`}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(line.slug)}
                          className="cursor-pointer rounded px-2 py-2 text-sm text-ink-soft underline-offset-4 transition-colors duration-enter hover:text-terracotta hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-sand bg-card px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <dl className="mb-4 flex flex-col gap-1.5 text-[0.9375rem]">
                <div className="flex justify-between text-ink-soft">
                  <dt>Subtotal</dt>
                  <dd className="tabular text-ink">{rupees(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <dt>Delivery</dt>
                  <dd className="tabular text-ink">{shipping === 0 ? "Free" : rupees(shipping)}</dd>
                </div>
                <div className="mt-1.5 flex justify-between border-t border-sand pt-2.5 text-lg font-medium">
                  <dt>Total</dt>
                  <dd className="tabular">{rupees(subtotal + shipping)}</dd>
                </div>
              </dl>

              <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                Checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="btn-ghost mt-1.5 w-full"
              >
                Keep looking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
