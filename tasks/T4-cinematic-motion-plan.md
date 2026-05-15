# T4 — Cinematic Motion Intensify

> Hedef: %85–90 fantasy.co yakınlığı. T3'teki "düz akan kitap" hissini
> kıracak 6 katman motion choreography.

## Derin Playwright probe — fantasy.co gerçek davranışı (KESİN KANIT)

### Video davranışı (scroll-bound mu?)

Test: video[3] (7.57s), scrollY=1808'de currentTime=1.0 → 800ms bekle (scroll aynı) → 1.76 (Δ 0.76). Sonra scrollY=1608'e GERİ git → currentTime 1.81 (DAHA YÜKSEK, geri sarmadı).

**Sonuç: `AUTO_PLAY_FORWARD_ONLY`** — video.currentTime scroll'a bağlı DEĞİL. Video kendi 1× playback rate'iyle normal akıyor. fantasy.co intersection-observer ile `play()` tetikliyor, sonra loop'ta sürekli oynuyor.

**Beyar varsayımı yanlış**: scroll-linked video playback fantasy.co'da yok.

### Parent wrapper scroll-bound translate (asıl cinematic kaynağı)

scrollY = 608 → parent.transform: `matrix(1,0,0,1, -334.5, -198)` (sabit, pin başlamadı)
scrollY = 1408 → `matrix(1,0,0,1, -320.9, -190)`
scrollY = 2208 → `matrix(1,0,0,1, -95.7, -56.6)`

Pin sırasında **video parent'ı 240px y + 240px x kayıyor** — scroll-driven parallax/center-correction. Bu cinematic hissin %50'si.

### Motion library

`<html class="lenis">` — **Lenis smooth scroll var**. GSAP/Three.js/Framer window-expose YOK (custom mini lib veya modül-scope).

### Storytelling pattern

```
section.storytelling (1816px outer — 2 viewport+)
  ├─ h2.storytelling__title (88px — section başı title)
  └─ div.storytelling__sticky.mt-90 (792px — 1 viewport sticky inner)
        └─ div.storytelling__flip (472px — flip/step container)
```

**Insight**: outer 2× viewport, içeride sticky inner 1×. Yani pin uzunluğu **~+=100%-120%**, T3'te biz +=80% kullandık. Bu uzun pin → multiple step reveal için yer.

### Tipografi (1440 viewport)

| Element | family | size | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| h1 | sans | **70px** | 400 | 70px (1.0) | **-2.1px** |
| h2 | sans | **90px** | 400 | 90px (1.0) | **-2.7px** |

Çok büyük, çok dar tracking. Bizdeki H1 clamp(56,8vw,112) — 1440'ta ~112, fantasy.co'dan büyük. **Küçültmeli**.

### Renk

`--theme-background: #000000` — fantasy.co **pure black**. Bizdeki `#0A0F1C` (lacivert-siyah). Marka farkı, bizimki kalsın.

### Sound / WebGL

- `audio` element **YOK**, `canvas` **YOK** — sound toggle muhtemelen `video.muted` control (zaten muted). Three.js YOK — bizim ek artımız.
- Sound on/off muhtemelen UI gösterici, gerçek audio asset yok.

### Özet — gerçek formül

| Katman | fantasy.co | Bizde T3 | Aksiyon T4 |
|---|---|---|---|
| Lenis smooth scroll | ✅ | ✅ | korunur |
| Sticky pin ~100vh | ✅ | ✅ | korunur |
| **Pin uzunluğu** | +=100–120% | +=80% | **+=100% yap** |
| Video autoplay loop | autoplay false + IO play | autoplay true | nötr — fark yaratmıyor |
| **Video.currentTime scroll-bound** | ❌ | ❌ | **scrub-bound YAPMA** (fantasy.co da yapmıyor, iOS jank riski) |
| **Video parent translate parallax** | ✅ agresif (240px x+y) | ✅ hafif (yPercent 6) | **agresifleştir** |
| Text reveal stagger pin progress | ✅ var | ❌ tek seferlik fade-up | **EKLE** — en kritik fark |
| WebGL scene reaktif | ❌ yok | ✅ bizde var | **agresifleştir** — bizim avantajımız |
| H1/H2 tracking dar | -2.1/-2.7px | 0.02em (-1.4px) | **daha sıkı tracking** |
| Sound toggle audio asset | yok | yok (UI only) | mevcut bırak |

