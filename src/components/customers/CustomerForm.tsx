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
import { toast } from "sonner";

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId?: string;
  onSuccess?: () => void;
}

export function CustomerForm({
  open,
  onOpenChange,
  customerId,
  onSuccess,
}: CustomerFormProps) {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (customerId && open) {
      fetchCustomer();
    } else if (!customerId && open) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        notes: "",
      });
    }
  }, [customerId, open]);

  const fetchCustomer = async () => {
    try {
      // Backend removal cleanup - mock customer fetch
      if (customerId === "1") {
        setFormData({
          name: "أحمد علي",
          phone: "0501234567",
          email: "ahmed@example.com",
          notes: "عميل منتظم",
        });
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("حدث خطأ في جلب بيانات العميل");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("الاسم ورقم الجوال مطلوبان");
      return;
    }

    setLoading(true);
    try {
      // Backend removal cleanup - mock customer save
      setTimeout(() => {
        if (customerId) {
          toast.success("تم تحديث العميل بنجاح (بيئة عرض)");
        } else {
          toast.success("تم إضافة العميل بنجاح (بيئة عرض)");
        }

        onOpenChange(false);
        if (onSuccess) {
          onSuccess();
        }
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      console.error("Error saving customer:", error);
      toast.error("حدث خطأ في حفظ العميل");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {customerId ? "تعديل العميل" : "إضافة عميل جديد"}
          </DialogTitle>
          <DialogDescription>
            {customerId
              ? "قم بتعديل معلومات العميل"
              : "أدخل معلومات العميل الجديد"}
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
                placeholder="اسم العميل"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الجوال *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05xxxxxxxx"
                maxLength={10}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="ملاحظات إضافية"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : customerId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

