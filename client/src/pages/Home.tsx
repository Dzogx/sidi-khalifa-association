import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Users, Briefcase, Calendar, FileText, Heart, MessageSquare, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

/**
 * Home Page
 * 
 * Design: Saharan Modern Architecture
 * - Large cinematic hero with background image
 * - Animated statistics
 * - President message
 * - Latest news
 * - Featured projects
 * - Upcoming events
 * - Gallery preview
 * - Quick services
 * - Newsletter signup
 * - Testimonials
 */

export default function Home() {
  const [stats, setStats] = useState([
    { label: "الأعضاء", value: 0, target: 1250 },
    { label: "المشاريع", value: 0, target: 45 },
    { label: "الفعاليات", value: 0, target: 89 },
    { label: "المتطوعون", value: 0, target: 320 },
  ]);

  // Animate statistics on mount
  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setStats((prev) => {
          const newStats = [...prev];
          if (newStats[index].value < newStats[index].target) {
            newStats[index].value = Math.min(
              newStats[index].value + Math.ceil(newStats[index].target / 30),
              newStats[index].target
            );
          }
          return newStats;
        });
      }, 50);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const recentNews = [
    {
      id: 1,
      title: "إطلاق مشروع تطوير الحي الجديد",
      excerpt: "بدأت الجمعية في تنفيذ مشروع طموح لتطوير البنية التحتية للحي...",
      date: "2024-06-15",
      category: "مشاريع",
    },
    {
      id: 2,
      title: "فعالية التطوع الشهرية الناجحة",
      excerpt: "شارك أكثر من 150 متطوع في فعالية تنظيف وتجميل الحي...",
      date: "2024-06-10",
      category: "فعاليات",
    },
    {
      id: 3,
      title: "اجتماع مجلس الإدارة الدوري",
      excerpt: "تم مناقشة الخطط المستقبلية والمشاريع الجديدة للعام القادم...",
      date: "2024-06-05",
      category: "إعلانات",
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "تحسين الطرق والبنية التحتية",
      description: "مشروع شامل لإعادة تأهيل الطرق وتحسين البنية التحتية",
      progress: 65,
      icon: "🏗️",
    },
    {
      id: 2,
      title: "برنامج التعليم والتدريب",
      description: "دورات تدريبية وبرامج تعليمية للشباب والأطفال",
      progress: 80,
      icon: "📚",
    },
    {
      id: 3,
      title: "مشروع الرعاية الصحية",
      description: "توفير خدمات صحية وتوعية صحية للمجتمع",
      progress: 45,
      icon: "🏥",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "فعالية التطوع الشهرية",
      date: "2024-07-15",
      time: "08:00 صباحاً",
      location: "ساحة الحي الرئيسية",
    },
    {
      id: 2,
      title: "ندوة حول التنمية المستدامة",
      date: "2024-07-20",
      time: "18:00 مساءً",
      location: "مركز الجمعية",
    },
    {
      id: 3,
      title: "اجتماع الجمعية العمومية",
      date: "2024-07-25",
      time: "19:00 مساءً",
      location: "قاعة الاجتماعات",
    },
  ];

  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "العضوية",
      description: "انضم إلى الجمعية وكن جزءاً من مجتمعنا",
      href: "/membership",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "التطوع",
      description: "ساهم في خدمة المجتمع كمتطوع",
      href: "/volunteer",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "الشكاوى والمقترحات",
      description: "شارك آراءك واقتراحاتك معنا",
      href: "/complaints",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "الوثائق",
      description: "اطلع على الوثائق والتقارير الرسمية",
      href: "/documents",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/manus-storage/hero-background_f34205bc.png')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

        {/* Content */}
        <div className="relative z-10 container text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            جمعية حي سيدي خليفة القادري
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md">
            معاً نبني حياً أفضل
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#C49A2E] text-[#0F3A5F] font-bold text-lg px-8"
              asChild
            >
              <Link href="/about">اكتشف المزيد</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-bold text-lg px-8"
              asChild
            >
              <Link href="/contact">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-[#0F3A5F] text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
                  {stat.value.toLocaleString('ar-SA')}
                </div>
                <p className="text-lg text-gray-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                عن الجمعية
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                جمعية حي سيدي خليفة القادري هي منظمة مجتمعية تسعى لتطوير الحي وتحسين جودة الحياة لسكانه من خلال مشاريع مستدامة وفعاليات مجتمعية متنوعة.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                نعمل على تعزيز التعاون والتضامن بين أفراد المجتمع، وتوفير الخدمات الأساسية، وتطوير البنية التحتية، وتعزيز التعليم والصحة.
              </p>
              <Button
                size="lg"
                className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                asChild
              >
                <Link href="/about" className="flex items-center gap-2">
                  تعرف على المزيد <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/manus-storage/about-section-image_1ffafa68.png"
                alt="عن الجمعية"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 bg-[#F5F1E8] dark:bg-slate-800">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              المشاريع المميزة
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              اطلع على أبرز المشاريع التي تقوم بها الجمعية لتطوير الحي
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">التقدم</span>
                    <span className="font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-[#0F3A5F] dark:bg-[#D4AF37] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
              asChild
            >
              <Link href="/projects" className="flex items-center gap-2">
                عرض جميع المشاريع <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              الخدمات السريعة
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              استكشف الخدمات التي تقدمها الجمعية للمجتمع
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <a className="group">
                  <Card className="p-6 h-full hover:shadow-lg transition-all hover:border-[#D4AF37] cursor-pointer">
                    <div className="text-[#0F3A5F] dark:text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 md:py-24 bg-[#F5F1E8] dark:bg-slate-800">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              آخر الأخبار
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              تابع أحدث الأخبار والتطورات في الجمعية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] bg-[#0F3A5F]/10 px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(news.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                    {news.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {news.excerpt}
                  </p>
                  <Link href={`/news/${news.id}`}>
                    <a className="inline-flex items-center gap-2 text-[#0F3A5F] dark:text-[#D4AF37] font-bold hover:gap-3 transition-all">
                      اقرأ المزيد <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
              asChild
            >
              <Link href="/news" className="flex items-center gap-2">
                عرض جميع الأخبار <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              الفعاليات القادمة
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              لا تفوت الفعاليات والأحداث المهمة
            </p>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#D4AF37]" />
                        {new Date(event.date).toLocaleDateString('ar-SA')}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">🕐</span>
                        {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">📍</span>
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                    asChild
                  >
                    <Link href="/events">المزيد</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
              asChild
            >
              <Link href="/events" className="flex items-center gap-2">
                عرض جميع الفعاليات <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 md:py-24 bg-[#F5F1E8] dark:bg-slate-800">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              المعرض
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              استعرض صور من أنشطة وفعاليات الجمعية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0F3A5F] to-[#D4AF37] rounded-lg h-48 flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <ImageIcon className="h-12 w-12 text-white opacity-50" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
              asChild
            >
              <Link href="/gallery" className="flex items-center gap-2">
                عرض المعرض الكامل <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              ابقَ على اطلاع
            </h2>
            <p className="text-lg text-gray-200">
              اشترك في نشرتنا البريدية لتلقي آخر الأخبار والفعاليات
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
              />
              <Button
                className="bg-[#D4AF37] hover:bg-[#C49A2E] text-[#0F3A5F] font-bold px-8"
              >
                اشترك
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
