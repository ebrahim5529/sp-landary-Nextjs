"use client";

import { useState, useEffect } from "react";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { SupplierForm } from "@/components/suppliers/SupplierForm";
import { Button } from "@/components/ui/button";
import { Plus, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { ExportDialog } from "@/components/common/ExportDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SuppliersPage() {
    const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editingSupplierId, setEditingSupplierId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSupplierId, setDeletingSupplierId] = useState<string | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [suppliersForExport] = useState<any[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
  });

  useEffect(() => {
    // Stats fetching removed - backend removal mock
    setStats({ total: 12 });
  }, []);

  const fetchStats = async () => {
    // Backend removal cleanup
  };

  const handleAdd = () => {
    setEditingSupplierId(null);
    setFormOpen(true);
  };

  const handleEdit = (supplierId: string) => {
    setEditingSupplierId(supplierId);
    setFormOpen(true);
  };

  const handleDelete = (supplierId: string) => {
    setDeletingSupplierId(supplierId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingSupplierId) return;
    toast.info("تم تعطيل الحذف (بيئة عرض فقط)");
    setDeleteDialogOpen(false);
    setDeletingSupplierId(null);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingSupplierId(null);
    fetchStats();
    router.refresh();
  };

  const handleExport = async () => {
    toast.info("تصدير البيانات معطل حالياً");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">إدارة الموردين</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            إضافة مورد جديد
          </Button>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموردين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">جميع الموردين المسجلين</p>
          </CardContent>
        </Card>
      </div>

      {/* البحث */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث بالاسم أو الرقم الضريبي أو سجل التجارة أو رقم الهاتف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <SupplierList
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedSuppliers={selectedSuppliers}
        onSelectionChange={setSelectedSuppliers}
        searchQuery={searchQuery}
      />

      <SupplierForm
        open={formOpen}
        onOpenChange={setFormOpen}
        supplierId={editingSupplierId || undefined}
        onSuccess={handleFormSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا المورد؟ لا يمكن التراجع عن هذا الإجراء.
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
        data={suppliersForExport}
        title="تصدير بيانات الموردين"
        filename="suppliers"
        pdfTitle="قائمة الموردين"
      />
    </div>
  );
}