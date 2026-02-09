"use client";

import { EmployeeAttendance } from "@/components/attendance/EmployeeAttendance";
import { AttendanceList } from "@/components/attendance/AttendanceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePermissions } from "@/hooks/usePermissions";

export default function AttendancePage() {
  const { isAdmin } = usePermissions();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">الحضور والانصراف</h2>

      {isAdmin ? (
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">سجلات الحضور</TabsTrigger>
            <TabsTrigger value="my">حضوري</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <AttendanceList />
          </TabsContent>
          <TabsContent value="my">
            <EmployeeAttendance />
          </TabsContent>
        </Tabs>
      ) : (
        <EmployeeAttendance />
      )}
    </div>
  );
}