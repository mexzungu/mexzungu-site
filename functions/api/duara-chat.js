/**
 * Cloudflare Pages Function — Duara portal feedback / chat
 * POST /api/duara-chat
 * Receives a message from Victoria or Fatima via the Roster tab,
 * pings Pepe on Telegram, and persists to VPS.
 */

const VPS_CHAT     = "http://204.168.188.119:8741/clients/duara/chat";
const DUARA_SECRET = "duara-save-2026";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const { name, message, source } = await request.json();

    if (!name || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Name and message required." }), {
        status: 400, headers: corsHeaders
      });
    }

    const tgText = `[DUARA PORTAL] ${name} (${source || "roster"})\n\n${message}\n\nmexzungu.com/clients/duara/transition`;

    const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.PEPE_CHAT_ID, text: tgText })
    });

    if (!tgRes.ok) {
      throw new Error(`Telegram error: ${tgRes.status}`);
    }

    // Persist to VPS (fire-and-forget)
    const secret = (env && env.DUARA_SAVE_SECRET) || DUARA_SECRET;
    fetch(VPS_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-duara-secret": secret },
      body: JSON.stringify({ secret, name, message, source: source || "roster", ts: new Date().toISOString() }),
    }).catch(() => {});

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
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
