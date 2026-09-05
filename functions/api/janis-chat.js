/**
 * Cloudflare Pages Function - Janis chat for Collaborator Hub
 * POST /api/janis-chat
 * Body: { chat_id: "faith-hub-<uuid>", message: "hi Janis", partner: "faith" }
 * Returns: { ok: true, reply: "..." }
 *
 * Proxies to VPS tools server /claude/message with channel="web-collaborator".
 * Each browser session gets a stable chat_id (localStorage-persisted) so Janis
 * holds thread continuity across messages.
 */

const VPS_CHAT = "https://api.mexzungu.com/rate/janis-chat";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestPost(context) {
  const { request } = context;

  try {
    const { chat_id, message, partner } = await request.json();

    if (!chat_id || !message) {
      return new Response(JSON.stringify({ ok: false, error: "chat_id and message required" }), {
        status: 400, headers: corsHeaders
      });
    }

    // Size guard (VPS caps at 50KB but reject early to save the round trip)
    if (new Blob([message]).size > 30_000) {
      return new Response(JSON.stringify({ ok: false, error: "Message too large" }), {
        status: 413, headers: corsHeaders
      });
    }

    const payload = {
      chat_id: String(chat_id),
      message: String(message),
      partner: String(partner || "unknown"),
    };

    // Upstream timeout: 60s. Janis subprocess call can be slow.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    let upstream;
    try {
      upstream = await fetch(VPS_CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!upstream.ok) {
      const text = await upstream.text();
      return new Response(JSON.stringify({ ok: false, error: `Upstream ${upstream.status}: ${text.slice(0, 200)}` }), {
        status: 502, headers: corsHeaders
      });
    }

    const data = await upstream.json();
    return new Response(JSON.stringify({ ok: true, reply: data.reply || "" }), {
      status: 200, headers: corsHeaders
    });

  } catch (err) {
    const msg = err.name === "AbortError" ? "Janis took too long. Try again in a moment." : err.message;
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500, headers: corsHeaders
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
    }
  });
}
