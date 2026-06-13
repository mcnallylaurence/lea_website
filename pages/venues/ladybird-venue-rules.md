# Ladybird Ever After — Venues Overview
# Ladybird Ever After — Venues System Documentation

*How the entire venues section works, end to end.*

---

## Overview

The venues section is built on top of Squarespace's native **Products/Store** collection, used purely as a data store and CMS. Squarespace's own product UI is completely hidden and replaced with custom templates. There are three moving parts:

1. **VenuesCSVUpdater** — Google Sheet that generates the importable CSV
2. **venues-hub.html** — The `/venues` grid/map page, injected via Squarespace Code Block
3. **venue-page-injection.html** — The individual venue page template, injected via Squarespace Page Header
4. **ladybird-map.js** — Standalone map script for any embedded full-map block

---

## Part 1 — VenuesCSVUpdater (Google Sheet)

### What it does

This is your source of truth for all venue data. Each row is one venue. When you're ready to publish a venue (or update one), you export a specific column from this sheet and paste it into the Squarespace product **Description** field.

### Sheet columns

The sheet contains all the venue attributes that power the frontend:

| Column | Data | Notes |
|--------|------|-------|
| Title | Venue name | Becomes the Squarespace product title |
| County | Irish county | e.g. `Westmeath` |
| Vibes | Comma-separated tags | e.g. `Historic, Luxurious, Intimate` |
| Min Guests | Number | Use `0` if no minimum |
| Max Guests | Number | |
| Pricing Tier | `free` /`$` / `$$` / `$$$` / `$$$+` | |
| Accommodation | `TRUE` / `FALSE` | |
| Ceremony | `TRUE` / `FALSE` | |
| Reception | `TRUE` / `FALSE` | |
| Private Hire | `TRUE` / `FALSE` | |
| Elopements | `TRUE` / `FALSE` | |
| Intimate Weddings | `TRUE` / `FALSE` | |
| Destination Weddings | `TRUE` / `FALSE` | |
| Photo Location | `TRUE` / `FALSE` | |
| Logistics | Short text | e.g. `Exclusive Use Estate (3-Night Minimum)` |
| Latitude | Decimal | e.g. `53.6366922` |
| Longitude | Decimal | e.g. `-7.0281709` |
| Description | Long-form prose | The full marketing copy paragraphs |
| **Generated Column** | Final HTML blob | **This is what you copy into Squarespace** |

### The generated HTML blob (the critical column)

The final column in the sheet uses a formula to combine all the attributes and the description into a single HTML string that looks like this:

```html
<div class="venue-product-data"
  data-title="Ballinlough Castle"
  data-county="Westmeath"
  data-logistics="Exclusive Use Estate (3-Night Minimum)."
  data-min-guest="0"
  data-max-guest="16"
  data-vibes="Historic, Luxurious, Intimate, Fairy-tale"
  data-accommodation="True"
  data-pricing-tier="$$$+"
  data-ceremony="TRUE"
  data-reception="TRUE"
  data-private-hire="TRUE"
  data-elopements="FALSE"
  data-intimate-weddings="TRUE"
  data-destination-weddings="TRUE"
  data-photo-location="FALSE"
  data-lat="53.6366922"
  data-long="-7.0281709">

  <p style="white-space:pre-wrap;">
    <strong>Ballinlough Castle</strong>

    <strong>Location:</strong> Co. Westmeath

    Are you dreaming of a historic, luxurious experience in Ireland?...
    [rest of description prose]
  </p>

</div>
```

### How to publish a new venue

