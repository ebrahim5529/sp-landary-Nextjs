import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { maskCustomerName } from "@/utils/name";
import { maskPhoneNumber } from "@/utils/phone";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  service: {
    name: string;
  } | null;
  sub_item: {
    name: string;
  } | null;
  department: {
    name: string;
  } | null;
}

interface Invoice {
  id: string;
  invoice_number: string;
  order_number: string | null;
  created_at: string;
  printed_at: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  tax_rate: number;
  pieces_count: number;
  status: string;
  is_returned: boolean;
  return_code: string | null;
  payment_method: string | null;
  customer: {
    name: string;
    phone: string | null;
    customer_code: string | null;
  } | null;
  employee: {
    name: string;
  } | null;
}

interface InvoiceDetailProps {
  invoiceId: string;
  onPrint?: () => void;
  onReturn?: () => void;
}

export function InvoiceDetail({ invoiceId, onPrint, onReturn }: InvoiceDetailProps) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock invoice details
      const mockInvoice: Invoice = {
        id: invoiceId,
        invoice_number: "INV-001",
        order_number: "ORD-99",
        created_at: new Date().toISOString(),
        printed_at: null,
        subtotal: 130.87,
        discount: 10.00,
        tax: 19.63,
        total: 140.50,
        tax_rate: 15,
        pieces_count: 5,
        status: "paid",
        is_returned: false,
        return_code: null,
        payment_method: "cash",
        customer: {
          name: "أحمد علي",
          phone: "0501234567",
          customer_code: "C-101",
        },
        employee: {
          name: "موظف المبيعات",
        },
      };

      const mockItems: InvoiceItem[] = [
        {
          id: "item-1",
          description: "غسيل جاف - ثوب",
          quantity: 3,
          unit_price: 30,
          total: 90,
          service: { name: "غسيل جاف" },
          sub_item: { name: "ثوب" },
          department: { name: "الرجالي" },
        },
        {
          id: "item-2",
          description: "غسيل ومكواة - قميص",
          quantity: 2,
          unit_price: 25.25,
          total: 50.5,
          service: { name: "غسيل ومكواة" },
          sub_item: { name: "قميص" },
          department: { name: "الرجالي" },
        },
      ];

      setInvoice(mockInvoice);
      setItems(mockItems);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast.error("حدث خطأ في جلب بيانات الفاتورة");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState variant="spinner" size="lg" />;
  }

  if (!invoice) {
    return <div className="text-center py-8 text-muted-foreground">الفاتورة غير موجودة</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">فاتورة رقم: {invoice.invoice_number}</h3>
          {invoice.is_returned && (
            <Badge variant="destructive" className="mt-2">
              مرتجع: {invoice.return_code}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          {onPrint && (
            <Button onClick={onPrint}>
              <Printer className="h-4 w-4 mr-2" />
              طباعة
            </Button>
          )}
          {onReturn && !invoice.is_returned && (
            <Button variant="outline" onClick={onReturn}>
              <RotateCcw className="h-4 w-4 mr-2" />
              استرجاع
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>معلومات الفاتورة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">رقم الطلب:</span>
              <span className="font-medium">{invoice.order_number || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">التاريخ:</span>
              <span className="font-medium">
                {format(new Date(invoice.created_at), "yyyy-MM-dd HH:mm")}
              </span>
            </div>
            {invoice.printed_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الطباعة:</span>
                <span className="font-medium">
                  {format(new Date(invoice.printed_at), "yyyy-MM-dd HH:mm")}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">الحالة:</span>
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
            </div>
            {invoice.payment_method && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">طريقة الدفع:</span>
                <span className="font-medium">
                  {invoice.payment_method === "cash"
                    ? "نقدي"
                    : invoice.payment_method === "card"
                      ? "بطاقة"
                      : "تحويل بنكي"}
                </span>
              </div>
            )}
            {invoice.employee && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">الموظف:</span>
                <span className="font-medium">{invoice.employee.name}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات العميل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">الاسم:</span>
              <span className="font-medium">
                {maskCustomerName(invoice.customer?.name || "")}
              </span>
            </div>
            {invoice.customer?.phone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الجوال:</span>
                <span className="font-medium">
                  {maskPhoneNumber(invoice.customer.phone)}
                </span>
              </div>
            )}
            {invoice.customer?.customer_code && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم العميل:</span>
                <span className="font-medium">{invoice.customer.customer_code}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الفاتورة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium">
                      {item.sub_item?.name || item.description}
                    </div>
                    {item.department && (
                      <div className="text-sm text-muted-foreground">
                        القسم: {item.department.name}
                      </div>
                    )}
                    {item.service && (
                      <div className="text-sm text-muted-foreground">
                        الخدمة: {item.service.name}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      الكمية: {item.quantity} × <CurrencyDisplay amount={item.unit_price} />
                    </div>
                  </div>
                  <div className="font-semibold">
                    <CurrencyDisplay amount={item.total} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">عدد القطع:</span>
              <span className="font-medium">{invoice.pieces_count}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">الإجمالي بدون ضريبة:</span>
              <span className="font-medium">
                <CurrencyDisplay amount={invoice.subtotal} />
              </span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>الخصم:</span>
                <span>
                  -<CurrencyDisplay amount={invoice.discount} />
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                الضريبة ({invoice.tax_rate}%):
              </span>
              <span className="font-medium">
                <CurrencyDisplay amount={invoice.tax} />
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>الإجمالي:</span>
              <span>
                <CurrencyDisplay amount={invoice.total} />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

