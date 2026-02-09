"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { calculateAverageTime, formatTime, TimeStats } from "@/utils/timeTracking";
import { LoadingState, EmptyState } from "@/components/ui/loading";

interface DepartmentTime {
  department_id: string;
  department_name: string;
  standard_time: number;
  average_time: number;
  stats: TimeStats;
}

export function TimeTracker() {
  const [departmentTimes, setDepartmentTimes] = useState<DepartmentTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeStats();
  }, []);

  const fetchTimeStats = async () => {
    try {
      // استخدام البيانات التجريبية من API
      const { getDepartmentTimes } = await import("@/api/mockData");
      const timesData = getDepartmentTimes();
      setDepartmentTimes(timesData);
    } catch (error) {
      console.error("Error fetching time stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>عداد متوسط الوقت</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingState variant="spinner" size="sm" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          عداد متوسط الوقت
        </CardTitle>
        <CardDescription>متوسط الوقت لكل قسم من البداية حتى الانتهاء</CardDescription>
      </CardHeader>
      <CardContent>
        {departmentTimes.length === 0 ? (
          <EmptyState
            title="لا توجد بيانات"
            description="لا توجد بيانات وقت متاحة للعرض."
          />
        ) : (
          <div className="space-y-4">
            {departmentTimes.map((dept) => (
              <div key={dept.department_id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{dept.department_name}</span>
                  <div className="flex items-center gap-2">
                    {dept.stats?.status === "critical" && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    {dept.stats?.status === "warning" && (
                      <TrendingUp className="h-4 w-4 text-yellow-500" />
                    )}
                    <span
                      className={`text-sm font-semibold ${dept.stats?.color === "red"
                          ? "text-red-600"
                          : dept.stats?.color === "yellow"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                    >
                      {formatTime(dept.average_time)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>الوقت المعياري: {formatTime(dept.standard_time)}</span>
                  {dept.stats?.percentage !== 0 && (
                    <span
                      className={
                        dept.stats?.percentage > 0
                          ? dept.stats?.percentage > 20
                            ? "text-red-600"
                            : "text-yellow-600"
                          : "text-green-600"
                      }
                    >
                      {dept.stats?.percentage > 0 ? "+" : ""}
                      {dept.stats?.percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${dept.stats?.color === "red"
                        ? "bg-red-500"
                        : dept.stats?.color === "yellow"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    style={{
                      width: `${Math.min(100, (dept.average_time / dept.standard_time) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
