import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";

export default function Volunteer() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    interests: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Volunteer form submitted:", formData);
    setFormData({ fullName: "", email: "", phone: "", skills: "", availability: "", interests: [] });
  };

  const opportunities = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "المشاريع التنموية",
      description: "ساهم في تطوير البنية التحتية والمشاريع المجتمعية",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "الخدمات الاجتماعية",
      description: "ساعد الأسر المحتاجة وقدم الدعم الاجتماعي",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "البرامج التعليمية",
      description: "شارك في تدريس وتطوير البرامج التعليمية",
    },
  ];

  const interests = [
    "البنية التحتية",
    "التعليم والتدريب",
    "الصحة والرعاية",
    "الخدمات الاجتماعية",
    "البيئة والحدائق",
    "الفعاليات والأنشطة",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">التطوع</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            ساهم في خدمة المجتمع كمتطوع
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
                  <div className="flex justify-center text-[#D4AF37] mb-4">
                    {opp.icon}
                  </div>
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="اذكر مهاراتك والخبرات التي تمتلكها"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توفرك
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">اختر توفرك</option>
                  <option value="دوام كامل">دوام كامل</option>
                  <option value="دوام جزئي">دوام جزئي</option>
                  <option value="عطل نهاية الأسبوع">عطل نهاية الأسبوع</option>
                  <option value="مرن">مرن</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  مجالات الاهتمام
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleCheckboxChange(interest)}
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
              >
                تقديم طلب التطوع
              </Button>
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
              شكراً لاهتمامك بالتطوع معنا. سيتم التواصل معك قريباً
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
