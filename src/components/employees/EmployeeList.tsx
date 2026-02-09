import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";
import { LoadingState, EmptyEmployees } from "@/components/ui/loading";

interface Employee {
  id: string;
  name: string;
  employee_code: string | null;
  position: string | null;
  role: string | null;
  status: string | null;
  salary: number | null;
  active: boolean;
}

interface EmployeeListProps {
  onEdit?: (employeeId: string) => void;
  onDelete?: (employeeId: string) => void;
}

export function EmployeeList({ onEdit, onDelete }: EmployeeListProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock employees
      const mockEmployees: Employee[] = [
        {
          id: "1",
          name: "خالد منصور",
          employee_code: "EMP-001",
          position: "كاشير",
          role: "cashier",
          status: "active",
          salary: 4500,
          active: true,
        },
        {
          id: "2",
          name: "ياسين عبدالله",
          employee_code: "EMP-002",
          position: "عامل مغسلة",
          role: "worker",
          status: "active",
          salary: 3500,
          active: true,
        },
        {
          id: "3",
          name: "أحمد محمد",
          employee_code: "EMP-003",
          position: "عامل كوي",
          role: "worker",
          status: "active",
          salary: 3200,
          active: true,
        },
        {
          id: "4",
          name: "سعيد علي",
          employee_code: "EMP-004",
          position: "سائق توصيل",
          role: "worker",
          status: "on_leave",
          salary: 4000,
          active: true,
        },
        {
          id: "5",
          name: "إبراهيم حسن",
          employee_code: "EMP-005",
          position: "مدير مناوب",
          role: "admin",
          status: "active",
          salary: 6000,
          active: true,
        },
      ];
      setEmployees(mockEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("حدث خطأ في جلب الموظفين");
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string | null) => {
    const roles: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      admin: { label: "مدير", variant: "default" },
      cashier: { label: "كاشير", variant: "secondary" },
      worker: { label: "عامل", variant: "outline" },
    };
    const roleInfo = roles[role || "worker"] || roles.worker;
    return <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>;
  };

  const getStatusBadge = (status: string | null) => {
    const statuses: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      active: { label: "يعمل", variant: "default" },
      on_leave: { label: "إجازة", variant: "secondary" },
      disabled: { label: "معطل", variant: "destructive" },
    };
    const statusInfo = statuses[status || "active"] || statuses.active;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const columns: ResponsiveTableColumn<Employee>[] = [
    {
      key: "employee_code",
      header: "الرقم الوظيفي",
      mobileLabel: "الرقم الوظيفي",
      accessor: (employee) => (
        <span className="font-medium">{employee.employee_code || "-"}</span>
      ),
    },
    {
      key: "name",
      header: "الاسم",
      mobileLabel: "الاسم",
      accessor: (employee) => employee.name,
    },
    {
      key: "position",
      header: "الوظيفة",
      mobileLabel: "الوظيفة",
      accessor: (employee) => employee.position || "-",
    },
    {
      key: "role",
      header: "الدور",
      mobileLabel: "الدور",
      accessor: (employee) => getRoleBadge(employee.role),
    },
    {
      key: "status",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (employee) => getStatusBadge(employee.status),
    },
    {
      key: "salary",
      header: "الراتب",
      mobileLabel: "الراتب",
      accessor: (employee) =>
        employee.salary ? <CurrencyDisplay amount={employee.salary} /> : "-",
      hideOnTablet: true,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (employee) => (
        <div className="flex gap-2 flex-wrap">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(employee.id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(employee.id)}
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
    return <LoadingState variant="table" rows={5} cols={6} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <ResponsiveTable
        columns={columns}
        data={employees}
        keyExtractor={(employee) => employee.id}
        emptyState={<EmptyEmployees />}
      />
    </div>
  );
}

