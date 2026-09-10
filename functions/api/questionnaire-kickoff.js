/**
 * Cloudflare Pages Function — BD kick-off questionnaire submit
 * POST /api/questionnaire-kickoff  ->  proxies to VPS /api/questionnaire-kickoff
 */

const VPS = "https://forms.mexzungu.com";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const res = await fetch(`${VPS}/api/questionnaire-kickoff`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500, headers: CORS,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
