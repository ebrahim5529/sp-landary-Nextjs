import { SEOSettings } from "@/components/admin/SEOSettings";

export default function AdminSEOPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">إعدادات SEO والموقع</h2>
            </div>
            <SEOSettings />
        </div>
    );
}
