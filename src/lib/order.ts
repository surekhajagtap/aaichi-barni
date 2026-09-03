import { rupees } from "./format";

/**
 * Order submission for a statically hosted site.
 *
 * GitHub Pages cannot run server code, so the order is posted straight from the
 * browser to a hosted form endpoint (Web3Forms, Formspree or similar), which
 * emails it to the kitchen.
 *
 * The endpoint is baked in at build time from NEXT_PUBLIC_ORDER_FORM_ENDPOINT.
 * When it is not set, `isOrderingEnabled` is false and the checkout page says so
 * honestly instead of presenting a form that silently goes nowhere.
 */

export const ORDER_FORM_ENDPOINT = process.env.NEXT_PUBLIC_ORDER_FORM_ENDPOINT || "";
export const ORDER_FORM_KEY = process.env.NEXT_PUBLIC_ORDER_FORM_KEY || "";

export const isOrderingEnabled = Boolean(ORDER_FORM_ENDPOINT);

export type OrderLine = {
  slug: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
};

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
};

/**
 * A human-readable reference the customer can quote back to us.
 * Time-ordered, so two orders placed seconds apart cannot collide.
 */
export function orderReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `AB-${stamp}${salt}`;
}

function summarise(lines: OrderLine[], subtotal: number, shipping: number): string {
  const items = lines
    .map((l) => `  ${l.name} (${l.weight}) x ${l.quantity} — ${rupees(l.price * l.quantity)}`)
    .join("\n");
  return [
    items,
    `  Delivery — ${shipping === 0 ? "Free" : rupees(shipping)}`,
    `  Total (pay on delivery) — ${rupees(subtotal + shipping)}`,
  ].join("\n");
}

export type SubmitResult = { ok: true; reference: string } | { ok: false; error: string };

export async function submitOrder(input: {
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  customer: OrderCustomer;
}): Promise<SubmitResult> {
  if (!isOrderingEnabled) {
    return { ok: false, error: "Ordering is not switched on yet." };
  }

  const { lines, subtotal, shipping, customer } = input;
  const reference = orderReference();

  // Flat fields, because form services present them as a readable email.
  const payload: Record<string, string> = {
    subject: `New order ${reference} — ${rupees(subtotal + shipping)}`,
    reference,
    placed_at: new Date().toISOString(),
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    pincode: customer.pincode,
    notes: customer.notes?.trim() || "—",
    order: summarise(lines, subtotal, shipping),
    total: rupees(subtotal + shipping),
  };

  // Web3Forms authenticates with an access_key in the body; Formspree uses the
  // URL alone. Sending the key only when one is configured suits both.
  if (ORDER_FORM_KEY) payload.access_key = ORDER_FORM_KEY;

  try {
    const response = await fetch(ORDER_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        error:
          "We could not send your order just now. Nothing has been charged — please try again, or message us and we will take it down by hand.",
      };
    }

    return { ok: true, reference };
  } catch {
    return {
      ok: false,
      error:
        "We could not reach the kitchen. Please check your connection and try again, or message us directly.",
    };
  }
}
