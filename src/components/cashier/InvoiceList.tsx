import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Printer } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { maskCustomerName } from "@/utils/name";
import { LoadingState, EmptyInvoices } from "@/components/ui/loading";
import { maskPhoneNumber } from "@/utils/phone";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface Invoice {
  id: string;
  invoice_number: string;
  created_at: string;
  total: number;
  status: string;
  customer: {
    name: string;
    phone: string | null;
  } | null;
}

interface InvoiceListProps {
  onViewInvoice?: (invoiceId: string) => void;
  onPrintInvoice?: (invoiceId: string) => void;
}

export function InvoiceList({ onViewInvoice, onPrintInvoice }: InvoiceListProps) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock invoices
      const mockInvoices = [
        {
          id: "1",
          invoice_number: "INV-001",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          total: 150,
          status: "paid",
          is_returned: false,
          customers: { name: "أحمد علي", phone: "0501234567" },
        },
        {
          id: "2",
          invoice_number: "INV-002",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          total: 200,
          status: "pending",
          is_returned: false,
          customers: { name: "سارة محمد", phone: "0557654321" },
        },
      ];

      setInvoices(
        mockInvoices.map((inv: any) => ({
          id: inv.id,
          invoice_number: inv.invoice_number,
          created_at: inv.created_at,
          total: inv.total || 0,
          status: inv.status,
          customer: inv.customers,
        }))
      );
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الفواتير الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingState variant="spinner" size="md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>الفواتير الأخيرة</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <EmptyInvoices />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>
                    {format(new Date(invoice.created_at), "yyyy-MM-dd HH:mm", {
                      locale: ar,
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{maskCustomerName(invoice.customer?.name || "")}</div>
                      {invoice.customer?.phone && (
                        <div className="text-xs text-muted-foreground">
                          {maskPhoneNumber(invoice.customer.phone)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <CurrencyDisplay amount={invoice.total} />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {invoice.status === "paid"
                        ? "مدفوعة"
                        : invoice.status === "pending"
                        ? "معلقة"
                        : "مسودة"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {onViewInvoice && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewInvoice(invoice.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {onPrintInvoice && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onPrintInvoice(invoice.id)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

