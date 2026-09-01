/**
 * Cloudflare Pages Function. Rate form proxy.
 * Proxies /api/rate/*   →   VPS 127.0.0.1:8741/rate/*
 *
 * Bypasses Cloudflare Access (VPS reached by IP), same pattern as duara-save.js.
 * Rate form is Pepe-facing and public (no auth token required end-to-end).
 */

const VPS = "https://api.mexzungu.com";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body, status = 200) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet(context) {
  const url  = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api\/rate/, "") || "/";
  const qs   = url.search || "";
  try {
    const res  = await fetch(`${VPS}/rate${path}${qs}`);
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...CORS, "Content-Type": res.headers.get("Content-Type") || "application/json" },
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: `proxy_error: ${err.message}` }, 502);
  }
}

export async function onRequestPost(context) {
  const url  = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api\/rate/, "") || "/";
  try {
    const body = await context.request.text();
    const res  = await fetch(`${VPS}/rate${path}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...CORS, "Content-Type": res.headers.get("Content-Type") || "application/json" },
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: `proxy_error: ${err.message}` }, 502);
  }
}
