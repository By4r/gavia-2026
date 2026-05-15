# T6 / V3 — Particle Cinematic Choreography + Plazma Section

> **V1 ve V2 dokunulmaz.** V3 yeni dosyalar olarak paralel kurulur.
> Beyar 3 paralel demo karşılaştırır.

## Context

V2'de persistent video crossfade kuruldu, ama particle network sahnesi durağan kalıyor — sadece kamera Z + rotation hızı + opacity değişiyor. V3'te asıl drama particle'larda olacak: **parçalanma → yakınlaşma → plazma (video full-bleed) → dönüşüm → uzaklaşma**. Plazma video merkez "nefes alma" momenti, text yok.

## Anlatım sıralaması

```
//00 Hero  →  //01 Parçalanma  →  //02 Yakınlaşma  →  // PLAZMA  →  //03 Dönüşüm  →  //04 Uzaklaşma  →  //05 CTA
   8 stage (önceki 6)
```

| Stage | İçerik | Particle | Kamera | Plazma video |
|---|---|---|---|---|
| 00 Hero | başlık | aktif, slow rotate | z=8 | gizli |
| 01 Otomasyon | text + 4 li | **parçalanma** (scatter+rot) | z=10, geriye | gizli |
| 02 AI Agent | text + 4 li | **yakınlaşma** (camera dives in) | z=10→1.5 | gizli |
| **PLAZMA** | yalnız video, label köşe | gizli (opacity 0) | sabit (donmuş) | **opacity 0→1→0** full-bleed |
| 03 Veri & Belge | text + 4 li + Read more | **dönüşüm** (lattice form) | z=1.5→4 | gizli |
| 04 Etik & KVKK | text + 4 li | **uzaklaşma** (zoom out) | z=4→8 | gizli |
| 05 CTA | başlık + btn | minimal sönümlü | z=8→14 | overlay 0.4 |

## Dosya yapısı

```
prototypes-lab/
├── yapay-zeka.html               ← V1 (DOKUNMA)
├── yapay-zeka-v2.html            ← V2 (DOKUNMA)
├── yapay-zeka-v3.html            ← V3 (YENİ)
├── assets/css/
│   ├── yapay-zeka.css            ← V1 (DOKUNMA)
│   ├── yapay-zeka-v2.css         ← V2 (DOKUNMA)
│   └── yapay-zeka-v3.css         ← V3 (YENİ)
├── assets/js/
│   ├── yapay-zeka-scroll.js      ← V1 (DOKUNMA)
│   ├── yapay-zeka-scroll-v2.js   ← V2 (DOKUNMA)
│   ├── yapay-zeka-scroll-v3.js   ← V3 (YENİ)
│   └── yapay-zeka-scene.js       ← PAYLAŞIMLI (V3 için API genişlemesi, V1+V2 backward compat)
└── assets/video/
    └── yz-bg-network.mp4         ← V2'den, plazma section için reuse (yeni dosya yok)
```

## Particle morph stratejisi — A vs B

### Önerilen Plan A — "Sahte morf" (camera/rotation/scale/scatter param)

Vertex pozisyonları **sabit** kalır. Beyar'ın istediği "evrim" hissi şu parametreler ile kurulur:

- `currentTargets.scatter` ∈ [0..1] — scene.rotation hızlı + particle position'ları **runtime'da çarpan ile büyütülür** (her tick scene.scale güncelle). 1.0'da scene scale 1.5×, rotation 0.003.
- `currentTargets.cameraDive` ∈ [0..1] — kamera z paralel olarak 10→1.5 lerp, FOV hafif geniş açı.
- `currentTargets.lattice` ∈ [0..1] — geometry vertex'lerini "lattice grid" hedefine doğru morph (vertex-by-vertex BufferGeometry lerp).
- `currentTargets.scale` ∈ [0..2] — scene.scale lerp.

**Plan A artıları**: GPU yükü düşük (vertex once-built, sadece scale/rotation/lookAt update). Mobile uyumlu.
**Plan A eksileri**: "Parçalanma" gerçek dağılma değil, scale + rotation hissiyle. Beyar isterse Plan B'ye geç.

### Plan B — Gerçek vertex morph (BufferGeometry lerp)

İki ayrı vertex array (chaotic plasma + lattice grid), her frame `gpu.lerpVertices(t)`. Beyar isterse implement; ilk turda A. (Plan B GPU update'i: ~800 vertex × 3 float × 60fps = OK ama mobile'da CPU update gerek.)

