"use client";

import { useState } from "react";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingEmployeeId(null);
    setFormOpen(true);
  };

  const handleEdit = (employeeId: string) => {
    setEditingEmployeeId(employeeId);
    setFormOpen(true);
  };

  const handleDelete = (employeeId: string) => {
    setDeletingEmployeeId(employeeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingEmployeeId) return;
    toast.info("تم تعطيل الحذف (بيئة عرض فقط)");
    setDeleteDialogOpen(false);
    setDeletingEmployeeId(null);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingEmployeeId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">الموظفين</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة موظف
        </Button>
      </div>

      <EmployeeList onEdit={handleEdit} onDelete={handleDelete} />

      <EmployeeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        employeeId={editingEmployeeId || undefined}
        onSuccess={handleFormSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.
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
    </div>
  );
}