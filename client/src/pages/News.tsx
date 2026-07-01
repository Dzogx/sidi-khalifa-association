import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import Layout from "@/components/Layout";

export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: "إطلاق مشروع تطوير الحي الجديد",
      excerpt: "بدأت الجمعية في تنفيذ مشروع طموح لتطوير البنية التحتية للحي...",
      content: "تم إطلاق مشروع شامل لتطوير البنية التحتية في الحي يشمل إعادة تأهيل الطرق وتحسين نظام الصرف الصحي.",
      date: "2024-06-15",
      author: "محمد أحمد",
      category: "مشاريع",
    },
    {
      id: 2,
      title: "فعالية التطوع الشهرية الناجحة",
      excerpt: "شارك أكثر من 150 متطوع في فعالية تنظيف وتجميل الحي...",
      content: "نجحت فعالية التطوع الشهرية بمشاركة أكثر من 150 متطوع في تنظيف وتجميل الحي.",
      date: "2024-06-10",
      author: "فاطمة علي",
      category: "فعاليات",
    },
    {
      id: 3,
      title: "اجتماع مجلس الإدارة الدوري",
      excerpt: "تم مناقشة الخطط المستقبلية والمشاريع الجديدة للعام القادم...",
      content: "عقد مجلس الإدارة اجتماعاً دورياً لمناقشة الخطط المستقبلية والمشاريع الجديدة.",
      date: "2024-06-05",
      author: "عمر محمود",
      category: "إعلانات",
    },
    {
      id: 4,
      title: "برنامج تدريبي جديد للشباب",
      excerpt: "أطلقت الجمعية برنامجاً تدريبياً متخصصاً للشباب في مجالات متعددة...",
      content: "تم إطلاق برنامج تدريبي شامل للشباب يغطي مجالات متعددة مثل الحاسوب والإدارة.",
      date: "2024-05-28",
      author: "ليلى حسن",
      category: "تعليم",
    },
    {
      id: 5,
      title: "حملة التوعية الصحية",
      excerpt: "أطلقت الجمعية حملة توعية صحية شاملة للمجتمع...",
      content: "تم إطلاق حملة توعية صحية شاملة تغطي مواضيع صحية مهمة للمجتمع.",
      date: "2024-05-20",
      author: "سعيد إبراهيم",
      category: "صحة",
    },
    {
      id: 6,
      title: "تكريم المتطوعين المميزين",
      excerpt: "كرمت الجمعية المتطوعين المميزين الذين ساهموا بشكل فعال...",
      content: "تم تكريم المتطوعين المميزين الذين ساهموا بشكل فعال في أنشطة الجمعية.",
      date: "2024-05-15",
      author: "نور محمد",
      category: "فعاليات",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">الأخبار</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            تابع أحدث الأخبار والتطورات في الجمعية
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <Badge className="bg-[#0F3A5F]/10 text-[#0F3A5F] dark:bg-[#D4AF37]/10 dark:text-[#D4AF37]">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                    {article.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
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
