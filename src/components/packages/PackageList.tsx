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

interface Package {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_days: number;
  services_included: string | null;
  active: boolean;
  created_at: string;
}

interface PackageListProps {
  onEdit?: (packageId: string) => void;
  onDelete?: (packageId: string) => void;
  selectedPackages?: string[];
  onSelectionChange?: (selected: string[]) => void;
  searchQuery?: string;
}

export function PackageList({
  onEdit,
  onDelete,
  selectedPackages = [],
  onSelectionChange,
  searchQuery = "",
}: PackageListProps) {
  const { mockUser } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mockUser?.id) {
      fetchPackages();
    }
  }, [mockUser?.id, searchQuery]);

  const fetchPackages = async () => {
    setLoading(true);
    // Backend removal cleanup - mock packages
    const allPackages: Package[] = [
      {
        id: "pkg-1",
        name: "الباقة الفضية",
        description: "غسيل وكوي لـ 50 قطعة",
        price: 250,
        duration_days: 30,
        services_included: "غسيل، كوي",
        active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "pkg-2",
        name: "الباقة الذهبية",
        description: "غسيل وكوي لـ 100 قطعة + توصيل مجاني",
        price: 500,
        duration_days: 30,
        services_included: "غسيل، كوي، توصيل",
        active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "pkg-3",
        name: "باقة النخبة",
        description: "غسيل بخار وكوي لـ 150 قطعة",
        price: 750,
        duration_days: 60,
        services_included: "غسيل بخار، كوي ممتاز",
        active: false,
        created_at: new Date().toISOString(),
      },
    ];

    const filtered = allPackages.filter(pkg =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setPackages(filtered);
    setLoading(false);
  };

  const handleSelectPackage = (packageId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedPackages, packageId]);
      } else {
        onSelectionChange(selectedPackages.filter((id) => id !== packageId));
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange(packages.map((p) => p.id));
      } else {
        onSelectionChange([]);
      }
    }
  };

  const columns: ResponsiveTableColumn<Package>[] = [
    {
      key: "select",
      header: "",
      mobileLabel: "",
      accessor: (pkg) => (
        <input
          type="checkbox"
          checked={selectedPackages.includes(pkg.id)}
          onChange={(e) => handleSelectPackage(pkg.id, e.target.checked)}
          className="rounded"
        />
      ),
      hideOnTablet: true,
    },
    {
      key: "name",
      header: "اسم الباقة",
      mobileLabel: "اسم الباقة",
      accessor: (pkg) => <span className="font-medium">{pkg.name}</span>,
    },
    {
      key: "price",
      header: "السعر",
      mobileLabel: "السعر",
      accessor: (pkg) => <CurrencyDisplay amount={pkg.price} />,
    },
    {
      key: "duration_days",
      header: "المدة (أيام)",
      mobileLabel: "المدة",
      accessor: (pkg) => <span>{pkg.duration_days} يوم</span>,
    },
    {
      key: "active",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (pkg) => (
        <Badge variant={pkg.active ? "default" : "secondary"}>
          {pkg.active ? "نشطة" : "غير نشطة"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "تاريخ الإضافة",
      mobileLabel: "تاريخ الإضافة",
      accessor: (pkg) =>
        pkg.created_at
          ? format(new Date(pkg.created_at), "yyyy-MM-dd", { locale: ar })
          : "-",
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (pkg) => (
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(pkg.id)}
              title="تعديل"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(pkg.id)}
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
      data={packages}
      columns={columns}
      keyExtractor={(pkg) => pkg.id}
      selectAllChecked={selectedPackages.length === packages.length && packages.length > 0}
      onSelectAll={handleSelectAll}
      emptyMessage={searchQuery ? "لا توجد نتائج للبحث" : "لا توجد باقات مسجلة"}
    />
  );
}

