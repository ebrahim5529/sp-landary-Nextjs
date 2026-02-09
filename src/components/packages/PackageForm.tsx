import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface PackageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageId?: string | null;
  onSuccess?: () => void;
}

export function PackageForm({ open, onOpenChange, packageId, onSuccess }: PackageFormProps) {
  const { mockUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration_days: "",
    services_included: "",
    active: true,
  });

  useEffect(() => {
    if (open && packageId) {
      fetchPackage();
    } else if (open && !packageId) {
      // Reset form for new package
      setFormData({
        name: "",
        description: "",
        price: "",
        duration_days: "",
        services_included: "",
        active: true,
      });
    }
  }, [open, packageId]);

  const fetchPackage = async () => {
    if (!packageId || !mockUser?.id) return;

    try {
      // Backend removal cleanup - mock package fetch
      if (packageId === "1") {
        setFormData({
          name: "باقة الغسيل الشامل",
          description: "غسيل وكي وتعبئة لجميع الملابس",
          price: "150",
          duration_days: "7",
          services_included: "غسيل، كي، تعبئة",
          active: true,
        });
      }
    } catch (error: any) {
      console.error("Error fetching package:", error);
      toast.error("حدث خطأ في تحميل بيانات الباقة");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mockUser?.id) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("يجب إدخال اسم الباقة");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("يجب إدخال سعر صحيح للباقة");
      return;
    }

    if (!formData.duration_days || parseInt(formData.duration_days) <= 0) {
      toast.error("يجب إدخال مدة صحيحة للباقة بالأيام");
      return;
    }

    setLoading(true);

    try {
      const packageData: any = {
        laundry_owner_id: mockUser.id,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        duration_days: parseInt(formData.duration_days),
        services_included: formData.services_included.trim() || null,
        active: formData.active,
      };

      // Backend removal cleanup - mock package save
      setTimeout(() => {
        if (packageId) {
          toast.success("تم تحديث الباقة بنجاح (بيئة عرض)");
        } else {
          toast.success("تم إضافة الباقة بنجاح (بيئة عرض)");
        }

        onOpenChange(false);
        if (onSuccess) onSuccess();
      }, 1000);

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving package:", error);
      toast.error(error.message || "حدث خطأ في حفظ الباقة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{packageId ? "تعديل الباقة" : "إضافة باقة جديدة"}</DialogTitle>
          <DialogDescription>
            {packageId ? "قم بتعديل معلومات الباقة" : "أدخل معلومات الباقة الجديدة"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              اسم الباقة <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="أدخل اسم الباقة"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="أدخل وصف الباقة"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">
                السعر (ريال) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Label htmlFor="duration_days">
                المدة (بالأيام) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                value={formData.duration_days}
                onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                placeholder="30"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="services_included">الخدمات المشمولة</Label>
            <Textarea
              id="services_included"
              value={formData.services_included}
              onChange={(e) => setFormData({ ...formData, services_included: e.target.value })}
              placeholder="أدخل الخدمات المشمولة في الباقة (يمكن استخدام JSON أو نص عادي)"
              rows={4}
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
            <Label htmlFor="active" className="cursor-pointer">
              الباقة نشطة
            </Label>
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
              {loading ? "جاري الحفظ..." : packageId ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

