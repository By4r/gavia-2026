# Gavia Works 2026 — Ana Sayfa Rebuild Planı

> TUR 1 render onaylanmadı: eski gaviaworks.com'a benziyor, Itransition/Innova
> referansları yansımamış, görsel sıfır, mega menü yok, one-page yanlış karar.
>
> Yeni yön: **multi-page yaklaşım**. Bu turda SADECE `prototypes/index.html`
> rebuild. Alt sayfalar (hizmetler/yapay-zeka/urunler/...) ileride.
>
> Tonluk hedefi: **%60 Itransition + %25 Innova + %15 Netguru ajans**.

---

## 1. Mega Menü Yapısı (Itransition tarzı)

- Header **sticky** kalacak. Scroll'da mevcut `nav-blur` davranışı korunur.
- Sol: Logo. Orta: **5 ana menü**. Sağ: tek CTA ("Projenizi Anlatalım").
- Her menü item'a **hover'da büyük panel** (mega-panel) açılır:
  - Tam genişlik (`max-w-7xl` içinde), `position: absolute`, dark zemin + blur.
  - İç düzen: **sol blok = 4-6 alt link** (her biri ikon + başlık + 1-2 cümle açıklama),
    **sağ blok = öne çıkan kart/görsel** (placehold.co).
  - Mobile'da: panel kapalı, item tıklanınca aşağı doğru accordion açılır.

### 5 Panel İçerikleri (site-map.md kaynaklı)

| Menü | Alt Linkler | Sağ Featured |
|------|-------------|--------------|
| **Hizmetler** | Özel Yazılım Sistemleri / Mobil Uygulama / Sistem Entegrasyonları / Bulut & Güvenlik | "AI Dönüşüm Analizi" CTA kartı |
| **Yapay Zekâ** | AI Otomasyonlar / AI Agent & Asistanlar / Veri Analitiği / Belge Zekâsı / Etik & Güvenlik | "AI showcase" görsel kart |
| **Ürünler** | Gavia CRM / Flow / Assistant / Insight + alt blok: Commerce / ESG / Portal | "Yakında" rozetli ürün kartı |
| **Sürdürülebilirlik** | Dijital Verimlilik / ESG Raporlama / Sürdürülebilir Mimari / AI for Sustainability / Sosyal Fayda | Manifesto satırı + görsel |
| **Gavia** | Hakkımızda / Yaklaşım / Ekip / Kariyer | Ofis görseli placeholder |

---

## 2. Hero Yeni Yapısı (iki kolon)

- `lg:grid-cols-2` (lg ve üstü yan yana), mobile'da alt alta (görsel altta).
- **SOL kolon:**
  - `badge-mint` üst rozet ("Yapay Zekâ × Yazılım Stüdyosu")
  - Büyük h1 başlık (Manrope 800, gradient text mint).
  - Paragraf (Geist 400, ~2 satır).
  - 2 CTA: birincil mint dolgulu ("Projenizi Anlatalım"), ikincil outline ("AI Analizi Talep Et").
- **SAĞ kolon:**
  - Büyük placeholder görsel: `placehold.co/800x600/0A0E27/3FD5AD?text=AI+Vision`
  - Köşeleri `rounded-2xl`, üzerinde subtle mint glow.
- Görselin **altında 3 küçük "trust badge" satırı** (müşteri logo placeholder
  `placehold.co/120x40/141533/6B7280?text=Logo`).

---

## 3. Ana Sayfa Bölümleri (multi-page mantığı → ÖZET)

Multi-page olduğu için ana sayfa SADECE özet. Alt sayfalara linkler "Daha
fazla →" şeklinde (henüz alt sayfalar yok, link `#` kalır + TODO yorum).

