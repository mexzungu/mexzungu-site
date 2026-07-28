/**
 * Cloudflare Pages Function. Jouissance Workshop data persistence proxy
 * POST /api/pleasure-workshop { ...carte_data } → save participant submission to VPS
 * GET  /api/pleasure-workshop                   → return all submissions (facilitator)
 *
 * Calls VPS directly by IP to bypass Cloudflare Access (same pattern as duara-save.js).
 */

const VPS = "https://forms.mexzungu.com";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestGet() {
  try {
    const res  = await fetch(`${VPS}/jouissance-workshop/responses`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 200, headers: CORS });
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const res  = await fetch(`${VPS}/jouissance-workshop/submit`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
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
