"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { rupees, shippingFor } from "@/lib/format";

type Fields =
  | "name"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "state"
  | "pincode"
  | "notes";

const EMPTY: Record<Fields, string> = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

function validate(field: Fields, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case "name":
      return v ? undefined : "Please tell us who the jar is for.";
    case "email":
      if (!v) return "We send the order confirmation here.";
      return /^\S+@\S+\.\S+$/.test(v) ? undefined : "That email address does not look right.";
    case "phone":
      if (!v) return "The delivery partner will need this.";
      return /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10))
        ? undefined
        : "Please enter a 10-digit mobile number.";
    case "address":
      return v.length >= 8 ? undefined : "A full address helps the parcel arrive.";
    case "city":
      return v ? undefined : "Which city?";
    case "state":
      return v ? undefined : "Which state?";
    case "pincode":
      if (!v) return "PIN code is needed for delivery.";
      return /^\d{6}$/.test(v) ? undefined : "PIN code should be 6 digits.";
    default:
      return undefined;
  }
}

export default function CheckoutPage() {
  const { lines, subtotal, clear, ready } = useCart();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const next: Partial<Record<Fields, string>> = {};
    (Object.keys(EMPTY) as Fields[]).forEach((field) => {
      const error = validate(field, values[field]);
      if (error) next[field] = error;
    });
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            slug: l.slug,
            name: l.name,
            price: l.price,
            quantity: l.quantity,
          })),
          customer: values,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setServerError(data.error ?? "We could not place that order. Please try again.");
        return;
      }

      setOrderId(data.order.id);
      clear();
    } catch {
      setServerError("We could not reach the kitchen. Please check your connection and retry.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Confirmation ──────────────────────────────────────────────────── */
  if (orderId) {
    return (
      <section className="section">
        <div className="shell max-w-2xl text-center">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-leaf-tint text-leaf">
            <CheckIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-display">Your jar is on its way.</h1>
          <p className="tabular mt-4 text-lede text-ink-soft">
            Order <strong className="text-ink">{orderId}</strong>
          </p>
          <p className="mx-auto mt-5 max-w-prose text-ink-soft">
            We have written to you with the details. Jars are packed and dispatched within two
            working days — if anything needs to change before then, just reply to that email.
          </p>
          <p className="note mt-8 text-[1.75rem]">From our kitchen to your table.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="btn-primary">
              Back to the shop
            </Link>
            <Link href="/how-its-made" className="btn-secondary">
              See how it was made
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ── Empty cart ────────────────────────────────────────────────────── */
  if (ready && lines.length === 0) {
    return (
      <section className="section">
        <div className="shell max-w-2xl text-center">
          <h1 className="text-display">Nothing to check out yet.</h1>
          <p className="mt-5 text-lede text-ink-soft">
            Pick a jar first — sweet, medium, spicy, or the fasting preparation.
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Shop Khandeshi Loncha
          </Link>
        </div>
      </section>
    );
  }

  const field = (name: Fields) => ({
    id: name,
    name,
    value: values[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) })),
    className: "field",
  });

  const Error = ({ name }: { name: Fields }) =>
    errors[name] ? (
      <p
        id={`${name}-error`}
        role="alert"
        className="mt-2 flex items-center gap-1.5 text-sm text-terracotta"
      >
        <AlertIcon className="h-4 w-4 shrink-0" />
        {errors[name]}
      </p>
    ) : null;

  return (
    <section className="section">
      <div className="shell">
        <h1 className="text-display">Checkout</h1>
        <p className="mt-4 max-w-prose text-lede text-ink-soft">
          Two steps and it is done. We pay on delivery for now — no card details are collected on
          this site.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
          <div className="flex flex-col gap-6">
            {serverError && (
              <p
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-terracotta/40 bg-terracotta-tint p-4 text-terracotta"
              >
                <AlertIcon className="h-5 w-5 shrink-0" />
                {serverError}
              </p>
            )}

            <fieldset className="card p-6 sm:p-7">
              <legend className="px-2 font-serif text-h3">Who is it for?</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="mb-2 block font-medium">
                    Full name <span className="text-terracotta">*</span>
                  </label>
                  <input {...field("name")} type="text" autoComplete="name" />
                  <Error name="name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-medium">
                    Email <span className="text-terracotta">*</span>
                  </label>
                  <input {...field("email")} type="email" autoComplete="email" inputMode="email" />
                  <Error name="email" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block font-medium">
                    Mobile <span className="text-terracotta">*</span>
                  </label>
                  <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" />
                  <Error name="phone" />
                </div>
              </div>
            </fieldset>

            <fieldset className="card p-6 sm:p-7">
              <legend className="px-2 font-serif text-h3">Where should it go?</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="mb-2 block font-medium">
                    Address <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    {...field("address")}
                    rows={3}
                    autoComplete="street-address"
                    className="field min-h-[96px] resize-y py-3 leading-relaxed"
                  />
                  <Error name="address" />
                </div>
                <div>
                  <label htmlFor="city" className="mb-2 block font-medium">
                    City <span className="text-terracotta">*</span>
                  </label>
                  <input {...field("city")} type="text" autoComplete="address-level2" />
                  <Error name="city" />
                </div>
                <div>
                  <label htmlFor="state" className="mb-2 block font-medium">
                    State <span className="text-terracotta">*</span>
                  </label>
                  <input {...field("state")} type="text" autoComplete="address-level1" />
                  <Error name="state" />
                </div>
                <div>
                  <label htmlFor="pincode" className="mb-2 block font-medium">
                    PIN code <span className="text-terracotta">*</span>
                  </label>
                  <input
                    {...field("pincode")}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    autoComplete="postal-code"
                    className="field tabular"
                  />
                  <Error name="pincode" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="mb-2 block font-medium">
                    Anything we should know?
                  </label>
                  <textarea
                    {...field("notes")}
                    rows={2}
                    className="field min-h-[72px] resize-y py-3 leading-relaxed"
                  />
                  <p className="mt-2 text-sm text-ink-soft">
                    A landmark, a gift note, or a delivery time that suits you.
                  </p>
                </div>
              </div>
            </fieldset>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="text-h3">Your order</h2>

              <ul className="mt-5 flex flex-col gap-3 border-b border-sand pb-5">
                {lines.map((line) => (
                  <li key={line.slug} className="flex justify-between gap-4 text-[0.9375rem]">
                    <span className="text-ink">
                      {line.name}
                      <span className="tabular block text-sm text-ink-soft">
                        {line.weight} × {line.quantity}
                      </span>
                    </span>
                    <span className="tabular shrink-0 text-ink">
                      {rupees(line.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

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
                  <dt>Pay on delivery</dt>
                  <dd className="tabular">{rupees(total)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-6 h-13 w-full text-base"
              >
                {submitting ? "Placing your order…" : "Place order"}
              </button>

              <p className="mt-4 text-center text-sm text-ink-soft">
                No payment is taken on this site.
              </p>
              <p className="note mt-4 text-center">A little jar full of memories.</p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
