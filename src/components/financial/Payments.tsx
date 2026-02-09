import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { format } from "date-fns";
import { LoadingState, EmptyPayments } from "@/components/ui/loading";
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

interface Expense {
  id: string;
  amount: number;
  description: string | null;
  date: string;
  category: {
    name: string;
  } | null;
}

export function Payments() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
    category_id: "",
  });
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // fetchData removed
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    // Backend removal cleanup - mock expenses
    const mockExpenses: Expense[] = [
      {
        id: "exp-1",
        amount: 250.0,
        description: "فاتورة كهرباء - يناير",
        date: new Date(Date.now() - 5 * 86400000).toISOString(),
        category: { name: "مرافق" },
      },
      {
        id: "exp-2",
        amount: 1500.0,
        description: "إيجار المحل - شهر فبراير",
        date: new Date(Date.now() - 10 * 86400000).toISOString(),
        category: { name: "إيجار" },
      },
      {
        id: "exp-3",
        amount: 450.0,
        description: "شراء منظفات ومعطرات",
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        category: { name: "مواد تشغيل" },
      },
      {
        id: "exp-4",
        amount: 120.0,
        description: "صيانة غسالة رقم 2",
        date: new Date(Date.now() - 1 * 86400000).toISOString(),
        category: { name: "صيانة" },
      },
    ];

    setExpenses(mockExpenses);
    setLoading(false);
  };

  const fetchCategories = async () => {
    // Backend removal cleanup - mock categories
    const mockCategories = [
      { id: "cat-1", name: "مرافق" },
      { id: "cat-2", name: "إيجار" },
      { id: "cat-3", name: "مواد تشغيل" },
      { id: "cat-4", name: "صيانة" },
      { id: "cat-5", name: "رواتب" },
    ];
    setCategories(mockCategories);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      toast.error("المبلغ يجب أن يكون أكبر من صفر");
      return;
    }

    // Backend removal cleanup - mock submit
    if (editingExpenseId) {
      toast.success("تم تحديث المصروف بنجاح (نسخة تجريبية)");
    } else {
      toast.success("تم إضافة المصروف بنجاح (نسخة تجريبية)");
    }

    setFormOpen(false);
    setEditingExpenseId(null);
    fetchExpenses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المصروف؟")) return;

    // Backend removal cleanup - mock delete
    toast.success("تم حذف المصروف بنجاح (نسخة تجريبية)");
    fetchExpenses();
  };

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const columns: ResponsiveTableColumn<Expense>[] = [
    {
      key: "date",
      header: "التاريخ",
      mobileLabel: "التاريخ",
      accessor: (expense) => format(new Date(expense.date), "yyyy-MM-dd"),
    },
    {
      key: "description",
      header: "الوصف",
      mobileLabel: "الوصف",
      accessor: (expense) => expense.description || "-",
    },
    {
      key: "category",
      header: "التصنيف",
      mobileLabel: "التصنيف",
      accessor: (expense) => expense.category?.name || "-",
    },
    {
      key: "amount",
      header: "المبلغ",
      mobileLabel: "المبلغ",
      accessor: (expense) => <CurrencyDisplay amount={expense.amount} />,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (expense) => (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditingExpenseId(expense.id);
              setFormData({
                amount: expense.amount,
                description: expense.description || "",
                date: expense.date.split("T")[0],
                category_id: "",
              });
              setFormOpen(true);
            }}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(expense.id)}
            className="text-destructive h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في المصروفات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-sm md:text-base"
          />
        </div>
        <Button onClick={() => setFormOpen(true)} className="text-sm md:text-base">
          <Plus className="h-4 w-4 mr-2" />
          إضافة مصروف
        </Button>
      </div>

      <div className="border rounded-lg p-3 md:p-4 bg-muted">
        <div className="text-xs md:text-sm text-muted-foreground">إجمالي المصروفات:</div>
        <div className="text-xl md:text-2xl font-bold">
          <CurrencyDisplay amount={totalExpenses} />
        </div>
      </div>

      {loading ? (
        <LoadingState variant="table" rows={5} cols={6} />
      ) : (
        <ResponsiveTable
          columns={columns}
          data={filteredExpenses}
          keyExtractor={(expense) => expense.id}
          emptyState={<EmptyPayments />}
        />
      )}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingExpenseId ? "تعديل المصروف" : "إضافة مصروف جديد"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
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
                <Label htmlFor="date">التاريخ *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

