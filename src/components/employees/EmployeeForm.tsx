import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId?: string;
  onSuccess?: () => void;
}

export function EmployeeForm({
  open,
  onOpenChange,
  employeeId,
  onSuccess,
}: EmployeeFormProps) {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    role: "worker",
    status: "active",
    phone: "",
    email: "",
    salary: 0,
    active: true,
  });

  useEffect(() => {
    if (employeeId && open) {
      fetchEmployee();
    } else if (!employeeId && open) {
      setFormData({
        name: "",
        position: "",
        role: "worker",
        status: "active",
        phone: "",
        email: "",
        salary: 0,
        active: true,
      });
    }
  }, [employeeId, open]);

  const fetchEmployee = async () => {
    try {
      // Backend removal cleanup - mock employee fetch
      if (employeeId === "1") {
        setFormData({
          name: "محمد أحمد",
          position: "عامل غسيل",
          role: "worker",
          status: "active",
          phone: "0501111111",
          email: "mohammed@example.com",
          salary: 2500,
          active: true,
        });
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      toast.error("حدث خطأ في جلب بيانات الموظف");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("اسم الموظف مطلوب");
      return;
    }

    setLoading(true);
    try {
      // Backend removal cleanup - mock employee save
      setTimeout(() => {
        if (employeeId) {
          toast.success("تم تحديث الموظف بنجاح (بيئة عرض)");
        } else {
          toast.success("تم إضافة الموظف بنجاح (بيئة عرض)");
        }

        onOpenChange(false);
        if (onSuccess) onSuccess();
        setLoading(false);
      }, 1000);

      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error saving employee:", error);
      toast.error(error.message || "حدث خطأ في حفظ الموظف");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{employeeId ? "تعديل الموظف" : "إضافة موظف جديد"}</DialogTitle>
          <DialogDescription>
            {employeeId ? "قم بتعديل معلومات الموظف" : "أدخل معلومات الموظف الجديد"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">الوظيفة</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">الدور *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">مدير (Admin)</SelectItem>
                  <SelectItem value="cashier">كاشير (Cashier)</SelectItem>
                  <SelectItem value="worker">عامل (Worker)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">يعمل</SelectItem>
                  <SelectItem value="on_leave">إجازة</SelectItem>
                  <SelectItem value="disabled">معطل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الجوال</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">الراتب (ر.س)</Label>
              <Input
                id="salary"
                type="number"
                min="0"
                step="0.01"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="active">نشط</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : employeeId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

