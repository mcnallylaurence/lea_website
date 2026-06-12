(function () {
  const mapContainer = document.getElementById('lb-map-root');
  if (!mapContainer) return;

  /* ── Inject marker + popup styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #lb-map-root .leaflet-tile-pane {
      filter: saturate(0.18) brightness(1.06) sepia(0.18) contrast(0.92);
    }
    .leaflet-popup-content-wrapper {
      border-radius: 3px !important;
      background: #FDFAF4 !important;
      border: none !important;
      box-shadow: 0 8px 32px rgba(26,26,24,.18), 0 1px 4px rgba(26,26,24,.08) !important;
      padding: 0 !important;
      overflow: hidden;
    }
    .leaflet-popup-tip-container { margin-top: -1px; }
    .leaflet-popup-tip { background: #FDFAF4 !important; box-shadow: none !important; }
    .leaflet-popup-close-button { color: #8C8070 !important; font-size: 18px !important; top: 8px !important; right: 10px !important; }
    .leaflet-popup-close-button:hover { color: #1A1A18 !important; }
    .leaflet-popup-content { margin: 0 !important; width: 210px !important; }
    .lb-popup-img { width: 100%; height: 120px; object-fit: cover; display: block; }
    .lb-popup-body { padding: 14px 16px 16px; text-align: center; font-family: 'Alice', serif; }
    .lb-popup-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 400; color: #1A1A18; margin: 0 0 8px; line-height: 1.2; }
    .lb-popup-rule { width: 24px; height: 1px; background: #B8964E; margin: 0 auto 10px; }
    .lb-popup-county { font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; color: #8C8070; margin-bottom: 10px; }
    .lb-popup-link { display: inline-block; font-size: .62rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: #F5F0E8 !important; background: #5B6239; text-decoration: none !important; padding: 7px 16px; border-radius: 2px; transition: background .2s; }
    .lb-popup-link:hover { background: #3a3f25; color: #F5F0E8 !important; }
    @keyframes lb-pulse {
      0%   { transform: scale(1);   opacity: .6; }
      70%  { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .lb-marker-wrap { position: relative; width: 14px; height: 14px; }
    .lb-marker-dot { width: 14px; height: 14px; background: #B8964E; border: 2.5px solid #fff; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,.35); position: relative; z-index: 1; }
    .lb-marker-pulse { position: absolute; top: 0; left: 0; width: 14px; height: 14px; background: #B8964E; border-radius: 50%; animation: lb-pulse 2s ease-out infinite; }
  `;
  document.head.appendChild(style);

  /* ── Map init — CartoDB Positron tiles ── */
  const map = L.map('lb-map-root', { zoomControl: false }).setView([53.4129, -8.2439], 7);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
  }).addTo(map);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  /* ── Gold pulse marker ── */
  const goldIcon = L.divIcon({
    className: '',
    html: '<div class="lb-marker-wrap"><div class="lb-marker-pulse"></div><div class="lb-marker-dot"></div></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10]
  });

  const VENUES_URL = '/venue-listings';
  const PER_PAGE = 200;

  async function loadMapVenues() {
    try {
      mapContainer.classList.add('is-loading');

      const res = await fetch(`${VENUES_URL}?format=json&count=${PER_PAGE}`);
      if (!res.ok) throw new Error('Network response not ok');
      const data = await res.json();
      const items = data.items || data.products || [];

      items.forEach(item => {
        const htmlContent = item.body || item.excerpt || '';
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(htmlContent, 'text/html');
        const metaElement = htmlDoc.querySelector('.venue-product-data');

        if (metaElement) {
          const lat = parseFloat(metaElement.getAttribute('data-lat'));
          const lng = parseFloat(metaElement.getAttribute('data-long'));

          if (!isNaN(lat) && !isNaN(lng)) {
            const imgSrc = item.assetUrl || item.thumbnailUrl || '';
            const county = metaElement.getAttribute('data-county') || '';

            const imgHtml = imgSrc
              ? `<img class="lb-popup-img" src="${imgSrc}" alt="${item.title}">`
              : '';
            const countyHtml = county
              ? `<p class="lb-popup-county">Co. ${county.replace(/,?\s*ireland$/i, '')}, Ireland</p>`
              : '';

            const popupContent = `
              <div>
                ${imgHtml}
                <div class="lb-popup-body">
                  <h3 class="lb-popup-title">${item.title}</h3>
                  <div class="lb-popup-rule"></div>
                  ${countyHtml}
                  <a href="${item.fullUrl}" class="lb-popup-link">View Venue</a>
                </div>
              </div>
            `;

            const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
            marker.bindPopup(popupContent, { maxWidth: 210 });
          }
        }
      });

      mapContainer.classList.remove('is-loading');

    } catch (err) {
      console.warn('Ladybird map fetch failed:', err);
      mapContainer.innerHTML = '<p style="text-align:center;padding:2rem;">Unable to load the venue map at this time.</p>';
    }
  }

  loadMapVenues();
})();