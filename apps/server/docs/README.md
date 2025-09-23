# Server Architecture & How-To Guide

Bu doküman, server tarafında yeni bir feature/endpoint eklerken takip edilmesi gereken yapıyı anlatır. Amaç: standartları korumak, kod kalitesini artırmak ve AI araçlarının da aynı yapıyı sürdürmesini sağlamak.

## Temel Prensipler

- Framework: Hono
- ORM: Drizzle
- Doğrulama: Zod
- Controller: Sınıf yok, fonksiyonlar
- Hata yönetimi: Route seviyesinde `withErrorHandling`
- Response: `ApiResponse<T>` şeması (types/api.ts)
- TSDoc: Tüm export fonksiyonlarda

## Klasör Yapısı (özet)

```
apps/server/src/
  modules/
    <feature>/
      routes.ts     # Hono router (withErrorHandling)
      controller.ts # İstek -> doğrulama -> servis akışı (fonksiyon)
      service.ts    # DB/iş kuralları (genel try/catch yok)
      validation.ts # zod şemaları
  utils/            # response, handler, validation helpers
  types/            # ApiResponse vb.
```

## Yeni Modül/Endpoint Adımları

Aşağıdaki örnekler `modules/example` altında gösterilmiştir.

### 1) Validation

`modules/example/validation.ts`

```ts
import { z } from "zod";

export const createExampleSchema = z.object({
  name: z.string().min(1, "name is required"),
});
```

### 2) Service

`modules/example/service.ts`

```ts
import { db } from "../../db";
import { examples } from "../../db/schema";

/** Yeni example oluşturur. */
export async function createExample(input: { name: string }) {
  const [row] = await db
    .insert(examples)
    .values({ name: input.name })
    .returning();
  return row;
}
```

- Servislerde genel try/catch yazmayın; hatalar üst katmana propagete olur.

### 3) Controller (fonksiyonel)

`modules/example/controller.ts`

```ts
import type { Context } from "hono";
import { validateRequestBody, sendSuccess, sendError } from "../../utils";
import { createExampleSchema } from "./validation";
import { createExample } from "./service";

/** Yeni bir example kaydı oluştur. */
export async function createExampleHandler(c: Context) {
  const data = await c.req.json();
  const validation = validateRequestBody(createExampleSchema, data);
  if (!validation.success) {
    return sendError(c, "Validation failed", undefined, 400);
  }

  const saved = await createExample(validation.data);
  return sendSuccess(c, { id: saved.id });
}
```

### 4) Routes (withErrorHandling)

`modules/example/routes.ts`

```ts
import { Hono } from "hono";
import { withErrorHandling } from "../../utils";
import { createExampleHandler } from "./controller";

const example = new Hono();

/** Example oluşturma endpoint'i */
example.post(
  "/",
  withErrorHandling((c) => createExampleHandler(c))
);

export { example };
```

### 5) Uygulamaya Bağlamak

`src/index.ts` içinde router'ı mount edin (örnek):

```ts
import { Hono } from "hono";
import { example } from "./modules/example/routes";

const app = new Hono();
app.route("/example", example);
```

## Response Sözleşmesi

`ApiResponse<T>` (types/api.ts) kullanılır:

- Başarı: `sendSuccess(c, data?, message?, status=200)`
- Hata: `sendError(c, error, message?, status=400)`
- Validasyon: `sendValidationError(c, errors)` (opsiyonel: `success:false` + `data.details` ile uyumlu hale getirilebilir)
- Dahili Hata: `sendInternalError(c, error?)`

## Standartlar (AI ile paylaş)

- Controller sınıf kullanma; fonksiyonları export et.
- Tüm route handler’ları `withErrorHandling` ile sar.
- Servislerde genel try/catch yazma; hatalar route-level wrapper’da yakalanır.
- Zod ile doğrula; geçersizse `sendValidationError`/`sendError` dön.
- `ApiResponse<T>` sözleşmesini koru.
- Tüm export fonksiyonlara TSDoc ekle.

Bu rehberi referans alarak yeni feature/endpoint geliştirmelerini aynı mimariyle sürdürebilirsiniz.
