It absolutely makes sense! Standardizing hero images across your main interior pages will create a much more cohesive, premium brand experience. Previously, your design rules had a mix of full-screen images, faint near-invisible images, and no images at all depending on the page. 

To fix this, I have updated the rules to establish a **Standardized Interior Hero** (Pattern 2) that applies uniformly to all main pages (Packages, Venues, About, Contact, FAQs, etc.). This ensures every main page opens with a beautiful, consistent photographic background and a unified dark overlay, while keeping the massive, full-screen immersive hero strictly for the Homepage. 

Here is your updated `ladybird-html-rules.md` file:

```markdown
# Ladybird Ever After -- HTML Design Rules

Use these rules when writing any HTML code block for the Ladybird Ever After brand. Follow every rule unless the prompt explicitly overrides it.

---

## 1. Scoping & Namespacing

- Wrap every page/component in a single root `<div>` with a unique class prefix: `.lb-{page}` (e.g. `.lb-faq`, `.lb-hero`, `.lb-about`).
- All CSS selectors must descend from that root class so styles never leak into Squarespace's own CSS.
- Reset margin, padding, and box-sizing inside the root:
  ```css
  .lb-{page} *, .lb-{page} *::before, .lb-{page} *::after {
    margin: 0; padding: 0; box-sizing: border-box;
  }
  ```

---

## 2. Color Palette (CSS Custom Properties)

Define these on the root element. Never use raw hex values in component styles -- always reference the variable.

| Variable      | Value      | Usage                                    |
|---------------|------------|------------------------------------------|
| `--green`     | `#5B6239`  | Primary brand color, buttons, active states |
| `--green-dk`  | `#3a3f25`  | Deep green for rare dark accents         |
| `--green-hv`  | `#4a5130`  | Green hover state                        |
| `--gold`      | `#B8964E`  | Accent color, links, icons, decorative lines |
| `--gold-lt`   | `#D4AF71`  | Italic heading accent, hover gold        |
| `--cream`     | `#F5F0E8`  | Alternating section background, nav bar  |
| `--warm`      | `#FDFAF4`  | Alternating section background (lighter) |
| `--stone`     | `#8C8070`  | Muted secondary text (nav labels, metadata) |
| `--txt`       | `#1A1A18`  | Primary body text                        |
| `--txt-mid`   | `#4A4A42`  | Secondary body text, answer copy         |

---

## 3. Typography

### Font Loading
Always load via Google Fonts `<link>` tags placed before `<style>`:
```html
<link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
<link href="[https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Alice&display=swap](https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Alice&display=swap)" rel="stylesheet">
```

### Font Assignments
| Element            | Font Family          | Weight | Style Notes                              |
|--------------------|----------------------|--------|------------------------------------------|
| Body / default     | `'Alice', serif`     | 300    | Set on root element                      |
| h1, h2, h3         | `'Playfair Display', serif` | 300 | Elegant, light headings                |
| Italic `<em>` in headings | Inherits Playfair | italic | Colored `var(--gold-lt)`              |
| Buttons            | `'Alice', serif`     | 600    | Uppercase, letter-spaced                 |
| Labels / overlines | Inherits Alice       | 600    | Uppercase, wide letter-spacing           |

### Type Scale (use `clamp()` for fluid sizing)
| Role               | Size                              |
|--------------------|-----------------------------------|
| Section heading h2 | `clamp(1.5rem, 2.6vw, 2rem)`     |
| CTA heading h2     | `clamp(1.4rem, 2.5vw, 2rem)`     |
| Body / answers     | `0.95rem`                         |
| Questions / toggles| `1rem`                         |
| Buttons            | `0.8rem`                         |
| Labels / overlines | `0.65rem`                          |
| Nav links          | `0.68rem`                         |

### Line Heights
- Headings: `1.18`--`1.2`
- Body copy: `1.5` (root), `1.7`--`1.85` (answer blocks, descriptions)
- UI elements (buttons, labels): `1`

---

## 4. Spacing System

Use CSS custom properties for page-level padding:
```css
--pad-x: clamp(1.2rem, 5vw, 5rem);
--pad-y: clamp(3.5rem, 7vw, 6rem);
```

- All sections use `padding: var(--pad-y) var(--pad-x)`.
- Content is constrained with `max-width: 820px; margin: 0 auto;` inside each section.
- Vertical gaps between elements use `rem` values (not `px`), typically: `0.4rem`, `0.6rem`, `0.75rem`, `0.8rem`, `1.2rem`, `1.6rem`.

---

## 5. Section Rhythm

- Alternate section backgrounds using `nth-child`:
  ```css
  .faq-section:nth-child(odd)  { background: var(--warm); }
  .faq-section:nth-child(even) { background: var(--cream); }
  ```
