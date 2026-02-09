import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { maskPhoneNumber } from "@/utils/phone";
import { toast } from "sonner";
import { LoadingState, EmptyCustomers } from "@/components/ui/loading";

interface Customer {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  customer_code: string | null;
  created_at: string;
  unpaid_invoices_count?: number;
}

interface CustomerListProps {
  onEdit?: (customerId: string) => void;
  onView?: (customerId: string) => void;
  onExport?: () => void;
}

export function CustomerList({
  onEdit,
  onView,
  onExport,
}: CustomerListProps) {
    const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock customers
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "أحمد علي",
          phone: "0501234567",
          email: "ahmed@example.com",
          customer_code: "CUS-001",
          created_at: new Date().toISOString(),
          unpaid_invoices_count: 2,
        },
        {
          id: "2",
          name: "سارة محمد",
          phone: "0557654321",
          email: "sara@example.com",
          customer_code: "CUS-002",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          unpaid_invoices_count: 0,
        },
      ];

      setCustomers(mockCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("حدث خطأ في جلب العملاء");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.includes(searchQuery) ||
      customer.customer_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ResponsiveTableColumn<Customer>[] = [
    {
      key: "customer_code",
      header: "رقم العميل",
      mobileLabel: "رقم العميل",
      accessor: (customer) => (
        <span className="font-medium">{customer.customer_code || "-"}</span>
      ),
    },
    {
      key: "name",
      header: "الاسم",
      mobileLabel: "الاسم",
      accessor: (customer) => customer.name,
    },
    {
      key: "phone",
      header: "رقم الجوال",
      mobileLabel: "رقم الجوال",
      accessor: (customer) => (customer.phone ? maskPhoneNumber(customer.phone) : "-"),
    },
    {
      key: "email",
      header: "البريد الإلكتروني",
      mobileLabel: "البريد الإلكتروني",
      accessor: (customer) => customer.email || "-",
      hideOnTablet: true,
    },
    {
      key: "created_at",
      header: "تاريخ الانضمام",
      mobileLabel: "تاريخ الانضمام",
      accessor: (customer) => format(new Date(customer.created_at), "yyyy-MM-dd"),
    },
    {
      key: "unpaid_invoices_count",
      header: "فواتير غير مستلمة",
      mobileLabel: "فواتير غير مستلمة",
      accessor: (customer) =>
        customer.unpaid_invoices_count && customer.unpaid_invoices_count > 0 ? (
          <span className="text-red-600 font-semibold">
            {customer.unpaid_invoices_count}
          </span>
        ) : (
          <span className="text-green-600">0</span>
        ),
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (customer) => (
        <div className="flex gap-2 flex-wrap">
          {onView && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(customer.id)}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(customer.id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={6} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث بالاسم، رقم الجوال، أو رقم العميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-sm md:text-base"
          />
        </div>
        {onExport && (
          <Button variant="outline" onClick={onExport} className="text-sm md:text-base">
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        )}
      </div>

      <ResponsiveTable
        columns={columns}
        data={filteredCustomers}
        keyExtractor={(customer) => customer.id}
        emptyState={<EmptyCustomers />}
      />
    </div>
  );
}

