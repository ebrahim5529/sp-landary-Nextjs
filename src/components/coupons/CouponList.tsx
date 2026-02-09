import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";

interface Coupon {
  id: string;
  code: string;
  coupon_type: string;
  discount_type: string;
  discount_value: number;
  min_purchase: number | null;
  usage_limit: number | null;
  used_count: number;
  start_date: string | null;
  end_date: string | null;
  active: boolean;
  created_at: string;
}

interface CouponListProps {
  onEdit?: (couponId: string) => void;
  onDelete?: (couponId: string) => void;
  selectedCoupons?: string[];
  onSelectionChange?: (selected: string[]) => void;
  searchQuery?: string;
}

export function CouponList({
  onEdit,
  onDelete,
  selectedCoupons = [],
  onSelectionChange,
  searchQuery = "",
}: CouponListProps) {
  const { mockUser } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mockUser?.id) {
      fetchCoupons();
    }
  }, [mockUser?.id, searchQuery]);

  const fetchCoupons = async () => {
    setLoading(true);
    // Backend removal cleanup - mock coupons
    const allCoupons: Coupon[] = [
      {
        id: "cpn-1",
        code: "WELCOME20",
        coupon_type: "coupon",
        discount_type: "percentage",
        discount_value: 20,
        min_purchase: 50,
        usage_limit: 100,
        used_count: 45,
        start_date: new Date(Date.now() - 30 * 86400000).toISOString(),
        end_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "cpn-2",
        code: "SAVE10",
        coupon_type: "discount",
        discount_type: "fixed",
        discount_value: 10,
        min_purchase: 100,
        usage_limit: 50,
        used_count: 50,
        start_date: new Date(Date.now() - 60 * 86400000).toISOString(),
        end_date: new Date(Date.now() - 1 * 86400000).toISOString(),
        active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "cpn-3",
        code: "EID2024",
        coupon_type: "offer",
        discount_type: "percentage",
        discount_value: 25,
        min_purchase: null,
        usage_limit: null,
        used_count: 10,
        start_date: new Date(Date.now() + 10 * 86400000).toISOString(),
        end_date: new Date(Date.now() + 20 * 86400000).toISOString(),
        active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "cpn-4",
        code: "DEACTIVATED",
        coupon_type: "discount",
        discount_type: "fixed",
        discount_value: 5,
        min_purchase: 20,
        usage_limit: 10,
        used_count: 0,
        start_date: null,
        end_date: null,
        active: false,
        created_at: new Date().toISOString(),
      },
    ];

    const filtered = allCoupons.filter(c =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.coupon_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.discount_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setCoupons(filtered);
    setLoading(false);
  };

  const handleSelectCoupon = (couponId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedCoupons, couponId]);
      } else {
        onSelectionChange(selectedCoupons.filter((id) => id !== couponId));
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? coupons.map((c) => c.id) : []);
    }
  };

  const getCouponTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      discount: "خصم",
      offer: "عرض",
      coupon: "كوبون",
    };
    return types[type] || type;
  };

  const getDiscountTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      fixed: "ثابت",
      percentage: "نسبة مئوية",
      item: "قطعة",
      conditional: "بشروط",
    };
    return types[type] || type;
  };

  const getStatusBadge = (coupon: Coupon) => {
    const now = new Date();
    const startDate = coupon.start_date ? new Date(coupon.start_date) : null;
    const endDate = coupon.end_date ? new Date(coupon.end_date) : null;

    if (!coupon.active) {
      return <Badge variant="destructive">غير فعال</Badge>;
    }

    if (startDate && now < startDate) {
      return <Badge variant="secondary">قادم</Badge>;
    }

    if (endDate && now > endDate) {
      return <Badge variant="destructive">منتهي</Badge>;
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return <Badge variant="destructive">مستنفذ</Badge>;
    }

    return <Badge variant="default">فعال</Badge>;
  };

  const formatDiscountValue = (coupon: Coupon) => {
    if (coupon.discount_type === "percentage") {
      return `${coupon.discount_value}%`;
    }
    return `${coupon.discount_value} ريال`;
  };

  const columns: ResponsiveTableColumn<Coupon>[] = [
    {
      key: "select",
      header: "",
      mobileLabel: "",
      accessor: (coupon) => (
        <input
          type="checkbox"
          checked={selectedCoupons.includes(coupon.id)}
          onChange={(e) => handleSelectCoupon(coupon.id, e.target.checked)}
          className="rounded"
        />
      ),
      hideOnTablet: true,
    },
    {
      key: "code",
      header: "رمز الكوبون",
      mobileLabel: "رمز الكوبون",
      accessor: (coupon) => <span className="font-medium">{coupon.code}</span>,
    },
    {
      key: "type",
      header: "النوع",
      mobileLabel: "النوع",
      accessor: (coupon) => (
        <div className="space-y-1">
          <div>{getCouponTypeLabel(coupon.coupon_type)}</div>
          <div className="text-sm text-muted-foreground">{getDiscountTypeLabel(coupon.discount_type)}</div>
        </div>
      ),
    },
    {
      key: "discount",
      header: "قيمة الخصم",
      mobileLabel: "قيمة الخصم",
      accessor: (coupon) => <span className="font-medium">{formatDiscountValue(coupon)}</span>,
    },
    {
      key: "usage",
      header: "الاستخدام",
      mobileLabel: "الاستخدام",
      accessor: (coupon) => (
        <span className="text-sm">
          {coupon.used_count} / {coupon.usage_limit || "∞"}
        </span>
      ),
    },
    {
      key: "dates",
      header: "التواريخ",
      mobileLabel: "التواريخ",
      accessor: (coupon) => (
        <div className="text-sm space-y-1">
          {coupon.start_date && (
            <div>من: {format(new Date(coupon.start_date), "yyyy-MM-dd", { locale: ar })}</div>
          )}
          {coupon.end_date && (
            <div>إلى: {format(new Date(coupon.end_date), "yyyy-MM-dd", { locale: ar })}</div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (coupon) => getStatusBadge(coupon),
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (coupon) => (
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(coupon.id)} title="تعديل">
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={() => onDelete(coupon.id)} title="حذف">
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
      data={coupons}
      columns={columns}
      keyExtractor={(coupon) => coupon.id}
      selectAllChecked={selectedCoupons.length === coupons.length && coupons.length > 0}
      onSelectAll={handleSelectAll}
      emptyMessage={searchQuery ? "لا توجد نتائج للبحث" : "لا توجد قسائم مسجلة"}
    />
  );
}