- Every section follows the same inner structure:
  ```
  section > inner-wrapper (max-width 820px) > header + content items
  ```

---

## 6. Hero Sections

There are three distinct hero patterns to ensure consistency. Use the correct one based on the page type.

---

### Hero Pattern 1: Homepage Immersive Hero
**Used by:** Homepage ONLY

This is the flagship hero. It fills the viewport entirely with a full background image and a dark overlay, centering the brand statement.

**HTML Structure:**
```html
<section class="hero-home">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-eyebrow">
      <span class="hero-eyebrow-line"></span>
      Overline text
      <span class="hero-eyebrow-line"></span>
    </p>
    <h1>Main <em>heading</em></h1>
    <p class="hero-sub">Italic subtitle in Playfair</p>
    <div class="hero-ctas">
      <button class="btn-green">Primary CTA</button>
      <button class="btn-outline-light">Secondary CTA</button>
    </div>
  </div>
  <div class="hero-scroll">
    <div class="hero-scroll-line"></div>
    <span class="hero-scroll-label">Scroll</span>
  </div>
</section>
```

**Key CSS Rules:**
```css
.hero-home {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: 100vh;           
  display: flex;
  align-items: center;         
  justify-content: center;
  text-align: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background-image: url('...');
  background-size: cover;
  background-position: center 30%;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom,
    rgba(20,22,18,.5) 0%,
    rgba(20,22,18,.35) 40%,
    rgba(20,22,18,.55) 100%);
}
.hero-content {
  position: relative; z-index: 2;
  max-width: 760px;
  padding: 0 var(--pad-x);
  animation: heroFadeUp .9s ease both;
}
.hero-home h1 {
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  color: var(--warm);
  line-height: 1.06;
  letter-spacing: -.01em;
  margin-bottom: 1.2rem;
}
/* Subtitle, Scroll, and other standard elements apply here */
```

**Rules:**
- `min-height: 100vh` ensures it fills the screen.
- Used *exclusively* on the homepage to create maximum impact. 
- Includes scroll indicator.

---

### Hero Pattern 2: Standardized Interior Hero
**Used by:** Packages, Venues, Real Weddings, About, Contact, FAQs, Blog Index

A standardized, beautiful image-led hero for all main interior pages. It features a strong background image, a unified gradient overlay, and consistent height driven by generous padding.

**HTML Structure:**
```html
<section class="hero-interior">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-eyebrow">
      <span class="hero-eyebrow-line"></span>
      Overline Label
      <span class="hero-eyebrow-line"></span>
    </p>
    <h1>Page <em>heading</em></h1>
    <p class="hero-sub">Descriptive subtitle sentence.</p>
    <p class="hero-meta">Optional: stat or metadata line</p>
  </div>
</section>
```

**Key CSS Rules:**
```css
.hero-interior {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: clamp(6.5rem, 14vw, 10rem) var(--pad-x) clamp(5rem, 10vw, 8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}
.hero-interior .hero-bg {
  position: absolute; inset: 0;
  background-image: url('...');
  background-size: cover;
  background-position: center;
  /* Image is fully visible, relying on the overlay for text contrast */
}
.hero-interior .hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom,
    rgba(28,28,26,.55) 0%,
    rgba(28,28,26,.75) 100%);
}
.hero-interior-content {
  position: relative; z-index: 2;
  max-width: 680px;
  margin: 0 auto;
  animation: heroFadeUp .9s ease both;
}
.hero-interior h1 {
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  color: var(--warm);
  line-height: 1.1;
  margin-bottom: 1rem;
}
.hero-interior .hero-sub {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(.9rem, 1.8vw, 1.2rem);
  color: rgba(253,250,244,.8);
  line-height: 1.65;
}
```

**Rules:**
- Standardizes the image experience across all main pages.
- Height is driven by padding, keeping it consistent without taking up the full `100vh`.
- No CTAs or scroll indicators in this hero—it's introductory.
- Text color is `--warm` (light) to contrast against the dark overlay.
- If the page requires anchor jump links (like `/packages`), place them immediately *below* this section in a sticky bar, not inside the hero.

---

### Hero Pattern 3: Utility Typographic Hero
**Used by:** Regions hub, individual Region pages, sub-pages, individual Blog Posts and other pages!

A minimal, text-only hero for utility pages or deeply nested pages where a large image header would be repetitive or distracting.

**HTML Structure:**
```html
<section class="page-hero-utility">
  <div class="page-hero-in">
    <p class="hero-ol">
      Overline Label
      <span class="hero-ol-line"></span>
    </p>
    <h1>Page heading with <em>italic accent</em></h1>
    <p class="page-hero-sub">Descriptive subtitle sentence.</p>
  </div>
</section>
```

