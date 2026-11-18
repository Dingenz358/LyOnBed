# LYONBED – Embed-Guide

Copy-paste-Snippets für die neue Website. Die Pfade gehen davon aus, dass der Ordner `lyonbed-assets/` als `/assets/` im Projekt liegt.

## 1. Fonts und Tokens

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
:root {
  --lyon-gold: #CCAC31;  --lyon-brass: #B8975A;  --lyon-taupe: #898471;
  --lyon-ivory: #FFF1CE; --lyon-linen: #F7F2EA;  --lyon-espresso: #2A221C;
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Raleway", system-ui, sans-serif;
}
body { margin: 0; background: var(--lyon-linen); color: var(--lyon-espresso); font-family: var(--font-body); }
h1, h2, h3 { font-family: var(--font-display); font-weight: 400; letter-spacing: .01em; }
.overline { font: 600 .75rem/1 var(--font-body); letter-spacing: .2em; text-transform: uppercase; color: var(--lyon-brass); }
```

## 2. Favicon und Logo in der Navigation

```html
<link rel="icon" type="image/svg+xml" href="/assets/logo/lyonbed-mark.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon-180.png">

<header class="nav">
  <a href="/" class="nav__brand" aria-label="LYONBED Startseite">
    <img src="/assets/logo/lyonbed-mark.svg" alt="" width="40" height="40">
    <span>LYONBED</span>
  </a>
</header>
```
```css
.nav { position: fixed; inset: 0 0 auto; display: flex; align-items: center; padding: 1rem clamp(1rem, 4vw, 3rem); z-index: 10; }
.nav__brand { display: flex; gap: .75rem; align-items: center; text-decoration: none;
  font: 500 1.4rem var(--font-display); letter-spacing: .18em; color: var(--lyon-espresso); }
```
Auf dunklem Grund nimmst du `lyonbed-mark-dark-bg.svg` bzw. `lyonbed-logo-dark-bg.svg`.

## 3. Hero mit Hintergrundvideo und Poster als Fallback

Solange das Video fehlt, zeigt der Hero das Poster als Standbild. Sobald `motion/lyonbed-hero-loop.mp4` existiert, spielt es automatisch.

```html
<section class="hero">
  <video class="hero__media" autoplay muted loop playsinline preload="metadata"
         poster="/assets/motion/lyonbed-hero-poster.jpg">
    <source src="/assets/motion/lyonbed-hero-loop.mp4" type="video/mp4">
  </video>
  <div class="hero__copy">
    <p class="overline">Das Hotelbett für Ihr Zuhause</p>
    <h1>Schlafen wie im<br><em>Fünf-Sterne-Hotel</em></h1>
    <p>Das LYONBED Boxspringbett: gefertigt in Deutschland, geliefert in 3 Tagen.</p>
    <a class="btn" href="#produkte">Kollektion entdecken</a>
  </div>
</section>
```
```css
.hero { position: relative; min-height: 100svh; display: grid; align-items: center; overflow: hidden; }
.hero__media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 30% center; }
.hero__copy { position: relative; margin-left: auto; width: min(32rem, 90%); padding: 2rem clamp(1rem, 5vw, 5rem); }
.hero__copy h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.05; margin: .5rem 0 1rem; }
.hero__copy em { color: var(--lyon-brass); }
.btn { display: inline-block; padding: .9rem 1.8rem; background: var(--lyon-espresso); color: var(--lyon-ivory);
  text-decoration: none; letter-spacing: .12em; text-transform: uppercase; font-size: .8rem; }
