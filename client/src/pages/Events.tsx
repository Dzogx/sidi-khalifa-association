import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Layout from "@/components/Layout";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "فعالية التطوع الشهرية",
      date: "2024-07-15",
      time: "08:00 صباحاً",
      location: "ساحة الحي الرئيسية",
      description: "فعالية تطوعية شهرية لتنظيف وتجميل الحي",
      attendees: 150,
      category: "تطوع",
    },
    {
      id: 2,
      title: "ندوة حول التنمية المستدامة",
      date: "2024-07-20",
      time: "18:00 مساءً",
      location: "مركز الجمعية",
      description: "ندوة توعوية حول أهمية التنمية المستدامة",
      attendees: 100,
      category: "ندوات",
    },
    {
      id: 3,
      title: "اجتماع الجمعية العمومية",
      date: "2024-07-25",
      time: "19:00 مساءً",
      location: "قاعة الاجتماعات",
      description: "اجتماع سنوي للجمعية العمومية",
      attendees: 200,
      category: "اجتماعات",
    },
    {
      id: 4,
      title: "دورة تدريبية في الحاسوب",
      date: "2024-08-01",
      time: "14:00 مساءً",
      location: "مركز التدريب",
      description: "دورة تدريبية مجانية في أساسيات الحاسوب",
      attendees: 50,
      category: "تدريب",
    },
    {
      id: 5,
      title: "حفل تكريم المتطوعين",
      date: "2024-08-10",
      time: "17:00 مساءً",
      location: "قاعة الاحتفالات",
      description: "حفل تكريم المتطوعين المميزين",
      attendees: 300,
      category: "احتفالات",
    },
    {
      id: 6,
      title: "ورشة عمل في الحرف اليدوية",
      date: "2024-08-15",
      time: "15:00 مساءً",
      location: "مركز الجمعية",
      description: "ورشة عمل تعليمية في الحرف اليدوية التقليدية",
      attendees: 75,
      category: "ورش عمل",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">الفعاليات</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            تابع الفعاليات والأحداث المهمة في الجمعية
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Event Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                          {event.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                          {event.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#D4AF37] bg-[#0F3A5F]/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {event.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Calendar className="h-5 w-5 text-[#D4AF37]" />
                        {new Date(event.date).toLocaleDateString('ar-SA')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Clock className="h-5 w-5 text-[#D4AF37]" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <MapPin className="h-5 w-5 text-[#D4AF37]" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Users className="h-5 w-5 text-[#D4AF37]" />
                        {event.attendees} متوقع
                      </div>
                    </div>
                  </div>

                  {/* Event Status */}
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="bg-[#0F3A5F]/10 dark:bg-[#D4AF37]/10 rounded-lg p-6">
                        <div className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                          {new Date(event.date) > new Date() ? "قريب" : "مكتمل"}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {new Date(event.date) > new Date()
                            ? `خلال ${Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} أيام`
                            : "انتهت الفعالية"}
                        </p>
                      </div>
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
