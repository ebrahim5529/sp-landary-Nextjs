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

interface DeviceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deviceId?: string;
  onSuccess?: () => void;
}

export function DeviceForm({
  open,
  onOpenChange,
  deviceId,
  onSuccess,
}: DeviceFormProps) {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "غسيل",
  });

  useEffect(() => {
    if (deviceId && open) {
      fetchDevice();
    } else if (!deviceId && open) {
      setFormData({
        name: "",
        code: "",
        type: "غسيل",
      });
    }
  }, [deviceId, open]);

  const fetchDevice = async () => {
    try {
      // Backend removal cleanup - mock device fetch
      if (deviceId === "1") {
        setFormData({
          name: "غسالة رقم 1",
          code: "WASH-001",
          type: "غسيل",
        });
      }
    } catch (error) {
      console.error("Error fetching device:", error);
      toast.error("حدث خطأ في جلب بيانات الجهاز");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("اسم الجهاز مطلوب");
      return;
    }

    setLoading(true);
    try {
      const deviceData: any = {
        laundry_owner_id: "mock-mockUser-id",
        name: formData.name.trim(),
        type: formData.type,
        status: "working",
      };

      // إضافة رمز الجهاز فقط إذا تم إدخاله
      // ملاحظة: قد لا يكون حقل code موجوداً إذا لم يتم تطبيق migration بعد
      // في هذه الحالة سيتم تجاهل الحقل تلقائياً من Supabase
      if (formData.code && formData.code.trim()) {
        deviceData.code = formData.code.trim();
      }

      // Backend removal cleanup - mock device save
      setTimeout(() => {
        if (deviceId) {
          toast.success("تم تحديث الجهاز بنجاح (بيئة عرض)");
        } else {
          toast.success("تم إضافة الجهاز بنجاح (بيئة عرض)");
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
      console.error("Error saving device:", error);
      toast.error(error.message || "حدث خطأ في حفظ الجهاز");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {deviceId ? "تعديل الجهاز" : "إضافة جهاز جديد"}
          </DialogTitle>
          <DialogDescription>
            {deviceId ? "قم بتعديل معلومات الجهاز" : "أدخل معلومات الجهاز الجديد"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الجهاز *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: كوي – شماغ – تنشيف – غسيل"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">رمز الجهاز (اختياري)</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="مثال: M1 – D200 – DRY02"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">نوع الجهاز *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="غسيل">غسيل</SelectItem>
                  <SelectItem value="كوي">كوي</SelectItem>
                  <SelectItem value="تنشيف">تنشيف</SelectItem>
                  <SelectItem value="شماغ">شماغ</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : deviceId ? "تحديث" : "حفظ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

