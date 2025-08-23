# DataPrism Projesi İçin Önerilen Paketler

Bu dosya, DataPrism projesinin mevcut durumu analiz edilerek hazırlanmış paket önerilerini içerir.

## Mevcut Mimari Özeti

**Frontend (apps/web):**
- Next.js 15 + React 19 + TypeScript
- shadcn/ui + TailwindCSS v4
- TanStack Query + TanStack Form
- Better Auth + Framer Motion
- Three.js integration

**Backend (apps/server):**
- Hono framework + Better Auth
- Drizzle ORM + PostgreSQL
- Rate limiting + CORS
- Analytics tracking system

## 🚀 Yüksek Öncelikli Paketler (Hemen Eklenebilir)

### Server Tarafı

#### **`@hono/prometheus`**
- **Amaç:** API metrikleri ve performans izleme
- **Neden gerekli:** Analytics projesi için performans takibi kritik
- **Kurulum:** `bun add @hono/prometheus`

#### **`@hono/swagger-ui`** 
- **Amaç:** Otomatik API dokümantasyonu
- **Neden gerekli:** API'lerin dokümante edilmesi gerekiyor
- **Kurulum:** `bun add @hono/swagger-ui`

#### **`@hono/helmet`**
- **Amaç:** Güvenlik başlıkları (CSP, HSTS, vs.)
- **Neden gerekli:** Web güvenliği için temel koruma
- **Kurulum:** `bun add @hono/helmet`

#### **`node-cron`**
- **Amaç:** Zamanlanmış görevler (cleanup, raporlar)
- **Neden gerekli:** Analytics verilerinin temizlenmesi
- **Kurulum:** `bun add node-cron @types/node-cron`

#### **`pino`**
- **Amaç:** Yüksek performanslı structured logging
- **Neden gerekli:** Mevcut console.log yerine profesyonel logging
- **Kurulum:** `bun add pino pino-pretty`

#### **`compression`**
- **Amaç:** HTTP response sıkıştırma
- **Neden gerekli:** Analytics verilerinin transfer optimizasyonu
- **Kurulum:** `bun add compression @types/compression`

### Web Tarafı

#### **`recharts`**
- **Amaç:** Analytics dashboard için grafikler
- **Neden gerekli:** Veri görselleştirme temel ihtiyaç
- **Kurulum:** `bun add recharts`

#### **`date-fns`**
- **Amaç:** Tarih manipülasyonu ve formatlaması
- **Neden gerekli:** Analytics tarih filtreleme
- **Kurulum:** `bun add date-fns`

#### **`react-hotkeys-hook`**
- **Amaç:** Klavye kısayolları
- **Neden gerekli:** Dashboard kullanıcı deneyimi
- **Kurulum:** `bun add react-hotkeys-hook`

#### **`cmdk`**
- **Amaç:** Command palette/arama özelliği
- **Neden gerekli:** Hızlı navigasyon için
- **Kurulum:** `bun add cmdk`

## ⚡ Orta Öncelikli Paketler (Gelişim Aşamasında)

### Server Tarafı

#### **`ioredis`**
- **Amaç:** Redis client (caching, real-time features)
- **Neden yararlı:** Session caching ve real-time visitor tracking
- **Kurulum:** `bun add ioredis @types/ioredis`

#### **`@hono/zod-validator`**
- **Amaç:** Request validation middleware
- **Neden yararlı:** Mevcut Zod ile entegrasyon
- **Kurulum:** `bun add @hono/zod-validator`

#### **`bullmq`**
- **Amaç:** Background job processing
- **Neden yararlı:** Analytics data processing
- **Kurulum:** `bun add bullmq`

#### **`winston`**
- **Amaç:** Gelişmiş logging (file rotation, remote logging)
- **Neden yararlı:** Production logging ihtiyacı
- **Kurulum:** `bun add winston`

### Web Tarafı

#### **`@tanstack/react-table`**
- **Amaç:** Gelişmiş veri tabloları
- **Neden yararlı:** Analytics raporları için
- **Kurulum:** `bun add @tanstack/react-table`

#### **`react-hook-form`**
- **Amaç:** Form yönetimi (TanStack Form alternatifi)
- **Neden yararlı:** Daha yaygın kullanım, daha fazla özellik
- **Kurulum:** `bun add react-hook-form @hookform/resolvers`

#### **`vaul`**
- **Amaç:** Mobile-friendly drawer component
- **Neden yararlı:** Mobil deneyim iyileştirmesi
- **Kurulum:** `bun add vaul`

#### **`react-intersection-observer`**
- **Amaç:** Scroll-based animasyonlar ve lazy loading
- **Neden yararlı:** Performans optimizasyonu
- **Kurulum:** `bun add react-intersection-observer`

## 🔧 Düşük Öncelikli Paketler (İleri Özellikler)

### Server Tarafı

#### **`@hono/oauth-providers`**
- **Amaç:** Ek OAuth sağlayıcıları (Twitter, LinkedIn, vs.)
- **Kurulum:** `bun add @hono/oauth-providers`

#### **`sharp`**
- **Amaç:** Resim işleme ve optimizasyon
- **Kurulum:** `bun add sharp`

#### **`nodemailer`**
- **Amaç:** Email gönderimi (Resend alternatifi)
- **Kurulum:** `bun add nodemailer @types/nodemailer`

### Web Tarafı

#### **`react-pdf`**
- **Amaç:** PDF raporları oluşturma
- **Kurulum:** `bun add react-pdf`

#### **`react-virtualized`**
- **Amaç:** Büyük listelerin performanslı gösterimi
- **Kurulum:** `bun add react-virtualized`

## Kurulum Önerileri

### 1. Önce Yüksek Öncelikli Paketleri Kurun
```bash
# Server
cd apps/server
bun add @hono/prometheus @hono/swagger-ui @hono/helmet node-cron pino compression
bun add -D @types/node-cron @types/compression pino-pretty

# Web
cd apps/web
bun add recharts date-fns react-hotkeys-hook cmdk
```

### 2. Kademeli Olarak Diğerlerini Ekleyin
Her paket ekledikten sonra test edin ve projenizin ihtiyaçlarına göre yapılandırın.

### 3. TypeScript Tipleri
Gerekli `@types/*` paketlerini unutmayın.

## Notlar

- Bu öneriler mevcut mimarinizi bozmayacak şekilde seçilmiştir
- Tüm paketler Bun runtime ile uyumludur
- shadcn/ui bileşenleriyle çakışmayacak şekilde seçilmiştir
- Analytics ve dashboard odaklı özellikler önceliklendirilmiştir

---
*Bu dosya proje analizi sonucunda oluşturulmuştur. İhtiyaçlarınıza göre güncellemeyi unutmayın.*