# LADYBIRD EVER AFTER — COMPLETE SITE OVERHAUL MASTER PLAN
## Updated March 31, 2026 (v2)

**PROGRESS: Sitemap reduced from 158 → 121 URLs. 37 pages removed so far.**
**TARGET: ~85 intentional, high-quality pages. ~36 more to redirect/noindex.**

---

# OVERALL STATUS DASHBOARD

| Category | Items | Done | Remaining |
|----------|-------|------|-----------|
| Pages deleted/redirected | 51 planned | 37 done | 14 remaining |
| Pages to noindex | 20+ planned | ~10 done | ~10 remaining |
| Title tags to update | 15 pages | 2 done | 13 remaining |
| Content rewrites | 8 pages | 1 done (packages) | 7 remaining |
| New pages to create | 4 pages | 0 done | 4 remaining |
| Blog refreshes | 8 posts | 0 done | 8 remaining |
| Schema markup | 4 pages | 0 done | 4 remaining |
| Technical fixes | 5 items | 0 done | 5 remaining |

---

# TABLE OF CONTENTS
1. ✅ COMPLETED — Pages Deleted/Redirected
2. ⚠️ URGENT — New Issues Found (fix immediately)
3. 🔲 REMAINING — Redirects Still Needed
4. 🔲 REMAINING — Pages to Noindex
5. 🔲 REMAINING — Content Repositioning (you asked for help with this)
6. 🔲 REMAINING — Core Pages to Optimize
7. 🔲 REMAINING — Blog Posts to Optimize
8. 🔲 REMAINING — Venue Pages
9. 🔲 REMAINING — New Pages to Create
10. 🔲 REMAINING — Technical SEO Fixes
11. Execution Timeline (updated)

---

# ═══════════════════════════════════════
# 1. ✅ COMPLETED — What's Done
# ═══════════════════════════════════════

## ✅ 1A. "Say I Do in Ireland" Variants — ALL 7 DELETED
- ✅ `/say-i-do-in-ireland` — deleted
- ✅ `/say-i-do-in-ireland-desktop` — deleted
- ✅ `/say-i-do-in-ireland-desktop-a` — deleted
- ✅ `/say-i-do-in-ireland-ab` — deleted
- ✅ `/say-i-do-in-ireland-desktop-ab` — deleted
- ✅ `/say-i-do-in-ireland-dual-lp` — deleted
- ✅ `/say-i-do-in-ireland-dual-canada` — deleted

## ✅ 1B. "Blog Post Title One" Placeholders — ALL 8 FIXED
- ✅ All 8 placeholder pages replaced with proper titled entries
- ✅ SEO turned off for the happy-couples blog (noindexed)
- ✅ Tags retained for internal Squarespace functionality

## ✅ 1C. Happy Couples — 10 Properly Named Stories Created
- ✅ `/happy-couples/adrienne-josh-loughcrew-estate`
- ✅ `/happy-couples/jillian-alex-cliffs-of-moher`
- ✅ `/happy-couples/krystial-kurtis-kinnitty-castle`
- ✅ `/happy-couples/katrina-john-cliffs-of-moher`
- ✅ `/happy-couples/michelle-bradley-dunluce-castle`
- ✅ `/happy-couples/kelli-ethan-killarney-national-park`
- ✅ `/happy-couples/maya-tony-rahinnane-castle`
- ✅ `/happy-couples/jessica-kyle-ross-castle`
- ✅ `/happy-couples/kalee-kristian-cliffs-of-moher`
- ✅ `/happy-couples/mollie-ryan-dunquin-pier`

## ✅ 1D. Blog Tag Pages — ALL 13 REMOVED FROM SITEMAP

## ✅ 1E. Happy Couples Tag/Category Pages — ALL 6 REMOVED

## ✅ 1F. Package Detail Pages — ALL 4 DELETED
- ✅ `/failte-welcome` — deleted
- ✅ `/gra-love` — deleted
- ✅ `/slainte-good-health` — deleted
- ✅ `/ard-royalty` — deleted

## ✅ 1G. Ads LP Duplicates — DELETED
- ✅ `/cliffsofmoherlp` — deleted
- ✅ `/cliffsofmoherlp1` — deleted
- ✅ `/dunlucecastlelp` — deleted

