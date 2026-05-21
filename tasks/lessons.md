# Lessons (Gavia 2026)

## M7 — Hizmetler slider altyapı (2026-05-21)

- `prototypes/index.html` Hizmetler grid container'ına `data-services-slider` attribute eklendi; kartlara `service-card` class.
- Swiper.js CDN HTML'de yorum bloğu olarak duruyor — yorumu açıp `<link>` + `<script>` aktive edilince `main.js#initServicesSlider()` 5+ kart varsa Swiper init eder. 4 kartta no-op.
- Yeni hizmet eklenince yapılacaklar:
  1. `prototypes/index.html` içindeki `<!-- 5+ hizmet kartı olduğunda aktive et:` bloğunun yorum kapatma satırlarını sil.
  2. `main.js#initServicesSlider()` zaten guard'lı — ek değişiklik gerekmez.
  3. Mobile/tablet'te slidesPerView ayarı `breakpoints` içinde, gerekirse incele.
