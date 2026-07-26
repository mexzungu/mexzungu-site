const VPS = "https://panda.mexzungu.com";
const TOKEN = "jva-panda-rocket-2026";
const ALLOWED_ORIGINS = new Set(["https://mexzungu.com", "https://societas.mexzungu.com", "https://panda.mexzungu.com"]);
function cors(origin) {
  const o = ALLOWED_ORIGINS.has(origin) ? origin : "https://mexzungu.com";
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-JVA-Token", "Content-Type": "application/json" };
}

export async function onRequestPost(context) {
  const origin = context.request.headers.get("origin") || "";
  const CORS = cors(origin);
  try {
    const body = await context.request.json();
    const res = await fetch(`${VPS}/jva/save`, {
      method: "POST",
      headers: { "X-JVA-Token": TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
