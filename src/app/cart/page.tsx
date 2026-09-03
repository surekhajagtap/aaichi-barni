"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import JarVisual from "@/components/JarVisual";
import { MinusIcon, PlusIcon, TruckIcon } from "@/components/icons";
import { rupees, shippingFor, FREE_SHIPPING_THRESHOLD } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, setQuantity, remove, ready } = useCart();
  const shipping = shippingFor(subtotal);
  const toFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <section className="section">
      <div className="shell">
        <h1 className="text-display">Your Barni</h1>

        {!ready ? (
          <div className="mt-10 h-40 animate-pulse rounded-card bg-ivory-100" aria-hidden="true" />
        ) : lines.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-sand bg-ivory-100 p-10 text-center sm:p-16">
            <h2 className="text-h3">Nothing in here yet.</h2>
            <p className="mx-auto mt-3 max-w-prose text-ink-soft">
              Four jars, one family recipe, and one very good reason to make bhakri tonight.
            </p>
            <Link href="/shop" className="btn-primary mt-7">
              Shop Khandeshi Loncha
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.slug} className="card flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
                  <Link
                    href={`/shop/${line.slug}`}
                    className="w-full shrink-0 cursor-pointer rounded-lg bg-ivory-100 p-3 sm:w-28"
                  >
                    <JarVisual hue={line.hue} name={line.name} className="mx-auto h-32 w-auto sm:h-28" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/shop/${line.slug}`}
                      className="cursor-pointer font-serif text-[1.1875rem] hover:text-terracotta"
                    >
                      {line.name}
                    </Link>
                    <p className="tabular mt-1 text-ink-soft">
                      {line.weight} · {rupees(line.price)} each
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div className="flex items-center rounded-pill border border-sand">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-l-pill transition-colors duration-enter hover:bg-ivory-100"
                          aria-label={`Reduce quantity of ${line.name}`}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="tabular w-8 text-center font-medium" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          disabled={line.quantity >= 10}
                          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-r-pill transition-colors duration-enter hover:bg-ivory-100 disabled:pointer-events-none disabled:opacity-40"
                          aria-label={`Increase quantity of ${line.name}`}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="tabular text-lg font-medium">
                        {rupees(line.price * line.quantity)}
                      </p>

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

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6">
                <h2 className="text-h3">Summary</h2>

                {toFree > 0 ? (
                  <p className="mt-5 flex items-start gap-2.5 rounded-lg bg-ivory-100 p-3.5 text-sm text-ink-soft">
                    <TruckIcon className="h-5 w-5 shrink-0 text-saffron" />
                    <span>
                      Add <strong className="tabular text-ink">{rupees(toFree)}</strong> more for
                      free delivery.
                    </span>
                  </p>
                ) : (
                  <p className="mt-5 flex items-center gap-2.5 rounded-lg bg-leaf-tint p-3.5 text-sm text-ink">
                    <TruckIcon className="h-5 w-5 shrink-0 text-leaf" />
                    Delivery is on us.
                  </p>
                )}

                <dl className="mt-5 flex flex-col gap-2">
                  <div className="flex justify-between text-ink-soft">
                    <dt>Subtotal</dt>
                    <dd className="tabular text-ink">{rupees(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <dt>Delivery</dt>
                    <dd className="tabular text-ink">
                      {shipping === 0 ? "Free" : rupees(shipping)}
                    </dd>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-sand pt-3 text-xl font-medium">
                    <dt>Total</dt>
                    <dd className="tabular">{rupees(subtotal + shipping)}</dd>
                  </div>
                </dl>

                <Link href="/checkout" className="btn-primary mt-6 h-13 w-full text-base">
                  Checkout
                </Link>
                <Link href="/shop" className="btn-ghost mt-1.5 w-full">
                  Keep looking
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
