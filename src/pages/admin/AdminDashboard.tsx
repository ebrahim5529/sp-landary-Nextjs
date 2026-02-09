import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">لوحة التحكم الإدارية</h2>
        </div>

        {/* إحصائيات عامة */}
        <AdminStats />

        {/* رسوم بيانية */}
        <AdminCharts />
      </div>
    </AdminLayout>
  );
}

