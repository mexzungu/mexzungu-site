# Full Website Audit, Roadmap, Monetization Plan & AI Policy Memo

**Date:** 2026-04-05
**Prepared by:** Freddie (CMO), Bowie (CTO), Bruce (CSO), Lemmy (CLO), Gene (CFO)
**Launch date:** April 9, 2026

---

## PART 1: CONSOLIDATED AUDIT FINDINGS

### P0 — BLOCKS LAUNCH (Fix before April 9)

| # | Site | Finding | Pages affected |
|---|------|---------|----------------|
| **A1** | **BOTH** | **Goldman Sachs fabrication.** Multiple pages claim Pepe worked at Goldman Sachs. He never did. Real career: Chadbourne & Parke (Mexico City, 2010-2016), Yale MAM Class of 2017, Camino de Santiago, ALU/ALX (VP of Expansion), Mexzungu Group. | mexzungu.com: index.html, meet-the-band, venture-architecture, lets-jam, es/ versions. pepecarrillo.co: index.html, about, accelerator, writing/founders-structural-blueprint |
| **A2** | pepecarrillo.co | **Missing OG image.** All pages reference `/img/og-card.png` but the file doesn't exist. Social shares (LinkedIn, Twitter) will show no preview card. | All pages |
| **A3** | pepecarrillo.co | **Newsletter posts to wrong list.** Buttondown endpoint is `mexzungu` (the firm list), not a pepecarrillo-specific list. All subscribers go to the wrong place. | main.js line 15 |

### P1 — Must fix before or immediately after launch

| # | Site | Finding |
|---|------|---------|
| **B1** | mexzungu.com | **"Four pillars" but only three shown.** Hero says "Four pillars. Zero bullshit." / "Cuatro pilares. Cero rodeos." but only VA, Rebel Capital, and AI Ninja Factory exist. Rockstar Accelerator is missing from nav and site. |
| **B2** | mexzungu.com | **Sitemap incomplete.** 6+ Outlaw Chronicles article pages missing from sitemap.xml. ES pages not listed as standalone entries. |
| **B3** | mexzungu.com | **Hreflang trailing slash inconsistencies.** Mixed trailing/no-trailing slash between EN canonicals and ES hreflang targets. |
| **B4** | mexzungu.com | **Newsletter API endpoint unverified.** `api.mexzungu.com/newsletter/subscribe` must be confirmed live before launch. |
| **B5** | pepecarrillo.co | **Missing portrait on About page.** Placeholder div with "Portrait coming soon." Personal brand needs a face. |
| **B6** | pepecarrillo.co | **Content engine architecture won't scale.** No categories, no RSS feed, no archive structure. Strategic plan calls for 3 posts/week. With 2+ essays the writing page becomes a wall of cards with no discoverability. |
| **B7** | pepecarrillo.co | **Accelerator differentiation unclear.** Strong on emotion, weak on "why THIS vs. a career coach or ALX." No comparison, no alumni testimonials (product is new). |
| **B8** | pepecarrillo.co | **Missing _headers file.** No security headers (CSP, X-Frame-Options, etc.). |
| **B9** | BOTH | **Cross-site relationship unexplained.** Footer links exist but no text explains when to go where. Visitors don't know the difference. |
| **B10** | pepecarrillo.co | **Weak homepage CTA.** No clear primary action. Hero flows into essay feed with no button or direction. |
| **B11** | mexzungu.com | **Newsletter GDPR opt-in placement.** Consent text appears after submit button, not before. Should be a pre-submission checkbox for EU traffic. |

### P2 — Fix soon after launch

