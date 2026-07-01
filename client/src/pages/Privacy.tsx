import Layout from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">سياسة الخصوصية</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            تعرف على كيفية حماية بيانات
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              مقدمة
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نحن في جمعية حي سيدي خليفة القادري نلتزم بحماية خصوصيتك وبيانات الشخصية. تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              جمع البيانات
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نقوم بجمع البيانات الشخصية التي تقدمها لنا طواعية من خلال النماذج على موقعنا، مثل:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>الاسم الكامل</li>
              <li>البريد الإلكتروني</li>
              <li>رقم الهاتف</li>
              <li>العنوان</li>
              <li>المهنة والمهارات</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              استخدام البيانات
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نستخدم بياناتك الشخصية للأغراض التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>معالجة طلبات العضوية والتطوع</li>
              <li>التواصل معك بخصوص الفعاليات والبرامج</li>
              <li>تحسين خدماتنا</li>
              <li>الرد على استفساراتك وشكاواك</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              حماية البيانات
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نتخذ تدابير أمنية مناسبة لحماية بيانات الشخصية من الوصول غير المصرح به أو الإفصاح أو التعديل أو الحذف.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              حقوقك
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              لديك الحق في:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>الوصول إلى بيانات الشخصية الخاصة بك</li>
              <li>تصحيح أي معلومات غير صحيحة</li>
              <li>طلب حذف بيانات الشخصية الخاصة بك</li>
              <li>الاعتراض على معالجة بيانات الشخصية الخاصة بك</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              التواصل معنا
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية أو بيانات الشخصية الخاصة بك، يرجى التواصل معنا من خلال البريد الإلكتروني أو الهاتف.
            </p>
          </div>

          <div className="p-6 bg-[#F5F1E8] dark:bg-slate-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              آخر تحديث: يناير 2024
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
