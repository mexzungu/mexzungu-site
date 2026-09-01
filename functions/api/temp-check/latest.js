// Cloudflare Pages Function, GET /api/temp-check/latest
// Proxies to VPS tools_server. Feeds mexzungu.com/temp-check-live real-time UI.

const VPS_URL = "https://api.mexzungu.com/dashboard/temp-check/latest";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const installId = url.searchParams.get("install_id");
  const upstream = installId
    ? `${VPS_URL}?install_id=${encodeURIComponent(installId)}`
    : VPS_URL;
  try {
    const res = await fetch(upstream, { headers: { "User-Agent": "temp-check-latest-proxy/1.0" } });
    const body = await res.text();
    return new Response(body, { status: res.status, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err && err.message || err) }), {
      status: 500, headers: corsHeaders,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
