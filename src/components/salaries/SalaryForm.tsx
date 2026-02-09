import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { format } from "date-fns";

interface SalaryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salaryId?: string;
  employeeId?: string;
  onSuccess?: () => void;
}

export function SalaryForm({
  open,
  onOpenChange,
  salaryId,
  employeeId,
  onSuccess,
}: SalaryFormProps) {
    const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    employee_id: employeeId || "",
    salary_month: `${format(new Date(), "yyyy-MM")}-01`,
    base_salary: 0,
    bonuses: 0,
    deductions: 0,
    total_hours: "",
    hourly_rate: "",
    payment_date: "",
    payment_method: "",
    notes: "",
    status: "pending",
  });

  useEffect(() => {
    if (open) {
      fetchEmployees();
      if (salaryId) {
        fetchSalary();
      } else if (employeeId) {
        setFormData((prev) => ({ ...prev, employee_id: employeeId }));
        // حساب ساعات العمل تلقائياً من الحضور
        calculateHoursFromAttendance(employeeId, formData.salary_month);
      }
    }
  }, [open, salaryId, employeeId]);

  useEffect(() => {
    // إعادة حساب الساعات عند تغيير الموظف أو الشهر
    if (formData.employee_id && formData.salary_month && !salaryId) {
      calculateHoursFromAttendance(formData.employee_id, formData.salary_month);
    }
  }, [formData.employee_id, formData.salary_month, salaryId]);

  const fetchEmployees = async () => {
    try {
      // Backend removal cleanup - mock employees
      setEmployees([
        { id: "emp1", name: "أحمد محمد" },
        { id: "emp2", name: "خالد محمود" },
      ]);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const calculateHoursFromAttendance = async (empId: string, month: string) => {
    if (!empId || !month) return;

    try {
      // Backend removal cleanup - mock total hours
      setFormData((prev) => ({
        ...prev,
        total_hours: "160",
      }));
    } catch (error) {
      console.error("Error calculating hours from attendance:", error);
    }
  };

  const fetchSalary = async () => {
    if (!salaryId) return;

    try {
      // Backend removal cleanup - mock salary record
      const mockSalary = {
        employee_id: employeeId || "emp1",
        salary_month: `${format(new Date(), "yyyy-MM")}-01`,
        base_salary: 5000,
        bonuses: 500,
        deductions: 100,
        total_hours: 10,
        hourly_rate: 50,
        payment_date: new Date().toISOString(),
        payment_method: "cash",
        notes: "ملاحظات تجريبية",
        status: "paid",
      };

      setFormData({
        employee_id: mockSalary.employee_id,
        salary_month: mockSalary.salary_month,
        base_salary: mockSalary.base_salary,
        bonuses: mockSalary.bonuses,
        deductions: mockSalary.deductions,
        total_hours: mockSalary.total_hours.toString(),
        hourly_rate: mockSalary.hourly_rate.toString(),
        payment_date: format(new Date(mockSalary.payment_date), "yyyy-MM-dd"),
        payment_method: mockSalary.payment_method,
        notes: mockSalary.notes,
        status: mockSalary.status,
      });
    } catch (error: any) {
      console.error("Error fetching salary:", error);
    }
  };

  const calculateTotal = () => {
    let total = formData.base_salary + formData.bonuses - formData.deductions;
    if (formData.total_hours && formData.hourly_rate) {
      total += parseFloat(formData.total_hours) * parseFloat(formData.hourly_rate);
    }
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employee_id) {
      toast.error("يرجى اختيار الموظف");
      return;
    }

    if (formData.base_salary <= 0) {
      toast.error("يرجى إدخال راتب أساسي صحيح");
      return;
    }

    setLoading(true);
    try {
      // Backend removal cleanup
      toast.success(salaryId ? "تم تحديث الراتب بنجاح (بيئة عرض)" : "تم إضافة الراتب بنجاح (بيئة عرض)");

      onSuccess?.();
      onOpenChange(false);
      setFormData({
        employee_id: employeeId || "",
        salary_month: `${format(new Date(), "yyyy-MM")}-01`,
        base_salary: 0,
        bonuses: 0,
        deductions: 0,
        total_hours: "",
        hourly_rate: "",
        payment_date: "",
        payment_method: "",
        notes: "",
        status: "pending",
      });
    } catch (error: any) {
      console.error("Error saving salary:", error);
      toast.error("حدث خطأ في حفظ الراتب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {salaryId ? "تعديل الراتب" : "إضافة راتب جديد"}
          </DialogTitle>
          <DialogDescription>
            {salaryId ? "قم بتعديل بيانات الراتب" : "أدخل بيانات الراتب والحوافز"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee_id">الموظف *</Label>
                <Select
                  value={formData.employee_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, employee_id: value })
                  }
                  disabled={!!employeeId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary_month">الشهر *</Label>
                <Input
                  id="salary_month"
                  type="date"
                  value={formData.salary_month}
                  onChange={(e) =>
                    setFormData({ ...formData, salary_month: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base_salary">الراتب الأساسي (ر.س) *</Label>
                <Input
                  id="base_salary"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.base_salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      base_salary: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonuses">الحوافز (ر.س)</Label>
                <Input
                  id="bonuses"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.bonuses}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bonuses: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deductions">الخصومات (ر.س)</Label>
                <Input
                  id="deductions"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.deductions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deductions: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">معلق</SelectItem>
                    <SelectItem value="paid">مدفوع</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total_hours">ساعات العمل الإضافية</Label>
                <Input
                  id="total_hours"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.total_hours}
                  onChange={(e) =>
                    setFormData({ ...formData, total_hours: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourly_rate">معدل الساعة (ر.س)</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.hourly_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, hourly_rate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment_date">تاريخ الدفع</Label>
                <Input
                  id="payment_date"
                  type="date"
                  value={formData.payment_date}
                  onChange={(e) =>
                    setFormData({ ...formData, payment_date: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment_method">طريقة الدفع</Label>
                <Select
                  value={formData.payment_method}
                  onValueChange={(value) =>
                    setFormData({ ...formData, payment_method: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">نقدي</SelectItem>
                    <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                    <SelectItem value="check">شيك</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border">
              <div className="flex justify-between items-center">
                <span className="font-semibold">الإجمالي:</span>
                <span className="text-2xl font-bold">
                  <CurrencyDisplay amount={calculateTotal()} />
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : salaryId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


