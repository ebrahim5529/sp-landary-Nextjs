import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/ui/loading";
import { Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface SubItemDetailProps {
  subItemId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SubItemDetail {
  id: string;
  name: string;
  department_id: string | null;
  department_name: string | null;
  image_url: string | null;
  active: boolean;
  invoicesCount: number;
  totalInvoicesAmount: number;
}

export function SubItemDetail({ subItemId, open, onOpenChange }: SubItemDetailProps) {
  const [subItem, setSubItem] = useState<SubItemDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (subItemId && open) {
      setImageError(false);
      fetchSubItemDetail();
    } else {
      setSubItem(null);
    }
  }, [subItemId, open]);

  const fetchSubItemDetail = async () => {
    setLoading(true);
    // Backend removal cleanup
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تفاصيل القطعة</DialogTitle>
          <DialogDescription>عرض جميع معلومات القطعة</DialogDescription>
        </DialogHeader>

        {loading ? (
          <LoadingState variant="spinner" size="lg" />
        ) : subItem ? (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">اسم القطعة</label>
                <p className="text-base font-medium">{subItem.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">القسم</label>
                <p className="text-base">{subItem.department_name || "-"}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">الحالة</label>
                <Badge variant={subItem.active ? "default" : "secondary"}>
                  {subItem.active ? "نشط" : "معطل"}
                </Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">عدد الفواتير</label>
                <p className="text-base font-medium">{subItem.invoicesCount}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">إجمالي الفواتير</label>
                <p className="text-base font-medium">
                  <CurrencyDisplay amount={subItem.totalInvoicesAmount} />
                </p>
              </div>
            </div>
            {subItem.image_url && !imageError && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">الصورة</label>
                <div className="flex justify-center">
                  <img
                    src={subItem.image_url}
                    alt={subItem.name}
                    className="max-w-full max-h-96 object-contain rounded-lg border"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>
            )}
            {(!subItem.image_url || imageError) && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">الصورة</label>
                <div className="flex justify-center items-center w-full h-48 bg-gray-100 rounded-lg border">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                    <p className="text-sm">
                      {imageError ? "فشل تحميل الصورة" : "لا توجد صورة"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">القطعة غير موجودة</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

