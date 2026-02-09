"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { mockUser, loading: authLoading } = useAuth();
  const { isPlatformAdmin, loading: permissionsLoading } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !mockUser) {
      router.push("/admin/login");
    }
  }, [mockUser, authLoading, router]);

  useEffect(() => {
    if (!authLoading && !permissionsLoading && mockUser && !isPlatformAdmin) {
      toast.error("ليس لديك صلاحية للوصول إلى لوحة التحكم الإدارية");
      router.push("/admin/login");
    }
  }, [mockUser, authLoading, permissionsLoading, isPlatformAdmin, router]);

  if (authLoading || permissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!mockUser || !isPlatformAdmin) {
    return null;
  }

  return <>{children}</>;
}
