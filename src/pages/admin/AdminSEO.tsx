import { AdminLayout } from "@/components/admin/AdminLayout";
import { SEOSettings } from "@/components/admin/SEOSettings";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function AdminSEO() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">إعدادات SEO والموقع</h2>
        </div>
        <SEOSettings />
      </div>
    </AdminLayout>
  );
}

