import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import { toast } from "sonner";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PaymentFormProps {
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
  onDiscountChange: (discount: number) => void;
  onPaymentMethodChange: (method: string) => void;
  onAmountPaidChange: (amount: number) => void;
  onCouponApply?: (couponCode: string) => void;
  appliedCoupon?: { code: string; discount: number; type: string } | null;
}

export function PaymentForm({
  subtotal,
  tax,
  total,
  discount,
  onDiscountChange,
  onPaymentMethodChange,
  onAmountPaidChange,
  onCouponApply,
  appliedCoupon,
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState(total);
  const [couponCode, setCouponCode] = useState("");

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    onPaymentMethodChange(value);
  };

  const handleAmountPaidChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    setAmountPaid(amount);
    onAmountPaidChange(amount);
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
    if (onDiscountChange) {
      onDiscountChange(0);
    }
  };

  useEffect(() => {
    setAmountPaid(total);
  }, [total]);

  useEffect(() => {
    if (appliedCoupon) {
      setCouponCode(appliedCoupon.code);
    } else {
      setCouponCode("");
    }
  }, [appliedCoupon]);

  const remaining = amountPaid - total;

  return (
    <Card>
      <CardHeader>
        <CardTitle>المدفوعات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>طريقة الدفع</Label>
          <Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
            <SelectTrigger>
              <SelectValue placeholder="اختر طريقة الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">نقدي</SelectItem>
              <SelectItem value="card">بطاقة</SelectItem>
              <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>القسيمة (اختياري)</Label>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">{appliedCoupon.code}</div>
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
                className="text-red-600 hover:text-red-700"
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
              />
              <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                <Tag className="h-4 w-4 mr-2" />
                تطبيق
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>الخصم (ر.س)</Label>
          <Input
            type="number"
            min="0"
            max={subtotal}
            value={discount}
            onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
          />
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">الإجمالي بدون ضريبة:</span>
            <span className="font-medium">
              <CurrencyDisplay amount={subtotal - discount} />
            </span>
          </div>
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

        <div className="space-y-2">
          <Label>المبلغ المدفوع (ر.س)</Label>
          <Input
            type="number"
            min="0"
            value={amountPaid}
            onChange={(e) => handleAmountPaidChange(e.target.value)}
            placeholder="0.00"
          />
        </div>

        {remaining !== 0 && (
          <div
            className={`p-3 rounded-lg text-center font-semibold ${
              remaining > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {remaining > 0
              ? (
                  <>
                    المتبقي: <CurrencyDisplay amount={remaining} />
                  </>
                )
              : (
                  <>
                    المبلغ الزائد: <CurrencyDisplay amount={Math.abs(remaining)} />
                  </>
                )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