| # | Site | Finding |
|---|------|---------|
| **C1** | mexzungu.com | "Trusted By" logo section is ambiguous (employers, clients, portfolio companies mixed without context) |
| **C2** | mexzungu.com | OG images are generic (same logo on all pages, no page-specific social cards) |
| **C3** | mexzungu.com | Rock Salt typography rule not applied (brand guidelines: one Rock Salt moment per page) |
| **C4** | mexzungu.com | Missing _headers security file |
| **C5** | mexzungu.com | No custom 404 page |
| **C6** | mexzungu.com | Unused 4.9MB logo file (logo-v2-uhd.png) |
| **C7** | mexzungu.com | Missing meta descriptions on legal pages |
| **C8** | mexzungu.com | Anonymous testimonials weaken trust ("Senior Leader, Tech") |
| **C9** | mexzungu.com | Pillar pages lack pricing/engagement model clarity |
| **C10** | mexzungu.com | Legal disclaimers inconsistent across pages |
| **C11** | pepecarrillo.co | No share buttons on essays (kills LinkedIn distribution) |
| **C12** | pepecarrillo.co | No analytics/tracking (flying blind on what resonates) |
| **C13** | pepecarrillo.co | Newsletter copy lacks cadence, incentive, and archive link |
| **C14** | pepecarrillo.co | Unused font weight (Space Grotesk 500) loaded |
| **C15** | pepecarrillo.co | No 404 page |
| **C16** | pepecarrillo.co | Accelerator missing: application deadline, cohort start date, FAQ |
| **C17** | pepecarrillo.co | Stats ($6B+, 10+ countries) lack context (time period, sectors) |
| **C18** | BOTH | Career narrative vague on real achievements (Chadbourne dates, Yale MAM credential, ALU/ALX VP title all missing from bios) |

---

## PART 2: IMPROVEMENT ROADMAP

### Phase 0: Launch-Critical (April 5-8, before April 9)

**Goal:** Remove all launch blockers. Ship clean.

