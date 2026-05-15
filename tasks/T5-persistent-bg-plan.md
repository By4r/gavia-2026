# T5 — V2 Paralel: Persistent 5-Video Crossfade Background

> **V1 dokunulmaz.** V2 yeni dosyalar olarak paralel kurulur. Beyar
> tarayıcıda V1 ve V2'yi karşılaştırarak final kararı verir.

## Context

T4 sonrası Beyar feedback'i: hero sade, scroll-cue zayıf, sağdaki chapter video figure'lar gereksiz (çift-video hissi), CTA stili ana siteyle tutarsız.

V2 yaklaşım:
- Persistent 5-video crossfade (DOM overlay, scroll-driven opacity timeline)
- Chapter media figure **kaldırılır** → tek-kolon storytelling (fantasy.co pattern)
- Persistent scroll-rail (sağ, 32px, 6 segment, monospace chapter label)
- Accent migration `#2DD4BF` → `#3FD5AD` (Gavia mint, ana site tutarlılığı)
- CTA `.btn-primary` ana site Tailwind token'ları → "Projenizi Anlatalım →"

V1 olduğu gibi korunur — paralel iki demo, karar Beyar'ın.

---

## Dosya yapısı

```
prototypes-lab/
├── yapay-zeka.html               ← V1 (DOKUNMA)
├── yapay-zeka-v2.html            ← V2 (YENİ)
├── assets/
│   ├── css/
│   │   ├── yapay-zeka.css        ← V1 (DOKUNMA)
│   │   └── yapay-zeka-v2.css     ← V2 (YENİ)
│   ├── js/
│   │   ├── yapay-zeka-scroll.js  ← V1 (DOKUNMA)
│   │   ├── yapay-zeka-scroll-v2.js  ← V2 (YENİ)
│   │   └── yapay-zeka-scene.js   ← PAYLAŞIMLI (küçük patch)
│   └── video/
│       ├── yz-01-otomasyon.mp4   ← V1 (KORU)
│       ├── yz-02-aiagent.mp4     ← V1 (KORU)
│       ├── yz-03-veri.mp4        ← V1 (KORU)
│       ├── yz-04-etik.mp4        ← V1 (KORU)
│       ├── yz-05-cta.mp4         ← V1 (KORU)
│       ├── yz-bg-hero.mp4        ← V2 (YENİ — 14684159)
│       ├── yz-bg-flow.mp4        ← V2 (YENİ — 13820343)
│       └── yz-bg-network.mp4     ← V2 (YENİ — 13161043)
```

### Adlandırma notu — fiziksel 3 dosya, mantıksal 6 slot

Beyar brief'inde "yz-bg-00.mp4 … yz-bg-05.mp4" geçiyor (6 hedef). Plan B-Code 3 unique source. **Çözüm**: 3 fiziksel dosya, V2 HTML'de 5 `<video>` tag'i ama `src` reuse:

| Stage | `<video data-stage>` | `src` |
|---|---|---|
| 00 Hero | `00` | `yz-bg-hero.mp4` |
| 01 Otomasyon | `01` | `yz-bg-flow.mp4` |
| 02 AI Agent | `02` | `yz-bg-network.mp4` |
| 03 Veri & Belge | `03` | `yz-bg-flow.mp4` (reuse) |
| 04 Etik & KVKK | `04` | `yz-bg-hero.mp4` (reuse) |
| 05 CTA | `05` | `yz-bg-hero.mp4` (reuse) |

Browser HTTP cache reuse'i hallediyor — tek download. 3 dosya × ~7MB ≈ **22MB** toplam video weight.

---

## V1 dokunulmaz tablosu