## ✅ 1H. Other Deletions Completed
- ✅ `/home-1`, `/home1` — deleted
- ✅ `/real-love-2` — deleted
- ✅ `/new-page` — deleted
- ✅ `/region-north-west-1` — deleted
- ✅ `/destination-wedding-planning-v2` — deleted
- ✅ `/couple-portal` — deleted
- ✅ `/elopeinireland` — deleted
- ✅ `/elopements` — deleted
- ✅ `/weddings`, `/gallery`, `/services` — deleted
- ✅ `/vendors` — deleted
- ✅ `/terms-and-conditions`, `/privacy-policy-1`, `/thank-you` — removed from sitemap
- ✅ Mussenden Temple URL fixed (was `/venues/p/lougheskecastlehotel-ags4j` → now `/venues/p/mussendentemple`)

## ✅ 1I. Core Page Optimizations Completed
- ✅ `/about` — title tag, meta description, content updated
- ✅ `/venues` — title tag & meta description updated
- ✅ `/real-love` — titles fixed, proper wedding stories added
- ✅ `/packages` — new HTML page built

## ✅ 1J. New Additions
- ✅ `/venues/p/vaughans-barn` — new venue page added

---

# ═══════════════════════════════════════
# 2. ⚠️ URGENT — Fix These Immediately
# ═══════════════════════════════════════

## ⚠️ URGENT 1: `/packages-1` — DUPLICATE PACKAGES PAGE

A new URL appeared in your sitemap. Google now sees TWO packages pages.

**FIX:** Move new content to `/packages` if not already there, then delete `/packages-1`.
**Add to URL Mappings:**
```
/packages-1 -> /packages 301
```

## ⚠️ URGENT 2: `/krystial-and-kurtis-kinnitty-castle` — TRIPLE DUPLICATE

This couple now has THREE pages:
1. `/kk-kinnitty-castle` (old)
2. `/happy-couples/krystial-kurtis-kinnitty-castle` (correct)
3. `/krystial-and-kurtis-kinnitty-castle` (extra duplicate)

**FIX:** Keep ONLY the `/happy-couples/` version. Redirect the other two:
```
/kk-kinnitty-castle -> /happy-couples/krystial-kurtis-kinnitty-castle 301 **DONE**

/krystial-and-kurtis-kinnitty-castle -> /happy-couples/krystial-kurtis-kinnitty-castle 301 **DONE**
```

## ⚠️ URGENT 3: Old Real-Wedding URLs Still Live — DUPLICATE CONTENT

You created the new `/happy-couples/` URLs but the OLD URLs are still indexed. Google sees both.

**Add ALL of these to URL Mappings:**
```
/mr-dunquinpier -> /happy-couples/mollie-ryan-dunquin-pier 301 **DONE**
/jk-ross-castle -> /happy-couples/jessica-kyle-ross-castle 301**DONE**
/ek-killarney-national-park -> /happy-couples/kelli-ethan-killarney-national-park 301**DONE**
/kk-cliffs-of-moher -> /happy-couples/kalee-kristian-cliffs-of-moher 301**DONE**
/kj-cliffs-of-moher -> /happy-couples/katrina-john-cliffs-of-moher 301**DONE**
/mb-dunluce-castle -> /happy-couples/michelle-bradley-dunluce-castle 301**DONE**
/mt-rahinnane-castle -> /happy-couples/maya-tony-rahinnane-castle 301**DONE**
/kk-kinnitty-castle -> /happy-couples/krystial-kurtis-kinnitty-castle 301**DONE**
/krystial-and-kurtis-kinnitty-castle -> /happy-couples/krystial-kurtis-kinnitty-castle 301**DONE**
```

Then delete/disable the old pages so they leave the sitemap.**DONE**

---

# ═══════════════════════════════════════
# 3. 🔲 REMAINING — Redirects Still Needed
# ═══════════════════════════════════════

**Complete redirect map — copy/paste into Squarespace URL Mappings:**

