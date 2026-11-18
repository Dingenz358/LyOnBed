# LYONBED Brand Asset Pack – Manifest

Erstellt am 18.11.2026 mit der Higgsfield CLI im Tarif Starter.
**Verbraucht: 16 Credits** (8 × `nano_banana_pro` à 2 Credits, 2k). Stand danach: 210 Credits.
Das Video ist **noch offen**: `seedance_2_0` verlangt den Pro- oder Ultimate-Tarif, siehe unten.

## Ordner

| Ordner | Inhalt |
|---|---|
| `logo/` | Original-Logo als Vektor nachgezeichnet: SVG, PNG und Favicons |
| `banner/` | Website-Hero als Standbild (16:9) |
| `heroes/` | Boxspringbett und 4 Matratzen (1:1) |
| `detail/` | Qualität: Aufbau im Anschnitt (16:9) |
| `lifestyle/` | Hände und Bettwäsche im Morgenlicht (16:9) |
| `motion/` | Poster-Standbild für das Hero-Video (Video folgt) |
| `web/` | Alle Fotos web-optimiert als WebP und JPG (1920 px bzw. 1200 px breit) |
| `refs/` | Referenzen: Broschüren-Suite, Produktfotos von hantermann.com, Logo-Original |

## Generierte Bilder (nano_banana_pro, 2k, je 2 Credits)

| # | Datei | Format | Referenzbild | Job-ID |
|---|---|---|---|---|
| 1 | `banner/lyonbed-banner-suite-16x9.png` | 16:9 · 2752×1536 | Suite aus der Broschüre (nur Stimmung) | f54fac0f-ec31-48be-ada4-e8bff9ef002c |
| 2 | `heroes/lyonbed-boxspring-1x1.png` | 1:1 · 2048² | Banner (#1) | 006479ba-14e1-43d4-bc4d-35cfd99ce5be |
| 3 | `heroes/lyonbed-imperial-grand-deluxe-1x1.png` | 1:1 | Produktfoto Imperial | a6120dd3-e812-4a36-91ef-96daecf56fa8 |
| 4 | `heroes/lyonbed-american-dream-grand-deluxe-1x1.png` | 1:1 | Produktfoto American Dream | 853d5a4d-7d68-4829-9e1c-996fc4b5ad9b |
| 5 | `heroes/lyonbed-hollywood-deluxe-1x1.png` | 1:1 | Produktfoto Hollywood | 193db978-cd95-438a-83b2-f44ce189c818 |
| 6 | `heroes/lyonbed-regency-plus-1x1.png` | 1:1 | Produktfoto Regency | 4c1d0e38-0fea-4ed8-acfc-2580358540cd |
| 7 | `detail/lyonbed-craftsmanship-cutaway-16x9.png` | 16:9 | – | 408be579-d32c-4594-9c69-369331d04a1e |
| 8 | `lifestyle/lyonbed-hands-linen-16x9.png` | 16:9 | Banner (#1) | 79726308-3bb0-447d-bd39-66ffce014bb1 |

Es gab keine Wiederholungen. Alle 8 Bilder sind im ersten Durchgang gelungen.

### Prompts (gekürzt; die Hex-Werte der Palette standen in jedem Prompt)
1. **Banner:** Fünf-Sterne-Suite, Boxspringbett mit Taupe-Leinen und hohem Kopfteil im linken Drittel, weiße Hotelbettwäsche, Messinglampe, Wandpaneele in Elfenbein, Eiche im Fischgrät. Rechte Bildhälfte frei für die Headline, warmes Spätnachmittagslicht.
2. **Boxspring:** dasselbe Bett in derselben Suite, Dreiviertelansicht vom Fußende, Füße aus Buche.
3. **Imperial (32 cm):** höchste Matratze, tiefe Knopfsteppung, hohe Bordüre.
4. **American Dream (27 cm):** Steppung im Wellen- und Rautenmuster, feste Kanten.
5. **Hollywood (27 cm):** Jacquard-Damast, große Raute, Kräuselheftung, Tragegriff.
6. **Regency Plus (22 cm):** schlankste Matratze, feine kleine Raute, präzise Kanten.
   Gemeinsames Set für 3–6: nahtloser Hintergrund in Elfenbein, warmes Licht von links oben, Dreiviertelansicht von oben, keine Etiketten.
7. **Detail:** Boxspring-Ecke mit zurückgeschlagenem Stoff. Massivholzzarge aus Fichte, verklammerte Bonnell-Federn, Nadelfilz, Polsterwatte, Quertraversen. Streiflicht.
8. **Lifestyle:** Hände streichen weiße Satin-Bettwäsche glatt, goldenes Morgenlicht, nur Hände und Unterarme zu sehen.

## Logo (ohne KI, 0 Credits)
Das Original-JPG wurde in Farbebenen zerlegt und mit potrace vektorisiert. Die Farben sind exakt aus dem Original übernommen.
- `lyonbed-logo.svg` – transparent, Taupe und Gold
- `lyonbed-logo-ivory.svg` – auf elfenbeinfarbener Fläche
- `lyonbed-logo-dark-bg.svg` – für dunkle Hintergründe, Taupe ersetzt durch Elfenbein
- `lyonbed-mark.svg` / `lyonbed-mark-dark-bg.svg` – nur das Löwen-Signet ohne Schriftzug
- PNG-Exporte in 2048 px, `lyonbed-mark-1024.png`, `favicon-32.png`, `apple-touch-icon-180.png`

## Texturen und Atmosphäre (CSS, 0 Credits)
Wie besprochen gibt es dafür keine KI-Bilder. Leinenstruktur, Filmkorn, goldene Haarlinien und Lichtschein liegen als CSS im `embed-guide.md`.

## Offen: Hero-Video
`seedance_2_0` wurde zweimal abgelehnt, mit und ohne Endbild: „Pro- oder Ultimate-Tarif erforderlich“. Dabei wurden keine Credits abgebucht.
Geplanter Prompt: statische Kamera, Superzeitlupe, eine weiße Daunendecke schwebt auf das Bett und legt sich in ruhige Falten, Staubpartikel im Sonnenlicht. Start- und Endbild ist das Banner, damit der Loop nahtlos wird.
