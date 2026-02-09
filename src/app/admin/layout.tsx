import { AdminLayout as AdminDashboardLayout } from "@/components/admin/AdminLayout";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
