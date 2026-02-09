"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, AlertCircle, CheckCircle, Package, PackageCheck, TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PeriodType = "day" | "week" | "month";

export function TodayStats() {
  const [period, setPeriod] = useState<PeriodType>("day");
  const [stats, setStats] = useState({
    todayInvoices: 0,
    todayPaidInvoices: 0,
    totalCustomers: 0,
    customersWithUnpaidInvoices: 0,
    todayPiecesReceived: 0,
    todayPiecesDelivered: 0,
    todayRevenue: 0,
    todayExpenses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [period]);

  const getPeriodLabel = (periodType: PeriodType) => {
    switch (periodType) {
      case "day":
        return "اليوم";
      case "week":
        return "آخر 7 أيام";
      case "month":
        return "هذا الشهر";
      default:
        return "اليوم";
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    // استخدام البيانات التجريبية من API
    const { getTodayStats } = await import("@/api/mockData");
    const statsData = getTodayStats(period);
    setStats(statsData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">إحصائيات {getPeriodLabel(period)}</h3>
        <Select value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">اليوم</SelectItem>
            <SelectItem value="week">آخر 7 أيام</SelectItem>
            <SelectItem value="month">هذا الشهر</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفواتير الجديدة</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayInvoices}</div>
            <CardDescription>عدد الفواتير الصادرة {getPeriodLabel(period)}</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفواتير المسلمة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayPaidInvoices}</div>
            <CardDescription>عدد الفواتير المسلمة {getPeriodLabel(period)}</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القطع المستلمة</CardTitle>
            <Package className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayPiecesReceived}</div>
            <CardDescription>عدد القطع المستلمة {getPeriodLabel(period)}</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القطع المسلمة</CardTitle>
            <PackageCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayPiecesDelivered}</div>
            <CardDescription>عدد القطع المسلمة {getPeriodLabel(period)}</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد العملاء</CardTitle>
            <Users className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <CardDescription>إجمالي العملاء المسجلين</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">فواتير غير مستلمة</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customersWithUnpaidInvoices}</div>
            <CardDescription>عملاء لديهم فواتير غير مستلمة</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الوارد</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 flex items-center gap-2 justify-center">
              {stats.todayRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-saudi-riyal text-green-700"
                aria-hidden="true"
              >
                <path d="m20 19.5-5.5 1.2" />
                <path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" />
                <path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" />
                <path d="M20 10 4 13.5" />
              </svg>
            </div>
            <CardDescription>إجمالي الإيرادات {getPeriodLabel(period)}</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المنصرف</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 flex items-center gap-2 justify-center">
              {stats.todayExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-saudi-riyal text-red-700"
                aria-hidden="true"
              >
                <path d="m20 19.5-5.5 1.2" />
                <path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" />
                <path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" />
                <path d="M20 10 4 13.5" />
              </svg>
            </div>
            <CardDescription>إجمالي المصروفات {getPeriodLabel(period)}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
