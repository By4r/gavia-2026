# Yapay Zeka Sayfası — Three.js Scroll Hero Rebuild Planı

> Hedef dosya: `prototypes-lab/yapay-zeka-rebuild-plan.md` — bu plan onaylandıktan sonra aynı içerik oraya kopyalanacak (plan mode kısıtı nedeniyle şimdilik buraya yazıldı).

## Context

Gavia 2026 sitesinin **Yapay Zeka** sayfası, hashgraphvc.com kalitesinde cinematic bir scroll deneyimi ile sıfırdan üretilecek. Karar: video kullanmayalım, hero'da scroll'a bağlı **Three.js 3D scene** (AI temalı particle network) tüm sayfanın arka planında "yaşayan" bir görsel olarak çalışsın. Çakışma riski olmasın diye `prototypes-lab/` izole klasöründe — `prototypes/` paralel rebuild devam ediyor.

---

## 1. Hashgraph Analiz Özeti (karakter çıkarımı)

| Boyut | Gözlem |
|---|---|
| Section sayısı | 4 (Hero + Manifesto + Investors/Advantage + Team) |
| Numaralandırma | `//01 //02 //03` — monospace, neon vurgulu |
| Scroll | Deliberate, snap değil ama sticky-pinned section'lar; smooth-scroll (Lenis/locomotive izlenimi) |
| Hero | Text-driven minimal; "SOUND ON/OFF" toggle; "Scroll down to discover" cue. (Three.js doğrulanmadı ama high-end VC siteleri tipik olarak WebGL veya video loop kullanır — biz Three.js seçiyoruz) |
| Tipografi | Modern grotesque + monospace section label kombinasyonu, generous line-height, tracking dar |
| Renk | Koyu zemin + neon vurgu (mavi tonlarda izlenim; biz **Gavia cyan #2DD4BF** kullanacağız) |
| Etkileşim | "Read more" expand, sound toggle, scroll discover cue |

**Kopyalamıyoruz** — sadece *yapıyı* (numbered sticky sections, sound toggle, monospace label, koyu zemin + tek neon, scroll-driven hero) alıyoruz. Renk ve içerik Gavia.

---

## 2. Section Haritası

| # | Section | Amaç | Scroll davranışı | 3D scene davranışı |
|---|---|---|---|---|
| Hero | `//00` Yapay Zeka | Slogan + scroll cue + sound toggle | Sticky 100vh; başlık fade-up | Particle network slow-rotate, kamera +Z'den geliyor |
| 01 | `//01 Otomasyon` | İş akışı otomasyonu | Pinned 100vh; sol metin sticky, sağ Türkçe açıklama scroll | Particle'lar lineer akışa girer (data flow hissi), kamera hafif pan |
| 02 | `//02 AI Agent` | Konuşan/karar veren agent'lar | Pinned 100vh; iki kolon | Network "düşünüyor": node'lar pulse, bağlantılar parlar |
| 03 | `//03 Veri & Belge Zekası` | RAG, doküman analizi | Pinned 100vh | Particle yoğunluğu artar, cluster oluşur, kamera dolly-in |
| 04 | `//04 Etik AI & KVKK` | Sınırlar, veri yönetişimi | Standart scroll (pinned değil) | Scene yavaşlar, particle'lar düşük opacity'ye iner |
| CTA | `//05 Konuşalım` | İletişim formu / link | Standart | Scene fade-out, koyu zemin baskın |
| Footer | — | Site footer (mevcut footer pattern) | Statik | Yok |

**Toplam**: 5 numaralı section + hero + cta + footer = 8 stage. Hashgraph 4 vermişti; biz 5 veriyoruz çünkü Gavia AI scope'u (otomasyon / agent / veri / etik) daha geniş.

---

## 3. Three.js 3D Scene Konsepti

### Yöntem seçimi: **Particle Network (Option A)** — gerekçe:

| Kriter | Particle | Wireframe | Shader |
|---|---|---|---|
| AI/data ilişkisi | ⭐⭐⭐ direkt (neural network metaforu) | ⭐⭐ soyut | ⭐⭐ soyut |
| Performans | iyi (instanced points / BufferGeometry) | iyi | değişken (fragment-heavy) |
| Implementation maliyeti | orta | düşük | yüksek |
| Mobile feasibility | iyi (particle sayısı düşürülür) | iyi | zor |
| "Hashgraph kalitesi" hissi | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |

**Karar**: Particle network — `THREE.Points` + ek `THREE.LineSegments` (en yakın N node'u bağla, mesafeye göre opacity). Neural network metaforu AI sayfasıyla birebir örtüşür.

### Scene içeriği

- ~800 node (desktop), ~250 node (mobile), düşük-end fallback 0 (static SVG)
- Node'lar 3D küre içinde rastgele dağılmış, slow yaw rotation
- En yakın 3 komşuya bağlantı çizgisi, mesafe > threshold ise transparan
- Renk: Gavia cyan `#2DD4BF` ana, ikincil `#0F766E` (gradient hissi), background `#0A0F1C` (koyu lacivert-siyah)
- Subtle bloom efekti (postprocessing — opsiyonel, performans icabı ikinci turda)

### Scroll choreography (GSAP ScrollTrigger)

| Stage | Kamera | Rotation | Particle | Renk |
|---|---|---|---|---|
| Hero | z=8, hafif tilt | 0.0005 rad/frame | full opacity | cyan saturated |
| 01 Otomasyon | dolly z=6, pan x=+1 | 0.001 | hafif scatter | cyan |
| 02 AI Agent | orbit y=30deg | 0.0015 + pulse | pulse opacity (sin) | cyan + accent flash |
| 03 Veri | dolly z=4 (close-up), pan y=-0.5 | 0.0008 | density boost (cluster) | cyan deep |
| 04 Etik | dolly z=10 (zoom-out), tilt up | 0.0003 | opacity 0.4 | cyan dim |
| CTA | z=14, fade | 0 | opacity 0.15 | dim |

3D scene **canvas fixed full-viewport** olarak `position:fixed; inset:0; z-index:-1`. Tüm sayfada görünür ama içerik üstte. CSS variable ile her section'a girince GSAP ScrollTrigger değerleri lerp eder.

### Mobile fallback stratejisi

3 katmanlı:
1. **prefers-reduced-motion** veya `navigator.hardwareConcurrency < 4` → static SVG/PNG gradient hero, JS scene yüklenmez.
2. `< 768px` viewport → particle sayısı 800→250, postprocessing kapalı, line bağlantıları kapalı.
3. WebGL context loss / hata → otomatik static fallback'e geçiş.

---

## 4. Teknik Stack

| Katman | Seçim | Versiyon | CDN |
|---|---|---|---|
| 3D | Three.js | r158 (stable, ES module) | `https://unpkg.com/three@0.158.0/build/three.module.js` |
| Scroll | GSAP + ScrollTrigger | 3.12 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js` + ScrollTrigger |
| Smooth scroll | Lenis | 1.0.x | `https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js` |
| Tailwind | CDN (mevcut konvansiyon) | latest | mevcut |
| Font | Inter (var) + JetBrains Mono (label) | Google Fonts | mevcut |

**Dosya organizasyonu**: Ayrı dosya tercih — bakım kolay, hot reload kolay, JS scene 200+ satır olacak.

```
prototypes-lab/
├── yapay-zeka.html
├── assets/
│   ├── css/
│   │   └── yapay-zeka.css         (hero + section spesifik)
│   ├── js/
│   │   ├── yapay-zeka-scene.js    (Three.js particle scene)
│   │   └── yapay-zeka-scroll.js   (GSAP timeline + Lenis init)
│   └── img/
│       └── yapay-zeka-fallback.svg (mobile/no-webgl static)
└── yapay-zeka-rebuild-plan.md      (bu doküman onay sonrası buraya kopyalanır)
```

### Performance kontrolleri

- `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`
- RAF tek loop, GSAP ticker'a bağla (`gsap.ticker.add`)
- IntersectionObserver: hero görünmüyorsa render durdur (`renderer.setAnimationLoop(null)`)
- `BufferGeometry` + tek `Points`/`LineSegments` mesh (draw call < 5)
- Postprocessing v1'de kapalı, v3 cila turunda eklenir

---

## 5. Implement Sırası (4 tur)

| Tur | Kapsam | Çıktı |
|---|---|---|
| **T1 — İskelet** | HTML semantic structure (8 section), Tailwind ile koyu zemin + tipografi, monospace `//01` label'lar, sticky pin'lemeden statik mockup, Türkçe placeholder copy, footer | Tarayıcıda scroll'da içerik akıyor, 3D yok |
| **T2 — Three.js scene** | Particle network scene tek başına bir test sayfasında, slow rotation, cyan renk, resize handler, mobile fallback detection | Canvas çalışır, scroll bağlı değil |
| **T3 — Scroll bağlama** | Lenis + GSAP ScrollTrigger entegrasyon, scene'i page'e gömme, her section için ScrollTrigger oluşturma (kamera/rotation/opacity lerp), pinning, content fade-up | Cinematic scroll çalışır |
| **T4 — Cila** | Sound on/off toggle (placeholder audio ya da silent — Beyar copy verir), "Read more" expand, scroll cue animation, postprocessing bloom (opsiyonel), accessibility (prefers-reduced-motion, kontrast), iOS Safari test | Production-ready ilk versiyon |

Her tur sonunda Beyar onayı; sonra commit önerisi (otomatik commit yok).

---

## 6. Risk Listesi

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| iOS Safari WebGL context loss / scroll jank | Orta | Yüksek | passive scroll listener, Lenis iOS smoothMouse: false, raf tek loop |
| Mobile düşük FPS | Yüksek | Orta | Particle 250'ye düşür, line bağlantıları kapat, fallback SVG |
| GSAP ScrollTrigger + Lenis sync sorunu | Düşük (well-documented) | Orta | Lenis docs'taki `ScrollTrigger.scrollerProxy` pattern'ı |
| Bundle boyutu (Three r158 ~150KB gz) | Düşük | Düşük | CDN cache, defer script |
| Tipografi tutarsızlığı (Inter + Mono swap) | Orta | Düşük | `font-display: swap`, fallback stack |
| Sound asset olmaması | Yüksek | Düşük | Toggle UI hazır, audio bağlanmadan no-op; Beyar audio verince hook'la |
| Three.js içeriği "amaçsız 3D" gibi durabilir | Orta | Yüksek | Network metaforu AI ile bağlı, her section'da değişim olsun — boş hareket etmesin |

---

## 7. Açık Sorular (Beyar cevaplayacak)

1. **Section sayısı**: 4 alt başlık (Otomasyon / AI Agent / Veri-Belge / Etik) yeterli mi, yoksa 3'e indirilsin mi (Etik'i KVKK sayfasına bırakabiliriz)?
2. **Sound toggle**: Placeholder UI bırakayım mı, yoksa şimdilik hiç koymayayım mı? (Audio asset henüz yok)
3. **"Read more" expand**: Hangi section'larda olsun — hepsinde mi, sadece 03 Veri'de mi?
4. **Hero slogan placeholder**: "Yapay zekayı işin içine koyuyoruz." gibi bir cümle uydurayım mı, yoksa `[SLOGAN — TODO Yasin Bey]` placeholder mi koyayım?
5. **CTA hedefi**: Form mu (iletisim.html'e link), yoksa inline mini form mu?
6. **Footer**: prototypes-lab/ izole olduğuna göre footer'ı sıfırdan mı yazayım, yoksa basit bir version mı? (prototypes/ okumayacağım — pattern'i hatırdan/skill'den alacağım)
7. **Mobile fallback görseli**: Statik SVG'yi ben mi tasarlayayım (basit geometric pattern), yoksa düz gradient mi yeterli?
8. **Three.js performance**: `renderer.setPixelRatio` cap'i 2 mi 1 mi tutayım? (1 = daha smooth, 2 = retina daha keskin)
9. **Bloom postprocessing**: T4 cila turunda eklemeyi onaylıyor musun (asset boyutu +30KB, görsel kalite ciddi artar)?
10. **Plan dosyası**: Bu planı `prototypes-lab/yapay-zeka-rebuild-plan.md` olarak da yazayım mı onay sonrasında, yoksa sadece bu plan dosyası yeterli mi?

---

## Verification (implement sonrası test)

- Desktop Chrome/Safari/Firefox: scroll boyunca FPS > 50, 3D scene reactive
- Mobile (iOS Safari, Android Chrome): fallback veya düşük particle scene, scroll jank yok
- `prefers-reduced-motion: reduce` → static fallback
- DevTools throttling "Slow 4G" → page interactive < 3s
- Axe / Lighthouse a11y > 90 (kontrast, ARIA label sound toggle için)
- Playwright (opsiyonel ileride): scroll position'larda ekran görüntüsü diff
