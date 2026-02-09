"use client";

import { useState } from "react";
import { ServiceList } from "@/components/services/ServiceList";
import { ServiceForm } from "@/components/services/ServiceForm";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { ServiceStats } from "@/components/services/ServiceStats";
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

export default function ServicesPage() {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingServiceId, setViewingServiceId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingServiceId(null);
    setFormOpen(true);
  };

  const handleEdit = (serviceId: string) => {
    setEditingServiceId(serviceId);
    setFormOpen(true);
  };

  const handleView = (serviceId: string) => {
    setViewingServiceId(serviceId);
    setViewDialogOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    setDeletingServiceId(serviceId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingServiceId) return;
    toast.info("تم تعطيل الحذف (بيئة عرض فقط)");
    setDeleteDialogOpen(false);
    setDeletingServiceId(null);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingServiceId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">الخدمات</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة خدمة
        </Button>
      </div>

      <ServiceStats />

      <ServiceList onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      <ServiceForm
        open={formOpen}
        onOpenChange={setFormOpen}
        serviceId={editingServiceId || undefined}
        onSuccess={handleFormSuccess}
      />

      <ServiceDetail
        serviceId={viewingServiceId}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.
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