import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LoadingState, EmptyDepartments } from "@/components/ui/loading";

interface Department {
  id: string;
  name: string;
  standard_time_minutes: number;
  color: string;
  active: boolean;
  invoice_count?: number;
}

interface DepartmentListProps {
  onEdit?: (departmentId: string) => void;
  onDelete?: (departmentId: string) => void;
}

export function DepartmentList({ onEdit, onDelete }: DepartmentListProps) {
    const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    // Backend removal cleanup - mock departments
    const mockDepartments: Department[] = [
      {
        id: "dept-1",
        name: "الرجالي",
        standard_time_minutes: 1440,
        color: "green",
        active: true,
        invoice_count: 1250,
      },
      {
        id: "dept-2",
        name: "النسائي",
        standard_time_minutes: 2880,
        color: "green",
        active: true,
        invoice_count: 850,
      },
      {
        id: "dept-3",
        name: "المفروشات",
        standard_time_minutes: 4320,
        color: "yellow",
        active: true,
        invoice_count: 320,
      },
      {
        id: "dept-4",
        name: "السجاد",
        standard_time_minutes: 7200,
        color: "red",
        active: false,
        invoice_count: 45,
      },
    ];

    setDepartments(mockDepartments);
    setLoading(false);
  };

  const getColorBadge = (color: string) => {
    const colors: Record<string, { bg: string; text: string; label: string }> = {
      green: { bg: "bg-green-100", text: "text-green-800", label: "عادي" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-800", label: "تحذير" },
      red: { bg: "bg-red-100", text: "text-red-800", label: "حرج" },
    };

    const colorInfo = colors[color] || colors.green;
    return (
      <Badge className={`${colorInfo.bg} ${colorInfo.text}`}>
        {colorInfo.label}
      </Badge>
    );
  };

  const columns: ResponsiveTableColumn<Department>[] = [
    {
      key: "name",
      header: "اسم القسم",
      mobileLabel: "اسم القسم",
      accessor: (dept) => <span className="font-medium">{dept.name}</span>,
    },
    {
      key: "standard_time_minutes",
      header: "الوقت المعياري (دقيقة)",
      mobileLabel: "الوقت المعياري",
      accessor: (dept) => `${dept.standard_time_minutes} دقيقة`,
    },
    {
      key: "invoice_count",
      header: "عدد الفواتير",
      mobileLabel: "عدد الفواتير",
      accessor: (dept) => dept.invoice_count || 0,
    },
    {
      key: "active",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (dept) => (
        <Badge variant={dept.active ? "default" : "secondary"}>
          {dept.active ? "نشط" : "معطل"}
        </Badge>
      ),
    },
    {
      key: "color",
      header: "اللون",
      mobileLabel: "اللون",
      accessor: (dept) => getColorBadge(dept.color),
      hideOnTablet: true,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (dept) => (
        <div className="flex gap-2 flex-wrap">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(dept.id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(dept.id)}
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
      <ResponsiveTable
        columns={columns}
        data={departments}
        keyExtractor={(dept) => dept.id}
        emptyState={<EmptyDepartments />}
      />
    </div>
  );
}

