import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";

export default function Gallery() {
  const galleryItems = [
    { id: 1, title: "فعالية التطوع", category: "فعاليات" },
    { id: 2, title: "مشروع البنية التحتية", category: "مشاريع" },
    { id: 3, title: "الحدائق العامة", category: "بيئة" },
    { id: 4, title: "برنامج التدريب", category: "تدريب" },
    { id: 5, title: "الاجتماع العام", category: "اجتماعات" },
    { id: 6, title: "حفل التكريم", category: "احتفالات" },
    { id: 7, title: "ورشة العمل", category: "ورش عمل" },
    { id: 8, title: "الندوة التوعوية", category: "ندوات" },
    { id: 9, title: "الأنشطة الاجتماعية", category: "اجتماعي" },
    { id: 10, title: "البرامج التعليمية", category: "تعليم" },
    { id: 11, title: "الحملات الصحية", category: "صحة" },
    { id: 12, title: "الفعاليات الثقافية", category: "ثقافة" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">المعرض</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            استعرض صور من أنشطة وفعاليات الجمعية
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg h-48 bg-gradient-to-br from-[#0F3A5F] to-[#D4AF37] hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-white opacity-30" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-start p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-white/80 text-xs">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