| Task | Site | Owner | Time |
|------|------|-------|------|
| Rewrite Goldman Sachs to real career narrative (all pages, both sites, EN+ES) | BOTH | Janis | 2h |
| Create og-card.png for pepecarrillo.co (1200x630, branded) | PPC | Janis | 30m |
| Fix newsletter endpoint (confirm Buttondown list ID) | PPC | Janis | 15m |
| Change "Four pillars" to "Three pillars" (EN+ES) | MGL | Janis | 15m |
| Add portrait photo to About page (use existing headshot or Ro's photos) | PPC | Pepe (photo) + Janis (code) | 15m |
| Add GDPR checkbox to newsletter forms | MGL | Janis | 30m |
| Verify api.mexzungu.com/newsletter/subscribe is live | MGL | Janis | 15m |
| Add one-line cross-site explanation to footers of both sites | BOTH | Janis | 30m |

### Phase 1: Launch Week (April 9-13)

**Goal:** Content engine operational. Conversion paths clear.

| Task | Site | Owner | Time |
|------|------|-------|------|
| Fix sitemap (add missing pages, ES standalone entries) | MGL | Janis | 1h |
| Fix hreflang trailing slash inconsistencies | MGL | Janis | 1h |
| Build content architecture: categories, RSS feed, archive view | PPC | Janis | 3h |
| Add share buttons to essay pages (LinkedIn, X, email) | PPC | Janis | 1h |
| Add homepage CTA (accelerator or writing subscription) | PPC | Janis | 30m |
| Create _headers files for both sites (security headers) | BOTH | Janis | 30m |
| Create 404 pages for both sites | BOTH | Janis | 1h |
| Add Cloudflare Web Analytics to both sites | BOTH | Janis | 30m |
| Delete unused logo-v2-uhd.png (4.9MB) | MGL | Janis | 5m |

### Phase 2: Post-Launch Polish (April 14-27)

**Goal:** Trust signals, brand polish, conversion optimization.

| Task | Site | Owner | Time |
|------|------|-------|------|
| Create page-specific OG images (1 per pillar page + homepage) | MGL | Janis | 2h |
| Apply Rock Salt typography rule (1 accent per page) | BOTH | Janis | 1h |
| Clarify "Trusted By" section (segment by relationship type) | MGL | Janis | 1h |
| Add indicative pricing to pillar pages | MGL | Pepe (decision) + Janis | 1h |
| Strengthen accelerator page (comparison matrix, FAQ, cohort dates) | PPC | Janis | 2h |
| Replace anonymous testimonials with named ones | MGL | Pepe (outreach) | Ongoing |
| Add context to stat cards ($6B over what period) | PPC | Janis | 30m |
| Add meta descriptions to legal pages | MGL | Janis | 15m |
| Standardize legal disclaimers across pages | MGL | Lemmy + Janis | 1h |
| Newsletter copy refresh (cadence, value prop, archive link) | PPC | Janis | 30m |
| Add real career details to bios (Chadbourne dates, Yale MAM, ALU/ALX VP title) | BOTH | Janis | 1h |

### Phase 3: Q2 Growth Engine (May-June)

**Goal:** Content engine at velocity. Pipeline generating leads.

| Task | Site | Owner | Time |
|------|------|-------|------|
| Publish 3 essays/week on pepecarrillo.co | PPC | Freddie + Pepe | Ongoing |
| Build pillar-specific CTAs on mexzungu.com (VA: strategy call, RC: send deck, AINF: apply) | MGL | Bono + Janis | 2h |
| Accelerator alumni testimonials (Cohort 1 feedback) | PPC | Pepe | May |
| Competitive intelligence page or positioning refresh | MGL | Bruce | 2h |
| A/B test CTA placements (hero vs post-hero vs post-testimonials) | MGL | Freddie + Bowie | Ongoing |
| Add case studies or engagement examples to VA page | MGL | Pepe + Janis | 3h |
| Monthly content performance review (analytics) | BOTH | Freddie | Monthly |

---

## PART 3: MONETIZATION PLAN

### Revenue Architecture

Mexzungu Group targets **$150K consulting revenue in 2026** (Album goal A1). The two websites serve different roles in the revenue funnel:

```
AWARENESS                    CONSIDERATION                CONVERSION
(pepecarrillo.co)           (both sites)                 (mexzungu.com)

LinkedIn posts ──┐
Essays/writing ──┤          ┌─ Accelerator ($1,200/pp)   ┌─ VA retainer ($5K-15K/mo)
Newsletter ──────┤──────────┤─ Let's Jam call            ├─ VA project ($10K-50K)
Social shares ───┘          ├─ Rebel Capital deck        ├─ RC investment ($10K-50K)
                            └─ AI Ninja application       └─ AINF placement (commission)
```

### Revenue Streams by Site

#### mexzungu.com (The Firm)

| Stream | Model | Target price | Q2 target | Annual target |
|--------|-------|-------------|-----------|---------------|
| **Venture Architecture** | Retainer or project | $5K-15K/month retainer; $10K-50K project | 2 active clients | $100K+ |
| **Rebel Capital** | Equity investment | $10K-50K cheques | 1 deal evaluated | $50K deployed |
| **AI Ninja Factory** | Placement commission | 15-25% of first-year contractor rate | 1 placement | $10K-20K |

**Monetization actions for mexzungu.com:**

1. **Add pricing signals to pillar pages** (Phase 2). Not exact prices, but ranges: "Engagements start at $5K/month." This pre-qualifies leads and saves time on calls that don't convert.

2. **Segment the Let's Jam booking flow.** Currently all call types go to one page. Tag each booking by pillar (VA, RC, AINF, general) so you can measure which pillar drives most inbound. This feeds the pipeline tracker (Tour goal T2).

3. **Add engagement letters/proposal templates.** When a call converts, Janis should auto-generate a branded proposal within 24h. Speed = differentiation.

4. **Invoice chase automation.** Gene's mandate. No invoice outstanding >30 days. Automate reminders via email at 7, 14, 21, 30 days.

#### pepecarrillo.co (Personal Brand)

| Stream | Model | Target price | Q2 target | Annual target |
|--------|-------|-------------|-----------|---------------|
| **Accelerator** | Cohort subscription | $300/month x 4 months ($1,200 total) | Cohort 1: 5 people | $6,000/cohort x 3 cohorts = $18K |
| **Newsletter** | Free (lead gen) | $0 | 200 subscribers | 1,000 subscribers |
| **Writing** | Free (authority building) | $0 | 12 essays | 50+ essays |

**Monetization actions for pepecarrillo.co:**

1. **Fill Accelerator Cohort 1.** 5 spots x $1,200 = $6,000. Actions:
   - Add application deadline and cohort start date to page (Phase 0)
   - LinkedIn announcement post (Day 1 content)
   - Direct outreach to 10 warm contacts from ALU/ALX network
   - Scholarship spots generate word-of-mouth

2. **Newsletter as pipeline feeder.** Every subscriber is a potential:
   - Accelerator applicant
   - VA client referral source
   - LinkedIn amplifier (share essays to their network)

3. **Writing as authority engine.** Essays are not revenue directly but they:
   - Generate LinkedIn impressions (T6 target: impressions up MoM)
   - Attract inbound DMs from founders who need VA services
   - Build email list for future product launches (paid cohort, courses, paid newsletter tier)

### Monetization Roadmap

| Phase | Revenue actions | Expected impact |
|-------|----------------|-----------------|
| **April (Doors Open)** | Launch content engine. Announce Accelerator Cohort 1. Seed pipeline with 10 outreach messages. | 5 pipeline leads, 50 newsletter subs |
| **May (First Encore)** | Close Cohort 1. First VA proposal from inbound. Invoice all active engagements. | $6K from Accelerator, 1 VA proposal |
| **June (Tour Ready)** | Content self-sustaining. Pipeline at 5+ always. Evaluate first RC deal. | $10K+ monthly run rate |
| **Q3-Q4** | Scale: 2+ VA retainers, Cohort 2+3, first AI Ninja placement. | $12K-15K/month |

### Revenue Target Tracking

| Metric | Current | April target | Q2 target | 2026 target |
|--------|---------|-------------|-----------|-------------|
| Active VA clients | ~2 (NCA, Duara) | 2 | 3 | 4+ |
| Monthly consulting revenue | ~$5K? | $5K | $10K | $12.5K avg |
| Accelerator revenue | $0 | $0 | $6K | $18K |
| AI Ninja placements | 0 | 0 | 1 | 3 |
| Newsletter subscribers | ~0 | 50 | 200 | 1,000 |
| LinkedIn followers | TBD | +50 | +500 | +1,000 |

---

## PART 4: LEMMY'S AI POLICY DECISION MEMO

### DECISION MEMO: AI Disclosure & Policy

**From:** Lemmy (CLO)
**To:** Pepe Carrillo (CDO)
**Date:** 2026-04-05
**Re:** Whether and how to disclose Janis and the Rock Council's role in business operations

---

### THE QUESTION

Mexzungu Group runs on AI. Janis is the Chief of Staff. The Rock Council (7 virtual C-suite personas) makes operational decisions. Client communications, proposals, contracts, and website content are AI-assisted or AI-generated.

**Should we disclose this, and where?**

---

### WHY THIS MATTERS

1. **Legal exposure.** The EU AI Act (effective Aug 2025) requires disclosure when AI systems interact with natural persons. If Janis sends emails, drafts contracts, or communicates with clients on Pepe's behalf, EU law may require disclosure.

2. **Client trust.** NCA, Duara, and Inscape are real clients with real boards. If they discover their "lawyer" is AI-assisted without knowing, trust erodes. Proactive disclosure builds credibility.

3. **Brand opportunity.** Mexzungu's entire positioning is "one person + AI outperforms a 50-person firm." Hiding the AI undermines the thesis. Disclosing it IS the brand.

4. **Competitive moat.** Being transparent about AI operations before competitors are forced to makes Mexzungu the thought leader, not the laggard.

---

### THREE OPTIONS

#### Option A: Embed in existing Privacy Policy + Terms

**How:** Add an "Artificial Intelligence" section to the Privacy Policy (data processing) and Terms of Service (service delivery). No standalone page.

**Pros:**
- Minimal new content
- Legally sufficient for GDPR and EU AI Act basics
- Standard practice for most companies

**Cons:**
- Nobody reads privacy policies
- Misses the brand opportunity
- Doesn't address the Rock Council (which is unique)
- Clients won't find it unless they look

**Lemmy's assessment:** Legally adequate but strategically weak.

#### Option B: Standalone AI Policy page + embed in Privacy/Terms

**How:** Create `/ai-policy` (or `/how-we-use-ai`) on mexzungu.com with a comprehensive, branded AI transparency page. Reference it from Privacy Policy and Terms. Link it in footer navigation.

**Content of standalone page:**
- Who Janis is and what she does (email triage, document drafting, scheduling, research)
- What the Rock Council is (virtual C-suite personas for decision quality)
- What AI models power operations (Anthropic Claude)
- What data is processed through AI (client communications, documents)
- What AI does NOT do (final decisions require Pepe's approval for Showtime items)
- Human oversight guarantees (IBL model: Showtime = human approval required)
- Data handling (Anthropic's data policies, no training on client data)
- How to opt out or request human-only interaction

**Pros:**
- Full legal compliance (GDPR, EU AI Act, future regulations)
- Brand-aligned: transparency IS the Mexzungu brand
- Competitive differentiator (no one else is doing this)
- Clients can reference it; boards can cite it
- Addresses the "Janis page" on the website (already public)

**Cons:**
- More work to create and maintain
- Must be accurate (any claim is legally binding)
- Needs updating when tools change

**Lemmy's assessment:** Recommended. This is the right call for Mexzungu.

#### Option C: Full AI Transparency Framework (standalone + per-client disclosure)

**How:** Everything in Option B, PLUS:
- Every client engagement letter includes an AI disclosure clause
- Every email from Janis includes a footer: "This message was drafted with AI assistance"
- Proposals include an "AI-Assisted" badge
- Accelerator participants are informed that curriculum and feedback may involve AI

**Pros:**
- Maximum transparency
- Bulletproof compliance
- Sets industry standard

**Cons:**
- Friction in every interaction
- Email footer feels corporate and undermines Janis's persona
- Over-disclosure can create anxiety ("wait, is anyone real?")
- Excessive for current scale

**Lemmy's assessment:** Too much for now. Revisit when Mexzungu has 10+ clients or handles regulated industries.

---

### RECOMMENDATION: Option B

**Create a standalone AI Transparency page on mexzungu.com, reference it from Privacy Policy and Terms, and link it from both site footers.**

#### Implementation Plan

**1. Create `/ai-policy/index.html` on mexzungu.com (and `/es/ai-policy/` for Spanish)**

Suggested structure:

```
# How We Use AI

Mexzungu Group is an AI-augmented firm. We believe in radical transparency
about how artificial intelligence powers our operations.

## Janis — Our AI Chief of Staff

Janis is our operational partner, built on Anthropic's Claude. She handles:
- Email triage and drafting
- Document research and preparation
- Calendar management and scheduling
- Client communication (always reviewed by Pepe for substantive matters)
- Financial filing and expense tracking

## The Rock Council — Our Virtual C-Suite

We use AI-powered personas to bring diverse strategic perspectives to
every decision:
- Lars (COO): Operations and delivery
- Freddie (CMO): Brand and content
- Gene (CFO): Finance and cash management
- Bowie (CTO): Technology and infrastructure
- Bono (CGO): Growth and pipeline
- Lemmy (CLO): Legal and compliance
- Bruce (CSO): Strategy and competitive intelligence

These personas are decision-support tools. Final decisions are always
made by Pepe Carrillo.

## Our AI Principles

1. **Human authority.** All substantive client decisions, contracts,
   pricing, and legal positions require Pepe's explicit approval.
2. **Transparency.** We disclose our use of AI to clients and partners.
3. **Data protection.** Client data processed through AI systems is
   handled per our Privacy Policy. We use Anthropic's API, which does
   not train on user data.
4. **Quality control.** AI-generated content is reviewed before
   delivery. We never send unreviewed AI output to clients.
5. **Right to human interaction.** Any client or partner can request
   direct human-only interaction at any time.

## Technology Stack

- **AI Model:** Anthropic Claude (Opus/Sonnet)
- **Infrastructure:** Self-hosted on European servers (Hetzner, Helsinki)
- **Data residency:** EU-based processing
- **Training:** Anthropic does not train on API data per their data policy

## Contact

Questions about our AI practices? Email pepe@mexzungu.com or
janis@mexzungu.com.
```

**2. Update Privacy Policy (both sites)**

Add section:

```
## Artificial Intelligence

We use AI systems (Anthropic Claude) in our business operations,
including email triage, document preparation, scheduling, and content
creation. Personal data processed through these systems is handled per
this Privacy Policy. Our AI provider (Anthropic) does not use API data
for model training. For full details on our AI practices, see our
AI Transparency Policy [link].
```

**3. Update Terms of Service (both sites)**

Add section:

```
## AI-Assisted Services

Mexzungu Group uses artificial intelligence tools in the delivery of
its services, including but not limited to research, document drafting,
analysis, and communication. All AI-assisted work is supervised by
qualified professionals. By engaging our services, you acknowledge
this use. You may request human-only interaction at any time.
```

**4. Add to pepecarrillo.co**

The accelerator page should include:

```
## A Note on AI

This programme uses AI tools in curriculum development, feedback, and
communication. Pepe personally leads all sessions and reviews all
feedback. Your data is never used for AI training.
```

**5. Footer link on both sites**

Add "AI Policy" to footer navigation on both mexzungu.com and pepecarrillo.co, linking to mexzungu.com/ai-policy/.

---

### LEGAL COMPLIANCE CHECKLIST

| Requirement | Status | Action |
|-------------|--------|--------|
| EU AI Act Art. 50 (transparency for AI systems interacting with persons) | Not compliant | Option B fixes this |
| GDPR Art. 13/14 (inform data subjects about automated processing) | Partially compliant (Privacy Policy exists) | Add AI section to Privacy Policy |
| GDPR Art. 22 (right not to be subject to solely automated decisions) | Compliant (Pepe reviews all substantive decisions) | Document in AI Policy |
| Spanish LOPDGDD (supplementary to GDPR) | Partially compliant | AI Policy + Privacy Policy update |
| Anthropic Usage Policy (commercial use disclosure) | Not addressed | AI Policy page addresses this |
| Client contractual obligations | Varies by client | Add AI clause to engagement letters (Phase 3) |

### TIMELINE

| When | What |
|------|------|
| April 5-8 | Draft AI Policy page content (Lemmy + Janis) |
| April 9 | Publish with launch (or within 48h of launch) |
| April 14-27 | Update Privacy Policy + Terms on both sites |
| May | Add AI disclosure clause to engagement letter template |
| Ongoing | Update when tools or practices change |

---

### DECISION REQUIRED

**Pepe, I recommend Option B.** Create the standalone AI Transparency page and integrate references into Privacy Policy and Terms. This is:

- Legally compliant with EU AI Act and GDPR
- Brand-aligned (transparency is the Mexzungu way)
- Competitively differentiated (no one else is doing this at our stage)
- Low-effort to implement (Janis can build the page in 1 hour)

**Do you approve Option B?** If yes, I'll build and ship it with the Phase 0 fixes.

---

*This memo was prepared by Lemmy (CLO) with research support from Janis. The content was reviewed for legal accuracy against EU AI Act provisions and GDPR requirements as of April 2026.*
