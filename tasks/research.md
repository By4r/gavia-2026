# Gavia Works 2026 — Faz 1 Araştırma Raporu

> Kaynak: tasks/site-map.md + CLAUDE.md + benchmark site bilgisi (Netguru, Itransition, Softtech, Etiya, Innova).
> Bu rapor implement öncesi referans dokümandır. Annotate edilecek.

---

## 1. Sayfa Envanteri

### 1.1 Ana Sayfa (`index.html`)
- **Amaç:** Gavia Works'ün ne yaptığını 10 saniyede anlatmak, ziyaretçiyi hizmet/ürün/AI/iletişim sayfalarından birine yönlendirmek.
- **Ana mesaj:** "AI destekli özel yazılım ve dijital ürün stüdyosu — sıfırdan kurguluyor, ölçeğe taşıyoruz."
- **Bölümler (yukarıdan aşağıya):**
  1. Header (sticky)
  2. Hero — büyük başlık + alt metin + 2 CTA (Projenizi Anlatalım / Ürünleri Keşfet)
  3. Gavia kısa tanıtım (3-4 cümle, kim/ne/neden)
  4. Öne çıkan hizmetler (4 kart: Özel Yazılım | Mobil | Sistem Entegrasyonu | Bulut & Güvenlik)
  5. Yapay Zekâ çözümleri preview (5 kart) → "Tümünü gör" linki /yapay-zeka
  6. Gavia ürün ailesi (CRM, Flow, Assistant, Insight) → 4 kart, "Coming Soon" rozeti
  7. Sürdürülebilir teknoloji kısa blok (manifesto tonu)
  8. Sektör chip blok (sayfa değil, tek satır chip listesi)
  9. AI Analiz Formu CTA bandı (büyük section, lead magnet)
  10. İletişim çağrısı (mini form veya CTA)
  11. Footer
- **Uzunluk:** UZUN (8-10 ekran scroll)

### 1.2 Gavia (`gavia.html`)
- **Amaç:** Şirketi tanıtmak, vizyon/misyon/yaklaşım toparlamak. Klasik "Hakkımızda" yerine modern stüdyo manifestosu.
- **Ana mesaj:** "Sadece yazılım yazmıyoruz; analizden ölçeğe kadar dijital dönüşümün her halkasını kuruyoruz."
- **Bölümler:**
  1. Hero (sade, manifesto cümlesi)
  2. Gavia Works Kimdir? (paragraf + opsiyonel rakamlar)
  3. Ne Yapıyoruz? (kısa hizmet özeti, 4 kart kullanılabilir)
  4. Nasıl Düşünüyoruz? (3-4 prensip ikonlu)
  5. Gavia Yaklaşımı — 6 adımlı süreç timeline (Analiz → Tasarım → Yazılım → AI → Sürdürülebilirlik → Ölçek)
  6. Neden Gavia? (5 başlık ikon+başlık+1 cümle)
  7. CTA bandı (Projenizi Anlatalım)
  8. Footer
- **Uzunluk:** ORTA (5-6 ekran)

### 1.3 Hizmetler (`hizmetler.html`)
- **Amaç:** 4 ana hizmet kategorisini detaylandırmak, scope göstermek, lead form'a taşımak.
- **Ana mesaj:** "İhtiyacın hangi katmanda? CRM'den buluta kadar her katmanı kuruyoruz."
- **Bölümler:**
  1. Hero (kısa, "Hizmetlerimiz")
  2. Hizmet özeti — 4 anchor link kart (sayfa içi nav)
  3. **3.1 Özel Yazılım Sistemleri** — alt başlıklı blok (CRM | ERP | Portal | Yönetim Paneli | E-Ticaret) — 5 sub-kart
  4. **3.2 Mobil Uygulama Geliştirme** — kullanım senaryoları + teknoloji rozetleri
  5. **3.3 Sistem Entegrasyonları** — entegre edilen sistemler grid
  6. **3.4 Bulut, Altyapı ve Güvenlik** — özellik listesi + KVKK vurgusu
  7. Süreç/yaklaşım kısa blok (Gavia sayfasına link)
  8. CTA bandı (Teklif Al)
  9. Footer
- **Uzunluk:** UZUN (sayfa içi anchor nav kritik)

