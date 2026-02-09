import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DeviceList } from "@/components/devices/DeviceList";
import { DeviceForm } from "@/components/devices/DeviceForm";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ExportDialog } from "@/components/common/ExportDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Devices() {
    const [formOpen, setFormOpen] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingDeviceId, setDeletingDeviceId] = useState<string | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [devicesForExport, setDevicesForExport] = useState<any[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    working: 0,
    maintenance: 0,
    broken: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Backend removal cleanup
      setStats({
        total: 5,
        working: 3,
        maintenance: 1,
        broken: 1
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleAdd = () => {
    setEditingDeviceId(null);
    setFormOpen(true);
  };

  const handleEdit = (deviceId: string) => {
    setEditingDeviceId(deviceId);
    setFormOpen(true);
  };

  const handleDelete = (deviceId: string) => {
    setDeletingDeviceId(deviceId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingDeviceId) return;

    try {
      // Backend removal cleanup
      toast.success("تم حذف الجهاز بنجاح (بيئة عرض)");
      setDeleteDialogOpen(false);
      setDeletingDeviceId(null);
      fetchStats();
    } catch (error: any) {
      console.error("Error deleting device:", error);
      toast.error("حدث خطأ في حذف الجهاز");
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingDeviceId(null);
    fetchStats();
    window.location.reload();
  };

  const handleExport = async () => {
    try {
      // Backend removal cleanup
      const mockExportData = [
        {
          "اسم الجهاز": "غسالة كبيرة",
          "رمز الجهاز": "W01",
          "النوع": "غسالة",
          "الحالة": "يعمل",
          "تاريخ الإضافة": "1/1/2024",
        }
      ];

      setDevicesForExport(mockExportData);
      setExportDialogOpen(true);
    } catch (error) {
      console.error("Error fetching devices for export:", error);
      toast.error("حدث خطأ في جلب بيانات الأجهزة");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">إدارة الأجهزة</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة جهاز جديد
            </Button>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأجهزة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">جميع الأجهزة المسجلة</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الأجهزة العاملة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.working}</div>
              <p className="text-xs text-muted-foreground">في حالة عمل</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد الصيانة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
              <p className="text-xs text-muted-foreground">تحتاج صيانة</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الأجهزة المعطلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.broken}</div>
              <p className="text-xs text-muted-foreground">غير قابلة للاستخدام</p>
            </CardContent>
          </Card>
        </div>

        <DeviceList
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedDevices={selectedDevices}
          onSelectionChange={setSelectedDevices}
        />

        <DeviceForm
          open={formOpen}
          onOpenChange={setFormOpen}
          deviceId={editingDeviceId || undefined}
          onSuccess={handleFormSuccess}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من حذف هذا الجهاز؟ لا يمكن التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive">
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <ExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          data={devicesForExport}
          title="تصدير بيانات الأجهزة"
          filename="devices"
          pdfTitle="قائمة الأجهزة"
        />
      </div>
    </DashboardLayout>
  );
}

