# Fantasy.co — Bottom Reveal Pattern Tokens

## Signature Patterns (the 3 critical visual codes)

1. **Bottom gradient fade on media section**: `:after` pseudo-element
   - `.media-hero__media:after`: linear-gradient(to bottom, transparent 0%, var(--background) 100%); height 50%
   - `.case-full__content:after`: linear-gradient(180deg, transparent, rgba(0,0,0,.6)); height 48rem
   - `.sf__gradient:after`: linear-gradient(180deg, transparent, rgba(0,0,0,.85)); height 50rem
   - Purpose: smoothly transition the video background INTO the next section's background color, killing the hard-cut seam
   
2. **Light contrast panel as footer** (the "let's talk" reveal):
   - Footer bg: white/light (bg-white in fantasy; using gavia-light for us)
   - Text: dark/black
   - HUGE top padding (pt-300/185/270 in tailwind = ~480/296/432px) — creates breathing room and "fade-up" feel
   - Big heading: `Let's talk. <em>We'd love<br></em><em>to hear from you.</em>` — italic emphasis on the soft second line
   - Single solid dark button: "Contact"
   - Thin `<hr class="border-black/10">` separator
   - Alt bar: copyright (left) + legal links (right)
   
3. **Footer structural rhythm**:
   - flex-col items-start gap-y-32 — left aligned, content stacks
   - HR full-width
   - Bottom bar: flex justify-between, body-small, py-24

## Effective Body Font
Loaded: System font stack (no Google Fonts beyond the built-in Nuxt assets)
Effective: -apple-system, sans-serif (or similar default)
Note: gavia uses `Geist` body — KEEP, no change. Only apply structural+color pattern.

## Spacing Scale (rem)
- xs: 0.6 / 0.8 / 1.0
- small: 1.4 / 1.6 / 1.8 / 2.0
- medium: 2.4 / 3.0 / 3.2 / 4.0 / 4.8
- large: 5.6 / 6.4 / 7.5 / 8.0 / 9.0 / 9.6 / 12.0 / 14.0
- xlarge (huge padding for reveal): 18.5 / 22.5 / 27.0 / 30.0 (rem)

## Application to gavia-2026 (MODE B)
- KEEP CTA section content + video bg
- ADD: bottom gradient (fading video to gavia-light)
- CHANGE footer: bg gavia-deep → gavia-light, invert logo, swap text colors to dark
- KEEP all Gavia copy + structure (logo, tagline, social, mailto, legal)
