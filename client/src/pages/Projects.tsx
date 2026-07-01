import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "تحسين الطرق والبنية التحتية",
      description: "مشروع شامل لإعادة تأهيل الطرق وتحسين البنية التحتية للحي",
      status: "جاري",
      progress: 65,
      category: "بنية تحتية",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
    },
    {
      id: 2,
      title: "برنامج التعليم والتدريب",
      description: "دورات تدريبية وبرامج تعليمية للشباب والأطفال",
      status: "جاري",
      progress: 80,
      category: "تعليم",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
    },
    {
      id: 3,
      title: "مشروع الرعاية الصحية",
      description: "توفير خدمات صحية وتوعية صحية للمجتمع",
      status: "جاري",
      progress: 45,
      category: "صحة",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
    },
    {
      id: 4,
      title: "تطوير الحدائق والمساحات الخضراء",
      description: "إنشاء وتطوير الحدائق العامة والمساحات الخضراء",
      status: "مكتمل",
      progress: 100,
      category: "بيئة",
      startDate: "2023-06-01",
      endDate: "2024-03-31",
    },
    {
      id: 5,
      title: "برنامج الدعم الاجتماعي",
      description: "تقديم الدعم والمساعدة للأسر المحتاجة",
      status: "مكتمل",
      progress: 100,
      category: "اجتماعي",
      startDate: "2023-09-01",
      endDate: "2024-06-30",
    },
    {
      id: 6,
      title: "مشروع الإضاءة العامة",
      description: "تحسين وتطوير نظام الإضاءة العامة في الحي",
      status: "قريب",
      progress: 0,
      category: "بنية تحتية",
      startDate: "2024-09-01",
      endDate: "2025-03-31",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "جاري":
        return "bg-blue-100 text-blue-800";
      case "قريب":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">المشاريع</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            اطلع على المشاريع التي تقوم بها الجمعية لتطوير الحي
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-[#0F3A5F]/10 text-[#0F3A5F] dark:bg-[#D4AF37]/10 dark:text-[#D4AF37]">
                    {project.category}
                  </Badge>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">التقدم</span>
                    <span className="font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
                    <div
                      className="bg-[#0F3A5F] dark:bg-[#D4AF37] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">تاريخ البداية</p>
                    <p className="font-semibold text-[#0F3A5F] dark:text-[#D4AF37]">
                      {new Date(project.startDate).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">تاريخ النهاية</p>
                    <p className="font-semibold text-[#0F3A5F] dark:text-[#D4AF37]">
                      {new Date(project.endDate).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
