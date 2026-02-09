import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Department {
  id: string;
  name: string;
}

interface SubItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subItemId?: string;
  onSuccess?: () => void;
}

export function SubItemForm({
  open,
  onOpenChange,
  subItemId,
  onSuccess,
}: SubItemFormProps) {
    const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSourceType, setImageSourceType] = useState<"file" | "url">("file");
  const [formData, setFormData] = useState({
    name: "",
    department_id: "",
    image_url: "",
    active: true,
  });

  useEffect(() => {
    if (open) {
      fetchDepartments();
      if (subItemId) {
        fetchSubItem();
      } else {
        setFormData({
          name: "",
          department_id: "",
          image_url: "",
          active: true,
        });
        setSelectedFile(null);
        setImagePreview(null);
        setImageSourceType("file");
      }
    }
  }, [open, subItemId]);

  const fetchDepartments = async () => {
    // Backend removal cleanup
    setDepartments([]);
  };


  const fetchSubItem = async () => {
    // Backend removal cleanup
  };


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith("image/")) {
        toast.error("الرجاء اختيار ملف صورة");
        return;
      }

      // التحقق من حجم الملف (مثلاً 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      setSelectedFile(file);

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image_url: "" });
    // إعادة تعيين حقل الملف
    if (typeof window !== 'undefined') {
      const fileInput = document.getElementById("image-file-input") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    // Backend removal cleanup
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.department_id) {
      toast.error("اسم القطعة والقسم مطلوبان");
      return;
    }

    setLoading(true);
    // Backend removal cleanup
    toast.success(subItemId ? "تم تحديث القطعة بنجاح (بيئة عرض)" : "تم إضافة القطعة بنجاح (بيئة عرض)");
    onOpenChange(false);
    if (onSuccess) {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{subItemId ? "تعديل القطعة" : "إضافة قطعة جديدة"}</DialogTitle>
          <DialogDescription>
            {subItemId ? "قم بتعديل معلومات القطعة" : "أدخل معلومات القطعة الجديدة"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم القطعة *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: ثوب أبيض"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">القسم *</Label>
              <Select
                value={formData.department_id}
                onValueChange={(value) => setFormData({ ...formData, department_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>الصورة (اختياري)</Label>
              <Tabs value={imageSourceType} onValueChange={(v) => setImageSourceType(v as "file" | "url")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">رفع من الجهاز</TabsTrigger>
                  <TabsTrigger value="url">إدخال رابط</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="cursor-pointer hidden"
                      disabled={loading || uploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          document.getElementById("image-file-input")?.click();
                        }
                      }}
                      disabled={loading || uploading}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      اختر صورة
                    </Button>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      تم اختيار: {selectedFile.name}
                    </p>
                  )}
                  {imagePreview && (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="معاينة الصورة"
                        className="h-32 w-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-0 left-0 h-6 w-6 p-0"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {uploading && (
                    <p className="text-sm text-muted-foreground">جاري رفع الصورة...</p>
                  )}
                </TabsContent>
                <TabsContent value="url" className="space-y-2">
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData({ ...formData, image_url: e.target.value });
                      if (e.target.value) {
                        setImagePreview(e.target.value);
                      } else {
                        setImagePreview(null);
                      }
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  {imagePreview && formData.image_url && (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="معاينة الصورة"
                        className="h-32 w-32 object-cover rounded-lg border"
                        onError={() => setImagePreview(null)}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-0 left-0 h-6 w-6 p-0"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="active">نشط</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الحفظ..." : subItemId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