**Key CSS Rules:**
```css
.page-hero-utility {
  background: var(--warm);
  padding: var(--pad-y) var(--pad-x) calc(var(--pad-y) * .75);
  text-align: center;
}
.page-hero-in {
  max-width: 620px;
  margin: 0 auto;
}
.page-hero-utility h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 300;
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  line-height: 1.18;
  color: var(--txt);
  margin-bottom: .9rem;
}
```

**Rules:**
- Background is always `var(--warm)` -- never an image or dark background.
- Text is dark: `var(--txt)`.
- No entrance animation.

---

### Hero Comparison Reference

| Attribute         | Pattern 1: Immersive       | Pattern 2: Standard Interior | Pattern 3: Utility Typographic |
|-------------------|----------------------------|------------------------------|--------------------------------|
| Pages             | Homepage ONLY              | Packages, Venues, About, FAQs| Sub-pages, individual blogs    |
| Background        | Full photo + gradient      | Full photo + standard overlay| `--warm` (no image)            |
| Text color        | `--warm` (light)           | `--warm` (light)             | `--txt` (dark)                 |
| Height            | `min-height: 100vh`        | Padding-driven               | Padding-driven                 |
| H1 size           | clamp(2.8rem, 7vw, 5.2rem) | clamp(2.2rem, 5.5vw, 4rem)   | clamp(2.2rem, 4.5vw, 3.2rem)   |
| Content max-width | 760px                      | 680px                        | 620px                          |
| CTAs / Buttons    | Yes                        | No                           | No                             |
| Scroll indicator  | Yes                        | No                           | No                             |

---

### Shared Hero Rules (all patterns)

- The eyebrow/overline above `h1` always uses the gold overline pattern: flex row, uppercase, `.6rem`, `.3em` letter-spacing, gold color, with flanking `1px` gold lines at 50% opacity.
- `<em>` inside any hero `h1` is always: `color: var(--gold-lt); font-style: italic`.
- Never place more than one `h1` on a page -- the hero always owns it.
- Hero sections are never inside the alternating section rhythm -- they always sit above it and do not count as a section for `nth-child` alternation.

---

## 7. Component Patterns

### Overline Label
A small uppercase label above section headings with a short gold line:
```css
font-size: .6rem; letter-spacing: .3em; text-transform: uppercase;
color: var(--gold); font-weight: 600;
```
Uses a `::after` pseudo-element: `flex: 0 0 28px; height: 1px; background: var(--gold); opacity: .5;`

### Buttons
Two variants, both using:
```css
font-size: .74rem; font-weight: 600; letter-spacing: .15em;
text-transform: uppercase; padding: .95rem 2.2rem;
border: 2px solid transparent; transition: all .3s;
```
- **`.btn-green`**: Solid green background, cream text. Hover darkens slightly.
- **`.btn-gold`**: Solid gold background, green text. Hover becomes transparent outline with gold-lt border/text.
- **`.btn-outline-light`**: Transparent background, cream border and text. Used only as a secondary CTA inside Pattern 1 hero sections.

### Links
```css
color: var(--gold); text-decoration: underline;
text-underline-offset: 3px; transition: color .3s;
```
Hover: `color: var(--green);`

### Accordion / FAQ Items
- Separated by `1px solid rgba(91,98,57,.1)` borders.
- Question button: full-width, left-aligned, `padding-right: 3rem` to make room for the toggle icon.
- Toggle icon is a `::after` pseudo-element: `+` when closed, `-` (unicode `\2212`) when open. Playfair Display, `1.4rem`, `var(--gold)`.
- Answer panel uses `max-height` transition (`0` to `800px` over `.45s ease`).
- Only one item open per section at a time.

### CTA Bar
- Centered box with `background: var(--green)`, generous padding via `clamp()`.
- Heading in `var(--warm)`, subtitle in `rgba(245,240,232,.55)` italic Playfair.
- Uses `.btn-gold` for the call-to-action.

---

## 8. Transitions & Animations

- Default transition duration: `.3s` for interactive elements (hover states, color changes).
- Accordion open/close: `.45s ease` on `max-height`.
- Scroll-reveal animation:
  - Elements start with class `.reveal` (`opacity: 0; transform: translateY(18px)`).
  - On intersection, class `.in` is added (`opacity: 1; transform: translateY(0)`).
  - Transition: `opacity .65s ease, transform .65s ease`.
  - Stagger with `setTimeout` at `i * 60ms` per element.
  - IntersectionObserver config: `threshold: 0.05`, `rootMargin: '0px 0px -20px 0px'`.

---

## 9. Borders & Dividers

