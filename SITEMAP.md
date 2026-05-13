# Gavia 2026 — Site Haritası

**Yaklaşım:** Minimalist 5 sayfa (Antigravity / Apple tarzı). Servisler ayrı sayfa değil — Home + Studio içinde anlatılıyor. Bu, premium studio konumlandırmasını destekler.

---

## Görsel Harita

```
                          ┌──────────────┐
                          │      /       │  HOME
                          │   manifesto  │
                          │  + agent demo│
                          └──────┬───────┘
                                 │
            ┌────────────┬───────┼───────┬────────────┐
            │            │       │       │            │
        ┌───▼────┐  ┌────▼───┐ ┌─▼────┐ ┌▼──────┐ ┌──▼─────┐
        │ /work  │  │/studio │ │ /lab │ │/career│ │/contact│
        │  list  │  │  team  │ │ AI   │ │ s     │ │ brief  │
        │        │  │+services│ │tools │ │       │ │ form   │
        └───┬────┘  └────────┘ └──────┘ └───────┘ └────────┘
            │
        ┌───▼────────┐
        │/work/[slug]│  case study (cinematic, scroll-driven)
        └────────────┘
```

---

## Sayfa Sayfa

### 1. `/` — Home
**Amaç:** İlk 5 saniyede "bu klasik ajans değil, AI-native studio" mesajını ver.

**Bölümler (scroll sırası):**
1. **Hero** — Canlı agent demo + manifesto cümlesi
   - Sol: büyük başlık ("We build software that thinks." veya TR varyantı)
   - Sağ: simüle edilmiş AI terminal (prompt yazıyor → kod/tasarım üretiyor, loop)
   - Arka plan: WebGL mesh gradient (mor-mavi)
2. **3 Hizmet Kartı** — Yapay Zeka · Yazılım · Mobile
   - Her kartta: kısa açıklama + 5-6 bullet + mikro illüstrasyon
   - Hover: kart hafifçe yükselir, accent rengi parlar
3. **Seçili 3 Work** — büyük thumbnail + proje adı + 1 satır özet
   - Hover: video önizleme veya parallax
4. **Lab Teaser** — "Kendi araçlarımızı yaparız" — son blog/tool 3 tanesi
5. **Müşteri Logoları** — koyu zemin üstünde soluk monokrom
6. **CTA + Footer** — "Bir fikrin mi var?" → /contact

### 2. `/work` — Works (Çalışmalar)
**Amaç:** Portföyü cinematic gösterimle anlat. Liste değil, deneyim.

**Bölümler:**
- Filtre çubuğu: All · AI · Web · Mobile · Brand
- Grid: 2 sütun, asimetrik (büyük-küçük-büyük-küçük)
- Her item: tam genişlik thumbnail, üzerinde proje adı + kategori chip
- Sonsuz scroll veya pagination (Faz 2'de karar)

### 3. `/work/[slug]` — Case Study
**Amaç:** Tek bir projeyi ürün gibi anlat.

**Bölümler:**
1. Hero (proje adı, müşteri, yıl, kategori, 1-satır özet)
2. Brief — sorun ne idi
3. Approach — nasıl çözdük (özellikle AI kullanıldıysa altını çiz)
4. Visuals — büyük ekran görüntüleri + parallax
5. Outcome — sonuç (metric varsa)
6. Next case → bir sonraki proje teaser

### 4. `/studio` — Studio (Hakkımızda + Manifesto + Servisler + Süreç)
**Amaç:** Şirketin kim olduğunu, nasıl çalıştığını, **neden AI-native** olduğunu anlat.

**Bölümler:**
1. Manifesto (uzun form metin, kinetic typography)
2. Ekip (foto + rol + 1 satır kişilik)
3. Servisler — derinleştirilmiş 3 ana hizmet (Home'daki kartların açılımı)
4. Süreç — 4-5 adım (Discover · Design · Build · Ship · Iterate)
5. Manifesto kapanış + CTA

### 5. `/lab` — Lab (AI deneyler, blog, açık kaynak)
**Amaç:** Gavia'nın diğer ajanslardan farkı burası. "Sadece kullanmıyoruz, üretiyoruz."

**Bölümler:**
- Lab giriş paragraf
- Açık kaynak tool'lar (varsa) — GitHub linkleri, repo cardları
- Yazılar (uzun form notlar, deneyler)
- Açık deneyler — "şu an üzerinde çalıştığımız 3 AI deneyi"

### 6. `/careers` — Kariyer (basit)
**Amaç:** Yetenek çekme. Eğer açık pozisyon yoksa "her zaman ilginç insanlarla konuşuruz" maili.

**Bölümler:**
- Çalışma kültürü 1 paragraf
- Açık pozisyonlar listesi (yoksa "Open application")
- Mail link veya basit form

### 7. `/contact` — İletişim
**Amaç:** Brief alımı + iletişim. AI-powered olabilir.

**Bölümler:**
- Sol: "Projeni anlat" — multi-step form (bütçe, zaman, tip, brief metni)
  - **AI assist:** kullanıcı brief yazarken yan tarafta "şunu sormamızı bekleriz" listesi otomatik güncellenir (LLM call)
- Sağ: doğrudan iletişim (mail, telefon, ofis adresi)
- Alt: harita veya ofis fotoğrafı

---

## Karar Notları

- **6 sayfa** — Home / Work (+ detail) / Studio / Lab / Careers / Contact
- **Lab kritik** — Gavia'yı diğerlerinden ayıracak imza sayfa
- **UX/UI ayrı sayfa değil** — Studio içinde, Yazılım hizmetinin alt-bullet'ı
- **Blog ayrı sayfa değil** — Lab içine yedirildi
- **Servisler ayrı sayfa değil** — Home (özet) + Studio (detay) yeterli, ekstra sayfa SEO sapması olmadan kapanabilir

---

## Faz 1 Patron Sunumu için Prototip Kapsamı

Patron sunumunda **tek HTML dosya** içinde şunlar görünecek:
- Hero (manifesto + agent demo simülasyonu)
- 3 hizmet kartı (AI · Yazılım · Mobile)
- Works teaser (3 proje placeholder)
- Lab teaser (1 paragraf + 2 kart)
- Footer

Diğer sayfalar Faz 2'de tam tasarlanacak — patron önce **dil ve hissi** görmeli.