**Önerim**: **Plan A + tek vertex morph hedefi `lattice`** (Ch3 dönüşüm için). Parçalanma sadece scale+rotation+scatter (sahte). Bu hybrid.

## Camera path timeline (Plan A)

| Stage | z | scale | rot/frame | opacity | size | particle visible |
|---|---|---|---|---|---|---|
| 00 Hero | 8 | 1.0 | 0.0005 | 1.0 | 0.08 | ✓ |
| 01 Otomasyon | 10 | 1.5 | 0.003 | 1.0 | 0.07 | ✓ scatter |
| 02 AI Agent | 1.5 | 1.2 | 0.001 | 1.0 | 0.18 | ✓ close-up |
| Plazma | 1.5 | 1.2 | 0 | 0 | 0.18 | ✗ hidden |
| 03 Veri | 4 | 1.0 | 0.0008 | 1.0 | 0.10 | ✓ lattice |
| 04 Etik | 8 | 0.8 | 0.0003 | 0.5 | 0.06 | ✓ small |
| 05 CTA | 14 | 0.7 | 0 | 0.25 | 0.05 | ✓ minimal |

## Plazma section HTML/CSS

```html
<section class="plazma" data-stage="plazma" id="section-plazma" aria-hidden="false">
  <div class="plazma__media">
    <video class="plazma__video" src="assets/video/yz-bg-network.mp4"
           muted playsinline loop preload="auto"></video>
  </div>
  <div class="plazma__label">//PLAZMA — DÜŞÜNCENİN AKIŞI</div>
</section>
```

CSS:
- `.plazma { position: relative; height: 100vh; }`
- `.plazma__media { position: sticky; top: 0; width: 100vw; height: 100vh; overflow: hidden; }`
- `.plazma__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 600ms ease; }`
- `.plazma__label { position: absolute; bottom: 32px; left: 32px; font-family: mono; 11px; letter-spacing: 0.22em; opacity: 0.7; }`

Pin uzunluğu: GSAP `end: '+=100%'` scrub. Video opacity 0 → 1 (first 40%) → hold (40%) → 0 (last 20%). Particle scene opacity 0 plazma süresince.

## Scroll-rail 7 segment

```
00 YAPAY ZEKA
01 OTOMASYON
02 AI AGENT
PLAZMA          ← yeni
03 VERİ & BELGE
04 ETİK & KVKK
05 KONUŞALIM
```

Toplam 7 li. Label "PLAZMA" tek-kelime aktif olunca. Aktif segment görsel olarak farklı (cyan/mint glow ekle).

## Particle teknik (Plan A + lattice morph)

scene.js'e eklenecek yeni public API (V1/V2'yi kırmadan):

```js
window.__yzScene = {
  setStage(stage, progress) { /* mevcut: cam z, rot, opacity, size */ },
  // Yeni — V3 için, V1/V2 çağırmazsa fark etmez:
  setMorph(name, t) {
    // name: 'lattice' | 'scatter' | 'cameraDive'
    // t: 0..1
  }
};
```

Internal:
- Build sonrası ek olarak `lattice` hedef pozisyonları üretilir (3D grid noktaları). Aynı sayıda.
- Her tick'te `lattice` parametresine göre vertex lerp:
  ```js
  for (i ...) {
    pos[i] = startPos[i] * (1 - tLattice) + latticePos[i] * tLattice;
  }
  geometry.attributes.position.needsUpdate = true;
  ```
- `scatter` parametresi: scene.scale.setScalar(1 + 0.5 * tScatter), rot speed boost.
- `cameraDive` parametresi: tek başına camera.position.z'ye etki etmez (zaten `currentTargets.z` var); cameraDive ekstra FOV genişletir (fov: 60 → 75).

Vertex morph yapılırken her frame `position.needsUpdate=true`. CPU ~800×3 float lerp = ucuz. Mobile aynı stratejide 250 vertex = ucuz.

## V3 implement sırası

