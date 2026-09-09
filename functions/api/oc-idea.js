/**
 * Cloudflare Pages Function. Outlaw Chronicles idea dump.
 * POST /api/oc-idea  ->  proxies to VPS /oc/ideas (append)
 * GET  /api/oc-idea  ->  proxies to VPS /oc/ideas (list, last 5)
 *
 * Auth: Authorization: Bearer <OC_WRITER_TOKEN>. Client stores the token
 * in localStorage after visiting /ideas?key=<token>. Server-side match
 * against env var OC_WRITER_TOKEN. No token, no persistence.
 *
 * Routes through https://forms.mexzungu.com (grey-cloud) to bypass CF Access
 * on the origin, same pattern as duara-survey-save.js.
 */

const VPS = "https://forms.mexzungu.com";

const CORS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
};

function bad(status, msg) {
    return new Response(JSON.stringify({ ok: false, error: msg }), {
        status, headers: CORS,
    });
}

function tokenFromRequest(request) {
    const h = request.headers.get("Authorization") || "";
    const m = h.match(/^Bearer\s+(.+)$/i);
    return m ? m[1].trim() : "";
}

export async function onRequestPost(context) {
    const { env, request } = context;
    const expected = (env && env.OC_WRITER_TOKEN) || "";
    if (!expected) return bad(500, "server missing OC_WRITER_TOKEN");
    const supplied = tokenFromRequest(request);
    if (!supplied || supplied !== expected) return bad(401, "unauthorized");

    let body;
    try { body = await request.json(); } catch (e) { return bad(400, "bad json"); }
    if (!body || typeof body.text !== "string" || !body.text.trim()) {
        return bad(400, "text required");
    }

    const res = await fetch(`${VPS}/oc/ideas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-oc-writer-token": expected,
        },
        body: JSON.stringify({
            text: body.text.trim(),
            source: body.source || "olc-web",
        }),
    });
    const data = await res.json().catch(() => ({ ok: false, error: "bad upstream" }));
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
}

export async function onRequestGet(context) {
    const { env, request } = context;
    const expected = (env && env.OC_WRITER_TOKEN) || "";
    if (!expected) return bad(500, "server missing OC_WRITER_TOKEN");
    const supplied = tokenFromRequest(request);
    if (!supplied || supplied !== expected) return bad(401, "unauthorized");

    const res = await fetch(`${VPS}/oc/ideas?limit=5`, {
        method: "GET",
        headers: { "x-oc-writer-token": expected },
    });
    const data = await res.json().catch(() => ({ ok: false, error: "bad upstream" }));
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin":  "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
