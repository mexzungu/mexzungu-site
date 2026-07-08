/**
 * Cloudflare Pages Function: Public audit form submission handler
 * POST /audit/submit
 *
 * Mirrors the logic in api.mexzungu.com/audit/submit (tools_server.py).
 * Computes score + tier in JS, renders results HTML inline, and relays
 * the result record to forms.mexzungu.com/audit-relay for VPS persistence
 * and Telegram notification (CF outbound to Telegram is blocked, relay is not).
 */

const RELAY_URL = "https://forms.mexzungu.com/audit-relay";
const RELAY_SECRET = "audit-relay-2026";

const PAIN_CONTENT = {
  email: {
    label: "Email and communications",
    description: "Your inbox is a second job. You are triaging, drafting, chasing, and following up on things that should never reach you. Every hour spent in email is an hour not spent on clients or revenue.",
    manual: [
      "Inbox zero systems and folder rules",
      "Templates for common replies",
      "A VA to handle routine messages",
      "Tools like Front or Superhuman",
      "Still requires human time and judgment for every message that comes in",
    ],
    ai: [
      "An AI agent reads every inbound, categorises by urgency, and drafts replies in your voice",
      "Routine messages handled autonomously without you touching them",
      "Follow-ups and chasers sent at the right moment automatically",
      "Only the messages that genuinely need a decision reach you",
      "Your inbox becomes a decision feed, not a task list",
    ],
  },
  finance: {
    label: "Finance and invoicing",
    description: "Finance ops is manual, slow, and leaking money. Invoices go out late, expenses are not tracked in real time, and monthly reconciliation eats hours you do not have. Cash flow suffers because the system depends on you remembering.",
    manual: [
      "Spreadsheets updated manually each month",
      "Tools like QuickBooks or Xero requiring manual data entry",
      "Monthly check-ins with your accountant after the fact",
      "Someone chasing invoices by hand and copying data between platforms",
      "Still relies on a human to notice when something is overdue",
    ],
    ai: [
      "An AI agent monitors your inbox for payment confirmations and flags overdue invoices",
      "Expenses auto-categorised from receipts and card transactions in real time",
      "Invoice reminders sent automatically at the right cadence without manual effort",
      "P&L summary generated on demand, no accountant required for routine questions",
      "Finance runs itself. You see the numbers. You do not manage the process.",
    ],
  },
  clients: {
    label: "Client tracking and follow-up",
    description: "Leads slip through the cracks. Follow-ups happen too late or not at all. You are relying on memory and scattered notes to track where each relationship stands. Revenue is leaking from the pipeline every week.",
    manual: [
      "A CRM like HubSpot, Notion, or a spreadsheet updated manually",
      "Reminders you set yourself and routinely ignore under pressure",
      "Someone manually logging every interaction after the fact",
      "Still requires consistent human discipline to keep the pipeline accurate",
    ],
    ai: [
      "An AI agent reads your inbox and flags new leads automatically",
      "Every client interaction logged to the pipeline without manual entry",
      "Follow-up messages triggered at the right moment based on last contact",
      "Pipeline summary surfaced each morning so nothing requires memory",
      "Leads do not go cold because the system does not forget",
    ],
  },
  coordination: {
    label: "Internal coordination",
    description: "Too much time coordinating between team members, clients, and tools. Information lives in different places and you are the connector. Every status update, handoff, and check-in runs through you.",
    manual: [
      "Project management tools like Asana or Monday updated manually",
      "Slack or WhatsApp threads requiring constant monitoring",
      "Regular standups to surface what should already be visible",
      "Still requires someone to hold the context and push things forward",
    ],
    ai: [
      "An AI agent monitors task status across tools and surfaces blockers before they become delays",
      "Automatic progress updates sent to the right people without you in the loop",
      "Handoffs triggered automatically when one step completes",
      "Status always visible without a standup or a chase message",
      "Your team moves without needing you as the connector",
    ],
  },
};

