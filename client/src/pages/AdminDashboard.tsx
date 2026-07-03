import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Edit2, Trash2, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

/**
 * Admin Dashboard - CMS Management Interface
 * Allows admins to manage all content without coding
 */
export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("stats");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view">("create");

  // Check if user is admin
  const userRole = user?.role as string | undefined;
  if (!isAuthenticated || (userRole !== "admin" && userRole !== "president" && userRole !== "secretary")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">الوصول مرفوض</h1>
          <p className="text-gray-600 mb-6">أنت لا تملك صلاحيات الوصول إلى لوحة التحكم</p>
          <Button onClick={() => setLocation("/")} className="bg-[#0F3A5F]">
            العودة إلى الرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  // Data queries
  const newsQuery = trpc.cms.news.list.useQuery();
  const projectsQuery = trpc.cms.projects.list.useQuery();
  const eventsQuery = trpc.cms.events.list.useQuery();
  const boardQuery = trpc.cms.boardMembers.list.useQuery();
  const membershipsQuery = trpc.cms.memberships.getPending.useQuery();
  const volunteersQuery = trpc.cms.volunteers.getPending.useQuery();
  const complaintsQuery = trpc.cms.complaints.getNew.useQuery();
  const contactQuery = trpc.cms.contact.getNew.useQuery();

  // Mutations
  const updateMembershipStatusMutation = trpc.cms.memberships.updateStatus.useMutation();
  const updateVolunteerStatusMutation = trpc.cms.volunteers.updateStatus.useMutation();
  const updateComplaintStatusMutation = trpc.cms.complaints.updateStatus.useMutation();



  const handleUpdateMembershipStatus = async (id: number, status: string) => {
    try {
      await updateMembershipStatusMutation.mutateAsync({ id, status });
      toast.success(status === "approved" ? "تم الموافقة على العضوية" : "تم رفض العضوية");
      membershipsQuery.refetch();
    } catch (error) {
      toast.error("حدث خطأ");
    }
  };

  const handleUpdateVolunteerStatus = async (id: number, status: string) => {
    try {
      await updateVolunteerStatusMutation.mutateAsync({ id, status });
      toast.success(status === "approved" ? "تم الموافقة على طلب التطوع" : "تم رفض طلب التطوع");
      volunteersQuery.refetch();
    } catch (error) {
      toast.error("حدث خطأ");
    }
  };

  const handleUpdateComplaintStatus = async (id: number, status: string) => {
    try {
      await updateComplaintStatusMutation.mutateAsync({ id, status });
      toast.success("تم تحديث حالة الشكوى");
      complaintsQuery.refetch();
    } catch (error) {
      toast.error("حدث خطأ");
    }
  };

  const renderContentTable = (
    title: string,
    items: any[] | undefined,
    isLoading: boolean,
    columns: string[],
    type: string
  ) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#0F3A5F]">{title}</h3>
        <Button size="sm" className="bg-[#0F3A5F] hover:bg-[#0A2847]">
          <Plus className="h-4 w-4 mr-2" />
          إضافة
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#0F3A5F]" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {columns.map((col) => (
                  <th key={col} className="text-right py-3 px-4 font-semibold text-gray-700">
                    {col}
                  </th>
                ))}
                <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{item.title || item.name || item.fullName || "—"}</td>
                    {columns.length > 1 && (
                      <>
                        <td className="py-3 px-4">{item.category || item.position || item.status || item.email || "—"}</td>
                        {columns.length > 2 && (
                          <td className="py-3 px-4">{item.description?.substring(0, 50) || item.phone || "—"}</td>
                        )}
                      </>
                    )}
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {type === "memberships" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 text-green-600 hover:bg-green-50"
                              onClick={() => handleUpdateMembershipStatus(item.id, "approved")}
                              disabled={updateMembershipStatusMutation.isPending}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 text-red-600 hover:bg-red-50"
                              onClick={() => handleUpdateMembershipStatus(item.id, "rejected")}
                              disabled={updateMembershipStatusMutation.isPending}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {type === "volunteers" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 text-green-600 hover:bg-green-50"
                              onClick={() => handleUpdateVolunteerStatus(item.id, "approved")}
                              disabled={updateVolunteerStatusMutation.isPending}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 text-red-600 hover:bg-red-50"
                              onClick={() => handleUpdateVolunteerStatus(item.id, "rejected")}
                              disabled={updateVolunteerStatusMutation.isPending}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {type === "complaints" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2"
                              onClick={() => handleUpdateComplaintStatus(item.id, "in_progress")}
                            >
                              قيد المراجعة
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2"
                              onClick={() => handleUpdateComplaintStatus(item.id, "resolved")}
                            >
                              مغلقة
                            </Button>
                          </>
                        )}
                        {type !== "memberships" && type !== "volunteers" && type !== "complaints" && (
                          <>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-8 text-center text-gray-500">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0F3A5F]">لوحة التحكم الإدارية</h1>
          <p className="text-gray-600 mt-2">إدارة محتوى الموقع والبيانات</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">الأخبار</p>
            <p className="text-2xl font-bold text-[#0F3A5F]">{newsQuery.data?.length || 0}</p>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">المشاريع</p>
            <p className="text-2xl font-bold text-[#0F3A5F]">{projectsQuery.data?.length || 0}</p>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">الفعاليات</p>
            <p className="text-2xl font-bold text-[#0F3A5F]">{eventsQuery.data?.length || 0}</p>
          </Card>
          <Card className="p-4 hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm">الطلبات المعلقة</p>
            <p className="text-2xl font-bold text-orange-600">
              {(membershipsQuery.data?.length || 0) + (volunteersQuery.data?.length || 0) + (complaintsQuery.data?.length || 0)}
            </p>
          </Card>
        </div>

        {/* Content Management Tabs */}
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
              <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
              <TabsTrigger value="news">الأخبار</TabsTrigger>
              <TabsTrigger value="projects">المشاريع</TabsTrigger>
              <TabsTrigger value="events">الفعاليات</TabsTrigger>
              <TabsTrigger value="board">المجلس</TabsTrigger>
              <TabsTrigger value="memberships">العضويات</TabsTrigger>
              <TabsTrigger value="volunteers">التطوع</TabsTrigger>
              <TabsTrigger value="complaints">الشكاوى</TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-[#0F3A5F] mb-4">ملخص النشاط</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجمالي الأخبار:</span>
                      <span className="font-bold">{newsQuery.data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجمالي المشاريع:</span>
                      <span className="font-bold">{projectsQuery.data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجمالي الفعاليات:</span>
                      <span className="font-bold">{eventsQuery.data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">أعضاء المجلس:</span>
                      <span className="font-bold">{boardQuery.data?.length || 0}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-[#0F3A5F] mb-4">الطلبات المعلقة</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">طلبات عضوية:</span>
                      <span className="font-bold text-orange-600">{membershipsQuery.data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">طلبات تطوع:</span>
                      <span className="font-bold text-orange-600">{volunteersQuery.data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">شكاوى جديدة:</span>
                      <span className="font-bold text-orange-600">{complaintsQuery.data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رسائل تواصل:</span>
                      <span className="font-bold text-orange-600">{contactQuery.data?.length || 0}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news" className="mt-6">
              {renderContentTable("إدارة الأخبار", newsQuery.data, newsQuery.isLoading, ["العنوان", "الفئة"], "news")}
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-6">
              {renderContentTable("إدارة المشاريع", projectsQuery.data, projectsQuery.isLoading, ["العنوان", "الحالة"], "project")}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-6">
              {renderContentTable("إدارة الفعاليات", eventsQuery.data, eventsQuery.isLoading, ["العنوان", "الموقع"], "event")}
            </TabsContent>

            {/* Board Tab */}
            <TabsContent value="board" className="mt-6">
              {renderContentTable("أعضاء المجلس", boardQuery.data, boardQuery.isLoading, ["الاسم", "المنصب"], "board")}
            </TabsContent>

            {/* Memberships Tab */}
            <TabsContent value="memberships" className="mt-6">
              {renderContentTable(
                "طلبات العضوية المعلقة",
                membershipsQuery.data,
                membershipsQuery.isLoading,
                ["الاسم", "البريد الإلكتروني"],
                "memberships"
              )}
            </TabsContent>

            {/* Volunteers Tab */}
            <TabsContent value="volunteers" className="mt-6">
              {renderContentTable(
                "طلبات التطوع المعلقة",
                volunteersQuery.data,
                volunteersQuery.isLoading,
                ["الاسم", "المهارات"],
                "volunteers"
              )}
            </TabsContent>

            {/* Complaints Tab */}
            <TabsContent value="complaints" className="mt-6">
              {renderContentTable(
                "الشكاوى الجديدة",
                complaintsQuery.data,
                complaintsQuery.isLoading,
                ["الموضوع", "النوع"],
                "complaints"
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
