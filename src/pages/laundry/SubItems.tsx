import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SubItemList } from "@/components/subitems/SubItemList";
import { SubItemForm } from "@/components/subitems/SubItemForm";
import { SubItemDetail } from "@/components/subitems/SubItemDetail";
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
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function SubItems() {
    const [formOpen, setFormOpen] = useState(false);
  const [editingSubItemId, setEditingSubItemId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingSubItemId, setViewingSubItemId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSubItemId, setDeletingSubItemId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingSubItemId(null);
    setFormOpen(true);
  };

  const handleEdit = (subItemId: string) => {
    setEditingSubItemId(subItemId);
    setFormOpen(true);
  };

  const handleView = (subItemId: string) => {
    setViewingSubItemId(subItemId);
    setViewDialogOpen(true);
  };

  const handleDelete = (subItemId: string) => {
    setDeletingSubItemId(subItemId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingSubItemId) return;
    toast.info("تم تعطيل الحذف (بيئة عرض فقط)");
    setDeleteDialogOpen(false);
    setDeletingSubItemId(null);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingSubItemId(null);
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">الفرعية (القطع)</h2>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            إضافة قطعة
          </Button>
        </div>

        <SubItemList onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

        <SubItemForm
          open={formOpen}
          onOpenChange={setFormOpen}
          subItemId={editingSubItemId || undefined}
          onSuccess={handleFormSuccess}
        />

        <SubItemDetail
          subItemId={viewingSubItemId}
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من حذف هذه القطعة؟ لا يمكن التراجع عن هذا الإجراء.
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
    </DashboardLayout>
  );
}

