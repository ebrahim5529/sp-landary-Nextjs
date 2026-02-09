import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { CustomerDetail } from "@/components/customers/CustomerDetail";
import { ExportDialog } from "@/components/customers/ExportDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Customers() {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);

  const handleAdd = () => {
    setEditingCustomerId(null);
    setFormOpen(true);
  };

  const handleEdit = (customerId: string) => {
    setEditingCustomerId(customerId);
    setFormOpen(true);
  };

  const handleView = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingCustomerId(null);
    // إعادة تحميل القائمة
    window.location.reload();
  };

  const handleExport = async () => {
    toast.info("تصدير البيانات معطل حالياً");
  };

  const handleBackToList = () => {
    setSelectedCustomerId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">العملاء</h2>
          {!selectedCustomerId && (
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة عميل
            </Button>
          )}
          {selectedCustomerId && (
            <Button variant="outline" onClick={handleBackToList}>
              ← العودة للقائمة
            </Button>
          )}
        </div>

        {selectedCustomerId ? (
          <CustomerDetail
            customerId={selectedCustomerId}
            onEdit={() => handleEdit(selectedCustomerId)}
          />
        ) : (
          <CustomerList
            onEdit={handleEdit}
            onView={handleView}
            onExport={handleExport}
          />
        )}

        <CustomerForm
          open={formOpen}
          onOpenChange={setFormOpen}
          customerId={editingCustomerId || undefined}
          onSuccess={handleFormSuccess}
        />

        <ExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          customers={customers}
        />
      </div>
    </DashboardLayout>
  );
}