```
# Homepage duplicate
/home -> / 301 **I dont understand this!**

# Location consolidation
/locations -> /venues 301 ** Changed name to betapage and hid from SEO **


# Green Book duplicates
/ladybird-green-book/northern-ireland-cncph -> /ladybird-green-book/northern-ireland 301
/ladybird-green-book/dublin-y72d2 -> /ladybird-green-book/dublin 301

# Packages duplicate
/packages-1 -> /packages 301 **Packages (Copy)  and hid from SEO**

# Real wedding story redirects
/mr-dunquinpier -> /happy-couples/mollie-ryan-dunquin-pier 301  **Page removed happy-couples page remains**
/jk-ross-castle -> /happy-couples/jessica-kyle-ross-castle 301  **Page removed happy-couples page remains**
/ek-killarney-national-park -> /happy-couples/kelli-ethan-killarney-national-park 301  **Page removed happy-couples page remains**
/kk-cliffs-of-moher -> /happy-couples/kalee-kristian-cliffs-of-moher 301  **Page removed happy-couples page remains**
/kj-cliffs-of-moher -> /happy-couples/katrina-john-cliffs-of-moher 301  **Page removed happy-couples page remains**
/mb-dunluce-castle -> /happy-couples/michelle-bradley-dunluce-castle 301  **Page removed happy-couples page remains**
/mt-rahinnane-castle -> /happy-couples/maya-tony-rahinnane-castle 301  **Page removed happy-couples page remains**
/kk-kinnitty-castle -> /happy-couples/krystial-kurtis-kinnitty-castle 301  **Page removed happy-couples page remains**
/krystial-and-kurtis-kinnitty-castle -> /happy-couples/krystial-kurtis-kinnitty-castle 301  **Page removed happy-couples page remains**

# Blog post consolidation
/blog/eloping-to-emerald-isle-your-guide-to-an-irish-elopement-adventure -> /elopement-in-ireland 301 **COMPLETED**
/blog/saying-i-do-in-the-emerald-isle-a-guide-to-legalities-for-american-elopements-in-ireland -> /blog/getting-married-in-ireland-as-an-american 301 **COMPLETED**
/blog/irish-castle-wedding-cost -> /blog/top-castle-venues-in-ireland-for-elopement-and-weddings 301 **COMPLETED**
```

---

# ═══════════════════════════════════════
# 4. 🔲 REMAINING — Pages to Noindex
# ═══════════════════════════════════════

In Squarespace: Page Settings → SEO → check "Hide from search engines."

- 🔲 `/more` — navigation page, 453 impressions, 0 clicks
- 🔲 `/blog/a-palette-of-personality-why-colorful-bridesmaids-dresses-are-here-to-stay` — off-topic **COMPLETED**

**Ads-only landing pages (if they exist):**
- 🔲 `/-elopement-in-ireland` → noindex
- 🔲 `/get-married-in-ireland` (ads LP) → noindex OR merge with organic
- 🔲 `/wedding-packages-ireland` → noindex
- 🔲 `/vow-renewal-ireland` → noindex (until you build a proper organic version)
- 🔲 `/destination-weddings-ireland` → noindex
**Only for Ads Right now**
---

# ═══════════════════════════════════════
# 5. 🔲 CONTENT REPOSITIONING — Detailed Playbook
# ═══════════════════════════════════════

**You asked for help with this. Here's exactly how to differentiate your overlapping content.**

## 5A. The "Getting Married in Ireland" Blog Cluster

### POST 1: `/blog/how-to-get-married-in-ireland`
**NEW ROLE: The Legal Process Guide (Step-by-Step)**
**Target queries:** "how to get married in ireland", "marriage requirements ireland", "HSE notification"

**Title tag:** `How to Get Married in Ireland (2026): Legal Requirements Step by Step`
**H1:** `How to Get Married in Ireland in 2026: The Complete Legal Guide`

**Content structure:**
1. Overview: Ireland's marriage requirements at a glance
2. Step 1: Give notice to the HSE (how, when, cost)
3. Step 2: Documents you need (passport, birth cert, etc.)
4. Step 3: Choose your solemniser/celebrant
5. Step 4: The ceremony itself (legal requirements)
6. Step 5: After the wedding (marriage certificate, US recognition)
7. FAQ section with schema markup
8. CTA: "We handle all of this for you →" link to /packages

**REMOVE** from this post: any "why Ireland is great" fluff, venue recommendations, destination planning advice. Keep it purely legal/process.
**Link to:** /blog/getting-married-in-ireland-as-an-american, /packages, /faqs

