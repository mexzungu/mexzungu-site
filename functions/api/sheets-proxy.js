/**
 * Cloudflare Pages Function — Google Sheets CSV proxy
 * POST /api/sheets-proxy
 * Accepts { url: "https://docs.google.com/spreadsheets/d/..." }
 * Fetches the CSV server-side (no CORS) and returns the raw text.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestPost(context) {
  const { request } = context;

  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ ok: false, error: "Missing url" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only allow Google Sheets domains
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("docs.google.com") && !parsed.hostname.endsWith("spreadsheets.google.com")) {
      return new Response(JSON.stringify({ ok: false, error: "Only Google Sheets URLs are allowed." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Janis/1.0)" },
      redirect: "follow",
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: `Google returned ${res.status}. Make sure the sheet is shared with "Anyone with the link can view."` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const csv = await res.text();
    return new Response(csv, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
