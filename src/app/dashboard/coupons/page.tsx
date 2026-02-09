"use client";

import { useState } from "react";
import { CouponList } from "@/components/coupons/CouponList";
import { CouponForm } from "@/components/coupons/CouponForm";
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

export default function CouponsPage() {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingCouponId, setDeletingCouponId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingCouponId(null);
    setFormOpen(true);
  };

  const handleEdit = (couponId: string) => {
    setEditingCouponId(couponId);
    setFormOpen(true);
  };

  const handleDelete = (couponId: string) => {
    setDeletingCouponId(couponId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingCouponId) return;

    try {
      // Backend removal cleanup
      toast.success("تم حذف القسيمة بنجاح (بيئة عرض)");
      setDeleteDialogOpen(false);
      setDeletingCouponId(null);
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting coupon:", error);
      toast.error("حدث خطأ في حذف القسيمة");
    }
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingCouponId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">القسائم</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة قسيمة
        </Button>
      </div>

      <CouponList onEdit={handleEdit} onDelete={handleDelete} />

      <CouponForm
        open={formOpen}
        onOpenChange={setFormOpen}
        couponId={editingCouponId || undefined}
        onSuccess={handleFormSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذه القسيمة؟ لا يمكن التراجع عن هذا الإجراء.
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