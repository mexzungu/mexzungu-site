/**
 * Cloudflare Pages Function: SHA Audit
 * POST /api/sha-audit
 * Accepts SHA text or Google Drive URL, runs Gemini analysis, returns score + clause breakdown.
 */

const GEMINI_MODEL = "gemini-2.0-flash-exp";

const AUDIT_PROMPT = `You are Janis, Chief of Staff at Mexzungu Group, a corporate lawyer turned operator who has read thousands of founders agreements. You are analyzing a shareholders agreement (SHA) for critical missing clauses.

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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context) {
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

    if (shaText.length > 120000) {
      shaText = shaText.substring(0, 120000) + "\n\n[Document truncated for analysis. First 120,000 characters analyzed.]";
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
            parts: [{ text: `${AUDIT_PROMPT}\n\n---\n\nSHAREHOLDERS AGREEMENT:\n\n${shaText}` }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
            maxOutputTokens: 2048,
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
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return err("Could not parse analysis output.", 500);
      analysis = JSON.parse(match[0]);
    }

    if (env.TELEGRAM_TOKEN && env.PEPE_CHAT_ID) {
      const scoreEmoji = analysis.score >= 4 ? "🟢" : analysis.score >= 2 ? "🟡" : "🔴";
      const tgText = `${scoreEmoji} SHA Audit submitted\n\nScore: ${analysis.score}/5 (${analysis.verdict?.toUpperCase()})\n\n${analysis.topRisk || ""}`;
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.PEPE_CHAT_ID, text: tgText })
      }).catch(() => {});
    }

    return new Response(JSON.stringify({ ok: true, analysis }), { status: 200, headers: corsHeaders });

  } catch (e) {
    return err(e.message, 500);
  }
}

function err(message, status) {
  return new Response(JSON.stringify({ ok: false, error: message }), { status, headers: corsHeaders });
}

function extractGoogleDocId(url) {
  const m = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
