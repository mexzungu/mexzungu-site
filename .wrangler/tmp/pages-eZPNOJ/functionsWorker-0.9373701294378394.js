var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/temp-check/alert.js
var VPS_URL = "https://api.mexzungu.com/dashboard/temp-check/alert";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestPost(context) {
  const { request } = context;
  try {
    const body = await request.json();
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const enriched = { ...body, cf_ip_hint: clientIp };
    const res = await fetch(VPS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "temp-check-alert-proxy/1.0" },
      body: JSON.stringify(enriched)
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: "upstream " + res.status }), {
        status: 502,
        headers: corsHeaders
      });
    }
    const upstream = await res.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, ...upstream }), { status: 200, headers: corsHeaders });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: String(err2 && err2.message || err2) }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
__name(onRequestPost, "onRequestPost");
async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
__name(onRequestOptions, "onRequestOptions");

// api/temp-check/heartbeat.js
var VPS_URL2 = "https://api.mexzungu.com/dashboard/temp-check/heartbeat";
var corsHeaders2 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestPost2(context) {
  const { request } = context;
  try {
    const body = await request.json();
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const enriched = { ...body, cf_ip_hint: clientIp };
    const res = await fetch(VPS_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "temp-check-hb-proxy/1.0" },
      body: JSON.stringify(enriched)
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: "upstream " + res.status }), {
        status: 502,
        headers: corsHeaders2
      });
    }
    const upstream = await res.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, ...upstream }), { status: 200, headers: corsHeaders2 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: String(err2 && err2.message || err2) }), {
      status: 500,
      headers: corsHeaders2
    });
  }
}
__name(onRequestPost2, "onRequestPost");
async function onRequestOptions2() {
  return new Response(null, { status: 204, headers: corsHeaders2 });
}
__name(onRequestOptions2, "onRequestOptions");

// api/temp-check/latest.js
var VPS_URL3 = "https://api.mexzungu.com/dashboard/temp-check/latest";
var corsHeaders3 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};
async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const installId = url.searchParams.get("install_id");
  const upstream = installId ? `${VPS_URL3}?install_id=${encodeURIComponent(installId)}` : VPS_URL3;
  try {
    const res = await fetch(upstream, { headers: { "User-Agent": "temp-check-latest-proxy/1.0" } });
    const body = await res.text();
    return new Response(body, { status: res.status, headers: corsHeaders3 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: String(err2 && err2.message || err2) }), {
      status: 500,
      headers: corsHeaders3
    });
  }
}
__name(onRequestGet, "onRequestGet");
async function onRequestOptions3() {
  return new Response(null, { status: 204, headers: corsHeaders3 });
}
__name(onRequestOptions3, "onRequestOptions");

// api/temp-check/log.js
var VPS_URL4 = "https://api.mexzungu.com/dashboard/temp-check/log";
var corsHeaders4 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestPost3(context) {
  const { request } = context;
  try {
    const body = await request.json();
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const enriched = { ...body, cf_ip_hint: clientIp };
    const res = await fetch(VPS_URL4, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "temp-check-cf-proxy/1.0" },
      body: JSON.stringify(enriched)
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: "upstream " + res.status }), {
        status: 502,
        headers: corsHeaders4
      });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders4 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: String(err2 && err2.message || err2) }), {
      status: 500,
      headers: corsHeaders4
    });
  }
}
__name(onRequestPost3, "onRequestPost");
async function onRequestOptions4() {
  return new Response(null, { status: 204, headers: corsHeaders4 });
}
__name(onRequestOptions4, "onRequestOptions");

