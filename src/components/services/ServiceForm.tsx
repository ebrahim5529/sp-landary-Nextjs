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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId?: string;
  onSuccess?: () => void;
}

export function ServiceForm({
  open,
  onOpenChange,
  serviceId,
  onSuccess,
}: ServiceFormProps) {
  const { mockUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [subItems, setSubItems] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    department_id: "",
    price: 0,
    service_type: "",
    sub_item_id: "",
    description: "",
    active: true,
    time_type: "normal" as "free" | "normal" | "urgent",
    urgent_additional_price: 0,
    delivery_time_minutes: 0,
  });

  useEffect(() => {
    if (open) {
      fetchDepartments();
      fetchSubItems();
      if (serviceId) {
        fetchService();
      } else {
        setFormData({
          name: "",
          department_id: "",
          price: 0,
          service_type: "",
          sub_item_id: "",
          description: "",
          active: true,
          time_type: "normal",
          urgent_additional_price: 0,
          delivery_time_minutes: 0,
        });
      }
    }
  }, [serviceId, open, mockUser]);

  const fetchDepartments = async () => {
    // Backend removal cleanup
    setDepartments([]);
  };

  const fetchSubItems = async () => {
    // Backend removal cleanup
    setSubItems([]);
  };

  const fetchService = async () => {
    // Backend removal cleanup
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.department_id) {
      toast.error("القسم مطلوب");
      return;
    }

    if (formData.time_type !== "free" && formData.price <= 0) {
      toast.error("السعر مطلوب للخدمات المدفوعة");
      return;
    }

    if (formData.delivery_time_minutes <= 0) {
      toast.error("وقت التسليم مطلوب");
      return;
    }

    setLoading(true);
    // Backend removal cleanup
    toast.success(serviceId ? "تم تحديث الخدمة بنجاح (بيئة عرض)" : "تم إضافة الخدمة بنجاح (بيئة عرض)");
    onOpenChange(false);
    if (onSuccess) {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{serviceId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</DialogTitle>
          <DialogDescription>
            {serviceId ? "قم بتعديل معلومات الخدمة" : "أدخل معلومات الخدمة الجديدة"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department_id">اسم الخدمة (القسم) *</Label>
                <Select
                  value={formData.department_id || undefined}
                  onValueChange={(value) => {
                    const selectedDept = departments.find((d) => d.id === value);
                    setFormData({
                      ...formData,
                      department_id: value,
                      name: selectedDept?.name || "",
                    });
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sub_item_id">تصنيف الخدمة (القطعة)</Label>
                <Select
                  value={formData.sub_item_id || undefined}
                  onValueChange={(value) => {
                    const selectedSubItem = subItems.find((s) => s.id === value);
                    setFormData({
                      ...formData,
                      sub_item_id: value || "",
                      service_type: selectedSubItem?.name || "",
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القطعة (اختياري)" />
                  </SelectTrigger>
                  <SelectContent>
                    {subItems.map((subItem) => (
                      <SelectItem key={subItem.id} value={subItem.id}>
                        {subItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label>نوع الخدمة *</Label>
              <RadioGroup
                value={formData.time_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, time_type: value as "free" | "normal" | "urgent" })
                }
                className="flex flex-row gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free" className="font-normal cursor-pointer">
                    مجانية
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="font-normal cursor-pointer">
                    عادية
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="font-normal cursor-pointer">
                    مستعجل
                  </Label>
                </div>
              </RadioGroup>
              {formData.time_type === "urgent" && (
                <div className="space-y-2 pr-4 max-w-md">
                  <Label htmlFor="urgent_price">رسوم إضافية للمستعجل (ر.س)</Label>
                  <Input
                    id="urgent_price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.urgent_additional_price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        urgent_additional_price: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">السعر (ر.س) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                  }
                  disabled={formData.time_type === "free"}
                  required
                />
                {formData.time_type === "free" && (
                  <p className="text-sm text-muted-foreground">السعر سيتم تعيينه تلقائياً إلى 0 للخدمات المجانية</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery_time">وقت التسليم (بالدقائق) *</Label>
                <Input
                  id="delivery_time"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.delivery_time_minutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery_time_minutes: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="مثال: 60 (ساعة واحدة)"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف الخدمة"
                rows={3}
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
              {loading ? "جاري الحفظ..." : serviceId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

