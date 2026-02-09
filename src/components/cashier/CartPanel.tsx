import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceSelector } from "./ServiceSelector";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { Badge } from "@/components/ui/badge";
import { X, Receipt, Tag } from "lucide-react";
import { toast } from "sonner";

interface SelectedItem {
  sub_item_id: string;
  sub_item_name: string;
  department_id: string;
  department_name: string;
  quantity: number;
  services: { service_id: string; service_name?: string; price: number }[];
}

interface CartPanelProps {
  customerName: string;
  selectedItems: SelectedItem[];
  onItemsChange: (items: SelectedItem[]) => void;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  piecesCount: number;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  amountPaid: number;
  onAmountPaidChange: (amount: number) => void;
  onCouponApply?: (couponCode: string) => void;
  appliedCoupon?: { code: string; discount: number; type: string } | null;
  onIssueInvoice: () => void;
  loading: boolean;
  canIssue: boolean;
}

export function CartPanel({
  customerName,
  selectedItems,
  onItemsChange,
  subtotal,
  discount,
  tax,
  total,
  piecesCount,
  paymentMethod,
  onPaymentMethodChange,
  amountPaid,
  onAmountPaidChange,
  onCouponApply,
  appliedCoupon,
  onIssueInvoice,
  loading,
  canIssue,
}: CartPanelProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleItemQuantityChange = (index: number, quantity: number) => {
    if (quantity < 1) return;
    const updated = [...selectedItems];
    updated[index].quantity = quantity;
    onItemsChange(updated);
  };

  const handleRemoveItem = (index: number) => {
    onItemsChange(selectedItems.filter((_, i) => i !== index));
  };

  const handleItemServicesChange = (
    index: number,
    services: { service_id: string; service_name?: string; price: number }[]
  ) => {
    const updated = [...selectedItems];
    updated[index].services = services;
    onItemsChange(updated);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("يرجى إدخال رمز القسيمة");
      return;
    }
    if (onCouponApply) {
      onCouponApply(couponCode.trim());
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    if (onCouponApply) {
      onCouponApply("");
    }
  };

  const remaining = amountPaid - total;

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* معلومات العميل */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">العميل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-lg">
              {customerName || "غير محدد"}
            </div>
          </CardContent>
        </Card>

        {/* سلة المشتريات */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">سلة المشتريات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                لا توجد قطع في السلة
              </div>
            ) : (
              selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-3 bg-card"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{item.sub_item_name}</div>
                      {item.department_name && (
                        <div className="text-xs text-muted-foreground">
                          {item.department_name}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(index)}
                      className="h-6 w-6 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-xs">الكمية:</Label>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          handleItemQuantityChange(index, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemQuantityChange(
                            index,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 h-7 text-center text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          handleItemQuantityChange(index, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-2">
                    <ServiceSelector
                      subItemId={item.sub_item_id}
                      onServicesChange={(services) =>
                        handleItemServicesChange(index, services)
                      }
                    />
                  </div>

                  {item.services.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      الإجمالي:{" "}
                      <CurrencyDisplay
                        amount={item.services.reduce(
                          (sum, s) => sum + s.price * item.quantity,
                          0
                        )}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* ملخص الفاتورة */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">ملخص الفاتورة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>الإجمالي:</span>
              <span>
                <CurrencyDisplay amount={total} />
              </span>
            </div>
          </CardContent>
        </Card>

        {/* طريقة الدفع */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">طريقة الدفع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">نقدي</SelectItem>
                <SelectItem value="card">بطاقة</SelectItem>
                <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <Label className="text-sm">المبلغ المدفوع (ر.س)</Label>
              <Input
                type="number"
                min="0"
                value={amountPaid}
                onChange={(e) =>
                  onAmountPaidChange(parseFloat(e.target.value) || 0)
                }
                placeholder="0.00"
              />
            </div>

            {remaining !== 0 && (
              <div
                className={`p-2 rounded-lg text-center text-sm font-semibold ${
                  remaining > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {remaining > 0
                  ? `المتبقي: ${remaining.toFixed(2)} ر.س`
                  : `المبلغ الزائد: ${Math.abs(remaining).toFixed(2)} ر.س`}
              </div>
            )}
          </CardContent>
        </Card>

        {/* القسيمة */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">القسيمة</CardTitle>
          </CardHeader>
          <CardContent>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800 text-sm">
                      {appliedCoupon.code}
                    </div>
                    <div className="text-xs text-green-600">
                      خصم: <CurrencyDisplay amount={appliedCoupon.discount} />
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveCoupon}
                  className="h-6 w-6 p-0 text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="أدخل رمز القسيمة"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyCoupon();
                    }
                  }}
                  className="text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleApplyCoupon}
                >
                  <Tag className="h-4 w-4 ml-1" />
                  تطبيق
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* زر الإصدار */}
      <div className="border-t p-4 bg-muted/50">
        <Button
          size="lg"
          className="w-full h-12 text-lg font-semibold"
          onClick={onIssueInvoice}
          disabled={!canIssue || loading}
        >
          {loading ? (
            "جاري الإصدار..."
          ) : (
            <>
              <Receipt className="h-5 w-5 ml-2" />
              إصدار الفاتورة
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

