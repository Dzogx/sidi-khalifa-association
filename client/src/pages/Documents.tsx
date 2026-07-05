import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function Documents() {
  const documents = [
    {
      id: 1,
      title: "النظام الأساسي للجمعية",
      description: "الوثيقة الأساسية التي تحدد أهداف وقواعد الجمعية",
      category: "أساسي",
      date: "2023-01-15",
    },
    {
      id: 2,
      title: "التقرير السنوي 2023",
      description: "التقرير الشامل عن أنشطة وإنجازات الجمعية",
      category: "تقارير",
      date: "2024-01-30",
    },
    {
      id: 3,
      title: "الميزانية السنوية 2024",
      description: "الميزانية المعتمدة للعام المالي 2024",
      category: "مالي",
      date: "2024-01-15",
    },
    {
      id: 4,
      title: "قرارات مجلس الإدارة",
      description: "مجموعة القرارات الصادرة من مجلس الإدارة",
      category: "إداري",
      date: "2024-06-01",
    },
    {
      id: 5,
      title: "سياسة الخصوصية",
      description: "سياسة حماية البيانات الشخصية",
      category: "قانوني",
      date: "2024-01-01",
    },
    {
      id: 6,
      title: "شروط الاستخدام",
      description: "شروط استخدام الموقع والخدمات",
      category: "قانوني",
      date: "2024-01-01",
    },
    {
      id: 7,
      title: "خطة العمل 2024",
      description: "الخطة الاستراتيجية والأهداف للعام الحالي",
      category: "استراتيجي",
      date: "2024-01-10",
    },
    {
      id: 8,
      title: "التقرير المالي الربع الأول",
      description: "التقرير المالي لفترة الربع الأول من 2024",
      category: "مالي",
      date: "2024-04-15",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "أساسي":
        return "bg-red-100 text-red-800";
      case "تقارير":
        return "bg-blue-100 text-blue-800";
      case "مالي":
        return "bg-green-100 text-green-800";
      case "إداري":
        return "bg-purple-100 text-purple-800";
      case "قانوني":
        return "bg-yellow-100 text-yellow-800";
      case "استراتيجي":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">الوثائق</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            اطلع على الوثائق والتقارير الرسمية للجمعية
          </p>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="text-[#D4AF37] flex-shrink-0">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                          {doc.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                          {doc.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(doc.category)}`}>
                          {doc.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(doc.date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white"
                      >
                        <Download className="h-4 w-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
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
