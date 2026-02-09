import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { LoadingState, EmptyState } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";

interface Service {
  id: string;
  name: string;
  price: number;
  is_free: boolean;
  service_type?: string;
}

interface SubItemService {
  sub_item_id: string;
  service_id: string;
  price: number;
}

interface ServiceSelectorProps {
  subItemId: string;
  onServicesChange: (services: { service_id: string; service_name?: string; price: number }[]) => void;
}

export function ServiceSelector({ subItemId, onServicesChange }: ServiceSelectorProps) {
  const { mockUser } = useAuth();
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [subItemServices, setSubItemServices] = useState<SubItemService[]>([]);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mockUser && subItemId) {
      fetchServices();
    }
  }, [mockUser, subItemId]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock services data
      const mockServices = [
        {
          id: "1",
          name: "كي إضافي",
          price: 15,
          is_free: false,
          service_type: "additional",
        },
        {
          id: "2",
          name: "تعبئة في أكياس",
          price: 10,
          is_free: false,
          service_type: "packaging",
        },
        {
          id: "3",
          name: "تنظيف بقع",
          price: 25,
          is_free: false,
          service_type: "special",
        },
      ];

      const mockItemServices = [
        {
          sub_item_id: "",
          service_id: "1",
          price: 15,
        },
      ];

      setAvailableServices(mockServices);
      setSubItemServices(mockItemServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("حدث خطأ في جلب الخدمات");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    const newSelected = new Set(selectedServices);
    if (checked) {
      newSelected.add(serviceId);
    } else {
      newSelected.delete(serviceId);
    }
    setSelectedServices(newSelected);

    // إرسال الخدمات المحددة مع الأسعار
    const services = Array.from(newSelected).map((id) => {
      const service = availableServices.find((s) => s.id === id);
      const itemService = subItemServices.find((s) => s.service_id === id);
      return {
        service_id: id,
        service_name: service?.name,
        price: itemService?.price || service?.price || 0,
      };
    });

    onServicesChange(services);
  };

  const getServicePrice = (serviceId: string): number => {
    const itemService = subItemServices.find((s) => s.service_id === serviceId);
    if (itemService) return itemService.price;

    const service = availableServices.find((s) => s.id === serviceId);
    return service?.price || 0;
  };

  if (loading) {
    return <LoadingState variant="spinner" size="sm" />;
  }

  if (availableServices.length === 0) {
    return (
      <EmptyState 
        title="لا توجد خدمات"
        description="لا توجد خدمات متاحة. يرجى إضافة خدمات من صفحة إدارة الخدمات."
      />
    );
  }

  return (
    <div className="space-y-2">
      <Label>اختر الخدمات</Label>
      <div className="space-y-2">
        {availableServices.map((service) => {
          const price = getServicePrice(service.id);
          const isSelected = selectedServices.has(service.id);

          return (
            <Card key={service.id} className={isSelected ? "border-primary" : ""}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`service-${service.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleServiceToggle(service.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`service-${service.id}`}
                    className="flex-1 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium">{service.name}</span>
                      {service.is_free && (
                        <span className="text-xs text-green-600 mr-2">(مجاني)</span>
                      )}
                    </div>
                    {!service.is_free && (
                      <span className="text-sm font-semibold">
                        <CurrencyDisplay amount={price} />
                      </span>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