- Never use heavy borders. The standard divider is:
  ```css
  1px solid rgba(91,98,57,.1)
  ```
  (A very faint, warm-tinted green -- never pure gray.)
- Use this for: section borders, accordion item separators, nav bottom border.

---

## 10. Responsive Rules

- Single breakpoint at `600px` for mobile adjustments.
- Use `clamp()` for fluid values wherever possible rather than breakpoint overrides.
- At mobile:
  - Reduce section padding.
  - Slightly reduce font sizes for questions and nav links.
  - Reduce right-padding on accordion buttons.
- Navigation links should `flex-wrap` naturally on smaller screens.

---

## 11. Sticky Navigation

- If the page has jump-nav links, make the nav bar `position: sticky; top: 0; z-index: 100;`.
- Background: `var(--cream)` with a faint bottom border.
- Links: small uppercase pills with `background: var(--warm)` and faint border. Active/hover state fills with `var(--green)` and cream text.
- Highlight the active link on scroll using an IntersectionObserver or scroll listener.
- Smooth-scroll to targets on click, offsetting for the sticky nav height.

---

## 12. Structured Data

- For FAQ pages, always include `FAQPage` JSON-LD schema markup in a `<script type="application/ld+json">` block after the HTML.
- Each question/answer pair maps to a `Question` entity with an `acceptedAnswer` of type `Answer`.

---

## 13. Image Handling

- All `<img>` elements: `display: block;` (set in the global reset).
- No other default image rules -- styling is per-component.

---

## 14. Code Hygiene

- Deliver everything in a single code block: `<link>` tags, then `<style>`, then `<div>` markup, then `<script>`.
- No external CSS or JS files -- everything is inline for Squarespace code-block injection.
- Use semantic HTML where possible (`<button>` for interactive toggles, `<a>` for navigation).
- Add HTML comments as section dividers (use `--` border style for visual clarity in source).
- Add CSS comments with `/* -- SECTION NAME -- */` formatting.
- Keep IDs on sections for anchor linking (`id="section-{name}"`).
- Use `-webkit-text-size-adjust: 100%;` on the root to prevent iOS font scaling.

---

## 15. Preferences

- Never use em dashes or en dashes in code or copy.

---

## 17. Standard Trust / Social Proof Section

Every page that benefits from a trust signal should use the **animated counter trust section** (not a static stats block). This is a self-contained `<script>` injection that builds its own DOM, styles, and animated counters.

**Usage:** Drop the `<script>` block directly into the page body at the point where the trust section should appear. It inserts itself immediately before the script tag.

**Stats to use (standard set):**
| Stat | Value | Label |
|------|-------|-------|
| Happy Couples | 100+ | `Happy<br>Couples` |
| Vendors & Venues | 100+ | `Vendors & Venues<br>Personally Vetted` |
| Average Rating | 5★ | `Average Couple<br>Rating` |
| US States | 29 | `US States<br>& Counting` |

**Key behaviours:**
- Counters animate from 0 on scroll-into-view (eased cubic, 1.6s duration).
- Section fades up with `.reveal` / `.in` pattern on IntersectionObserver.
- Background: `#FDFAF4` (`--warm`). **No top/bottom borders** — borders make the trust bar look like an isolated island and break the visual flow of the page.
- "As Featured In" Irish Independent logo renders below a gold divider line.
- Squarespace section padding is auto-nuked via a parent-walk style injection.
- All styles are scoped to `#lb-proof-root` to prevent leakage.

**Template:** See the implementation in `pages/Landing Pages/-elopement-in-ireland.html` or `pages/about/about.html` for the full script block.

---

## 19. Package Badge Color Rules

Package type badges (Elopement / Wedding labels on package cards) must always use brand palette colors. **Never use off-brand colors (purple, navy, blue, etc.).**

| Badge Type | Background | Text Color |
|------------|------------|------------|
| Elopement | `rgba(91,98,57,.08)` | `var(--green)` |
| Wedding | `rgba(91,98,57,.12)` | `var(--green-dk)` |

- Font: `'Alice', serif`, `.54rem`, uppercase, `.26em` letter-spacing.
- No border-radius — flat pill shapes are off-brand. Use 0 or minimal radius only.
- On image overlays (e.g. `.pkg-tag`), use `rgba(26,26,18,.58)` dark semi-transparent background with `var(--cream)` text and `backdrop-filter: blur(4px)`.

---

## 20. Package Card Design Rules

Package cards using a two-column image + content layout must follow these rules:

