import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SupplierFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierId?: string | null;
  onSuccess?: () => void;
}

export function SupplierForm({ open, onOpenChange, supplierId, onSuccess }: SupplierFormProps) {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tax_number: "",
    national_address: "",
    commercial_registration: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (open) {
      if (supplierId) {
        fetchSupplier();
      } else {
        resetForm();
      }
    }
  }, [open, supplierId]);

  const fetchSupplier = async () => {
    // Backend removal cleanup
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      tax_number: "",
      national_address: "",
      commercial_registration: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("اسم المورد مطلوب");
      return;
    }

    setLoading(true);
    // Backend removal cleanup
    toast.success(supplierId ? "تم تحديث المورد بنجاح (بيئة عرض)" : "تم إضافة المورد بنجاح (بيئة عرض)");
    onOpenChange(false);
    if (onSuccess) {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {supplierId ? "تعديل المورد" : "إضافة مورد جديد"}
          </DialogTitle>
          <DialogDescription>
            {supplierId ? "قم بتعديل معلومات المورد" : "أدخل معلومات المورد الجديد"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المورد *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم المورد"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tax_number">الرقم الضريبي</Label>
                <Input
                  id="tax_number"
                  value={formData.tax_number}
                  onChange={(e) => setFormData({ ...formData, tax_number: e.target.value })}
                  placeholder="أدخل الرقم الضريبي"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercial_registration">سجل التجارة</Label>
                <Input
                  id="commercial_registration"
                  value={formData.commercial_registration}
                  onChange={(e) => setFormData({ ...formData, commercial_registration: e.target.value })}
                  placeholder="أدخل رقم السجل التجاري"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="national_address">العنوان الوطني</Label>
              <Input
                id="national_address"
                value={formData.national_address}
                onChange={(e) => setFormData({ ...formData, national_address: e.target.value })}
                placeholder="أدخل العنوان الوطني"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="أدخل العنوان"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="أدخل أي ملاحظات إضافية"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : supplierId ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

