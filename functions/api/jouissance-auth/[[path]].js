/**
 * Cloudflare Pages Function: /api/jouissance-auth/[...] -> VPS /jouissance/[...]
 * Proxies all Jouissance portal requests to the FastAPI backend.
 */

const VPS = "https://forms.mexzungu.com";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const url = new URL(request.url);
  const subpath = url.pathname.replace(/^\/api\/jouissance-auth/, "");
  const targetUrl = `${VPS}/jouissance${subpath}${url.search}`;

  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    if (k.toLowerCase() !== "host") headers[k] = v;
  }

  try {
    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const upstream = await fetch(targetUrl, { method: request.method, headers, body });

    const responseHeaders = { ...CORS };
    for (const [k, v] of upstream.headers.entries()) {
      const kl = k.toLowerCase();
      if (!["transfer-encoding", "connection"].includes(kl) && !kl.startsWith("access-control-")) {
        responseHeaders[k] = v;
      }
    }

    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ detail: err.message }), {
      status: 502,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
}
