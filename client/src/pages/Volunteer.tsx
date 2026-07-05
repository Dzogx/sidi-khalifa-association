import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Loader2, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    interests: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);
  const volunteerMutation = trpc.forms.submitVolunteer.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

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
    if (formData.interests.length === 0) {
      toast.error("يرجى اختيار مجال اهتمام واحد على الأقل");
      return;
    }

    try {
      const result = await volunteerMutation.mutateAsync(formData);
      if (result.success) {
        setSubmitted(true);
        toast.success(result.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          skills: "",
          availability: "",
          interests: [],
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء معالجة الطلب");
    }
  };

  const opportunities = [
    {
      title: "المشاريع التنموية",
      description: "ساهم في تطوير البنية التحتية والمشاريع المجتمعية",
    },
    {
      title: "الخدمات الاجتماعية",
      description: "ساعد الأسر المحتاجة وقدم الدعم الاجتماعي",
    },
    {
      title: "البرامج التعليمية",
      description: "شارك في تدريس وتطوير البرامج التعليمية",
    },
  ];

  const interests = [
    "تنظيف وتجميل",
    "تعليم وتدريب",
    "رعاية صحية",
    "مشاريع بنية تحتية",
    "فعاليات ثقافية",
    "دعم اجتماعي",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-[#D4AF37]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">التطوع معنا</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            ساهم في خدمة المجتمع وكن جزءاً من الفرق التطوعية
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          {/* Opportunities */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-8 text-center">
              فرص التطوع
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {opportunities.map((opp, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                    {opp.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {opp.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Volunteer Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-8 text-center">
              نموذج التطوع
            </h2>

            {submitted ? (
              <Card className="p-8 text-center space-y-4 bg-green-50 dark:bg-green-900/20 border-green-200">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-700">شكراً لاهتمامك!</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  تم استلام طلب التطوع الخاص بك. سيتم التواصل معك قريباً لمناقشة الفرص المتاحة.
                </p>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={volunteerMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={volunteerMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={volunteerMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المهارات والخبرات
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows={3}
                    disabled={volunteerMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    placeholder="اذكر مهاراتك والخبرات التي تمتلكها"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    التوفر الزمني
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    disabled={volunteerMutation.isPending}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                  >
                    <option value="">اختر التوفر الزمني</option>
                    <option value="دوام كامل">دوام كامل</option>
                    <option value="دوام جزئي">دوام جزئي</option>
                    <option value="عطل نهاية الأسبوع">عطل نهاية الأسبوع</option>
                    <option value="مرن">مرن</option>
                  </select>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    مجالات الاهتمام * (اختر واحد أو أكثر)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          disabled={volunteerMutation.isPending}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                  disabled={volunteerMutation.isPending}
                >
                  {volunteerMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "تقديم طلب التطوع"
                  )}
                </Button>

                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  * الحقول المطلوبة
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
