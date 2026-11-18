# LYONBED – Farbpalette

Gold, Taupe und Elfenbein sind direkt aus dem Original-Logo gemessen. Messing, Leinenweiß und Espresso stammen aus der Broschüre.

| Name | Hex | RGB | Einsatz |
|---|---|---|---|
| **Lyon Gold** | `#CCAC31` | 204 172 49 | Logo („ON“), Akzente, Linien, Hover-Zustände. Sparsam einsetzen |
| **Champagner-Messing** | `#B8975A` | 184 151 90 | Overlines, Icons, Trennlinien, Buttons auf hellem Grund |
| **Taupe** | `#898471` | 137 132 113 | Logo („LY“, „BED“), Fließtext auf hellem Grund, Bettstoff |
| **Elfenbein** | `#FFF1CE` | 255 241 206 | Logo-Hintergrund, warme Sektionsflächen |
| **Leinenweiß** | `#F7F2EA` | 247 242 234 | Standard-Seitenhintergrund, Karten |
| **Espresso** | `#2A221C` | 42 34 28 | Dunkle Bänder, Footer, Headlines auf hellem Grund |

## CSS-Variablen

```css
:root {
  --lyon-gold:      #CCAC31;
  --lyon-brass:     #B8975A;
  --lyon-taupe:     #898471;
  --lyon-ivory:     #FFF1CE;
  --lyon-linen:     #F7F2EA;
  --lyon-espresso:  #2A221C;
}
```

## Regeln
- Etwa 70 % Leinenweiß oder Elfenbein, 20 % Espresso oder Taupe, 10 % Gold oder Messing.
- Gold nie als große Fläche verwenden, nur für Linien, Ziffern und Akzente.
- Text auf Elfenbein: Espresso (Kontrast 14:1). Taupe nur für Text ab 18 px, da der Kontrast nur ca. 3,3:1 beträgt.
