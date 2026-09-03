/**
 * CF Pages middleware — /collaborators/* auth gate.
 * Validates mgl_collab JWT cookie (HS256, COLLAB_TOKEN_SECRET).
 * Public skip paths: /collaborators/locked/*, /collaborators/referral-agreement/*
 */

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Allow public paths through without auth
  if (
    path === '/collaborators/locked' ||
    path.startsWith('/collaborators/locked/') ||
    path === '/collaborators/referral-agreement' ||
    path.startsWith('/collaborators/referral-agreement/')
  ) {
    return next();
  }

  // Parse partner slug: /collaborators/<slug>/...
  const match = path.match(/^\/collaborators\/([^/]+)/);
  if (!match) return next();
  const slug = match[1];

  const token = _getCookie(request, 'mgl_collab');
  if (!token || !(await _verifyJWT(token, env.COLLAB_TOKEN_SECRET, slug))) {
    return Response.redirect(
      `${url.origin}/collaborators/locked?requested=${encodeURIComponent(slug)}`,
      302
    );
  }

  return next();
}

function _getCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const k = part.slice(0, eq).trim();
    if (k === name) return part.slice(eq + 1).trim();
  }
  return null;
}

async function _verifyJWT(token, secret, expectedPartner) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
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
    if (!ok) return false;

    const payload = JSON.parse(_b64urlToStr(payloadB64));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return false;
    if (payload.partner !== expectedPartner) return false;

    return true;
  } catch {
    return false;
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
