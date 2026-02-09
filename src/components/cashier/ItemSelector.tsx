import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, X, Search, Check } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, LoadingState } from "@/components/ui/loading";
import { cn } from "@/lib/utils";

interface SubItem {
  id: string;
  name: string;
  department_id: string;
  department_name?: string;
  image_url?: string;
}

interface SelectedItem {
  sub_item_id: string;
  sub_item_name: string;
  department_id: string;
  department_name: string;
  quantity: number;
}

interface ItemSelectorProps {
  selectedItems: SelectedItem[];
  onItemsChange: (items: SelectedItem[]) => void;
}

export function ItemSelector({ selectedItems, onItemsChange }: ItemSelectorProps) {
    const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // fetchData removed
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup - mock data
      const mockSubItems = [
        {
          id: "1",
          name: "قميص رجالي",
          department_id: "1",
          image_url: "",
          departments: { name: "قسم الغسيل" },
        },
        {
          id: "2",
          name: "بنطال جينز",
          department_id: "1",
          image_url: "",
          departments: { name: "قسم الغسيل" },
        },
        {
          id: "3",
          name: "غطاء سرير",
          department_id: "2",
          image_url: "",
          departments: { name: "قسم الكي" },
        },
      ];

      const mockDepartments = [
        { id: "1", name: "قسم الغسيل" },
        { id: "2", name: "قسم الكي" },
        { id: "3", name: "قسم التعبئة" },
      ];

      const itemsWithDept = mockSubItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        department_id: item.department_id,
        department_name: item.departments?.name || "",
        image_url: item.image_url,
      }));

      setSubItems(itemsWithDept);
      setDepartments(mockDepartments);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("حدث خطأ في جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item: SubItem) => {
    // التحقق من أن القطعة غير مضافة مسبقاً
    const isAlreadyAdded = selectedItems.some((selected) => selected.sub_item_id === item.id);
    
    if (isAlreadyAdded) {
      toast.info("هذه القطعة مضافة بالفعل");
      return;
    }

    onItemsChange([
      ...selectedItems,
      {
        sub_item_id: item.id,
        sub_item_name: item.name,
        department_id: item.department_id,
        department_name: item.department_name || "",
        quantity: 1,
      },
    ]);
    
    setOpen(false);
    setSearchQuery("");
    toast.success(`تم إضافة ${item.name}`);
  };

  const handleRemoveItem = (index: number) => {
    onItemsChange(selectedItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof SelectedItem, value: any) => {
    const updated = [...selectedItems];
    updated[index] = { ...updated[index], [field]: value };

    // إذا تغيرت القطعة، تحديث اسم القطعة والقسم
    if (field === "sub_item_id") {
      const item = subItems.find((i) => i.id === value);
      if (item) {
        updated[index].sub_item_name = item.name;
        updated[index].department_id = item.department_id;
        updated[index].department_name = item.department_name || "";
      }
    }

    onItemsChange(updated);
  };

  const getItemsByDepartment = (departmentId: string) => {
    return subItems.filter((item) => item.department_id === departmentId);
  };

  // تصفية القطع حسب البحث
  const filteredSubItems = subItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // استبعاد القطع المضافة مسبقاً
    const isNotSelected = !selectedItems.some((selected) => selected.sub_item_id === item.id);
    
    return matchesSearch && isNotSelected;
  });

  // تجميع القطع حسب الأقسام بعد التصفية
  const groupedItems = departments
    .map((dept) => ({
      department: dept,
      items: filteredSubItems.filter((item) => item.department_id === dept.id),
    }))
    .filter((group) => group.items.length > 0);

  if (loading) {
    return <LoadingState variant="spinner" size="sm" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>القطع المستلمة</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              إضافة قطعة
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="end">
            <Command>
              <CommandInput
                placeholder="ابحث عن قطعة..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>لا توجد قطع متاحة</CommandEmpty>
                {groupedItems.map((group) => (
                  <CommandGroup key={group.department.id} heading={group.department.name}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={`${item.id}-${item.name}`}
                        onSelect={() => {
                          handleSelectItem(item);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-8 w-8 rounded object-cover"
                              />
                            )}
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              {item.department_name && (
                                <span className="text-xs text-muted-foreground">
                                  {item.department_name}
                                </span>
                              )}
                            </div>
                          </div>
                          <Check className="h-4 w-4 opacity-0 group-data-[selected=true]:opacity-100" />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border rounded-lg">
          <EmptyState 
            title="لا توجد قطع"
            description='لا توجد قطع مضافة. اضغط على "إضافة قطعة" لاختيار القطع.'
          />
        </div>
      ) : (
        <div className="space-y-3">
          {selectedItems.map((item, index) => {
            const subItem = subItems.find((i) => i.id === item.sub_item_id);
            return (
              <Card key={index} className="p-3">
                <div className="flex gap-3 items-start">
                  {subItem?.image_url && (
                    <img
                      src={subItem.image_url}
                      alt={item.sub_item_name}
                      className="h-12 w-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="font-medium">{item.sub_item_name}</div>
                      {item.department_name && (
                        <div className="text-sm text-muted-foreground">
                          {item.department_name}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">الكمية:</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", parseInt(e.target.value) || 1)
                        }
                        className="w-20 h-8"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                    className="text-destructive flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

