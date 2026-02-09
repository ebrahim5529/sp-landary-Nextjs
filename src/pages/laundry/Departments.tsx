import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DepartmentList } from "@/components/departments/DepartmentList";
import { DepartmentForm } from "@/components/departments/DepartmentForm";
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
import { ExportDialog } from "@/components/customers/ExportDialog";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Departments() {
    const [formOpen, setFormOpen] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState<string | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [departmentsForExport, setDepartmentsForExport] = useState<any[]>([]);

  const handleAdd = () => {
    setEditingDepartmentId(null);
    setFormOpen(true);
  };

  const handleEdit = (departmentId: string) => {
    setEditingDepartmentId(departmentId);
    setFormOpen(true);
  };

  const handleDelete = (departmentId: string) => {
    setDeletingDepartmentId(departmentId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingDepartmentId) return;

    try {
      // Backend removal cleanup
      toast.success("تم حذف القسم بنجاح (بيئة عرض)");
      setDeleteDialogOpen(false);
      setDeletingDepartmentId(null);
    } catch (error: any) {
      console.error("Error deleting department:", error);
      toast.error("حدث خطأ في حذف القسم");
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingDepartmentId(null);
    window.location.reload();
  };

  const handleExport = async () => {
    try {
      // Backend removal cleanup
      const mockExportData = [
        {
          "اسم القسم": "غسيل جاف",
          "الوقت القياسي (دقيقة)": 30,
          "اللون": "blue",
          "عدد الفواتير": 15,
          "الحالة": "نشط",
        }
      ];

      setDepartmentsForExport(mockExportData);
      setExportDialogOpen(true);
    } catch (error) {
      console.error("Error fetching departments for export:", error);
      toast.error("حدث خطأ في جلب بيانات الأقسام");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">الأقسام</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة قسم
            </Button>
          </div>
        </div>

        <DepartmentList onEdit={handleEdit} onDelete={handleDelete} />

        <DepartmentForm
          open={formOpen}
          onOpenChange={setFormOpen}
          departmentId={editingDepartmentId || undefined}
          onSuccess={handleFormSuccess}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من حذف هذا القسم؟ لا يمكن التراجع عن هذا الإجراء.
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
          customers={departmentsForExport}
        />
      </div>
    </DashboardLayout>
  );
}

