import { NextResponse } from "next/server";
import { createOrder, type Order, type OrderItem } from "@/lib/db";
import { notifyOrder } from "@/lib/notify";

export const dynamic = "force-dynamic";

const REQUIRED = ["name", "email", "phone", "address", "city", "state", "pincode"] as const;

export async function POST(request: Request) {
  let body: { items?: unknown; customer?: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that request." }, { status: 400 });
  }

  if (!Array.isArray(body?.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const customer = body?.customer ?? ({} as Record<string, string>);
  const missing = REQUIRED.filter((field) => !String(customer[field] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Some details are still missing.", fields: missing },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
    return NextResponse.json(
      { error: "That email address does not look right.", fields: ["email"] },
      { status: 400 },
    );
  }

  if (!/^\d{6}$/.test(String(customer.pincode).trim())) {
    return NextResponse.json(
      { error: "PIN code should be 6 digits.", fields: ["pincode"] },
      { status: 400 },
    );
  }

  try {
    // Every required field was checked above, so the shape is known good here.
    // createOrder re-reads name and price from the database regardless.
    const { order, persisted } = await createOrder({
      items: body.items as OrderItem[],
      customer: customer as unknown as Order["customer"],
    });

    const notified = await notifyOrder(order);

    // An order has to land somewhere. If the filesystem was read-only *and* the
    // email did not go out, nothing recorded it — so say so rather than showing
    // a confirmation for an order nobody will ever cook.
    if (!persisted && !notified.sent) {
      console.error("Order could not be recorded", {
        id: order.id,
        persisted,
        emailSkipped: notified.skipped,
        emailError: notified.error,
      });
      return NextResponse.json(
        {
          error:
            "We could not record your order just now. Nothing has been charged — please try again in a moment, or message us and we will take it down by hand.",
        },
        { status: 503 },
      );
    }

    if (notified.error) {
      // Persisted, so the order is safe; the email is a courtesy that failed.
      console.error("Order saved but notification failed", notified.error);
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
