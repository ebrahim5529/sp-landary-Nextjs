"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceDetail } from "@/components/invoices/InvoiceDetail";
import { InvoicePrint } from "@/components/invoices/InvoicePrint";
import { ReturnInvoiceDialog } from "@/components/invoices/ReturnInvoiceDialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, DollarSign, CheckCircle, Clock, RotateCcw, TrendingUp } from "lucide-react";
import { ExportInvoiceDialog } from "@/components/invoices/ExportInvoiceDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { LoadingState } from "@/components/ui/loading";

export default function InvoicesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
        const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
        searchParams.get("invoice") || null
    );
    const [printMode, setPrintMode] = useState(searchParams.get("print") === "true");
    const [returnDialogOpen, setReturnDialogOpen] = useState(false);
    const [returnInvoiceId, setReturnInvoiceId] = useState<string | null>(null);
    const [returnInvoiceNumber, setReturnInvoiceNumber] = useState<string>("");
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [itemsData, setItemsData] = useState<any[]>([]);
    const [laundryInfo, setLaundryInfo] = useState<any>(null);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [stats, setStats] = useState({
        totalInvoices: 0,
        totalAmount: 0,
        paidInvoices: 0,
        pendingInvoices: 0,
        returnedInvoices: 0,
        averageInvoice: 0,
    });
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const invoiceParam = searchParams.get("invoice");
        const printParam = searchParams.get("print");

        if (invoiceParam) {
            setSelectedInvoiceId(invoiceParam);
            if (printParam === "true") {
                setPrintMode(true);
                fetchInvoiceForPrint(invoiceParam);
            } else {
                setPrintMode(false);
            }
        } else {
            setSelectedInvoiceId(null);
            setPrintMode(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchLaundryInfo();
  }, []);

    const fetchLaundryInfo = async () => {
        // Backend removal cleanup - mock laundry info
        setLaundryInfo({
            name: "مغسلة الفرسان",
            phone: "0500000000",
            address: "الرياض، حي الملز",
            tax_number: "123456789",
        });
    };

    const fetchInvoiceStats = async () => {
        setStatsLoading(true);
        // Backend removal cleanup - mock stats
        setStats({
            totalInvoices: 125,
            totalAmount: 15750.50,
            paidInvoices: 98,
            pendingInvoices: 22,
            returnedInvoices: 5,
            averageInvoice: 126.00,
        });
        setStatsLoading(false);
    };

    const fetchInvoiceForPrint = async (invoiceId: string) => {
        // Backend removal cleanup - mock data for print
        setInvoiceData({
            invoice_number: "INV-001",
            created_at: new Date().toISOString(),
            total_amount: 100,
            tax_amount: 15,
            discount_amount: 0,
            payment_method: "cash",
            customer: { name: "عميل تجريبي" }
        });
        setItemsData([
            { id: "1", sub_item: { name: "قميص" }, quantity: 1, unit_price: 10, total_price: 10, services: [{ service: { name: "غسيل" } }] }
        ]);
    };

    const handleViewInvoice = (invoiceId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("invoice", invoiceId);
        params.delete("print");
        router.push(`?${params.toString()}`);
    };

    const handlePrintInvoice = (invoiceId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("invoice", invoiceId);
        params.set("print", "true");
        router.push(`?${params.toString()}`);
    };

    const handleReturnInvoice = (invoiceId: string) => {
        // Backend removal cleanup
        setReturnInvoiceId(invoiceId);
        setReturnInvoiceNumber("MOCK-INV");
        setReturnDialogOpen(true);
    };

    const handleReturnSuccess = () => {
        router.push("/dashboard/invoices");
        fetchInvoiceStats(); // تحديث الإحصائيات بعد إرجاع الفاتورة
    };

    const handleBackToList = () => {
        router.push("/dashboard/invoices");
    };

    const handleExport = () => {
        setExportDialogOpen(true);
    };

    if (printMode && invoiceData && itemsData) {
        return (
            <InvoicePrint
                invoiceId={selectedInvoiceId || ""}
                invoice={invoiceData}
                items={itemsData}
                laundryInfo={laundryInfo}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">الفواتير</h2>
                <div className="flex gap-2">
                    {!selectedInvoiceId && (
                        <Button variant="outline" onClick={handleExport}>
                            <Download className="h-4 w-4 ml-2" />
                            تصدير
                        </Button>
                    )}
                    {selectedInvoiceId && (
                        <button
                            onClick={handleBackToList}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ← العودة للقائمة
                        </button>
                    )}
                </div>
            </div>

            {/* إحصائيات الفواتير */}
            {!selectedInvoiceId && (
                <>
                    {statsLoading ? (
                        <LoadingState variant="card" count={6} />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">إجمالي الفواتير</CardTitle>
                                    <FileText className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalInvoices}</div>
                                    <CardDescription>جميع الفواتير</CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">إجمالي المبلغ</CardTitle>
                                    <DollarSign className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        <CurrencyDisplay amount={stats.totalAmount} />
                                    </div>
                                    <CardDescription>إجمالي قيمة الفواتير</CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">فواتير مدفوعة</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.paidInvoices}</div>
                                    <CardDescription>فواتير مدفوعة</CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">فواتير معلقة</CardTitle>
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.pendingInvoices}</div>
                                    <CardDescription>فواتير معلقة</CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">فواتير مرتجعة</CardTitle>
                                    <RotateCcw className="h-4 w-4 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.returnedInvoices}</div>
                                    <CardDescription>فواتير مرتجعة</CardDescription>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">متوسط الفاتورة</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-purple-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        <CurrencyDisplay amount={stats.averageInvoice} />
                                    </div>
                                    <CardDescription>متوسط قيمة الفاتورة</CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </>
            )}

            {selectedInvoiceId ? (
                <InvoiceDetail
                    invoiceId={selectedInvoiceId}
                    onPrint={() => handlePrintInvoice(selectedInvoiceId)}
                    onReturn={() => handleReturnInvoice(selectedInvoiceId)}
                />
            ) : (
                <InvoiceList
                    onViewInvoice={handleViewInvoice}
                    onPrintInvoice={handlePrintInvoice}
                    onReturnInvoice={handleReturnInvoice}
                />
            )}

            <ReturnInvoiceDialog
                open={returnDialogOpen}
                onOpenChange={setReturnDialogOpen}
                invoiceId={returnInvoiceId || ""}
                invoiceNumber={returnInvoiceNumber}
                onSuccess={handleReturnSuccess}
            />

            <ExportInvoiceDialog
                open={exportDialogOpen}
                onOpenChange={setExportDialogOpen}
            />
        </div>
    );
}
