import { Link } from "wouter";
import { ArrowRight, CheckCircle, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

export default function About() {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "الرؤية",
      description: "بناء حي متطور يتمتع بخدمات متقدمة وبنية تحتية قوية",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "الرسالة",
      description: "خدمة المجتمع وتطويره من خلال مشاريع مستدامة وفعاليات مجتمعية",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "القيم",
      description: "التعاون والتضامن والشفافية والمسؤولية الاجتماعية",
    },
  ];

  const achievements = [
    { number: "45+", label: "مشروع منجز" },
    { number: "1250+", label: "عضو نشط" },
    { number: "89", label: "فعالية سنوية" },
    { number: "320+", label: "متطوع" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">عن الجمعية</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            تعرف على جمعية حي سيدي خليفة القادري ورسالتها في خدمة المجتمع
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container space-y-16">
          {/* Overview */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              من نحن
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              جمعية حي سيدي خليفة القادري هي منظمة مجتمعية غير ربحية تأسست بهدف خدمة سكان حي سيدي خليفة في العالية بولاية تقرت. تعمل الجمعية على تطوير الحي وتحسين جودة الحياة لسكانه من خلال مشاريع مستدامة وفعاليات مجتمعية متنوعة.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              نسعى إلى بناء مجتمع متماسك يتمتع بخدمات متقدمة وبنية تحتية قوية، ونعمل على تعزيز التعاون والتضامن بين أفراد المجتمع، وتوفير الخدمات الأساسية، وتطوير البنية التحتية، وتعزيز التعليم والصحة.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              رؤيتنا وقيمنا
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center text-[#0F3A5F] dark:text-[#D4AF37]">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              إنجازاتنا
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-[#F5F1E8] dark:bg-slate-800 p-8 rounded-lg text-center space-y-2">
                  <div className="text-4xl font-bold text-[#D4AF37]">
                    {achievement.number}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {achievement.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              أهدافنا
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "تطوير البنية التحتية للحي",
                "توفير خدمات صحية وتعليمية",
                "تعزيز التعاون المجتمعي",
                "دعم المشاريع الاقتصادية",
                "حماية البيئة والموارد الطبيعية",
                "تطوير الموارد البشرية",
              ].map((objective, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#F5F1E8] dark:bg-slate-800">
        <div className="container text-center space-y-6">
          <h2 className="text-4xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
            انضم إلينا في رحلة التطور
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            كن جزءاً من مجتمع متماسك يعمل على تطوير الحي وتحسين جودة الحياة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
              asChild
            >
              <Link href="/membership" className="flex items-center gap-2">
                انضم للجمعية <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#C49A2E] text-[#0F3A5F] font-bold"
              asChild
            >
              <Link href="/volunteer" className="flex items-center gap-2">
                تطوع معنا <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