| Dosya | Durum |
|---|---|
| `yapay-zeka.html` | ✅ Korunur |
| `assets/css/yapay-zeka.css` | ✅ Korunur |
| `assets/js/yapay-zeka-scroll.js` | ✅ Korunur |
| `assets/video/yz-01-otomasyon.mp4` … `yz-05-cta.mp4` | ✅ Korunur (V1 chapter figure'ları) |
| `assets/js/yapay-zeka-scene.js` | ⚠️ **Küçük patch** (V1+V2 paylaşımı için CSS-var renk okur) |

---

## V2 yeni dosya görevleri

### A. `yapay-zeka-v2.html` (yeni)

V1'den **kopyala**, sonra:

1. `<head>` içinde `<link rel="stylesheet" href="assets/css/yapay-zeka-v2.css">` (v1.css değil)
2. `<body>` en üstüne **`.site-background`** ekle:
   ```html
   <div class="site-background" aria-hidden="true">
     <video class="site-bg__video is-active" data-stage="00" src="assets/video/yz-bg-hero.mp4"    autoplay loop muted playsinline preload="auto"></video>
     <video class="site-bg__video"           data-stage="01" src="assets/video/yz-bg-flow.mp4"           loop muted playsinline preload="metadata"></video>
     <video class="site-bg__video"           data-stage="02" src="assets/video/yz-bg-network.mp4"        loop muted playsinline preload="metadata"></video>
     <video class="site-bg__video"           data-stage="03" src="assets/video/yz-bg-flow.mp4"           loop muted playsinline preload="metadata"></video>
     <video class="site-bg__video"           data-stage="04" src="assets/video/yz-bg-hero.mp4"           loop muted playsinline preload="metadata"></video>
     <video class="site-bg__video"           data-stage="05" src="assets/video/yz-bg-hero.mp4"           loop muted playsinline preload="metadata"></video>
     <div class="site-background__overlay"></div>
   </div>
   ```
3. Hero: H1 sol-merkez 720px (`shell` içinde `text-align: left`, `max-width: 720px`)
4. **Chapter `<figure class="chapter__visual">…</figure>` blokları SİL** (5 yerden). Chapter-grid 1-kolon olacak.
5. Eski `.scroll-cue` (hero sağ-alt) SİL
6. Sağ persistent `.scroll-rail` ekle (fixed UI):
   ```html
   <aside class="scroll-rail" aria-hidden="true">
     <div class="scroll-rail__label">//00 YAPAY ZEKA</div>
     <ol class="scroll-rail__segments">
       <li data-stage="00"></li><li data-stage="01"></li>
       <li data-stage="02"></li><li data-stage="03"></li>
       <li data-stage="04"></li><li data-stage="05"></li>
     </ol>
     <div class="scroll-rail__cue">SCROLL</div>
   </aside>
   ```
7. CTA chapter (`//05`):
   ```html
   <a href="iletisim.html" class="btn-primary">
     Projenizi Anlatalım
     <svg class="btn-primary__icon" width="14" height="14" …>…</svg>
   </a>
   ```
   Eski `.cta-link` SİL.
8. `<html>` root attr veya `<body data-yz-version="v2">` ekle → scene.js bayrak okur.
9. Script src güncelle: `assets/js/yapay-zeka-scroll-v2.js` (v1 değil)
10. `assets/js/yapay-zeka-scene.js` zaten ortak — değişmez.

### B. `yapay-zeka-v2.css` (yeni)

V1'den **kopyala**, sonra:

1. `:root` Gavia token'ları ekle (ana site tutarlı):
   ```css
   :root {
     --gavia-mint: #3FD5AD;
     --gavia-mint-bright: #4FE5BD;
     --gavia-mint-glow: rgba(63,213,173,0.12);
     --gavia-deep: #020837;
     --gavia-night: #141533;
     --gavia-dark: #0A0E27;
     --gavia-light: #E9EEF1;
     --gavia-muted: #6B7280;

     --accent: var(--gavia-mint);      /* lab tek-accent migrasyonu */
     --scene-accent: #3FD5AD;          /* scene.js CSS var ile okur */
   }
   ```
2. Mevcut tüm `#2DD4BF`, `rgba(45, 212, 191, …)` referanslarını `var(--accent)` / `var(--gavia-mint-glow)` token'larına migrate et (grep+replace)
3. **`.site-background`** + **`.site-bg__video`** + overlay (T5 plan §1)
4. **`.scroll-rail`** + segments + label + cue (sağ 32px, fixed)
5. **`.btn-primary`** (rounded-lg 8px, padding 16×28, mint bg, deep text, hover mint-bright)
6. **`.chapter-grid`** tek kolon 720px sol-merkez, alternating direction kaldır
7. **`.chapter__visual`** ve `.chapter__media`'nın grid-bazlı stilleri kaldırılır/temizlenir
8. Eski `.scroll-cue`, `.cta-link` blokları temizlenir

### C. `yapay-zeka-scroll-v2.js` (yeni)

V1'den **kopyala**, sonra:

1. **Video figure parallax bloğunu KALDIR** (artık figure yok)
2. **Chapter video play/pause IntersectionObserver** — figure video yok, KALDIR
3. **5-video crossfade ekle** — yeni fonksiyon:
   ```js
   const bgVideos = Array.from(document.querySelectorAll('.site-bg__video'));
   const bgByStage = Object.fromEntries(bgVideos.map(v => [v.dataset.stage, v]));
   let activeBgStage = '00';
   function activateBg(stage) {
     if (stage === activeBgStage) return;
     const next = bgByStage[stage], prev = bgByStage[activeBgStage];
     if (!next) return;
     next.load?.(); // lazy bootstrap
     next.play?.().catch(()=>{});
     gsap.to(next, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });
     if (prev) gsap.to(prev, { autoAlpha: 0, duration: 0.6, ease: 'power2.out',
                              onComplete: () => prev.pause?.() });
     next.classList.add('is-active'); prev?.classList.remove('is-active');
     activeBgStage = stage;
   }
   ```
4. Her chapter ScrollTrigger `onEnter` / `onEnterBack` → `activateBg(stage)`
5. **Scroll-rail wiring**:
   - Label swap (chapter onEnter `railLabel.textContent = RAIL_LABELS[stage]`)
   - Segment `--seg-progress` set (geçilen seg = 1, aktif seg scroll progress)
6. Eski `.scroll-cue --cue-progress` driver KALDIR (scroll-cue silindi)
7. Pin +=100% korunur, text stagger reveal korunur, Lenis wheelMultiplier 0.9 korunur

### D. `yapay-zeka-scene.js` paylaşımlı patch

V1+V2 ikisi de aynı dosyayı kullanır. Renk farkı için **CSS-var bridge**:

Mevcut:
```js
const COLOR_PRIMARY = new THREE.Color(0x2DD4BF);
const COLOR_SECONDARY = new THREE.Color(0x0F766E);
```

Yeni:
```js
function readAccent() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--scene-accent').trim();
  return v ? new THREE.Color(v) : new THREE.Color(0x2DD4BF);
}
const COLOR_PRIMARY = readAccent();
// secondary darker tone derived from primary
const COLOR_SECONDARY = COLOR_PRIMARY.clone().multiplyScalar(0.45);
```

- V1 CSS'te `--scene-accent` yok → fallback `#2DD4BF` ✅
- V2 CSS'te `:root { --scene-accent: #3FD5AD; }` → mint ✅
- Backward compatible, V1 davranışı **değişmez**

Aşamalar (STAGE_TABLE T4'te size param eklenmişti) korunur.

---

## Transcode komutları (ffmpeg ✅ yüklü, Plan B-Code)

```bash
ffmpeg -i ~/Downloads/14684159_3840_2160_30fps.mp4 \
  -vf scale=1920:1080 -c:v libx264 -crf 26 -preset medium -an -movflags +faststart \
  prototypes-lab/assets/video/yz-bg-hero.mp4

ffmpeg -i ~/Downloads/13820343_3840_2160_30fps.mp4 \
  -vf scale=1920:1080 -c:v libx264 -crf 26 -preset medium -an -movflags +faststart \
  prototypes-lab/assets/video/yz-bg-flow.mp4

ffmpeg -i ~/Downloads/13161043_3840_2160_30fps.mp4 \
  -vf scale=1920:1080 -c:v libx264 -crf 26 -preset medium -an -movflags +faststart \
  prototypes-lab/assets/video/yz-bg-network.mp4
```

Beklenen: 3 × ~7MB ≈ 22MB toplam. Süre: ~30-60s per video.

---

## Implement Sırası

1. **3 video transcode** (yukarıdaki ffmpeg komutları, parallel veya seri)
2. `yapay-zeka-v2.html` yarat (V1 kopyala + refactor §A)
3. `yapay-zeka-v2.css` yarat (V1 kopyala + refactor §B)
4. `yapay-zeka-scroll-v2.js` yarat (V1 kopyala + refactor §C)
5. `yapay-zeka-scene.js` küçük patch — CSS var bridge (§D)
6. **V1 smoke test**: `http://127.0.0.1:8765/yapay-zeka.html` — hâlâ T4 davranışı, scene cyan, hiçbir şey kırılmadı
7. **V2 test**: `http://127.0.0.1:8765/yapay-zeka-v2.html` — persistent video crossfade, scroll-rail, mint accent
8. Beyar karşılaştırması → karar
9. Beyar onayıyla **manuel commit** (otomatik yok)

Tahmini süre: **60-80 dk** (transcode + refactor + test).

---

## Risk Listesi

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| scene.js paylaşımı V1/V2 farklı renk istek | – | Orta | CSS var `--scene-accent` bridge; V1 fallback #2DD4BF, V2 #3FD5AD ✓ |
| V1'in hâlâ çalıştığından emin olamamak | Orta | Yüksek | V1 dosyalarına dokunmak yasak; commit öncesi V1 smoke test ZORUNLU |
| 5 video DOM'da, mobile 4G ağır | Yüksek | Yüksek | `<768px` → tek video (yz-bg-hero), preload=metadata, diğerleri `display:none` |
| iOS Safari 5 autoplay video reject | Orta | Orta | Sadece active video autoplay; diğerleri user-scroll trigger play |
| Crossfade overlap'inde 2 video render → GPU spike | Orta | Orta | 600ms overlap kabul edilebilir; non-active pause |
| Lazy `v.load()` 0.5s öncesinden çağrılmazsa kara frame | Orta | Orta | ScrollTrigger `start: 'top 70%'` preload tetikler |
| Scroll-rail mobile'da yer kaplar | Orta | Düşük | `<768px` `display: none` |
| Lab `#2DD4BF` referansları eksik kalır (V2 grep migrasyon) | Orta | Orta | Migrasyon sadece v2.css'te; v1.css dokunulmaz, grep kapsamı dar |
| V2 scroll-rail label "//02 AI AGENT" özel karakter (//) escape | Düşük | Düşük | textContent set'i ham string OK |
| Browser cache karışıklığı (V1↔V2 aynı tab) | Düşük | Orta | Beyar farklı tab'larda aç; hard refresh hatırlat |

---

## Açık Sorular

1. **Mobile (<768px) bg davranışı**: tek video (yz-bg-hero) mı, hiç video yok (static gradient) mı? Önerim: tek video (deneyim korunur).
2. **Crossfade `start: 'top 70%'` offset**: 70% (önerim) mi, 50% (geç değişim) mi?
3. **Beyar karşılaştırma sonrası**: V1 silinecek mi yoksa demo olarak kalacak mı (git history zaten var)?

---

## Verification (V1 dokunulmadığını doğrulamak için)

- `http://127.0.0.1:8765/yapay-zeka.html`:
  - Hero scroll-cue (sağ-alt) çalışıyor mu, cyan `#2DD4BF` accent görünüyor mu
  - Chapter video figure'ları sağda görünüyor mu
  - Text stagger reveal pin'de çalışıyor mu
  - Three.js scene cyan tonunda mı (`--scene-accent` yok → fallback)
- `http://127.0.0.1:8765/yapay-zeka-v2.html`:
  - Persistent video arka planda
  - Sağda scroll-rail, "//00 YAPAY ZEKA" label
  - Chapter'a girince video crossfade smooth (0.5s)
  - Three.js scene mint tonunda
  - CTA mint buton + "Projenizi Anlatalım →"
- DevTools console: hiç hata yok
- Network: ilk yükleme V2 ~22MB video + ~200KB JS/CSS