- **Background:** `var(--warm)` — never `#fff` or off-brand white. The card should sit within the page's color rhythm, not float as a separate white element.
- **Min-height:** Do not set `min-height` on package cards. Let content determine height naturally to prevent cards from being taller than necessary.
- **Guest count format:** Display as `Ideal for X–Y guests` (numeric range with en-dash). Consistent across homepage and packages page. Examples: `Ideal for 0–4 guests`, `Ideal for 5–12 guests`, `Ideal for 10–20 guests`, `Ideal for 20–50 guests`.
- **Featured/popular highlighting:** The `.featured` card border accent (`border-color: rgba(184,150,78,.35)`) is acceptable in the comparison table context. Avoid using a visually dominant gold border, colored CTA, or separate "Most Popular" badge on individual package cards — it creates visual distraction and an unequal hierarchy between the four packages.
- **Content padding:** `clamp(1.8rem, 3.5vw, 2.8rem)` — keep it tight enough that cards don't feel excessively tall.

---

## 21. Form Section with Testimonials Pattern

When showing an inquiry form alongside testimonials (as used on the homepage S9 section and the get-in-touch page), always use this approach:

**Structure:**
- Background: `var(--warm)` — light, welcoming tone.
- Two-column grid (`1fr 1fr`), form on the left, testimonials on the right.
- Gap: `clamp(2.5rem, 6vw, 6rem)`.
- On screens `≤900px`: collapse to single column. Add a `border-top: 1px solid rgba(91,98,57,.12)` above the testimonials column with `padding-top: 2.8rem` for visual separation.

**Form column header:**
- Overline label (gold, `.58rem`, uppercase, `.3em` letter-spacing).
- `h2`: `clamp(1.5rem, 2.6vw, 2rem)`, `var(--txt)`.
- Intro paragraph: `.83rem`, `var(--txt-mid)`, `line-height: 1.8`.

**Testimonials column:**
- Stack quotes vertically with `gap: 2rem`.
- Each testimonial: border-left accent `3px solid rgba(184,150,78,.2)`, `padding-left: 1.2rem`.
- Quote text: Playfair Display, italic, `clamp(.88rem, 1.4vw, 1rem)`, `var(--txt)`, `line-height: 1.72`.
- Attribution: `.7rem`, uppercase, `var(--green)`, `font-weight: 600`, `letter-spacing: .1em`.

**HubSpot form overrides (scoped to the form container ID):**
```css
#hs-container .hs-button {
  background: var(--green-dk) !important;
  color: var(--cream) !important;
  border: 2px solid var(--green-dk) !important;
  padding: 1.1rem 3rem !important;
}
#hs-container .hs-button:hover {
  background: var(--gold) !important;
  border-color: var(--gold) !important;
  color: var(--green-dk) !important;
}
```

---

## 22. Comparison Table Design Rules

The comparison table (used on the packages page) must follow these rules:

