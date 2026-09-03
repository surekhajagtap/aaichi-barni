import type { Order } from "./db";
import { rupees } from "./format";

/**
 * Order notification by email.
 *
 * On a serverless host the JSON store is read-only, so email is how an order
 * actually reaches the kitchen. Sent through Resend's REST API with fetch —
 * no SDK dependency for one request.
 *
 * Configure with three environment variables:
 *   RESEND_API_KEY     from resend.com
 *   ORDER_NOTIFY_EMAIL where orders should land
 *   ORDER_FROM_EMAIL   a verified sender on your Resend domain
 *
 * With no API key set, sending is skipped and the caller falls back to the
 * JSON store — which is exactly what happens in local development.
 */

export type NotifyResult = { sent: boolean; skipped: boolean; error?: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function orderHtml(order: Order): string {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #E8D8BC">
            ${escapeHtml(item.name)} &times; ${item.quantity}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #E8D8BC;text-align:right">
            ${rupees(item.price * item.quantity)}
          </td>
        </tr>`,
    )
    .join("");

  const c = order.customer;

  return `
  <div style="font-family:system-ui,sans-serif;color:#2E1C12;max-width:560px">
    <h1 style="font-size:20px;margin:0 0 4px">New order ${escapeHtml(order.id)}</h1>
    <p style="color:#6A5142;margin:0 0 20px">${escapeHtml(order.createdAt)}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      ${rows}
      <tr>
        <td style="padding:8px 0">Delivery</td>
        <td style="padding:8px 0;text-align:right">
          ${order.shipping === 0 ? "Free" : rupees(order.shipping)}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:600">Pay on delivery</td>
        <td style="padding:8px 0;text-align:right;font-weight:600">${rupees(order.total)}</td>
      </tr>
    </table>

    <h2 style="font-size:16px;margin:24px 0 8px">Deliver to</h2>
    <p style="margin:0;line-height:1.6">
      ${escapeHtml(c.name)}<br>
      ${escapeHtml(c.address).replace(/\n/g, "<br>")}<br>
      ${escapeHtml(c.city)}, ${escapeHtml(c.state)} ${escapeHtml(c.pincode)}<br>
      ${escapeHtml(c.phone)} &middot; ${escapeHtml(c.email)}
    </p>
    ${c.notes ? `<p style="margin:16px 0 0"><strong>Note:</strong> ${escapeHtml(c.notes)}</p>` : ""}
  </div>`;
}

export async function notifyOrder(order: Order): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  const from = process.env.ORDER_FROM_EMAIL;

  if (!apiKey || !to || !from) return { sent: false, skipped: true };

  // Overridable so the delivery path can be pointed at a mock in tests, or at a
  // compatible endpoint if you ever move off Resend.
  const endpoint = process.env.RESEND_API_URL || "https://api.resend.com/emails";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: order.customer.email,
        subject: `New order ${order.id} — ${rupees(order.total)}`,
        html: orderHtml(order),
      }),
    });

    if (!response.ok) {
      return {
        sent: false,
        skipped: false,
        error: `Resend responded ${response.status}: ${await response.text()}`,
      };
    }

    return { sent: true, skipped: false };
  } catch (error) {
    return {
      sent: false,
      skipped: false,
      error: error instanceof Error ? error.message : "Unknown error sending email",
    };
  }
}