// api/rate/[[path]].js
var VPS = "https://api.mexzungu.com";
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function jsonResponse(body, status = 200) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" }
  });
}
__name(jsonResponse, "jsonResponse");
async function onRequestOptions5() {
  return new Response(null, { status: 204, headers: CORS });
}
__name(onRequestOptions5, "onRequestOptions");
async function onRequestGet2(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api\/rate/, "") || "/";
  const qs = url.search || "";
  try {
    const res = await fetch(`${VPS}/rate${path}${qs}`);
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...CORS, "Content-Type": res.headers.get("Content-Type") || "application/json" }
    });
  } catch (err2) {
    return jsonResponse({ ok: false, error: `proxy_error: ${err2.message}` }, 502);
  }
}
__name(onRequestGet2, "onRequestGet");
async function onRequestPost4(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/^\/api\/rate/, "") || "/";
  try {
    const body = await context.request.text();
    const res = await fetch(`${VPS}/rate${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...CORS, "Content-Type": res.headers.get("Content-Type") || "application/json" }
    });
  } catch (err2) {
    return jsonResponse({ ok: false, error: `proxy_error: ${err2.message}` }, 502);
  }
}
__name(onRequestPost4, "onRequestPost");

// api/jouissance-auth/[[path]].js
var VPS2 = "https://forms.mexzungu.com";
var CORS2 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS2 });
  }
  const url = new URL(request.url);
  const subpath = url.pathname.replace(/^\/api\/jouissance-auth/, "");
  const targetUrl = `${VPS2}/jouissance${subpath}${url.search}`;
  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    if (k.toLowerCase() !== "host") headers[k] = v;
  }
  try {
    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? await request.arrayBuffer() : void 0;
    const upstream = await fetch(targetUrl, { method: request.method, headers, body });
    const responseHeaders = { ...CORS2 };
    for (const [k, v] of upstream.headers.entries()) {
      const kl = k.toLowerCase();
      if (!["transfer-encoding", "connection"].includes(kl) && !kl.startsWith("access-control-")) {
        responseHeaders[k] = v;
      }
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch (err2) {
    return new Response(JSON.stringify({ detail: err2.message }), {
      status: 502,
      headers: { ...CORS2, "Content-Type": "application/json" }
    });
  }
}
__name(onRequest, "onRequest");

// api/pp-auth/[[path]].js
var VPS3 = "https://forms.mexzungu.com";
var CORS3 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
async function onRequest2(context) {
  const { request } = context;
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS3 });
  }
  const url = new URL(request.url);
  const subpath = url.pathname.replace(/^\/api\/pp-auth/, "");
  const targetUrl = `${VPS3}/pp${subpath}${url.search}`;
  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    if (k.toLowerCase() !== "host") headers[k] = v;
  }
  try {
    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? await request.arrayBuffer() : void 0;
    const upstream = await fetch(targetUrl, { method: request.method, headers, body });
    const responseHeaders = { ...CORS3 };
    for (const [k, v] of upstream.headers.entries()) {
      if (!["transfer-encoding", "connection"].includes(k.toLowerCase())) {
        responseHeaders[k] = v;
      }
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch (err2) {
    return new Response(JSON.stringify({ detail: err2.message }), {
      status: 502,
      headers: { ...CORS3, "Content-Type": "application/json" }
    });
  }
}
__name(onRequest2, "onRequest");

// api/duara-audit.js
var VPS_AUDIT = "http://204.168.188.119:8741/clients/duara/audit-log";
var DUARA_SECRET = "duara-save-2026";
async function onRequestPost5(context) {
  const { env, request } = context;
  const corsHeaders8 = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
  try {
    const body = await request.json();
    const { submittedBy, entries } = body;
    if (!submittedBy || !entries || !entries.length) {
      return new Response(JSON.stringify({ ok: false, error: "Please fill in your name and at least one entry." }), {
        status: 400,
        headers: corsHeaders8
      });
    }
    const statusLabel = { active: "Active", departed: "Departed" };
    const signedByLabel = {
      se_only: "SE only",
      se_hub: "SE + hub representative",
      no_contract: "No written contract"
    };
    const howLeftLabel = {
      email: "Email",
      whatsapp: "WhatsApp message",
      verbal: "Verbal only",
      formal: "Formal written notice",
      unknown: "Unknown"
    };
    const lines = entries.map((e, i) => {
      const name = e.name || "(no name)";
      const school = e.school || "(no school)";
      const status = statusLabel[e.status] || e.status;
      const signed = signedByLabel[e.signedBy] || e.signedBy;
      const departed = e.status === "departed" ? `
   Left via: ${howLeftLabel[e.howLeft] || e.howLeft || "unknown"}` : "";
      const notes = e.notes ? `
   Notes: ${e.notes}` : "";
      return `${i + 1}. ${name} \u2014 ${school}
   Status: ${status} | Signed by: ${signed}${departed}${notes}`;
    }).join("\n\n");
    const message = `\u{1F4CB} Duara AT Audit \u2014 submitted by ${submittedBy}

${lines}

Submitted via mexzungu.com/clients/duara/transition`;
    const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.PEPE_CHAT_ID,
        text: message
      })
    });
    if (!tgRes.ok) {
      throw new Error(`Telegram error: ${tgRes.status}`);
    }
    const secret = env && env.DUARA_SAVE_SECRET || DUARA_SECRET;
    fetch(VPS_AUDIT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-duara-secret": secret },
      body: JSON.stringify({ secret, submittedBy, entries, source: "audit-form" })
    }).catch(() => {
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders8 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: err2.message }), {
      status: 500,
      headers: corsHeaders8
    });
  }
}
__name(onRequestPost5, "onRequestPost");
async function onRequestOptions6() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions6, "onRequestOptions");

// api/duara-chat.js
var VPS_CHAT = "http://204.168.188.119:8741/clients/duara/chat";
var DUARA_SECRET2 = "duara-save-2026";
var corsHeaders5 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestPost6(context) {
  const { env, request } = context;
  try {
    const { name, message, source } = await request.json();
    if (!name || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Name and message required." }), {
        status: 400,
        headers: corsHeaders5
      });
    }
    const tgText = `[DUARA PORTAL] ${name} (${source || "roster"})

${message}

mexzungu.com/clients/duara/transition`;
    const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.PEPE_CHAT_ID, text: tgText })
    });
    if (!tgRes.ok) {
      throw new Error(`Telegram error: ${tgRes.status}`);
    }
    const secret = env && env.DUARA_SAVE_SECRET || DUARA_SECRET2;
    fetch(VPS_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-duara-secret": secret },
      body: JSON.stringify({ secret, name, message, source: source || "roster", ts: (/* @__PURE__ */ new Date()).toISOString() })
    }).catch(() => {
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders5 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: err2.message }), {
      status: 500,
      headers: corsHeaders5
    });
  }
}
__name(onRequestPost6, "onRequestPost");
async function onRequestOptions7() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions7, "onRequestOptions");

// api/duara-save.js
var VPS4 = "http://204.168.188.119:8741";
var SECRET = "duara-save-2026";
var CORS4 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestGet3(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "tracker";
  const path = type === "staff" ? "/clients/duara/staff-data" : "/clients/duara/tracker-data";
  try {
    const res = await fetch(`${VPS4}${path}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS4 });
  } catch (err2) {
    const empty = type === "staff" ? { rows: [], url: null } : { rows: [] };
    return new Response(JSON.stringify(empty), { status: 200, headers: CORS4 });
  }
}
__name(onRequestGet3, "onRequestGet");
async function onRequestPost7(context) {
  const { env, request } = context;
  const secret = env && env.DUARA_SAVE_SECRET || SECRET;
  try {
    const body = await request.json();
    const type = body.type || "tracker";
    let path;
    if (type === "staff") path = "/clients/duara/staff-data";
    else if (type === "audit") path = "/clients/duara/audit-log";
    else path = "/clients/duara/tracker-data";
    const res = await fetch(`${VPS4}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-duara-secret": secret
      },
      body: JSON.stringify({ ...body, secret })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS4 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: err2.message }), {
      status: 500,
      headers: CORS4
    });
  }
}
__name(onRequestPost7, "onRequestPost");
async function onRequestOptions8() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions8, "onRequestOptions");

// api/jouissance-workshop.js
var VPS5 = "https://forms.mexzungu.com";
var CORS5 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestGet4() {
  try {
    const res = await fetch(`${VPS5}/jouissance-workshop/responses`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS5 });
  } catch (err2) {
    return new Response(JSON.stringify([]), { status: 200, headers: CORS5 });
  }
}
__name(onRequestGet4, "onRequestGet");
async function onRequestPost8(context) {
  try {
    const body = await context.request.json();
    const res = await fetch(`${VPS5}/jouissance-workshop/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS5 });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: err2.message }), {
      status: 500,
      headers: CORS5
    });
  }
}
__name(onRequestPost8, "onRequestPost");
async function onRequestOptions9() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions9, "onRequestOptions");

