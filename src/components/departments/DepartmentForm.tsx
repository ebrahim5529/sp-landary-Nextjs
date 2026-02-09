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

interface DepartmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId?: string;
  onSuccess?: () => void;
}

export function DepartmentForm({
  open,
  onOpenChange,
  departmentId,
  onSuccess,
}: DepartmentFormProps) {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    standard_time_minutes: 10,
    color: "green",
    active: true,
  });

  useEffect(() => {
    if (departmentId && open) {
      fetchDepartment();
    } else if (!departmentId && open) {
      setFormData({
        name: "",
        standard_time_minutes: 10,
        color: "green",
        active: true,
      });
    }
  }, [departmentId, open]);

  const fetchDepartment = async () => {
    try {
      // Backend removal cleanup - mock department fetch
      if (departmentId === "1") {
        setFormData({
          name: "قسم الغسيل",
          standard_time_minutes: 120,
          color: "blue",
          active: true,
        });
      }
    } catch (error) {
      console.error("Error fetching department:", error);
      toast.error("حدث خطأ في جلب بيانات القسم");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("اسم القسم مطلوب");
      return;
    }

    setLoading(true);
    try {
      // Backend removal cleanup - mock department save
      setTimeout(() => {
        if (departmentId) {
          toast.success("تم تحديث القسم بنجاح (بيئة عرض)");
        } else {
          toast.success("تم إضافة القسم بنجاح (بيئة عرض)");
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
      console.error("Error saving department:", error);
      toast.error(error.message || "حدث خطأ في حفظ القسم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {departmentId ? "تعديل القسم" : "إضافة قسم جديد"}
          </DialogTitle>
          <DialogDescription>
            {departmentId ? "قم بتعديل معلومات القسم" : "أدخل معلومات القسم الجديد"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم القسم *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: رجالي، نسائي، أطفال"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standard_time">الوقت المعياري (بالدقائق) *</Label>
              <Input
                id="standard_time"
                type="number"
                min="1"
                value={formData.standard_time_minutes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    standard_time_minutes: parseInt(e.target.value) || 10,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">اللون الافتراضي</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">أخضر (عادي)</SelectItem>
                  <SelectItem value="yellow">أصفر (تحذير)</SelectItem>
                  <SelectItem value="red">أحمر (حرج)</SelectItem>
                </SelectContent>
              </Select>
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
              {loading ? "جاري الحفظ..." : departmentId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

