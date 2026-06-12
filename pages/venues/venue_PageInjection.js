<!--Venue Product page Custom View -->
<script>
(function () {

  if (!window.location.pathname.includes('/venues/p/')) return;

  let injected = false;

  const styleCloak = document.createElement('style');
  styleCloak.id = 'lea-cloak';
  styleCloak.textContent = `section.product-detail-section{opacity:0!important;pointer-events:none!important;}`;
  document.head.appendChild(styleCloak);

  const leafletCSS = document.createElement('link');
  leafletCSS.rel = 'stylesheet';
  leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(leafletCSS);

  function loadLeaflet(cb) {
    if (window.L) { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function getTitle() {
    const el = document.querySelector('h1.product-title');
    return el ? el.textContent.trim() : null;
  }

  function getImages() {
    const imgs = document.querySelectorAll('img.pdp-gallery-slides-image');
    return Array.from(imgs)
      .map(img => img.src || '')
      .filter(src => src && !src.startsWith('data:') && src.length > 10);
  }

  function getMeta() {
    const el = document.querySelector('.venue-product-data');
    if (!el) return null;
    return {
      county:       el.dataset.county || '',
      logistics:    el.dataset.logistics || '',
      minGuest:     el.dataset.minGuest || '0',
      maxGuest:     el.dataset.maxGuest || '',
      vibes:        el.dataset.vibes ? el.dataset.vibes.split(',').map(v => v.trim()) : [],
      accommodation:(el.dataset.accommodation||'').toUpperCase() === 'TRUE',
      pricingTier:  el.dataset.pricingTier || '',
      ceremony:     (el.dataset.ceremony||'').toUpperCase() === 'TRUE',
      reception:    (el.dataset.reception||'').toUpperCase() === 'TRUE',
      privateHire:  (el.dataset.privateHire||'').toUpperCase() === 'TRUE',
      elopements:   (el.dataset.elopements||'').toUpperCase() === 'TRUE',
      intimate:     (el.dataset.intimateWeddings||'').toUpperCase() === 'TRUE',
      destination:  (el.dataset.destinationWeddings||'').toUpperCase() === 'TRUE',
      photoLocation:(el.dataset.photoLocation||'').toUpperCase() === 'TRUE',
      lat:          parseFloat(el.dataset.lat),
      lng:          parseFloat(el.dataset.long),
    };
  }

  function getDescription(title) {
  const block = document.querySelector('div.product-description.hidden-down-md');
  if (!block) return '';
  const clone = block.cloneNode(true);

  // The description text lives as <p> children INSIDE .venue-product-data
  // So before we remove that div, we rescue its <p> children and hoist them out
  clone.querySelectorAll('.venue-product-data').forEach(metaDiv => {
    const paras = metaDiv.querySelectorAll('p');
    paras.forEach(p => {
      // Insert each rescued paragraph before the metadata div
      metaDiv.parentNode.insertBefore(p.cloneNode(true), metaDiv);
    });
    metaDiv.remove();
  });

  // Now clean up as before
  clone.querySelectorAll('h1').forEach(el => el.remove());
  clone.querySelectorAll('p').forEach(p => {
    const text = p.textContent.trim();
    if (!text || text.toLowerCase() === title.toLowerCase()) p.remove();
  });

  return clone.innerHTML.trim();
}



  function featureItem(label, active) {
    return `<div class="lea-feature ${active ? 'lea-feature--on' : 'lea-feature--off'}">
      <span class="lea-feature-icon">${active ? '✓' : '✗'}</span>
      <span>${label}</span>
    </div>`;
  }

  function buildTemplate(title, images, description, meta) {

    // Shared gallery HTML used by both desktop and mobile
    const thumbItems = images.map((src, i) => `
      <button class="lea-thumb ${i === 0 ? 'lea-thumb--active' : ''}" data-index="${i}" aria-label="View image ${i+1}">
        <img src="${src}" alt="${title} thumbnail ${i+1}">
      </button>
    `).join('');

    // Desktop: main image + thumb strip
    const desktopGallery = `
      <div class="lea-desktop-gallery">
        <div class="lea-main-img-wrap" id="lea-main-wrap">
          <img id="lea-main-img" class="lea-main-img" src="${images[0] || ''}" alt="${title}">
          <button class="lea-main-prev lea-arrow" aria-label="Previous">&#8592;</button>
          <button class="lea-main-next lea-arrow lea-arrow--right" aria-label="Next">&#8594;</button>
          <div class="lea-main-counter" id="lea-desktop-counter">1 / ${images.length}</div>
        </div>
        <div class="lea-thumb-strip">
          ${thumbItems}
        </div>
      </div>
    `;

    // Mobile: snap-scroll carousel
    const mobileGallery = `
      <div class="lea-mobile-gallery">
        <div class="lea-mobile-track" id="lea-mobile-track">
          ${images.map((src, i) => `
            <div class="lea-mobile-slide lea-lb-trigger" data-index="${i}">
              <img src="${src}" alt="${title} ${i+1}">
            </div>
          `).join('')}
        </div>
        <div class="lea-mobile-dots">
          ${images.map((_, i) => `<span class="lea-dot ${i===0?'lea-dot--active':''}" data-index="${i}"></span>`).join('')}
        </div>
      </div>
    `;

    // Lightbox
    const lightbox = `
      <div id="lea-lightbox" class="lea-lightbox" aria-hidden="true">
        <button class="lea-lb-close" aria-label="Close">✕</button>
        <button class="lea-lb-prev lea-lb-nav" aria-label="Previous">&#8592;</button>
        <button class="lea-lb-next lea-lb-nav" aria-label="Next">&#8594;</button>
        <div class="lea-lb-inner"><img id="lea-lb-img" src="" alt=""></div>
        <div class="lea-lb-counter" id="lea-lb-counter"></div>
      </div>
    `;

    // Meta blocks
    const vibePills = meta ? meta.vibes.map(v => `<span class="lea-vibe">${v}</span>`).join('') : '';
    const capacityStr = meta
      ? (meta.minGuest === '0' ? `Up to ${meta.maxGuest} guests` : `${meta.minGuest}–${meta.maxGuest} guests`)
      : '';

    const statsRow = meta ? `
      <div class="lea-stats">
        ${capacityStr ? `<div class="lea-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>${capacityStr}</span></div>` : ''}
        ${meta.pricingTier ? `<div class="lea-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span>${meta.pricingTier}</span></div>` : ''}
        ${meta.accommodation ? `<div class="lea-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>On-site accommodation</span></div>` : ''}
      </div>
    ` : '';

    const features = meta ? `
      <div class="lea-features">
        ${featureItem('Ceremony', meta.ceremony)}
        ${featureItem('Reception', meta.reception)}
        ${featureItem('Private Hire', meta.privateHire)}
        ${featureItem('Elopements', meta.elopements)}
        ${featureItem('Intimate Weddings', meta.intimate)}
        ${featureItem('Destination Weddings', meta.destination)}
        ${featureItem('Photo Location', meta.photoLocation)}
        ${featureItem('Accommodation', meta.accommodation)}
      </div>
    ` : '';

    const logisticsBlock = meta && meta.logistics ? `
      <div class="lea-logistics">
        <span class="lea-logistics-label">Logistics</span>
        <span>${meta.logistics}</span>
      </div>
    ` : '';

    const mapBlock = (meta && !isNaN(meta.lat) && !isNaN(meta.lng)) ? `
      <div class="lea-map-section">
        <div class="lea-section-label">Location</div>
        <div id="lea-venue-map"></div>
      </div>
    ` : '';

    const countyLine = meta && meta.county
      ? `<p class="lea-county"><svg width="11" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:5px;flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Co. ${meta.county}, Ireland</p>`
      : '';

    return `
      <div id="lea-venue-wrapper">
        <style>
          *,*::before,*::after{box-sizing:border-box;}

          #lea-venue-wrapper {
            width: 100%;
            font-family: inherit;
            background: #faf9f7;
          }

          /* ══ PAGE GRID ══ */
          .lea-page {
            display: grid;
            grid-template-columns: 460px 1fr;
            align-items: start;
            min-height: 100vh;
          }
          @media (max-width: 860px) {
            .lea-page { grid-template-columns: 1fr; }
          }

          /* ══ DESKTOP GALLERY ══ */
          .lea-desktop-gallery {
            position: sticky;
            top: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: #111;
            overflow: hidden;
          }
          @media (max-width: 860px) { .lea-desktop-gallery { display: none; } }

          /* Main image */
          .lea-main-img-wrap {
            position: relative;
            flex: 1;
            overflow: hidden;
            cursor: pointer;
          }
          .lea-main-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: opacity 0.3s ease;
          }
          .lea-main-img.lea-fading { opacity: 0; }

          /* Prev/next arrows on desktop main image */
          .lea-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.35);
            border: none;
            color: #fff;
            font-size: 18px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 2px;
            opacity: 0;
            transition: opacity 0.2s, background 0.2s;
            left: 12px;
            backdrop-filter: blur(4px);
          }
          .lea-arrow--right { left: auto; right: 12px; }
          .lea-main-img-wrap:hover .lea-arrow { opacity: 1; }
          .lea-arrow:hover { background: rgba(0,0,0,0.6); }

          /* Counter */
          .lea-main-counter {
            position: absolute;
            bottom: 12px;
            right: 14px;
            font-size: 11px;
            letter-spacing: 0.08em;
            color: rgba(255,255,255,0.75);
            background: rgba(0,0,0,0.35);
            padding: 3px 9px;
            border-radius: 2px;
            backdrop-filter: blur(4px);
          }

          /* Thumbnail strip */
          .lea-thumb-strip {
            display: flex;
            gap: 3px;
            padding: 3px;
            background: #111;
            overflow-x: auto;
            scrollbar-width: none;
            flex-shrink: 0;
          }
          .lea-thumb-strip::-webkit-scrollbar { display: none; }
          .lea-thumb {
            flex: 0 0 72px;
            height: 54px;
            border: 2px solid transparent;
            border-radius: 2px;
            overflow: hidden;
            cursor: pointer;
            padding: 0;
            background: none;
            opacity: 0.55;
            transition: opacity 0.2s, border-color 0.2s;
          }
          .lea-thumb--active, .lea-thumb:hover {
            opacity: 1;
            border-color: #b8964e;
          }
          .lea-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          /* ══ MOBILE GALLERY ══ */
          .lea-mobile-gallery { display: none; position: relative; }
          @media (max-width: 860px) {
            .lea-mobile-gallery {
              display: block;
              height: 72vw;
              max-height: 460px;
            }
          }
          .lea-mobile-track {
            display: flex;
            height: 100%;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .lea-mobile-track::-webkit-scrollbar { display: none; }
          .lea-mobile-slide {
            flex: 0 0 100%;
            scroll-snap-align: start;
            cursor: pointer;
          }
          .lea-mobile-slide img {
            width: 100%; height: 100%;
            object-fit: cover;
            display: block;
          }
          .lea-mobile-dots {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
          }
          .lea-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: rgba(255,255,255,0.45);
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
          }
          .lea-dot--active { background: #fff; transform: scale(1.35); }

          /* ══ LIGHTBOX ══ */
          .lea-lightbox {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.96);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s;
          }
          .lea-lightbox.lea-lightbox--open {
            opacity: 1;
            pointer-events: all;
          }
          .lea-lb-inner {
            max-width: 92vw;
            max-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          #lea-lb-img {
            max-width: 92vw;
            max-height: 88vh;
            object-fit: contain;
            border-radius: 2px;
            box-shadow: 0 8px 60px rgba(0,0,0,0.5);
            transition: opacity 0.2s;
          }
          .lea-lb-close {
            position: absolute;
            top: 18px; right: 22px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
            font-size: 18px;
            width: 40px; height: 40px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            border-radius: 2px;
            transition: background 0.2s;
          }
          .lea-lb-close:hover { background: rgba(255,255,255,0.2); }
          .lea-lb-nav {
            position: absolute;
            top: 50%; transform: translateY(-50%);
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            color: #fff;
            font-size: 20px;
            width: 48px; height: 48px;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            border-radius: 2px;
            transition: background 0.2s;
          }
          .lea-lb-nav:hover { background: rgba(255,255,255,0.18); }
          .lea-lb-prev { left: 16px; }
          .lea-lb-next { right: 16px; }
          .lea-lb-counter {
            position: absolute;
            bottom: 18px;
            left: 50%; transform: translateX(-50%);
            color: rgba(255,255,255,0.5);
            font-size: 12px;
            letter-spacing: 0.1em;
          }

          /* ══ CONTENT PANEL ══ */
          .lea-content {
            padding: 48px 44px 72px;
            display: flex;
            flex-direction: column;
            background: #faf9f7;
          }
          @media (max-width: 860px) {
            .lea-content { padding: 32px 20px 60px; }
          }

          .lea-eyebrow {
            font-size: 10px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #b8964e;
            margin: 0 0 8px;
            font-weight: 600;
          }
          .lea-county {
            font-size: 12px;
            letter-spacing: 0.06em;
            color: #9a8c7a;
            margin: 0 0 10px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
          }
          .lea-title {
            font-family: 'Playfair Display', 'Georgia', serif;
            font-size: clamp(1.8rem, 2.8vw, 2.6rem);
            font-weight: 400;
            line-height: 1.1;
            margin: 0 0 16px;
            color: #1a1a18;
          }
          .lea-gold-line {
            width: 36px; height: 1px;
            background: #b8964e;
            margin: 0 0 22px;
          }
          .lea-vibes {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-bottom: 22px;
          }
          .lea-vibe {
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #5b6239;
            border: 1px solid rgba(91,98,57,0.45);
            padding: 4px 11px;
            border-radius: 2px;
            font-weight: 500;
          }
          .lea-stats {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 18px 20px;
            background: #fff;
            border: 1px solid #e8e3db;
            border-radius: 4px;
            margin-bottom: 22px;
          }
          .lea-stat {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            color: #3a3a36;
          }
          .lea-stat svg { color: #b8964e; flex-shrink: 0; }
          .lea-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 9px 12px;
            margin-bottom: 22px;
          }
          .lea-feature {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
          }
          .lea-feature--on { color: #3a3a36; }
          .lea-feature--off { color: #c5bfb5; }
          .lea-feature-icon {
            font-size: 9px;
            font-weight: 700;
            width: 17px; height: 17px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            flex-shrink: 0;
          }
          .lea-feature--on .lea-feature-icon { background: #5b6239; color: #fff; }
          .lea-feature--off .lea-feature-icon { background: #e8e3db; color: #c5bfb5; }
          .lea-logistics {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 14px 18px;
            background: #f5f0e8;
            border-left: 3px solid #b8964e;
            font-size: 13px;
            color: #3a3a36;
            margin-bottom: 26px;
            line-height: 1.65;
          }
          .lea-logistics-label {
            font-size: 9px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #b8964e;
            font-weight: 700;
            margin-bottom: 2px;
          }
          .lea-section-label {
            font-size: 10px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #9a8c7a;
            margin-bottom: 10px;
            font-weight: 500;
          }
          .lea-description {
            font-size: 0.92rem;
            line-height: 1.9;
            color: #4a4a44;
            margin-bottom: 28px;
          }
          .lea-description strong { color: #1a1a18; }
          .lea-description p { margin: 0 0 12px; }
          .lea-description p:last-child { margin-bottom: 0; }
          .lea-map-section { margin-bottom: 32px; }
          #lea-venue-map {
            height: 220px;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid #e8e3db;
          }
          .lea-cta-wrap { padding-top: 8px; }
          .lea-cta-wrap a {
            display: inline-block;
            padding: 15px 36px;
            background: #1a1a18;
            color: #fff;
            text-decoration: none;
            font-size: 10px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            border-radius: 2px;
            font-weight: 600;
            transition: background 0.25s;
          }
          .lea-cta-wrap a:hover { background: #3a3a36; }

          @keyframes leaFadeUp {
            from { opacity:0; transform:translateY(14px); }
            to   { opacity:1; transform:translateY(0); }
          }
          .lea-content > * { animation: leaFadeUp 0.45s ease both; }
          .lea-content > *:nth-child(1){animation-delay:.04s}
          .lea-content > *:nth-child(2){animation-delay:.09s}
          .lea-content > *:nth-child(3){animation-delay:.13s}
          .lea-content > *:nth-child(4){animation-delay:.17s}
          .lea-content > *:nth-child(5){animation-delay:.2s}
          .lea-content > *:nth-child(6){animation-delay:.23s}
          .lea-content > *:nth-child(7){animation-delay:.26s}
          .lea-content > *:nth-child(8){animation-delay:.29s}
          .lea-content > *:nth-child(9){animation-delay:.32s}
          .lea-content > *:nth-child(10){animation-delay:.35s}
          .lea-content > *:nth-child(11){animation-delay:.38s}
        </style>

        ${lightbox}

        <div class="lea-page">
          ${desktopGallery}
          ${mobileGallery}

          <div class="lea-content">
            <p class="lea-eyebrow">Venue</p>
            ${countyLine}
            <h1 class="lea-title">${title}</h1>
            <div class="lea-gold-line"></div>
            ${vibePills ? `<div class="lea-vibes">${vibePills}</div>` : ''}
            ${statsRow}
            ${features}
            ${logisticsBlock}
            <div class="lea-section-label">About this venue</div>
            <div class="lea-description">${description}</div>
            ${mapBlock}
            <div class="lea-cta-wrap">
              <a href="/get-in-touch">Inquire with Ladybird Ever After</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ── Watchers ─────────────────────────────────────────────────────────────
  let phase1 = setInterval(() => {
    const titleEl = document.querySelector('h1.product-title');
    const imgs = document.querySelectorAll('img.pdp-gallery-slides-image');
    if (titleEl && imgs.length > 0) { clearInterval(phase1); waitForImages(imgs); }
  }, 120);
  setTimeout(() => clearInterval(phase1), 12000);

  function waitForImages(imgs) {
    let phase2 = setInterval(() => {
      const ok = Array.from(imgs).filter(i => i.src && i.src.length > 10 && !i.src.startsWith('data:'));
      if (ok.length > 0) { clearInterval(phase2); inject(); }
    }, 120);
    setTimeout(() => { clearInterval(phase2); inject(); }, 5000);
  }

  function inject() {
    if (injected) return;
    injected = true;

    const nativeSection = document.querySelector('section.product-detail-section');
    if (!nativeSection) { console.warn('[LEA] not found'); return; }

    const title = getTitle() || 'Venue';
    const images = getImages();
    const meta = getMeta();
    const description = getDescription(title);

    const cloak = document.getElementById('lea-cloak');
    if (cloak) cloak.remove();
    nativeSection.style.cssText = 'display:none!important;';

    nativeSection.insertAdjacentHTML('beforebegin', buildTemplate(title, images, description, meta));

    attachGallery(images);

    if (meta && !isNaN(meta.lat) && !isNaN(meta.lng)) {
      loadLeaflet(() => initMap(meta.lat, meta.lng, title));
    }
  }

  function initMap(lat, lng, title) {
    const mapEl = document.getElementById('lea-venue-map');
    if (!mapEl || !window.L) return;
    const map = L.map('lea-venue-map', { scrollWheelZoom: false })
      .setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap'
    }).addTo(map);
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:14px;height:14px;background:#b8964e;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.4)"></div>`,
      iconSize: [14,14], iconAnchor: [7,7],
    });
    L.marker([lat,lng],{icon}).addTo(map)
      .bindPopup(`<strong style="font-size:13px">${title}</strong>`,{offset:[0,-4]})
      .openPopup();
  }

  function attachGallery(images) {
    let desktopIndex = 0;
    let lbIndex = 0;

    // ── Desktop: main image + thumbs + arrows ──
    const mainImg = document.getElementById('lea-main-img');
    const counter = document.getElementById('lea-desktop-counter');
    const thumbs = document.querySelectorAll('#lea-venue-wrapper .lea-thumb');

    function goDesktop(i) {
      desktopIndex = (i + images.length) % images.length;
      if (mainImg) {
        mainImg.classList.add('lea-fading');
        setTimeout(() => {
          mainImg.src = images[desktopIndex];
          mainImg.classList.remove('lea-fading');
        }, 150);
      }
      if (counter) counter.textContent = `${desktopIndex + 1} / ${images.length}`;
      thumbs.forEach((t, j) => t.classList.toggle('lea-thumb--active', j === desktopIndex));
      // Scroll active thumb into view
      const activeThumb = thumbs[desktopIndex];
      if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => goDesktop(i)));

    const prevBtn = document.querySelector('#lea-venue-wrapper .lea-main-prev');
    const nextBtn = document.querySelector('#lea-venue-wrapper .lea-main-next');
    if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); goDesktop(desktopIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); goDesktop(desktopIndex + 1); });

    // Clicking main image opens lightbox at current index
    const mainWrap = document.getElementById('lea-main-wrap');
    if (mainWrap) mainWrap.addEventListener('click', () => openLightbox(desktopIndex));

    // ── Lightbox ──
    const lb = document.getElementById('lea-lightbox');
    const lbImg = document.getElementById('lea-lb-img');
    const lbCounter = document.getElementById('lea-lb-counter');

    function openLightbox(i) {
      lbIndex = (i + images.length) % images.length;
      lbImg.src = images[lbIndex];
      lbCounter.textContent = `${lbIndex + 1} / ${images.length}`;
      lb.classList.add('lea-lightbox--open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lb.classList.remove('lea-lightbox--open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function lbPrev() { openLightbox(lbIndex - 1); }
    function lbNext() { openLightbox(lbIndex + 1); }

    lb.querySelector('.lea-lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lea-lb-prev').addEventListener('click', lbPrev);
    lb.querySelector('.lea-lb-next').addEventListener('click', lbNext);
    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.classList.contains('lea-lb-inner')) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('lea-lightbox--open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbPrev();
      if (e.key === 'ArrowRight') lbNext();
    });

    // Mobile slides also trigger lightbox
    document.querySelectorAll('#lea-venue-wrapper .lea-lb-trigger').forEach(el => {
      el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index) || 0));
    });

    // ── Mobile dots ──
    const track = document.getElementById('lea-mobile-track');
    if (track) {
      const dots = document.querySelectorAll('#lea-venue-wrapper .lea-dot');
      track.addEventListener('scroll', () => {
        const i = Math.round(track.scrollLeft / track.offsetWidth);
        dots.forEach((d, j) => d.classList.toggle('lea-dot--active', j === i));
      });
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () =>
          track.scrollTo({ left: i * track.offsetWidth, behavior: 'smooth' })
        );
      });
    }
  }

})();
</script>