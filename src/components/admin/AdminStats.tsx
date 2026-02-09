"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, FileText, DollarSign, TrendingUp, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/loading";

export function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLaundries: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    newUsersToday: 0,
    newInvoicesToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Backend removal cleanup - mock admin stats
      setTimeout(() => {
        setStats({
          totalUsers: 150,
          totalLaundries: 12,
          totalInvoices: 1250,
          totalRevenue: 25000,
          newUsersToday: 8,
          newInvoicesToday: 15,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <LoadingState variant="spinner" size="sm" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">إحصائيات عامة</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <CardDescription>
              {stats.newUsersToday > 0 && (
                <span className="text-green-600">+{stats.newUsersToday} اليوم</span>
              )}
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد المغاسل</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLaundries}</div>
            <CardDescription>مغاسل نشطة</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الفواتير</CardTitle>
            <FileText className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvoices}</div>
            <CardDescription>
              {stats.newInvoicesToday > 0 && (
                <span className="text-green-600">+{stats.newInvoicesToday} اليوم</span>
              )}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 flex items-center gap-2">
              {stats.totalRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="text-sm">ر.س</span>
            </div>
            <CardDescription>إجمالي الإيرادات من جميع الفواتير</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