const DEFAULT_PAIN = {
  label: "Operations and admin overhead",
  description: "Too many moving parts, not enough system. Time is going to coordination, admin, and follow-up rather than to the work that actually moves the business. The bottleneck is the ops layer, not the work itself.",
  manual: [
    "A mix of spreadsheets, project tools, and manual reminders",
    "VAs handling repetitive tasks with limited context",
    "Processes that live in someone's head rather than in a system",
    "Still requires constant human attention to keep things moving",
  ],
  ai: [
    "A custom AI ops layer built around how your business actually runs",
    "Repetitive tasks automated end to end with no human touchpoints",
    "Proactive alerts when something needs attention before it becomes a problem",
    "A system that runs the ops so you can focus on the work that requires you",
  ],
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

function computeTier(score, q10) {
  const painMap = {
    email: "email and comms",
    finance: "finance and invoicing",
    clients: "client tracking",
    coordination: "internal coordination",
  };
  if (score <= 3) {
    return {
      tier: "Light Ops Burden",
      tierColor: "#4CAF82",
      summary: "Your ops are mostly under control. A couple of targeted automations would free up 3 to 5 hours per week.",
      findings: [
        "Email management could likely be partially automated",
        "One or two small automations would have high ROI for you",
        "Focus: find the one task you do every week and eliminate it",
      ],
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
        "A structured ops system would change how your week feels",
      ],
    };
  }
  const findings = [
    "You are likely losing revenue to slow follow-up and missed leads",
    "Your week is probably reactive rather than structured",
    "Finance and invoicing gaps are costing you cash flow",
    "A full ops rebuild would free 15 or more hours per week",
  ];
  if (q10) findings.push(`Biggest pain (${painMap[q10] || q10}) is exactly where we start`);
  return {
    tier: "High Ops Burden",
    tierColor: "#E14B87",
    summary: "Ops is eating your time. This is the profile we see most often in fast-moving teams without a dedicated ops layer. The fix is systematic, not a single tool.",
    findings,
  };
}

function renderResults({ score, tier, tierColor, summary, findings, name, q10 }) {
  const pain = PAIN_CONTENT[q10] || DEFAULT_PAIN;
  const greeting = name ? `Hey ${name},` : "Your results are in.";

  const findingsHtml = findings.map(f =>
    `<div style="display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.75rem;">` +
    `<div style="width:8px;height:8px;border-radius:50%;background:${tierColor};flex-shrink:0;margin-top:.35rem;"></div>` +
    `<div style="font-size:.9rem;color:#ccc;line-height:1.5;">${f}</div></div>`
  ).join("");

  const manualHtml = pain.manual.map(m =>
    `<div style="display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.6rem;">` +
    `<div style="width:6px;height:6px;border-radius:50%;background:#444;flex-shrink:0;margin-top:.4rem;"></div>` +
    `<div style="font-size:.88rem;color:#888;line-height:1.5;">${m}</div></div>`
  ).join("");

  const aiHtml = pain.ai.map(a =>
    `<div style="display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.6rem;">` +
    `<div style="width:6px;height:6px;border-radius:50%;background:${tierColor};flex-shrink:0;margin-top:.4rem;"></div>` +
    `<div style="font-size:.88rem;color:#ccc;line-height:1.5;">${a}</div></div>`
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

export async function onRequestPost(context) {
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
    q10: formData.get("q10") || "",
  };
  const name = formData.get("name") || "";
  const email = formData.get("email") || "";
  const company = formData.get("company") || "";

  const score = computeScore(answers);
  const { tier, tierColor, summary, findings } = computeTier(score, answers.q10);

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const resultId = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}_${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;

  const resultRecord = {
    id: resultId,
    timestamp: now.toISOString(),
    name, email, company,
    score, tier,
    tier_color: tierColor,
    top_pain: answers.q10,
    summary, findings,
    answers: {
      q1: answers.q1, q2: answers.q2, q3: answers.q3, q4: answers.q4,
      q5: answers.q5, q6: answers.q6, q7: answers.q7, q8: answers.q8, q9: answers.q9,
    },
  };

  // Relay to VPS in background for persistence and Telegram notification
  context.waitUntil(
    fetch(RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...resultRecord, secret: RELAY_SECRET }),
    }).catch(() => {})
  );

  const html = renderResults({ score, tier, tierColor, summary, findings, name, q10: answers.q10 });
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
