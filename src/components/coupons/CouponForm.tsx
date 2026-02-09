import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface CouponFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponId?: string | null;
  onSuccess?: () => void;
}

export function CouponForm({ open, onOpenChange, couponId, onSuccess }: CouponFormProps) {
  const { mockUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    coupon_type: "discount", // discount, offer, coupon
    discount_type: "fixed", // fixed, percentage, item, conditional
    code: "",
    discount_value: "",
    usage_limit: "",
    min_purchase: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  useEffect(() => {
    if (open && couponId) {
      fetchCoupon();
    } else if (open && !couponId) {
      // Reset form for new coupon
      setFormData({
        coupon_type: "discount",
        discount_type: "fixed",
        code: "",
        discount_value: "",
        usage_limit: "",
        min_purchase: "",
        start_date: "",
        end_date: "",
        notes: "",
      });
    }
  }, [open, couponId]);

  const fetchCoupon = async () => {
    if (!couponId || !mockUser?.id) return;

    try {
      // Backend removal cleanup - mock coupon fetch
      if (couponId === "1") {
        setFormData({
          coupon_type: "discount",
          discount_type: "percentage",
          code: "DISCOUNT10",
          discount_value: "10",
          usage_limit: "100",
          min_purchase: "50",
          start_date: new Date().toISOString().split("T")[0],
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          notes: "خصم 10% للطلبات فوق 50 ريال",
        });
      }
    } catch (error: any) {
      console.error("Error fetching coupon:", error);
      toast.error("فشل تحميل بيانات القسيمة");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockUser?.id) return;

    if (!formData.code.trim()) {
      toast.error("يجب إدخال رمز الكوبون");
      return;
    }

    if (!formData.discount_value) {
      toast.error("يجب إدخال قيمة الخصم");
      return;
    }

    setLoading(true);

    try {
      // استخدام الحقول الأساسية فقط أولاً
      // سنحاول إضافة الحقول الاختيارية لاحقاً إذا نجحت المحاولة الأولى
      const couponData: any = {
        laundry_owner_id: mockUser.id,
        code: formData.code.trim().toUpperCase(),
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        active: true,
      };

      // إضافة الحقول الجديدة فقط إذا كانت موجودة في قاعدة البيانات
      // ملاحظة: قد لا تكون هذه الحقول موجودة إذا لم يتم تطبيق migration بعد
      // سنحاول إضافتها، وإذا فشلنا سنحاول بدونها
      // لا نضيف notes و min_purchase الآن لأن schema cache لم يتم تحديثه بعد

      // Backend removal cleanup - mock coupon save
      setTimeout(() => {
        if (couponId) {
          toast.success("تم تحديث القسيمة بنجاح (بيئة عرض)");
        } else {
          toast.success("تم إضافة القسيمة بنجاح (بيئة عرض)");
        }

        onOpenChange(false);
        if (onSuccess) onSuccess();
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      console.error("Error saving coupon:", error);
      toast.error("حدث خطأ في حفظ القسيمة");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{couponId ? "تعديل القسيمة" : "إضافة قسيمة جديدة"}</DialogTitle>
          <DialogDescription>
            {couponId ? "قم بتعديل معلومات القسيمة" : "أدخل معلومات القسيمة الجديدة"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coupon_type">نوع الكوبون *</Label>
              <Select
                value={formData.coupon_type}
                onValueChange={(value) => setFormData({ ...formData, coupon_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الكوبون" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">خصم</SelectItem>
                  <SelectItem value="offer">عرض</SelectItem>
                  <SelectItem value="coupon">كوبون</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount_type">نوع الخصم *</Label>
              <Select
                value={formData.discount_type}
                onValueChange={(value) => setFormData({ ...formData, discount_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الخصم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">خصم ثابت</SelectItem>
                  <SelectItem value="percentage">خصم نسبة مئوية</SelectItem>
                  <SelectItem value="item">خصم على قطعة</SelectItem>
                  <SelectItem value="conditional">خصم بشروط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">رمز الكوبون *</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="أدخل رمز الكوبون"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount_value">
                قيمة الخصم * {formData.discount_type === "percentage" ? "(%)" : "(ريال)"}
              </Label>
              <Input
                id="discount_value"
                type="number"
                step="0.01"
                min="0"
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                placeholder={formData.discount_type === "percentage" ? "مثال: 10" : "مثال: 50"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usage_limit">عدد مرات الاستخدام</Label>
              <Input
                id="usage_limit"
                type="number"
                min="1"
                value={formData.usage_limit}
                onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                placeholder="اتركه فارغاً للاستخدام غير المحدود"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="min_purchase">الحد الأدنى للاستخدام (ريال)</Label>
            <Input
              id="min_purchase"
              type="number"
              step="0.01"
              min="0"
              value={formData.min_purchase}
              onChange={(e) => setFormData({ ...formData, min_purchase: e.target.value })}
              placeholder="مثال: 100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">تاريخ البداية</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">تاريخ النهاية</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : couponId ? "تحديث" : "حفظ"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
