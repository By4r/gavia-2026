# Web Replicator — Apple iPhone 17 Pro → Gavia Yapay Zeka — Iteration Log

**Reference:** https://www.apple.com/iphone-17-pro/
**Target file:** `prototypes/yapay-zeka.html`
**Date:** 2026-05-17
**Mode:** B (overlay) — full visual language overhaul (D-tier per L10 categorization)

## Iteration 01 — Full rewrite

**Files touched:**
- `prototypes/yapay-zeka.html` — full rewrite (10KB → 11KB; new structure)
- `prototypes/assets/css/yapay-zeka-v3.css` — new file (501 lines)
- `prototypes/yapay-zeka.v2-scroll-cinematic.html` — backup snapshot (legacy scroll-cinematic version kept on github)
- `prototypes/assets/css/yapay-zeka-v2.css` — left untouched so backup HTML renders correctly

**Structure (Apple iPhone 17 Pro pattern map):**
| Apple section | Gavia section |
|---|---|
| Local nav (sticky) | `.localnav` — Gavia · Yapay Zeka + 4 anchors + Projenizi Anlatalım CTA |
| Hero (centered massive H1) | `.hero` — eyebrow + massive H1 88px + lead + 2 CTAs + rotated stamp + ambient orbs |
| Get the highlights (cards) | `.highlights` — off-white panel + 4-card grid |
| Cameras / Performance (alternating panels) | `#otomasyon` / `#agent` / `#veri` / `#etik` — 4 feature panels alternating light/dark with edge media |
| Shop iPhone CTA banner | `.cta-final` — centered massive H2 + mint pill CTA |
| Mega-footer | `.foot` — minimal 2-row footer |

**Signature patterns applied:**
- ✅ Massive centered H1 with mint italic em (`Yapay zekayı <em>işin içine</em> koyuyoruz.`)
- ✅ Edge-to-edge alternating panels: white → off-white → white → dark → off-white → white
- ✅ Hairline eyebrow with `::before` 32px rule + 0.22em tracked uppercase
- ✅ Mint pill CTA (`border-radius: 999px`) + arrow link pair
- ✅ Apple-style sticky local nav with `backdrop-filter: saturate(180%) blur(20px)`
- ✅ Subtle reveal animations via IntersectionObserver (no scroll-jacking)
- ✅ Rotated hero stamp `00 — YAPAY ZEKA` outline (Gavia signature kept)
- ✅ Mint italic em in headlines (`<em>` styling in CSS)
- ✅ Big outline number glyph in feature media block (`feature__media-glyph`)

**Token verification (preview_inspect):**
- H1 desktop computed: 88px / weight 600 / color rgb(29, 29, 31) ✓
- H2 feature: 56px / weight 600 ✓
- Mint accent: rgb(63, 213, 173) ✓
- Dark panel bg: rgb(2, 8, 55) (gavia-deep) ✓
- Dark panel text: rgb(245, 245, 247) ✓
- Off-white panel: rgb(245, 245, 247) ✓
- Localnav: position sticky, top 0, backdrop-filter saturate(1.8) blur(20px), height 52px ✓
- Mobile H1: 40px ✓
- Total doc height @ 1280w: 5400px ✓

**L05 (font discipline):** Single family — `Inter` 300/400/500/600/700 — no JetBrains Mono, no Manrope, no display variant. Eyebrow uses same family with weight 700 + uppercase + 0.22em tracking.

**Bug fixes in this iteration:**
- `overflow-x: hidden` on `html, body` was breaking `position: sticky` on `.localnav`. Moved to `body { overflow-x: clip }` only. Sticky verified working at scrollY=1500.

## Iteration 02 — (skipped, not needed)

Pattern checklist complete in iteration 01. Beyar review pending.

## Anti-pattern checks
- ✅ No emoji icons or "AI ✨" eyebrow phrases
- ✅ No glassmorphism / multi-color gradient
- ✅ No vector wireframe placeholder ("PHOTO 16:10" mono captions)
- ✅ Signature patterns physically present in markup, not just renamed tokens
- ✅ Apple copy/imagery NOT reproduced — only visual language adapted
- ✅ Content (4 AI capabilities + CTA) preserved verbatim from v2

## Stop criteria
Reached. Beyar to review and request iterations as needed. Backup at `yapay-zeka.v2-scroll-cinematic.html` available on github for reference.
