# Gavia Works 2026 — Faz 2 Uygulama Planı

## 1. Hedef
İlk turda 2 sayfa (Ana Sayfa + Hizmetler) teslim et, Yasin Bey'e göster, onay alınca diğer sayfaları çoğalt.

## 2. Klasör Yapısı (prototypes/ altı)

```
prototypes/
├── index.html
├── hizmetler.html
└── assets/
    ├── logo/
    │   └── gavia-logo.png (mevcut)
    ├── css/
    │   └── brand.css (font-face + custom CSS)
    ├── js/
    │   └── main.js (mobile menu, smooth scroll)
    └── img/
        └── placeholders/ (geçici görseller)
```

## 3. Tailwind Config (CDN custom config)
Her HTML'in head'inde inline config:
- Custom colors: `gavia-deep` (#020837), `gavia-night` (#141533), `gavia-mint` (#3FD5AD), `gavia-light` (#E9EEF1), `gavia-dark` (#0A0E27)
- Font family: Manrope (heading), Geist (body) — Inter çıkarıldı, frontend-design skill kuralı + generic algıdan kaçınma
- Breakpoint'ler default (sm 640, md 768, lg 1024, xl 1280, 2xl 1536)

## 4. Component Sırası (Implementation Order)

### Ana sayfa (index.html) — bölüm sırası
1. Header (sticky, logo + menü + CTA)
2. Hero (koyu zemin, büyük başlık, alt metin, 2 CTA)
3. "Ne Yapıyoruz?" 4 hizmet kartı (açık zemin)
4. Yapay Zekâ section (koyu, 5 AI çözümü preview)
5. Ürün ailesi vitrin (koyu, 4 ürün + "Yakında" badge)
6. Sürdürülebilirlik kısa blok (açık)
7. Sektör chip blok (mint accent)
8. CTA bandı (Proje / AI Analiz Formu)
9. Footer (mega koyu, 4 kolon)

### Hizmetler sayfası (hizmetler.html) — bölüm sırası
1. Header (ortak)
2. Hizmet hero (sayfa başlığı + alt metin)
3. Özel Yazılım Sistemleri (5 alt başlık kart grid)
4. Mobil Uygulama Geliştirme
5. Sistem Entegrasyonları
6. Bulut, Altyapı ve Güvenlik
7. CTA bandı
8. Footer (ortak)

## 5. Dosya Dosya Tahmini İmplementasyon Adımları

### Adım 1: Brand altyapısı
- assets/css/brand.css yaz (font-face, custom utility class'ları)
- assets/logo/ logosu mevcut, dokunma
- Test HTML ile renk/font kontrolü

### Adım 2: Header + Footer component yapısı
- HTML olarak duplicate ama yapısal olarak temiz
- Mobil menü için minimal JS (assets/js/main.js)

### Adım 3: index.html
- Yukarıdaki 9 bölümü sırayla yaz
- Her bölüm için placeholder copy + TODO comment
- Responsive test: 360/768/1280/1920

### Adım 4: hizmetler.html
- Header/footer kopyala
- 4 hizmet bölümünü yaz
- CTA bandı ekle

### Adım 5: Tarama ve temizlik
- grep "TODO: Yasin Bey" sayım yap
- HTML W3C validate (basit)
- Linkler kırık mı kontrol et

## 6. Risk Listesi
- Yasin Bey "logo değişsin" derse Aşama A scope dışı
- Renk paleti onayı plan onayında alınmazsa iki kere iş yapılır
- Placeholder copy çok jenerik olursa "boş" hissi verir → site-map.md cümleleri kullanılarak somutlaştırılacak

## 7. Tahmini Süre
- Adım 1-2 (brand + header/footer): ~1 saat
- Adım 3 (index): ~3-4 saat
- Adım 4 (hizmetler): ~1-2 saat
- Adım 5 (tarama): ~30 dk
- Toplam ilk tur: ~6-8 saat (1 iş günü)

## 8. Henüz YAPILMAYACAKLAR
- 5 diğer sayfa (Yapay Zekâ, Ürünler, Sürdürülebilirlik, Gavia, İletişim)
- Gerçek görsel/illustration üretimi (placeholder yeterli)
- Form submit handling (frontend only, action="#")
- Backend API çağrıları
- Analytics, çerez banner
- SEO meta tag derinleştirme (basic yeter)
- Görsel optimizasyon (webp, lazy load — Aşama B)

## 9. Onay Bekleyen Kararlar (Yasin Bey)
1. Logo SVG var mı?
2. Mint #3FD5AD resmi marka rengi mi?
3. "Yakında" ürün yaklaşımı OK mi?
4. Sektör chip listesi netleştirme
