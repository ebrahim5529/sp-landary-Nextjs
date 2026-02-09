import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SubscriptionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionId?: string | null;
  onSuccess?: () => void;
}

export function SubscriptionForm({ open, onOpenChange, subscriptionId, onSuccess }: SubscriptionFormProps) {
    const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [formData, setFormData] = useState({
    customer_id: "",
    package_id: "",
    subscription_date: new Date().toISOString().split("T")[0],
    start_date: new Date().toISOString().split("T")[0],
    amount: "",
    status: "active",
    notes: "",
  });

  useEffect(() => {
    if (open) {
      fetchCustomers();
      fetchPackages();
      if (subscriptionId) {
        fetchSubscription();
      } else {
        resetForm();
      }
    }
  }, [open, subscriptionId]);

  const fetchCustomers = async () => {
    // Backend removal cleanup
    setCustomers([]);
  };

  const fetchPackages = async () => {
    // Backend removal cleanup
    setPackages([]);
  };

  const fetchSubscription = async () => {
    // Backend removal cleanup
  };

  const resetForm = () => {
    setFormData({
      customer_id: "",
      package_id: "",
      subscription_date: new Date().toISOString().split("T")[0],
      start_date: new Date().toISOString().split("T")[0],
      amount: "",
      status: "active",
      notes: "",
    });
    setSelectedPackage(null);
  };

  const handlePackageChange = async (packageId: string) => {
    setFormData({ ...formData, package_id: packageId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Backend removal cleanup
    toast.success(subscriptionId ? "تم تحديث الاشتراك بنجاح (بيئة عرض)" : "تم إضافة الاشتراك بنجاح (بيئة عرض)");
    onOpenChange(false);
    if (onSuccess) onSuccess();
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{subscriptionId ? "تعديل الاشتراك" : "إضافة اشتراك جديد"}</DialogTitle>
          <DialogDescription>
            {subscriptionId ? "قم بتعديل معلومات الاشتراك" : "أدخل معلومات الاشتراك الجديد"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer_id">
              العميل <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.customer_id} onValueChange={(value) => setFormData({ ...formData, customer_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر العميل" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} {customer.phone ? `- ${customer.phone}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="package_id">
              الباقة <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.package_id} onValueChange={handlePackageChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الباقة" />
              </SelectTrigger>
              <SelectContent>
                {packages.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.price} ريال ({pkg.duration_days} يوم)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPackage && (
              <p className="text-sm text-muted-foreground mt-1">
                السعر الافتراضي: {selectedPackage.price} ريال | المدة: {selectedPackage.duration_days} يوم
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subscription_date">
                تاريخ الاشتراك <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subscription_date"
                type="date"
                value={formData.subscription_date}
                onChange={(e) => setFormData({ ...formData, subscription_date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="start_date">
                تاريخ بداية الباقة <span className="text-red-500">*</span>
              </Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="amount">
              المبلغ (ريال) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">الحالة</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="expired">منتهي</SelectItem>
                <SelectItem value="suspended">معلق</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أدخل أي ملاحظات إضافية"
              rows={3}
            />
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
              {loading ? "جاري الحفظ..." : subscriptionId ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

