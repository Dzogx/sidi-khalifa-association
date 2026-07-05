# 🗄️ دليل الهجرة إلى Supabase

هذا الدليل يشرح كيفية نقل قاعدة البيانات من MySQL إلى PostgreSQL (Supabase).

## الخطوات

### 1. إنشاء مشروع Supabase

1. اذهب إلى https://supabase.com
2. اضغط "Start your project"
3. اختر "Create a new project"
4. ملأ البيانات:
   - **Project name:** sidi-khalifa-association
   - **Database password:** (اختر كلمة مرور قوية)
   - **Region:** اختر الأقرب لموقعك
5. اضغط "Create new project"
6. انتظر 2-3 دقائق لإنشاء المشروع

### 2. الحصول على بيانات الاتصال

1. اذهب إلى **Settings** → **Database**
2. انسخ **Connection String** (PostgreSQL)
3. استخدمها في `DATABASE_URL`

### 3. تشغيل الهجرة

#### الطريقة الأولى: استخدام SQL Editor

1. في Supabase Dashboard، اذهب إلى **SQL Editor**
2. اضغط "New Query"
3. انسخ محتوى `drizzle/supabase-migrations.sql`
4. الصقه في محرر SQL
5. اضغط "Run"

#### الطريقة الثانية: استخدام psql

```bash
# تثبيت psql (إذا لم يكن مثبتاً)
# على Ubuntu/Debian:
sudo apt-get install postgresql-client

# على macOS:
brew install postgresql

# على Windows:
# حمل من https://www.postgresql.org/download/windows/

# تشغيل الهجرة
psql "postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres" -f drizzle/supabase-migrations.sql
```

### 4. التحقق من الهجرة

في Supabase Dashboard:
1. اذهب إلى **Table Editor**
2. تحقق من وجود الجداول التالية:
   - users
   - news
   - projects
   - events
   - gallery
   - documents
   - board_members
   - memberships
   - volunteers
   - complaints
   - contact_messages

### 5. تحديث متغيرات البيئة

أضف المتغيرات الجديدة إلى `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
```

### 6. اختبار الاتصال

```bash
# تشغيل خادم التطوير
pnpm dev

# تحقق من عدم وجود أخطاء في الـ console
```

## نقل البيانات من MySQL (اختياري)

إذا كان لديك بيانات في MySQL، يمكنك نقلها:

### استخدام DBeaver

1. تثبيت DBeaver: https://dbeaver.io/download/
2. إنشاء اتصالات:
   - اتصال MySQL القديم
   - اتصال Supabase الجديد
3. استخدام "Database" → "Migrate Database"
4. اتبع الخطوات

### استخدام أدوات سطر الأوامر

```bash
# تصدير من MySQL
mysqldump -u user -p database > backup.sql

# تحويل SQL من MySQL إلى PostgreSQL
# (قد تحتاج إلى تعديلات يدوية)

# استيراد إلى Supabase
psql "postgresql://..." -f backup.sql
```

## استكشاف الأخطاء

### "Connection refused"
- تحقق من `DATABASE_URL`
- تأكد من أن مشروع Supabase نشط
- تحقق من اتصال الإنترنت

### "Table already exists"
- الجداول موجودة بالفعل
- لا تحتاج إلى تشغيل الهجرة مرة أخرى

### "Permission denied"
- تحقق من أن لديك صلاحيات كافية
- استخدم Service Role Key بدلاً من Anon Key

## الخطوات التالية

بعد إكمال الهجرة:

1. ✅ اختبر جميع الصفحات
2. ✅ اختبر النماذج
3. ✅ اختبر لوحة التحكم
4. ✅ تحقق من البريد الإلكتروني
5. ✅ انشر على Vercel

## الدعم

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **GitHub Issues:** https://github.com/Dzogx/sidi-khalifa-association/issues
