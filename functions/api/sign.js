const VPS = "https://api.mexzungu.com";
const ALLOWED_ORIGINS = new Set([
  "https://mexzungu.com",
  "https://www.mexzungu.com",
  "https://societas.mexzungu.com",
  "https://jouissance.mexzungu.com",
  "https://pepecarrillo.co",
  "https://www.pepecarrillo.co",
]);
function cors(origin) {
  const o = ALLOWED_ORIGINS.has(origin) ? origin : "https://mexzungu.com";
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}
export async function onRequestPost(context) {
  const origin = context.request.headers.get("origin") || "";
  const CORS = cors(origin);
  const CF_ID = context.env.CF_ACCESS_CLIENT_ID || "";
  const CF_SECRET = context.env.CF_ACCESS_CLIENT_SECRET || "";
  try {
    const body = await context.request.json();
    const headers = { "Content-Type": "application/json" };
    if (CF_ID && CF_SECRET) {
      headers["CF-Access-Client-Id"] = CF_ID;
      headers["CF-Access-Client-Secret"] = CF_SECRET;
    }
    const res = await fetch(`${VPS}/api/sign`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
export async function onRequestOptions(context) {
  const origin = context.request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: cors(origin) });
}
