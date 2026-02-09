import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
  CreditCard,
  FileText,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  Shield,
  Settings,
  Activity,
} from "lucide-react";
import { LoadingState } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

interface UserProfile {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  phone: string | null;
  full_name: string | null;
  laundry_info?: {
    id: string;
    name: string;
    tax_number: string | null;
    commercial_registration: string | null;
    address: string | null;
    logo_url: string | null;
    invoice_footer_message: string | null;
    default_tax_rate: number | null;
    created_at: string | null;
    updated_at: string | null;
  };
  subscription?: {
    status: string;
    plan_name: string;
    current_period_end: string | null;
    stripe_subscription_id: string | null;
  };
  stats?: {
    totalInvoices: number;
    totalRevenue: number;
    paidInvoices: number;
    pendingInvoices: number;
    totalCustomers: number;
    totalEmployees: number;
  };
}

const mockUser = { email: "user@example.com", id: "mock-user-id" };

export default function AdminUserProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUserProfile(id);
    }
  }, [id]);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      // Backend removal cleanup - mock profile
      const mockProfile: UserProfile = {
        id: userId,
        email: "owner@example.com",
        email_confirmed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        phone: "0500000000",
        full_name: "محمد علي",
        laundry_info: {
          id: "1",
          name: "مغسلة النور",
          tax_number: "1234567890",
          commercial_registration: "1010101010",
          address: "الرياض",
          logo_url: "",
          invoice_footer_message: "شكرا لتعاملكم معنا",
          default_tax_rate: 15,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        subscription: {
          status: "active",
          plan_name: "الخطة المتقدمة",
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          stripe_subscription_id: "sub_12345",
        },
        stats: {
          totalInvoices: 150,
          totalRevenue: 25000,
          paidInvoices: 140,
          pendingInvoices: 5,
          totalCustomers: 85,
          totalEmployees: 12,
        },
      };

      setProfile(mockProfile);
    } catch (error: any) {
      console.error("Error fetching mockUser profile:", error);
      toast.error("حدث خطأ في جلب بيانات المستخدم");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async (userId: string) => {
    // Backend removal cleanup - mock stats returned in fetchUserProfile
    return {
      totalInvoices: 0,
      totalRevenue: 0,
      paidInvoices: 0,
      pendingInvoices: 0,
      totalCustomers: 0,
      totalEmployees: 0,
    };
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">بروفايل المستخدم</h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <LoadingState variant="spinner" size="lg" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!profile) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">بروفايل المستخدم</h2>
            <Button variant="outline" onClick={() => navigate("/admin/laundries")}>
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للقائمة
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                المستخدم غير موجود
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const formatDate = (date: string | null) => {
    if (!date) return "غير متوفر";
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSubscriptionBadge = (status: string | undefined) => {
    if (!status) return { label: "لا يوجد اشتراك", variant: "outline" as const };
    switch (status) {
      case "active":
        return { label: "نشط", variant: "default" as const };
      case "trial":
        return { label: "تجريبي", variant: "secondary" as const };
      default:
        return { label: status, variant: "outline" as const };
    }
  };

  const subscriptionBadge = getSubscriptionBadge(profile.subscription?.status);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/laundries")}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-3xl font-bold">بروفايل المستخدم</h2>
              <p className="text-muted-foreground mt-1">
                عرض تفاصيل المستخدم الكاملة
              </p>
            </div>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                  {profile.full_name
                    ? profile.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                    : profile.email[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {profile.full_name || "بدون اسم"}
                  </h3>
                  <p className="text-blue-100 mt-1">{profile.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {profile.email_confirmed_at ? (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-100">
                        <CheckCircle className="h-3 w-3 ml-1" />
                        البريد مؤكد
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-500/20 text-red-100">
                        <XCircle className="h-3 w-3 ml-1" />
                        البريد غير مؤكد
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {subscriptionBadge.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {profile.stats && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
                      <p className="text-2xl font-bold mt-1">{profile.stats.totalInvoices}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                      <p className="text-2xl font-bold mt-1">
                        {profile.stats.totalRevenue.toFixed(2)} ر.س
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">العملاء</p>
                      <p className="text-2xl font-bold mt-1">{profile.stats.totalCustomers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الموظفين</p>
                      <p className="text-2xl font-bold mt-1">{profile.stats.totalEmployees}</p>
                    </div>
                    <Shield className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="laundry">معلومات المغسلة</TabsTrigger>
            <TabsTrigger value="subscription">الاشتراك</TabsTrigger>
            <TabsTrigger value="activity">النشاطات</TabsTrigger>
          </TabsList>

          {/* معلومات أساسية */}
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>بيانات المستخدم الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                      <p className="font-medium">{profile.phone || "غير متوفر"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ التسجيل</p>
                      <p className="font-medium">{formatDate(profile.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">آخر تسجيل دخول</p>
                      <p className="font-medium">
                        {formatDate(profile.last_sign_in_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* معلومات المغسلة */}
          <TabsContent value="laundry" className="space-y-4">
            {profile.laundry_info ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    معلومات المغسلة
                  </CardTitle>
                  <CardDescription>تفاصيل المغسلة المسجلة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">اسم المغسلة</p>
                      <p className="font-medium text-lg">{profile.laundry_info.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الرقم الضريبي</p>
                      <p className="font-medium">
                        {profile.laundry_info.tax_number || "غير متوفر"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">السجل التجاري</p>
                      <p className="font-medium">
                        {profile.laundry_info.commercial_registration || "غير متوفر"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">معدل الضريبة الافتراضي</p>
                      <p className="font-medium">
                        {profile.laundry_info.default_tax_rate || 15}%
                      </p>
                    </div>
                    {profile.laundry_info.address && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          العنوان
                        </p>
                        <p className="font-medium mt-1">{profile.laundry_info.address}</p>
                      </div>
                    )}
                    {profile.laundry_info.logo_url && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">الشعار</p>
                        <img
                          src={profile.laundry_info.logo_url}
                          alt="Logo"
                          className="h-20 w-20 object-contain mt-2 rounded"
                        />
                      </div>
                    )}
                    {profile.laundry_info.invoice_footer_message && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">رسالة تذييل الفاتورة</p>
                        <p className="font-medium mt-1">
                          {profile.laundry_info.invoice_footer_message}
                        </p>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">تاريخ الإنشاء</p>
                      <p className="font-medium">
                        {formatDate(profile.laundry_info.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">آخر تحديث</p>
                      <p className="font-medium">
                        {formatDate(profile.laundry_info.updated_at)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لم يتم تسجيل معلومات المغسلة بعد</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* الاشتراك */}
          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  معلومات الاشتراك
                </CardTitle>
                <CardDescription>حالة الاشتراك والخطة الحالية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.subscription ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">حالة الاشتراك</p>
                        <div className="mt-1">
                          <Badge variant={subscriptionBadge.variant}>
                            {subscriptionBadge.label}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">اسم الخطة</p>
                        <p className="font-medium text-lg">
                          {profile.subscription.plan_name || "غير محدد"}
                        </p>
                      </div>
                      {profile.subscription.current_period_end && (
                        <div>
                          <p className="text-sm text-muted-foreground">تاريخ انتهاء الاشتراك</p>
                          <p className="font-medium">
                            {formatDate(profile.subscription.current_period_end)}
                          </p>
                        </div>
                      )}
                      {profile.subscription.stripe_subscription_id && (
                        <div>
                          <p className="text-sm text-muted-foreground">معرف Stripe</p>
                          <p className="font-mono text-sm">
                            {profile.subscription.stripe_subscription_id}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا يوجد اشتراك نشط</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* النشاطات */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  الإحصائيات والنشاطات
                </CardTitle>
                <CardDescription>نظرة عامة على نشاط المستخدم</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.stats ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
                          <p className="text-2xl font-bold">{profile.stats.totalInvoices}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">فواتير مدفوعة</p>
                          <p className="text-2xl font-bold">{profile.stats.paidInvoices}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-8 w-8 text-yellow-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">فواتير معلقة</p>
                          <p className="text-2xl font-bold">{profile.stats.pendingInvoices}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                          <p className="text-2xl font-bold">
                            {profile.stats.totalRevenue.toFixed(2)} ر.س
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-purple-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">عدد العملاء</p>
                          <p className="text-2xl font-bold">{profile.stats.totalCustomers}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-orange-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">عدد الموظفين</p>
                          <p className="text-2xl font-bold">{profile.stats.totalEmployees}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد إحصائيات متاحة</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

