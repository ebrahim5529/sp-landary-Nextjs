import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { format } from "date-fns";
import { LoadingState, EmptyRevenues } from "@/components/ui/loading";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Revenue {
  id: string;
  revenue_type: string;
  amount: number;
  description: string | null;
  revenue_date: string;
  invoice: {
    invoice_number: string;
  } | null;
}

export function Revenues() {
    const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    revenue_type: "additional_service",
    amount: 0,
    description: "",
    revenue_date: new Date().toISOString().split("T")[0],
    invoice_id: "",
  });
  const [invoices, setInvoices] = useState<{ id: string; invoice_number: string }[]>([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchRevenues = async () => {
    setLoading(true);
    // Backend removal cleanup - mock revenues
    const mockRevenues: Revenue[] = [
      {
        id: "rev-1",
        revenue_type: "invoice_payment",
        amount: 85.0,
        description: "سداد فاتورة نقداً",
        revenue_date: new Date(Date.now() - 1 * 86400000).toISOString(),
        invoice: { invoice_number: "INV-1001" },
      },
      {
        id: "rev-2",
        revenue_type: "invoice_payment",
        amount: 120.0,
        description: "سداد فاتورة شبكة",
        revenue_date: new Date(Date.now() - 2 * 86400000).toISOString(),
        invoice: { invoice_number: "INV-1002" },
      },
      {
        id: "rev-3",
        revenue_type: "asset_sale",
        amount: 500.0,
        description: "بيع غسالة قديمة قريد",
        revenue_date: new Date(Date.now() - 5 * 86400000).toISOString(),
        invoice: null,
      },
      {
        id: "rev-4",
        revenue_type: "additional_service",
        amount: 50.0,
        description: "خدمة توصيل خاصة",
        revenue_date: new Date(Date.now() - 3 * 86400000).toISOString(),
        invoice: null,
      },
    ];

    setRevenues(mockRevenues);
    setLoading(false);
  };

  const fetchInvoices = async () => {
    // Backend removal cleanup - mock invoices
    const mockInvoices = [
      { id: "inv-1", invoice_number: "INV-1001" },
      { id: "inv-2", invoice_number: "INV-1002" },
      { id: "inv-3", invoice_number: "INV-1003" },
      { id: "inv-4", invoice_number: "INV-1004" },
    ];
    setInvoices(mockInvoices);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      toast.error("المبلغ يجب أن يكون أكبر من صفر");
      return;
    }

    // Backend removal cleanup - mock submit
    toast.success("تم إضافة الإيراد بنجاح (نسخة تجريبية)");
    setFormOpen(false);
    setFormData({
      revenue_type: "additional_service",
      amount: 0,
      description: "",
      revenue_date: new Date().toISOString().split("T")[0],
      invoice_id: "",
    });
    fetchRevenues();
  };

  const getRevenueTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      invoice_payment: "سداد فاتورة",
      asset_sale: "بيع أصل",
      additional_service: "خدمة إضافية",
    };
    return types[type] || type;
  };

  const filteredRevenues = searchQuery
    ? revenues.filter(
      (rev) =>
        rev.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.invoice?.invoice_number?.includes(searchQuery) ||
        rev.revenue_type?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : revenues;

  const totalRevenues = filteredRevenues.reduce((sum, rev) => sum + rev.amount, 0);

  const columns: ResponsiveTableColumn<Revenue>[] = [
    {
      key: "revenue_date",
      header: "التاريخ",
      mobileLabel: "التاريخ",
      accessor: (revenue) => format(new Date(revenue.revenue_date), "yyyy-MM-dd"),
    },
    {
      key: "revenue_type",
      header: "النوع",
      mobileLabel: "النوع",
      accessor: (revenue) => getRevenueTypeLabel(revenue.revenue_type),
    },
    {
      key: "description",
      header: "الوصف",
      mobileLabel: "الوصف",
      accessor: (revenue) => revenue.description || "-",
    },
    {
      key: "invoice",
      header: "رقم الفاتورة",
      mobileLabel: "رقم الفاتورة",
      accessor: (revenue) => revenue.invoice?.invoice_number || "-",
      hideOnTablet: true,
    },
    {
      key: "amount",
      header: "المبلغ",
      mobileLabel: "المبلغ",
      accessor: (revenue) => <CurrencyDisplay amount={revenue.amount} />,
    },
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في الإيرادات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-sm md:text-base"
          />
        </div>
        <Button onClick={() => setFormOpen(true)} className="text-sm md:text-base">
          <Plus className="h-4 w-4 mr-2" />
          إضافة إيراد
        </Button>
      </div>

      <div className="border rounded-lg p-3 md:p-4 bg-muted">
        <div className="text-xs md:text-sm text-muted-foreground">إجمالي الإيرادات:</div>
        <div className="text-xl md:text-2xl font-bold">
          <CurrencyDisplay amount={totalRevenues} />
        </div>
      </div>

      {loading ? (
        <LoadingState variant="table" rows={5} cols={6} />
      ) : (
        <ResponsiveTable
          columns={columns}
          data={filteredRevenues}
          keyExtractor={(revenue) => revenue.id}
          emptyState={<EmptyRevenues />}
        />
      )}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة إيراد جديد</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="revenue_type">نوع الإيراد *</Label>
                <Select
                  value={formData.revenue_type}
                  onValueChange={(value) => setFormData({ ...formData, revenue_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invoice_payment">سداد فاتورة</SelectItem>
                    <SelectItem value="asset_sale">بيع أصل</SelectItem>
                    <SelectItem value="additional_service">خدمة إضافية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.revenue_type === "invoice_payment" && (
                <div className="space-y-2">
                  <Label htmlFor="invoice_id">رقم الفاتورة</Label>
                  <Select
                    value={formData.invoice_id}
                    onValueChange={(value) => setFormData({ ...formData, invoice_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفاتورة" />
                    </SelectTrigger>
                    <SelectContent>
                      {invoices.map((inv) => (
                        <SelectItem key={inv.id} value={inv.id}>
                          {inv.invoice_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ (ر.س) *</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue_date">التاريخ *</Label>
                <Input
                  id="revenue_date"
                  type="date"
                  value={formData.revenue_date}
                  onChange={(e) => setFormData({ ...formData, revenue_date: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit">إضافة</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

