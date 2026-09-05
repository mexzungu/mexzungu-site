/**
 * POST /api/collab-login
 * Body: {partner: str, password: str}
 * Validates password against env HUB_PW_<PARTNER>. On match, mints a JWT
 * (30 days) and sets the mgl_collab cookie. Response: {ok, redirect}.
 * Uses the same JWT format the middleware validates.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return _json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const partner = String(body.partner || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!partner || !password) {
    return _json({ ok: false, error: "Missing partner or password" }, 400);
  }

  const expected = env[`HUB_PW_${partner.toUpperCase()}`];
  const secret = env.COLLAB_TOKEN_SECRET;
  if (!expected || !secret) {
    return _json({ ok: false, error: "Hub not provisioned" }, 404);
  }

  if (!_constantTimeEqual(password, expected)) {
    return _json({ ok: false, error: "Wrong password" }, 401);
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    partner,
    iat: now,
    exp: now + 30 * 24 * 60 * 60,
    src: "password",
  };
  const token = await _signJWT(payload, secret);

  const cookie = [
    `mgl_collab=${token}`,
    "Path=/collaborators",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=2592000",
  ].join("; ");

  return new Response(
    JSON.stringify({ ok: true, redirect: `/collaborators/${partner}/` }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    }
  );
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function _json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function _constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function _signJWT(payload, secret) {
  const enc = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = _b64url(JSON.stringify(header));
  const payloadB64 = _b64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const sigB64 = _b64urlBytes(new Uint8Array(sig));
  return `${data}.${sigB64}`;
}

function _b64url(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function _b64urlBytes(bytes) {
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
