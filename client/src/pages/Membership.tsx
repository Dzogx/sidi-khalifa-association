import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Membership() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitted, setSubmitted] = useState(false);
  const membershipMutation = trpc.forms.submitMembership.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("الاسم الكامل مطلوب");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("البريد الإلكتروني مطلوب");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("رقم الهاتف مطلوب");
      return;
    }

    try {
      const result = await membershipMutation.mutateAsync(formData);
      if (result.success) {
        setSubmitted(true);
        toast.success(result.message);
        setFormData({ fullName: "", email: "", phone: "", address: "", occupation: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء معالجة الطلب");
    }
  };

  const benefits = [
    "الاستفادة من جميع برامج وفعاليات الجمعية",
    "المشاركة في اتخاذ القرارات",
    "الحصول على الأخبار والتحديثات المنتظمة",
    "الوصول إلى الخدمات والموارد",
    "بناء شبكة علاقات مجتمعية",
    "المساهمة في تطوير الحي",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">العضوية</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            انضم إلى الجمعية وكن جزءاً من مجتمعنا
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                فوائد العضوية
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <CheckCircle className="h-6 w-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <Card className="p-6 bg-[#F5F1E8] dark:bg-slate-800 border-[#D4AF37]">
                <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                  الرسوم السنوية
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  رسوم العضوية السنوية: <span className="font-bold text-[#D4AF37]">500 دج</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  الرسوم تشمل الوصول الكامل لجميع البرامج والخدمات
                </p>
              </Card>
            </div>

            {/* Membership Form */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                نموذج الانضمام
              </h2>

              {submitted ? (
                <Card className="p-8 text-center space-y-4 bg-green-50 dark:bg-green-900/20 border-green-200">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700">تم استلام طلبك بنجاح!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    شكراً لاهتمامك بالانخراط في الجمعية. سيتم التواصل معك قريباً لتأكيد طلبك.
                  </p>
                </Card>
              ) : (
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
                    disabled={membershipMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
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
                    disabled={membershipMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
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
                    disabled={membershipMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={membershipMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="أدخل عنوانك"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المهنة/الوظيفة
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    disabled={membershipMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="أدخل مهنتك"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                  disabled={membershipMutation.isPending}
                >
                  {membershipMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "تقديم طلب العضوية"
                  )}
                </Button>
              </form>
              )}

              {!submitted && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  سيتم التواصل معك قريباً لتأكيد عضويتك
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
