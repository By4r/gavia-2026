# Gavia 2026 — Proje Hafızası

Bu dosya Claude Code'un context'i resetlenip yeniden başlasa bile **projenin nerede kaldığını** anlaması için tutulur. Her büyük iterasyon sonrası güncellenir.

**Son güncelleme:** 2026-05-13
**Proje:** gaviaworks.com tam yeniden tasarımı (AI-native creative studio konumlandırması)
**Patron / karar mercii:** Yasin Yavuz (Dada İstanbul)
**Yürüten:** Beyar Güneş
**Faz:** 1 (patron sunum prototipi — tek HTML dosyası)

## Deploy

- **GitHub repo**: https://github.com/By4r/gavia-2026 (public)
- **Live URL**: https://by4r.github.io/gavia-2026/
- **Pages source**: `main /docs`
- **Deploy yöntemi**: `docs/` klasörü `prototypes/v1/`'in canlı kopyası. Edit yapıldığında `cp prototypes/v1/index.html docs/index.html` + commit + push gerekir.
- **Visibility notu**: Public açıldı çünkü GitHub Pages free plan private destekler değil. Beyar private isterse Vercel/Netlify alternative kullanılır (Pro plan + private repo + Pages destekli).

---

## Hızlı durum (READ FIRST)

- Prototip yeri: `/Users/dadaistanbul/Developer/Projects/gavia-2026/prototypes/v1/index.html`
- Tek dosya HTML, double-click açılır, build step yok
- Patron'a sunulacak versiyon → Faz 2'de Next.js'e taşınacak
- **Şu an iterasyon yapıyoruz** — Beyar canlı feedback veriyor, ben anında uyguluyorum

---

## Konumlandırma

**Eski Gavia:** klasik dijital ajans (Web, Mobile, E-Marketing, Digital Media Mgmt, Strategy, UX/UI = 6 hizmet)
**Yeni Gavia:** **AI-native creative studio** — 3 ana hizmet:

1. **Yapay Zeka** (öncelikli, yeni kimliğin amiral kartı) — LLM Integration · Agent / Workflow · Custom AI Tools · RAG / Search · Voice & Vision
2. **Yazılım** — Frontend · Backend · UX/UI · CMS · Responsive · DevOps
3. **Mobile App** — iOS · Android · Flutter · Design · Distribution

**Kaldırılanlar:** E-Marketing, Digital Media Management, Strategy & Marketing, UX/UI (ayrı kart). UX/UI artık Yazılım'ın alt-bullet'ı.

**Manifesto cümlesi:** "AI'yı sadece kullanmıyoruz. AI ile inşa ediyoruz."

---

## Tasarım sistemi

### Renk paleti (Gavia marka — mevcut logodan)
```css
--bg:           #15163A   /* deep navy */
--bg-soft:      #1C1D44
--bg-card:      #232556
--bg-elev:      #2B2D63
--border:       #353871
--border-soft:  #262960
--text:         #F5F5F8
--text-dim:     #A5A8C4
--text-faint:   #6B6E94
--accent:       #4FBFA1   /* mint/teal */
--accent-soft:  #3FAA8E
--accent-glow:  rgba(79, 191, 161, 0.42)
--accent-faint: rgba(79, 191, 161, 0.10)
--secondary:    #6B5BBE   /* cool violet — work blocks için */
--secondary-2:  #4A4F9E
```

### Tipografi
- **Display (başlık)**: Fraunces (italic, premium editorial)
- **Body (gövde)**: Manrope
- **Mono (overlay)**: JetBrains Mono
- Hepsi Google Fonts üzerinden CDN

### Easing
`--easing: cubic-bezier(0.32, 0.72, 0, 1)` (Apple-vari)

---

## Motion stack

