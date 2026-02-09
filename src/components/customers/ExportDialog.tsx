import { useState } from "react";
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

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: any[];
}

export function ExportDialog({ open, onOpenChange, customers }: ExportDialogProps) {
  const [format, setFormat] = useState<"csv" | "json" | "pdf">("csv");

  const handleExport = () => {
    if (customers.length === 0) {
      toast.error("لا توجد بيانات للتصدير");
      return;
    }

    const exportData = customers.map((customer) => ({
      "رقم العميل": customer.customer_code || "",
      "الاسم": customer.name,
      "رقم الجوال": customer.phone || "",
      "البريد الإلكتروني": customer.email || "",
      "تاريخ الانضمام": customer.created_at,
      "ملاحظات": customer.notes || "",
    }));

    const filename = `customers_${new Date().toISOString().split("T")[0]}`;

    if (format === "csv") {
      exportToCSV(exportData, filename);
      toast.success("تم تصدير البيانات إلى Excel بنجاح");
    } else if (format === "json") {
      exportToJSON(exportData, filename);
      toast.success("تم تصدير البيانات إلى JSON بنجاح");
    } else if (format === "pdf") {
      // إنشاء HTML مؤقت للطباعة
      const html = `
        <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="text-align: center; margin-bottom: 20px;">قائمة العملاء</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">رقم العميل</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">الاسم</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">رقم الجوال</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">البريد الإلكتروني</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">تاريخ الانضمام</th>
              </tr>
            </thead>
            <tbody>
              ${exportData.map(customer => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${customer["رقم العميل"]}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${customer["الاسم"]}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${customer["رقم الجوال"]}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${customer["البريد الإلكتروني"]}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${customer["تاريخ الانضمام"]}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      
      // إنشاء عنصر مؤقت
      if (typeof window !== 'undefined') {
        const tempDiv = document.createElement('div');
        tempDiv.id = 'temp-export-pdf';
        tempDiv.innerHTML = html;
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);
        
        // طباعة PDF
        setTimeout(() => {
          printAsPDF('temp-export-pdf');
          document.body.removeChild(tempDiv);
          toast.success("تم فتح نافذة الطباعة");
        }, 100);
      }
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تصدير بيانات العملاء</DialogTitle>
          <DialogDescription>
            اختر صيغة التصدير المطلوبة. سيتم تصدير {customers.length} عميل.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>صيغة التصدير</Label>
            <Select value={format} onValueChange={(value: "csv" | "json" | "pdf") => setFormat(value)}>
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleExport}>تصدير</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

