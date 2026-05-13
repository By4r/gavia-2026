# Gavia Works — Mevcut Görsel Kimlik Audit'i

> Kaynak: gaviaworks.com (canlı), assets/css/style.css raw analiz, logo dosyaları (header/footer/favicon indirildi → `prototypes/assets/logo/`).
> Tarih: 2026-05-13

---

## 1. Renk Paleti (CSS Raw Analizi)

### Birincil Marka Renkleri
| Renk | Hex | Kullanım | Sıklık |
|------|-----|----------|--------|
| **Mint / Teal** | `#3FD5AD` (~`#3FD5AE`) | Accent — link, vurgu, hover, banner sosyal ikon, ayraç | ÇOK YÜKSEK |
| **Lacivert (deep navy)** | `#020837` / `#010737` | Heading, başlık, primary text, button border | ÇOK YÜKSEK |
| **Koyu lacivert (header bg)** | `#141533` | Header arka planı, koyu section | YÜKSEK |
| **Açık zemin (body bg)** | `#E9EEF1` | Body, section default arka plan | ÇOK YÜKSEK |

### İkincil / Destek Renkler
| Renk | Hex | Kullanım |
|------|-----|----------|
| Cyan | `#00A5D5` / `#11A7D7` | İkincil accent, mini bandlar |
| Muted blue-grey | `#D0DCDE` | Açık text, muted paragraf |
| Açık beyaz | `#E9EFF0` / `#E9EFEF` | Koyu section'da text/link |
| Siyah | `#000000` | Bazı block bg |
| Koyu gri | `#404040`, `#23292F` | Footer / dark utility |

### Renk Sıklığı (en çok kullanılan 5)
1. `#E9EEF1` — açık zemin (body)
2. `#020837` / `#010737` — lacivert (text + heading)
3. `#3FD5AD` — mint accent (brand signature)
4. `#141533` — koyu lacivert (header / dark section)
5. `#D0DCDE` — muted

**Karakter:** İki ana ton — koyu lacivert + mint — tüm marka kimliğini taşıyor. Logo da bu iki rengin görsel kondensesi (beyaz wordmark + mint kare).

---

## 2. Tipografi

### Font Ailesi: **Queulat** (proprietary, OTF format — Google Fonts DEĞİL)
- `QueulatBold` — gövde default
- `QueulatAlt-Black` — başlık (display)
- `Queulat-Medium` — alt başlık, body
- `Queulat-Black` — büyük display
- `Queulat-BoldItalic` / `Queulat-MediumItalic` — vurgu

**Self-hosted** olarak `/assets/Font/` ve `/assets/Fonts-2/` altında barındırılıyor. Lisans/kaynak belirsiz.

### Font Weight'leri
- 400 (varsayılan) — body
- 800 — header link, çoğu vurgu
- "Black" weight — büyük başlıklarda

### Font Size Hiyerarşisi (CSS'ten örnekler)
- H1 / Hero başlık: **55px** (banner, section başlığı)
- Section başlık (h2 eq.): **42-50px**
- Sub-heading: **36-40px**
- Büyük link/CTA: **25-26px**
- Body / paragraf: **15-18px**
- Mini text: **13px**

**Karakter:** Block sans-serif, çok kalın (800 / Black weight default). Modern ama Queulat 2010'ların geometrik sans family'si — 2026 standardında "yenilenmesi gereken" hissiyatı veriyor (örn. Inter, Manrope, Geist daha çağdaş).

---

## 3. Görsel Dil

### Logo
- **Format:** Wordmark — "GAVIA" yazısı beyaz + sağ üst köşede mint yeşili **küçük kare blok** (aksan)
- **Mint kare**: yaklaşık 12-15px boyutta, brand signature
- **Logo dosyaları** indirildi:
  - `prototypes/assets/logo/gavia-header.webp` (header'da daha geniş render — neredeyse sadece kare görünüyor; muhtemelen wordmark beyaz olduğu için beyaz bg'de kaybolur)
  - `prototypes/assets/logo/gavia-footer.webp` (siyah/koyu bg üzerinde tam wordmark net görünüyor)
  - `prototypes/assets/logo/favicon.png`