1. **Hero** (madde 2)
2. **"Ne Yapıyoruz" — 4 hizmet kartı** (Innova vibe, görsel ağırlıklı)
   - Her kart: üstte **büyük görsel** (`placehold.co/600x400/141533/3FD5AD?text=<hizmet>`)
   - Altında: ikon + başlık (h3) + 2 satır açıklama + "Detay →" link.
   - `card-glow` hover state.
3. **AI Yetenekleri Showcase** (3'lü vurgu — yatay scroll YOK, statik grid)
   - 3 büyük blok: Otomasyon / Agent / Belge Zekâsı (en güçlü 3).
   - Her blokta görsel + başlık + 1-2 cümle. "Tüm AI çözümleri →" alt link.
4. **Ürün Ailesi Vitrin** — 4 ürün (CRM/Flow/Assistant/Insight)
   - 4-col grid (mobile 1, md 2, lg 4).
   - Her ürünün üstünde **logo placeholder** + isim + 1 cümle pitch + `badge-soon` ("YAKINDA").
   - Görsel: `placehold.co/200x80/020837/3FD5AD?text=Gavia+CRM` (logo formatı).
5. **Sektörler — Innova tarzı görsel grid**
   - 8 sektör tile (Perakende / İnşaat / Denizcilik / Eğitim / Sağlık / Üretim / Kamu / Medya).
   - 2-col mobile, 4-col md+. Her tile: kare görsel (`placehold.co/400x300/E9EEF1/020837?text=<sektör>`) + üstte sektör adı overlay.
   - `sector-tile` class — hover'da görsel hafif zoom + mint overlay.
6. **Sürdürülebilirlik Tek Satır CTA Bandı**
   - Koyu zemin, tek satır manifesto + tek CTA ("Yaklaşımımızı görün →").
   - Yan ikon `placehold.co/80x80/020837/3FD5AD?text=ESG`.
7. **Final CTA Bandı** — "Projenizi Anlatalım" + "AI Dönüşüm Analizi" iki CTA.
8. **Footer** — TUR 1'deki 4 kolon footer korunur (Marka / Hizmetler / Ürünler / İletişim+KVKK).

---

## 4. Görsel Stratejisi (placehold.co)

| Yer | URL Pattern | Boyut |
|-----|-------------|-------|
| Hero sağ | `placehold.co/1200x800/020837/3FD5AD?text=AI+Vision` | 1200×800 |
| Hizmet kart üst | `placehold.co/600x400/141533/3FD5AD?text=<hizmet>` | 600×400 |
| AI showcase blok | `placehold.co/500x350/0A0E27/3FD5AD?text=<ai+yetenek>` | 500×350 |
| Ürün logo | `placehold.co/200x80/020837/3FD5AD?text=Gavia+<x>` | 200×80 |
| Sektör tile | `placehold.co/400x300/E9EEF1/020837?text=<sektör>` | 400×300 |
| Trust badge | `placehold.co/120x40/141533/6B7280?text=Logo` | 120×40 |
| Sürdürülebilirlik ikon | `placehold.co/80x80/020837/3FD5AD?text=ESG` | 80×80 |

> **TODO:** Yasin Bey gerçek görsel sağlayacak veya AI ile üretilecek.

---

## 5. Yeni Component'ler

- **MegaMenu** — header'a entegre, hover-triggered dropdown panel.
- **ImageCard** — üstte 600×400 görsel + altında ikon/başlık/desc/link.
- **SectorTile** — Innova tarzı kare görsel + overlay başlık.
- **TrustBadgeRow** — yatay 4-6 logo placeholder şeridi (greyscale).
- **ProductCard** — logo + isim + pitch + "YAKINDA" badge.

---

## 6. brand.css Eklemeleri

Mevcut korunacak (silme yok): `.gradient-text-mint`, `.card-glow`, `.dot-pattern`,
`.badge-mint`, `.badge-mint-dark`, `.badge-soon`, `.chip-sector`, `.nav-blur`.

**Eklenecek:**

```css
.mega-panel {
  position: absolute;
  left: 0; right: 0;
  top: 100%;
  background: rgba(2, 8, 55, 0.95);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--gavia-border);
  padding: 32px 0;
  opacity: 0; visibility: hidden;
  transition: all 0.2s ease-out;
}
.mega-trigger:hover .mega-panel,
.mega-panel:hover { opacity: 1; visibility: visible; }

.image-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--gavia-border);
  background: var(--gavia-night);
  transition: all 0.3s ease-out;
}
.image-card:hover {
  transform: translateY(-4px);
  border-color: var(--gavia-mint);
  box-shadow: 0 8px 32px rgba(63, 213, 173, 0.15);
}

.sector-tile {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}
.sector-tile img { transition: transform 0.4s ease-out; }
.sector-tile:hover img { transform: scale(1.05); }
.sector-tile-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(2, 8, 55, 0.85) 100%);
  display: flex; align-items: flex-end; padding: 16px;
}
.sector-tile:hover .sector-tile-overlay {
  background: linear-gradient(180deg, rgba(63, 213, 173, 0.15) 0%, rgba(2, 8, 55, 0.9) 100%);
}
```

~40-50 satır brand.css ek.

---

## 7. main.js Eklemeleri

- Mevcut mobile menu / scroll blur / smooth scroll davranışı KORUNUR.
- **Eklenecek:** mobil mega menü accordion toggle (her menü item için
  `aria-expanded` state, click ile alt panel açılır).
- Desktop'ta mega panel CSS hover ile çalışır — JS gerek YOK.

---

## 8. Yapılmayacaklar (Risk)

- Alt sayfalar (hizmetler.html, yapay-zeka.html, urunler.html, surdurulebilirlik.html, gavia.html, iletisim.html) — BU TURDA YOK.
- Gerçek görsel YOK — sadece placehold.co.
- Form submit YOK — CTA'lar `href="#iletisim"` veya `mailto:` placeholder.
- Animasyon minimal — fade-up scroll AOS YOK, sadece CSS hover.
- Slider/carousel YOK.
- Dark/light toggle YOK.

---

## 9. Tahmini Boyut & Süre

| Dosya | Tahmini Satır | Süre |
|-------|---------------|------|
| `prototypes/index.html` (rebuild) | 700-900 | 2 saat |
| `prototypes/assets/css/brand.css` (ek) | +40-50 | 20 dk |
| `prototypes/assets/js/main.js` (ek) | +20 | 15 dk |
| Test & responsive kontrol | — | 30 dk |
| **TOPLAM** | — | **~3 saat** |

---

## 10. Eski Dosyaya Ne Olacak

- Mevcut `prototypes/index.html` (490 satır TUR 1 versiyonu) **dokunulmaz**.
- Rebuild başlayınca dosya **yerinde overwrite** edilir. Beyar git diff ile
  karşılaştırabilir (henüz commit YOK).
- Beyar isterse rebuild öncesi `prototypes/index.tur1.html.bak` olarak yedek
  alınabilir — Beyar söylerse yap.

---

## 11. Onay Bekleyen Kararlar (Yasin Bey / Beyar)

1. Mega menü 5 panel içerikleri OK mi? (yukarıdaki tablo)
2. Hero sağ büyük görsel placeholder OK mi yoksa hemen gerçek görsel mi gerek?
3. Sektör listesi 8 öğe (Perakende / İnşaat / Denizcilik / Eğitim / Sağlık /
   Üretim / Kamu / Medya) doğru mu?
4. Mevcut `index.html` rebuild öncesi yedek alınsın mı (`.bak`)?

---

## TESLİM ÖZETİ

- ✅ `/compact` yapıldı, context kararlı.
- ✅ Bu plan (`tasks/rebuild-plan.md`) yazıldı.
- ✅ Eski `prototypes/index.html` korunuyor, DOKUNULMADI.
- ⏸️ Plan onayı bekleniyor. Onaylanınca rebuild başlar.