## Beyar brief vs. fantasy.co — fark

| Brief katman | Beyar istek | fantasy.co davranış | Karar |
|---|---|---|---|
| 1. Video scroll-linked playback | currentTime = scroll progress | Sadece loop play() | **Beyar istek uygulanır** — daha agresif/zaman makinesi hissi. Risk yazılır. |
| 2. Text stage reveal | 01→02→03→04 sırayla scrub fade | Var, fantasy.co da yapıyor | ✅ Uygula |
| 3. Video figure parallax + scale | scale 0.92→1→1.05, opacity | Var | ✅ Uygula |
| 4. Three.js scene reaktif | her chapter farklı renk/yoğunluk | Yok (onlar video ağırlıklı) | ✅ Uygula — bizim ek artımız |
| 5. Hero scroll cue progress | "Scroll to discover" + progress bar | Var (basit fade) | ✅ Uygula |
| 6. Chapter transition polish | 100vh boşluk yok, akıcı geçiş | Var, en kritik nokta | ✅ Uygula |

## Önerilen 6 katman implementasyon

### Katman 1 — Video davranışı (revize: scrub-bound DEĞİL)

**Playwright kanıtı**: fantasy.co video scroll-bound değil. Brief'teki "zaman makinesi" hissi aslında fantasy.co'nun **parent translate parallax + text stagger reveal** kombinasyonundan geliyor.

**Yeni öneri**:
- Video tag'leri mevcut autoplay loop muted playsinline kalsın (T3 davranışı)
- IntersectionObserver play/pause T3'te zaten var, korunur
- "Cinematic zaman" hissi **Katman 2 (text stagger) + Katman 3 (agresif parent translate parallax)** ile gelecek — daha akıcı ve iOS uyumlu
- Beyar yine de scrub-bound isterse hibrit (Ch01-02 scrub, Ch03-05 loop) opsiyonel kalır

Beyar onay: **scrub-bound bırakıp (fantasy.co da yapmıyor), text+parallax'a yatırım yapalım mı?** Önerim: **EVET, yatırım text+parallax**.

### Katman 2 — Text stage reveal

- `.chapter__media ul li` ve trailing `details.more` öğeleri scroll progress'e bağlı:
  - 0.00–0.20 → label + h2 + lead
  - 0.20–0.40 → li[01]
  - 0.40–0.55 → li[02]
  - 0.55–0.70 → li[03]
  - 0.70–0.85 → li[04]
  - 0.85–1.00 → details.more / cta-link
- GSAP timeline ile chapter scrub'a bağlı. Stagger 0.6s ease.out.
- Mobile: stagger kapalı (hepsi statik görünür).

### Katman 3 — Video figure parallax + scale

- T3'teki light parallax (yPercent +6 → -6, scale 1.04 → 1) güçlendirilir:
  - Pin start: `scale: 0.92, opacity: 0.7, yPercent: 8`
  - Pin mid (0.5): `scale: 1.0, opacity: 1.0, yPercent: 0`
  - Pin end: `scale: 1.05, opacity: 0.9, yPercent: -8`
- `will-change: transform, opacity`
- Border-radius subtle pulse opsiyonel (kapalı, gerekirse açılır)

### Katman 4 — Three.js scene reaktif

- Mevcut `window.__yzScene.setStage(stage, progress)` API'sini genişlet:
  - Renk paleti per chapter (tek accent yerine farklı tonlar):
    - 01 Otomasyon → cyan `#2DD4BF` (mevcut, slow flow)
    - 02 AI Agent → blue+purple `#7DD3FC` + `#A78BFA`
    - 03 Veri → green tint `#86EFAC`
    - 04 Etik → amber/red `#FCA5A5`
    - 05 CTA → warm `#FCD34D` glow
  - Particle density, rotation speed per stage farklı
  - Scene opacity'i chapter ortasında 0.25, geçişlerde 0.6 (mevcut `body.in-chapter 0.22` → dinamik scrub)
  - Camera y rotation: çok hafif sin wave (~0.05 rad)