**DONE**

---

### POST 2: `/blog/getting-married-in-ireland-as-an-american`
**NEW ROLE: The American Couple's Complete Guide (Experience-Focused)**
**Target queries:** "getting married in ireland as an american", "can americans get married in ireland"

**Title tag:** `Getting Married in Ireland as an American: Everything You Need to Know (2026)`

**Content structure:**
1. Yes, Americans can legally marry in Ireland (quick answer)
2. What documents US citizens specifically need
3. The apostille process for American documents
4. Planning your trip: flights, timing, jetlag recovery
5. Getting your wedding dress to Ireland (link to dress blog post)
6. What to tell your American guests
7. Cultural differences (tipping, driving, weather)
8. Why a US-based planner makes the difference
9. Real American couples who married in Ireland (link to happy couples)
10. FAQ with schema
11. CTA → /about and /packages

**Before doing this:** Merge any unique content from the "Saying I Do in the Emerald Isle" post into this one, THEN redirect that post here.

**TO DO**
---

### POST 3: `/blog/saying-i-do-in-the-emerald-isle...`
**DECISION: 301 REDIRECT → `/blog/getting-married-in-ireland-as-an-american`**

Merge unique content first, then add redirect (see Section 3).

---

### POST 4: `/blog/plan-your-dream-irish-destination-wedding`
**NEW ROLE: Destination Wedding Guide (Larger Weddings, 20-100 guests)**
**Target queries:** "destination wedding ireland", "plan destination wedding ireland"

**Title tag:** `Destination Wedding in Ireland: Complete Planning Guide for US Couples (2026)`

**Content structure:**
1. Why Ireland for a destination wedding (not elopement — bigger celebrations)
2. How far in advance to plan (12-18 months for larger weddings)
3. Best venues by size (link to venue pages)
4. Cost breakdown for 20, 50, 100 guests
5. Legal requirements overview (brief, link to Post 1)
6. Guest logistics: flights, accommodation, activities
7. Month-by-month planning timeline
8. Real destination wedding stories (Sláinte/Ard/RíRá couples)
9. CTA → /packages (specifically larger packages)

**REMOVE:** Generic elopement content. This post should clearly be for couples bringing guests.


**TO DO**

---

## 5B. The Castle Content Cluster

### POST 1: `/blog/top-castle-venues-in-ireland-for-elopement-and-weddings`
**NEW ROLE: The Castle Directory / Roundup**
**Target queries:** "castle wedding ireland", "best castles elopement ireland", "castle wedding venues ireland"

**Title tag:** `Best Castles for Weddings & Elopements in Ireland (2026 Guide)`

**MAJOR REWRITE needed. Target 2,500+ words.**

Each castle gets its own H2 section with:
- Name & county
- 2-3 sentence description + what makes it unique
- Capacity (elopement vs. larger wedding)
- Your personal recommendation
- 1-2 of YOUR real wedding photos
- Link to venue page + relevant happy couples story

Castles to include:
- Dunluce Castle → /dunluce-castle + /happy-couples/michelle-bradley-dunluce-castle
- Kinnitty Castle → /venues/p/kinnittycastle + /happy-couples/krystial-kurtis-kinnitty-castle
- Rahinnane Castle → /rahinnane-castle + /happy-couples/maya-tony-rahinnane-castle
- Ross Castle → /ross-castle + /happy-couples/jessica-kyle-ross-castle
- Ballyseede Castle → /venues/p/ballyseedecastle
- Cabra Castle → /venues/p/cabracastle
- Bellingham Castle → /venues/p/bellinghamcastle
- Markree Castle → /venues/p/markreecastle
- Ballinlough Castle → /venues/p/ballinloughcastle
- Cloughan Castle → /venues/p/cloughancastle
- Durhamstown Castle → /venues/p/durhamstowncastle
- Belle Isle Castle → /venues/p/belleislecastle
- Springfield Castle → /venues/p/springfieldcastle

Add sections for:
- "How to choose" (intimate elopement vs. grand celebration)
- Pricing overview (merge `/blog/irish-castle-wedding-cost` content here, then redirect that post → this one)

**TO DO**




