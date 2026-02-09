"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { calculateAverageTime, TimeStats } from "@/utils/timeTracking";
import { AlertTriangle, Eye } from "lucide-react";
import { toast } from "sonner";
import { LoadingState, EmptyState } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Department {
  id: string;
  name: string;
  standard_time_minutes: number;
  color: string;
  invoice_count: number;
  in_progress_count: number;
  completed_count: number;
  timeStats?: TimeStats;
}

interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string | null;
  total: number;
  status: string;
}

export function DepartmentCards() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      // استخدام البيانات التجريبية من API
      const { getDepartments } = await import("@/api/mockData");
      const departmentsData = getDepartments();
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("حدث خطأ في جلب بيانات الأقسام");
    } finally {
      setLoading(false);
    }
  };

  const getColorClass = (color: string, timeStats?: TimeStats) => {
    if (timeStats) {
      return {
        green: "bg-green-100 border-green-300 text-green-800",
        yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
        red: "bg-red-100 border-red-300 text-red-800",
      }[timeStats.color] || "bg-gray-100 border-gray-300";
    }
    return "bg-gray-100 border-gray-300";
  };

  const handleViewInvoices = async (dept: Department) => {
    setSelectedDepartment(dept);
    setDialogOpen(true);
    setLoadingInvoices(true);

    try {
      // استخدام البيانات التجريبية من API
      const { getDepartmentInvoices } = await import("@/api/mockData");
      const invoicesData = getDepartmentInvoices(dept.id);
      setInvoices(invoicesData);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("حدث خطأ في جلب الفواتير");
    } finally {
      setLoadingInvoices(false);
    }
  };

  const handleViewInvoiceDetail = (invoiceId: string) => {
    setDialogOpen(false);
    router.push(`/dashboard/invoices/${invoiceId}`);
  };

  if (loading) {
    return <LoadingState variant="card" count={4} />;
  }

  if (departments.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <EmptyState
            title="لا توجد أقسام"
            description="لم يتم إضافة أي أقسام بعد. يرجى إضافة أقسام من صفحة إدارة الأقسام."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">الأقسام</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" dir="rtl">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              className={`h-40 flex flex-col items-center justify-center border-2 cursor-pointer hover:shadow-lg transition-shadow ${getColorClass(
                dept.color,
                dept.timeStats
              )}`}
              onClick={() => handleViewInvoices(dept)}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-4 relative">
                <div className="text-sm font-medium mb-2">{dept.name}</div>
                <div className="flex items-center gap-3 mb-2">
                  {/* مربع أحمر للعدد الأول (قيد التنفيذ) */}
                  {dept.in_progress_count > 0 && (
                    <div className="flex items-center gap-1" title={`${dept.in_progress_count} فاتورة قيد التنفيذ`}>
                      <div className="w-6 h-6 bg-red-500 rounded-sm flex items-center justify-center shadow-sm">
                        <span className="text-white text-xs font-bold">{dept.in_progress_count}</span>
                      </div>
                    </div>
                  )}
                  {/* مثلث برتقالي للعدد الثاني (مكتملة) */}
                  {dept.completed_count > 0 && (
                    <div className="flex items-center gap-1" title={`${dept.completed_count} فاتورة مكتملة`}>
                      <div className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-500">
                          <path
                            fill="currentColor"
                            d="M12 2L2 22h20L12 2z"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          {dept.completed_count}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold">{dept.invoice_count}</div>
                <div className="text-xs text-muted-foreground mt-1">إجمالي الفواتير</div>
                {dept.timeStats && (
                  <div className="text-xs mt-1">
                    متوسط الوقت: {dept.timeStats.averageTime} دقيقة
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewInvoices(dept);
                  }}
                >
                  <Eye className="h-4 w-4 ml-1" />
                  متابعة الفواتير
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>فواتير قسم {selectedDepartment?.name}</DialogTitle>
            <DialogDescription>
              عدد الفواتير: {invoices.length}
            </DialogDescription>
          </DialogHeader>
          {loadingInvoices ? (
            <LoadingState variant="spinner" size="sm" />
          ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد فواتير في هذا القسم
            </div>
          ) : (
            <div className="space-y-2">
              {invoices.map((invoice) => (
                <Card
                  key={invoice.id}
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleViewInvoiceDetail(invoice.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">#{invoice.invoice_number}</div>
                        {invoice.customer_name && (
                          <div className="text-sm text-muted-foreground">{invoice.customer_name}</div>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{invoice.total.toFixed(2)} ر.س</div>
                        <div className="text-xs text-muted-foreground">{invoice.status}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
