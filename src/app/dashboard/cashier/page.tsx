"use client";

import React, { useState, useEffect } from "react";
import { CustomerSelector } from "@/components/cashier/CustomerSelector";
import { ProductGrid } from "@/components/cashier/ProductGrid";
import { CartPanel } from "@/components/cashier/CartPanel";
import { InvoiceList } from "@/components/cashier/InvoiceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateTax, calculateTotal } from "@/utils/invoice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Customer {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    customer_code: string | null;
}

interface SelectedItem {
    sub_item_id: string;
    sub_item_name: string;
    department_id: string;
    department_name: string;
    quantity: number;
    services: { service_id: string; service_name?: string; price: number }[];
}

export default function CashierPage() {
        const router = useRouter();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [discount, setDiscount] = useState(0);
    const [taxRate, setTaxRate] = useState(15);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [amountPaid, setAmountPaid] = useState(0);
    const [loading, setLoading] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<{
        code: string;
        discount: number;
        type: string;
    } | null>(null);

    useEffect(() => {
        fetchLaundryInfo();
    }, []);

    const fetchLaundryInfo = async () => {
        try {
            // Backend removal cleanup
            setTaxRate(15);
        } catch (error) {
            console.error("Error fetching laundry info:", error);
        }
    };

    const calculateSubtotal = () => {
        if (!selectedItems || selectedItems.length === 0) return 0;
        return selectedItems.reduce((sum, item) => {
            if (!item.services || item.services.length === 0) return sum;
            const itemTotal = item.services.reduce(
                (itemSum, service) => itemSum + service.price * item.quantity,
                0
            );
            return sum + itemTotal;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal - discount, taxRate);
    const total = calculateTotal(subtotal, tax, discount);
    const piecesCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        setAmountPaid(total);
    }, [total]);

    useEffect(() => {
        // تطبيق القسائم التلقائية عند تغيير العميل أو القطع
        applyAutomaticCoupons();
    }, [selectedCustomer, selectedItems, subtotal]);

    const handleItemSelect = (item: { id: string; name: string; department_id: string; department_name?: string }) => {
        // التحقق من أن القطعة غير مضافة مسبقاً
        const isAlreadyAdded = selectedItems.some((selected) => selected.sub_item_id === item.id);

        if (isAlreadyAdded) {
            toast.info("هذه القطعة مضافة بالفعل");
            return;
        }

        setSelectedItems([
            ...selectedItems,
            {
                sub_item_id: item.id,
                sub_item_name: item.name,
                department_id: item.department_id,
                department_name: item.department_name || "",
                quantity: 1,
                services: [],
            },
        ]);
    };

    const applyAutomaticCoupons = async () => {
        // Backend removal cleanup - automated coupons disabled or mocked
    };

    const handleCouponApply = async (couponCode: string) => {
        // Backend removal cleanup
        if (!couponCode.trim()) {
            setDiscount(0);
            setAppliedCoupon(null);
            return;
        }

        // Mock successful coupon application
        setDiscount(5);
        setAppliedCoupon({
            code: couponCode.toUpperCase(),
            discount: 5,
            type: "invoice",
        });
        toast.success("تم تطبيق القسيمة بنجاح (بيئة عرض)");
    };

    const handleIssueInvoice = async () => {
        if (!selectedCustomer) {
            toast.error("يرجى اختيار عميل");
            return;
        }

        if (selectedItems.length === 0) {
            toast.error("يرجى إضافة قطعة واحدة على الأقل");
            return;
        }

        // التحقق من أن كل قطعة لديها خدمة واحدة على الأقل
        const itemsWithoutServices = selectedItems.filter((item) => item.services.length === 0);
        if (itemsWithoutServices.length > 0) {
            toast.error("يرجى اختيار خدمة واحدة على الأقل لكل قطعة");
            return;
        }

        if (amountPaid < total) {
            toast.error("المبلغ المدفوع أقل من الإجمالي");
            return;
        }

        setLoading(true);
        try {
            // Backend removal cleanup
            toast.success("تم إصدار الفاتورة بنجاح (بيئة عرض)");

            // إعادة تعيين النموذج
            setSelectedCustomer(null);
            setSelectedItems([]);
            setDiscount(0);
            setAmountPaid(0);
            setAppliedCoupon(null);

            // الانتقال إلى صفحة الفواتير
            router.push(`/dashboard/invoices`);
        } catch (error: any) {
            console.error("Error issuing invoice:", error);
            toast.error("حدث خطأ في إصدار الفاتورة");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col" dir="rtl">
            <Tabs defaultValue="new" className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">الكاشير</h2>
                    <TabsList>
                        <TabsTrigger value="new">فاتورة جديدة</TabsTrigger>
                        <TabsTrigger value="recent">الفواتير الأخيرة</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="new" className="flex-1 flex flex-col space-y-0">
                    {/* شريط علوي */}
                    <div className="mb-4 pb-4 border-b">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <CustomerSelector
                                    selectedCustomer={selectedCustomer}
                                    onSelectCustomer={setSelectedCustomer}
                                />
                            </div>
                        </div>
                    </div>

                    {/* المحتوى الرئيسي */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[30%_70%] gap-4 overflow-hidden">
                        {/* الجانب الأيسر: سلة المشتريات */}
                        <div className="overflow-hidden flex flex-col min-h-0">
                            <CartPanel
                                customerName={selectedCustomer?.name || ""}
                                selectedItems={selectedItems}
                                onItemsChange={setSelectedItems}
                                subtotal={subtotal}
                                discount={discount}
                                tax={tax}
                                total={total}
                                piecesCount={piecesCount}
                                paymentMethod={paymentMethod}
                                onPaymentMethodChange={setPaymentMethod}
                                amountPaid={amountPaid}
                                onAmountPaidChange={setAmountPaid}
                                onCouponApply={handleCouponApply}
                                appliedCoupon={appliedCoupon}
                                onIssueInvoice={handleIssueInvoice}
                                loading={loading}
                                canIssue={!loading && !!selectedCustomer && selectedItems.length > 0 && selectedItems.every(item => item.services.length > 0)}
                            />
                        </div>

                        {/* الجانب الأيمن: Grid القطع */}
                        <div className="bg-muted/30 rounded-lg p-4 overflow-hidden flex flex-col min-h-0">
                            <ProductGrid
                                selectedItems={selectedItems}
                                onItemSelect={handleItemSelect}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="recent" className="flex-1 overflow-y-auto">
                    <InvoiceList
                        onViewInvoice={(id) => router.push(`/dashboard/invoices?invoice=${id}`)}
                        onPrintInvoice={(id) => router.push(`/dashboard/invoices?invoice=${id}&print=true`)}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
