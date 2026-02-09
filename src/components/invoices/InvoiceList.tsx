import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Printer, RotateCcw, Search } from "lucide-react";
import { format } from "date-fns";
import { maskCustomerName } from "@/utils/name";
import { maskPhoneNumber } from "@/utils/phone";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";
import { LoadingState, EmptyInvoices } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";

interface Invoice {
  id: string;
  invoice_number: string;
  created_at: string;
  total: number;
  status: string;
  is_returned: boolean;
  return_code: string | null;
  customer: {
    name: string;
    phone: string | null;
  } | null;
}

interface InvoiceListProps {
  onViewInvoice?: (invoiceId: string) => void;
  onPrintInvoice?: (invoiceId: string) => void;
  onReturnInvoice?: (invoiceId: string) => void;
}

export function InvoiceList({
  onViewInvoice,
  onPrintInvoice,
  onReturnInvoice,
}: InvoiceListProps) {
  const { mockUser } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (mockUser) {
      fetchInvoices();
    }
  }, [mockUser, statusFilter]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock invoices
      const mockInvoices: Invoice[] = [
        {
          id: "1",
          invoice_number: "INV-001",
          created_at: new Date().toISOString(),
          total: 150.5,
          status: "paid",
          is_returned: false,
          return_code: null,
          customer: {
            name: "أحمد علي",
            phone: "0501234567",
          },
        },
        {
          id: "2",
          invoice_number: "INV-002",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          total: 85.0,
          status: "pending",
          is_returned: false,
          return_code: null,
          customer: {
            name: "سارة محمد",
            phone: "0557654321",
          },
        },
      ];

      setInvoices(mockInvoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("حدث خطأ في جلب الفواتير");
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoice_number.includes(searchQuery) ||
      invoice.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer?.phone?.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "مدفوعة", className: "bg-green-100 text-green-800" },
      pending: { label: "معلقة", className: "bg-yellow-100 text-yellow-800" },
      cancelled: { label: "ملغاة", className: "bg-red-100 text-red-800" },
      draft: { label: "مسودة", className: "bg-gray-100 text-gray-800" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 rounded text-xs ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const columns: ResponsiveTableColumn<Invoice>[] = [
    {
      key: "invoice_number",
      header: "رقم الفاتورة",
      mobileLabel: "رقم الفاتورة",
      accessor: (invoice) => (
        <div>
          <span className="font-medium">{invoice.invoice_number}</span>
          {invoice.is_returned && (
            <span className="text-red-600 text-xs mr-2">
              ({invoice.return_code || "مرتجع"})
            </span>
          )}
        </div>
      ),
    },
    {
      key: "created_at",
      header: "التاريخ",
      mobileLabel: "التاريخ",
      accessor: (invoice) => format(new Date(invoice.created_at), "yyyy-MM-dd HH:mm"),
      hideOnTablet: false,
    },
    {
      key: "customer",
      header: "العميل",
      mobileLabel: "العميل",
      accessor: (invoice) => (
        <div>
          <div>{maskCustomerName(invoice.customer?.name || "")}</div>
          {invoice.customer?.phone && (
            <div className="text-xs text-muted-foreground">
              {maskPhoneNumber(invoice.customer.phone)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "total",
      header: "المبلغ",
      mobileLabel: "المبلغ",
      accessor: (invoice) => <CurrencyDisplay amount={invoice.total} />,
    },
    {
      key: "status",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (invoice) => getStatusBadge(invoice.status),
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      hideOnMobile: false,
      accessor: (invoice) => (
        <div className="flex gap-2 flex-wrap">
          {onViewInvoice && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewInvoice(invoice.id)}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onPrintInvoice && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPrintInvoice(invoice.id)}
              className="h-8 w-8 p-0"
            >
              <Printer className="h-4 w-4" />
            </Button>
          )}
          {onReturnInvoice && !invoice.is_returned && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReturnInvoice(invoice.id)}
              className="text-orange-600 h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={7} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث برقم الفاتورة، اسم العميل، أو رقم الجوال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-sm md:text-base"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm md:text-base"
        >
          <option value="all">جميع الحالات</option>
          <option value="draft">مسودة</option>
          <option value="pending">معلقة</option>
          <option value="paid">مدفوعة</option>
          <option value="cancelled">ملغاة</option>
        </select>
      </div>

      <ResponsiveTable
        columns={columns}
        data={filteredInvoices}
        keyExtractor={(invoice) => invoice.id}
        emptyState={<EmptyInvoices />}
      />
    </div>
  );
}

