import { NextResponse } from "next/server";
import { createOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

const REQUIRED = ["name", "email", "phone", "address", "city", "state", "pincode"] as const;

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that request." }, { status: 400 });
  }

  if (!Array.isArray(body?.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const customer = body?.customer ?? {};
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
    const order = await createOrder({ items: body.items, customer });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
