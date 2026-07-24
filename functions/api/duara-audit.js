/**
 * Cloudflare Pages Function — Duara AT Audit submission handler
 * POST /api/duara-audit
 * Receives AT audit entries from Daphne/Fatima, pings Pepe on Telegram,
 * and persists the full submission to the VPS audit log.
 */

const VPS_AUDIT    = "http://204.168.188.119:8741/clients/duara/audit-log";
const DUARA_SECRET = "duara-save-2026";

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
    const { submittedBy, entries } = body;

    if (!submittedBy || !entries || !entries.length) {
      return new Response(JSON.stringify({ ok: false, error: "Please fill in your name and at least one entry." }), {
        status: 400, headers: corsHeaders
      });
    }

    const statusLabel = { active: "Active", departed: "Departed" };
    const signedByLabel = {
      se_only: "SE only",
      se_hub: "SE + hub representative",
      no_contract: "No written contract"
    };
    const howLeftLabel = {
      email: "Email",
      whatsapp: "WhatsApp message",
      verbal: "Verbal only",
      formal: "Formal written notice",
      unknown: "Unknown"
    };

    const lines = entries.map((e, i) => {
      const name = e.name || "(no name)";
      const school = e.school || "(no school)";
      const status = statusLabel[e.status] || e.status;
      const signed = signedByLabel[e.signedBy] || e.signedBy;
      const departed = e.status === "departed"
        ? `\n   Left via: ${howLeftLabel[e.howLeft] || e.howLeft || "unknown"}`
        : "";
      const notes = e.notes ? `\n   Notes: ${e.notes}` : "";
      return `${i + 1}. ${name} — ${school}\n   Status: ${status} | Signed by: ${signed}${departed}${notes}`;
    }).join("\n\n");

    const message = `📋 Duara AT Audit — submitted by ${submittedBy}

${lines}

Submitted via mexzungu.com/clients/duara/transition`;

    const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.PEPE_CHAT_ID,
        text: message
      })
    });

    if (!tgRes.ok) {
      throw new Error(`Telegram error: ${tgRes.status}`);
    }

    // Persist to VPS audit log (fire-and-forget — Telegram ping is the critical path)
    const secret = (env && env.DUARA_SAVE_SECRET) || DUARA_SECRET;
    fetch(VPS_AUDIT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-duara-secret": secret },
      body: JSON.stringify({ secret, submittedBy, entries, source: "audit-form" }),
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
