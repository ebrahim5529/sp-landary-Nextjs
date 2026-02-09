import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import { format } from "date-fns";

interface Device {
  id: string;
  name: string;
  code: string | null;
  type: string;
  status: string;
  created_at: string;
}

interface DeviceListProps {
  onEdit?: (deviceId: string) => void;
  onDelete?: (deviceId: string) => void;
  selectedDevices?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

export function DeviceList({ onEdit, onDelete, selectedDevices = [], onSelectionChange }: DeviceListProps) {
    const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData removed
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    // Backend removal cleanup - mock devices
    const mockDevices: Device[] = [
      {
        id: "dev-1",
        name: "غسالة 10 كجم",
        code: "W-101",
        type: "غسالة",
        status: "working",
        created_at: new Date().toISOString(),
      },
      {
        id: "dev-2",
        name: "غسالة 15 كجم",
        code: "W-102",
        type: "غسالة",
        status: "maintenance",
        created_at: new Date().toISOString(),
      },
      {
        id: "dev-3",
        name: "نشافة كبيرة",
        code: "D-201",
        type: "نشافة",
        status: "working",
        created_at: new Date().toISOString(),
      },
      {
        id: "dev-4",
        name: "مكواة بخار 1",
        code: "I-301",
        type: "مكواة",
        status: "broken",
        created_at: new Date().toISOString(),
      },
    ];

    setDevices(mockDevices);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      working: { label: "يعمل", variant: "default" },
      maintenance: { label: "صيانة", variant: "secondary" },
      broken: { label: "معطل", variant: "destructive" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "outline" };
    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? devices.map(d => d.id) : []);
    }
  };

  const handleSelectDevice = (deviceId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedDevices, deviceId]);
      } else {
        onSelectionChange(selectedDevices.filter(id => id !== deviceId));
      }
    }
  };

  const columns: ResponsiveTableColumn<Device>[] = [
    {
      key: "select",
      header: "",
      mobileLabel: "",
      accessor: (device) => (
        <input
          type="checkbox"
          checked={selectedDevices.includes(device.id)}
          onChange={(e) => handleSelectDevice(device.id, e.target.checked)}
          className="rounded"
        />
      ),
      hideOnTablet: true,
    },
    {
      key: "name",
      header: "اسم الجهاز",
      mobileLabel: "اسم الجهاز",
      accessor: (device) => <span className="font-medium">{device.name}</span>,
    },
    {
      key: "code",
      header: "رمز الجهاز",
      mobileLabel: "رمز الجهاز",
      accessor: (device) => device.code || <span className="text-muted-foreground">-</span>,
    },
    {
      key: "type",
      header: "النوع",
      mobileLabel: "النوع",
      accessor: (device) => <span>{device.type}</span>,
    },
    {
      key: "status",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (device) => getStatusBadge(device.status),
    },
    {
      key: "created_at",
      header: "تاريخ الإضافة",
      mobileLabel: "تاريخ الإضافة",
      accessor: (device) => format(new Date(device.created_at), "yyyy-MM-dd"),
      hideOnTablet: true,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (device) => (
        <div className="flex gap-2 flex-wrap">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(device.id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(device.id)}
              className="text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={4} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {onSelectionChange && (
        <div className="flex items-center gap-2 pb-2">
          <input
            type="checkbox"
            checked={selectedDevices.length === devices.length && devices.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-muted-foreground">تحديد الكل</span>
        </div>
      )}
      <ResponsiveTable
        columns={columns}
        data={devices}
        keyExtractor={(device) => device.id}
        emptyMessage="لا توجد أجهزة مسجلة"
      />
    </div>
  );
}

