import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

export default function Board() {
  const boardMembers = [
    {
      id: 1,
      name: "محمد أحمد",
      position: "الرئيس",
      bio: "قيادي مجتمعي بخبرة 15 سنة في التنمية المحلية",
    },
    {
      id: 2,
      name: "فاطمة علي",
      position: "نائب الرئيس",
      bio: "متخصصة في البرامج الاجتماعية والتعليم المجتمعي",
    },
    {
      id: 3,
      name: "عمر محمود",
      position: "أمين الصندوق",
      bio: "محاسب معتمد متخصص في الإدارة المالية",
    },
    {
      id: 4,
      name: "ليلى حسن",
      position: "أمين السر",
      bio: "موظفة إدارية بخبرة في التنظيم والتنسيق",
    },
    {
      id: 5,
      name: "سعيد إبراهيم",
      position: "عضو",
      bio: "مهندس متخصص في المشاريع البنية التحتية",
    },
    {
      id: 6,
      name: "نور محمد",
      position: "عضو",
      bio: "معلمة متخصصة في البرامج التعليمية",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">أعضاء مجلس الإدارة</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            تعرف على الفريق القيادي الذي يقود الجمعية
          </p>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#0F3A5F] to-[#D4AF37] flex items-center justify-center">
                  <div className="text-6xl text-white opacity-20">👤</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                    {member.name}
                  </h3>
                  <p className="text-lg font-semibold text-[#D4AF37]">
                    {member.position}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {member.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
