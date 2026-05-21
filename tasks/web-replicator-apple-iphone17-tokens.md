# Web Replicator — Apple iPhone 17 Pro → Gavia Yapay Zeka

**Mode:** B (existing site overlay)
**Target:** `prototypes/yapay-zeka.html`
**Reference:** https://www.apple.com/iphone-17-pro/
**Brand corporate reference:** `prototypes/surdurulebilirlik.html`

## İSTEK TÜRÜ (L10 disiplini)
**Kategori D — Full visual language overhaul.** Beyar açık dedi: "aynısını istiyorum, iyi replica yap." Mevcut HTML/CSS bütünüyle yeniden yazılıyor. İçerik (4 AI capability + CTA) sabit; renk paleti, tipografi, layout, scroll, signature pattern Apple iPhone 17 Pro'dan + Gavia sürdürülebilirlik kurumsal dilinden hibrit.

## Token envanteri

### Color palette
- **Apple bg primary:** `#FFFFFF` (pure white)
- **Apple bg alt:** `#F5F5F7` (Apple's signature off-white panel)
- **Apple bg dark:** `#000000` (true black for product hero)
- **Apple text primary:** `#1D1D1F` (Apple near-black)
- **Apple text secondary:** `#6E6E73` (Apple gray)
- **Apple accent link:** `#0066CC` (Apple blue) → **bizde mint** `#3FD5AD`
- **Gavia korunan:**
  - `--gavia-mint: #3FD5AD`
  - `--gavia-mint-bright: #4FE5BD`
  - `--gavia-deep: #020837`
  - `--gavia-night: #141533`
  - `--gavia-light: #E9EEF1`

### Typography — Effective body font (L05 disiplini)
- **Loaded (Apple):** SF Pro Display, SF Pro Text (system)
- **Effective body:** SF Pro / system fallback
- **Bizim seçim (cross-site tutarlılık için):** `Inter` (sürdürülebilirlik/index ile aynı). Sürdürülebilirlikte ana font Inter; Apple yakınlığı tek aile, Apple'ın thin weight'i + tight tracking ile sağlanır.
- **H1 scale:** Apple ~56–64px desktop / 40px mobile → bizimki `clamp(40px, 6.5vw, 80px)`
- **H2 scale:** Apple ~40–48px → bizimki `clamp(32px, 4.5vw, 56px)`
- **H3 scale:** `clamp(20px, 2vw, 28px)`
- **Body:** 17–19px (Apple), bizimki 17px
- **Weight:** 300 (light), 400 (regular), 500 (medium), 600 (semibold) — Apple thin = 300, headlines 500-600
- **Letter-spacing:** H1/H2 `-0.025em` (Apple tight tracking), body `-0.005em`, eyebrow `0.18em`
- **Line-height:** H1 `1.05`, H2 `1.08`, body `1.5`

### Spacing scale
- Section vertical padding: `120px` desktop / `80px` tablet / `64px` mobile (Apple cadence)
- Container max-width: `1280px` (Apple narrower than our `1200px` shell — burada Apple çek)
- Section gap: `0` (alternating panels touch edges)

### Radius / shadow
- Card radius: `22px` (Apple's signature larger radius)
- Button radius: `980px` (Apple pill — fully rounded)
- Image radius: `28px` on cards, `0` on edge-to-edge media
- Shadow: minimal; `0 2px 12px rgba(0,0,0,0.04)` only when card on white

### Animations
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (sürdürülebilirlikten miras — Apple smooth scroll yakın)
- Reveal: opacity 0→1 + translateY(20px) → 0 over `0.7s`
- Trigger: IntersectionObserver, threshold 0.15

## Signature Patterns (CRITICAL)

Apple iPhone 17 Pro'nun 4 imza görsel kodu:

1. **Massive centered H1 + thin product hero** — H1 64–80px, weight 500, text-align center, hero medya altta tam viewport genişliği. Bizde: H1 büyük + altında ambient AI video bg yerine subtle gradient + minimal accent shape.
2. **Edge-to-edge alternating panels** — section'lar yan padding'siz, full bleed bg. Beyaz panel → off-white panel → siyah panel → beyaz. Visual rhythm alternation ile yaratılır.
3. **Hairline eyebrow + tracked uppercase** — "Get the highlights." gibi tiny intro labels. Bizde "//01 OTOMASYON" pattern korunur (mono familya kalksın, eyebrow tek-aile Inter olsun, ama 0.22em tracking + 11px + 700 weight).
4. **Pill CTA + arrow link pair** — "Buy" pill + "Learn more →" plain link yan yana. Bizde "Projenizi Anlatalım" pill + "Ana sayfa" plain link.

Gavia'dan korunan signature (sürdürülebilirlik'ten miras):
- **Rotated hero stamp** — sağ-kenarda 90deg rotated outline number "00 — YAPAY ZEKA"
- **Italic mint em** — H1/H2 içinde `<em>` mint italic vurgu kelimesi
- **Numbered overline** — `01 / Otomasyon` hairline ::before ile

## Section mapping

| Apple iPhone 17 Pro | Gavia Yapay Zeka |
|---|---|
| Local nav (sticky chips) | Sticky local nav (4 capability anchors + Geri) |
| Hero (centered H1 + product) | Hero (massive H1 + minimal AI motif) |
| Get the highlights (carousel 6 cards) | "Öne çıkanlar" — 4 capability mini grid |
| Design deep-dive (alternating dark panel) | 01 Otomasyon (dark panel + edge media) |
| Cameras section (light panel + comparison) | 02 AI Agent (light panel + numbered features) |
| Performance section (dark panel + chart) | 03 Veri & Belge Zekası (dark panel + RAG diagram) |
| Battery section (light panel + minimal copy) | 04 Etik AI & KVKK (light panel + minimal copy) |
| iOS 26 / Apple Intelligence callout | (skip — replaced by capability sections themselves) |
| Comparison table | (skip — not enough content) |
| Environment callout | (skip) |
| FAQ accordion | (skip — content not provided) |
| Footer (mega) | Mevcut footer pattern korunur |
| CTA banner "Get credit" top | CTA section "Konuşalım" bottom |

## Anti-patterns to avoid (L lessons)

- L10: Mevcut signature elementleri silme (badge, divider, italic em pattern) — sadece görsel dilin üstüne katman.
- L05: Tek aile (Inter). JetBrains Mono'yu eyebrow için kullanma — Inter 700 + uppercase + tracking ile aynı dokuyu yakala.
- L06: Scroll-over pattern fixed + spacer wrapper kullan, sticky değil.
- Apple'ın copy/imagery birebir kopyalanmaz — visual language only.

## Iteration gate
- 3 turn max
- Stop: signature patterns uygulandı + ≤3 büyük görsel fark; veya Beyar "AI kokuyor" der → revert + clarify.
