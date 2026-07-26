/**
 * Cloudflare Pages Function — SHA Checker submission handler
 * POST /api/sha-submit
 * Receives quiz answers + contact info, pings Pepe on Telegram.
 */

export async function onRequestPost(context) {
  const { env, request } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json();
    const { company, stage, email, gaps, score, answers } = body;

    if (!email) {
      return new Response(JSON.stringify({ ok: false, error: "Email required" }), {
        status: 400, headers: corsHeaders
      });
    }

    const gapEmoji = { green: "🟢", amber: "🟡", red: "🔴", unanswered: "⚪" };

    const gapLines = gaps.map(g =>
      `${gapEmoji[g.status] || "⚪"} ${g.name}: ${g.status.toUpperCase()}`
    ).join("\n");

    const message = `⚡ SHA Checker submission

Company: ${company || "Not provided"}
Stage: ${stage || "Not provided"}
Email: ${email}
Score: ${score}/5 gaps covered

${gapLines}

---
mexzungu.com/tools/sha-checker`;

    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.PEPE_CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: corsHeaders
    });

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
