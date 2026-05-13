# Gavia Works 2026 — Design System

> Inspiration: Supabase DESIGN.md (getdesign.md/supabase) — dark emerald theme, code-first, Geist typography.
> Aşama A foundation. Faz 3 implementation rehberi.

## Color Tokens

### Brand
- `--gavia-deep`: `#020837` (ana koyu zemin, mevcut Gavia)
- `--gavia-night`: `#141533` (section ayrımı)
- `--gavia-dark`: `#0A0E27` (mega koyu hero/footer)
- `--gavia-mint`: `#3FD5AD` (brand vurgu, CTA, hover)
- `--gavia-mint-bright`: `#4FE5BD` (CTA hover state)
- `--gavia-mint-glow`: `rgba(63, 213, 173, 0.12)` (subtle bg tint)
- `--gavia-light`: `#E9EEF1` (alternatif light section)
- `--gavia-white`: `#FFFFFF`
- `--gavia-muted`: `#6B7280` (gri text, captions)
- `--gavia-border`: `#1F2740` (subtle border on dark)

### Semantic
- text-primary on dark: white
- text-primary on light: `#020837`
- text-secondary on dark: `#9CA3AF`
- text-secondary on light: `#4B5563`

## Typography
- Heading (h1-h3): **Manrope** (Google Fonts)
  - h1 hero: weight 800, tracking -0.03em
  - h2 section: weight 700, tracking -0.02em
  - h3 card: weight 700
- Body & UI: **Geist** (Vercel CDN)
  - body: weight 400, line-height 1.6
  - emphasis: weight 500
  - button: weight 600
  - small/caption: weight 400, size sm

## Spacing & Layout
- max-width: 1280px (max-w-7xl)
- section padding: py-20 mobile, py-32 md+
- container padding: px-6 mobile, px-8 md+
- card gap: gap-6 mobile, gap-8 md+

## Border & Radius
- rounded-2xl (16px) cards
- rounded-full chips/badges
- rounded-lg (8px) inputs/buttons
- border-[#1F2740] dark subtle borders

## Motion (subtle)
- transition-all duration-300 ease-out hover
- hover:translate-y-[-2px] cards
- NO fancy animations Aşama A'da

## Supabase'ten Ödünç Pattern'lar
- Gradient text (hero başlık): mint → açık gradient
- Subtle dot pattern background (koyu section'larda)
- Two-tone cards: dark bg + mint glow on hover
- Sticky header: blur + opacity scroll'da artar
- Badge style: rounded-full, mint-glow bg, mint text, small caps
