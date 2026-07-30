# Research Hub — Design Spec
**Date:** 2026-05-12
**Status:** Approved
**Scope:** Internal research archive at mexzungu.com/research

---

## Overview

A password-protected internal research hub at `/research`. Aggregates all research reports produced for Mexzungu Group into a single browsable archive. Not linked from the public site. Access via localStorage-based password gate.

---

## Auth

- **Method:** Client-side password check with localStorage persistence
- **Flow:** `/research` loads a full-screen password gate. Wrong password: shake animation. Correct password: sets `mexzungu_research_auth=true` in localStorage, transitions to hub.
- **Persistence:** Authenticated permanently per browser (no expiry)
- **Guard:** Every report page checks localStorage on load. If not authenticated, redirects to `/research`.
- **Password:** Set at build time in a shared `research-auth.js` constant (hashed with SHA-256)

---

## Landing Page — `/research/index.html`

- Dark background matching mexzungu.com brand (#0a0a0a, hot pink #E14B87 accents)
- Header: "Research Hub" + tagline "Internal. Confidential."
- Filter bar: All / Business / Tech (categories present in current report set)
- Card grid (responsive: 3 col desktop, 2 col tablet, 1 col mobile)
- Each card: title, date, category tag, 1-line description, estimated read time
- Click → individual report page

---

## Report Template

Consistent layout for all report pages:

1. **Nav bar:** Back arrow → Research Hub, Mexzungu logo
2. **Header:** Title, metadata bar (date · category · N sources · X min read)
3. **Key Findings box:** 3-5 bullet highlights at the top — the most important takeaways
4. **Body:** Full report content in clean long-form layout (max-width 720px, comfortable line height)
5. **Table of contents:** Sticky on desktop for reports with 4+ sections

---

## Reports (5)

| Slug | Title | Category | Source file |
|------|-------|----------|-------------|
| `ibl` | Intent-Based Leadership | Business | `brain/notes/research-intent-based-leadership.md` |
| `outlaw-market` | Newsletter Market Research | Business | `brain/areas/mexzungu/outlaw-chronicles-nl/market-research-2026-04.md` |
| `proposal-structure` | The Mexzungu Proposal Structure | Business | `brain/areas/mexzungu/bd/proposal-structure-research.md` |
| `client-hub` | Client Hub Design Research | Business | `brain/areas/mexzungu/client-hub-research.md` |
| `waha` | WhatsApp Group Access: WAHA Scope | Tech | (compiled from session context — no source file) |
| `janis-optimization` | Janis Optimization — Brain, Memory & Proactive Capabilities | Tech | `brain/notes/research-janis-optimization.md` |

---

## File Structure

```
mexzungu-site/
  research/
    index.html          # password gate + hub landing (combined)
    research-auth.js    # shared auth constants + check function
    ibl/
      index.html
    outlaw-market/
      index.html
    proposal-structure/
      index.html
    client-hub/
      index.html
    waha/
      index.html
```

---

## Constraints

- Cloudflare Pages static deployment — no server-side logic
- Must use `bash deploy.sh` to go live (not git push)
- Shared CSS via mexzungu-site's existing `style.css` plus report-specific inline styles
- No external JS dependencies
- Auth JS must be identical across all pages (copy, not import — Pages has no module bundler)
