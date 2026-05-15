# Session Handoff — Yapay Zeka Rebuild

## Context

Gavia 2026 sitesinin **Yapay Zeka** sayfası, **hashgraphvc.com kalitesinde** cinematic scroll deneyimi ile sıfırdan yeniden üretiliyor. Hero ve sayfanın tamamına yayılan arka planda **Three.js scroll-driven 3D scene** (AI temalı particle network) çalışacak — video kullanmıyoruz.

Çakışma yaşanmasın diye iş `prototypes-lab/` izole klasöründe yapılıyor. `prototypes/` klasörüne **dokunulmuyor ve okunmuyor** — paralel rebuild orada devam ediyor.

Referans: https://hashgraphvc.com — yapısı alındı, rengi alınmadı.

## T1'de Yapılanlar (BU SESSION — TAMAMLANDI)

- `prototypes-lab/yapay-zeka.html` — 8 stage semantic skeleton: nav + hero + `//01 Otomasyon` + `//02 AI Agent` + `//03 Veri & Belge Zekası` + `//04 Etik AI & KVKK` + CTA + footer
- `prototypes-lab/assets/css/yapay-zeka.css` — koyu zemin (`#0A0F1C`), Gavia cyan (`#2DD4BF`), Inter + JetBrains Mono fontları, monospace `//00…//05` section label'ları, two-column içerik grid'i
- `#scene-canvas` div'i `position:fixed; inset:0; z-index:-1` placeholder gradient ile duruyor — **T2'de Three.js bu div'i devralacak**
- Sound toggle UI (sağ üst), audio bağlanmamış (no-op label swap)
- "Read more" expand sadece `//03 Veri & Belge Zekası` içinde (`<details>` element)
- Hero slogan: "Yapay zekayı **işin içine** koyuyoruz."
- CTA → `iletisim.html` linki
- Basit footer (4 link: Hakkımızda, Hizmetler, İletişim, KVKK)
- Plan dosyası: `prototypes-lab/yapay-zeka-rebuild-plan.md` (detaylı plan burada)

**Commit**: `148eb89` — `feat(yapay-zeka): T1 skeleton with 5 sections, sound toggle, scene placeholder`

## Önemli Kararlar (T2+ için bağlayıcı)

| Konu | Karar |
|---|---|
| Section sayısı | 5 numaralı (Hero `//00` + Otomasyon/Agent/Veri/Etik + CTA `//05`) |
| 3D yöntem | Particle network (`THREE.Points` + line segments en yakın N komşuya) |
| Particle sayısı | ~800 desktop / ~250 mobile / 0 (static gradient fallback) düşük-end |
| Renk | Ana `#2DD4BF` (Gavia cyan), ikincil `#0F766E`, BG `#0A0F1C` |
| Three.js | r158 ES module — `https://unpkg.com/three@0.158.0/build/three.module.js` |
| GSAP | 3.12 + ScrollTrigger |
| Smooth scroll | Lenis 1.0.x |
| pixelRatio cap | 2 |
| Bloom postprocessing | T4 cila turunda (T2'de YOK) |
| Mobile fallback | Basit gradient (SVG tasarlanmayacak) — şu an CSS gradient #scene-canvas'ta var |
| Sound | UI duruyor, audio bağlama YOK |
| Read more | sadece //03 |

## Dosya Yapısı

```
prototypes-lab/
├── yapay-zeka.html                      ← T1: 5 section iskelet
├── yapay-zeka-rebuild-plan.md           ← detaylı plan (oku!)
├── _session-handoff.md                  ← bu dosya
└── assets/
    ├── css/
    │   └── yapay-zeka.css               ← T1: koyu zemin + tipografi
    ├── js/                              ← T2: yapay-zeka-scene.js buraya
    └── img/                             ← (boş)
```

## Sıradaki Adım — T2: Three.js Particle Scene

**Hedef**: `prototypes-lab/assets/js/yapay-zeka-scene.js` oluştur.

**Kapsam (sadece bu kadar)**:
- Three.js r158 ES module CDN'den yükle
- `#scene-canvas` div'ini WebGL canvas ile devral
- Particle network scene kur:
  - ~800 node (desktop), `< 768px` viewport ise ~250 node
  - `THREE.Points` + `BufferGeometry`
  - En yakın 3 komşuya `THREE.LineSegments` (mesafe threshold'una göre opacity)
  - 3D küre içinde rastgele dağıtım
  - Renk `#2DD4BF` ana, `#0F766E` ikincil
- Yavaş yaw rotation (animation loop)
- `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`
- Resize handler
- WebGL fail / `prefers-reduced-motion` → scene yüklenme, mevcut CSS gradient fallback kalsın
- IntersectionObserver: canvas görünmüyorsa render durdur
- HTML'de `<script type="module" src="assets/js/yapay-zeka-scene.js"></script>` ekle

**T2'de YASAK**:
- GSAP / ScrollTrigger / Lenis entegrasyonu (T3'te)
- Scroll'a bağlama (T3'te)
- Bloom postprocessing (T4'te)
- Kamera scroll davranışı (T3'te)
- prototypes/ klasörüne dokunma

**T2 verification**:
- `open prototypes-lab/yapay-zeka.html`
- Hero arka planında particle network dönüyor olmalı
- Desktop 60 FPS yakın, mobile 30+ FPS
- Console'da WebGL error yok
- Scroll'da scene **değişmiyor** (bu T3'te gelecek) — sadece yavaş dönüyor

## Yasaklar

- `prototypes/` klasörüne **dokunma ve okuma yok**
- Otomatik commit/push yok — Beyar onayıyla
- Auto mode default kapalı — Beyar açarsa aç

## Referanslar

- Plan detayı: `prototypes-lab/yapay-zeka-rebuild-plan.md`
- Proje CLAUDE.md: `gavia-2026/CLAUDE.md`
- Global CLAUDE.md: `~/.claude/CLAUDE.md`
- Memory: `~/.claude/projects/-Users-dadaistanbul-Developer-Backend-Projects-gavia-2026/memory/MEMORY.md`
- Hashgraph referans: https://hashgraphvc.com
