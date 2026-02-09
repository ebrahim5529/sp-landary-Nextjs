import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface InvoiceItem {
  sub_item_name: string;
  department_name: string;
  services: { name: string; price: number }[];
  quantity: number;
  total: number;
}

interface InvoicePreviewProps {
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  piecesCount: number;
}

export function InvoicePreview({
  customerName,
  items,
  subtotal,
  discount,
  tax,
  total,
  piecesCount,
}: InvoicePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          معاينة الفاتورة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">العميل:</div>
          <div className="font-semibold">{customerName || "غير محدد"}</div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="border-b pb-2 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{item.sub_item_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.department_name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      الخدمات: {item.services.map((s) => s.name).join(", ")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      الكمية: {item.quantity}
                    </div>
                  </div>
                  <div className="font-semibold">
                    <CurrencyDisplay amount={item.total} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">عدد القطع:</span>
            <span className="font-medium">{piecesCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">الإجمالي بدون ضريبة:</span>
            <span className="font-medium">
              <CurrencyDisplay amount={subtotal - discount} />
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>الخصم:</span>
              <span>
                -<CurrencyDisplay amount={discount} />
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">الضريبة:</span>
            <span className="font-medium">
              <CurrencyDisplay amount={tax} />
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>الإجمالي:</span>
            <span>
              <CurrencyDisplay amount={total} />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

