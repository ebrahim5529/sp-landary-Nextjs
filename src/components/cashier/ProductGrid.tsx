import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { LoadingState, EmptyState } from "@/components/ui/loading";
import { cn } from "@/lib/utils";

interface SubItem {
  id: string;
  name: string;
  department_id: string;
  department_name?: string;
  image_url?: string;
}

interface ProductGridProps {
  selectedItems: { sub_item_id: string }[];
  onItemSelect: (item: SubItem) => void;
}

export function ProductGrid({ selectedItems, onItemSelect }: ProductGridProps) {
    const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  useEffect(() => {
    // fetchData removed
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock sub-items and departments
      const mockDepartments = [
        { id: "dept-1", name: "الرجالي" },
        { id: "dept-2", name: "النسائي" },
        { id: "dept-3", name: "المفروشات" },
      ];

      const mockSubItems: SubItem[] = [
        { id: "item-1", name: "ثوب", department_id: "dept-1", department_name: "الرجالي" },
        { id: "item-2", name: "قميص", department_id: "dept-1", department_name: "الرجالي" },
        { id: "item-3", name: "فستان", department_id: "dept-2", department_name: "النسائي" },
        { id: "item-4", name: "عباية", department_id: "dept-2", department_name: "النسائي" },
        { id: "item-5", name: "بطانية", department_id: "dept-3", department_name: "المفروشات" },
      ];

      setSubItems(mockSubItems);
      setDepartments(mockDepartments);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("حدث خطأ في جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  // تصفية القطع
  const filteredItems = useMemo(() => {
    return subItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "all" || item.department_id === selectedDepartment;

      const isNotSelected = !selectedItems.some(
        (selected) => selected.sub_item_id === item.id
      );

      return matchesSearch && matchesDepartment && isNotSelected;
    });
  }, [subItems, searchQuery, selectedDepartment, selectedItems]);

  const handleItemClick = (item: SubItem) => {
    const isAlreadyAdded = selectedItems.some(
      (selected) => selected.sub_item_id === item.id
    );

    if (isAlreadyAdded) {
      toast.info("هذه القطعة مضافة بالفعل");
      return;
    }

    onItemSelect(item);
    toast.success(`تم إضافة ${item.name}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingState variant="spinner" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* شريط البحث */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن قطعة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* فلترة حسب الأقسام */}
      {departments.length > 0 && (
        <div className="mb-4">
          <Tabs
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
            className="w-full"
          >
            <TabsList className="flex flex-wrap gap-2 h-auto p-1">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                الكل
              </TabsTrigger>
              {departments.map((dept) => (
                <TabsTrigger
                  key={dept.id}
                  value={dept.id}
                  className="text-xs md:text-sm"
                >
                  {dept.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Grid القطع */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              title="لا توجد قطع"
              description={
                searchQuery
                  ? "لم يتم العثور على قطع تطابق البحث"
                  : "لا توجد قطع متاحة"
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md hover:border-primary",
                  "flex flex-col h-full"
                )}
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="p-3 flex flex-col items-center text-center h-full">
                  {item.image_url ? (
                    <div className="w-full aspect-square mb-2 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square mb-2 rounded-lg bg-muted flex items-center justify-center">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center w-full">
                    <div className="font-medium text-sm mb-1 line-clamp-2">
                      {item.name}
                    </div>
                    {item.department_name && (
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {item.department_name}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

