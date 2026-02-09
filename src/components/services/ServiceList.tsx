import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";
import { LoadingState, EmptyServices } from "@/components/ui/loading";

interface Service {
  id: string;
  name: string;
  price: number;
  is_free: boolean;
  service_type: string | null;
  description: string | null;
  active: boolean;
  time_type: "free" | "normal" | "urgent" | null;
  urgent_additional_price: number | null;
  delivery_time_minutes: number | null;
}

interface ServiceListProps {
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  onView?: (serviceId: string) => void;
}

export function ServiceList({ onEdit, onDelete, onView }: ServiceListProps) {
    const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    // Backend removal cleanup - mock services
    const mockServices: Service[] = [
      {
        id: "svc-1",
        name: "غسيل وكوي",
        price: 5.0,
        is_free: false,
        service_type: "غسيل وكوي",
        description: "غسيل آلي مع كوي بخار",
        active: true,
        time_type: "normal",
        urgent_additional_price: 2.0,
        delivery_time_minutes: 1440,
      },
      {
        id: "svc-2",
        name: "غسيل مستعجل",
        price: 8.0,
        is_free: false,
        service_type: "غسيل وكوي",
        description: "تسليم خلال نفس اليوم",
        active: true,
        time_type: "urgent",
        urgent_additional_price: 3.0,
        delivery_time_minutes: 360,
      },
      {
        id: "svc-3",
        name: "كوي بخار فقط",
        price: 3.0,
        is_free: false,
        service_type: "كوي",
        description: "كوي بخار سريع",
        active: true,
        time_type: "normal",
        urgent_additional_price: 1.0,
        delivery_time_minutes: 120,
      },
      {
        id: "svc-4",
        name: "توصيل منزل",
        price: 0,
        is_free: true,
        service_type: "توصيل",
        description: "خدمة التوصيل المجانية للمنزل",
        active: true,
        time_type: "free",
        urgent_additional_price: 0,
        delivery_time_minutes: 60,
      },
    ];

    setServices(mockServices);
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

  const columns: ResponsiveTableColumn<Service>[] = [
    {
      key: "name",
      header: "اسم الخدمة",
      mobileLabel: "اسم الخدمة",
      accessor: (service) => <span className="font-medium">{service.name}</span>,
    },
    {
      key: "service_type",
      header: "التصنيف",
      mobileLabel: "التصنيف",
      accessor: (service) => <span className="text-sm text-muted-foreground">{service.service_type || "-"}</span>,
      hideOnTablet: true,
    },
    {
      key: "time_type",
      header: "نوع الخدمة",
      mobileLabel: "نوع الخدمة",
      accessor: (service) => getTimeTypeBadge(service.time_type),
    },
    {
      key: "price",
      header: "السعر",
      mobileLabel: "السعر",
      accessor: (service) => {
        if (service.time_type === "free") {
          return <span className="text-green-600 font-medium">مجاني</span>;
        }
        const totalPrice = service.price + (service.time_type === "urgent" && service.urgent_additional_price ? service.urgent_additional_price : 0);
        return (
          <div className="flex flex-col gap-1">
            <CurrencyDisplay amount={service.price} />
            {service.time_type === "urgent" && service.urgent_additional_price && service.urgent_additional_price > 0 && (
              <span className="text-xs text-muted-foreground">
                + {service.urgent_additional_price} ر.س (مستعجل)
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "delivery_time",
      header: "وقت التسليم",
      mobileLabel: "وقت التسليم",
      accessor: (service) => (
        <span className="text-sm">{formatDeliveryTime(service.delivery_time_minutes)}</span>
      ),
      hideOnTablet: true,
    },
    {
      key: "description",
      header: "الوصف",
      mobileLabel: "الوصف",
      accessor: (service) => (
        <span className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
          {service.description || "-"}
        </span>
      ),
      hideOnTablet: true,
    },
    {
      key: "active",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (service) => (
        <Badge variant={service.active ? "default" : "secondary"}>
          {service.active ? "نشط" : "معطل"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (service) => (
        <div className="flex gap-2 flex-wrap">
          {onView && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(service.id)}
              className="h-8 w-8 p-0"
              title="عرض التفاصيل"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(service.id)}
              className="h-8 w-8 p-0"
              title="تعديل"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(service.id)}
              className="text-destructive h-8 w-8 p-0"
              title="حذف"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={5} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <ResponsiveTable
        columns={columns}
        data={services}
        keyExtractor={(service) => service.id}
        emptyState={<EmptyServices />}
      />
    </div>
  );
}

