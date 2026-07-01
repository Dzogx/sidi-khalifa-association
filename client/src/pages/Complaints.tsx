import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

export default function Complaints() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    complaintType: "",
    description: "",
    attachments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Complaint form submitted:", formData);
    setFormData({ fullName: "", email: "", phone: "", complaintType: "", description: "", attachments: "" });
  };

  const complaintTypes = [
    "البنية التحتية",
    "الخدمات العامة",
    "الصحة والنظافة",
    "الأمان والسلامة",
    "الضوضاء والإزعاج",
    "أخرى",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">الشكاوى والمقترحات</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            شارك آراءك واقتراحاتك معنا لتحسين الخدمات
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                كيفية تقديم شكوى
              </h2>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">1️⃣</div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        ملء النموذج
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        أكمل جميع الحقول المطلوبة بدقة وتفصيل
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">2️⃣</div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        التحقق من البيانات
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        تأكد من صحة بيانات التواصل الخاصة بك
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">3️⃣</div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        الإرسال والمتابعة
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        سيتم التواصل معك بخصوص شكواك في أقرب وقت
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-[#F5F1E8] dark:bg-slate-800 border-[#D4AF37]">
                <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                  ملاحظة مهمة
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  جميع الشكاوى والمقترحات سيتم التعامل معها بسرية وجدية. نحن نقدر آراءك ونسعى لتحسين الخدمات بناءً على ملاحظاتك.
                </p>
              </Card>
            </div>

            {/* Complaint Form */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                نموذج الشكوى
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>

                {/* Complaint Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نوع الشكوى
                  </label>
                  <select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="">اختر نوع الشكوى</option>
                    {complaintTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تفاصيل الشكوى
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="اشرح الشكوى بالتفصيل"
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    name="attachments"
                    value={formData.attachments}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="أضف أي معلومات إضافية"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                >
                  تقديم الشكوى
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
