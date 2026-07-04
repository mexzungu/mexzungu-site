/**
 * Cloudflare Pages Function — Safe to Feel contact / booking / event inquiry
 * POST /api/safetofeel-contact
 * Receives form submission, pings Pepe on Telegram with inquiry details.
 */

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

    const lines = [
      `🌿 Safe to Feel: ${label}`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
    ];
    if (whatsapp) lines.push(`WhatsApp: ${whatsapp}`);
    if (service)  lines.push(`Service / Event: ${service}`);
    if (message)  lines.push(``, `Message:`, message);
    lines.push(``, `via safetofeel.mexzungu.com`);

    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.PEPE_CHAT_ID,
        text: lines.join("\n"),
      }),
    });

    return new Response(JSON.stringify({ ok: true }), {
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
