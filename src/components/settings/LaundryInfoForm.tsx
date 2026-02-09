import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export function LaundryInfoForm() {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tax_number: "",
    commercial_registration: "",
    address: "",
    logo_url: "",
    invoice_footer_message: "",
    default_tax_rate: 15,
  });

  useEffect(() => {
    fetchLaundryInfo();
  }, []);

  const fetchLaundryInfo = async () => {
    try {
      // Backend removal cleanup
      setFormData({
        name: "مغسلة الأمل",
        tax_number: "123456789012345",
        commercial_registration: "1010000000",
        address: "الرياض، حي النخيل",
        logo_url: "",
        invoice_footer_message: "شكراً لزيارتكم",
        default_tax_rate: 15,
      });
    } catch (error) {
      console.error("Error fetching laundry info:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("اسم المغسلة مطلوب");
      return;
    }

    setLoading(true);
    try {
      // Backend removal cleanup
      toast.success("تم حفظ معلومات المغسلة بنجاح (بيئة عرض)");
    } catch (error: any) {
      console.error("Error saving laundry info:", error);
      toast.error("حدث خطأ في حفظ المعلومات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>معلومات المغسلة الأساسية</CardTitle>
        <CardDescription>أدخل معلومات المغسلة التي ستظهر في الفواتير</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم المغسلة *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax_number">الرقم الضريبي</Label>
            <Input
              id="tax_number"
              value={formData.tax_number}
              onChange={(e) => setFormData({ ...formData, tax_number: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commercial_registration">رقم السجل التجاري</Label>
            <Input
              id="commercial_registration"
              value={formData.commercial_registration}
              onChange={(e) =>
                setFormData({ ...formData, commercial_registration: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">العنوان</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo_url">رابط اللوجو</Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice_footer_message">رسالة نهاية الفاتورة</Label>
            <Textarea
              id="invoice_footer_message"
              value={formData.invoice_footer_message}
              onChange={(e) =>
                setFormData({ ...formData, invoice_footer_message: e.target.value })
              }
              rows={3}
              placeholder="شكراً لتعاملكم معنا..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="default_tax_rate">نسبة الضريبة الافتراضية (%)</Label>
            <Input
              id="default_tax_rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.default_tax_rate}
              onChange={(e) =>
                setFormData({ ...formData, default_tax_rate: parseFloat(e.target.value) || 15 })
              }
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

