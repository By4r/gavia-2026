# Itransition × Innova × Gavia — Çalma Raporu

> Kaynak: web-replicator skill, MODE B (mevcut siteyi referans diline adapt et).
> İki referansı WebFetch ile tarayıp imza pattern'larını çıkardık.
> Bu rapor "ne çalınacak, ne çalınmayacak" listesi.

---

## 1. Bölüm Bölüm Karar Tablosu

| Bölüm | Itransition'dan | Innova'dan | Gavia Final Kararı |
|-------|-----------------|------------|---------------------|
| Hero | Tek başlık + tagline, görsel yok, CTA altta | 4 slide auto-rotate banner | **VARYANT 1**: full tipografi (Itransition) + odak chip linkler. **VARYANT 2**: video bg (Innova dinamizmi). Robot bebek görseli SİL |
| Header | Mega menu zengin (Services/Industries/Tech/Company) | Klasik horizontal + Türkçe etkinlik CTA | Mevcut 5 mega panel KORUNUR — Itransition'ın çok-kolon mantığı + Innova'nın Türkçe başlık tonu |
| Stats / "At a Glance" | 1998 / 3000+ / 800+ / 5 / 50 / 40 — sol-hizalı, label small caps | Yok | **Çal**: 5 sütun stats grid (Itransition formatı), KOYU zemin, mint rakamlar — mevcut mint band KALDIR |
| Service grid | 3-col, başlık + 2-3 satır + "Learn more" | 10-ürün uniform grid: ikon + isim + tek satır + "Detaylı Bilgi" | Mevcut 4-col image-card grid KORUNUR (Unsplash görseller iyi) — Innova'nın "Detaylı Bilgi" CTA dili korunur |
| AI Showcase | Yok ayrı bölüm | Yok ayrı bölüm | Mevcut yapı korunur (3-col image-card) — değişiklik yok |
| Ürün ailesi | Yok | "Öne Çıkan Ürünler" 10-grid uniform | Mevcut 4-col product-card gradient yapısı korunur — Innova'nın "Detaylı Bilgi" linki eklenebilir (ileride) |
| Sektörler | "Industries" carousel/grid 7 sektör: bg image + overlay + tagline + Learn more | Yok belirgin sektör bölümü | Mevcut 8-tile beyaz zemin full-image grid KORUNUR — Itransition'ın overlay+tagline yapısıyla zaten birebir |
| Sürdürülebilirlik | Yok ayrı bölüm | Yok | Mevcut tek-satır leaf bandı korunur |
| CTA bandı | Footer öncesi sade | Yok | Mevcut korunur |
| Footer | 5 kolon: Nav / Social / Address+Phone / Legal / Copyright | KVKK + Support + 5 sosyal | Mevcut 4 kolon korunur — Itransition'ın legal link derinliği ileride eklenebilir |

---

## 2. Çalma Stratejisi (somut)

### Hero — İKİ VARYANT
- **VARYANT 1 (Itransition+):** Full tipografi, ortalanmış, robot görseli yok. Hero başlık 6xl/8xl Manrope 800. Altta "Odak Alanlar:" chip satırı (Itransition'ın hero üstündeki focus pill mantığı).
- **VARYANT 2 (Innova+):** Video bg + sol-hizalı büyük başlık + scroll indicator. Innova'nın slider dinamizmi tek slide + video ile aktarıldı (otorotate yok — Beyar slider yasakladı).

### Header (mevcut korunur)
Mega menu mantığı zaten Itransition'dan alındı. Innova'nın "Detaylı Bilgi" CTA dili mega-featured panel'lerde kullanılıyor ("Başla", "İncele", "Görüşme aç"). Tamam.

### Stats Şeridi — Itransition "At a Glance" formatı
Eski mint band (3 sütun, mint zemin) KALDIRILIYOR.
Yenisi: **gavia-deep koyu zemin**, 5 sütun, sayılar **gavia-mint 48px**, label small-caps gri. Sütun ayraçları subtle gavia-border vertical line.

Sayılar:
- 7+ / Yıl Deneyim
- 50+ / Tamamlanan Proje
- 10+ / Hizmet Verilen Sektör
- 4 / Ürün Ailesi
- 24/7 / Teknik Destek

### Service Grid
Mevcut 4-col image-card grid Itransition+Innova hibridi zaten:
- Üstte foto (Innova "Öne Çıkan Ürünler" görsel-ağırlık)
- İkon + başlık + 2 satır + "Detay →" (Itransition card anatomy)
- Hover: mint border + shadow (Itransition subtle hover)
Değişiklik yok.

### Sektörler
Mevcut beyaz-zemin 8-tile grid = Itransition "Industries" showcase'in birebir kopyası:
- bg-image full
- gradient overlay alt (deep gradient bottom)
- tile-label (sektör adı) + alt-satır kısa tagline
- Hover'da img scale 1.05
Değişiklik yok — zaten "çalınmış".

### Footer
Mevcut korunur. Itransition legal derinliği (KVKK + Çerez + ileride: Bilgi Güvenliği Politikası, ESG) eklenebilir — Yasin Bey onayı bekliyor.

---

## 3. NE ALMAYACAĞIZ

- ❌ Itransition'ın 800+ case study grid'i (Beyar başarı hikayeleri kaldırdı)
- ❌ Itransition'ın "Insights" blog grid'i (blog yok)
- ❌ Innova'nın hero slider (Beyar slider yasakladı — varyant 2'de TEK video, rotate yok)
- ❌ Innova'nın 10-ürün uniform grid (Gavia'da 4 ürün yeterli, YAKINDA badge'li)
- ❌ Innova'nın 4-tab çözüm geçişi (Gavia 4 hizmet zaten ayrı kart olarak gösteriyor)
- ❌ Trust badge logo şeridi (zaten kaldırıldı, stats şeridiyle değiştirildi)
- ❌ Itransition'ın "Industry-Related Topics" derin sub-mega (over-engineer — 5 panel yeterli)

---

## 4. Uygulama Öncelik Sırası

1. **Hero VARYANT 1** → `prototypes/index.html` (mevcut robot görseli SİL)
2. **Hero VARYANT 2** → `prototypes/index-b.html` (yeni dosya, video bg)
3. **Stats şeridi yenile** (mint band → koyu 5-sütun) — her iki dosyada
4. **brand.css ek**: `.focus-chip`, `.stats-grid`, `.stat-item`, `.stat-number`, `.stat-label`
5. Sektör + servis grid + AI + ürün + footer = DOKUNMA, zaten iyi
6. Beyar karşılaştırma: `open prototypes/index.html` ve `open prototypes/index-b.html`
