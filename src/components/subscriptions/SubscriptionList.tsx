import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { useAuth } from "@/contexts/AuthContext";

interface Subscription {
  id: string;
  customer_id: string;
  package_id: string;
  subscription_date: string;
  start_date: string;
  end_date: string | null;
  amount: number;
  status: string;
  notes: string | null;
  created_at: string;
  customer?: { name: string; phone: string | null };
  package?: { name: string; price: number };
}

interface SubscriptionListProps {
  onEdit?: (subscriptionId: string) => void;
  onDelete?: (subscriptionId: string) => void;
  selectedSubscriptions?: string[];
  onSelectionChange?: (selected: string[]) => void;
  searchQuery?: string;
}

export function SubscriptionList({
  onEdit,
  onDelete,
  selectedSubscriptions = [],
  onSelectionChange,
  searchQuery = "",
}: SubscriptionListProps) {
  const { mockUser } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mockUser?.id) {
      fetchSubscriptions();
    }
  }, [mockUser?.id, searchQuery]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    // Backend removal cleanup - mock subscriptions
    const allSubscriptions: Subscription[] = [
      {
        id: "sub-1",
        customer_id: "cust-1",
        package_id: "pkg-1",
        subscription_date: new Date().toISOString(),
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        amount: 250,
        status: "active",
        notes: "عميل منتظم",
        created_at: new Date().toISOString(),
        customer: { name: "أحمد علي", phone: "0501234567" },
        package: { name: "الباقة الفضية", price: 250 },
      },
      {
        id: "sub-2",
        customer_id: "cust-2",
        package_id: "pkg-2",
        subscription_date: new Date(Date.now() - 40 * 86400000).toISOString(),
        start_date: new Date(Date.now() - 40 * 86400000).toISOString(),
        end_date: new Date(Date.now() - 10 * 86400000).toISOString(),
        amount: 500,
        status: "expired",
        notes: null,
        created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
        customer: { name: "سارة محمد", phone: "0557654321" },
        package: { name: "الباقة الذهبية", price: 500 },
      },
    ];

    const filtered = allSubscriptions.filter(s =>
      s.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customer?.phone?.includes(searchQuery) ||
      s.package?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSubscriptions(filtered);
    setLoading(false);
  };

  const handleSelectSubscription = (subscriptionId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedSubscriptions, subscriptionId]);
      } else {
        onSelectionChange(selectedSubscriptions.filter((id) => id !== subscriptionId));
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange(subscriptions.map((s) => s.id));
      } else {
        onSelectionChange([]);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      active: { label: "نشط", variant: "default" },
      expired: { label: "منتهي", variant: "destructive" },
      suspended: { label: "معلق", variant: "secondary" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "outline" };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const columns: ResponsiveTableColumn<Subscription>[] = [
    {
      key: "select",
      header: "",
      mobileLabel: "",
      accessor: (sub) => (
        <input
          type="checkbox"
          checked={selectedSubscriptions.includes(sub.id)}
          onChange={(e) => handleSelectSubscription(sub.id, e.target.checked)}
          className="rounded"
        />
      ),
      hideOnTablet: true,
    },
    {
      key: "customer",
      header: "العميل",
      mobileLabel: "العميل",
      accessor: (sub) => (
        <div>
          <div className="font-medium">{sub.customer?.name || "-"}</div>
          {sub.customer?.phone && <div className="text-sm text-muted-foreground">{sub.customer.phone}</div>}
        </div>
      ),
    },
    {
      key: "package",
      header: "الباقة",
      mobileLabel: "الباقة",
      accessor: (sub) => <span className="font-medium">{sub.package?.name || "-"}</span>,
    },
    {
      key: "amount",
      header: "المبلغ",
      mobileLabel: "المبلغ",
      accessor: (sub) => <CurrencyDisplay amount={sub.amount} />,
    },
    {
      key: "start_date",
      header: "تاريخ البداية",
      mobileLabel: "تاريخ البداية",
      accessor: (sub) =>
        sub.start_date ? format(new Date(sub.start_date), "yyyy-MM-dd", { locale: ar }) : "-",
    },
    {
      key: "end_date",
      header: "تاريخ النهاية",
      mobileLabel: "تاريخ النهاية",
      accessor: (sub) =>
        sub.end_date ? format(new Date(sub.end_date), "yyyy-MM-dd", { locale: ar }) : "-",
    },
    {
      key: "status",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (sub) => getStatusBadge(sub.status),
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (sub) => (
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(sub.id)} title="تعديل">
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={() => onDelete(sub.id)} title="حذف">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState />;
  }

  return (
    <ResponsiveTable
      data={subscriptions}
      columns={columns}
      keyExtractor={(sub) => sub.id}
      selectAllChecked={selectedSubscriptions.length === subscriptions.length && subscriptions.length > 0}
      onSelectAll={handleSelectAll}
      emptyMessage={searchQuery ? "لا توجد نتائج للبحث" : "لا توجد اشتراكات مسجلة"}
    />
  );
}

