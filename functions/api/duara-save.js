/**
 * Cloudflare Pages Function — Duara data persistence proxy
 * GET  /api/duara-save?type=staff    → load staff list from VPS
 * GET  /api/duara-save?type=tracker  → load tracker state from VPS
 * POST /api/duara-save { type, ...}  → save to VPS
 *
 * Calls VPS directly by IP to bypass Cloudflare Access (same pattern as jva-save.js).
 */

const VPS    = "http://204.168.188.119:8741";
const SECRET = "duara-save-2026"; // env.DUARA_SAVE_SECRET overrides at runtime

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestGet(context) {
  const { env, request } = context;
  const url  = new URL(request.url);
  const type = url.searchParams.get("type") || "tracker";
  const path = type === "staff" ? "/clients/duara/staff-data" : "/clients/duara/tracker-data";

  try {
    const res  = await fetch(`${VPS}${path}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS });
  } catch (err) {
    const empty = type === "staff" ? { rows: [], url: null } : { rows: [] };
    return new Response(JSON.stringify(empty), { status: 200, headers: CORS });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const secret = (env && env.DUARA_SAVE_SECRET) || SECRET;

  try {
    const body = await request.json();
    const type = body.type || "tracker";

    let path;
    if (type === "staff")   path = "/clients/duara/staff-data";
    else if (type === "audit") path = "/clients/duara/audit-log";
    else                    path = "/clients/duara/tracker-data";

    const res = await fetch(`${VPS}${path}`, {
      method:  "POST",
      headers: {
        "Content-Type":    "application/json",
        "x-duara-secret":  secret,
      },
      body: JSON.stringify({ ...body, secret }),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS });
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
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