### İkon Stili
- Bootstrap icons + bazı inline SVG karışık
- Sosyal medya: line / outline ikonlar (klasik)
- Custom illustration YOK — fotoğraf ve placeholder ağırlıklı

### Görsel Kullanım
- **Fotoğraf ağırlıklı** — çalışma kartlarında proje screenshot'ları
- Owl Carousel (slider) ve Slick Carousel — eski jQuery ekosistemi
- AOS animasyon kütüphanesi (scroll reveal) kullanılmış

### Border-Radius
- Genel: **5px** (çok az köşe yuvarlatması — neredeyse köşeli)
- Yuvarlak elemanlar: **50%** (sosyal ikon daireleri, avatar)
- **Karakter:** Köşeli / minimal yuvarlama — kurumsal, sade

### Shadow / Depth
- Box-shadow yok (sadece `0 0 0 0.25rem rgba(0,0,0,0)` resetleri var)
- **Flat tasarım** — katmanlı / glassmorphism / neumorphism YOK

### Animasyon
- AOS (Animate On Scroll) — fade-up, fade-in, zoom-in
- Owl/Slick carousel — proje vitrini
- Çok ağır mikro-etkileşim YOK

---

## 4. Genel Karakter

| Boyut | Değerlendirme |
|-------|---------------|
| **Marka tonu** | Corporate-leaning agency — "creative digital agency" söylemi, ama görsel olarak teknik/sade |
| **Yaş** | 2018-2020 tasarım dili. Bootstrap 4-5 + Owl + AOS kombinasyonu klasik o dönem stack'i. 2026 için **eski** |
| **Sektör hissi** | Geleneksel dijital ajans (web + medya + mobil). "AI yazılım stüdyosu" değil. |
| **Güçlü yan** | Mint + lacivert kombinasyonu **gerçekten iyi** — tanınabilir, fresh, kurumsal-modern dengesi |
| **Zayıf yan** | Tipografi (Queulat eski), büyük block heading'ler agresif, layout boşluk yönetimi mütevazı, micro-interaction yok |

---

## 5. SONUÇ: Üç Kritik Soruya Cevap

### 5.1 "Mevcut görsel kimlik korunmalı mı, kırılmalı mı, evrilmeli mi?"

**EVRİLMELİ.** (Tam koruma değil, tam kırma değil.)

**Korunması gerekenler (marka equity):**
- ✅ **Mint yeşili `#3FD5AD`** — bu rengin tanınmışlığı bırakılmamalı. Yeni paletin de **brand-defining accent**'i olmalı.
- ✅ **Lacivert `#020837` / `#141533`** ailesi — kurumsal güveni veriyor, korunsun.
- ✅ **Logo wordmark + mint kare aksan** — değişmesin (zaten Yasin Bey'e sormamız gereken bir soru).

**Kırılması gerekenler (modernize):**
- ❌ Queulat fontu — 2026'ya uygun değil. Inter / Manrope / Geist gibi modern sans family ile değiştir.
- ❌ Owl/Slick/AOS jQuery stack — modern CSS (Tailwind) + minimal JS yeterli.
- ❌ Hero'daki 55px block heading agresifliği — modern tipografide daha hava'lı, daha büyük (display 72-96px) + ince tracking.
- ❌ Sayfa içi boşluk yönetimi — generous whitespace ile yeniden.

### 5.2 "Yeni vizyon (AI destekli yazılım stüdyosu) mevcut görselle ne kadar uyumlu?"

**Kısmen uyumlu.**

- Mint + lacivert palet, AI/tech konumlandırmasına **çok iyi gider**. Mint'in "fresh tech / akıllı sistemler" çağrışımı zaten var (Linear, Vercel, modern dev tools'taki teal aksanlara benziyor).
- Sorun: tipografi ve layout dili **ajans çağrışımı** veriyor. AI stüdyosu için daha temiz, daha sistematik, daha "yazılım ürünü" hissiyatı lazım.
- **Sonuç:** Renk korunarak, tipografi ve layout dili yenilendiğinde, mevcut paletin AI stüdyosu kimliğine **doğal evrim** yaratacağını öngörüyorum.

