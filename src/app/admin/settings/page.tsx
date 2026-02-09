import { SystemSettings } from "@/components/admin/SystemSettings";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">الإعدادات العامة</h2>
            </div>
            <SystemSettings />
        </div>
    );
}
