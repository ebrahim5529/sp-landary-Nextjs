import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { LoadingState } from "@/components/ui/loading";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface ServiceStats {
  totalServices: number;
  activeServices: number;
  inactiveServices: number;
  totalRevenue: number;
}

export function ServiceStats() {
    const [stats, setStats] = useState<ServiceStats>({
    totalServices: 0,
    activeServices: 0,
    inactiveServices: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    // Backend removal cleanup
    setStats({
      totalServices: 0,
      activeServices: 0,
      inactiveServices: 0,
      totalRevenue: 0,
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">إحصائيات الخدمات</h3>

      {/* الإحصائيات الأساسية */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الخدمات</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
            <CardDescription>عدد الخدمات المسجلة</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الخدمات النشطة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeServices}</div>
            <CardDescription>
              {stats.totalServices > 0
                ? `${Math.round((stats.activeServices / stats.totalServices) * 100)}% من إجمالي الخدمات`
                : "لا توجد خدمات"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الخدمات المعطلة</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactiveServices}</div>
            <CardDescription>
              {stats.totalServices > 0
                ? `${Math.round((stats.inactiveServices / stats.totalServices) * 100)}% من إجمالي الخدمات`
                : "لا توجد خدمات"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              <CurrencyDisplay amount={stats.totalRevenue} />
            </div>
            <CardDescription>إجمالي الإيرادات من الفواتير المسلمة</CardDescription>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

