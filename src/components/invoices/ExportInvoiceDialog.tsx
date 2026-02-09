import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToCSV, exportToJSON, printAsPDF } from "@/utils/export";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingState } from "@/components/ui/loading";
import { format } from "date-fns";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface ExportInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportInvoiceDialog({ open, onOpenChange }: ExportInvoiceDialogProps) {
  const { mockUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "pdf">("csv");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (open && mockUser) {
      fetchInvoices();
    }
  }, [open, statusFilter, mockUser]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock invoices data
      const mockInvoices = [
        {
          id: "1",
          invoice_number: "INV-001",
          order_number: "ORD-001",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          total: 150,
          status: "paid",
          is_returned: false,
          return_code: null,
          customers: { name: "أحمد علي", phone: "0501234567", customer_code: "CUS-001" },
        },
        {
          id: "2",
          invoice_number: "INV-002",
          order_number: "ORD-002",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          total: 200,
          status: "pending",
          is_returned: false,
          return_code: null,
          customers: { name: "سارة محمد", phone: "0557654321", customer_code: "CUS-002" },
        },
      ];

      let filteredInvoices = mockInvoices;
      if (statusFilter === "returned") {
        filteredInvoices = mockInvoices.filter(inv => inv.is_returned);
      } else if (statusFilter !== "all") {
        filteredInvoices = mockInvoices.filter(inv => inv.status === statusFilter);
      }

      setInvoices(filteredInvoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("حدث خطأ في جلب الفواتير");
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      paid: "مدفوعة",
      pending: "معلقة",
      cancelled: "ملغاة",
      draft: "مسودة",
    };
    return statusMap[status] || status;
  };

  const prepareExportData = () => {
    return invoices.map((invoice) => ({
      "رقم الفاتورة": invoice.invoice_number,
      "رقم الطلب": invoice.order_number || "",
      "اسم العميل": invoice.customers?.name || "",
      "رقم العميل": invoice.customers?.customer_code || "",
      "رقم الجوال": invoice.customers?.phone || "",
      "التاريخ": format(new Date(invoice.created_at), "yyyy-MM-dd HH:mm"),
      "المبلغ": invoice.total || 0,
      "الحالة": invoice.is_returned ? "مرتجع" : getStatusLabel(invoice.status),
      "رمز المرتجع": invoice.return_code || "",
    }));
  };

  const handleExport = () => {
    if (invoices.length === 0) {
      toast.error("لا توجد بيانات للتصدير");
      return;
    }

    const exportData = prepareExportData();
    const statusLabel = statusFilter === "all" 
      ? "جميع" 
      : statusFilter === "returned" 
      ? "مرتجعة" 
      : getStatusLabel(statusFilter);
    const filename = `invoices_${statusLabel}_${new Date().toISOString().split("T")[0]}`;

    if (exportFormat === "csv") {
      exportToCSV(exportData, filename);
      toast.success("تم تصدير البيانات إلى Excel بنجاح");
    } else if (exportFormat === "json") {
      exportToJSON(exportData, filename);
      toast.success("تم تصدير البيانات إلى JSON بنجاح");
    } else if (exportFormat === "pdf") {
      // إنشاء HTML للطباعة
      const html = `
        <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="text-align: center; margin-bottom: 10px;">تصدير الفواتير</h2>
          <p style="text-align: center; margin-bottom: 20px; color: #666;">
            حالة الفاتورة: ${statusLabel} | عدد الفواتير: ${invoices.length}
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">رقم الفاتورة</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">رقم الطلب</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">اسم العميل</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">رقم الجوال</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">التاريخ</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">المبلغ</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${exportData.map(invoice => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["رقم الفاتورة"]}</td>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["رقم الطلب"]}</td>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["اسم العميل"]}</td>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["رقم الجوال"]}</td>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["التاريخ"]}</td>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["المبلغ"]}</td>
                  <td style="border: 1px solid #ddd; padding: 6px;">${invoice["الحالة"]}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background-color: #f9fafb; font-weight: bold;">
                <td colspan="6" style="border: 1px solid #ddd; padding: 8px; text-align: left;">الإجمالي:</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  ${invoices.reduce((sum, inv) => sum + (inv.total || 0), 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      `;
      
      // إنشاء عنصر مؤقت
      if (typeof window !== 'undefined') {
        const tempDiv = document.createElement('div');
        tempDiv.id = 'temp-export-invoice-pdf';
        tempDiv.innerHTML = html;
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);
        
        // طباعة PDF
        setTimeout(() => {
          printAsPDF('temp-export-invoice-pdf');
          document.body.removeChild(tempDiv);
          toast.success("تم فتح نافذة الطباعة");
        }, 100);
      }
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>تصدير الفواتير</DialogTitle>
          <DialogDescription>
            اختر حالة الفاتورة وصيغة التصدير المطلوبة
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>حالة الفاتورة</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفواتير</SelectItem>
                  <SelectItem value="paid">مدفوعة</SelectItem>
                  <SelectItem value="pending">معلقة</SelectItem>
                  <SelectItem value="cancelled">ملغاة</SelectItem>
                  <SelectItem value="returned">مرتجعة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>صيغة التصدير</Label>
              <Select value={exportFormat} onValueChange={(value: "csv" | "json" | "pdf") => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Excel)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <LoadingState variant="card" count={3} />
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>عدد الفواتير: {invoices.length}</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? "إخفاء البيانات" : "عرض البيانات"}
                </Button>
              </div>
              
              {showPreview && invoices.length > 0 && (
                <ScrollArea className="h-[400px] border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الفاتورة</TableHead>
                        <TableHead>اسم العميل</TableHead>
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
                            {invoice.is_returned && (
                              <span className="text-red-600 text-xs mr-2">
                                ({invoice.return_code || "مرتجع"})
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{invoice.customers?.name || "-"}</TableCell>
                          <TableCell>
                            {format(new Date(invoice.created_at), "yyyy-MM-dd HH:mm")}
                          </TableCell>
                          <TableCell>
                            <CurrencyDisplay amount={invoice.total || 0} />
                          </TableCell>
                          <TableCell>
                            {invoice.is_returned ? "مرتجع" : getStatusLabel(invoice.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
              
              {showPreview && invoices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد فواتير للعرض
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleExport} disabled={loading || invoices.length === 0}>
            تصدير ({invoices.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