// api/jva-load.js
var VPS6 = "https://panda.mexzungu.com";
var TOKEN = "jva-panda-rocket-2026";
var ALLOWED_ORIGINS = /* @__PURE__ */ new Set(["https://mexzungu.com", "https://societas.mexzungu.com", "https://panda.mexzungu.com"]);
function cors(origin) {
  const o = ALLOWED_ORIGINS.has(origin) ? origin : "https://mexzungu.com";
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-JVA-Token", "Content-Type": "application/json" };
}
__name(cors, "cors");
async function onRequestGet5(context) {
  const origin = context.request.headers.get("origin") || "";
  const CORS6 = cors(origin);
  try {
    const res = await fetch(`${VPS6}/jva/load`, {
      headers: { "X-JVA-Token": TOKEN }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS6 });
  } catch (err2) {
    return new Response(JSON.stringify({ error: err2.message }), { status: 500, headers: CORS6 });
  }
}
__name(onRequestGet5, "onRequestGet");
async function onRequestOptions10(context) {
  const origin = context.request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: cors(origin) });
}
__name(onRequestOptions10, "onRequestOptions");

// api/jva-save.js
var VPS7 = "https://panda.mexzungu.com";
var TOKEN2 = "jva-panda-rocket-2026";
var ALLOWED_ORIGINS2 = /* @__PURE__ */ new Set(["https://mexzungu.com", "https://societas.mexzungu.com", "https://panda.mexzungu.com"]);
function cors2(origin) {
  const o = ALLOWED_ORIGINS2.has(origin) ? origin : "https://mexzungu.com";
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-JVA-Token", "Content-Type": "application/json" };
}
__name(cors2, "cors");
async function onRequestPost9(context) {
  const origin = context.request.headers.get("origin") || "";
  const CORS6 = cors2(origin);
  try {
    const body = await context.request.json();
    const res = await fetch(`${VPS7}/jva/save`, {
      method: "POST",
      headers: { "X-JVA-Token": TOKEN2, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: CORS6 });
  } catch (err2) {
    return new Response(JSON.stringify({ error: err2.message }), { status: 500, headers: CORS6 });
  }
}
__name(onRequestPost9, "onRequestPost");
async function onRequestOptions11(context) {
  const origin = context.request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: cors2(origin) });
}
__name(onRequestOptions11, "onRequestOptions");

