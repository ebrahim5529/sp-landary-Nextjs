import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserManagement } from "@/components/admin/UserManagement";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">إدارة المستخدمين</h2>
        </div>
        <UserManagement />
      </div>
    </AdminLayout>
  );
}