- **Background:** Table wrapper uses `var(--warm)`, not `#fff`. All sticky cells (first column header, body `td:first-child`, `thead th:first-child`) must use `var(--warm)` to match the wrapper on scroll.
- **No border-radius on the wrapper** — `border-radius: 12px` on the table container is off-brand. The table sits within section padding and inherits the page's rectangular design language.
- **"Most Popular" badge in table header:** Acceptable in the comparison table context only (it's informational, not a visual upsell). Use `var(--green)` background, `var(--cream)` text, no border-radius (0px). Never use the pill `border-radius: 20px` shape — all badges are flat.
- **Section background:** Compare section uses `var(--cream)` (alternating from the packages section which uses `var(--warm)`).



## 16. Happy Couples (Real Weddings) Page Standardization

All "Happy Couples" (real elopements/weddings) pages must follow a strict sequential narrative structure to ensure a consistent, premium experience across web and mobile. 

**Root Wrapper:** All content must be wrapped in `<div class="lb-story">`.

### Section Order & Structure

**1. Hero (`.hero`)**
- Follows Hero Pattern 2 (Interior Hero) visually, but uses specific content classes.
- **Must include:**
  - Eyebrow label: `Real Love Story`
  - `h1` with the couple's names (one name always wrapped in `<em>`).
  - Subtitle (`.hero-location`) describing the wedding type and location.
  - Metadata strip (`.hero-meta`) showing: Venue, Location, Package, and Photos.

**2. Intro / Their Story (`.intro`)**
- Background: `var(--cream)`.
- Centered content (`max-width: 720px`).
- Includes a primary `h2`, standard paragraph tags for the story, and a `.intro-divider` (50px gold line).
- Must end with an italicized photographer credit using `var(--stone)`.

**3. Photo Gallery (`.gallery`) & Lightbox**
- Background: `var(--warm)`.
- CSS Grid layout (`.gallery-grid`) set to `1fr 1fr` with a `6px` gap.
- **Standard 3-Image Layout:**
  - One featured image (`.gallery-item--hero`) spanning both columns (`grid-column: 1 / -1`).
  - Two supporting images (`.gallery-item--half`) taking up one column each.
- **Extended Layout (>3 Images) & Interactive Lightbox:**
  - If there are more than 3 images, continue the grid with additional `.gallery-item--half` elements (or span them using `--hero` for variety).
  - **Lightbox Requirement:** Any gallery with >3 images *must* implement the interactive lightbox. 
  - Add `class="lb-gallery-trigger"` and `data-index="X"` (starting at 0) to each `.gallery-item`.
  - **Lightbox HTML:** Must be injected just inside the root `.lb-story` wrapper:
    ```html
    <div id="lb-lightbox" class="lb-lightbox" aria-hidden="true">
      <button class="lb-lb-close" aria-label="Close">✕</button>
      <button class="lb-lb-prev lb-lb-nav" aria-label="Previous">&#8592;</button>
      <button class="lb-lb-next lb-lb-nav" aria-label="Next">&#8594;</button>
      <div class="lb-lb-inner"><img id="lb-lb-img" src="" alt=""></div>
      <div class="lb-lb-counter" id="lb-lb-counter"></div>
    </div>
    ```
  - **Lightbox CSS:**
    ```css
    .lb-story .lb-lightbox {
      position: fixed; inset: 0; background: rgba(0,0,0,0.96); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.25s;
    }
    .lb-story .lb-lightbox.lb-lightbox--open { opacity: 1; pointer-events: all; }
    .lb-story .lb-lb-inner { max-width: 92vw; max-height: 90vh; display: flex; align-items: center; justify-content: center; }
    .lb-story #lb-lb-img { max-width: 92vw; max-height: 88vh; object-fit: contain; border-radius: 2px; box-shadow: 0 8px 60px rgba(0,0,0,0.5); transition: opacity 0.2s; }
    .lb-story .lb-lb-close { position: absolute; top: 18px; right: 22px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 18px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 2px; transition: background 0.2s; }
    .lb-story .lb-lb-close:hover { background: rgba(255,255,255,0.2); }
    .lb-story .lb-lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 20px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 2px; transition: background 0.2s; }
    .lb-story .lb-lb-nav:hover { background: rgba(255,255,255,0.18); }
    .lb-story .lb-lb-prev { left: 16px; }
    .lb-story .lb-lb-next { right: 16px; }
    .lb-story .lb-lb-counter { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.1em; }
    ```
  - **Lightbox JavaScript:** Must include a script at the bottom of the code block to handle opening the lightbox, updating the `src`, mapping the `next`/`prev` clicks using `data-index`, and handling keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`) exactly like the venue template.

**4. Review Section (`.review-section`)**
- Background: `var(--green)` with `.review-bg-pattern` (faint SVG overlay).
- Elements:
  - Gold stars (`.review-stars`).
  - Blockquote-style review (`.review-quote`) with a large `::before` quote mark (`content: '\201C'`).
  - Attribution (`.review-attribution`).
  - "Verified Google Review" badge with SVG icon.

**5. Details Strip (`.details`)**
- Background: `var(--cream)` with a subtle bottom border.
- A flexbox container (`.details-inner`) displaying 6 distinct metadata items (`.detail-item`): Venue, County, Region, Package, Photographer, Type.
- Labels use the standard overline typography; values use `Playfair Display`.

**6. Venue Spotlight (`.venue-spot`)**
- Background: `var(--warm)`.
- A 2-column grid (`1fr 1.1fr`) featuring a venue image (`.venue-spot-img`) on the left and description (`.venue-spot-body`) on the right.
- Must include a pill-tag list (`.venue-spot-tags`) highlighting key venue features.
- Includes a `.btn-green` CTA linking to the specific venue page.

**7. More Love Stories (`.others`)**
- Background: `var(--cream)`.
- A 4-column grid (`.others-grid`) showcasing other couples.
- Cards (`.others-card`) must have a hover effect (`transform: translateY(-2px)`, shadow, image scale).
- Followed by a centered `.btn-green` CTA to view all stories.

**8. Final CTA (`.final-cta`)**
- Uses a background image (`.final-cta-bg`) paired with a dark gradient overlay (`.final-cta-overlay`).
- Includes a heading, italic subtitle, and a single primary button (`.btn-gold`).

### Mobile Responsive Rules for `.lb-story`
- **Hero:** Reduce `min-height` to `55vh`.
- **Gallery:** Collapse `.gallery-grid` to `1fr`. Ensure half-images use `height: clamp(220px, 50vw, 320px)`.
- **Venue Spotlight:** Collapse grid to `1fr` (image stacks above text).
- **More Love Stories:** Collapse `.others-grid` to 2 columns on tablets (`max-width: 900px`), and 2 columns (or 1 depending on layout constraints) on mobile. Remove internal right-borders appropriately when stacked.
- **Padding:** Reduce global section padding to `2.5rem 1.2rem` on screens under `600px`.

---

## 18. Individual Region Pages

Individual region pages (e.g. `/regions-of-ireland/dublin`, `/regions-of-ireland/the-west`) follow a strict structure. Each page is a self-contained Squarespace code injection.

**Root wrapper:** `<div class="lb-{region}">` (e.g. `.lb-dub`, `.lb-west`). All CSS and JS is scoped to this root.

**External dependencies (load before `<style>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="[Google Fonts: Playfair Display + Alice]" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
```

Leaflet is required for the map view toggle on every region page.

---

### Section Order & Structure

**1. Breadcrumb (`.{r}-breadcrumb`)**
- Background: `var(--cream)`. Faint bottom border.
- Padding: `.9rem var(--pad-x)`. Max-width inner: `820px`.
- Font: `.62rem`, uppercase, `var(--stone)`. Active/current page uses `var(--green)`.
- Path: Home › Regions of Ireland › {Region Name}
- Uses `<nav aria-label="Breadcrumb">`.

**2. Hero (Pattern 3: Utility Typographic)**
- Background: `var(--warm)`. Text: `var(--txt)`.
- `max-width: 620px` centered inner.
- Includes: centered overline, `h1` with `<em>` italic accent in `var(--gold-lt)`, subtitle (`.{r}-hero-sub`), and a metadata line (`.{r}-hero-meta`) listing county sub-areas in small uppercase stone text.
- No background image, no CTAs, no scroll indicator.

**3. Quick Facts Strip (`.{r}-facts`)**
- Background: `var(--cream)`. Top and bottom `1px` borders.
- Flex row, centered, wrapping. Gap: `2.5rem`. Padding: `1.6rem var(--pad-x)`.
- Each `.{r}-fact`: a Playfair Display value (`clamp(1.1rem, 2vw, 1.4rem)`, `var(--green)`) above a small uppercase label (`.58rem`, `var(--stone)`).
- Separated by `.{r}-fact-divider` elements (`1px` vertical line, `2rem` tall, `rgba(91,98,57,.15)`). Hidden on mobile (`max-width: 600px`).
- Content is region-specific: 4 facts summarising the region's character (e.g. "Castles / Historic Venues", "Year-Round / Accessible Weddings").

**4. Intro / Editorial (`.{r}-intro`, `id="about"`)**
- Background: `var(--warm)`.
- Two-column grid (`1fr 1fr`, gap `3rem`). Collapses to `1fr` at `820px`.
- Left column: overline + `h2` + 2-3 editorial paragraphs.
- Right column: a subheading (`.{r}-highlights-heading`, Playfair 300, `clamp(1.1rem, 2vw, 1.35rem)`) followed by a bullet list (`.{r}-highlights`) of 6-8 region highlights.
  - Bullets use a `6px` gold dot (`::before` pseudo-element) rather than default list markers.

**5. Best For (`.{r}-best`, `id="best-for"`)**
- Background: `var(--cream)`.
- Centered header: overline + `h2` + short subtitle (`.{r}-best-sub`, `max-width: 540px`).
- `.{r}-best-grid`: 3-column grid of feature tiles (`.{r}-best-tile`), background `var(--warm)`, `1px` faint border, `padding: 1.6rem 1.4rem`, text-align left.
- Each tile: SVG icon (`32px`, `var(--gold)`), a bold Playfair title, and a short description paragraph.
- Responsive: 2 columns at `720px`, 1 column at `480px`.

**6. Venues (`.{r}-venues`, `id="venues"`)**
- Background: `var(--warm)`.
- Centered header (overline + `h2` + subtitle), then a **List/Map toggle**, then either a card grid or a Leaflet map.
- **View toggle (`.{r}-view-toggle`):** Two `<button>` elements (`data-view="grid"` and `data-view="map"`). Active button has `color: var(--green)` and `border-bottom: 2px solid var(--gold)`. Inactive hover uses `var(--gold-lt)`.
- **Card grid (`.{r}-grid`):** 3 columns, `1.5rem` gap. Responsive: 2 columns at `720px`, 1 column at `600px`. Populated dynamically via JS.
  - Cards (`.{r}-card`): `var(--cream)` background, `2px` border-radius, `4/3` aspect ratio image, hover lifts (`translateY(-3px)`) with shadow.
  - Card body: county label (`.58rem`, gold), Playfair `h3`, `28px` gold rule, clamped 3-line description, uppercase "View venue" link with `→` arrow that slides on hover.
  - Full-card click area: achieved with `::before { position: absolute; inset: 0; z-index: 1; }` on the link.
  - Loading state: centered spinner (`28px`, green `border-top`, `.8s` spin animation) with "Loading venues..." text.
  - Error state: centered message with fallback link to `/venues`.
- **Map view (`.{r}-map-wrap`):** `height: 560px` (420px on mobile), hidden by default, shown with `.active` class. Inner `<div id="{r}-map">`.
  - Leaflet tile layer: CartoDB Light (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`). Tile pane CSS filter: `saturate(0.18) brightness(1.06) sepia(0.18) contrast(0.92)` for a warm, brand-toned map.
  - Zoom control: `position: 'bottomright'`.
  - Custom gold marker: `L.divIcon` with `.lb-marker-wrap` containing `.lb-marker-pulse` (animated pulsing ring) and `.lb-marker-dot` (solid gold circle, `14px`, white border, drop shadow).
  - Marker animation: `@keyframes lb-pulse` scales from `1` to `2.2` and fades out over `2s ease-out infinite`.
  - Popup: styled via Leaflet overrides. `210px` wide. Contains venue image (`120px` tall), Playfair title, `24px` gold rule, county label, and a green `.lb-popup-link` button. Background: `#FDFAF4`. No border. Elevated shadow.

