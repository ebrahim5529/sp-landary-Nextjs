"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Edit, Trash2, Eye, Mail, Phone, FileText } from "lucide-react";

interface LaundryOwner {
    id: string;
    email: string;
    email_confirmed_at: string | null;
    full_name: string | null;
    phone: string | null;
    created_at: string | null;
    laundry_info?: {
        id: string;
        name: string;
        tax_number: string | null;
        commercial_registration: string | null;
        address: string | null;
        logo_url: string | null;
        invoice_footer_message: string | null;
        default_tax_rate: number | null;
        created_at: string | null;
        updated_at: string | null;
    };
    subscription?: {
        status: string;
        plan_name: string;
    };
}

export default function AdminLaundriesPage() {
    const router = useRouter();
    const [laundries, setLaundries] = useState<LaundryOwner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLaundry, setSelectedLaundry] = useState<LaundryOwner | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        tax_number: "",
        commercial_registration: "",
        address: "",
        logo_url: "",
        invoice_footer_message: "",
        default_tax_rate: "15.00",
    });

    useEffect(() => {
        fetchLaundries();
    }, []);

    const fetchLaundries = async () => {
        try {
            setLoading(true);
            // Backend removal cleanup - mock laundries
            const mockLaundries: LaundryOwner[] = [
                {
                    id: "1",
                    email: "owner@example.com",
                    email_confirmed_at: new Date().toISOString(),
                    full_name: "محمد علي",
                    phone: "0500000000",
                    created_at: new Date().toISOString(),
                    laundry_info: {
                        id: "1",
                        name: "مغسلة النور",
                        tax_number: "1234567890",
                        commercial_registration: "1010101010",
                        address: "الرياض",
                        logo_url: "",
                        invoice_footer_message: "شكرا لتعاملكم معنا",
                        default_tax_rate: 15,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                    subscription: {
                        status: "active",
                        plan_name: "الخطة المتقدمة",
                    },
                },
            ];

            setLaundries(mockLaundries);
        } catch (error: any) {
            console.error("Error fetching laundries:", error);
            toast.error("حدث خطأ في جلب بيانات المغاسل");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (laundry: LaundryOwner) => {
        router.push(`/admin/laundries/${laundry.id}`);
    };

    const handleViewDetails = (laundry: LaundryOwner) => {
        setSelectedLaundry(laundry);
        setIsEditMode(false);
        const laundryInfo = laundry.laundry_info;
        setFormData({
            name: laundryInfo?.name || "",
            tax_number: laundryInfo?.tax_number || "",
            commercial_registration: laundryInfo?.commercial_registration || "",
            address: laundryInfo?.address || "",
            logo_url: laundryInfo?.logo_url || "",
            invoice_footer_message: laundryInfo?.invoice_footer_message || "",
            default_tax_rate: laundryInfo?.default_tax_rate?.toString() || "15.00",
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (laundry: LaundryOwner) => {
        setSelectedLaundry(laundry);
        setIsEditMode(true);
        const laundryInfo = laundry.laundry_info;
        setFormData({
            name: laundryInfo?.name || "",
            tax_number: laundryInfo?.tax_number || "",
            commercial_registration: laundryInfo?.commercial_registration || "",
            address: laundryInfo?.address || "",
            logo_url: laundryInfo?.logo_url || "",
            invoice_footer_message: laundryInfo?.invoice_footer_message || "",
            default_tax_rate: laundryInfo?.default_tax_rate?.toString() || "15.00",
        });
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!selectedLaundry) return;

        try {
            // Backend removal cleanup
            toast.success("تم حفظ بيانات المغسلة بنجاح (بيئة عرض)");
            setIsDialogOpen(false);
            fetchLaundries();
        } catch (error: any) {
            console.error("Error saving laundry:", error);
            toast.error("حدث خطأ في حفظ بيانات المغسلة");
        }
    };

    const handleDelete = async (ownerId: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا المستخدم والمغسلة المرتبطة به؟")) return;

        try {
            // Backend removal cleanup
            toast.success("تم حذف بيانات المغسلة بنجاح (بيئة عرض)");
            fetchLaundries();
        } catch (error: any) {
            console.error("Error deleting laundry:", error);
            toast.error("حدث خطأ في حذف بيانات المغسلة");
        }
    };

    const filteredLaundries = laundries.filter((laundry) =>
        laundry.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laundry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laundry.laundry_info?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laundry.phone?.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">إدارة المغاسل</h2>
            </div>

            {/* شريط البحث */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ابحث عن مغسلة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* جدول المغاسل */}
            <Card>
                <CardHeader>
                    <CardTitle>قائمة المغاسل</CardTitle>
                    <CardDescription>إدارة جميع المغاسل المسجلة في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">جاري التحميل...</div>
                    ) : filteredLaundries.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            لا توجد مغاسل مسجلة
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>اسم المغسلة</TableHead>
                                    <TableHead>صاحب المغسلة</TableHead>
                                    <TableHead>البريد الإلكتروني</TableHead>
                                    <TableHead>رقم الهاتف</TableHead>
                                    <TableHead>الرقم الضريبي</TableHead>
                                    <TableHead>حالة الاشتراك</TableHead>
                                    <TableHead>تاريخ التسجيل</TableHead>
                                    <TableHead className="text-left">الإجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLaundries.map((laundry) => (
                                    <TableRow key={laundry.id}>
                                        <TableCell className="font-medium">
                                            {laundry.laundry_info?.name || (
                                                <span className="text-muted-foreground">لم يتم التسجيل</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{laundry.full_name || "غير متوفر"}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{laundry.email}</span>
                                                {!laundry.email_confirmed_at && (
                                                    <Badge variant="outline" className="text-xs mt-1 w-fit">
                                                        غير مؤكد
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{laundry.phone || "-"}</TableCell>
                                        <TableCell>{laundry.laundry_info?.tax_number || "-"}</TableCell>
                                        <TableCell>
                                            {laundry.subscription ? (
                                                <Badge
                                                    variant={
                                                        laundry.subscription.status === "active"
                                                            ? "default"
                                                            : laundry.subscription.status === "trial"
                                                                ? "secondary"
                                                                : "outline"
                                                    }
                                                >
                                                    {laundry.subscription.plan_name}
                                                </Badge>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {laundry.created_at
                                                ? new Date(laundry.created_at).toLocaleDateString("ar-SA")
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleView(laundry)}
                                                    title="عرض البروفايل الكامل"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleViewDetails(laundry)}
                                                    title="عرض/تعديل بيانات المغسلة"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(laundry)}
                                                    title="تعديل"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                {laundry.laundry_info && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(laundry.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* نافذة عرض/تعديل المغسلة */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? "تعديل بيانات المغسلة" : "عرض بيانات المغسلة"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? "قم بتعديل بيانات المغسلة وحفظ التغييرات"
                                : "عرض تفاصيل المغسلة الكاملة"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* معلومات أساسية */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">اسم المغسلة *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditMode}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tax_number">الرقم الضريبي</Label>
                                <Input
                                    id="tax_number"
                                    value={formData.tax_number}
                                    onChange={(e) => setFormData({ ...formData, tax_number: e.target.value })}
                                    disabled={!isEditMode}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="commercial_registration">السجل التجاري</Label>
                                <Input
                                    id="commercial_registration"
                                    value={formData.commercial_registration}
                                    onChange={(e) =>
                                        setFormData({ ...formData, commercial_registration: e.target.value })
                                    }
                                    disabled={!isEditMode}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="default_tax_rate">معدل الضريبة الافتراضي (%)</Label>
                                <Input
                                    id="default_tax_rate"
                                    type="number"
                                    step="0.01"
                                    value={formData.default_tax_rate}
                                    onChange={(e) => setFormData({ ...formData, default_tax_rate: e.target.value })}
                                    disabled={!isEditMode}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">العنوان</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                disabled={!isEditMode}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo_url">رابط الشعار</Label>
                            <Input
                                id="logo_url"
                                value={formData.logo_url}
                                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                disabled={!isEditMode}
                                placeholder="https://example.com/logo.png"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="invoice_footer_message">رسالة تذييل الفاتورة</Label>
                            <Textarea
                                id="invoice_footer_message"
                                value={formData.invoice_footer_message}
                                onChange={(e) =>
                                    setFormData({ ...formData, invoice_footer_message: e.target.value })
                                }
                                disabled={!isEditMode}
                                rows={3}
                                placeholder="رسالة تظهر في أسفل الفواتير"
                            />
                        </div>

                        {/* معلومات المالك */}
                        {selectedLaundry && (
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold mb-4">معلومات المالك</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                                            <p className="font-medium">{selectedLaundry.email}</p>
                                            {!selectedLaundry.email_confirmed_at && (
                                                <Badge variant="outline" className="text-xs mt-1">
                                                    غير مؤكد
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">الاسم الكامل</p>
                                            <p className="font-medium">{selectedLaundry.full_name || "غير متوفر"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                                            <p className="font-medium">{selectedLaundry.phone || "غير متوفر"}</p>
                                        </div>
                                    </div>
                                    {selectedLaundry.subscription && (
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="text-sm text-muted-foreground">حالة الاشتراك</p>
                                                <Badge
                                                    variant={
                                                        selectedLaundry.subscription.status === "active"
                                                            ? "default"
                                                            : selectedLaundry.subscription.status === "trial"
                                                                ? "secondary"
                                                                : "outline"
                                                    }
                                                >
                                                    {selectedLaundry.subscription.plan_name} - {selectedLaundry.subscription.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {isEditMode && (
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    إلغاء
                                </Button>
                                <Button onClick={handleSave}>حفظ التغييرات</Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
