import { AdminLayout } from "@/components/admin/AdminLayout";
import { SystemSettings } from "@/components/admin/SystemSettings";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">الإعدادات العامة</h2>
        </div>
        <SystemSettings />
      </div>
    </AdminLayout>
  );
}

