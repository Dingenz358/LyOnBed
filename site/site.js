/* LYONBED – Website interactions: header, progress, reveals, counters, parallax,
   construction scrollytelling, mattress tabs, hotel map, contact form. No dependencies. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Header, progress bar, current section */
  var header = $('.header'), bar = $('.progress span'), lastY = 0;
  var navLinks = $$('.nav a:not(.btn)');
  var sections = navLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-solid', y > 40);
    header.classList.toggle('is-hidden', y > 600 && y > lastY + 4 && !document.body.classList.contains('menu-open'));
    if (y < lastY - 4) header.classList.remove('is-hidden');
    lastY = y;
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    var mid = window.innerHeight * 0.35, cur = -1;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < mid) cur = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle('is-current', i === cur); });
    heroFrame();
  }

  /* Hero photo opens from an inset frame to full width as the page scrolls */
  var frame = $('#hero-frame');
  function heroFrame() {
    if (!frame || reduce || window.innerWidth <= 760) return;
    var r = frame.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9) - 0.35));
    frame.style.setProperty('--inset', (6 * (1 - p)).toFixed(2) + '%');
  }

  /* Mobile menu */
  var toggle = $('#menu-toggle');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Parallax */
  var plx = $$('[data-parallax]');
  function parallax() {
    if (reduce) return;
    var narrow = window.innerWidth <= 760;
    plx.forEach(function (el) {
      if (narrow && el.closest('.hero, .mood')) { el.style.transform = ''; return; }
      var host = el.parentElement, r = host.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      var offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScroll(); parallax(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', parallax);
  onScroll(); parallax();

  /* Counters: the final value is in the markup; it only counts up when it starts off-screen */
  function countUp(el) {
    var end = parseInt(el.getAttribute('data-count'), 10), t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Reveals: only what starts below the first screen is hidden, so the page is complete at rest */
  if (!reduce && 'IntersectionObserver' in window) {
    var below = function (el) { return el.getBoundingClientRect().top > window.innerHeight * 0.92; };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.classList.contains('reveal-pending')) { el.classList.remove('reveal-pending'); el.classList.add('reveal-in'); }
        if (el.classList.contains('img-pending')) { el.classList.remove('img-pending'); el.classList.add('img-in'); }
        $$('[data-count]', el).forEach(countUp);
        if (el.matches('.steps li')) el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    $$('[data-reveal]').forEach(function (el) {
      if (below(el)) {
        el.classList.add('reveal-pending');
        $$('[data-count]', el).forEach(function (c) { c.textContent = '0'; });
        io.observe(el);
      } else if (el.matches('.steps li')) { el.classList.add('is-in'); }
    });
    $$('[data-reveal-img]').forEach(function (el) {
      if (below(el)) { el.classList.add('img-pending'); io.observe(el); }
      else el.classList.add('img-in');
    });
  } else {
    $$('.steps li').forEach(function (li) { li.classList.add('is-in'); });
    $$('[data-reveal-img]').forEach(function (el) { el.classList.add('img-in'); });
  }

  /* Construction: highlight the layer in the middle of the screen */
  var layers = $$('#layers li'), num = $('#build-num'), buildImg = $('#build-img');
  if (layers.length) {
    var setLayer = function (i) {
      layers.forEach(function (li, j) { li.classList.toggle('is-active', j === i); });
      num.textContent = String(i + 1).padStart(2, '0');
      if (buildImg && !reduce) buildImg.style.transform = 'scale(' + (1 + i * 0.018).toFixed(3) + ')';
    };
    setLayer(0);
    if ('IntersectionObserver' in window) {
      var lio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setLayer(layers.indexOf(en.target)); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      layers.forEach(function (li) { lio.observe(li); });
    }
  }

  /* Mattress tabs (source: website-notes.md, hantermann.com) */
  var M = {
    imperial: { name: 'Imperial Grand Deluxe', core: 'Mira-Coil® Endlos-Federkern', firm: 'H2–3', extra: 'Knopfsteppung, 5 Lagen Spezialschaum, Dura Edge®',
      text: 'Die höchste der Kollektion: tiefe Knopfsteppung, hohe Bordüre und ein Mira-Coil® Endlos-Federkern unter fünf Lagen Spezialschaum.' },
    american: { name: 'American Dream Grand Deluxe', core: '5-Zonen Wellreposa® Tonnen-Taschenfederkern, 280 Federn/m²', firm: 'H3', extra: '7 Schaumlagen, HeiQ Smart Temp®',
      text: 'Steppung im Wellen- und Rautenmuster, feste Kanten und sieben Schaumlagen über einem Tonnen-Taschenfederkern mit fünf Zonen.' },
    hollywood: { name: 'Hollywood Deluxe', core: '5-Zonen Wellreposa® Taschenfederkern, 520 Federn', firm: 'H2–3', extra: 'Jacquard-Drell, Kräuselheftung, Tragegriffe',
      text: 'Jacquard-Damast mit großer Raute und Kräuselheftung, getragen von 520 Taschenfedern in fünf Zonen.' },
    regency: { name: 'Regency Plus', core: 'Multi-Spring-Bonnell, 183 Federn/m²', firm: 'H3', extra: 'Sommerseite Tencel™, Winterseite Bambus, HeiQ Smart Temp®',
      text: 'Die schlankste Matratze mit feiner kleiner Raute und präzisen Kanten. Eine Seite für den Sommer, eine für den Winter.' }
  };
  var tabs = $$('.tab'), panel = $('#panel-mattress');
  function selectTab(tab, focus) {
    var key = tab.getAttribute('data-key'), d = M[key];
    tabs.forEach(function (t) { var on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tab.id);
    $$('.mattress__img img', panel).forEach(function (img) { img.classList.toggle('is-shown', img.getAttribute('data-key') === key); });
    $$('.gauge__row', panel).forEach(function (r) { r.classList.toggle('is-current', r.getAttribute('data-key') === key); });
    var body = $('.mattress__body', panel);
    body.animate && !reduce && body.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.22,.61,.36,1)' });
    $('#m-name').textContent = d.name; $('#m-text').textContent = d.text;
    $('#m-core').textContent = d.core; $('#m-firm').textContent = d.firm; $('#m-extra').textContent = d.extra;
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!n) return;
      e.preventDefault();
      selectTab(tabs[(i + n + tabs.length) % tabs.length], true);
    });
  });

  /* Hotel map. Partner hotels are EXAMPLE data until real hotels are cleared (website-notes.md). */
  var HOTELS = [
    { name: 'Hotel am Gendarmenhof', city: 'Berlin', lat: 52.52, lon: 13.40, stars: 5, products: ['Boxspringbett', 'Imperial'] },
    { name: 'Alsterpalais', city: 'Hamburg', lat: 53.55, lon: 9.99, stars: 5, products: ['Boxspringbett', 'American Dream'] },
    { name: 'Residenz am Hofgarten', city: 'München', lat: 48.14, lon: 11.58, stars: 5, products: ['Imperial'] },
    { name: 'Mainufer Suites', city: 'Frankfurt am Main', lat: 50.11, lon: 8.68, stars: 4, products: ['Boxspringbett', 'Hollywood'] },
    { name: 'Domblick Hotel', city: 'Köln', lat: 50.94, lon: 6.96, stars: 4, products: ['Hollywood'] },
    { name: 'Königsallee Grand', city: 'Düsseldorf', lat: 51.23, lon: 6.78, stars: 5, products: ['Boxspringbett', 'Imperial'] },
    { name: 'Elbterrassen Hotel', city: 'Dresden', lat: 51.05, lon: 13.74, stars: 4, products: ['American Dream'] },
    { name: 'Hotel Messehof', city: 'Leipzig', lat: 51.34, lon: 12.37, stars: 4, products: ['Regency Plus'] },
    { name: 'Schlossgarten Residenz', city: 'Stuttgart', lat: 48.78, lon: 9.18, stars: 5, products: ['Boxspringbett', 'American Dream'] },
    { name: 'Kurhaus-Hotel Lichtental', city: 'Baden-Baden', lat: 48.76, lon: 8.24, stars: 5, products: ['Imperial', 'Boxspringbett'] },
    { name: 'Dünenhaus Westerland', city: 'Sylt', lat: 54.91, lon: 8.31, stars: 5, products: ['Boxspringbett', 'Hollywood'] },
    { name: 'Strandvilla Binz', city: 'Rügen', lat: 54.40, lon: 13.61, stars: 4, products: ['Regency Plus', 'Boxspringbett'] },
    { name: 'Alpenhof Zugspitzblick', city: 'Garmisch-Partenkirchen', lat: 47.49, lon: 11.10, stars: 4, products: ['American Dream'] },
    { name: 'Hotel Alte Brücke', city: 'Heidelberg', lat: 49.41, lon: 8.69, stars: 4, products: ['Regency Plus', 'Hollywood'] }
  ];
  var HQ = { name: 'Hantermann – Der Hotelausstatter', city: 'Kleinostheim', lat: 50.00, lon: 9.06 };
  var C = Math.cos(51.2 * Math.PI / 180);
  function proj(lat, lon) { return [(lon - 5.8) * 100 * C, (55.1 - lat) * 100]; }
  var SVGNS = 'http://www.w3.org/2000/svg', pinsG = $('#pins'), list = $('#hotel-list');
  if (pinsG && list) {
    var pins = [], items = [];
    function pin(h, i, hq) {
      var p = proj(h.lat, h.lon), g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('class', 'pin' + (hq ? ' is-hq' : ''));
      g.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ',' + p[1].toFixed(1) + ')');
      if (!hq) { g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', h.name + ', ' + h.city); }
      var right = p[0] < 420;
      g.innerHTML = '<circle class="halo" r="7"></circle><circle class="dot" r="' + (hq ? 7 : 6.5) + '"></circle>' +
        '<text x="' + (right ? 13 : -13) + '" y="4" text-anchor="' + (right ? 'start' : 'end') + '"></text>';
      g.querySelector('text').textContent = hq ? 'Kleinostheim' : h.city;
      pinsG.appendChild(g);
      if (!hq) {
        g.addEventListener('click', function () { select(i, true); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i, true); } });
        if (!reduce) { g.style.opacity = '0'; g.style.transition = 'opacity .6s ease ' + (0.06 * i).toFixed(2) + 's'; }
      }
      return g;
    }
    HOTELS.forEach(function (h, i) {
      pins.push(pin(h, i));
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = '<strong></strong><span class="stars" aria-label=""></span><small></small>';
      b.querySelector('strong').textContent = h.name;
      var st = b.querySelector('.stars'); st.textContent = '★'.repeat(h.stars); st.setAttribute('aria-label', h.stars + ' Sterne');
      b.querySelector('small').textContent = h.city + ' · ' + h.products.join(', ');
      b.addEventListener('click', function () { select(i, false); });
      b.addEventListener('mouseenter', function () { pins[i].classList.add('is-active'); });
      b.addEventListener('mouseleave', function () { if (!b.classList.contains('is-active')) pins[i].classList.remove('is-active'); });
      li.appendChild(b); list.appendChild(li); items.push(li);
    });
    pin(HQ, -1, true);
    function select(i, fromMap) {
      pins.forEach(function (p, j) { p.classList.toggle('is-active', j === i); });
      items.forEach(function (li, j) { li.firstChild.classList.toggle('is-active', j === i); });
      if (fromMap) items[i].firstChild.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }
    $$('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        $$('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        HOTELS.forEach(function (h, i) {
          var show = f === 'all' || h.products.indexOf(f) > -1;
          pins[i].classList.toggle('is-dim', !show);
          items[i].hidden = !show;
        });
      });
    });
    var showPins = function () { pins.forEach(function (p) { p.style.opacity = ''; }); };
    if (!reduce && 'IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { showPins(); mio.disconnect(); } }, { threshold: 0.25 });
      mio.observe(pinsG.ownerSVGElement);
    } else showPins();
  }

  /* Contact form: no server yet, so it validates and says so plainly */
  var form = $('#contact-form'), msg = $('#form-msg');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#f-name'), mail = $('#f-email');
    if (!name.value.trim()) { msg.textContent = 'Bitte geben Sie Ihren Namen an.'; name.focus(); return; }
    if (!mail.validity.valid || !mail.value) { msg.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse an.'; mail.focus(); return; }
    msg.textContent = 'Danke, ' + name.value.trim() + '. Das Formular ist noch nicht angebunden, Ihre Anfrage wurde nicht versendet.';
  });
})();
