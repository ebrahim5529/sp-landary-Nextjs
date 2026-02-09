import { useState, useEffect } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";

interface Product {
  id: string;
  name: string;
  code: string | null;
  quantity: number;
  unit_price: number | null;
  description: string | null;
  reorder_level: number | null;
  supplier: {
    id: string;
    name: string;
  } | null;
  created_at: string;
}

interface ProductListProps {
  onEdit?: (productId: string) => void;
  onDelete?: (productId: string) => void;
}

export function ProductList({ onEdit, onDelete }: ProductListProps) {
    const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    // Backend removal cleanup - mock products
    const mockProducts: Product[] = [
      {
        id: "prod-1",
        name: "منظف عام",
        code: "DET-001",
        quantity: 50,
        unit_price: 25.5,
        description: "منظف ملابس لجميع الأنواع",
        reorder_level: 10,
        supplier: { id: "sup-1", name: "شركة التوريدات الوطنية" },
        created_at: new Date().toISOString(),
      },
      {
        id: "prod-2",
        name: "منعم ملابس",
        code: "DET-002",
        quantity: 5,
        unit_price: 15.0,
        description: "منعم برائحة اللافندر",
        reorder_level: 10,
        supplier: { id: "sup-2", name: "مؤسسة الأمل للمنظفات" },
        created_at: new Date().toISOString(),
      },
      {
        id: "prod-3",
        name: "مبيض ملابس",
        code: "DET-003",
        quantity: 0,
        unit_price: 12.0,
        description: "مبيض للملابس البيضاء",
        reorder_level: 5,
        supplier: { id: "sup-1", name: "شركة التوريدات الوطنية" },
        created_at: new Date().toISOString(),
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      (product.code && product.code.toLowerCase().includes(query)) ||
      (product.supplier && product.supplier.name.toLowerCase().includes(query))
    );
  });

  const getStockStatus = (quantity: number, reorderLevel: number | null) => {
    if (quantity === 0) {
      return { label: "منتهي", variant: "destructive" as const };
    }
    if (reorderLevel && quantity <= reorderLevel) {
      return { label: "منخفض", variant: "secondary" as const };
    }
    return { label: "متوفر", variant: "default" as const };
  };

  const columns: ResponsiveTableColumn<Product>[] = [
    {
      key: "name",
      header: "اسم المنتج",
      mobileLabel: "اسم المنتج",
      accessor: (product) => <span className="font-medium">{product.name}</span>,
    },
    {
      key: "code",
      header: "الكود",
      mobileLabel: "الكود",
      accessor: (product) => product.code || <span className="text-muted-foreground">-</span>,
    },
    {
      key: "quantity",
      header: "الكمية",
      mobileLabel: "الكمية",
      accessor: (product) => {
        const status = getStockStatus(product.quantity || 0, product.reorder_level);
        return (
          <div className="flex items-center gap-2">
            <span>{product.quantity || 0}</span>
            <Badge variant={status.variant} className="text-xs">
              {status.label}
            </Badge>
          </div>
        );
      },
    },
    {
      key: "unit_price",
      header: "سعر الوحدة",
      mobileLabel: "سعر الوحدة",
      accessor: (product) => (
        <CurrencyDisplay value={product.unit_price || 0} />
      ),
    },
    {
      key: "supplier",
      header: "المورد",
      mobileLabel: "المورد",
      accessor: (product) => product.supplier?.name || <span className="text-muted-foreground">-</span>,
      hideOnTablet: true,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (product) => (
        <div className="flex gap-2 flex-wrap">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product.id)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={4} />;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="ابحث بالاسم أو الكود أو المورد..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>
      <ResponsiveTable
        columns={columns}
        data={filteredProducts}
        keyExtractor={(product) => product.id}
        emptyMessage="لا توجد منتجات مسجلة"
      />
    </div>
  );
}