1. Fill in all columns for the new venue row in the Google Sheet
2. Copy the value from the **Generated Column** cell for that row
3. In Squarespace, go to **Pages → Venues store → Add Product** (or open existing)
4. Set the product **Title** to the venue name
5. Paste the copied HTML blob into the product **Description** field (make sure you're in HTML/source mode, not rich text)
6. Upload venue photos as product images
7. Set the product URL slug to something clean e.g. `/venue/p/ballinloughcastle`
8. Save and publish

> **Important:** The description field must be in raw HTML mode when you paste. In Squarespace's editor, click the `<>` source button before pasting.

---

## Part 2 — venues-hub.html (The `/venues` Grid & Map Page)

### Where it lives

Squarespace → Pages → Venues → Edit Page → Add Block → **Code Block**

Paste the entire `venues-hub.html` content into that code block. It replaces the default page content entirely.

### What it does

This page fetches all venues from the Squarespace store API and renders them in two views the user can toggle between.

### List View (Grid)

- Fetches `/venues?format=json&count=300` to get all products
- Renders a 3-column card grid (2-col tablet, 1-col mobile)
- Each card shows: venue photo, title, gold rule, italic subtitle (first bold line from description), preview text (first 180 chars of prose)
- **Read more / Show less** button expands the full description inline without navigating away
- **View Venue →** link takes user to the individual venue page
- Cards animate in with staggered fade-up via IntersectionObserver
- Filter bar lets users search by name/keyword, category, and region

### Map View

- Renders a Leaflet.js map centred on Ireland `[53.4129, -8.2439]`
- Parses each venue's body HTML to find the `.venue-product-data` div
- Reads `data-lat` and `data-long` attributes to plot a gold dot marker
- Clicking a marker shows a popup with the venue thumbnail, name, and a "View Venue" link
- Map is lazy-initialised — only loads when the user switches to Map View

### Filtering logic

Filters apply client-side against the already-fetched data:
- **Search** matches against title and body text
- **Category** matches against Squarespace product categories (set on each product)
- **Region** matches against Squarespace product tags (set on each product)

To make filters work, each Squarespace product must have the correct **Category** and **Tag** set in the product settings panel.

### Key selectors used

| Thing | Selector/attribute |
|-------|-------------------|
| Metadata div | `.venue-product-data` |
| Latitude | `data-lat` |
| Longitude | `data-long` (NOT `data-lng`) |
| API endpoint | `/venues?format=json&count=300` |

---

## Part 3 — venue-page-injection.html (Individual Venue Pages)

### Where it lives

Squarespace → Settings → Advanced → **Code Injection → Page Header**

Paste the entire script there. It runs on every page but immediately exits if the URL does not contain `/venues/p/` — so it is harmless everywhere else.

### What it does

It completely replaces the native Squarespace product layout with a custom two-panel venue page. The native layout is hidden (not deleted) so Squarespace's lazy image loader still works.

### Execution sequence

```
Page loads
  └─ URL guard: does path include /venues/p/ ?
       └─ No  → exit immediately, do nothing
       └─ Yes → inject CSS cloak (opacity:0 on native section, NOT display:none)
                Phase 1 watcher (setInterval 120ms)
                  └─ Wait for h1.product-title + img.pdp-gallery-slides-image to exist
                       └─ Found → Phase 2 watcher
                                    └─ Wait for ≥1 image src to be populated
                                         └─ Populated → inject()
                                              ├─ Remove cloak
                                              ├─ Set native section display:none
                                              ├─ insertAdjacentHTML('beforebegin') on native section
                                              ├─ attachGallery()
                                              └─ initMap() if lat/long present
```

### Why the two-phase watcher approach

Squarespace 7.1 uses AJAX navigation and lazy-loads images. If you hide the native container with `display:none` immediately, images never get their `src` attributes populated, so you can't scrape them. The cloak uses `opacity:0` instead, keeping the element in the layout flow so Squarespace's lazy loader fires normally. Only after images are confirmed populated do we switch to `display:none`.

### FOUC prevention

The `opacity:0` cloak is injected synchronously at the top of the script (before any async operations) so it takes effect before the browser paints the native layout.

### Key DOM selectors

| Thing | Selector |
|-------|----------|
| Page title | `h1.product-title` |
| Gallery images | `img.pdp-gallery-slides-image` |
| Description (desktop) | `div.product-description.hidden-down-md` |
| Metadata div | `.venue-product-data` |
| Native section to hide | `section.product-detail-section` |
| Inject point | `section.product-detail-section` → `insertAdjacentHTML('beforebegin', ...)` |

### getDescription() — the key gotcha

The description prose lives **inside** `.venue-product-data` as child `<p>` tags, not as siblings. So the function:

1. Clones the description block
2. For each `.venue-product-data` div found, rescues its `<p>` children by inserting them before the div
3. Then removes the `.venue-product-data` div
4. Then strips empty paragraphs and any `<h1>` tags

This means the metadata attributes are hidden but the prose text is preserved and rendered.

### What gets rendered

**Left panel (sticky, 460px):**
- Main image display with crossfade transition
- Prev/next arrows on hover
- Image counter (e.g. `2 / 7`)
- Horizontal thumbnail strip with gold active border
- Clicking main image opens fullscreen lightbox

**Right panel (scrollable):**
- Gold `VENUE` eyebrow label
- County + Ireland location line with pin icon
- Venue title in Playfair Display serif
- Gold horizontal rule
- Vibe pills (green outlined tags)
- Stats card: guest capacity, pricing tier, accommodation
- Feature grid: 8 yes/no indicators with green ✓ / grey ✗ circles
- Logistics callout (gold left border)
- "About this venue" heading + full description prose
- Leaflet map with gold pin marker
- "Inquire with Ladybird Ever After" CTA button → `/get-in-touch`

**Mobile:**
- Desktop gallery hidden, replaced by horizontal snap-scroll carousel
- Dot indicators below carousel
- Tapping any image opens lightbox
- Content panel stacks below gallery

**Lightbox (all screen sizes):**
- Full screen dark overlay
- Prev/next navigation buttons
- Keyboard navigation: ← → Escape
- Image counter
- Click outside image to close

---

## Part 4 — ladybird-map.js (Standalone Map Script)

### Where it lives

Squarespace → Settings → Advanced → **Code Injection → Page Header** (or uploaded as a file asset and referenced with a `<script>` tag)

This script is for any standalone full-map block (e.g. on a dedicated map page or embedded section) using a container with `id="lb-map-root"`.

### What it does

- Initialises a Leaflet map centred on Ireland at zoom level 7
- Fetches all venues from `/venues?format=json&count=200`
- Parses each venue's body HTML to find `.venue-product-data`
- Reads `data-lat` and `data-long` to plot gold dot markers
- Each marker popup shows the venue thumbnail, name, gold rule, and "View Venue" link

### Key difference from hub page map

The hub page map uses a `markerLayer` group so markers can be cleared and re-plotted when filters change. The standalone map adds markers directly to the map object since there are no filters.

---

## Attribute & Selector Reference Card

### data-* attributes on `.venue-product-data`

| Attribute | Values | Used by |
|-----------|--------|---------|
| `data-title` | String | Reference only |
| `data-county` | String | Venue page county line |
| `data-logistics` | String | Logistics callout block |
| `data-min-guest` | Number string | Capacity stat |
| `data-max-guest` | Number string | Capacity stat |
| `data-vibes` | Comma-separated string | Vibe pills |
| `data-accommodation` | `True` / `False` | Stats + feature grid |
| `data-pricing-tier` | `$` `$$` `$$$` `$$$+` | Stats card |
| `data-ceremony` | `TRUE` / `FALSE` | Feature grid |
| `data-reception` | `TRUE` / `FALSE` | Feature grid |
| `data-private-hire` | `TRUE` / `FALSE` | Feature grid |
| `data-elopements` | `TRUE` / `FALSE` | Feature grid |
| `data-intimate-weddings` | `TRUE` / `FALSE` | Feature grid |
| `data-destination-weddings` | `TRUE` / `FALSE` | Feature grid |
| `data-photo-location` | `TRUE` / `FALSE` | Feature grid |
| `data-lat` | Decimal number | Map pin |
| `data-long` | Decimal number | Map pin (**not** `data-lng`) |

### Boolean parsing note

Boolean attributes are compared with `.toUpperCase() === 'TRUE'` so `True`, `TRUE`, and `true` all work. `False`, `FALSE`, `false` all resolve to false.

---

## Common Issues & Fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Venue page shows blank/native layout | `section.product-detail-section` selector not found | Open DevTools, inspect the native section and update the selector |
| Images not loading in custom template | Using `display:none` on native container before images load | Never use `display:none` in the cloak — use `opacity:0` only |
| Template renders twice | `inject()` called by both Phase 2 interval and safety timeout | The `injected` boolean flag prevents this — make sure it's present |
| Map pins not showing | Wrong class (`.custom-metadata`) or attribute (`data-lng`) | Must be `.venue-product-data` and `data-long` |
| Description not showing | Prose `<p>` tags are inside `.venue-product-data` | `getDescription()` must rescue `<p>` children before removing the metadata div |
| Description showing twice | Both desktop and mobile `.product-description` divs being read | Target only `.product-description.hidden-down-md` (desktop version) |
| Filters not working | Products missing categories/tags in Squarespace | Set Category and Tag on each product in Squarespace product settings |

---

## We have the country into 7 Regions

these are under Tags in Squarespace 
West,
Northern Ireland,
Midlands East,
South West,
South East,
North West,
Dublin,

Then filter on these 


North West

## File Summary

| File | Where it goes | Purpose |
|------|--------------|---------|
| `venues-hub.html` | Squarespace Code Block on `/venues` page | Grid + map listing of all venues |
| `venue-page-injection.html` | Squarespace → Settings → Advanced → Page Header | Custom layout for each `/venues/p/*` page |
| `ladybird-map.js` | Page Header or file asset | Standalone embedded map with all venue pins |
| VenuesCSVUpdater | Google Sheets | Source of truth — generates the HTML blob pasted into each product description |