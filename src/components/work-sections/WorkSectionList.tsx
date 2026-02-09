import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoadingState, EmptyState } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, Check, Clock, Package, ChevronDown, ChevronUp, Eye, Receipt } from "lucide-react";
import { format } from "date-fns";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  service: { name: string } | null;
  sub_item: { name: string } | null;
  department: { name: string } | null;
}

interface Invoice {
  id: string;
  invoice_number: string;
  customer: {
    name: string;
    phone: string | null;
  } | null;
  total: number;
  pieces_count: number;
  created_at: string;
  workflow: {
    id: string;
    status: string;
    started_at: string | null;
    completed_at: string | null;
    employee_id: string | null;
    notes: string | null;
  } | null;
  items?: InvoiceItem[];
}

interface WorkSectionListProps {
  sectionId: string;
  sectionName: string;
  employeeId?: string | null;
  previousSectionName?: string | null;
}

export function WorkSectionList({
  sectionId,
  sectionName,
  employeeId: propEmployeeId,
  previousSectionName
}: WorkSectionListProps) {
  const { mockUser } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(propEmployeeId || null);
  const [expandedInvoices, setExpandedInvoices] = useState<Set<string>>(new Set());
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    if (mockUser && sectionId) {
      fetchEmployeeId();
      fetchInvoices();
    }
  }, [mockUser, sectionId]);

  const fetchEmployeeId = async () => {
    // Backend removal cleanup - mock employee ID
    setEmployeeId("mock-emp-1");
  };

  const fetchInvoices = async () => {
    setLoading(true);
    // Backend removal cleanup - mock invoices for work section
    const mockInvoices: Invoice[] = [
      {
        id: "inv-1",
        invoice_number: "INV-1001",
        customer: { name: "أحمد علي", phone: "0501234567" },
        total: 85.0,
        pieces_count: 5,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        workflow: {
          id: "wf-1",
          status: "in_progress",
          started_at: new Date(Date.now() - 1800000).toISOString(),
          completed_at: null,
          employee_id: "mock-emp-1",
          notes: "يرجى الحذر عند الكي",
        },
      },
      {
        id: "inv-2",
        invoice_number: "INV-1002",
        customer: { name: "سارة محمود", phone: "0559876543" },
        total: 120.0,
        pieces_count: 8,
        created_at: new Date(Date.now() - 7200000).toISOString(),
        workflow: null,
      },
      {
        id: "inv-3",
        invoice_number: "INV-1003",
        customer: { name: "محمد إبراهيم", phone: null },
        total: 45.0,
        pieces_count: 2,
        created_at: new Date(Date.now() - 10800000).toISOString(),
        workflow: {
          id: "wf-3",
          status: "completed",
          started_at: new Date(Date.now() - 7200000).toISOString(),
          completed_at: new Date(Date.now() - 3600000).toISOString(),
          employee_id: "mock-emp-1",
          notes: null,
        },
      },
    ];

    setInvoices(mockInvoices);
    setLoading(false);
  };

  const handleStartWork = async (invoiceId: string) => {
    setProcessing(invoiceId);
    // Backend removal cleanup - mock start work
    toast.success("تم بدء العمل بنجاح (نسخة تجريبية)");
    setProcessing(null);
    fetchInvoices();
  };

  const handleCompleteWork = async (invoiceId: string, workflowId: string) => {
    setProcessing(invoiceId);
    // Backend removal cleanup - mock complete work
    toast.success("تم إنهاء العمل بنجاح (نسخة تجريبية)");
    setProcessing(null);
    fetchInvoices();
  };

  const toggleInvoiceExpansion = async (invoiceId: string) => {
    const newExpanded = new Set(expandedInvoices);
    if (newExpanded.has(invoiceId)) {
      newExpanded.delete(invoiceId);
    } else {
      newExpanded.add(invoiceId);
      // جلب تفاصيل الفاتورة عند التوسيع
      await fetchInvoiceItems(invoiceId);
    }
    setExpandedInvoices(newExpanded);
  };

  const fetchInvoiceItems = async (invoiceId: string) => {
    // Backend removal cleanup - mock invoice items
    const mockItems: InvoiceItem[] = [
      {
        id: "item-1",
        description: "غسيل قميص",
        quantity: 3,
        unit_price: 15.0,
        total: 45.0,
        service: { name: "غسيل وكوي" },
        sub_item: { name: "قميص" },
        department: { name: "الرجالي" },
      },
      {
        id: "item-2",
        description: "غسيل بنطلون",
        quantity: 2,
        unit_price: 20.0,
        total: 40.0,
        service: { name: "غسيل جاف" },
        sub_item: { name: "بنطلون" },
        department: { name: "الرجالي" },
      },
    ];

    setInvoices(current =>
      current.map(inv =>
        inv.id === invoiceId ? { ...inv, items: mockItems } : inv
      )
    );
  };

  const handleOpenNotesDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setNotes(invoice.workflow?.notes || "");
    setNotesDialogOpen(true);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    // Backend removal cleanup - mock save notes
    toast.success("تم حفظ الملاحظات بنجاح (نسخة تجريبية)");
    setSavingNotes(false);
    setNotesDialogOpen(false);
    fetchInvoices();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <LoadingState variant="spinner" size="lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          {sectionName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <EmptyState
            icon={<Receipt className="h-12 w-12 text-muted-foreground" />}
            title="لا توجد فواتير"
            description="لا توجد فواتير في هذا القسم حالياً."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>عدد القطع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>تاريخ البدء</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const isExpanded = expandedInvoices.has(invoice.id);
                return (
                  <>
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleInvoiceExpansion(invoice.id)}
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {invoice.invoice_number}
                      </TableCell>
                      <TableCell>
                        {invoice.customer?.name || "-"}
                        {invoice.customer?.phone && (
                          <div className="text-xs text-muted-foreground">
                            {invoice.customer.phone}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{invoice.pieces_count}</TableCell>
                      <TableCell>
                        <CurrencyDisplay amount={invoice.total} />
                      </TableCell>
                      <TableCell>
                        {invoice.workflow?.started_at ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(
                              new Date(invoice.workflow.started_at),
                              "yyyy-MM-dd HH:mm"
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {invoice.workflow ? (
                          <Badge
                            variant={
                              invoice.workflow.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {invoice.workflow.status === "completed"
                              ? "منتهي"
                              : "قيد العمل"}
                          </Badge>
                        ) : (
                          <Badge variant="outline">لم يبدأ</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {!invoice.workflow ||
                            invoice.workflow.status !== "in_progress" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartWork(invoice.id)}
                              disabled={processing === invoice.id || !employeeId}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              بدء العمل
                            </Button>
                          ) : null}
                          {invoice.workflow?.status === "in_progress" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenNotesDialog(invoice)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                ملاحظات
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleCompleteWork(invoice.id, invoice.workflow!.id)
                                }
                                disabled={processing === invoice.id}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                إنهاء العمل
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {isExpanded && invoice.items && (
                      <TableRow>
                        <TableCell colSpan={8} className="bg-muted/50">
                          <div className="p-4 space-y-3">
                            <h4 className="font-semibold mb-3">تفاصيل الفاتورة</h4>
                            <div className="space-y-2">
                              {invoice.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between p-2 bg-background rounded border"
                                >
                                  <div className="flex-1">
                                    <div className="font-medium">{item.description}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {item.sub_item?.name && (
                                        <span>القطعة: {item.sub_item.name}</span>
                                      )}
                                      {item.service?.name && (
                                        <span className="mr-2">
                                          {item.sub_item?.name ? " - " : ""}
                                          الخدمة: {item.service.name}
                                        </span>
                                      )}
                                      {item.department?.name && (
                                        <span className="mr-2">
                                          - القسم: {item.department.name}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-left ml-4">
                                    <div className="text-sm text-muted-foreground">
                                      الكمية: {item.quantity}
                                    </div>
                                    <div className="font-medium">
                                      <CurrencyDisplay amount={item.total} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {invoice.workflow?.notes && (
                              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
                                <div className="text-sm font-medium mb-1">ملاحظات:</div>
                                <div className="text-sm text-muted-foreground">
                                  {invoice.workflow.notes}
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ملاحظات الفاتورة</DialogTitle>
            <DialogDescription>
              أضف ملاحظات حول العمل على الفاتورة {selectedInvoice?.invoice_number}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">الملاحظات</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أدخل ملاحظات حول العمل..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNotesDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleSaveNotes} disabled={savingNotes}>
              {savingNotes ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