- scene.js patch — STAGE_TABLE genişle, mevcut lerp loop'a renk geçişi ekle (THREE.Color.lerp)

### Katman 5 — Hero scroll cue interaktif

- Mevcut `.scroll-cue` HTML'ine progress bar ekle (sağ alt vertical line)
- Hero ScrollTrigger onUpdate ile `--cue-progress` CSS var → height 0% → 100%
- Hero scroll past → cue fade-out (T3'te yok, ekle)

### Katman 6 — Chapter transition polish

- Pin biter bitmez sonraki chapter'ın fade-up'ı tetiklenir (overlap)
- `.chapter__fade` exit T3'te 0.3 opacity'ye iniyor — bunu sonraki chapter'ın enter'ıyla cross-fade yap
- ScrollTrigger `end` değerini `+=100%` ile dene (T3'te `+=80%` idi)
- Chapter aralarındaki spacer min-height (0) — ardışık pin'ler arasında boşluk olmasın

## Implement sırası

1. Katman 4 (scene.js setStage genişlet) — bağımsız iş, en kolay
2. Katman 3 (video parallax güçlendir) + Katman 6 (transition cross-fade) — scroll.js içinde
3. Katman 2 (text stage reveal) — scroll.js + minimal HTML tweak
4. Katman 1 (video scrub) — son, en riskli; Beyar seçimine göre A/B/C
5. Katman 5 (hero scroll cue progress) — CSS + scroll.js küçük

Implement süresi: ~45–60 dk lead solo (3 teammate'e gerek yok, tek dosya iş).

## Bilinen sınırlar / riskler

| Risk | Mitigation |
|---|---|
| iOS Safari `video.currentTime` her-frame jank | Hibrit (Mitigation A): scrub-bound sadece Ch01-02 |
| Page weight 50MB — mobile slow 4G ağır | Lazy load `preload="metadata"`, video'lar zaten optimize |
| GSAP timeline scrub stutter | `scrub: 0.5` (smoothing), `gsap.ticker.lagSmoothing(0)` zaten var |
| Scene renk değişimi flicker | THREE.Color.lerp + her stage 200ms smooth transition |
| Text stage reveal mobile'da kötü görünür | Mobile bypass — hepsi statik visible |
| Chapter transition cross-fade pin overlap | ScrollTrigger `pinSpacing: true` (default), test edip ayarla |

## Dosyalar

| Dosya | Değişiklik |
|---|---|
| `prototypes-lab/yapay-zeka.html` | Video tag'lerinden autoplay kaldır (Ch01-02); hero cue HTML'i revize |
| `prototypes-lab/assets/css/yapay-zeka.css` | Hero cue progress bar, video figure will-change, minor |
| `prototypes-lab/assets/js/yapay-zeka-scroll.js` | Text stage reveal, scrub video, transition cross-fade, hero cue progress |
| `prototypes-lab/assets/js/yapay-zeka-scene.js` | STAGE_TABLE renk paleti genişle, color lerp |

## Onay bekleyen 3 soru (revize — derin probe sonrası)

1. **Video scrub**: Playwright kanıtı fantasy.co'nun scroll-bound video yapmadığını gösteriyor. Bırakalım mı (önerim **EVET**), yoksa Beyar yine de scrub-bound deneyip görmek mi ister? (iOS jank riski)
2. **Scene renk paleti**: 5 farklı renk (cyan/blue/green/amber/warm) — brand tutarlılığı zayıflar ama dramatik. Yoksa cyan tek renk kalıp yoğunluk/rotation/opacity değişsin mi? Önerim: **cyan tek renk + yoğunluk/rotation/camera** (brand tutarlı).
3. **Pin uzunluğu**: T3 +=80% → T4 **+=100%** (fantasy.co storytelling pattern'i 2× viewport outer ile yapıyor, text stagger için zaman gerek).

## Bonus optimizasyon (ek)

- H1 ve H2 tracking'i fantasy.co değerlerine yaklaştır: `letter-spacing: -0.035em` (90px h2'de ≈ -3.15px, biraz scale alır)
- H1 cap: `clamp(48px, 7vw, 96px)` (mevcut 112px'den küçült)
- Lenis `wheelMultiplier: 0.9` (biraz yavaşlat, cinematic için)
