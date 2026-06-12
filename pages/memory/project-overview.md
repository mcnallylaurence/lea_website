---
name: Ladybird Ever After website project
description: Squarespace headless site — HTML injected into code blocks. Pages folder contains all HTML files. Brand rules in ladybird-html-rules.md.
type: project
---

The site is built "headless" on Squarespace — each page's content is a full HTML block injected into a Squarespace code block, overriding what Squarespace renders. Files live in `/pages/`.

**Why:** Gives full design control while keeping Squarespace as the host/CMS backbone.

**How to apply:** Every HTML file is self-contained (fonts, style, markup, script). No external CSS/JS files. All styles scoped to `.lb-{page}` root class. Long pages split into 2 code blocks for loading speed.

**Spec doc:** ladybird-master-spec-v3.html (attached to conversation)
**Pricing JSON:** lea_packages_context.json
**Brand rules:** ladybird-html-rules.md (also at /pages/venues/ladybird-html-rules.md)

**4 packages (v3, RiRa removed):**
- Failte: $4,900 · 2-4 guests · Elopement
- Gra: $6,800 · 5-12 guests · Elopement
- Slainte: $8,700 · 13-25 guests · Most Popular (75% close rate)
- Ard: $9,800 · 26-50 guests · Wedding

**Key pages to build/refactor:**
- Homepage (split 2 blocks)
- /packages (refactor)
- /venues (refactor)
- /venues/p/[slug] (individual venue template)
- /real-love (index of all happy couples)
- /happy-couples/[slug] (individual couple pages — 10 exist)
- /about
- /get-in-touch (HubSpot form)
- /elopement-in-ireland (SEO landing page)

**Components folder** used for reusable blocks (CTA section, social proof bar, etc.)
