import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Image as ImageIcon, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface SubItem {
  id: string;
  name: string;
  image_url: string | null;
  department_id: string;
  department_name: string;
  active: boolean;
  invoicesCount: number;
  totalInvoicesAmount: number;
}

interface SubItemListProps {
  onEdit?: (subItemId: string) => void;
  onDelete?: (subItemId: string) => void;
  onView?: (subItemId: string) => void;
}

export function SubItemList({ onEdit, onDelete, onView }: SubItemListProps) {
    const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubItems();
  }, []);

  const fetchSubItems = async () => {
    setLoading(true);
    // Backend removal cleanup - mock sub-items
    const mockSubItems: SubItem[] = [
      {
        id: "item-1",
        name: "ثوب",
        image_url: null,
        department_id: "dept-1",
        department_name: "الرجالي",
        active: true,
        invoicesCount: 150,
        totalInvoicesAmount: 3750,
      },
      {
        id: "item-2",
        name: "فستان سهرة",
        image_url: null,
        department_id: "dept-2",
        department_name: "النسائي",
        active: true,
        invoicesCount: 45,
        totalInvoicesAmount: 2250,
      },
      {
        id: "item-3",
        name: "بطانية كبيرة",
        image_url: null,
        department_id: "dept-3",
        department_name: "المفروشات",
        active: true,
        invoicesCount: 30,
        totalInvoicesAmount: 1500,
      },
      {
        id: "item-4",
        name: "قميص رسمي",
        image_url: null,
        department_id: "dept-1",
        department_name: "الرجالي",
        active: false,
        invoicesCount: 80,
        totalInvoicesAmount: 800,
      },
    ];

    setSubItems(mockSubItems);
    setLoading(false);
  };

  const columns: ResponsiveTableColumn<SubItem>[] = [
    {
      key: "image",
      header: "الصورة",
      mobileLabel: "الصورة",
      accessor: (item) =>
        item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-gray-400" />
          </div>
        ),
    },
    {
      key: "name",
      header: "اسم القطعة",
      mobileLabel: "اسم القطعة",
      accessor: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "department_name",
      header: "القسم",
      mobileLabel: "القسم",
      accessor: (item) => item.department_name,
    },
    {
      key: "active",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (item) => (
        <Badge variant={item.active ? "default" : "secondary"}>
          {item.active ? "نشط" : "معطل"}
        </Badge>
      ),
    },
    {
      key: "invoicesCount",
      header: "عدد الفواتير",
      mobileLabel: "عدد الفواتير",
      accessor: (item) => (
        <span className="font-medium">{item.invoicesCount}</span>
      ),
    },
    {
      key: "totalInvoicesAmount",
      header: "إجمالي الفواتير",
      mobileLabel: "إجمالي الفواتير",
      accessor: (item) => (
        <CurrencyDisplay amount={item.totalInvoicesAmount} />
      ),
      hideOnTablet: true,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (item) => (
        <div className="flex gap-2 flex-wrap">
          {onView && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(item.id)}
              className="h-8 w-8 p-0"
              title="عرض التفاصيل"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item.id)}
              className="h-8 w-8 p-0"
              title="تعديل"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="text-destructive h-8 w-8 p-0"
              title="حذف"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={5} />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <ResponsiveTable
        columns={columns}
        data={subItems}
        keyExtractor={(item) => item.id}
        emptyMessage="لا توجد قطع فرعية"
      />
    </div>
  );
}

