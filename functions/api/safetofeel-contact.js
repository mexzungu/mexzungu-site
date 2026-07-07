/**
 * Cloudflare Pages Function: Safe to Feel contact / booking / event inquiry
 * POST /api/safetofeel-contact
 *
 * Relays form submissions to the VPS tools server, which sends the Telegram
 * notification to Einat. CF Workers cannot reach api.telegram.org directly
 * (Telegram blocks Cloudflare's outbound IPs with 401). The relay at
 * forms.mexzungu.com/safetofeel-notify handles Telegram delivery from the VPS.
 *
 * Email via Resend is optional. Set RESEND_API_KEY in Cloudflare Pages env vars.
 */

const RELAY_URL = "https://forms.mexzungu.com/safetofeel-notify";
const RELAY_SECRET = "stf-relay-2026";

export async function onRequestPost(context) {
  const { env, request } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json();
    const { name, email, message, whatsapp, service, type } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Name and email required" }), {
        status: 400, headers: corsHeaders,
      });
    }

    const typeLabels = {
      booking: "Session booking inquiry",
      event:   "Event reservation",
      contact: "General contact",
    };
    const label = typeLabels[type] || "Inquiry";

    // Relay to VPS tools server for Telegram delivery
    const relayRes = await fetch(RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, whatsapp, service, type, secret: RELAY_SECRET }),
    });
    const relayBody = await relayRes.json();

    // Email notification via Resend (optional, requires RESEND_API_KEY in CF env vars)
    let emailStatus = "skipped";
    if (env.RESEND_API_KEY) {
      const lines = [
        `Safe to Feel: ${label}`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
      ];
      if (whatsapp) lines.push(`WhatsApp: ${whatsapp}`);
      if (service)  lines.push(`Service / Event: ${service}`);
      if (message)  lines.push(``, `Message:`, message);
      lines.push(``, `via safetofeel.mexzungu.com`);
      const text = lines.join("\n");

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Safe to Feel <noreply@mexzungu.com>",
          to: ["einatdot@gmail.com"],
          reply_to: email,
          subject: `Safe to Feel: ${label} from ${name}`,
          text,
        }),
      });
      emailStatus = emailRes.ok ? "sent" : "failed";
    }

    return new Response(JSON.stringify({
      ok: relayBody.ok === true,
      telegram: relayBody.ok ? "delivered" : relayBody,
      email: emailStatus,
    }), {
      status: 200, headers: corsHeaders,
    });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500, headers: corsHeaders,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
