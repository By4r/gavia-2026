# Mood Board — Referanslar

3 birincil + 5 ikincil referans. Her birinden **neyi çalacağız** yazılı.

---

## Birincil Referanslar (DNA)

### 1. [antigravity.google](https://antigravity.google/)
**Ne çalarız:**
- WebGL gradient mesh hero (mor-mavi akan küre)
- Monospace overlay metinleri (`v0.4.2`, `session_id: ...`)
- Agent demo'nun hero'da canlı çalışması
- Koyu zemin + neon vurgu

### 2. [anthropic.com](https://www.anthropic.com/)
**Ne çalarız:**
- Sıcak premium AI dili (sadece koyu/teknik değil, "insan" hissi de var)
- Serif başlık + sans gövde mix
- Geniş whitespace
- Manifesto-cinsi uzun form metin yapısı

### 3. [linear.app](https://linear.app/)
**Ne çalarız:**
- Geometric premium minimalism
- Mikro-etkileşim ustası (cursor, hover, transition)
- Software studio'nun nasıl pazarlandığının ders kitabı
- Koyu mod default + light toggle

---

## İkincil Referanslar (Spesifik Bölümler İçin)

### 4. [cursor.com](https://cursor.com/)
**Bölüm:** Hero
- AI ürün hero'sunda canlı simülasyon nasıl yapılır

### 5. [vercel.com](https://vercel.com/)
**Bölüm:** Mikro-etkileşim ve typography
- Geist Mono kullanımı
- Border highlight'lar, magnetic hover

### 6. [basement.studio](https://basement.studio/)
**Bölüm:** Works (case study)
- Cinematic case study yapısı
- Awwwards tarzı scroll choreography

### 7. [igloo.inc](https://igloo.inc/)
**Bölüm:** Work detail
- Scroll-driven storytelling
- Full-screen project showcase

### 8. [apple.com/apple-intelligence](https://www.apple.com/apple-intelligence/)
**Bölüm:** Hizmet kartı sunumu
- AI özelliğinin ürün gibi anlatılması
- Geniş scroll + 3D parallax

---

## Design Token İlk Teklif (Faz 1 prototipinde test edilecek)

**Mod:** Koyu varsayılan (Faz 2'de light toggle eklenir)

**Renkler (Gavia brand palette — mevcut markaya bağlandı):**
```
--bg:           #15163A   (deep navy, logodaki lacivert)
--bg-soft:      #1C1D44
--bg-card:      #232556
--border:       #353871
--text:         #F5F5F8
--text-dim:     #A5A8C4
--accent:       #4FBFA1   (mint/teal — logodaki imza yeşili)
--accent-glow:  rgba(79, 191, 161, 0.42)
--secondary:    #6B5BBE   (cool secondary, work blocks için)
```
**Not:** İlk prototip warm amber'la çıkmıştı; Beyar mevcut gaviaworks.com'u hatırlattı → navy + mint'e pivot. Logo işareti dot yerine **mint kare** (mevcut 'g' logosuyla uyum).

**Tipografi:**
- Başlık: Inter Display veya PP Neue Montreal (variable)
- Gövde: Inter veya Söhne
- Monospace: JetBrains Mono veya Geist Mono

**Hareket:**
- Eğri: `cubic-bezier(0.32, 0.72, 0, 1)` (Apple-vari ease)
- Hover transition: 200ms
- Page enter: 400-600ms stagger

**Spacing scale:**
- 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128

---

## "AI Hissi" — Somut Pattern Listesi

Faz 1'de en az 3 tanesi, Faz 2'de hepsi:

1. **WebGL mesh gradient hero** ← Faz 1
2. **Kinetic streaming typography** (LLM stream feel) ← Faz 1
3. **Monospace overlay metinler** ← Faz 1
4. **Agent terminal simülasyonu** ← Faz 1
5. **⌘K komut paleti** (AI search) ← Faz 2
6. **Tool call cards** (case study içinde) ← Faz 2
7. **Live metrics widget** ← Faz 2
8. **Cursor magnetic hover** ← Faz 1 (light)
9. **Scroll-driven 3D parallax** ← Faz 2
