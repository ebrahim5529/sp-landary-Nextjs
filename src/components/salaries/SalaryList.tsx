import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { toast } from "sonner";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { Edit2, Trash2, DollarSign } from "lucide-react";
import { LoadingState, EmptySalaries } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";

interface SalaryRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  salary_month: string;
  base_salary: number;
  bonuses: number | null;
  deductions: number | null;
  total_hours: number | null;
  hourly_rate: number | null;
  total_amount: number;
  payment_date: string | null;
  payment_method: string | null;
  notes: string | null;
  status: string | null;
}

interface SalaryListProps {
  onEdit?: (salaryId: string) => void;
  onDelete?: (salaryId: string) => void;
  employeeId?: string | null;
}

export function SalaryList({ onEdit, onDelete, employeeId }: SalaryListProps) {
  const { mockUser } = useAuth();
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (mockUser) {
      fetchSalaries();
    }
  }, [mockUser, filterMonth, filterStatus, employeeId]);

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock salaries
      const mockSalaries: SalaryRecord[] = [
        {
          id: "1",
          employee_id: "emp1",
          employee_name: "أحمد محمد",
          salary_month: filterMonth + "-01",
          base_salary: 5000,
          bonuses: 500,
          deductions: 100,
          total_hours: 160,
          hourly_rate: 20,
          total_amount: 5400,
          payment_date: new Date().toISOString(),
          payment_method: "cash",
          notes: "راتب شهر " + filterMonth,
          status: "paid",
        },
      ];

      setSalaries(mockSalaries);
    } catch (error) {
      console.error("Error fetching salaries:", error);
      toast.error("حدث خطأ في جلب بيانات الرواتب");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الراتب؟")) {
      return;
    }

    try {
      // Backend removal cleanup
      toast.success("تم حذف الراتب بنجاح (بيئة عرض)");
      fetchSalaries();
    } catch (error: any) {
      console.error("Error deleting salary:", error);
      toast.error("حدث خطأ في حذف الراتب");
    }
  };

  const getStatusBadge = (status: string | null) => {
    const statuses: Record<
      string,
      { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
    > = {
      pending: { label: "معلق", variant: "secondary" },
      paid: { label: "مدفوع", variant: "default" },
      cancelled: { label: "ملغي", variant: "destructive" },
    };
    const statusInfo = statuses[status || "pending"] || statuses.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={7} />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="month">الشهر</Label>
          <Input
            id="month"
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">الحالة</Label>
          <select
            id="status"
            className="w-full h-10 px-3 border rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">الكل</option>
            <option value="pending">معلق</option>
            <option value="paid">مدفوع</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={fetchSalaries} className="w-full">
            تطبيق الفلترة
          </Button>
        </div>
      </div>

      {salaries.length === 0 ? (
        <EmptySalaries />
      ) : (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الشهر</TableHead>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>الراتب الأساسي</TableHead>
                <TableHead>الحوافز</TableHead>
                <TableHead>الخصومات</TableHead>
                <TableHead>ساعات العمل</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>تاريخ الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaries.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell>
                    {format(new Date(salary.salary_month), "yyyy-MM")}
                  </TableCell>
                  <TableCell className="font-medium">{salary.employee_name}</TableCell>
                  <TableCell>
                    <CurrencyDisplay amount={salary.base_salary} />
                  </TableCell>
                  <TableCell>
                    <CurrencyDisplay amount={salary.bonuses || 0} />
                  </TableCell>
                  <TableCell>
                    <CurrencyDisplay amount={salary.deductions || 0} />
                  </TableCell>
                  <TableCell>
                    {salary.total_hours
                      ? `${salary.total_hours.toFixed(2)} ساعة`
                      : "-"}
                  </TableCell>
                  <TableCell className="font-bold">
                    <CurrencyDisplay amount={salary.total_amount} />
                  </TableCell>
                  <TableCell>
                    {salary.payment_date
                      ? format(new Date(salary.payment_date), "yyyy-MM-dd")
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(salary.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(salary.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(salary.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

