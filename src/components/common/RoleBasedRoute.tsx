import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionGuard } from "./PermissionGuard";
import { UserRole } from "@/hooks/usePermissions";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export function RoleBasedRoute({
  children,
  allowedRoles,
  fallback,
}: RoleBasedRouteProps) {
  return (
    <PermissionGuard requiredRoles={allowedRoles} fallback={fallback}>
      {children}
    </PermissionGuard>
  );
}

