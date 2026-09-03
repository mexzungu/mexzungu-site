/**
 * GET /api/collab-enter?token=<jwt>&redirect=<path>
 * Validates the magic-link JWT and sets the mgl_collab cookie (30 days).
 * On success: 302 to redirect param or /collaborators/<partner>/.
 * On failure: 400 with plain-text error.
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const redirectTo = url.searchParams.get('redirect');

  if (!token) {
    return new Response('Missing token parameter.', { status: 400 });
  }

  const payload = await _verifyAndDecode(token, env.COLLAB_TOKEN_SECRET);
  if (!payload) {
    return new Response('Invalid or expired token.', { status: 400 });
  }

  const dest = redirectTo || `/collaborators/${payload.partner}/`;
  const cookie = [
    `mgl_collab=${token}`,
    'Path=/collaborators',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=2592000',
  ].join('; ');

  return new Response(null, {
    status: 302,
    headers: {
      Location: dest,
      'Set-Cookie': cookie,
    },
  });
}

async function _verifyAndDecode(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, sigB64] = parts;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sig = _b64urlToBuffer(sigB64);
    const data = enc.encode(`${headerB64}.${payloadB64}`);
    const ok = await crypto.subtle.verify('HMAC', key, sig, data);
    if (!ok) return null;

    const payload = JSON.parse(_b64urlToStr(payloadB64));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

function _b64urlToStr(s) {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  return atob(padded);
}

function _b64urlToBuffer(s) {
  const str = _b64urlToStr(s);
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) buf[i] = str.charCodeAt(i);
  return buf.buffer;
}
