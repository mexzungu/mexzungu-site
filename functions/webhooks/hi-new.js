/**
 * Cloudflare Pages Function — hi.new webhook relay.
 * POST /webhooks/hi-new
 *
 * hi.new sends a content-free JSON event:
 *   {"event":"inbox.new","to":"janis-mgl","unread":2}
 *
 * This function forwards the body to the VPS tools server with the internal
 * secret header so the VPS can fetch and process the actual inbox messages.
 */

const VPS = "https://api.mexzungu.com";

export async function onRequestPost(context) {
  const { request, env } = context;

  const internalSecret = env.HI_NEW_INTERNAL_SECRET;
  if (!internalSecret) {
    return new Response(JSON.stringify({ ok: false, error: "HI_NEW_INTERNAL_SECRET not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await request.text();
  } catch (_) {
    body = "{}";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  let upstream;
  try {
    upstream = await fetch(`${VPS}/webhooks/hi-new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Secret": internalSecret,
      },
      body,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    const msg = err.name === "AbortError" ? "VPS timeout" : err.message;
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  clearTimeout(timeout);

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