.btn:hover { background: var(--lyon-brass); }
@media (max-width: 760px) {             /* Auf schmalen Bildschirmen liegt der Text unten auf einem Verlauf */
  .hero { align-items: end; }
  .hero::after { content: ""; position: absolute; inset: 40% 0 0; background: linear-gradient(transparent, var(--lyon-linen) 70%); }
  .hero__copy { z-index: 1; margin: 0; }
}
@media (prefers-reduced-motion: reduce) { .hero__media { display: none; } .hero { background: url(/assets/motion/lyonbed-hero-poster.jpg) 30% center / cover; } }
```

Ein statischer Hero ohne Video, etwa für Unterseiten, nutzt `web/lyonbed-banner-suite-16x9.webp` als `background-image`.

## 4. Produktkarten

```html
<section id="produkte" class="products texture-linen">
  <p class="overline">Die Kollektion</p>
  <h2>Hotelqualität, Stück für Stück</h2>
  <div class="products__grid">
    <article class="card">
      <picture>
        <source srcset="/assets/web/lyonbed-boxspring-1x1.webp" type="image/webp">
        <img src="/assets/web/lyonbed-boxspring-1x1.jpg" alt="LYONBED Boxspringbett mit taupefarbenem Kopfteil" loading="lazy" width="1200" height="1200">
      </picture>
      <h3>LYONBED Boxspringbett</h3>
      <p>Massivholzzarge · verklammerter Federkern · Made in Germany</p>
    </article>
    <!-- Gleiches Muster für:
         lyonbed-imperial-grand-deluxe-1x1   → Imperial Grand Deluxe · 32 cm · Mira-Coil® · H2–3
         lyonbed-american-dream-grand-deluxe-1x1 → American Dream Grand Deluxe · 27 cm · 5-Zonen-Taschenfederkern · H3
         lyonbed-hollywood-deluxe-1x1        → Hollywood Deluxe · 27 cm · 5-Zonen-Taschenfederkern · H2–3
         lyonbed-regency-plus-1x1            → Regency Plus · 22 cm · Bonnell-Federkern · H3 -->
  </div>
</section>
```
```css
.products { padding: clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 5rem); }
.products__grid { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr)); }
.card img { width: 100%; height: auto; display: block; background: var(--lyon-ivory); }
.card h3 { font-size: 1.5rem; margin: 1rem 0 .25rem; }
.card p { color: var(--lyon-taupe); font-size: .9rem; margin: 0; }
```

## 5. Qualität und Lifestyle (Bild neben Text)

```html
<section class="split">
  <img src="/assets/web/lyonbed-craftsmanship-cutaway-16x9.webp" alt="Anschnitt: Massivholzzarge, verklammerter Federkern, Quertraversen" loading="lazy">
  <div>
    <p class="overline">Besser als der Marktbegleiter</p>
    <h2>Was unter dem Stoff steckt</h2>
    <ul class="hairline-list">
      <li>Massivholzzarge (FSC) statt Spanplatte</li>
      <li>Verklammerter Federkern: kein Wandern, keine Geräusche</li>
      <li>10 Quertraversen aus Massivholz, kein MDF</li>
      <li>Keine Schaumstoffschulter, die nachgibt</li>
    </ul>
  </div>
</section>
```
```css
.split { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr)); gap: clamp(2rem, 5vw, 5rem);
  align-items: center; padding: clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 5rem); }
.split img { width: 100%; height: auto; display: block; }
.hairline-list { list-style: none; padding: 0; }
.hairline-list li { padding: .9rem 0; border-bottom: 1px solid color-mix(in srgb, var(--lyon-brass) 35%, transparent); }
```
Die Lifestyle-Aufnahme `web/lyonbed-hands-linen-16x9.webp` eignet sich als großes Bild vor dem Kontakt- bzw. Kaufbereich oder als Hintergrund eines Zitat-Bands. Lege dann `.texture-espresso` mit 60 % Deckkraft darüber.

## 6. Texturen und Atmosphäre (reines CSS)

Alle Texturen sind dezent genug, damit Text gut lesbar bleibt.

```css
/* Leinenstruktur auf hellen Sektionen */
.texture-linen { background-color: var(--lyon-linen);
  background-image:
    repeating-linear-gradient(0deg,  rgb(137 132 113 / .035) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgb(137 132 113 / .03)  0 1px, transparent 1px 4px); }

/* Warme Elfenbeinfläche mit Lichtschein von links oben */
.texture-glow { background:
    radial-gradient(60rem 40rem at 10% 0%, rgb(255 241 206 / .9), transparent 70%),
    var(--lyon-linen); }

/* Dunkles Espresso-Band wie in der Broschüre */
.texture-espresso { background: var(--lyon-espresso); color: var(--lyon-ivory);
  background-image: radial-gradient(50rem 30rem at 85% 120%, rgb(184 151 90 / .18), transparent 70%); }

/* Feines Filmkorn als Overlay, z. B. über Hero oder Lifestyle-Bild */
.grain::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .06; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

/* Goldene Haarlinie mit Raute als Sektionstrenner */
.divider { display: flex; align-items: center; gap: 1rem; color: var(--lyon-brass); }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: currentColor; opacity: .5; }
/* <div class="divider" aria-hidden="true">◆</div> */
```

## 7. Hotelkarte (folgt)
Die Kartensektion mit Partnerhotels in Deutschland ist für den Website-Bau vorgemerkt, siehe `website-notes.md`.
