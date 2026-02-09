import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export type RegistrationStatus = "none" | "pending" | "approved" | "rejected" | "error";

export function useRegistrationStatus() {
  const { user } = useAuth();
  const [status, setStatus] = useState<RegistrationStatus>("approved");
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    // Backend removal cleanup: logic removed
    setStatus("approved");
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, [user?.id]);

  return { status, loading, refresh: fetchStatus };
}
