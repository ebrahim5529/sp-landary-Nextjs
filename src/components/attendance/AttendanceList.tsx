import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";
import { LoadingState, EmptyAttendance } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";

interface AttendanceRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  attendance_date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  total_hours: number | null;
  status: string | null;
}

interface AttendanceListProps {
  employeeId?: string | null;
  startDate?: string;
  endDate?: string;
}

interface Employee {
  id: string;
  name: string;
}

export function AttendanceList({ employeeId, startDate, endDate }: AttendanceListProps) {
  const { mockUser } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEmployeeId, setFilterEmployeeId] = useState<string | undefined>(
    employeeId || undefined
  );
  const [filterStartDate, setFilterStartDate] = useState<string>(
    startDate || format(new Date(new Date().setDate(1)), "yyyy-MM-dd")
  );
  const [filterEndDate, setFilterEndDate] = useState<string>(
    endDate || format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    if (mockUser) {
      fetchEmployees();
      fetchAttendance();
    }
  }, [mockUser, filterEmployeeId, filterStartDate, filterEndDate]);

  const fetchEmployees = async () => {
    // Backend removal cleanup - mock employees
    const mockEmployees = [
      { id: "1", name: "خالد منصور" },
      { id: "2", name: "ياسين عبدالله" },
      { id: "3", name: "أحمد محمد" },
      { id: "4", name: "سعيد علي" },
    ];
    setEmployees(mockEmployees);
  };

  const fetchAttendance = async () => {
    setLoading(true);
    // Backend removal cleanup - mock attendance
    const mockAttendance: AttendanceRecord[] = [
      {
        id: "att-1",
        employee_id: "1",
        employee_name: "خالد منصور",
        attendance_date: new Date().toISOString(),
        check_in_time: new Date(new Date().setHours(8, 0, 0)).toISOString(),
        check_out_time: new Date(new Date().setHours(16, 0, 0)).toISOString(),
        total_hours: 8,
        status: "present",
      },
      {
        id: "att-2",
        employee_id: "2",
        employee_name: "ياسين عبدالله",
        attendance_date: new Date().toISOString(),
        check_in_time: new Date(new Date().setHours(8, 30, 0)).toISOString(),
        check_out_time: null,
        total_hours: null,
        status: "present",
      },
      {
        id: "att-3",
        employee_id: "3",
        employee_name: "أحمد محمد",
        attendance_date: new Date().toISOString(),
        check_in_time: null,
        check_out_time: null,
        total_hours: null,
        status: "absent",
      },
      {
        id: "att-4",
        employee_id: "4",
        employee_name: "سعيد علي",
        attendance_date: new Date(Date.now() - 86400000).toISOString(),
        check_in_time: new Date(new Date(Date.now() - 86400000).setHours(9, 15, 0)).toISOString(),
        check_out_time: new Date(new Date(Date.now() - 86400000).setHours(17, 30, 0)).toISOString(),
        total_hours: 8.25,
        status: "late",
      },
    ];

    const filtered = mockAttendance.filter(record => {
      if (filterEmployeeId && record.employee_id !== filterEmployeeId) return false;
      const recordDate = record.attendance_date.split('T')[0];
      if (filterStartDate && recordDate < filterStartDate) return false;
      if (filterEndDate && recordDate > filterEndDate) return false;
      return true;
    });

    setAttendance(filtered);
    setLoading(false);
  };

  const getStatusBadge = (status: string | null) => {
    const statuses: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      present: { label: "حاضر", variant: "default" },
      absent: { label: "غائب", variant: "destructive" },
      late: { label: "متأخر", variant: "secondary" },
      leave: { label: "إجازة", variant: "outline" },
    };
    const statusInfo = statuses[status || "present"] || statuses.present;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={7} />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employee">الموظف</Label>
          <Select
            value={filterEmployeeId || "all"}
            onValueChange={(value) => setFilterEmployeeId(value === "all" ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="جميع الموظفين" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الموظفين</SelectItem>
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">من تاريخ</Label>
          <Input
            id="startDate"
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">إلى تاريخ</Label>
          <Input
            id="endDate"
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={fetchAttendance} className="w-full">
            تطبيق الفلترة
          </Button>
        </div>
      </div>

      {attendance.length === 0 ? (
        <EmptyAttendance />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>وقت الحضور</TableHead>
                <TableHead>وقت الانصراف</TableHead>
                <TableHead>ساعات العمل</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {format(new Date(record.attendance_date), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell className="font-medium">{record.employee_name}</TableCell>
                  <TableCell>
                    {record.check_in_time
                      ? format(new Date(record.check_in_time), "HH:mm")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {record.check_out_time
                      ? format(new Date(record.check_out_time), "HH:mm")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {record.total_hours
                      ? `${record.total_hours.toFixed(2)} ساعة`
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

