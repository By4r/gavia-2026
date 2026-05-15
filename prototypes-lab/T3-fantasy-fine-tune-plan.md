# T3 — fantasy.co Fine-Tune + GSAP Scroll Choreography

> Hedef: prototypes-lab/yapay-zeka.html için fantasy.co kalitesinde cinematic
> scroll deneyimi. **%75–85 yakınlık** gerçekçi hedef. Telif riski sıfır:
> pattern alıyoruz, kod yeniden yazılıyor.

## Context

T1 (skeleton) ve T2 (Three.js particle scene) commit'li (`148eb89`, `5c10d25`).
Bu turda sayfa tipografi/spacing/scroll davranışı bakımından fantasy.co
ritmine çekilecek; Three.js scene scroll'a bağlanacak. Üç teammate paralel
çalışacak, domain separation katı — aynı dosyaya iki teammate yazmaz.

---

## 1. fantasy.co Karakter Özeti (referans patterns)

WebFetch ile site sığ döndü (JS-rendered). Brief + sektör pattern'i + skill
bilgisi ile sentezlenen karakter:

| Boyut | Pattern |
|---|---|
| Section düzeni | Hero + 4–5 numbered chapter + CTA; her chapter sticky-pinned, 100vh |
| Numaralandırma | Monospace `//01`, `//02` üst label, neon vurgulu, küçük (12–13px), uppercase |
| Başlık tipografisi | Modern grotesque (Inter / Söhne benzeri), 56–96px desktop, dar tracking, italic vurgu kelime (`<em>`) |
| Body | 18–20px, generous line-height (1.5–1.6), düşük opacity (0.75) ikincil metin |
| Renk | Koyu zemin (`#0A0F1C` ≈ `#0B0B0F`), tek accent (bizde `#2DD4BF` cyan), body text `#E5E7EB` |
| Sticky ritim | Section pinned ~80–120vh scroll, içerik fade-up + translateY, ardından unpin |
| Sound toggle | Sağ üst sabit, dot animasyonlu, "Sound on/off" label |
| Scroll cue | Hero alt sağ, vertical line + animated arrow, "Scroll to discover" |
| Read more | Inline `<details>`/expand, `+` ikonu açıkken `–`, height auto-animate |
| Video kullanımı | Section background loop (sessiz, autoplay, muted, playsinline), Mux. **Bizde:** Three.js scene zaten background — section-specific video İLAVE ETMİYORUZ (yetişmez). Yerine: scene parametreleri her section'da değişir. |
| Sayfa sonu | CTA monolitik, büyük başlık + link |

**Kopyalamıyoruz**: yalnızca yapı, ritim, tipografik hiyerarşi alınıyor.
Renk Gavia, içerik Türkçe, copy bağımsız.

---

## 2. Mevcut Durum (dokunulacak/dokunulmayacak)

| Dosya | T3'te |
|---|---|
| `yapay-zeka.html` | **ÜZERINE YAZILIR** — sticky wrapper, anchor data-attr, expand UI, microcopy. Three.js script tag KORUNUR. |
| `assets/css/yapay-zeka.css` | **ÜZERINE YAZILIR** — tipografi ölçek revizesi, sticky behavior, vurgu/italic, transition'lar |
| `assets/js/yapay-zeka-scene.js` | **DOKUNULMAZ** — sadece dışarıdan parametre okuyabilecek şekilde `window.__yzScene` köprüsü EKLENEBİLİR (küçük patch); scene mantığı sıfırlanmaz |
| `assets/js/yapay-zeka-scroll.js` | **YENİ DOSYA** — Lenis + GSAP ScrollTrigger |
| `prototypes/**` | **YASAK** — Tab 1 paralel çalışıyor |

`yapay-zeka-scene.js`'in scroll köprüsü: scene tarafında küçük public API
(örn `window.__yzScene = { setStage(t, params) }`) eklenir. Bu küçük patch
**scroll-motion** teammate'ine ait — scene'i yeniden yazmaz, sadece hook
açar. (UI-lead ve html-structure bu dosyaya dokunmaz.)

---

## 3. Teammate Görev Tablosu (domain separation)

| Teammate | YAZAR (write) | OKUR (read) | Skill | Çıktı kriteri |
|---|---|---|---|---|
| **ui-lead** | `assets/css/yapay-zeka.css` | yapay-zeka.html, _session-handoff.md | frontend-design + web-replicator | Tipografi ölçeği fantasy.co ritmine yakın; italic em vurgusu belirgin; monospace label cyan tint; sticky için `position:sticky` veya pinned `.section--pinned` class hazır; reduced-motion fallback class |
| **html-structure** | `yapay-zeka.html` | css/yapay-zeka.css (sadece class isimleri), _session-handoff.md | frontend-design + web-replicator | 5 chapter sticky wrapper'a sarılı (`section.chapter[data-stage="01"]`), her chapter sticky inner + spacer pattern; sound toggle UI revize; her chapter'da "Read more" `<details>`; hero scroll cue refined; copy mevcut Türkçe placeholder korunur, micro-revize OK |
| **scroll-motion** | `assets/js/yapay-zeka-scroll.js` (yeni) + scene.js'e küçük public API patch | scene.js, html, css | frontend-design | Lenis init, GSAP ScrollTrigger her chapter için pin + progress; `window.__yzScene.setStage(stage, progress)` çağrısı; reduced-motion bypass; iOS Safari için `wheelMultiplier` tweak |

