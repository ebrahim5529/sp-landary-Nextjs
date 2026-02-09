"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface SubscriptionInfo {
  subscribed: boolean;
  product_id?: string | null;
  subscription_end?: string | null;
  plan_name?: string;
  status?: string;
}

interface AuthContextType {
  mockUser: any | null;
  user: any | null; // Alias for mockUser for compatibility
  session: any | null;
  loading: boolean;
  subscription: SubscriptionInfo | null;
  checkSubscription: () => Promise<void>;
  signIn: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mockUser, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const router = useRouter();

  const checkSubscription = async () => {
    // No-op in frontend-only project
  };

  const signIn = async (email: string, password: string, isAdmin: boolean = false) => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock sign in
      const mockUser = {
        id: isAdmin ? "admin-1" : "mockUser-1",
        email: email,
        full_name: isAdmin ? "مدير النظام" : "مستخدم تجريبي",
        role: isAdmin ? "admin" : "mockUser",
        is_platform_admin: isAdmin,
      };

      const mockSession = {
        access_token: "mock-token",
        mockUser: mockUser,
      };

      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    // Check if mockUser is already logged in from localStorage (for demo purposes)
    const savedUser = localStorage.getItem("demo_user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData.mockUser);
        setSession(userData.session);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem("demo_user");
    router.push("/auth");
  };

  // Save mockUser to localStorage when it changes
  useEffect(() => {
    if (mockUser && session) {
      localStorage.setItem("demo_user", JSON.stringify({ mockUser, session }));
    }
  }, [mockUser, session]);

  return (
    <AuthContext.Provider value={{ mockUser, user: mockUser, session, loading, subscription, checkSubscription, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