### 1.4 Yapay Zekâ (`yapay-zeka.html`)
- **Amaç:** AI'ı kuru "feature" olarak değil, dönüşüm hikâyesi olarak satmak. Lead magnet: AI Dönüşüm Analizi.
- **Ana mesaj:** "AI'ı şirketinize değil, şirketinizin AI'ını tasarlıyoruz."
- **Bölümler:**
  1. Hero (güçlü, görsel: nöral grafik / data flow)
  2. AI ile neyi çözüyoruz? (problem framing, 3 cümle)
  3. **4.1 AI Destekli Otomasyonlar** — kullanım senaryoları grid
  4. **4.2 AI Agent ve Dijital Asistanlar** — kanallar (Web / WhatsApp / CRM) ikonlu kart
  5. **4.3 Veri Analitiği ve Akıllı Raporlama** — dashboard mockup placeholder
  6. **4.4 Belge Zekâsı ve İçerik Otomasyonu** — input→output diyagramı
  7. **4.5 AI Entegrasyonları, Güvenlik ve Etik Kullanım** — KVKK / insan onaylı blok
  8. Entegrasyon ekosistemi logo bandı (OpenAI / Azure / Google placeholder)
  9. **AI Dönüşüm Analizi formu** (büyük section, sayfanın peak CTA'sı)
  10. Footer
- **Uzunluk:** UZUN (en içerik yoğun sayfa)

### 1.5 Ürünler (`urunler.html`)
- **Amaç:** Gavia'nın kendi ürün ailesini vitrinlemek. Şu an "coming soon" durumu olduğu için beklenti yönetimi.
- **Ana mesaj:** "Sektör bağımsız, modüler, AI-native ürünler."
- **Bölümler:**
  1. Hero (ürün ailesi tanıtımı)
  2. Ana Vitrin — 4 büyük ürün kart (CRM | Flow | Assistant | Insight) — "Coming Soon" rozeti + bekleme listesi CTA
  3. Geliştirilen Çözümler alt blok (Commerce | ESG | Portal) — daha küçük 3 kart
  4. Ortak özellikler (modüler / AI-native / KVKK / cloud) — 4 ikon
  5. Demo Talep Et CTA bandı
  6. Footer
- **Uzunluk:** ORTA (4-5 ekran)

### 1.6 Sürdürülebilirlik (`surdurulebilirlik.html`)
- **Amaç:** Marka değeri olarak ESG/sürdürülebilirlik perspektifi sunmak. Türk pazarında farklılaşma.
- **Ana mesaj:** "Sürdürülebilirlik bir CSR sayfası değil; kod, mimari ve AI seçimlerimizin parçası."
- **Bölümler:**
  1. Hero (manifesto tonu)
  2. **6.1 Dijital Verimlilik**
  3. **6.2 ESG ve Raporlama Sistemleri**
  4. **6.3 Sürdürülebilir Yazılım Mimarisi**
  5. **6.4 AI for Sustainability**
  6. **6.5 Sosyal Fayda Odaklı Teknoloji**
  - Her bölüm: başlık + 2-3 paragraf + ikon + opsiyonel mini görsel
  7. CTA bandı (ESG için Gavia ESG ürününe link)
  8. Footer
- **Uzunluk:** ORTA (5-6 ekran, içerik yoğun ama görsel hafif)

### 1.7 İletişim (`iletisim.html`)
- **Amaç:** Tüm lead form çeşitlerini tek yerde toplamak.
- **Ana mesaj:** "Doğru kapıdan gel."
- **Bölümler:**
  1. Hero (kısa)
  2. Form seçim grid — 4 kart (Projenizi Anlatalım / AI Dönüşüm Analizi / Demo Talep / Teklif Al)
  3. Seçilen form — tab veya tek tek sayfa içi anchor
  4. İletişim bilgileri (adres, mail, telefon, sosyal medya)
  5. Harita (opsiyonel placeholder)
  6. Footer
- **Uzunluk:** KISA-ORTA (2-3 ekran)

---

## 2. Sayfa Önceliği

Öneri sıra (gerekçeli):

1. **Ana Sayfa** — site genelinin tasarım dilini, header/footer/section pattern'ını burada belirleriz. Onaylanırsa diğerleri 3x hızlanır.
2. **Hizmetler** — gelir motoru. Patron en çok bu sayfayı satıcı gibi inceleyecektir.
3. **Yapay Zekâ** — yeni konumlandırmanın bayrak sayfası. AI Dönüşüm Analizi formu burada.
4. **Ürünler** — ürün ailesi söylemi ne kadar oturmuş onu burada test edeceğiz. "Coming soon" sunumu kritik.
5. **Sürdürülebilirlik** — içerik bol, görsel hafif. Hizmet/AI'dan sonra rahat üretilir.
6. **Gavia** — şirket sayfası genelde son yapılır çünkü hero ve sayfa pattern'ı oturduktan sonra varyasyon olur.
7. **İletişim** — form pattern'ı diğer sayfalarda hazır olduğunda burası mekanik.

**Alternatif yaklaşım:** Önce sadece Ana Sayfa + Header/Footer + 1 component-rich iç sayfa (Hizmetler) üretip patrona onaylatmak. Onay sonrası diğerleri kopya-iterate ile hızlı.

---

## 3. Component Listesi

### Layout / Chrome
- `Header` — logo solda, ana menü ortada, sağda "Projenizi Anlatalım" CTA. Mobile'da hamburger.
- `Footer` — 4 kolon: (1) Marka + kısa açıklama (2) Hizmetler linkleri (3) Ürünler linkleri (4) İletişim + sosyal. Alt bant: telif + KVKK + çerez.
- `Mega menu` (opsiyonel, Itransition tarzı) — Hizmetler/Yapay Zekâ/Ürünler için hover'da geniş açılır panel.

### Hero varyasyonları
- `Hero / text-only` — Gavia sayfası, Sürdürülebilirlik için
- `Hero / text + visual` — Ana sayfa, AI sayfası için (görsel: abstract gradient / network)
- `Hero / split` — Ürünler için (sol metin, sağ ürün screenshot mockup grid)
- `Hero / centered manifesto` — Sürdürülebilirlik için

### Kart / Tile
- `Service card` — ikon + başlık + 2 satır açıklama + "Detay →" link
- `Service detail block` — başlık + paragraf + alt bullet + opsiyonel görsel (Hizmetler içindeki alt-bölümler)
- `Product card` — ürün logo/ikon + isim + tek cümle + rozet (Coming Soon / Beta / Live) + "Bekleme listesi"
- `AI feature card` — 5'lik grid için kompakt: ikon + başlık + 1 satır
- `Sustainability block` — alternatif left/right görsel + metin
- `Sector chip` — pill butonu (Finans, Sağlık, Üretim, Lojistik, Eğitim, Kamu vb.)
- `Process step` — Gavia Yaklaşımı 6 adım için: numara + ikon + başlık + 1 cümle (horizontal timeline desktop / vertical mobile)
- `Stat card` — sayı + etiket (Gavia sayfasında opsiyonel: 50+ proje, 10+ yıl vb.)
- `Logo strip` — entegrasyon ekosistemi (gri-tonu logo bandı)

### Etkileşim
- `CTA banner` — full-bleed renkli section, başlık + 1 cümle + buton
- `Mini form` — ad + mail + 1 alan (footer / iletişim çağrısı)
- `Full form` — Projenizi Anlatalım, AI Analiz, Demo, Teklif. Multi-step opsiyonel.
- `Accordion` — Hizmetler alt başlıkları opsiyonel açılır
- `Tab` — İletişim sayfasında form seçimi için

### Yardımcı
- `Badge` — "Coming Soon", "Beta", "Yeni"
- `Icon stack` — Tailwind + Heroicons (CDN) önerisi
- `Breadcrumb` — iç sayfalarda opsiyonel
- `Anchor sub-nav` — Hizmetler ve Yapay Zekâ sayfalarında sticky alt nav

---

## 4. Tasarım Dili Önerisi

### 4.1 Renk Paleti — 3 Alternatif

**(a) Koyu zemin + neon accent — "AI/Cyber" tonu**
- BG: `#0A0A0F` (near-black)
- Surface: `#13131A`
- Primary accent: `#00E5A0` (mint/neon) veya `#7C5CFF` (mor)
- Text: `#F5F5F7` / muted `#9CA3AF`
- Risk: Türk kurumsal pazarında bazı segmentlere "çok teknik" gelebilir; ama AI konumlandırması için çok güçlü.
- **En yakın referans:** Netguru'nun bazı landing'leri, modern AI startup siteleri.

**(b) Beyaz zemin + canlı vurgu — "Netguru tarzı"**
- BG: `#FFFFFF`
- Surface: `#F7F7F8`
- Primary: `#0F0F0F` (siyah text)
- Accent: `#FF5722` veya `#3B82F6` veya `#22C55E`
- Text: `#0F0F0F` / muted `#52525B`
- En sıcak, en okunaklı, en B2B-friendly. **Öneri:** default olarak bu, hero'da koyu seksiyon ile kontrastlayalım.

**(c) Pastel kurumsal — "Itransition/Innova tarzı"**
- BG: `#FAFAFA`
- Surface: `#EEF2F6`
- Primary: `#1E3A8A` (deep blue)
- Accent: `#06B6D4` (cyan)
- Text: `#0F172A`
- En güvenli, en kurumsal. Ama bizim gibi yeni-stüdyo konumlandırmasına biraz "yaşlı" durabilir.

**Önerim:** (b) baseline, hero ve CTA section'larında (a)'dan koyu blok kullan. Karma yaklaşım Netguru'da görüldü ve çalışıyor.

### 4.2 Tipografi — 3 Alternatif

- **(α) Inter + JetBrains Mono accent** — modern, teknolojik, ücretsiz. Heading'de tight tracking + büyük weight (700-800).
- **(β) Manrope + Inter** — Manrope heading için karakterli, Inter body. Netguru benzeri "studio" havası.
- **(γ) IBM Plex Sans + IBM Plex Mono** — kurumsal-teknik dengesi, ücretsiz, çok dilli iyi (Türkçe karakterler temiz).

**Önerim:** (β) Manrope display + Inter body. Türkçe karakter desteği iyi, modern.

### 4.3 Referanslardan ne ödünç alınacak

- **Netguru** → Hero üslubu (büyük tipo, kısa cümle, scroll-spy CTA), ajans+ürün hibrit yapı, hizmet kartlarındaki "case study" tonu.
- **Itransition** → Mega menu yapısı (Hizmetler altında alt-bölümler hover'da görünsün), kurumsal başlık hiyerarşisi.
- **Softtech** → Ürün ailesi sunumu (Gavia CRM/Flow/Assistant/Insight için isim+slogan formatı), AI ürünlerinin manifesto cümleleri.
- **Etiya** → Ürün vitrin kart düzeni (büyük renkli kartlar, ürün ailesi grid'i).
- **Innova** → Türkçe kurumsal başlık tonu, sektör chip blok pattern'ı (Innova ana sayfasında benzer).

---

## 5. Teknik Yaklaşım

### 5.1 Tailwind CDN
- `<script src="https://cdn.tailwindcss.com"></script>` her sayfanın `<head>`'inde.
- Inline `tailwind.config = { theme: { extend: { colors: {...}, fontFamily: {...} } } }` script bloğu — palette + fontları tek yerden tanımla.
- Custom font: Google Fonts `<link>` CDN.
- Heroicons SVG inline kullanılacak (CDN paketleme yok, ikon başına inline `<svg>`).

### 5.2 Klasör Yapısı (prototypes/)
```
prototypes/
├── index.html
├── gavia.html
├── hizmetler.html
├── yapay-zeka.html
├── urunler.html
├── surdurulebilirlik.html
├── iletisim.html
└── assets/
    ├── img/        # placeholder görseller (placehold.co fallback)
    └── js/
        └── main.js # mobile menu toggle, anchor scroll
```
- CSS dosyası yok — Tailwind CDN + utility yeterli.
- Tek bir `main.js` paylaşımlı script (mobile menu, form submit dummy, anchor smooth scroll).

### 5.3 Component Partial Stratejisi
- **Şu an:** Partial sistemi YOK. Her HTML dosyası kendi içinde tam. Header/Footer kopyalanacak (kabul edilir bir cost — Aşama A iterasyon hızlı, Aşama B Laravel'e geçince Blade component'e dönüşecek).
- **Disiplin:** Header/footer değişirse tüm sayfalarda elle güncellenecek. 7 sayfa olduğu için kontrol edilebilir.
- **İleride (Aşama B):** Blade `@include('partials.header')` pattern'ı standart olacak.

### 5.4 Görsel Placeholder Stratejisi
- Tüm görseller `https://placehold.co/<WxH>/<bg>/<fg>?text=<label>` ile başlasın.
- Kare görsel: `<div style="background-image: url(...)" class="aspect-square bg-cover bg-center">`.
- 16:9 hero görsel: `aspect-video` + `bg-cover`.
- Görsel asla `<img>` ile kare gösterilmez (CLAUDE.md kuralı).
- Gerçek görsel Yasin Bey'den sonra gelecek — placeholder TODO yorumu HTML'e eklenmeyecek, sadece `tasks/todo.md`'de takip edilecek.

---

## 6. Riskler ve Açık Sorular

### 6.1 Yasin Bey'e Sorulacaklar (öncelik sırası)

1. **Renk paleti tercihi** — (a) koyu+neon AI tonu, (b) beyaz+vurgu Netguru tarzı, (c) pastel kurumsal Itransition tarzı? Hangisi Gavia ruhuna yakın?
2. **Logo** — mevcut Gavia logosu kullanılacak mı, yoksa bu rebrand'de logoya da dokunacak mıyız? Eğer mevcut ise SVG/PNG'sini istemek lazım.
3. **Tipografi yönü** — Manrope+Inter (β) önerisini onaylar mı, yoksa serif/karakterli bir başlık fontu mu istiyor?
4. **4 ürün için "Coming Soon" sunumu** — (a) tam vitrin + "Yakında" rozeti + bekleme listesi formu, (b) hafif gri/blur kart, (c) sadece isim + "tanıtım yakında" — hangisi?
5. **Sektör chip blokta hangi sektörler?** — öneri: Finans, Sağlık, Üretim, Lojistik, Perakende, Eğitim, Kamu, Enerji. Patron netleştirsin.
6. **Mega menu evet/hayır** — Itransition tarzı hover-mega menu yapalım mı, yoksa sade tek-seviye menü mü?
7. **Türkçe/İngilizce dil seçici** — şimdilik sadece TR mi, ileride EN eklenecek mi (URL yapısı buna göre)?
8. **Form arka uç** — Aşama A'da form butonları cosmetic (POST yok). Patron demoyu test ederken sahte teşekkür sayfası göstermek yeterli mi?

### 6.2 Teknik Riskler

- **Tailwind CDN production'a uygun değil** — Aşama C'ye geçerken build pipeline (Vite/PostCSS) kurmak gerekecek. Aşama A için sorun yok ama unutulmamalı (tasks/lessons.md'ye not).
- **7 sayfada header/footer duplikasyonu** — değişiklik maliyeti yüksek. Eğer iterasyon çok sık olacaksa basit bir build-time include script'i (Node `cat` veya el yapımı SSI) düşünülebilir. Şu an gerekmez.
- **Görsel toplamı** — gerçek görsel yoksa site cansız durabilir. En azından hero için iyi seçilmiş 3D/abstract bir görsel veya CSS gradient + grain pattern denenmeli.
- **GitHub Pages yol sorunu** — repo public path `/gavia-2026/` olduğu için tüm internal link'ler relative olmalı (`./gavia.html`), absolute (`/gavia.html`) çalışmaz Pages'da. Demo URL bozulmasın diye dikkat.

### 6.3 İçerik Riskleri

- Copy henüz yok. Placeholder Türkçe metin Yasin Bey'in onayına bağlı; ürettiğimiz metin tasarım için yer tutucu, **final değil**. Bunu sunumda açıkça söyleyeceğiz.
- Ürün isimleri (Gavia CRM/Flow/Assistant/Insight) onaylandı mı, yoksa hâlâ değişebilir mi? Onaylanmamışsa erken sahiplenme riski var.

---

## 7. Tavsiye Edilen İlk Tur Çıktısı

Patrona ilk gösterilecek paket:
- `index.html` (Ana Sayfa) — palette (b) ile + 1 hero seksiyonunda palette (a) koyu blok denemesi
- `hizmetler.html` (Hizmetler) — sayfa içi anchor nav + 4 alt bölüm
- Header + Footer ortak
- Mobile-first test edilmiş

Onay alınırsa 3-4 saatlik turlar halinde diğer 5 sayfa kopyalama-uyarlama hızında ilerler.

---

## 8. Açık TODO (rapor sonrası)

- [ ] Bu raporu Yasin Bey'e gönder veya özetle, palet/logo/tipografi cevabı al
- [ ] tasks/plan.md → bu rapordan implement planı çıkar
- [ ] tasks/todo.md → adım listesi (sayfa sayfa)
- [ ] design-research/ → benchmark screenshot'ları topla (manuel veya WebFetch ile gerekirse sonra)

---

## ANNOTATE NOTLARI (Beyar — Karar)

### Tasarım Yönü: EVRİLMELİ (audit kararı)
Mevcut Gavia kimliği korunacak ama modernize edilecek. Hibrit yaklaşım.

### Final Renk Paleti
- Ana koyu zemin: #020837 (Gavia lacivert)
- İkincil koyu: #141533 (section ayrımı)
- Brand mint (vurgu/CTA/hover): #3FD5AD
- Açık zemin (alternatif): #E9EEF1
- Saf beyaz: #FFFFFF
- Derin gri (mega koyu hero için): #0A0E27
- Neon ekstra rengi YOK — mint zaten yeterli parlaklıkta

Tailwind config'e custom color olarak eklenecek:
- `gavia-deep` (#020837)
- `gavia-night` (#141533)
- `gavia-mint` (#3FD5AD)
- `gavia-light` (#E9EEF1)
- `gavia-dark` (#0A0E27)

### Final Tipografi
- Heading font: **Manrope** (Google Fonts, weight 400/600/700/800)
- Body font: **Inter** (Google Fonts, weight 400/500/600)
- Mono font: gerek yok (Aşama A'da kod render yok)
- Queulat KALDIRILACAK (proprietary lisans, eski)

### Logo Stratejisi
- prototypes/assets/logo/ altındaki mevcut Gavia logosu KULLANILACAK
- PNG/JPG ise olduğu gibi kullan, SVG yoksa Yasin Bey'den iste
- "GAVIA" wordmark + mint kare aksan KORUNACAK

### Layout Yaklaşımı: Hibrit Koyu/Açık
- Hero: KOYU (#020837 veya #0A0E27)
- Hizmet kartları section: AÇIK (#E9EEF1 veya #FFFFFF)
- Yapay zekâ section: KOYU (#141533) — tech hissi için
- Ürünler vitrin: KOYU (#020837) gradient
- Sürdürülebilirlik: AÇIK (#FFFFFF)
- Footer: MEGA KOYU (#0A0E27)

Section'lar arasında geçişler smooth, mint accent köprü olarak kullanılır.

### Responsive Breakpoint
- Mobile-first (varsayılan < 640px)
- sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536
- max-w-7xl içerik genişliği, padding 6-8
- Test: 360px (iPhone SE), 1280px (laptop), 1920px (desktop)

### İlk Tur Teslim Scope (Faz 3)
SADECE bu 3 dosya teslim edilecek, gerisi sonra:
1. **prototypes/index.html** — Ana sayfa (tüm bölümler dahil)
2. **prototypes/hizmetler.html** — Hizmetler ana sayfa
3. **prototypes/assets/** — Logo, CSS, font, gerekli görseller

Diğer 5 sayfa (Yapay Zekâ, Ürünler, Sürdürülebilirlik, Gavia, İletişim) 
ikinci turda. Önce 2 sayfa Yasin Bey'e gösterilsin.

### Placeholder Copy Stratejisi
- Hero metinleri: site-map.md'deki "sayfa amacı" cümlelerinden türet
- Hizmet kartları: Alt başlıklardan 1 cümle özet
- Ürün kartları: "Yakında" badge + 1 cümle değer önerisi
- Form alanları: Türkçe, kurumsal, kısa
- TODO işaretleri: <!-- TODO: Yasin Bey copy --> HTML comment ile
- Final tarama: grep -r "TODO: Yasin Bey" prototypes/

### Yasin Bey'e Plan Onayında Sorulacak 4 Soru
1. Logo SVG var mı? (PNG kullanıyoruz şu an, SVG daha iyi olur)
2. Mint #3FD5AD marka rengi resmi mi, değişebilir mi?
3. "Coming soon" 4 ürün için yaklaşım: vitrin + "yakında" badge mi, gri mi?
4. Sektör chip listesi: hangi 6-8 sektör vurgulanacak (perakende, inşaat, denizcilik, eğitim, sağlık, kamu, üretim, medya — hangileri)?

### Component Yaklaşımı (Aşama A)
- Her HTML sayfası kendi içinde TAM (header/footer duplicate)
- Tailwind CSS CDN ile (build yok)
- Custom CSS sadece font-face + brand renkleri için (assets/css/brand.css)
- JS minimum (mobile menu toggle, smooth scroll, FAQ accordion varsa)
- Vanilla JS, jQuery YOK, framework YOK