**7. Related Content (`.{r}-related`)**
- Background: `var(--cream)`.
- Three-column grid (`.{r}-related-grid`). Collapses to `1fr` at `700px`.
- Each column (`.{r}-related-col`): small uppercase Playfair `h3` in `var(--green)` with a faint bottom border, then a list of links. Link items use `›` prefix in gold.
- Standard three columns: **Other Regions** (links to all other region pages), **Plan Your Day** (Packages, Venues, How It Works, FAQs, Contact), **Real Couples** (Happy Couples, About).

**8. CTA Bar (`.{r}-cta`)**
- Background: `var(--green)`. Padding: `clamp(3rem, 6vw, 5rem)`. Max-width inner: `560px`.
- Overline in `var(--gold-lt)`. `h2` in `var(--warm)` with italic `<em>` in `var(--gold-lt)`.
- Subtitle: italic Playfair, `rgba(245,240,232,.55)`.
- Two CTA links side-by-side: `.btn-gold` (primary) and `.btn-ghost` (secondary, transparent cream border).
- Tertiary link below: small uppercase, underlined with gold tint. Links to `/happy-couples`.
- **`.btn-ghost`**: `background: transparent; color: var(--warm); border: 2px solid rgba(245,240,232,.45)`. Hover: `border-color: var(--warm)`. Used *only* inside the CTA bar on region pages.

