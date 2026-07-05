import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Complaints() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    complaintType: "",
    description: "",
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [trackingRef, setTrackingRef] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const complaintMutation = trpc.forms.submitComplaint.useMutation();
  const trackMutation = trpc.forms.trackComplaint.useQuery({ referenceNumber: trackingRef }, { enabled: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("الاسم الكامل مطلوب");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("البريد الإلكتروني مطلوب");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("رقم الهاتف مطلوب");
      return;
    }
    if (!formData.complaintType) {
      toast.error("نوع الشكوى مطلوب");
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      toast.error("تفاصيل الشكوى يجب أن تكون على الأقل 10 أحرف");
      return;
    }

    try {
      const result = await complaintMutation.mutateAsync(formData);
      if (result.success) {
        setSubmitted(true);
        setReferenceNumber(result.referenceNumber || "");
        toast.success(result.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          complaintType: "",
          description: "",
          additionalNotes: "",
        });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء معالجة الطلب");
    }
  };

  const handleTrack = async () => {
    if (!trackingRef.trim()) {
      toast.error("يرجى إدخال رقم المرجع");
      return;
    }

    try {
      const result = await trackMutation.refetch();
      if (result.data?.found) {
        setTrackingResult(result.data);
        toast.success("تم العثور على الشكوى");
      } else {
        setTrackingResult(null);
        toast.error(result.data?.message || "لم يتم العثور على الشكوى");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء البحث");
    }
  };

  const complaintTypes = [
    "البنية التحتية",
    "الخدمات العامة",
    "الصحة والنظافة",
    "الأمان والسلامة",
    "الضوضاء والإزعاج",
    "أخرى",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F3A5F] to-[#1B5E20] text-white">
        <div className="container text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">الشكاوى والمقترحات</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            شارك آراءك واقتراحاتك معنا لتحسين الخدمات
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                كيفية تقديم شكوى
              </h2>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">1️⃣</div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        ملء النموذج
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        أكمل جميع الحقول المطلوبة بدقة وتفصيل
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">2️⃣</div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        الحصول على رقم مرجع
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        ستحصل على رقم مرجع فريد لتتبع شكواك
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="text-3xl">3️⃣</div>
                    <div>
                      <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                        المتابعة والحل
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        سيتم التواصل معك بخصوص شكواك في أقرب وقت
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-[#F5F1E8] dark:bg-slate-800 border-[#D4AF37]">
                <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-2">
                  ملاحظة مهمة
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  جميع الشكاوى والمقترحات سيتم التعامل معها بسرية وجدية. نحن نقدر آراءك ونسعى لتحسين الخدمات بناءً على ملاحظاتك.
                </p>
              </Card>

              {/* Tracking Section */}
              <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                <h3 className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] mb-4">
                  تتبع شكايتك
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={trackingRef}
                    onChange={(e) => setTrackingRef(e.target.value)}
                    placeholder="أدخل رقم المرجع"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Button
                    onClick={handleTrack}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={trackMutation.isFetching}
                  >
                    {trackMutation.isFetching ? "جاري البحث..." : "بحث"}
                  </Button>
                  {trackingResult && (
                    <div className="mt-4 p-4 bg-white dark:bg-slate-700 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>الحالة:</strong> {trackingResult.status}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        <strong>آخر تحديث:</strong> {new Date(trackingResult.updatedAt).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Complaint Form */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0F3A5F] dark:text-[#D4AF37]">
                نموذج الشكوى
              </h2>

              {submitted ? (
                <Card className="p-8 text-center space-y-4 bg-green-50 dark:bg-green-900/20 border-green-200">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700">تم استلام شكايتك!</h3>
                  <div className="bg-white dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>رقم المرجع:</strong>
                    </p>
                    <p className="text-lg font-bold text-[#0F3A5F] dark:text-[#D4AF37] mt-1">
                      {referenceNumber}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    احفظ هذا الرقم لتتبع شكايتك. سيتم التواصل معك قريباً.
                  </p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      disabled={complaintMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={complaintMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={complaintMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>

                  {/* Complaint Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      نوع الشكوى *
                    </label>
                    <select
                      name="complaintType"
                      value={formData.complaintType}
                      onChange={handleChange}
                      required
                      disabled={complaintMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    >
                      <option value="">اختر نوع الشكوى</option>
                      {complaintTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      تفاصيل الشكوى *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      disabled={complaintMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                      placeholder="اشرح الشكوى بالتفصيل"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={3}
                      disabled={complaintMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                      placeholder="أضف أي معلومات إضافية"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#0F3A5F] hover:bg-[#0A2847] text-white font-bold"
                    disabled={complaintMutation.isPending}
                  >
                    {complaintMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        جاري المعالجة...
                      </>
                    ) : (
                      "تقديم الشكوى"
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * الحقول المطلوبة
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
