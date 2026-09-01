// Cloudflare Pages Function, POST /api/temp-check/heartbeat
// Proxies extension heartbeats to VPS tools_server so deadman can watch.

const VPS_URL = "https://api.mexzungu.com/dashboard/temp-check/heartbeat";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestPost(context) {
  const { request } = context;
  try {
    const body = await request.json();
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const enriched = { ...body, cf_ip_hint: clientIp };

    const res = await fetch(VPS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "temp-check-hb-proxy/1.0" },
      body: JSON.stringify(enriched),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: "upstream " + res.status }), {
        status: 502, headers: corsHeaders,
      });
    }
    const upstream = await res.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, ...upstream }), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err && err.message || err) }), {
      status: 500, headers: corsHeaders,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
