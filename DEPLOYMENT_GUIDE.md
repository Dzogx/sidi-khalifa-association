# 🚀 دليل النشر على Vercel

## خطوات النشر السريعة

### 1. إنشاء حساب Vercel
- اذهب إلى https://vercel.com
- اضغط على "Sign Up"
- اختر "Continue with GitHub"
- وافق على الأذونات

### 2. ربط المستودع
- في Vercel Dashboard، اضغط على "Add New"
- اختر "Project"
- ابحث عن `sidi-khalifa-association`
- اضغط "Import"

### 3. إعدادات البناء
```
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
Development Command: pnpm dev
```

### 4. متغيرات البيئة (Environment Variables)
أضف المتغيرات التالية في Vercel:

```
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
VITE_APP_ID=<your-app-id>
OAUTH_SERVER_URL=<your-oauth-server-url>
VITE_OAUTH_PORTAL_URL=<your-oauth-portal-url>
OWNER_OPEN_ID=<your-owner-open-id>
OWNER_NAME=<your-owner-name>
BUILT_IN_FORGE_API_URL=<your-api-url>
BUILT_IN_FORGE_API_KEY=<your-api-key>
VITE_FRONTEND_FORGE_API_KEY=<your-frontend-key>
VITE_FRONTEND_FORGE_API_URL=<your-frontend-api-url>
VITE_APP_TITLE=جمعية حي سيدي خليفة القادري
VITE_APP_LOGO=<your-logo-url>
VITE_ANALYTICS_ENDPOINT=<your-analytics-url>
VITE_ANALYTICS_WEBSITE_ID=<your-website-id>
```

### 5. اضغط "Deploy"
- سيبدأ البناء تلقائياً
- انتظر حتى ينتهي (عادة 3-5 دقائق)
- ستحصل على رابط عام للموقع

## معلومات إضافية

### الميزات المدعومة:
- ✅ Next.js + React
- ✅ Express Backend
- ✅ MySQL Database
- ✅ tRPC API
- ✅ OAuth Authentication
- ✅ Email Notifications
- ✅ CMS System

### الملفات المهمة:
- `vercel.json` - إعدادات Vercel
- `package.json` - الحزم والبرامج النصية
- `drizzle/schema.ts` - قاعدة البيانات
- `server/_core/index.ts` - نقطة دخول الخادم

### استكشاف الأخطاء:
1. تحقق من سجلات البناء في Vercel Dashboard
2. تأكد من أن جميع متغيرات البيئة مضبوطة
3. تحقق من اتصال قاعدة البيانات
4. تأكد من أن جميع الحزم مثبتة

## الدعم
للمساعدة، اتصل بـ:
- 📧 البريد الإلكتروني: info@example.com
- 📞 الهاتف: +213 (0) 213-XXXX
- 🌐 الموقع: https://sidi-khalifa-association.vercel.app
