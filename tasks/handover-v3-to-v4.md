# Handover — V3 sonrası V4'e geçiş

## Bağlam — Gavia Works 2026, Yapay Zeka sayfası prototypes-lab

Lab'da V1, V2, V3 paralel duruyor. **V2 Beyar'ın "her şeyi" — dokunma.** V3 başarısız oldu (plazma section sürekli görünüyor bug, plazma video sahnenin önüne geçiyor) — Beyar V4 ile yeni yön başlatacak.

## Dosya envanteri (16 May 2026)

### V1 — TAMAMEN DOKUNULMAZ
- `prototypes-lab/yapay-zeka.html`
- `prototypes-lab/assets/css/yapay-zeka.css`
- `prototypes-lab/assets/js/yapay-zeka-scroll.js`
- `prototypes-lab/assets/video/yz-01-otomasyon.mp4` … `yz-05-cta.mp4` (T4 chapter figure video'ları)

### V2 — BEYAR'IN ALTIN STANDART, DOKUNULMAZ
- `prototypes-lab/yapay-zeka-v2.html`
- `prototypes-lab/assets/css/yapay-zeka-v2.css`
- `prototypes-lab/assets/js/yapay-zeka-scroll-v2.js`
- `prototypes-lab/assets/video/yz-bg-hero.mp4` (calm cyan dalga + amber)
- `prototypes-lab/assets/video/yz-bg-flow.mp4` (mavi/cyan akan dalgalar)
- `prototypes-lab/assets/video/yz-bg-network.mp4` (mint geodesic icosahedron)

### V3 — başarısız deneme (Beyar sildirebilir veya dursun)
- `prototypes-lab/yapay-zeka-v3.html`
- `prototypes-lab/assets/css/yapay-zeka-v3.css`
- `prototypes-lab/assets/js/yapay-zeka-scroll-v3.js`

### Paylaşımlı — DİKKATLİ patch
- `prototypes-lab/assets/js/yapay-zeka-scene.js` — V1/V2/V3 ortak kullanıyor. CSS var bridge (`--scene-accent`), version-aware (`data-yz-version`), V1 cyan fallback, V2 mint, V3 mint+bloom+morph.

## Tasarım kararları — V2 (altın standart)

| Boyut | Değer |
|---|---|
| Accent renk | `#3FD5AD` (Gavia mint, ana site tutarlı) |
| Font | Inter + JetBrains Mono (mevcut) |
| H1 cap | `clamp(48px, 7vw, 96px)`, letter-spacing `-0.035em` |
| Chapter layout | 2-kolon (sol media + sağ chapter visual video figure) ALTERNATING (02 & 04 ters) |
| Persistent video bg | 6 video slot, 3 unique src (hero/flow/network), scroll-driven opacity crossfade, autoplay pause/play toggle |
| Three.js scene | mint, transparent canvas, STAGE_TABLE_DEFAULT (size 0.05-0.12 aralığı), no bloom |
| Pin uzunluğu | `+=100%` |
| Lenis | `wheelMultiplier: 0.9` |
| Scroll-rail | sağ 32px, 6 segment, monospace "//XX CHAPTER" label |
| CTA | `.btn-primary` ana site Tailwind token'larıyla (`bg-gavia-mint`, rounded-lg 8px, "Projenizi Anlatalım →" + SVG arrow) |
| Sound toggle | UI-only (audio asset yok), nav sağ üst |

## V3 ne deneyendi, nerede patladı

V3 hedef: particle cinematic choreography + plazma section (Ch2-Ch3 arası, text yok full-bleed video, "düşüncenin akışı") + bloom + lattice vertex morph + scroll-rail 7 segment.

V3'ün başarısız olduğu yer:
- Plazma section `position: fixed` plazma__media → Three.js scene'i örtüyor, sürekli hero'da görünüyor
- Plazma → Ch03 sönümlenme geçişi Beyar'ı tatmin etmedi
- Çok video DOM'da render → stutter (kısmen autoplay ile çözüldü ama V2 kıyasla daha karmaşık ve buggy)

Beyar kararı: V3'ten vazgeçildi. V4 ile temiz başlangıç.

## Stack & komutlar

- Mac, zsh, Chrome/Safari
- Local server ayakta: **PID 86936**, port 8765
  - `curl http://127.0.0.1:8765/yapay-zeka.html` (V1)
  - `http://127.0.0.1:8765/yapay-zeka-v2.html` (V2 — Beyar referans)
  - `http://127.0.0.1:8765/yapay-zeka-v3.html` (V3 — failed)
- ffmpeg yüklü: `/opt/homebrew/bin/ffmpeg` (8.1.1)
- Three.js r158 ESM CDN, GSAP 3.12.2 + ScrollTrigger, Lenis 1.0.42
- Stack: HTML/CSS/JS vanilla, Tailwind YOK (lab'da CSS hand-written)

## Git durumu

- Son commit: `b1a9de7 checkpoint(lab): T3 yapay-zeka with videos before T4 motion intensify`
- T4 + T5 (V2 doğum) + V3 deneyleri **UNCOMMITTED**, working tree'de
- V2 ve V3 dosyaları henüz commit'lenmedi
- Otomatik commit YASAK — Beyar isteyince commit yapılır

## Memory / kayıtlar

- `tasks/T4-cinematic-motion-plan.md` — T4 motion plan
- `tasks/T5-persistent-bg-plan.md` — V2 persistent bg plan
- `tasks/T6-v3-particle-cinematic-plan.md` — V3 plan (başarısız implement)
- Bu dosya: `tasks/handover-v3-to-v4.md`
- Memory: `~/.claude/projects/-Users-dadaistanbul-Developer-Backend-Projects-gavia-2026/memory/MEMORY.md`
- Proje CLAUDE.md: `gavia-2026/CLAUDE.md`

## V4 için Beyar'dan beklenen brief

Beyar V4 yönünü tarif edecek. Olası yönler (Beyar onaylayacak):
- V2 üzerine küçük iterasyon (renk, tipografi, microcopy)
- V3'teki plazma fikrini farklı şekilde V2'ye entegre (separate section, fixed video DEĞİL — kontrollü chapter visual gibi)
- Tamamen yeni bir narrative (örn: full-screen sticky chapter slider)
- Mobile-first iterasyon

V4 başlarken Beyar'ı bekle, kendisi yön versin.

## Çalışma kuralları (Beyar)

- **V2'ye dokunma. Asla.**
- V1'e dokunma.
- V3 atılabilir veya kalabilir, Beyar karar verir.
- Plan onayı olmadan implement yok.
- Otomatik commit yok.
- "Bakar mısın" diye dur.
- Türkçe samimi ton, "hacı" hitabı normal.
- Browser test: `http://127.0.0.1:8765/yapay-zeka-vX.html`.
- Smoke test ZORUNLU her implement sonu (V1+V2 bozulmadı doğrula).
