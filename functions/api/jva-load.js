const VPS = "https://panda.mexzungu.com";
const TOKEN = "jva-panda-rocket-2026";
const ALLOWED_ORIGINS = new Set(["https://mexzungu.com", "https://societas.mexzungu.com", "https://panda.mexzungu.com"]);
function cors(origin) {
  const o = ALLOWED_ORIGINS.has(origin) ? origin : "https://mexzungu.com";
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-JVA-Token", "Content-Type": "application/json" };
}

export async function onRequestGet(context) {
  const origin = context.request.headers.get("origin") || "";
  const CORS = cors(origin);
  try {
    const res = await fetch(`${VPS}/jva/load`, {
      headers: { "X-JVA-Token": TOKEN },
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: cors(origin) });
}
