import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">التواصل معنا</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            لا تتردد في التواصل معنا لأي استفسار أو اقتراح
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                معلومات التواصل
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-[#D4AF37] flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        العنوان
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        حي سيدي خليفة
                        <br />
                        العالية، ولاية تقرت
                        <br />
                        الجزائر
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Phone */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-[#D4AF37] flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        الهاتف
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        <a href="tel:+213" className="hover:text-[#D4AF37] transition-colors">
                          +213 (0) ...
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Email */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-[#D4AF37] flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        البريد الإلكتروني
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        <a href="mailto:info@example.com" className="hover:text-[#D4AF37] transition-colors">
                          info@example.com
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Hours */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-[#D4AF37] flex-shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        ساعات العمل
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        الأحد - الخميس: 09:00 - 17:00
                        <br />
                        الجمعة - السبت: مغلق
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                أرسل لنا رسالة
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الموضوع
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="">اختر الموضوع</option>\n                    <option value="استفسار">استفسار</option>
                    <option value="اقتراح">اقتراح</option>
                    <option value="شكوى">شكوى</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="أدخل رسالتك هنا"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                >
                  إرسال الرسالة
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
