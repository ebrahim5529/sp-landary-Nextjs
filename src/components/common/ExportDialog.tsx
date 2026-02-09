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
  data: any[];
  title?: string;
  filename?: string;
  pdfTitle?: string;
}

export function ExportDialog({ 
  open, 
  onOpenChange, 
  data, 
  title = "تصدير البيانات",
  filename = "export",
  pdfTitle = "قائمة البيانات"
}: ExportDialogProps) {
  const [format, setFormat] = useState<"csv" | "json" | "pdf">("csv");

  const handleExport = () => {
    if (data.length === 0) {
      toast.error("لا توجد بيانات للتصدير");
      return;
    }

    const exportFilename = `${filename}_${new Date().toISOString().split("T")[0]}`;

    if (format === "csv") {
      exportToCSV(data, exportFilename);
      toast.success("تم تصدير البيانات إلى Excel بنجاح");
    } else if (format === "json") {
      exportToJSON(data, exportFilename);
      toast.success("تم تصدير البيانات إلى JSON بنجاح");
    } else if (format === "pdf") {
      // الحصول على العناوين من المفاتيح الأولى
      const headers = Object.keys(data[0] || {});
      
      // إنشاء HTML مؤقت للطباعة
      const html = `
        <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="text-align: center; margin-bottom: 20px;">${pdfTitle}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                ${headers.map(header => `
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">${header}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${headers.map(header => `
                    <td style="border: 1px solid #ddd; padding: 8px;">${row[header] || ''}</td>
                  `).join('')}
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            اختر صيغة التصدير المطلوبة. سيتم تصدير {data.length} عنصر.
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

