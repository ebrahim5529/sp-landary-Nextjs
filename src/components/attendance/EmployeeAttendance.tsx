import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, LogIn, LogOut } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";

interface TodayAttendance {
  id: string;
  check_in_time: string | null;
  check_out_time: string | null;
  total_hours: number | null;
  status: string | null;
}

export function EmployeeAttendance() {
    const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [todayAttendance, setTodayAttendance] = useState<TodayAttendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // fetchData removed
  }, []);

  useEffect(() => {
    if (employeeId) {
      fetchTodayAttendance();
    }
  }, [employeeId]);

  const fetchEmployeeId = async () => {
    try {
      // Backend removal cleanup - mock employee ID
      setEmployeeId("emp1");
    } catch (error) {
      console.error("Error fetching employee ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayAttendance = async () => {
    if (!employeeId) return;

    try {
      // Backend removal cleanup - mock today's attendance
      setTodayAttendance(null);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleCheckIn = async () => {
    if (!employeeId) {
      toast.error("لم يتم العثور على بيانات الموظف");
      return;
    }

    setProcessing(true);
    try {
      // Backend removal cleanup
      const now = new Date().toISOString();
      setTodayAttendance({
        id: "att1",
        check_in_time: now,
        check_out_time: null,
        total_hours: null,
        status: "present",
      });
      toast.success("تم تسجيل الحضور بنجاح (بيئة عرض)");
    } catch (error: any) {
      console.error("Error checking in:", error);
      toast.error("حدث خطأ في تسجيل الحضور");
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!employeeId || !todayAttendance) {
      toast.error("يجب تسجيل الحضور أولاً");
      return;
    }

    setProcessing(true);
    try {
      // Backend removal cleanup
      const now = new Date().toISOString();
      const checkInTime = new Date(todayAttendance.check_in_time!);
      const checkOutTime = new Date(now);
      const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

      setTodayAttendance({
        ...todayAttendance,
        check_out_time: now,
        total_hours: totalHours,
      });

      toast.success("تم تسجيل الانصراف بنجاح (بيئة عرض)");
    } catch (error: any) {
      console.error("Error checking out:", error);
      toast.error("حدث خطأ في تسجيل الانصراف");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <LoadingState variant="spinner" size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (!employeeId) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          لم يتم العثور على بيانات الموظف
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          الحضور والانصراف
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            {format(new Date(), "yyyy-MM-dd")}
          </div>
          <div className="text-lg text-muted-foreground">
            {format(new Date(), "HH:mm")}
          </div>
        </div>

        {todayAttendance && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">وقت الحضور</div>
                <div className="text-lg font-semibold">
                  {todayAttendance.check_in_time
                    ? format(new Date(todayAttendance.check_in_time), "HH:mm")
                    : "-"}
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">وقت الانصراف</div>
                <div className="text-lg font-semibold">
                  {todayAttendance.check_out_time
                    ? format(new Date(todayAttendance.check_out_time), "HH:mm")
                    : "-"}
                </div>
              </div>
            </div>

            {todayAttendance.total_hours && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">ساعات العمل</div>
                <div className="text-2xl font-bold">
                  {todayAttendance.total_hours.toFixed(2)} ساعة
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Badge variant={todayAttendance.status === "present" ? "default" : "secondary"}>
                {todayAttendance.status === "present" ? "حاضر" : todayAttendance.status || "غير محدد"}
              </Badge>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!todayAttendance?.check_in_time ? (
            <Button
              size="lg"
              onClick={handleCheckIn}
              disabled={processing}
              className="flex items-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              تسجيل الحضور
            </Button>
          ) : !todayAttendance.check_out_time ? (
            <Button
              size="lg"
              variant="outline"
              onClick={handleCheckOut}
              disabled={processing}
              className="flex items-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              تسجيل الانصراف
            </Button>
          ) : (
            <div className="text-center text-muted-foreground">
              تم إكمال اليوم - شكراً لعملك!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

