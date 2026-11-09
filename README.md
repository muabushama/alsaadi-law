# مكتب السعدي — الموقع الرسمي

موقع عربي RTL لمكتب السعدي للاستشارات القانونية والخدمات الإجرائية: واجهة عامة متحركة، نموذج طلبات يعمل فعلياً، ولوحة إدارة محمية.

## التقنيات

- Next.js (App Router) + TypeScript + Tailwind CSS
- Motion (Framer Motion) لنظام الحركة
- Prisma + MySQL
- jose + bcryptjs للمصادقة
- ExcelJS للتصدير

## التشغيل المحلي

الافتراضي SQLite (`file:./dev.db`) حتى يعمل النموذج ولوحة الإدارة بدون تثبيت MySQL.

1. انسخ `.env.example` إلى `.env` وعدّل القيم.
2. ثبّت وادفع المخطط:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

للإنتاج على Hostinger يمكن الإبقاء على SQLite في مجلد قابل للكتابة، أو تحويل `provider` في `prisma/schema.prisma` إلى `mysql` واستخدام `DATABASE_URL` لقاعدة Hostinger على `127.0.0.1:3306`. يتوفر `docker-compose.yml` لتشغيل MySQL محلياً عند الحاجة.

- الموقع: http://localhost:3000
- الإدارة: http://localhost:3000/admin/login

بيانات الدخول الافتراضية للتطوير فقط من ملف `.env`:
`ADMIN_USERNAME` و `ADMIN_PASSWORD`.

لتوليد هاش للإنتاج:

```bash
npm run hash-password -- "your-strong-password"
```

ثم ضع الناتج في `ADMIN_PASSWORD_HASH` واحذف `ADMIN_PASSWORD`.

## استيراد الطلبات القديمة

النسخة الأصلية كانت تخزّن الطلبات في `localStorage` بالمفتاح `alsaadi_law_firm_requests`. من لوحة الإدارة يمكن لصق مصفوفة JSON واستيرادها.

## النشر على Hostinger (Node.js)

1. أنشئ موقعاً Node.js وقاعدة MySQL.
2. الاتصال من التطبيق يكون عبر `127.0.0.1:3306` وليس مضيف `srvXXXX.hstgr.io`.
3. اضبط متغيرات البيئة: `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `UPLOAD_DIR`, `NEXT_PUBLIC_SITE_URL`.
4. عند توفر رقم الهاتف/واتساب ضع `NEXT_PUBLIC_PHONE` و `NEXT_PUBLIC_WHATSAPP`.
5. نفّذ `npx prisma db push` ثم `npm run build` و `npm start` (أو أمر البناء الذي تحدده لوحة Hostinger).
6. تأكد أن مجلد `uploads` قابل للكتابة.

## الأصول

الصور داخل `public/images` تشمل شعاراً مصمماً وصوراً بصرية للقيادة. صور القيادة هوية مصممة وليست صوراً فوتوغرافية حقيقية.

النسخة الأصلية مؤرشفة في `docs/original.html`.