---

### Venue Data Fetching

Venues are fetched dynamically from the Squarespace `/venue` endpoint (not `/venue-listings`):

```js
const res = await fetch('/venue?format=json&count=300');
const data = await res.json();
const all = data.items || data.products || [];
// Filter by tag matching the region name (e.g. 'Dublin')
regionItems = all.filter(item =>
  (item.tags || []).some(t => t.toLowerCase() === TAG.toLowerCase())
);
```

- The tag (`TAG`) must exactly match the region's Squarespace tag (e.g. `'Dublin'`, `'The West'`).
- Coordinate data for map pins is read from `data-lat` and `data-long` attributes embedded in the item's `body` or `excerpt` HTML.
- County data is read from a `data-county` attribute in the same HTML.
- Image uses `item.assetUrl || item.thumbnailUrl`.
- Card `href` uses `item.fullUrl`.

---

### Naming Conventions

| Element             | Pattern                                      |
|---------------------|----------------------------------------------|
| Root wrapper        | `.lb-{abbrev}` (e.g. `.lb-dub`, `.lb-west`) |
| CSS class prefix    | `.{abbrev}-{component}` (e.g. `.dub-hero`)  |
| Map div ID          | `#{abbrev}-map`                              |
| Map wrap div ID     | `#{abbrev}-map-wrap`                         |
| Venue grid div ID   | `#{abbrev}-venue-grid`                       |
| JS tag constant     | `const TAG = '{Region Name}';`              |
| Section anchor IDs  | `id="about"`, `id="best-for"`, `id="venues"`|

---

### Mobile Responsive Rules for Region Pages

- `max-width: 820px`: intro grid collapses to `1fr`.
- `max-width: 720px`: venue card grid collapses to 2 columns; best-for grid collapses to 2 columns.
- `max-width: 600px`: venue grid collapses to 1 column; map height reduces to `420px`; fact dividers hidden; `.btn-gold` becomes `display: block`.
- `max-width: 480px`: best-for grid collapses to 1 column.
- `max-width: 700px`: related content grid collapses to 1 column.
