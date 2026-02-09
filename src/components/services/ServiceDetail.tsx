import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { LoadingState } from "@/components/ui/loading";
import { toast } from "sonner";

interface ServiceDetailProps {
  serviceId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ServiceDetail {
  id: string;
  name: string;
  department_id: string | null;
  department_name: string | null;
  price: number;
  service_type: string | null;
  sub_item_id: string | null;
  sub_item_name: string | null;
  description: string | null;
  active: boolean;
  time_type: "free" | "normal" | "urgent" | null;
  urgent_additional_price: number | null;
  delivery_time_minutes: number | null;
  is_free: boolean;
}

export function ServiceDetail({ serviceId, open, onOpenChange }: ServiceDetailProps) {
    const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceId && open) {
      fetchServiceDetail();
    } else {
      setService(null);
    }
  }, [serviceId, open]);

  const fetchServiceDetail = async () => {
    setLoading(true);
    // Backend removal cleanup
    setLoading(false);
  };

  const getTimeTypeBadge = (timeType: string | null) => {
    switch (timeType) {
      case "free":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">مجانية</Badge>;
      case "urgent":
        return <Badge variant="destructive">مستعجل</Badge>;
      case "normal":
      default:
        return <Badge variant="default">عادية</Badge>;
    }
  };

  const formatDeliveryTime = (minutes: number | null) => {
    if (!minutes) return "-";
    if (minutes < 60) return `${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} ساعة`;
    return `${hours} ساعة ${mins} دقيقة`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تفاصيل الخدمة</DialogTitle>
          <DialogDescription>عرض جميع معلومات الخدمة</DialogDescription>
        </DialogHeader>

        {loading ? (
          <LoadingState variant="spinner" size="lg" />
        ) : service ? (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">اسم الخدمة</label>
                <p className="text-base font-medium">{service.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">القسم</label>
                <p className="text-base">{service.department_name || "-"}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">التصنيف (القطعة)</label>
                <p className="text-base">{service.sub_item_name || service.service_type || "-"}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">نوع الخدمة</label>
                <div>{getTimeTypeBadge(service.time_type)}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">السعر</label>
                <div className="flex flex-col gap-1">
                  {service.time_type === "free" ? (
                    <span className="text-green-600 font-medium">مجاني</span>
                  ) : (
                    <>
                      <CurrencyDisplay amount={service.price} />
                      {service.time_type === "urgent" && service.urgent_additional_price && service.urgent_additional_price > 0 && (
                        <span className="text-sm text-muted-foreground">
                          + {service.urgent_additional_price} ر.س (رسوم إضافية للمستعجل)
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">وقت التسليم</label>
                <p className="text-base">{formatDeliveryTime(service.delivery_time_minutes)}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">الحالة</label>
                <Badge variant={service.active ? "default" : "secondary"}>
                  {service.active ? "نشط" : "معطل"}
                </Badge>
              </div>
            </div>
            {service.description && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">الوصف</label>
                <p className="text-base whitespace-pre-wrap">{service.description}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">الخدمة غير موجودة</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