### POST 2: `/blog/how-to-get-married-in-an-irish-castle`
**KEEP AS-IS (ranking position 6.5). Just update:**
- Title to include "(2026)" and "Costs & Venues"
- Add links to castle roundup post and venue pages
- Add FAQ schema


**TO DO**


### POST 3: `/blog/irish-castle-wedding-cost`
**MERGE content into castle roundup post, then 301 redirect** (see Section 3)

**DONE**

---

# ═══════════════════════════════════════
# 6. 🔲 REMAINING — Core Pages to Optimize
# ═══════════════════════════════════════

## 🔲 6A. Homepage (/)
- 🔲 Title tag: `Elopement & Wedding Planner in Ireland for US Couples | Ladybird Ever After`
- 🔲 Meta description: `Plan your dream elopement or intimate wedding in Ireland. All-inclusive packages for American couples with a US-based planner, legal guidance, and 30+ stunning venues.`
- 🔲 Add 500-800 words of indexable text with H1 containing target keywords
- 🔲 `/home` still needs 301 redirect → `/` ** I DONT UNDERSTAND THIS **

 ** TO DO**

## ✅ 6B. /packages — DONE
**⚠️ Verify `/packages` has new content and `/packages-1` is redirected/deleted**

 ** DONE **


## 🔲 6C. /elopement-in-ireland
- 🔲 Expand to 2,000+ word pillar page
- 🔲 Title tag: `Elopement in Ireland | All-Inclusive Packages for US Couples | Ladybird Ever After`
- 🔲 Add FAQ section with schema markup
- 🔲 Add internal links to all venue pages, packages, blog posts

 ** TO DO**


## ✅ 6D. /about — DONE

## 🔲 6E. /venues (content still needed)
- 🔲 Add 300-500 words of intro text
- 🔲 Add intro paragraph to each venue category page
- 🔲 Add "Not sure where?" CTA

 ** TO DO**


## ✅ 6F. /real-love — DONE

## 🔲 6G. /faqs
- 🔲 Title tag: `FAQs About Getting Married in Ireland | Ladybird Ever After`
- 🔲 Add FAQ schema markup
- 🔲 Add new questions from Search Console data
- 🔲 Internal links in every answer

 ** TO DO**


## 🔲 6H. /get-in-touch
- 🔲 Title tag: `Contact Ladybird Ever After | Plan Your Irish Elopement`
- 🔲 Add intro paragraph and social proof
- 🔲 Stop using as Google Ads landing page

 ** TO DO**


## 🔲 6I. /regions-of-ireland
- 🔲 Add 400-600 words to each of the 6 regional pages
- 🔲 Add real wedding photos per region
- 🔲 Internal links to venue pages within each region

 ** TO DO**



---

# ═══════════════════════════════════════
# 7. 🔲 REMAINING — Blog Posts to Optimize
# ═══════════════════════════════════════

## PRIORITY 1 — Do These First

| Post | Action |
|------|--------|
| `/blog/how-to-get-married-in-ireland` | 🔲 Update title, add 2026, reposition as legal guide (see Section 5A) |
| `/blog/top-castle-venues...` | 🔲 MAJOR rewrite to 2,500+ words (see Section 5B) |
| `/blog/plan-your-dream-irish-destination-wedding` | 🔲 MAJOR refresh as destination wedding guide (see Section 5A) |
| `/blog/why-hiring-an-irish-wedding-planner...` | 🔲 Rewrite title, refocus on international planning pain points |

## PRIORITY 2 — Refresh These

| Post | Action |
|------|--------|
| `/blog/getting-married-in-ireland-as-an-american` | 🔲 Update to 2026, merge "Saying I Do" content, add FAQ schema |
| `/blog/how-to-get-married-in-an-irish-castle` | 🔲 Update title with 2026 + costs, add venue links |
| `/blog/eloping-in-ireland-weather...` | 🔲 Fix title for CTR |
| `/blog/emerald-isle-elopement-5-breathtaking-locations...` | 🔲 Major refresh — expand to 10+ locations |

## Posts to REDIRECT (add to URL Mappings)

| Post | → Destination |
|------|---------------|
| `/blog/saying-i-do-in-the-emerald-isle...` | 🔲 → `/blog/getting-married-in-ireland-as-an-american` |
| `/blog/irish-castle-wedding-cost` | 🔲 → `/blog/top-castle-venues...` |
| `/blog/eloping-to-emerald-isle...` | 🔲 → `/elopement-in-ireland` |

