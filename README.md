# Gavia 2026 — Website Redesign

Gavia Works ana web sitesinin yeniden konumlandırması ve yeniden tasarımı.

**🔗 Canlı önizleme:** https://by4r.github.io/gavia-2026/

**Karar veren:** Yasin Bey (patron) · **Yürüten:** Beyar Güneş · **Tarih:** 2026-05-13

---

## Hızlı bakış

- **Pozisyon**: AI-native creative studio (klasik ajans değil)
- **3 hizmet**: Yapay Zeka · Yazılım · Mobile App
- **Renk paleti**: deep navy + mint accent (Gavia logosundan)
- **Tipografi**: Fraunces (italic display) + Manrope (body) + JetBrains Mono
- **Faz**: 1 — patron sunum prototipi (tek HTML dosyası)
- **Sonraki**: Faz 2'de Next.js 15 + Tailwind v4 + Framer Motion'a taşınacak

> 🤖 Proje hafızası ve karar logu: [CLAUDE.md](CLAUDE.md) — Claude Code session'ları arasında durumu korur.

---

## Yeni Pozisyon

> **AI-native creative studio** — klasik "dijital ajans" değil. Yazılım, mobil ve yapay zeka üreten bir studio. AI kullandığımız her sayfada hissedilecek.

## 3 Ana Hizmet (Yasin Bey ile kesinleşti)

1. **Yapay Zeka** — LLM Integration, Agent / Workflow, Custom AI Tools, RAG, Voice & Vision
2. **Yazılım** — Frontend, Backend, UX/UI, CMS, Responsive, DevOps
3. **Mobile App** — iOS, Android, Flutter, Design, Distribution

> Eski sayfadaki **E-Marketing · Digital Media Management · Strategy & Marketing · UX/UI (ayrı kart)** kaldırıldı.

## Faz Planı

### Faz 1 — Patron Sunumu (BUGÜN)
- [x] Klasör yapısı kuruldu
- [x] SITEMAP.md
- [ ] `prototypes/v1/index.html` — tek dosya HTML prototip (Hero + 3 hizmet + Works teaser + Lab teaser)
- [ ] Patron onayı

### Faz 2 — Tam Prototip (1 hafta)
- [ ] Home + Work list + Work detail + Studio + Lab + Contact (hepsi static HTML)
- [ ] Design token'lar finalize (renk, tipo, spacing)
- [ ] 2. tur patron onayı

### Faz 3 — Production (2-3 hafta)
- [ ] Next.js 15 + Tailwind v4 + Framer Motion + GSAP migration
- [ ] CMS karar (Sanity / Payload / başka)
- [ ] Custom AI tool entegrasyonları (⌘K AI search, hero agent demo)
- [ ] Vercel deploy + domain swap

## Teknoloji Stack (öneri, Faz 3'te kesinleşir)

- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion + GSAP ScrollTrigger
- **3D / Shader:** OGL veya Three.js (hero için)
- **CMS:** Sanity v3 (most likely — Payload alternative)
- **Hosting:** Vercel
- **Analytics:** Plausible veya PostHog

## Referans Sistemi

Görsel ve etkileşim ilhamı için 3 birincil + 5 ikincil referans var. Detaylar: [moodboard/refs.md](moodboard/refs.md)

## Görsel Varlık Durumu (Patron Soracak)

### Hazır ✅
- **Proje kapakları (3)** — Icmas Academy, Fresh Selective, Gücümüz Bir → `prototypes/v1/assets/works/` altında, mevcut gaviaworks.com panelinden çekildi
- **Marka renkleri** — navy + mint, mevcut logodan doğrulandı

### Faz 2'de Karar Verilecek (Patron Tartışması)
- **Hero / Studio atmosfer görselleri** — şu an CSS animasyonlu mesh gradient kullanıyor (intentional, AI-native hissi için). 3 alternatif:
  1. **Mevcut gibi devam** (gradient + animasyon, görsel yok) — en cesur, en "AI-forward"
  2. **Ekip / stüdyo çekimi** — yeni profesyonel çekim gerekir (1 günlük shoot, fotoğrafçı bütçesi)
  3. **AI-generate edilen art direction görselleri** — Midjourney / Flux ile soyut, marka renklerine uyumlu kompozisyonlar (en hızlı, en AI-uyumlu)
  **Önerim:** 1+3 hibrit — ana sayfa gradient ile aksın, Studio sayfasında ekip için 2 (sahici çekim) veya 3 (AI-generate) eklensin
- **Diğer 9 proje kapağı** — Aselsan, Antalya Bilim Üni, High Tech Port, Global Sat Show, Tokal CRM, Qatar Air Show, Trakya Turizm, Turkey Expo Kuveyt, Next Big Move. /work sayfasında Faz 2'de görünecek, görseller hazır (mevcut sitede var, indirilir)
- **AI / Lab kategorisi proje görselleri** — Gavia'nın AI işleri henüz yok / mevcut sitede gösterilmemiş. **Yasin Bey'e sorulacak:** ya 1-2 internal AI çalışma sergileniyor ya da Lab sayfasında "yakında" ile başlanacak

### Faz 3 (Production)
- Tüm görseller CMS (Sanity / Payload) üzerinden yönetilecek
- Hero arka planına opsiyonel WebGL shader eklenebilir (Three.js / OGL)

## Klasör Yapısı

```
gavia-2026/
├── README.md              ← bu dosya
├── SITEMAP.md             ← site haritası + her sayfanın amacı
├── prototypes/
│   └── v1/
│       └── index.html     ← Faz 1 patron sunum prototipi
├── moodboard/
│   └── refs.md            ← referans linkler + neyi çalacağız
└── notes/
    └── decisions.md       ← karar logu (neden Sanity, neden koyu mod vs.)
```