### 5.3 "Koyu zemin + neon accent yönü mevcut kimlikle çatışır mı?"

**Hayır, ÇATIŞMAZ — aksine zaten yarı orada.**

- `#141533` zaten koyu navy zemin. Site header bu rengi kullanıyor.
- `#3FD5AD` mint zaten neon'a yakın (parlak ve doymuş). Saf "neon green" değil ama **akıllıca seçilmiş**: corporate + tech dengesi var.
- Eğer Yasin Bey koyu zemin yönü isterse: `#0A0E27` (slightly darker navy) + `#3FD5AD` (mevcut mint) + beyaz text → mevcut kimliğin **doğrudan derinleştirilmiş hali** olur. Marka değiştirilmeden modernize edilir.

---

## 6. Tasarım Yönü Önerisi (research.md güncellemesi)

research.md'deki 3 palet alternatifini şöyle revize etmek lazım:

### Palet (a) — KOYU NAVY + MEVCUT MINT (önerilen baseline)
- BG: `#0A0E27` (mevcut `#141533`'ün biraz daha derini) / surface `#141533`
- Accent: `#3FD5AD` (DOKUNMA — marka mint'i)
- Secondary accent: `#00A5D5` (mevcut cyan, ikincil)
- Text: `#F5F7FA` / muted `#D0DCDE`
- **Karakter:** AI/tech, modern, mevcut kimliğin derinleştirilmiş hali

### Palet (b) — AÇIK ZEMİN + MINT (mevcut light section'ları modernize)
- BG: `#FFFFFF` (mevcut `#E9EEF1` yerine daha temiz)
- Surface: `#F4F6F8`
- Primary text: `#020837` (mevcut lacivert)
- Accent: `#3FD5AD` (mint, korundu)
- **Karakter:** Netguru tarzı temiz + Gavia kimlikli

### Palet (c) — HİBRİT (önerilen — Netguru pattern'ı)
- Hero ve CTA section'lar: KOYU (palet a)
- Body section'lar: AÇIK (palet b)
- Her ikisinde de mint `#3FD5AD` ortak köprü
- **Karakter:** Hem dramatik hem okunaklı, mevcut kimliğin tam ölçekli evrimi

**Önerim:** Palet (c) hibrit — Yasin Bey'e bu yaklaşımı sunalım.

---

## 7. Aksiyon Önerisi

1. **Logo:** Mevcut wordmark + mint kare AYNEN kullanılabilir. Yasin Bey'e sor: SVG versiyonu var mı? (`.webp` yerine `.svg` lazım — vektörel ölçeklenir.)
2. **Renk paleti:** Yukarıdaki Palet (c) hibrit yaklaşımı tasks/research.md'ye yansıtılsın.
3. **Tipografi:** Queulat bırak. Önerim **Manrope** (display) + **Inter** (body). Türkçe karakter desteği temiz, modern, ücretsiz.
4. **Tasarım dili:** Flat korunsun (kimlik bu), ama whitespace + tipografi nefes alsın. Micro-interaction (hover lift, fade-in) eklenebilir.
5. **Patrona soru:** "Mint + lacivert paleti koruyup, tipografi ve layout dilini modernize etmemizi onaylar mısın? Logo wordmark aynen kullanılacak."

---

## 8. Açık Sorular (Yasin Bey'e)

1. Logo SVG versiyonu var mı? (Webp/PNG yerine.)
2. Mint `#3FD5AD` resmi marka rengi mi, yoksa o da değişebilir mi?
3. Queulat fontunun lisansı var mı yoksa değiştirmemizde sakınca yok mu?
4. "GAVIA" wordmark'ı "Gavia Works" olarak mı yazılsın, yoksa sadece "GAVIA" mı kalsın?
