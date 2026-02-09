import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { usePermissions, UserRole } from "@/hooks/usePermissions";
import { LoadingState } from "@/components/ui/loading";
import { ErrorPage } from "./ErrorPage";

interface PermissionGuardProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  requiredRoles = ["admin"],
  fallback,
}: PermissionGuardProps) {
  const { hasAnyRole, loading } = usePermissions();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingState variant="spinner" size="md" />
      </div>
    );
  }

  if (!hasAnyRole(requiredRoles)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // استخدام صفحة الخطأ الاحترافية
    return <ErrorPage errorCode={403} />;
  }

  return <>{children}</>;
}

