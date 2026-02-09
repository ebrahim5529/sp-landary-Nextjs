import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export type UserRole = "admin" | "cashier" | "worker";

export function usePermissions() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>(["admin"]);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Set roles based on user data
      const userRoles: UserRole[] = [];
      if (user.role === "admin" || user.is_platform_admin) {
        userRoles.push("admin");
      }
      if (user.role === "cashier") {
        userRoles.push("cashier");
      }
      if (user.role === "worker") {
        userRoles.push("worker");
      }
      
      setRoles(userRoles.length > 0 ? userRoles : ["admin"]);
      setIsPlatformAdmin(user.is_platform_admin === true);
      setLoading(false);
    } else {
      setRoles([]);
      setIsPlatformAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
    return requiredRoles.some((role) => roles.includes(role));
  };

  const isAdmin = hasRole("admin");
  const isCashier = hasRole("cashier");
  const isWorker = hasRole("worker");

  return {
    roles,
    loading,
    hasRole,
    hasAnyRole,
    isAdmin,
    isPlatformAdmin,
    isCashier,
    isWorker,
  };
}