### 3a. ui-lead detay görev

- Tipografi token'ları:
  - H1 hero: `clamp(56px, 8vw, 112px)`, line-height 0.95, tracking `-0.02em`
  - H2 chapter: `clamp(40px, 5.5vw, 72px)`, italic kelime için `em { font-style: italic; color: var(--accent); }`
  - Label: `JetBrains Mono`, 12px, uppercase, letter-spacing `0.12em`, accent rengi
  - Body lead: 18–20px, line-height 1.55, opacity 0.78
- Spacing:
  - Section min-height 100vh, içerik dikey ortalı
  - Shell max-width 1200px, gutter `clamp(20px, 4vw, 64px)`
- Sticky / pinned destek class'ları:
  - `.chapter` (outer, height auto), `.chapter__pin` (inner, `position: sticky; top: 0; height: 100vh`), `.chapter__fade` (opacity/translateY için GSAP target)
- Sound toggle revize: dot pulse, hover ring; sound on'da dot solid, off'da outline
- Read more details: `summary` özel `+` / `–` ikonu CSS ile, `details[open]` smooth (en azından height transition feel'i)
- Scroll cue: vertical line draw + arrow bounce (CSS only; GSAP'la sync gerekmez)
- A11y: `prefers-reduced-motion: reduce` → sticky → static normal flow; transition disable
- **Çıktı doğrulama**: tek başına HTML yenilense bile (JS olmadan) tipografi/spacing fantasy.co ritmi hissetsin

### 3b. html-structure detay görev

- Yapı revizyonu (her chapter):
  ```
  <section class="chapter" data-stage="01" id="section-01">
    <div class="chapter__pin">
      <div class="shell chapter__fade">
        <div class="label">//01 Otomasyon</div>
        <h2>...<em>...</em></h2>
        <p class="lead">...</p>
        <details class="more">
          <summary>Read more</summary>
          ...
        </details>
      </div>
    </div>
  </section>
  ```
- 5 chapter (01 Otomasyon / 02 AI Agent / 03 Veri & Belge / 04 Etik & KVKK / + 1 ek opsiyonel **veya** mevcut 4'le kal)
- Hero: scroll cue refined, sound toggle yerinde
- CTA `//05 Konuşalım`: tek satır iri başlık + link
- Footer: mevcut minimal hali korunur
- **Three.js script tag KORUNUR** (`<script type="module" src="assets/js/yapay-zeka-scene.js">`)
- Yeni script eklenir (defer): `assets/js/yapay-zeka-scroll.js` (Lenis + GSAP)
- CDN ekle: GSAP 3.12 + ScrollTrigger, Lenis 1.0.x (mevcut handoff'taki URL'ler)
- Copy: mevcut Türkçe placeholder korunur, micro-edit OK; "Read more" içeriğine 2–3 cümle Türkçe placeholder
- **Çıktı doğrulama**: scroll-motion JS yüklenmese bile sayfa scroll edilebilir, içerik okunabilir (graceful)

### 3c. scroll-motion detay görev

- `assets/js/yapay-zeka-scroll.js` (yeni):
  - Lenis init, `lerp: 0.1`, smooth: true; iOS Safari `syncTouch: true` (yeni Lenis API; yoksa touchMultiplier düşür)
  - GSAP `gsap.ticker.lagSmoothing(0)` + Lenis raf wiring
  - `ScrollTrigger.scrollerProxy` Lenis pattern
  - Her `.chapter` için trigger: pin `.chapter__pin`, start `top top`, end `+=80%`, scrub
  - `.chapter__fade` opacity/y from `{opacity:0, y:40}` to `{opacity:1, y:0}` chapter start'ta; chapter sonunda opacity 0.3'e dön
  - Scene köprüsü: `window.__yzScene?.setStage(stage, progress)` her ScrollTrigger update'inde
  - `prefers-reduced-motion` → tüm GSAP timeline'ları skip, Lenis disable
- `assets/js/yapay-zeka-scene.js`'e küçük patch (yalnızca scroll-motion teammate dokunabilir):
  - Mevcut scene state'i bozulmaz; sadece public API expose:
  ```js
  window.__yzScene = {
    setStage(stage, progress) { /* stage'e göre rotation speed / camera z / opacity lerp */ }
  };
  ```
  - Stage parametreleri rebuild-plan tablosundan (`hero z=8 → 01 z=6 → 02 orbit y=30 → 03 z=4 → 04 z=10 → cta z=14`)
- **Çıktı doğrulama**:
  - Desktop Chrome scroll boyunca chapter'lar pin'leniyor
  - 3D scene scroll'a tepki veriyor (kamera, rotation, opacity)
  - Mobile iOS Safari'da scroll jank yok (en azından kabul edilebilir)
  - Reduced-motion açıkken sayfa düz scroll, scene static

---

## 4. Implement Sırası & Senkron

Lead delegate mode, kendi kod yazmaz. Sıra:

1. **ui-lead** → CSS güncellemesini bitirir, mailbox'tan lead'e haber verir.
2. **html-structure** → ui-lead'in class isimlerine uyarak HTML yapısını
   revize eder. (CSS yoksa görsel hizalanmaz; bu yüzden CSS önce.)
3. **scroll-motion** → HTML'deki `.chapter` / `.chapter__pin` /
   `.chapter__fade` / `data-stage` üzerine GSAP'ı bağlar; scene.js patch'ini
   yapar.
4. Lead, üçü de bitince Beyar'a tek özet + tarayıcı doğrulama checklist'i sunar.

İlk tur paralel mi seri mi? **Seri** öneriyorum (3 → 1 → 1 sırada bağımlılık
var). Toplam süre: ~25–40 dk üç teammate boyunca, lead idle.

---

## 5. Verification (Beyar tarayıcıda doğrulayacak)

- `open prototypes-lab/yapay-zeka.html`
- Desktop:
  - [ ] Hero h1 büyük, italic vurgu cyan, monospace `//00 Yapay Zeka`
  - [ ] Scroll cue alt sağda, hover'da arrow hareket
  - [ ] Chapter `//01` scroll'da pin oluyor, içerik fade-up
  - [ ] 3D scene scroll boyunca kamera değiştiriyor (yavaş, fark edilir)
  - [ ] Chapter `//03 Veri`'de "Read more" expand çalışıyor
  - [ ] Sound toggle dot pulse, off↔on label swap
  - [ ] CTA section unpin, footer normal scroll
- Mobile (Safari, gerçek cihaz veya DevTools throttle):
  - [ ] Scroll jank kabul edilebilir, sticky çalışıyor
  - [ ] Three.js scene <250 particle, FPS 30+
- A11y:
  - [ ] System reduced-motion açıkken sticky yok, scene yavaşladı/durdu
  - [ ] Sound toggle keyboard focusable, aria-pressed güncel

---

## 6. Risk Listesi

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| iOS Safari Lenis + ScrollTrigger sync jank | Orta | Yüksek | `ScrollTrigger.scrollerProxy` pattern, `syncTouch`, Beyar gerçek cihazda test |
| Mobile pinning + 3D scene FPS drop | Yüksek | Orta | Particle 250 cap, line bağlantıları kapalı, low-end'de sticky bypass |
| Three.js scene köprüsü `window.__yzScene` race condition (scene init scroll'dan sonra) | Düşük | Orta | scroll-motion `setStage` çağrısı optional chaining + scene init'te ready event |
| Section yüksek olunca pin uzunluğu canavar olur | Orta | Orta | `end: "+=80%"` veya `+=600` sabit; Beyar onayında ayarlanır |
| Video placeholder iddiası | (Yok, kullanmıyoruz) | — | Scene + section param değişimi cinematic hissi taşır |
| `<details>` height transition cross-browser pürüzü | Düşük | Düşük | `details[open]` CSS animation, kabul edilebilir fallback |
| Tab 1 (prototypes/) ile dosya çakışması | Düşük | — | Tüm yazımlar `prototypes-lab/` altında, lab izole |

---

## 7. Beyar Kararları (onaylı)

| Soru | Karar |
|---|---|
| Chapter sayısı | **5** (//01 Otomasyon, //02 Agent, //03 Veri, //04 Etik, //05 CTA) |
| Sticky pinning | **+=80%** her chapter (sinematik) |
| Italic `em` rengi | **Gavia accent cyan `#2DD4BF`** (Gavia teması) |
| Font | **Gavia mevcut**: Inter (var) + JetBrains Mono (label) |
| Mobile pinning | **Kapalı** (<768px düz scroll, GSAP pin disable, scene render devam) |
| Read more | **Sadece //03 Veri** (T1 kararı korunur) |
| CTA | **iletisim.html link** (T1 korunur) |
| scroll JS | **Ayrı dosya** `assets/js/yapay-zeka-scroll.js` |
| Scene köprüsü | `window.__yzScene.setStage()` küçük patch (scroll-motion ekler) |

---

## 8. Lead Koordinasyon Notu

Lead (Claude) kendi kod yazmaz. Üç teammate paralel spawn edilir
(html-structure CSS bekler — sıralı). Her teammate bitince mailbox üzerinden
"done" mesajı atar. Lead, üçü bitince Beyar'a birleşik özet sunar.
Otomatik commit yok. T4 cila (bloom / sound asset / micro polish) bu turun
DIŞINDA.