// api/sha-audit.js
var GEMINI_MODEL = "gemini-2.0-flash-exp";
var AUDIT_PROMPT = `You are Janis, Chief of Staff at Mexzungu Group, a corporate lawyer turned operator who has read thousands of founders agreements. You are analyzing a shareholders agreement (SHA) for critical missing clauses.

Analyze the document carefully against these 5 checkpoints. Return ONLY a valid JSON object, nothing else.

{
  "score": <integer 0-5>,
  "verdict": <"bulletproof" | "strong" | "gaps" | "critical" | "template">,
  "summary": "<2-3 sharp sentences on the overall state of this SHA. Be direct. No fluff.>",
  "topRisk": "<The single most urgent gap in one plain-English sentence.>",
  "nextStep": "<The single most important action the founder should take this week.>",
  "estimatedFixCost": "<Rough legal cost to fix the identified gaps, e.g. 'EUR 1,500-3,000'>",
  "clauses": [
    {
      "name": "Deadlock Resolution",
      "status": <"found" | "partial" | "missing">,
      "finding": "<1-2 sentences on exactly what you found or did not find.>",
      "risk": <"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
      "quote": "<Direct quote from the document if found, null if not found>"
    },
    {
      "name": "Good Leaver / Bad Leaver",
      "status": <"found" | "partial" | "missing">,
      "finding": "<1-2 sentences.>",
      "risk": <"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
      "quote": "<Quote or null>"
    },
    {
      "name": "IP Assignment",
      "status": <"found" | "partial" | "missing">,
      "finding": "<1-2 sentences. Check whether pre-existing IP created before incorporation is explicitly covered.>",
      "risk": <"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
      "quote": "<Quote or null>"
    },
    {
      "name": "Drag-Along Rights",
      "status": <"found" | "partial" | "missing">,
      "finding": "<1-2 sentences. Note the threshold percentage if present.>",
      "risk": <"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
      "quote": "<Quote or null>"
    },
    {
      "name": "Anti-Dilution Protection",
      "status": <"found" | "partial" | "missing">,
      "finding": "<1-2 sentences.>",
      "risk": <"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
      "quote": "<Quote or null>"
    }
  ]
}

Scoring: found=1pt, partial=0.5pt, missing=0pt. Round to nearest integer.
Verdict: 5=bulletproof, 4=strong, 2-3=gaps, 0-1=critical, not-an-SHA=template.
If this is clearly a blank template with placeholder text, set verdict to "template" and score to 0.
Be honest. Founders need to know what is actually missing, not a sales pitch.`;
var corsHeaders6 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
async function onRequestOptions12() {
  return new Response(null, { status: 204, headers: corsHeaders6 });
}
__name(onRequestOptions12, "onRequestOptions");
async function onRequestPost10(context) {
  const { env, request } = context;
  try {
    const body = await request.json();
    const { text, driveUrl } = body;
    let shaText = text;
    if (driveUrl && !shaText) {
      const docId = extractGoogleDocId(driveUrl);
      if (!docId) {
        return err("Could not extract a Google Doc ID from that URL. Make sure you are sharing a Google Docs link (docs.google.com/document/d/...).", 400);
      }
      const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
      const resp = await fetch(exportUrl, { redirect: "follow" });
      if (!resp.ok) {
        return err("Could not access the Google Doc. Make sure it is shared as 'Anyone with the link can view'.", 400);
      }
      shaText = await resp.text();
    }
    if (!shaText || shaText.trim().length < 150) {
      return err("The document is too short to analyze. Please paste the full shareholders agreement text.", 400);
    }
    if (shaText.length > 12e4) {
      shaText = shaText.substring(0, 12e4) + "\n\n[Document truncated for analysis. First 120,000 characters analyzed.]";
    }
    const geminiKey = env.GEMINI_API_KEY;
    if (!geminiKey) return err("Analysis service not configured.", 500);
    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: `${AUDIT_PROMPT}

---

SHAREHOLDERS AGREEMENT:

${shaText}` }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
            maxOutputTokens: 2048
          }
        })
      }
    );
    if (!geminiResp.ok) {
      const errBody = await geminiResp.text().catch(() => "");
      return err("Analysis engine error: " + errBody.substring(0, 200), 500);
    }
    const geminiData = await geminiResp.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return err("Analysis returned no output.", 500);
    let analysis;
    try {
      analysis = JSON.parse(rawText);
    } catch (_) {
      const match2 = rawText.match(/\{[\s\S]*\}/);
      if (!match2) return err("Could not parse analysis output.", 500);
      analysis = JSON.parse(match2[0]);
    }
    if (env.TELEGRAM_TOKEN && env.PEPE_CHAT_ID) {
      const scoreEmoji = analysis.score >= 4 ? "\u{1F7E2}" : analysis.score >= 2 ? "\u{1F7E1}" : "\u{1F534}";
      const tgText = `${scoreEmoji} SHA Audit submitted

Score: ${analysis.score}/5 (${analysis.verdict?.toUpperCase()})

${analysis.topRisk || ""}`;
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.PEPE_CHAT_ID, text: tgText })
      }).catch(() => {
      });
    }
    return new Response(JSON.stringify({ ok: true, analysis }), { status: 200, headers: corsHeaders6 });
  } catch (e) {
    return err(e.message, 500);
  }
}
__name(onRequestPost10, "onRequestPost");
function err(message, status) {
  return new Response(JSON.stringify({ ok: false, error: message }), { status, headers: corsHeaders6 });
}
__name(err, "err");
function extractGoogleDocId(url) {
  const m = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
__name(extractGoogleDocId, "extractGoogleDocId");

// api/sha-submit.js
async function onRequestPost11(context) {
  const { env, request } = context;
  const corsHeaders8 = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
  try {
    const body = await request.json();
    const { company, stage, email, gaps, score, answers } = body;
    if (!email) {
      return new Response(JSON.stringify({ ok: false, error: "Email required" }), {
        status: 400,
        headers: corsHeaders8
      });
    }
    const gapEmoji = { green: "\u{1F7E2}", amber: "\u{1F7E1}", red: "\u{1F534}", unanswered: "\u26AA" };
    const gapLines = gaps.map(
      (g) => `${gapEmoji[g.status] || "\u26AA"} ${g.name}: ${g.status.toUpperCase()}`
    ).join("\n");
    const message = `\u26A1 SHA Checker submission

Company: ${company || "Not provided"}
Stage: ${stage || "Not provided"}
Email: ${email}
Score: ${score}/5 gaps covered

${gapLines}

---
mexzungu.com/tools/sha-checker`;
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.PEPE_CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: corsHeaders8
    });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: err2.message }), {
      status: 500,
      headers: corsHeaders8
    });
  }
}
__name(onRequestPost11, "onRequestPost");
async function onRequestOptions13() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions13, "onRequestOptions");

