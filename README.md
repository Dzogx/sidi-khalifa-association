# جمعية حي سيدي خليفة القادري - منصة رقمية

منصة رقمية احترافية متكاملة لجمعية حي سيدي خليفة القادري، مبنية بـ **Next.js + React + TypeScript + Tailwind CSS** مع **Supabase** و **Resend**.

## ✨ الميزات

- 🌍 **دعم كامل للعربية** مع RTL
- 🔐 **مصادقة آمنة** باستخدام Supabase Auth
- 📊 **لوحة تحكم إدارية** متقدمة مع RBAC
- 📧 **نظام البريد الإلكتروني** مع Resend
- 💾 **قاعدة بيانات PostgreSQL** عبر Supabase
- 📁 **تخزين الملفات** مع Supabase Storage
- 📱 **تصميم متجاوب** على جميع الأجهزة
- ⚡ **أداء عالية** مع Lighthouse > 90
- 🚀 **جاهز للنشر** على Vercel

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 19** - مكتبة واجهات المستخدم
- **TypeScript** - لغة البرمجة
- **Tailwind CSS 4** - تصميم الواجهات
- **Wouter** - التوجيه
- **React Hook Form** - إدارة النماذج
- **Zod** - التحقق من البيانات

### Backend
- **Express 4** - خادم الويب
- **tRPC 11** - API آمن مع Type Safety
- **Drizzle ORM** - إدارة قاعدة البيانات
- **Supabase** - قاعدة البيانات والمصادقة والتخزين

### Services
- **Supabase Auth** - المصادقة
- **Supabase PostgreSQL** - قاعدة البيانات
- **Supabase Storage** - تخزين الملفات
- **Resend** - خدمة البريد الإلكتروني

## 📋 المتطلبات

- **Node.js** >= 18
- **pnpm** >= 8
- **Supabase** حساب مجاني
- **Resend** حساب مجاني

## 🚀 البدء السريع

### 1. استنساخ المستودع

```bash
git clone https://github.com/Dzogx/sidi-khalifa-association.git
cd sidi-khalifa-association
git checkout initial-build
```

### 2. تثبيت الحزم

```bash
pnpm install
```

### 3. إعداد البيئة

انسخ `ENV_SETUP.md` وأتبع التعليمات لإنشاء حسابات Supabase و Resend.

أنشئ ملف `.env.local`:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=your-email@example.com
JWT_SECRET=your-secret-key-min-32-chars
DATABASE_URL=your-database-url
VITE_APP_TITLE=جمعية حي سيدي خليفة القادري
VITE_APP_LOGO=https://your-logo-url.png
NODE_ENV=development
```

### 4. تشغيل خادم التطوير

```bash
pnpm dev
```

سيكون الموقع متاحاً على `http://localhost:5173`

### 5. بناء الإنتاج

```bash
pnpm build
pnpm start
```

## 📁 هيكل المشروع

```
.
├── client/                 # تطبيق React
│   ├── src/
│   │   ├── pages/         # صفحات التطبيق
│   │   ├── components/    # مكونات قابلة لإعادة الاستخدام
│   │   ├── lib/           # مساعدات وأدوات
│   │   └── App.tsx        # التطبيق الرئيسي
│   └── index.html
├── server/                # خادم Express
│   ├── routers/          # tRPC routers
│   ├── supabase.ts       # Supabase helpers
│   ├── resend-email.ts   # Resend helpers
│   └── routers.ts        # API endpoints
├── drizzle/              # قاعدة البيانات
│   ├── schema.ts         # تعريف الجداول
│   └── migrations/       # ملفات الهجرة
├── ENV_SETUP.md          # دليل إعداد البيئة
├── DEPLOYMENT_GUIDE.md   # دليل النشر
└── package.json
```

## 🔐 المصادقة

المشروع يستخدم **Supabase Auth** للمصادقة الآمنة:

```typescript
// تسجيل دخول
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// تسجيل خروج
await supabase.auth.signOut();

// الحصول على المستخدم الحالي
const { data: { user } } = await supabase.auth.getUser();
```

## 📧 البريد الإلكتروني

استخدم **Resend** لإرسال رسائل البريد الإلكتروني:

```typescript
import { sendEmail, sendMembershipConfirmation } from '@/server/resend-email';

// إرسال بريد مخصص
await sendEmail({
  to: 'user@example.com',
  subject: 'مرحباً',
  html: '<h1>مرحباً بك</h1>',
});

// إرسال تأكيد الانخراط
await sendMembershipConfirmation('user@example.com', 'أحمد', 'REF-001');
```

## 💾 قاعدة البيانات

استخدم **Supabase PostgreSQL** مع **Drizzle ORM**:

```typescript
// تعريف جدول
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  name: varchar('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// الاستعلام
const users = await db.select().from(usersTable);
```

## 📁 التخزين

استخدم **Supabase Storage** لتخزين الملفات:

```typescript
import { uploadGalleryImage, getPublicUrl } from '@/server/supabase-storage';

// تحميل صورة
const result = await uploadGalleryImage('photo.jpg', fileBuffer);
console.log(result.url); // رابط عام للملف

// الحصول على رابط عام
const url = getPublicUrl('gallery/photo.jpg');
```

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
pnpm test

# الاختبارات مع المراقبة
pnpm test:watch
```

## 📦 النشر على Vercel

### 1. ربط المستودع

```bash
git push origin initial-build
```

### 2. إنشاء مشروع Vercel

1. اذهب إلى https://vercel.com
2. اضغط "Add New Project"
3. اختر المستودع `sidi-khalifa-association`
4. اختر الفرع `initial-build`

### 3. إضافة متغيرات البيئة

في Vercel Dashboard، اذهب إلى Settings → Environment Variables وأضف:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=your-email@example.com
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-url
VITE_APP_TITLE=جمعية حي سيدي خليفة القادري
VITE_APP_LOGO=your-logo-url
NODE_ENV=production
```

### 4. النشر

اضغط "Deploy" وانتظر انتهاء البناء.

## 🐛 استكشاف الأخطاء

### "Cannot connect to Supabase"
- تحقق من `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`
- تأكد من أن مشروع Supabase نشط

### "Email service not working"
- تحقق من `RESEND_API_KEY`
- تأكد من تحقق البريد الإلكتروني في Resend

### "Database connection failed"
- تحقق من `DATABASE_URL`
- تأكد من أن قاعدة البيانات تعمل

## 📞 الدعم

للمساعدة:
- **Supabase:** https://supabase.com/support
- **Resend:** https://resend.com/support
- **GitHub Issues:** https://github.com/Dzogx/sidi-khalifa-association/issues

## 📄 الترخيص

هذا المشروع مرخص تحت **MIT License**.

## 👥 المساهمون

- **المطور:** Dzogx
- **المنظمة:** جمعية حي سيدي خليفة القادري

## 🙏 شكر وتقدير

شكراً لـ:
- **Supabase** - قاعدة البيانات والمصادقة
- **Resend** - خدمة البريد الإلكتروني
- **Vercel** - منصة النشر
- **React** و **Next.js** - إطار العمل

---

**تم آخر تحديث:** 2026-07-04

**الحالة:** ✅ جاهز للإنتاج
