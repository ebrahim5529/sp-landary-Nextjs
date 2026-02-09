import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText, Tag, Package, Gift } from "lucide-react";
import { format } from "date-fns";
import { maskPhoneNumber } from "@/utils/phone";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";
import { LoadingState, EmptyState } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomerDetailProps {
  customerId: string;
  onEdit?: () => void;
}

export function CustomerDetail({ customerId, onEdit }: CustomerDetailProps) {
    const [customer, setCustomer] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [activeCoupons, setActiveCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock customer details
      const mockCustomer = {
        id: customerId,
        name: "أحمد علي",
        phone: "0501234567",
        email: "ahmed@example.com",
        customer_code: "CUS-001",
        created_at: new Date().toISOString(),
        notes: "عميل منتظم",
      };

      const mockInvoices = [
        {
          id: "1",
          invoice_number: "INV-001",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          total: 150,
          status: "paid",
          is_returned: false,
        },
        {
          id: "2",
          invoice_number: "INV-002",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          total: 200,
          status: "pending",
          is_returned: false,
        },
      ];

      const mockCoupons = [
        {
          id: "1",
          name: "خصم 10%",
          discount_percentage: 10,
          coupon_type: "invoice",
          active: true,
        },
      ];

      setCustomer(mockCustomer);
      setInvoices(mockInvoices);
      setActiveCoupons(mockCoupons);
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("حدث خطأ في جلب بيانات العميل");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState variant="spinner" size="lg" />;
  }

  if (!customer) {
    return <div className="text-center py-8 text-muted-foreground">العميل غير موجود</div>;
  }

  const unpaidInvoices = invoices.filter(
    (inv) => !inv.is_returned && ["pending", "overdue"].includes(inv.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{customer.name}</h3>
        {onEdit && (
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            تعديل
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>معلومات العميل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">رقم العميل:</span>
              <span className="font-medium">{customer.customer_code || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الاسم:</span>
              <span className="font-medium">{customer.name}</span>
            </div>
            {customer.phone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الجوال:</span>
                <span className="font-medium">{maskPhoneNumber(customer.phone)}</span>
              </div>
            )}
            {customer.email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">البريد الإلكتروني:</span>
                <span className="font-medium">{customer.email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">تاريخ الانضمام:</span>
              <span className="font-medium">
                {format(new Date(customer.created_at), "yyyy-MM-dd")}
              </span>
            </div>
            {customer.notes && (
              <div className="mt-4 pt-4 border-t">
                <span className="text-muted-foreground">ملاحظات:</span>
                <p className="mt-2">{customer.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              القسائم والاشتراكات النشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeCoupons.length === 0 ? (
              <EmptyState 
                icon={<Gift className="h-10 w-10 text-muted-foreground" />}
                title="لا توجد قسائم أو اشتراكات نشطة"
                description="لا توجد قسائم أو اشتراكات نشطة لهذا العميل حالياً."
              />
            ) : (
              <div className="space-y-3">
                {activeCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="p-3 border rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="default" className="text-xs">
                            {coupon.coupon_type === "customer"
                              ? "قسيمة عميل"
                              : coupon.coupon_type === "invoice"
                              ? "قسيمة فاتورة"
                              : "قسيمة قطعة"}
                          </Badge>
                          <span className="font-semibold">{coupon.code}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {coupon.discount_type === "percentage" ? (
                            <>خصم {coupon.discount_value}%</>
                          ) : (
                            <>خصم <CurrencyDisplay amount={coupon.discount_value} /></>
                          )}
                        </div>
                        {coupon.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {coupon.description}
                          </div>
                        )}
                        {coupon.valid_until && (
                          <div className="text-xs text-muted-foreground mt-1">
                            صالحة حتى: {format(new Date(coupon.valid_until), "yyyy-MM-dd")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الإحصائيات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">إجمالي الفواتير:</span>
              <span className="font-medium">{invoices.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">فواتير غير مستلمة:</span>
              <span className={`font-medium ${unpaidInvoices.length > 0 ? "text-red-600" : "text-green-600"}`}>
                {unpaidInvoices.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">إجمالي المبيعات:</span>
              <span className="font-medium">
                <CurrencyDisplay
                  amount={invoices.reduce((sum, inv) => sum + (inv.total || 0), 0)}
                />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            الفواتير الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <EmptyState 
              icon={<FileText className="h-10 w-10 text-muted-foreground" />}
              title="لا توجد فواتير"
              description="لا توجد فواتير مسجلة لهذا العميل."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الفاتورة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.created_at), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      <CurrencyDisplay amount={invoice.total || 0} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "default"
                            : invoice.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {invoice.status === "paid"
                          ? "مدفوعة"
                          : invoice.status === "pending"
                          ? "معلقة"
                          : "ملغاة"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

