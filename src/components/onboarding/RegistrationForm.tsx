import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RegistrationFormProps {
  onSuccess: () => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    manager_name: "",
    manager_phone: "",
    commercial_name: "",
    commercial_registration_number: "",
    unified_number: "",
    city: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من الحقول المطلوبة
    if (!formData.manager_name.trim()) {
      toast.error("اسم المسؤول مطلوب");
      return;
    }

    if (!formData.manager_phone.trim()) {
      toast.error("رقم الجوال مطلوب");
      return;
    }

    if (!formData.commercial_name.trim()) {
      toast.error("الاسم التجاري مطلوب");
      return;
    }

    if (!formData.commercial_registration_number.trim()) {
      toast.error("رقم السجل التجاري مطلوب");
      return;
    }

    if (!formData.unified_number.trim()) {
      toast.error("الرقم الموحد مطلوب");
      return;
    }

    // التحقق من أن الرقم الموحد يبدأ بـ 70
    if (!formData.unified_number.startsWith("70")) {
      toast.error("الرقم الموحد يجب أن يبدأ بالرقم 70");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("المدينة مطلوبة");
      return;
    }

    setLoading(true);
    try {
      // Backend removal cleanup - mock submission
      toast.success("تم إرسال البيانات بنجاح (بيئة عرض). في انتظار التفعيل من الأدمن");
      onSuccess();
    } catch (error: any) {
      console.error("Error submitting registration:", error);
      toast.error("حدث خطأ في إرسال البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="manager_name">اسم المسؤول *</Label>
        <Input
          id="manager_name"
          value={formData.manager_name}
          onChange={(e) => setFormData({ ...formData, manager_name: e.target.value })}
          placeholder="أدخل اسم المسؤول"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manager_phone">رقم الجوال *</Label>
        <Input
          id="manager_phone"
          type="tel"
          value={formData.manager_phone}
          onChange={(e) => setFormData({ ...formData, manager_phone: e.target.value })}
          placeholder="05xxxxxxxx"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commercial_name">الاسم التجاري للمغسلة (حسب السجل التجاري) *</Label>
        <Input
          id="commercial_name"
          value={formData.commercial_name}
          onChange={(e) => setFormData({ ...formData, commercial_name: e.target.value })}
          placeholder="أدخل الاسم التجاري"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commercial_registration_number">رقم السجل التجاري *</Label>
        <Input
          id="commercial_registration_number"
          value={formData.commercial_registration_number}
          onChange={(e) => setFormData({ ...formData, commercial_registration_number: e.target.value })}
          placeholder="أدخل رقم السجل التجاري"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unified_number">
          الرقم الموحد * <span className="text-sm text-muted-foreground">(يبدأ بالرقم 70)</span>
        </Label>
        <Input
          id="unified_number"
          value={formData.unified_number}
          onChange={(e) => setFormData({ ...formData, unified_number: e.target.value })}
          placeholder="70xxxxxxx"
          required
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          يجب أن يبدأ الرقم الموحد بالرقم 70
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">المدينة *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="أدخل المدينة"
          required
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        إرسال البيانات
      </Button>
    </form>
  );
}

