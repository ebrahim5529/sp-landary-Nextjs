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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { generateReturnCode } from "@/utils/invoice";
import { toast } from "sonner";

interface ReturnInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  invoiceNumber: string;
  onSuccess?: () => void;
}

export function ReturnInvoiceDialog({
  open,
  onOpenChange,
  invoiceId,
  invoiceNumber,
  onSuccess,
}: ReturnInvoiceDialogProps) {
    const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    setLoading(true);
    try {
      const returnCode = generateReturnCode(invoiceNumber);

      // Backend removal cleanup - mock invoice return
      setTimeout(() => {
        toast.success(`تم إرجاع الفاتورة بنجاح. رقم الإرجاع: ${returnCode} (بيئة عرض)`);
        onOpenChange(false);
        if (onSuccess) onSuccess();
        setLoading(false);
      }, 1500);
    } catch (error: any) {
      console.error("Error returning invoice:", error);
      toast.error("حدث خطأ في استرجاع الفاتورة");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>استرجاع الفاتورة</DialogTitle>
          <DialogDescription>
            سيتم تعليم الفاتورة رقم {invoiceNumber} كمرتجع وإنشاء فاتورة بديلة برمز{" "}
            {generateReturnCode(invoiceNumber)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات (اختياري)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أدخل ملاحظات حول سبب الاسترجاع..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleReturn} disabled={loading}>
            {loading ? "جاري الاسترجاع..." : "تأكيد الاسترجاع"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

