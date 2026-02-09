import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import { format } from "date-fns";

interface Supplier {
  id: string;
  name: string;
  tax_number: string | null;
  national_address: string | null;
  commercial_registration: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
}

interface SupplierListProps {
  onEdit?: (supplierId: string) => void;
  onDelete?: (supplierId: string) => void;
  selectedSuppliers?: string[];
  onSelectionChange?: (selected: string[]) => void;
  searchQuery?: string;
}

export function SupplierList({
  onEdit,
  onDelete,
  selectedSuppliers = [],
  onSelectionChange,
  searchQuery = ""
}: SupplierListProps) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    // إعادة جلب البيانات عند تغيير البحث
    
  }, [searchQuery]);

  const fetchSuppliers = async () => {
    setLoading(true);
    // Backend removal cleanup - mock suppliers
    const allSuppliers: Supplier[] = [
      {
        id: "sup-1",
        name: "شركة التوريدات الوطنية",
        tax_number: "300123456700003",
        national_address: "1234 Riyadh, KSA",
        commercial_registration: "1010123456",
        phone: "0112345678",
        email: "info@national.com",
        address: "الرياض، حي الملز",
        notes: "مورد مواد غسيل جاف",
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: "sup-2",
        name: "مؤسسة الأمل للمنظفات",
        tax_number: "310987654300003",
        national_address: "5678 Jeddah, KSA",
        commercial_registration: "2020654321",
        phone: "0126543210",
        email: "sales@alamal.com",
        address: "جدة، حي الرويس",
        notes: "مورد مواد غسيل عادي ومكواة",
        created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
      },
    ];

    const filtered = allSuppliers.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone?.includes(searchQuery) ||
      s.tax_number?.includes(searchQuery)
    );

    setSuppliers(filtered);
    setLoading(false);
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? suppliers.map(s => s.id) : []);
    }
  };

  const handleSelectSupplier = (supplierId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedSuppliers, supplierId]);
      } else {
        onSelectionChange(selectedSuppliers.filter(id => id !== supplierId));
      }
    }
  };

  const columns: ResponsiveTableColumn<Supplier>[] = [
    {
      key: "select",
      header: "",
      mobileLabel: "",
      accessor: (supplier) => (
        <input
          type="checkbox"
          checked={selectedSuppliers.includes(supplier.id)}
          onChange={(e) => handleSelectSupplier(supplier.id, e.target.checked)}
          className="rounded"
        />
      ),
    },
    {
      key: "name",
      header: "اسم المورد",
      mobileLabel: "اسم المورد",
      accessor: (supplier) => <span className="font-medium">{supplier.name}</span>,
    },
    {
      key: "tax_number",
      header: "الرقم الضريبي",
      mobileLabel: "الرقم الضريبي",
      accessor: (supplier) => supplier.tax_number || "-",
    },
    {
      key: "commercial_registration",
      header: "سجل التجارة",
      mobileLabel: "سجل التجارة",
      accessor: (supplier) => supplier.commercial_registration || "-",
    },
    {
      key: "phone",
      header: "رقم الهاتف",
      mobileLabel: "رقم الهاتف",
      accessor: (supplier) => supplier.phone || "-",
    },
    {
      key: "email",
      header: "البريد الإلكتروني",
      mobileLabel: "البريد الإلكتروني",
      accessor: (supplier) => supplier.email || "-",
    },
    {
      key: "created_at",
      header: "تاريخ الإضافة",
      mobileLabel: "تاريخ الإضافة",
      accessor: (supplier) => format(new Date(supplier.created_at), "yyyy-MM-dd"),
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (supplier) => (
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(supplier.id)}
              title="تعديل"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(supplier.id)}
              title="حذف"
            >
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
      data={suppliers}
      columns={columns}
      keyExtractor={(supplier) => supplier.id}
      selectAllChecked={selectedSuppliers.length === suppliers.length && suppliers.length > 0}
      onSelectAll={handleSelectAll}
      emptyMessage={searchQuery ? "لا توجد نتائج للبحث" : "لا توجد موردين مسجلين"}
    />
  );
}