Vanilla HTML'de aktif:
- **Lenis** smooth scroll (CDN: lenis@1.1.13)
- **GSAP + ScrollTrigger** (hero parallax, manifesto scrub)
- **Custom Canvas particle field** (hero — 80 dot constellation, mouse repel)
- **Mouse-follow aura** (sayfa boyunca mint glow)
- **Hero blob mouse parallax** (mesh gradient cursor'a tepki)
- **3D tilt** (work cards perspective)
- **Word split + stagger** (manifesto + section title + CTA başlığı)
- **Spotlight** (service / work / work-thumb / terminal cursor takipli ışık)
- **Hero streaming typography** (LLM stream feel)
- **Agent terminal loop** (3 brief simülasyonu)
- **Marquee** (24 client logo akıyor)
- **Magnetic buttons → KALDIRILDI** (over-engineered, native cursor + scale+glow ile değiştirildi)

Faz 3'te (Next.js): Framer Motion + Lenis + GSAP stack'ine taşınacak.

---

## Site haritası (Faz 2'de tüm sayfalar üretilecek)

Minimalist 6 sayfa:
```
/                 Home — manifesto + agent demo + 3 hizmet + work teaser + lab teaser
/work             Work — filtreli case study grid (12 proje + AI/Web/Mobile filtreleri)
/work/[slug]      Case study — cinematic, scroll-driven
/studio           Studio — manifesto + ekip + servisler + süreç
/lab              Lab — AI deneyler, açık kaynak, blog notları
/contact          Contact — brief form (AI assisted)
```

Detaylı sayfa amaçları: `SITEMAP.md`

---

## Klasör yapısı

```
gavia-2026/
├── CLAUDE.md                ← bu dosya (proje hafızası)
├── README.md                ← brief + faz planı
├── SITEMAP.md               ← site haritası
├── prototypes/v1/
│   ├── index.html           ← AKTİF dosya, Beyar canlı feedback veriyor
│   └── assets/
│       ├── works/           ← 14 proje görseli (11 kapak + 3 alternate)
│       └── clients/         ← 24 client logosu (PNG/WebP)
├── moodboard/refs.md        ← referans linkler + design tokens
└── notes/decisions.md       ← karar logu (her büyük kararın gerekçesi)
```

---

## İterasyon geçmişi (Beyar feedback'leri özet)

**Tur 1 — İlk prototip**
- frontend-design skill ile koyu zemin + warm amber accent başlangıç
- Beyar: "gaviaworks renk paleti yok burada güncelle" → **palette pivot: navy + mint**

**Tur 2 — Görseller**
- Beyar: "görsel ekle, patron isteyecek"
- 3 öne çıkan iş için kapak görselleri indirildi (Icmas / Fresh / Gücümüz)

**Tur 3 — Motion**
- Beyar: "animasyon yok, mouse interaktif olacak"
- Lenis + GSAP + 10 motion pattern eklendi
- Custom cursor mouse'u kaybetti → kaldırıldı

**Tur 4 — Daha fazla görsel + client logoları**
- 8 ek proje kapağı indirildi (Aselsan / Antalya Bilim / High Tech Port / vs.)
- 24 client logosu indirildi
- Marquee'ye client logoları yedirildi
- Yatay galeri (work-strip) eklendi — 8 thumb sürüklenebilir

**Tur 5 — Header revize**
- Pill nav → çok yuvarlak → 14px keskin → Vercel split bar denendi
- Beyar: "Vercel split bar'daki Konuşalım butonu kötü, bir önceki güzeldi"
- **Karar: floating pill nav 14px radius** + Contact link + ⌘K — Konuşalım button YOK

**Tur 6 — Görsel zenginlik**
- Beyar: "sectionlar tek düze, gerçek site gibi durmuyor"
- Hero canvas particle field eklendi (constellation)
- Service cards 3 farklı banner (node graph / kod preview / phone+ripple)
- Tüm section'lara CSS animated bg pattern (dot grid / diagonal / matrix / mesh blob)
- Top-strip live ticker eklendi sonra Beyar istemedi → kaldırıldı

**Tur 7 — Logo görünmüyor + refactor**
- Client logoları siyah PNG'di → koyu zeminde kaybolmuştu
- **Fix: beyaz plate (180×72px)** — Apple/Stripe partner-grid pattern
- CSS cleanup: top-strip + service-glyph stilleri silindi
- Section padding 40px → 56px (1440px+ 80px)

**Tur 8 — Work card okunabilirlik (şu an)**
- Selected Work başlıkları görsel üstünde okunmuyordu
- Gradient overlay multi-stop (5-step), text-shadow eklendi
- Work-thumb plate'i kaldırıldı, daha şık gradient + text-shadow

---

## Aktif tasarım kararları (kalıcı)

| Bileşen | Karar |
|---|---|
| **Header** | Full-width top bar (footer hizalı), max-width 1280px inner container, 56px padding. Sol: logo · Orta: Work/Studio/Lab/Contact · Sağ: ⌘K. Transparent başta, scroll'da blur+navy bg. **Konuşalım butonu YOK**, **pill YOK**, **top-strip ticker YOK**. Klasik website standardı. |
| **Hero** | Canvas particle (80 dot constellation, mouse repel) + animasyonlu mesh gradient blobs + streaming başlık + sağ agent terminal loop |
| **Service cards** | Her birinde farklı banner: node graph (AI) / kod preview (Yazılım) / phone+ripple (Mobile) |
| **Manifesto** | Italic kelime stagger + arkada animasyonlu mesh blob |
| **Selected Work** | 3 büyük asimetrik kart (2/3 + 1/3 split) — Icmas Academy / Fresh Selective / Gücümüz Bir |
| **Work strip** | 8 thumb yatay galeri, drag-scroll + wheel-to-horizontal |
| **Clients marquee** | 24 logo, beyaz plate, hover'da scale + mint shadow |
| **Lab** | 2 kart: Prompt Studio + Agent Notes, mono feel |
| **CTA** | "Bir fikrin mi var?" ortalanmış, **yayma YOK** (best practice — premium hissi) |
| **Footer** | 4 sütun minimal, mono metadata |

---

## Skill kullanımı

**Anthropic resmi skill'lerden kullanılan:**
- ✅ `frontend-design` (claude-plugins-official) — ilk prototip için

**Önerilen ama henüz kurulmadı:**
- `nextlevelbuilder/ui-ux-pro-max-skill` (71K star, community) — Faz 2'de kurulabilir (50+ UI styles, 97 palette, 99 UX guidelines)
- `framer-motion-skill` — Faz 3'te (Next.js'e geçince)
- Refactor skill: Anthropic'te dedicated yok, manual cleanup yapılıyor

