# Proje: Gavia Works 2026

## Temel
- Patron: Yasin Yavuz (Dada İstanbul)
- Hedef domain: gaviaworks.com
- GitHub repo: by4r/gavia-2026 (public, GitHub Pages aktif)
- Demo URL: https://by4r.github.io/gavia-2026/
- Konum: ~/Developer/Backend Projects/gavia-2026
- Mevcut eski site: https://gaviaworks.com (6 sayfalık ajans sitesi)
- Yeni konumlandırma: AI destekli özel yazılım + dijital ürün stüdyosu

## Aşamalar

### AŞAMA A (ŞU ANKİ): Statik HTML/CSS Prototip
- prototypes/ klasöründe statik HTML sayfaları
- Tailwind CSS CDN (build kurmaya gerek yok)
- Mobile-first
- tasks/site-map.md yapısına birebir uygun
- Hedef: patronla iterate et, tasarım onayı al

### AŞAMA B (İLERİDE): Laravel Kurulum
- Şu an konuşulmayacak
- Tasarım onaylanınca planlanacak

### AŞAMA C (İLERİDE): Deploy
- gaviaworks.com canlıya geçiş
- CWP shared host, port 6161

## Komutlar (Aşama A)

- Tarayıcıda aç: `open prototypes/<sayfa>.html`
- Git status: `git status`
- Commit (izinle): "commit edeyim mi?" diye SOR

## Referans Benchmark Siteler

- **Netguru** (https://www.netguru.com) — EN YAKIN MODEL: ajans+ürün hibrit
- **Itransition** (https://www.itransition.com) — kurumsal yapı, ama bizden çok büyük
- **Softtech** (https://softtech.com.tr) — ürünleşme dili (mAistro, Visualyze, Plateau)
- **Etiya** (https://www.etiya.com) — ürün ailesi sunumu
- **Innova** (https://www.innova.com.tr) — Türkçe kurumsal yapı

## Cross-Project Kuralları

### Görsel
- Boyut: CSS render genişliği esas, 2x retina ÇARPMA YOK
- Kare gösterim: img tag DEĞİL, div + background-image: cover + center
- Slider/banner overlay: 0.3-0.4 arası

### Türkçe
- UTF-8
- Düzgün Türkçe karakter (ı, ş, ç, ğ, ü, ö)

## Git Kuralları (ÇOK ÖNEMLİ)

- Otomatik commit/push YASAK
- İzinle yapılabilir: "şunu commit et" denirse yap
- Anlamlı iş bittikten sonra "commit edeyim mi?" SOR
- 5+ dosya değiştiyse mutlaka commit hatırlat
- Commit mesajları İngilizce, açıklayıcı
- Branch: main

## Çalışma Tarzı

- Workflow: Research → Plan → Annotate → Implement
- Plan onaylanmadan IMPLEMENT YOK
- Babysit etme — üst seviye komut, adım adım talimat değil
- Referans pattern kullan: "Netguru'daki gibi yap"
- Hata sonrası: tasks/lessons.md'ye ekleme öner

## Aşama A Spesifik Kurallar

1. SADECE statik HTML/CSS/JS — backend YOK
2. Tailwind CSS CDN: `<script src="https://cdn.tailwindcss.com"></script>`
3. Tüm sayfalar prototypes/ altında
4. Component yapısı için partial yok şimdilik — her sayfa kendi içinde tam
5. Görsel placeholder: https://placehold.co/ (gerçek görsel sonra)
6. İçerik (copy) Yasin Bey'den yok — placeholder copy üret, açıkça TODO işaretle
7. Tasarım dili Yasin Bey onayına bağlı — ilk turda 1-2 alternatif önerilebilir

## Bilinen Durum / Notlar

- Yasin Bey henüz copy (içerik metni) yazmadı — placeholder kullanılacak
- 4 ürün (CRM/Flow/Assistant/Insight) henüz geliştirilmedi — "coming soon" mantığı
- Tasarım yönü Yasin Bey'le iterate edilecek
- Patron mesajı tonu: Sade Türkçe, teknik jargonsuz, 3-5 cümle WhatsApp uzunluğu

## Prensipler

1. Basitlik
2. Kök neden — geçici çözüm yok
3. Minimal etki
4. Patronla erken iterasyon, geç kod
5. Statik onaylanmadan Laravel'e geçme

## Görsel Karar Kuralı

- Asla kendi başıma görsel karar (renk, gölge, border, spacing)
  değiştirmem.
- Eğer mevcut görsel bir sorun yaratıyorsa veya "soft bridge" gibi
  bir iyileştirme önereceksem, ÖNCE Beyar'a sorarım ("Şu rengi
  şununla değiştirmemi ister misin?"), onay almadan dokunmam.
- Bu kural özellikle: arka plan renkleri, border renkleri, gölgeler,
  spacing/padding büyük değişiklikleri, font ailesi değişiklikleri için.
- İstisna: Plan dokümanında açıkça yazılı olan değişiklikler
  (M5/M6/M7 gibi) tabii ki uygulanır.

Bu kural 21 Mayıs 2026 — Gavia Works Tur 2'de Stats zemin renginin
izinsiz değiştirilmesi sonrası eklendi.
