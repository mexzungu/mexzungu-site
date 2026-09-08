/**
 * Cloudflare Pages Function — Duara client satisfaction survey submit
 * POST /api/duara-survey-save  →  proxies to VPS /clients/duara/survey-submit
 *
 * Calls VPS directly by IP to bypass Cloudflare Access, same pattern as duara-save.js.
 */

const VPS    = "http://204.168.188.119:8741";
const SECRET = "duara-save-2026";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestPost(context) {
  const { env, request } = context;
  const secret = (env && env.DUARA_SAVE_SECRET) || SECRET;

  try {
    const body = await request.json();
    const res = await fetch(`${VPS}/clients/duara/survey-submit`, {
      method:  "POST",
      headers: {
        "Content-Type":   "application/json",
        "x-duara-secret": secret,
      },
      body: JSON.stringify({ ...body, secret }),
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
