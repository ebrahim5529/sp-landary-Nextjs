import { UserManagement } from "@/components/admin/UserManagement";

export default function AdminUsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">إدارة المستخدمين</h2>
            </div>
            <UserManagement />
        </div>
    );
}
