import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "كيف يمكنني الانضمام إلى الجمعية؟",
      answer: "يمكنك الانضمام إلى الجمعية من خلال ملء نموذج العضوية على الموقع. ستحتاج إلى تقديم معلوماتك الشخصية ودفع رسوم العضوية السنوية.",
    },
    {
      id: 2,
      question: "ما هي رسوم العضوية السنوية؟",
      answer: "رسوم العضوية السنوية هي 500 دج، وتشمل الوصول الكامل إلى جميع البرامج والخدمات التي تقدمها الجمعية.",
    },
    {
      id: 3,
      question: "هل يمكنني التطوع دون أن أكون عضواً؟",
      answer: "نعم، يمكنك التطوع معنا دون الحاجة إلى أن تكون عضواً. ما عليك سوى ملء نموذج التطوع وسيتم التواصل معك.",
    },
    {
      id: 4,
      question: "كيف يمكنني تقديم شكوى أو اقتراح؟",
      answer: "يمكنك تقديم شكواك أو اقتراحاتك من خلال صفحة الشكاوى والمقترحات على الموقع. سيتم التعامل معها بسرية وجدية.",
    },
    {
      id: 5,
      question: "ما هي ساعات عمل الجمعية؟",
      answer: "ساعات عمل الجمعية من الأحد إلى الخميس من 09:00 صباحاً إلى 17:00 مساءً. الجمعة والسبت مغلق.",
    },
    {
      id: 6,
      question: "كيف يمكنني الحصول على معلومات عن المشاريع الجارية؟",
      answer: "يمكنك الاطلاع على المشاريع الجارية من خلال صفحة المشاريع على الموقع. كما يمكنك التواصل معنا مباشرة للحصول على معلومات أكثر تفصيلاً.",
    },
    {
      id: 7,
      question: "هل الجمعية تقدم خدمات صحية؟",
      answer: "نعم، الجمعية تقدم برامج توعية صحية وحملات صحية دورية. كما نسعى لتوفير خدمات صحية أساسية للمجتمع.",
    },
    {
      id: 8,
      question: "كيف يمكنني الاطلاع على الوثائق والتقارير الرسمية؟",
      answer: "يمكنك الاطلاع على جميع الوثائق والتقارير الرسمية من خلال صفحة الوثائق على الموقع. جميع الوثائق متاحة للتحميل.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">الأسئلة الشائعة</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            إجابات على الأسئلة الشائعة حول الجمعية وخدماتها
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card
                key={faq.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between gap-4 hover:bg-[#F5F1E8] dark:hover:bg-slate-800 transition-colors"
                >
                  <h3 className="text-lg font-bold text-[#0F3A5F] dark:text-[#D4AF37] text-right">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-[#D4AF37] flex-shrink-0 transition-transform ${
                      expandedId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === faq.id && (
                  <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-[#F5F1E8] dark:bg-slate-800 rounded-lg text-center space-y-4">
            <h3 className="text-xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
              لم تجد إجابة لسؤالك؟
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              تواصل معنا مباشرة من خلال صفحة التواصل أو اتصل بنا على الهاتف
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