1. **Plan A scene.js patch** — `lattice` hedef vertex array build (build() sonu), `setMorph` API, tick'te lerp + scatter scale (V1/V2 backward compat).
2. **yapay-zeka-v3.html** — V2'den kopyala:
   - `<html data-yz-version="v3">`
   - Persistent video bg yok (V2'deki crossfade kaldırılır — V3 farklı yön)
   - Ch2 sonrası `<section class="plazma" data-stage="plazma">` ekle
   - Scroll-rail 7 segment
   - Diğer her şey aynı (chapter tek-kolon, btn-primary, rail, vb.)
3. **yapay-zeka-v3.css** — V2'den kopyala:
   - `.plazma` + `.plazma__media` + `.plazma__video` + `.plazma__label`
   - `:root { --scene-accent: #3FD5AD }` korunur (mint)
   - V2 site-background CSS bloğunu sil (V3'te tek video Plazma'da)
   - data-version selector `v3` ile sınırla
4. **yapay-zeka-scroll-v3.js** — V2'den kopyala:
   - V2 crossfade fonksiyonu sil (background yok)
   - Plazma section için ScrollTrigger:
     - pin `.plazma__media`, end `+=100%`, scrub
     - onUpdate: progress'e göre video opacity, particle opacity 0
   - Her chapter için `setMorph` çağrıları:
     - Ch1 onUpdate → `setMorph('scatter', progress)`
     - Ch2 onUpdate → `setMorph('cameraDive', progress)`
     - Ch3 onUpdate → `setMorph('lattice', progress)`, `setMorph('scatter', 1-progress)`
     - Ch4/Ch5 → diğerlerini 0'a indir
   - STAGE_TABLE yeni değerlerle setStage çağrıları
5. **scene.js patch** — yeni API ekle (V1+V2 testten geçmeli)
6. **V1 + V2 smoke test** — kırılmadı doğrula
7. **V3 test** — `127.0.0.1:8765/yapay-zeka-v3.html`

Tahmini süre: **70-90 dk**.

## Risk listesi

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| Vertex morph (Plan A lattice) GPU/CPU yük mobile | Orta | Orta | Mobile particle 250'de zaten az; vertex lerp ucuz |
| scene.js V1/V2 kırılması | Orta | Yüksek | Yeni API additive; eski setStage davranışı bire bir korunur; smoke test ZORUNLU |
| Plazma section pin uzunluk + body BG opak | Düşük | Orta | V3 body bg transparent (V2 pattern) veya plazma section z-index üst |
| Particle opacity 0 sırasında render maliyeti boşa | Düşük | Düşük | `targetOpacity < 0.02` ise renderer.setAnimationLoop(null) (skip frame) |
| Particle scatter sırasında off-screen vertex'ler | Düşük | Düşük | Camera FOV / position ayarı sahnenin tamamını görür |
| Plazma video preload="auto" ilk yüklemede +8MB | Orta | Orta | Hero'da `<link rel="preload" as="video">` ile öncelik düşür |
| Scroll-rail 7 segment dikey boyut taşar | Düşük | Düşük | gap küçült (6px→4px), segment height 24px |
| Camera Z=1.5 yakınlaşma sırasında particle clipping (near plane) | Orta | Orta | camera.near 0.1 → 0.05; veya particle z = 0'a yakın olanları gizle |

## Açık sorular (Beyar onayı)

1. **Particle morph stratejisi**: Plan A (önerim — sahte parçalama + lattice morph, performans güvenli) mi, Plan B (full vertex morph, daha agresif ama riskli) mi?
2. **Plazma section konumu**: Ch2 (AI Agent) ile Ch3 (Veri) arasında (önerim) doğru mu, yoksa farklı sıra mı?
3. **Plazma label**: "//PLAZMA — DÜŞÜNCENİN AKIŞI" (önerim) mi, kısa "//PLAZMA" mı, hiç label yok mu?
4. **Plazma video kaynağı**: V2'deki `yz-bg-network.mp4` reuse (mint geodesic) doğru mu, başka video mu (`yz-bg-hero` cyan dalga)?
5. **CTA'da plazma overlay**: opacity 0.4 (önerim) mi, plazma orada görünmesin mi (sadece scene)?
6. **Background**: V3'te persistent video bg **yok** (V2 farkı) doğru mu, yoksa Plazma dışında hiç bg mi, yoksa minimal bg mi?

## Verification (V1/V2/V3)

- V1 (`yapay-zeka.html`): T4 davranışı, cyan accent, sağ figure'lar, scene cyan
- V2 (`yapay-zeka-v2.html`): persistent crossfade, mint accent, tek-kolon, scroll-rail 6 segment
- V3 (`yapay-zeka-v3.html`): mint accent, plazma section (Ch2-Ch3 arası), particle morph stages, scroll-rail 7 segment
- DevTools console: hata yok
- V1+V2+V3 paylaşımlı scene.js: backward compat smoke test geçer
