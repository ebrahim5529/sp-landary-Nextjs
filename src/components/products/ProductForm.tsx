import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface ProductItem {
  name: string;
  code: string;
  quantity: number;
  unit_price: number;
  description: string;
}

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: string;
  onSuccess?: () => void;
}

export function ProductForm({
  open,
  onOpenChange,
  productId,
  onSuccess,
}: ProductFormProps) {
    const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    invoice_number: "",
    supplier_id: "",
    total_amount: 0,
    notes: "",
  });
  const [products, setProducts] = useState<ProductItem[]>([
    { name: "", code: "", quantity: 1, unit_price: 0, description: "" },
  ]);
  const [autoGenerateInvoice, setAutoGenerateInvoice] = useState(true);

  useEffect(() => {
    if (open) {
      fetchSuppliers();
      if (productId) {
        fetchProduct();
      } else {
        if (autoGenerateInvoice) {
          generateInvoiceNumber();
        }
        resetForm();
      }
    }
  }, [open, productId]);

  const fetchProduct = async () => {
    // Backend removal cleanup
  };

  useEffect(() => {
    // حساب المبلغ الإجمالي
    const total = products.reduce(
      (sum, product) => sum + (product.quantity * product.unit_price),
      0
    );
    setFormData((prev) => ({ ...prev, total_amount: total }));
  }, [products]);

  const fetchSuppliers = async () => {
    // Backend removal cleanup
    setSuppliers([]);
  };

  const generateInvoiceNumber = async () => {
    const tempNumber = `PUR-${new Date().getFullYear()}-${Date.now()}`;
    setFormData((prev) => ({ ...prev, invoice_number: tempNumber }));
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: "", code: "", quantity: 1, unit_price: 0, description: "" },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleProductChange = (index: number, field: keyof ProductItem, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.invoice_number.trim()) {
      toast.error("رقم الفاتورة مطلوب");
      return;
    }

    if (!formData.supplier_id) {
      toast.error("يجب اختيار المورد");
      return;
    }

    // التحقق من صحة المنتجات
    const validProducts = products.filter(
      (p) => p.name.trim() && p.quantity > 0 && p.unit_price >= 0
    );

    if (validProducts.length === 0) {
      toast.error("يجب إضافة منتج واحد على الأقل");
      return;
    }

    setLoading(true);
    // Backend removal cleanup
    toast.success(productId ? "تم تحديث المنتج بنجاح (بيئة عرض)" : "تم إضافة المنتجات بنجاح (بيئة عرض)");
    onOpenChange(false);
    resetForm();
    if (onSuccess) {
      onSuccess();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      invoice_number: "",
      supplier_id: "",
      total_amount: 0,
      notes: "",
    });
    setProducts([{ name: "", code: "", quantity: 1, unit_price: 0, description: "" }]);
    setAutoGenerateInvoice(true);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {productId ? "تعديل المنتج" : "إضافة منتجات جديدة"}
          </DialogTitle>
          <DialogDescription>
            {productId
              ? "قم بتعديل معلومات المنتج"
              : "أضف منتجات جديدة ضمن فاتورة مشتريات واحدة"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* معلومات الفاتورة - تظهر فقط عند الإضافة */}
            {!productId && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="auto_generate"
                        checked={autoGenerateInvoice}
                        onChange={(e) => {
                          setAutoGenerateInvoice(e.target.checked);
                          if (e.target.checked) {
                            generateInvoiceNumber();
                          } else {
                            setFormData((prev) => ({ ...prev, invoice_number: "" }));
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor="auto_generate">توليد رقم الفاتورة تلقائياً</Label>
                    </div>
                    <Label htmlFor="invoice_number">رقم الفاتورة *</Label>
                    <Input
                      id="invoice_number"
                      value={formData.invoice_number}
                      onChange={(e) =>
                        setFormData({ ...formData, invoice_number: e.target.value })
                      }
                      disabled={autoGenerateInvoice}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier_id">المورد *</Label>
                    <Select
                      value={formData.supplier_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, supplier_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المورد" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* المبلغ الإجمالي */}
                <div className="space-y-2">
                  <Label>المبلغ الإجمالي</Label>
                  <div className="text-2xl font-bold">
                    <CurrencyDisplay value={formData.total_amount} />
                  </div>
                </div>
              </>
            )}

            {/* معلومات المورد - تظهر فقط عند التعديل */}
            {productId && (
              <div className="space-y-2">
                <Label htmlFor="supplier_id_edit">المورد</Label>
                <Select
                  value={formData.supplier_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, supplier_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المورد" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* قائمة المنتجات */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>المنتجات</Label>
                {!productId && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddProduct}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة منتج
                  </Button>
                )}
              </div>

              {products.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-4 bg-muted/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">منتج #{index + 1}</span>
                    {products.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProduct(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم المنتج *</Label>
                      <Input
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(index, "name", e.target.value)
                        }
                        placeholder="اسم المنتج"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الكود</Label>
                      <Input
                        value={product.code}
                        onChange={(e) =>
                          handleProductChange(index, "code", e.target.value)
                        }
                        placeholder="كود المنتج"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الكمية *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>سعر الوحدة *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={product.unit_price}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "unit_price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>الملاحظات</Label>
                      <Textarea
                        value={product.description}
                        onChange={(e) =>
                          handleProductChange(index, "description", e.target.value)
                        }
                        placeholder="ملاحظات حول المنتج"
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm text-muted-foreground">
                        الإجمالي:{" "}
                        <CurrencyDisplay
                          value={product.quantity * product.unit_price}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ملاحظات الفاتورة - تظهر فقط عند الإضافة */}
            {!productId && (
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات الفاتورة</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="ملاحظات إضافية حول الفاتورة"
                  rows={3}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