---

## Hard rules (asla değişmez)

1. **Türkçe içerik** + mono overlay'lerde İngilizce ("// brief", "v0.1") OK
2. **Renk paleti** Gavia logosundan — navy + mint, değiştirmek için Yasin Bey onayı şart
3. **3 hizmet** sıralaması: AI → Yazılım → Mobile (AI en öne)
4. **AI-native pozisyon** — "ajans" demek YASAK, "studio" / "biz AI'yı kullanmıyoruz, AI ile inşa ediyoruz"
5. **Custom cursor YOK** (mouse fix sonrası kalıcı)
6. **Magnetic buttons YOK** (Beyar saçma takip dedi, scale+glow ile değiştirildi)
7. **Top-strip ticker YOK** (Beyar istemedi)
8. **Konuşalım butonu header'da YOK** (sade nav kalır)
9. **CTA "Bir fikrin mi var?" yayma YOK** (best practice)
10. **Header yapısı**: floating pill YOK, Vercel-tarzı split YOK. **Full-width top bar + max-width 1280px inner container** (footer hizalı). Iterasyon 8'de bu karar kesinleşti. Tekrar pill'e dönmeyin.
11. **"Küçük ekip" / "küçük ama" gibi kıymetsizleştiren ifadelerden KAÇIN.** Beyar 2026-05-13: hero subhead'i "küçük ama keskin bir ekip" → "keskin bir ekip" yapıldı. Tone: özgüvenli, kalibreli, küçüklüğü vurgulama.

---

## Sıradaki adımlar

### Faz 1 kalanı (patron sunum öncesi)
- [ ] Beyar son iterasyon feedback'lerini bitirir
- [ ] Yasin Bey'e link veya screenshot gönderilir
- [ ] Onay alınır

### Faz 2 (onay sonrası, 1 hafta)
- [ ] Tüm 6 sayfanın static HTML'i çıkarılır (Work list + Work detail + Studio + Lab full + Contact)
- [ ] Design tokens finalize (Storybook tarzı dokümantasyon)
- [ ] UI/UX Pro Max skill kurulabilir
- [ ] Genel/atmosfer görselleri (AI generate veya stüdyo çekim — Yasin Bey kararı)
- [ ] Lab içeriği (Yasin Bey'le: gerçek AI deneyler mi, "yakında" mı?)

### Faz 3 (production, 2-3 hafta)
- [ ] Next.js 15 + React 19 + Tailwind v4 migration
- [ ] Framer Motion + Lenis + GSAP stack
- [ ] CMS karar (Sanity / Payload)
- [ ] ⌘K AI search functional (LLM call)
- [ ] Vercel deploy + domain swap

---

## Bilinen risk noktaları / uyarılar

- **Browser cache**: CSS sık değişiyor, Beyar her feedback turunda Cmd+Shift+R yapmalı
- **Preview tool path**: file:// protokolünde çalışıyor, relative path'ler doğru çözülüyor
- **AI işleri henüz portfolyoda yok** — Lab sayfası bu boşluğu doldurmalı, Yasin Bey ile konuşulacak
- **Logo dosyaları** mevcut gaviaworks.com paneli'nden çekildi, telif sorunu yok

---

## Beyar ile çalışma protokolü

- **Dil**: Türkçe samimi ton, "hacı" hitabı normaldir
- **Karar**: 2-3 alternatif + trade-off sun, Beyar seçer
- **Refresh hatırlat**: her CSS değişikliği sonrası Cmd+Shift+R
- **Otomatik commit YOK** — Beyar açıkça istemeden Git'e dokunma
- **Preview panel hook**: her Edit sonrası dosya canlı görünür, mention etmek zorunlu

---

## Sürekli güncellenecek

Bu CLAUDE.md her büyük iterasyon turundan sonra güncellenmeli. Beyar "şunu hatırla" derse buraya yaz. Context resetlense bile bu dosya okunduğunda **proje 0'dan açıklanmış** olmalı.
