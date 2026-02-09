import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SalaryList } from "@/components/salaries/SalaryList";
import { SalaryForm } from "@/components/salaries/SalaryForm";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Salaries() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingSalaryId, setEditingSalaryId] = useState<string | undefined>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingSalaryId(undefined);
    setSelectedEmployeeId(null);
    setFormOpen(true);
  };

  const handleEdit = (salaryId: string) => {
    setEditingSalaryId(salaryId);
    setSelectedEmployeeId(null);
    setFormOpen(true);
  };

  const handleDelete = (salaryId: string) => {
    // يتم التعامل مع الحذف في SalaryList
  };

  const handleSuccess = () => {
    setFormOpen(false);
    setEditingSalaryId(undefined);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold">الرواتب والحوافز</h2>
              <p className="text-muted-foreground">
                إدارة رواتب الموظفين والحوافز والخصومات
              </p>
            </div>
          </div>
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            إضافة راتب جديد
          </Button>
        </div>

        <SalaryList onEdit={handleEdit} onDelete={handleDelete} />

        <SalaryForm
          open={formOpen}
          onOpenChange={setFormOpen}
          salaryId={editingSalaryId}
          employeeId={selectedEmployeeId}
          onSuccess={handleSuccess}
        />
      </div>
    </DashboardLayout>
  );
}