## Posts to NOINDEX
| `/blog/a-palette-of-personality...` | 🔲 Off-topic, noindex |

---

# ═══════════════════════════════════════
# 8. 🔲 REMAINING — Venue Pages (37 pages)
# ═══════════════════════════════════════

**For EVERY venue page add:** 300-500 words unique copy, practical details, internal links, CTA, descriptive alt text.

**Title formula:** `[Venue Name] Elopement & Wedding | [County], Ireland | Ladybird Ever After`

**Priority order:**
1. 🔲 `/dunluce-castle` (1,736 impr)
2. 🔲 `/rahinnane-castle` (1,433 impr)
3. 🔲 `/ross-castle` (802 impr)
4. 🔲 `/cliffs-of-moher` (535 impr)
5. 🔲 `/dunquin-pier` (319 impr)
6. 🔲 All remaining 32 venue pages

---

# ═══════════════════════════════════════
# 9. 🔲 REMAINING — New Pages to Create
# ═══════════════════════════════════════

| Page | Priority | Target Keywords |
|------|----------|----------------|
| `/destination-wedding-ireland` | 🔲 HIGH | destination wedding ireland (4,000+ impr) |
| `/vow-renewal-ireland` | 🔲 HIGH | vow renewal ireland (47% ad CTR!) |
| Elopement cost blog post | 🔲 MEDIUM | how much does it cost to elope in ireland |
| Cost calculator tool | 🔲 LOW | link-bait / engagement |

---

# ═══════════════════════════════════════
# 10. 🔲 REMAINING — Technical SEO
# ═══════════════════════════════════════

| Fix | Status |
|-----|--------|
| Fix Squarespace site title suffix | 🔲 Settings → General → SEO Appearance |
| Add FAQ schema to /faqs | 🔲 Page header code injection |
| Verify FAQ schema on /packages | 🔲 Check it's live |
| Add Organization schema to homepage | 🔲 Site-wide code injection |
| Fix image alt text site-wide | 🔲 Replace "Make it stand out" defaults |
| Run PageSpeed Insights on top 5 pages | 🔲 |
| Resubmit sitemap after all redirects | 🔲 |

---

# ═══════════════════════════════════════
# 11. UPDATED EXECUTION TIMELINE
# ═══════════════════════════════════════

## THIS WEEK (Urgent)
- [X] Fix `/packages-1` duplicate
- [X]Fix Kinnitty Castle triple duplicate
- [X]Add ALL 9 real-wedding-story redirects
- [X] Add remaining redirects: /home, /locations, Green Book dupes
- [X]Add blog post redirects
- [X]Resubmit sitemap

## NEXT 2 WEEKS: Title Tags & Schema
- [ ] Update title tags: homepage, elopement-in-ireland, faqs, get-in-touch
- [ ] Update title tags: top 5 blog posts
- [ ] Add FAQ schema to /faqs and verify on /packages
- [ ] Fix Squarespace site title suffix

## WEEKS 3-4: Content
- [ ] Expand /elopement-in-ireland to pillar page
- [ ] Rewrite castle venues blog post
- [ ] Refresh destination wedding blog post
- [ ] Add text to top 5 venue pages + /venues intro

## MONTH 2: New Content
- [ ] Create /destination-wedding-ireland
- [ ] Create /vow-renewal-ireland
- [ ] Refresh "getting married as an american" + merge "Saying I Do"
- [ ] Refresh "how to get married in ireland" with 2026
- [ ] Add content to 6 regional pages
- [ ] Begin venue page content (5/week)

## MONTH 3: Growth
- [ ] Pitch to US wedding publications
- [ ] Cross-link with photographers
- [ ] Write 2 new blog posts for keyword gaps

---

# EXPECTED IMPACT

**Organic clicks:** ~250-330/month → Target: 600-800/month within 6 months
**Average position:** 12.1 → Target: 8-9
**Organic CTR:** 1.05% → Target: 2.5-3%

---

*Last updated: March 31, 2026*
*Next review: After implementing this week's urgent fixes, upload fresh Search Console data*
