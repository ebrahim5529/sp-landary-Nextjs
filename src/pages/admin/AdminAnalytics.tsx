import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, TrendingUp, DollarSign, Activity, ShoppingCart, Calendar } from "lucide-react";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    activeLaundries: 0,
    ordersToday: 0,
    usersGrowth: 0,
    revenueGrowth: 0,
    laundriesGrowth: 0,
    ordersGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Backend removal cleanup - mock analytics
      setStats({
        totalUsers: 150,
        totalRevenue: 25000,
        activeLaundries: 12,
        ordersToday: 45,
        usersGrowth: 15.5,
        revenueGrowth: 8.2,
        laundriesGrowth: 2,
        ordersGrowth: 12.4,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">التحليلات المتقدمة</h2>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.usersGrowth > 0 ? "+" : ""}
                {stats.usersGrowth}% من الشهر الماضي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalRevenue.toLocaleString("ar-SA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ر.س
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.revenueGrowth > 0 ? "+" : ""}
                {stats.revenueGrowth}% من الشهر الماضي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المغاسل النشطة</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLaundries}</div>
              <p className="text-xs text-muted-foreground">
                {stats.laundriesGrowth > 0 ? "+" : ""}
                {stats.laundriesGrowth} من الشهر الماضي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات اليوم</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ordersToday}</div>
              <p className="text-xs text-muted-foreground">
                {stats.ordersGrowth > 0 ? "+" : ""}
                {stats.ordersGrowth}% من أمس
              </p>
            </CardContent>
          </Card>
        </div>

        {/* تحليلات تفصيلية */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 ml-2" />
              المستخدمون
            </TabsTrigger>
            <TabsTrigger value="revenue">
              <DollarSign className="h-4 w-4 ml-2" />
              الإيرادات
            </TabsTrigger>
            <TabsTrigger value="laundries">
              <Activity className="h-4 w-4 ml-2" />
              المغاسل
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>نمو المستخدمين</CardTitle>
                  <CardDescription>إحصائيات نمو المستخدمين خلال آخر 6 أشهر</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>رسم بياني للنمو</p>
                      <p className="text-sm">سيتم إضافة الرسم البياني قريباً</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>الإيرادات الشهرية</CardTitle>
                  <CardDescription>مقارنة الإيرادات بين الأشهر</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>رسم بياني للإيرادات</p>
                      <p className="text-sm">سيتم إضافة الرسم البياني قريباً</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليلات المستخدمين</CardTitle>
                <CardDescription>إحصائيات تفصيلية عن المستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">مغاسل نشطة</p>
                      <p className="text-2xl font-bold">{stats.activeLaundries}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">نمو المستخدمين</p>
                      <p className={`text-2xl font-bold ${stats.usersGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stats.usersGrowth > 0 ? "+" : ""}
                        {stats.usersGrowth}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليلات الإيرادات</CardTitle>
                <CardDescription>تفاصيل الإيرادات والمدفوعات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                      <p className="text-2xl font-bold">
                        {stats.totalRevenue.toLocaleString("ar-SA", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        ر.س
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">الطلبات اليوم</p>
                      <p className="text-2xl font-bold">{stats.ordersToday}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">نمو الإيرادات</p>
                      <p className={`text-2xl font-bold ${stats.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {stats.revenueGrowth > 0 ? "+" : ""}
                        {stats.revenueGrowth}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laundries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تحليلات المغاسل</CardTitle>
                <CardDescription>إحصائيات عن المغاسل المسجلة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">مغاسل نشطة</p>
                      <p className="text-2xl font-bold">{stats.activeLaundries}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">مغاسل جديدة</p>
                      <p className="text-2xl font-bold">{stats.laundriesGrowth}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