// api/sheets-proxy.js
var corsHeaders7 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
async function onRequestPost12(context) {
  const { request } = context;
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ ok: false, error: "Missing url" }), {
        status: 400,
        headers: { ...corsHeaders7, "Content-Type": "application/json" }
      });
    }
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("docs.google.com") && !parsed.hostname.endsWith("spreadsheets.google.com")) {
      return new Response(JSON.stringify({ ok: false, error: "Only Google Sheets URLs are allowed." }), {
        status: 400,
        headers: { ...corsHeaders7, "Content-Type": "application/json" }
      });
    }
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Janis/1.0)" },
      redirect: "follow"
    });
    if (!res.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: `Google returned ${res.status}. Make sure the sheet is shared with "Anyone with the link can view."` }),
        { status: 502, headers: { ...corsHeaders7, "Content-Type": "application/json" } }
      );
    }
    const csv = await res.text();
    return new Response(csv, {
      status: 200,
      headers: {
        ...corsHeaders7,
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  } catch (err2) {
    return new Response(JSON.stringify({ ok: false, error: err2.message }), {
      status: 500,
      headers: { ...corsHeaders7, "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost12, "onRequestPost");
async function onRequestOptions14() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders7
  });
}
__name(onRequestOptions14, "onRequestOptions");

// api/sign.js
var VPS8 = "https://api.mexzungu.com";
var ALLOWED_ORIGINS3 = /* @__PURE__ */ new Set([
  "https://mexzungu.com",
  "https://www.mexzungu.com",
  "https://societas.mexzungu.com",
  "https://jouissance.mexzungu.com",
  "https://pepecarrillo.co",
  "https://www.pepecarrillo.co"
]);
function cors3(origin) {
  const o = ALLOWED_ORIGINS3.has(origin) ? origin : "https://mexzungu.com";
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}
__name(cors3, "cors");
async function onRequestPost13(context) {
  const origin = context.request.headers.get("origin") || "";
  const CORS6 = cors3(origin);
  const CF_ID = context.env.CF_ACCESS_CLIENT_ID || "";
  const CF_SECRET = context.env.CF_ACCESS_CLIENT_SECRET || "";
  try {
    const body = await context.request.json();
    const headers = { "Content-Type": "application/json" };
    if (CF_ID && CF_SECRET) {
      headers["CF-Access-Client-Id"] = CF_ID;
      headers["CF-Access-Client-Secret"] = CF_SECRET;
    }
    const res = await fetch(`${VPS8}/api/sign`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS6 });
  } catch (err2) {
    return new Response(JSON.stringify({ error: err2.message }), { status: 500, headers: CORS6 });
  }
}
__name(onRequestPost13, "onRequestPost");
async function onRequestOptions15(context) {
  const origin = context.request.headers.get("origin") || "";
  return new Response(null, { status: 204, headers: cors3(origin) });
}
__name(onRequestOptions15, "onRequestOptions");

// audit/submit.js
var RELAY_URL = "https://forms.mexzungu.com/audit-relay";
var RELAY_SECRET = "audit-relay-2026";
var PAIN_CONTENT = {
  email: {
    label: "Email and communications",
    description: "Your inbox is a second job. You are triaging, drafting, chasing, and following up on things that should never reach you. Every hour spent in email is an hour not spent on clients or revenue.",
    manual: [
      "Inbox zero systems and folder rules",
      "Templates for common replies",
      "A VA to handle routine messages",
      "Tools like Front or Superhuman",
      "Still requires human time and judgment for every message that comes in"
    ],
    ai: [
      "An AI agent reads every inbound, categorises by urgency, and drafts replies in your voice",
      "Routine messages handled autonomously without you touching them",
      "Follow-ups and chasers sent at the right moment automatically",
      "Only the messages that genuinely need a decision reach you",
      "Your inbox becomes a decision feed, not a task list"
    ]
  },
  finance: {
    label: "Finance and invoicing",
    description: "Finance ops is manual, slow, and leaking money. Invoices go out late, expenses are not tracked in real time, and monthly reconciliation eats hours you do not have. Cash flow suffers because the system depends on you remembering.",
    manual: [
      "Spreadsheets updated manually each month",
      "Tools like QuickBooks or Xero requiring manual data entry",
      "Monthly check-ins with your accountant after the fact",
      "Someone chasing invoices by hand and copying data between platforms",
      "Still relies on a human to notice when something is overdue"
    ],
    ai: [
      "An AI agent monitors your inbox for payment confirmations and flags overdue invoices",
      "Expenses auto-categorised from receipts and card transactions in real time",
      "Invoice reminders sent automatically at the right cadence without manual effort",
      "P&L summary generated on demand, no accountant required for routine questions",
      "Finance runs itself. You see the numbers. You do not manage the process."
    ]
  },
  clients: {
    label: "Client tracking and follow-up",
    description: "Leads slip through the cracks. Follow-ups happen too late or not at all. You are relying on memory and scattered notes to track where each relationship stands. Revenue is leaking from the pipeline every week.",
    manual: [
      "A CRM like HubSpot, Notion, or a spreadsheet updated manually",
      "Reminders you set yourself and routinely ignore under pressure",
      "Someone manually logging every interaction after the fact",
      "Still requires consistent human discipline to keep the pipeline accurate"
    ],
    ai: [
      "An AI agent reads your inbox and flags new leads automatically",
      "Every client interaction logged to the pipeline without manual entry",
      "Follow-up messages triggered at the right moment based on last contact",
      "Pipeline summary surfaced each morning so nothing requires memory",
      "Leads do not go cold because the system does not forget"
    ]
  },
  coordination: {
    label: "Internal coordination",
    description: "Too much time coordinating between team members, clients, and tools. Information lives in different places and you are the connector. Every status update, handoff, and check-in runs through you.",
    manual: [
      "Project management tools like Asana or Monday updated manually",
      "Slack or WhatsApp threads requiring constant monitoring",
      "Regular standups to surface what should already be visible",
      "Still requires someone to hold the context and push things forward"
    ],
    ai: [
      "An AI agent monitors task status across tools and surfaces blockers before they become delays",
      "Automatic progress updates sent to the right people without you in the loop",
      "Handoffs triggered automatically when one step completes",
      "Status always visible without a standup or a chase message",
      "Your team moves without needing you as the connector"
    ]
  }
};
var DEFAULT_PAIN = {
  label: "Operations and admin overhead",
  description: "Too many moving parts, not enough system. Time is going to coordination, admin, and follow-up rather than to the work that actually moves the business. The bottleneck is the ops layer, not the work itself.",
  manual: [
    "A mix of spreadsheets, project tools, and manual reminders",
    "VAs handling repetitive tasks with limited context",
    "Processes that live in someone's head rather than in a system",
    "Still requires constant human attention to keep things moving"
  ],
  ai: [
    "A custom AI ops layer built around how your business actually runs",
    "Repetitive tasks automated end to end with no human touchpoints",
    "Proactive alerts when something needs attention before it becomes a problem",
    "A system that runs the ops so you can focus on the work that requires you"
  ]
};
function computeScore(answers) {
  const numericKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];
  let score = numericKeys.reduce((acc, k) => {
    const v = answers[k] || "0";
    return acc + (/^\d+$/.test(v) && parseInt(v, 10) > 0 ? 1 : 0);
  }, 0);
  if (answers.q10) score += 1;
  return score;
}
__name(computeScore, "computeScore");
function computeTier(score, q10) {
  const painMap = {
    email: "email and comms",
    finance: "finance and invoicing",
    clients: "client tracking",
    coordination: "internal coordination"
  };
  if (score <= 3) {
    return {
      tier: "Light Ops Burden",
      tierColor: "#4CAF82",
      summary: "Your ops are mostly under control. A couple of targeted automations would free up 3 to 5 hours per week.",
      findings: [
        "Email management could likely be partially automated",
        "One or two small automations would have high ROI for you",
        "Focus: find the one task you do every week and eliminate it"
      ]
    };
  }
  if (score <= 6) {
    return {
      tier: "Medium Ops Burden",
      tierColor: "#F4A234",
      summary: "You are spending significant time on tasks that should not need you. 4 to 6 automations would reclaim 8 to 12 hours per week.",
      findings: [
        "Email triage and follow-up are prime candidates for automation",
        "Client tracking likely has gaps that cost you leads",
        "Internal reporting is probably manual when it could run itself",
        "A structured ops system would change how your week feels"
      ]
    };
  }
  const findings = [
    "You are likely losing revenue to slow follow-up and missed leads",
    "Your week is probably reactive rather than structured",
    "Finance and invoicing gaps are costing you cash flow",
    "A full ops rebuild would free 15 or more hours per week"
  ];
  if (q10) findings.push(`Biggest pain (${painMap[q10] || q10}) is exactly where we start`);
  return {
    tier: "High Ops Burden",
    tierColor: "#E14B87",
    summary: "Ops is eating your time. This is the profile we see most often in fast-moving teams without a dedicated ops layer. The fix is systematic, not a single tool.",
    findings
  };
}
__name(computeTier, "computeTier");
function renderResults({ score, tier, tierColor, summary, findings, name, q10 }) {
  const pain = PAIN_CONTENT[q10] || DEFAULT_PAIN;
  const greeting = name ? `Hey ${name},` : "Your results are in.";
  const findingsHtml = findings.map(
    (f) => `<div style="display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.75rem;"><div style="width:8px;height:8px;border-radius:50%;background:${tierColor};flex-shrink:0;margin-top:.35rem;"></div><div style="font-size:.9rem;color:#ccc;line-height:1.5;">${f}</div></div>`
  ).join("");
  const manualHtml = pain.manual.map(
    (m) => `<div style="display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.6rem;"><div style="width:6px;height:6px;border-radius:50%;background:#444;flex-shrink:0;margin-top:.4rem;"></div><div style="font-size:.88rem;color:#888;line-height:1.5;">${m}</div></div>`
  ).join("");
  const aiHtml = pain.ai.map(
    (a) => `<div style="display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.6rem;"><div style="width:6px;height:6px;border-radius:50%;background:${tierColor};flex-shrink:0;margin-top:.4rem;"></div><div style="font-size:.88rem;color:#ccc;line-height:1.5;">${a}</div></div>`
  ).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Your Audit Results | Mexzungu Group</title>
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0a0a0a;color:#e0e0e0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100vh;padding:2rem 1rem;}
.container{max-width:600px;margin:0 auto;text-align:center;}
.logo{font-size:.75rem;font-weight:700;letter-spacing:.2em;color:#E14B87;text-transform:uppercase;margin-bottom:2rem;}
.ring{display:inline-block;width:130px;height:130px;border-radius:50%;background:#1a1a1a;border:5px solid ${tierColor};line-height:130px;font-size:2.4rem;font-weight:800;color:${tierColor};margin-bottom:1.25rem;}
h1{font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:.4rem;}
.badge{display:inline-block;background:${tierColor}22;color:${tierColor};font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.25rem .75rem;border-radius:20px;margin-bottom:1rem;}
.summary{font-size:.95rem;color:#999;line-height:1.6;margin-bottom:2rem;}
.findings{background:#111;border-radius:10px;padding:1.5rem;text-align:left;margin-bottom:1.25rem;}
.ft{font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#666;margin-bottom:1rem;}
.note{font-size:.78rem;color:#444;margin-top:1rem;}
.section-card{background:#111;border-radius:10px;padding:1.5rem;text-align:left;margin-bottom:1.25rem;}
.ai-card{border:1px solid ${tierColor}44;background:#0f0a0d;}
.section-title{font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#666;margin-bottom:.6rem;}
.ai-card .section-title{color:${tierColor};}
.pain-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:.6rem;}
.pain-desc{font-size:.88rem;color:#999;line-height:1.6;}</style>
</head>
<body><div class="container">
<div class="logo">Mexzungu Group</div>
<div class="ring">${score}<span style="font-size:1rem;font-weight:400;color:#888">/10</span></div>
<h1>${greeting}</h1>
<div class="badge">${tier}</div>
<p class="summary">${summary}</p>
<div class="section-card">
<div class="section-title">Your main pain point</div>
<div class="pain-label">${pain.label}</div>
<p class="pain-desc">${pain.description}</p>
</div>
<div class="findings"><div class="ft">Where to focus first</div>${findingsHtml}</div>
<div class="section-card">
<div class="section-title">The traditional fix</div>
${manualHtml}
</div>
<div class="section-card ai-card">
<div class="section-title">What we actually build</div>
${aiHtml}
</div>
<p style="font-size:.85rem;color:#666;margin-bottom:1rem;">You can reach us at <a href="mailto:janis@mexzungu.com" style="color:${tierColor};text-decoration:none;">janis@mexzungu.com</a> or book a free call below.</p>
<a href="https://calendar.app.google/UKGRMUK9yTpH5UK59" style="display:inline-block;margin-bottom:1.5rem;padding:.85rem 2rem;background:#E14B87;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:1rem;">Book a free ops audit call</a>
<p class="note">Mexzungu Group builds custom AI ops systems for small teams. No templates. No off-the-shelf tools.</p>
</div></body></html>`;
}
__name(renderResults, "renderResults");
async function onRequestPost14(context) {
  const { request } = context;
  const formData = await request.formData();
  const answers = {
    q1: formData.get("q1") || "0",
    q2: formData.get("q2") || "0",
    q3: formData.get("q3") || "0",
    q4: formData.get("q4") || "0",
    q5: formData.get("q5") || "0",
    q6: formData.get("q6") || "0",
    q7: formData.get("q7") || "0",
    q8: formData.get("q8") || "0",
    q9: formData.get("q9") || "0",
    q10: formData.get("q10") || ""
  };
  const name = formData.get("name") || "";
  const email = formData.get("email") || "";
  const company = formData.get("company") || "";
  const score = computeScore(answers);
  const { tier, tierColor, summary, findings } = computeTier(score, answers.q10);
  const now = /* @__PURE__ */ new Date();
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  const resultId = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}_${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
  const resultRecord = {
    id: resultId,
    timestamp: now.toISOString(),
    name,
    email,
    company,
    score,
    tier,
    tier_color: tierColor,
    top_pain: answers.q10,
    summary,
    findings,
    answers: {
      q1: answers.q1,
      q2: answers.q2,
      q3: answers.q3,
      q4: answers.q4,
      q5: answers.q5,
      q6: answers.q6,
      q7: answers.q7,
      q8: answers.q8,
      q9: answers.q9
    }
  };
  context.waitUntil(
    fetch(RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...resultRecord, secret: RELAY_SECRET })
    }).catch(() => {
    })
  );
  const html2 = renderResults({ score, tier, tierColor, summary, findings, name, q10: answers.q10 });
  return new Response(html2, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(onRequestPost14, "onRequestPost");

// api/ig-callback.js
var APP_ID = "790572287045953";
var APP_SECRET = "ad0e3ff5610c2fd2381007c73fab878e";
var REDIRECT = "https://mexzungu.com/api/ig-callback";
async function onRequest3(context) {
  const { request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error_description") || url.searchParams.get("error");
  if (error) {
    return html(`<h2 style="color:red">Error</h2><pre>${error}</pre>`);
  }
  if (!code) {
    return html(`<h2 style="color:#E14B87">Waiting for Instagram login...</h2><p>Nothing here yet.</p>`);
  }
  const body = new URLSearchParams({
    client_id: APP_ID,
    client_secret: APP_SECRET,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT,
    code
  });
  let shortToken, userId;
  try {
    const r1 = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    const d1 = await r1.json();
    if (!d1.access_token) {
      return html(`<h2 style="color:red">Token exchange failed</h2><pre>${JSON.stringify(d1, null, 2)}</pre>`);
    }
    shortToken = d1.access_token;
    userId = d1.user_id;
  } catch (e) {
    return html(`<h2 style="color:red">Exchange error</h2><pre>${e}</pre>`);
  }
  const r2 = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${APP_SECRET}&access_token=${shortToken}`
  );
  const d2 = await r2.json();
  const finalToken = d2.access_token || shortToken;
  const expiry = d2.expires_in ? `${Math.round(d2.expires_in / 86400)} days` : "short-lived only";
  let vpsSaveStatus = "";
  try {
    const saveResp = await fetch("https://api.mexzungu.com/instagram/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-IG-Secret": "igSaveSecret2026" },
      body: JSON.stringify({ access_token: finalToken, user_id: userId, expires_in: d2.expires_in || 0 })
    });
    vpsSaveStatus = saveResp.ok ? "Token saved to VPS automatically." : `VPS save failed: ${saveResp.status} - copy token manually below.`;
  } catch (e) {
    vpsSaveStatus = `VPS save error: ${e.message} - copy token manually below.`;
  }
  return html(`
    <h1 style="color:#E14B87">Instagram Token Ready</h1>
    <p><b>User ID:</b> ${userId}</p>
    <p><b>Expires:</b> ${expiry}</p>
    <p style="color:${vpsSaveStatus.startsWith("Token saved") ? "#4caf50" : "#ff9800"}">${vpsSaveStatus}</p>
    <p><b>Token (copy this):</b></p>
    <textarea rows="5" style="width:100%;font-size:13px;padding:8px" onclick="this.select()">${finalToken}</textarea>
    <br><br>
    <button onclick="navigator.clipboard.writeText('${finalToken}').then(()=>alert('Copied!'))">Copy Token</button>
  `);
}
__name(onRequest3, "onRequest");
function html(body) {
  return new Response(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;background:#0d0d0d;color:#fafafa">${body}</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
__name(html, "html");

// api/ig-webhook.js
var VERIFY_TOKEN = "mexzungu_ig_janis_2026";
async function onRequest4(context) {
  const { request } = context;
  const url = new URL(request.url);
  if (request.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }
  if (request.method === "POST") {
    return new Response("OK", { status: 200 });
  }
  return new Response("Method Not Allowed", { status: 405 });
}
__name(onRequest4, "onRequest");

// ../.wrangler/tmp/pages-eZPNOJ/functionsRoutes-0.06195688415869105.mjs
var routes = [
  {
    routePath: "/api/temp-check/alert",
    mountPath: "/api/temp-check",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/temp-check/alert",
    mountPath: "/api/temp-check",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/temp-check/heartbeat",
    mountPath: "/api/temp-check",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/temp-check/heartbeat",
    mountPath: "/api/temp-check",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/temp-check/latest",
    mountPath: "/api/temp-check",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/temp-check/latest",
    mountPath: "/api/temp-check",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions3]
  },
  {
    routePath: "/api/temp-check/log",
    mountPath: "/api/temp-check",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions4]
  },
  {
    routePath: "/api/temp-check/log",
    mountPath: "/api/temp-check",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/rate/:path*",
    mountPath: "/api/rate",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/rate/:path*",
    mountPath: "/api/rate",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions5]
  },
  {
    routePath: "/api/rate/:path*",
    mountPath: "/api/rate",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/jouissance-auth/:path*",
    mountPath: "/api/jouissance-auth",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/pp-auth/:path*",
    mountPath: "/api/pp-auth",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/duara-audit",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions6]
  },
  {
    routePath: "/api/duara-audit",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/duara-chat",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions7]
  },
  {
    routePath: "/api/duara-chat",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  },
  {
    routePath: "/api/duara-save",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/duara-save",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions8]
  },
  {
    routePath: "/api/duara-save",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost7]
  },
  {
    routePath: "/api/jouissance-workshop",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  },
  {
    routePath: "/api/jouissance-workshop",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions9]
  },
  {
    routePath: "/api/jouissance-workshop",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost8]
  },
  {
    routePath: "/api/jva-load",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet5]
  },
  {
    routePath: "/api/jva-load",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions10]
  },
  {
    routePath: "/api/jva-save",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions11]
  },
  {
    routePath: "/api/jva-save",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost9]
  },
  {
    routePath: "/api/sha-audit",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions12]
  },
  {
    routePath: "/api/sha-audit",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost10]
  },
  {
    routePath: "/api/sha-submit",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions13]
  },
  {
    routePath: "/api/sha-submit",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost11]
  },
  {
    routePath: "/api/sheets-proxy",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions14]
  },
  {
    routePath: "/api/sheets-proxy",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost12]
  },
  {
    routePath: "/api/sign",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions15]
  },
  {
    routePath: "/api/sign",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost13]
  },
  {
    routePath: "/audit/submit",
    mountPath: "/audit",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost14]
  },
  {
    routePath: "/api/ig-callback",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/api/ig-webhook",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest4]
  }
];

// ../../.npm/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
