import { useState } from "react";
import { ResponsiveTable, ResponsiveTableColumn } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Eye, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RegistrationRequest {
  id: string;
  user_id: string;
  manager_name: string;
  manager_phone: string;
  commercial_name: string;
  commercial_registration_number: string;
  unified_number: string;
  city: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  user_email?: string;
  admin_message?: string;
}

interface RegistrationRequestListProps {
  requests: RegistrationRequest[];
  loading: boolean;
  onRefresh: () => void;
}

export function RegistrationRequestList({
  requests,
  loading,
  onRefresh,
}: RegistrationRequestListProps) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Dialogs للموافقة والرفض وطلب معلومات
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [requestInfoDialogOpen, setRequestInfoDialogOpen] = useState(false);
  const [requestInfoMessage, setRequestInfoMessage] = useState("");
  const [actionRequest, setActionRequest] = useState<RegistrationRequest | null>(null);

  const handleApproveClick = (request: RegistrationRequest) => {
    setActionRequest(request);
    setApproveDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!actionRequest) return;

    setProcessingId(actionRequest.id);
    setApproveDialogOpen(false);

    try {
      // Backend removal cleanup
      toast.success("تم الموافقة على الطلب بنجاح (بيئة عرض)");
      onRefresh();
    } catch (error: any) {
      console.error("Error approving request:", error);
      toast.error("حدث خطأ في الموافقة على الطلب");
    } finally {
      setProcessingId(null);
      setActionRequest(null);
    }
  };

  const handleRejectClick = (request: RegistrationRequest) => {
    setActionRequest(request);
    setRequestInfoMessage("");
    setRejectDialogOpen(true);
  };

  const handleReject = async () => {
    if (!actionRequest) return;

    setProcessingId(actionRequest.id);
    setRejectDialogOpen(false);

    try {
      // Backend removal cleanup
      toast.success("تم رفض الطلب (بيئة عرض)");
      onRefresh();
    } catch (error: any) {
      console.error("Error rejecting request:", error);
      toast.error("حدث خطأ في رفض الطلب");
    } finally {
      setProcessingId(null);
      setActionRequest(null);
      setRequestInfoMessage("");
    }
  };

  const handleRequestInfoClick = (request: RegistrationRequest) => {
    setActionRequest(request);
    setRequestInfoMessage("");
    setRequestInfoDialogOpen(true);
  };

  const handleRequestInfo = async () => {
    if (!actionRequest || !requestInfoMessage.trim()) {
      toast.error("يرجى إدخال الرسالة");
      return;
    }

    setProcessingId(actionRequest.id);
    setRequestInfoDialogOpen(false);

    try {
      // Backend removal cleanup
      toast.success("تم إرسال الرسالة بنجاح (بيئة عرض)");
      onRefresh();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("حدث خطأ في إرسال الرسالة");
    } finally {
      setProcessingId(null);
      setActionRequest(null);
      setRequestInfoMessage("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-green-600">موافق عليه</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      case "pending":
      default:
        return <Badge variant="secondary">قيد الانتظار</Badge>;
    }
  };

  const columns: ResponsiveTableColumn<RegistrationRequest>[] = [
    {
      key: "manager_name",
      header: "اسم المسؤول",
      mobileLabel: "اسم المسؤول",
      accessor: (request) => <span className="font-medium">{request.manager_name}</span>,
    },
    {
      key: "manager_phone",
      header: "رقم الجوال",
      mobileLabel: "رقم الجوال",
      accessor: (request) => request.manager_phone,
      hideOnTablet: true,
    },
    {
      key: "commercial_name",
      header: "الاسم التجاري",
      mobileLabel: "الاسم التجاري",
      accessor: (request) => request.commercial_name,
    },
    {
      key: "city",
      header: "المدينة",
      mobileLabel: "المدينة",
      accessor: (request) => request.city,
      hideOnTablet: true,
    },
    {
      key: "status",
      header: "الحالة",
      mobileLabel: "الحالة",
      accessor: (request) => getStatusBadge(request.status),
    },
    {
      key: "created_at",
      header: "تاريخ الطلب",
      mobileLabel: "تاريخ الطلب",
      accessor: (request) =>
        new Date(request.created_at).toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      hideOnTablet: true,
    },
    {
      key: "actions",
      header: "الإجراءات",
      mobileLabel: "الإجراءات",
      accessor: (request) => (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedRequest(request);
              setViewDialogOpen(true);
            }}
            className="h-8 w-8 p-0"
            title="عرض التفاصيل"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {request.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRequestInfoClick(request)}
                disabled={processingId === request.id}
                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                title="طلب معلومات إضافية"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleApproveClick(request)}
                disabled={processingId === request.id}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                title="موافقة"
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRejectClick(request)}
                disabled={processingId === request.id}
                className="h-8 w-8 p-0 text-destructive"
                title="رفض"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingState variant="table" rows={5} cols={6} />;
  }

  return (
    <>
      <ResponsiveTable
        columns={columns}
        data={requests}
        keyExtractor={(request) => request.id}
        emptyMessage="لا توجد طلبات تسجيل"
      />

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب التسجيل</DialogTitle>
            <DialogDescription>عرض جميع معلومات طلب التسجيل</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">اسم المسؤول</label>
                  <p className="text-base font-medium">{selectedRequest.manager_name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">رقم الجوال</label>
                  <p className="text-base">{selectedRequest.manager_phone}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">الاسم التجاري</label>
                  <p className="text-base">{selectedRequest.commercial_name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">رقم السجل التجاري</label>
                  <p className="text-base">{selectedRequest.commercial_registration_number}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">الرقم الموحد</label>
                  <p className="text-base">{selectedRequest.unified_number}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">المدينة</label>
                  <p className="text-base">{selectedRequest.city}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">الحالة</label>
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">تاريخ الطلب</label>
                  <p className="text-base">
                    {new Date(selectedRequest.created_at).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog للموافقة */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الموافقة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من الموافقة على طلب التسجيل لـ{" "}
              <strong>{actionRequest?.commercial_name}</strong>؟
              <br />
              <br />
              سيتم تفعيل الحساب وإتاحة جميع الميزات للمستخدم.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              موافقة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog للرفض */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>رفض الطلب</DialogTitle>
            <DialogDescription>
              سيتم رفض طلب التسجيل لـ <strong>{actionRequest?.commercial_name}</strong>.
              يمكنك إضافة رسالة توضيحية (اختياري).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reject-message">رسالة الرفض (اختياري)</Label>
              <Textarea
                id="reject-message"
                placeholder="عذراً، تم رفض طلب التسجيل بسبب..."
                value={requestInfoMessage}
                onChange={(e) => setRequestInfoMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setRequestInfoMessage("");
              }}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
            >
              رفض الطلب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog لطلب معلومات إضافية */}
      <Dialog open={requestInfoDialogOpen} onOpenChange={setRequestInfoDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>طلب معلومات إضافية</DialogTitle>
            <DialogDescription>
              أرسل رسالة إلى <strong>{actionRequest?.commercial_name}</strong> لطلب معلومات إضافية للتأكد من صحة البيانات.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="info-message">الرسالة</Label>
              <Textarea
                id="info-message"
                placeholder="نحتاج إلى معلومات إضافية للتأكد من صحة البيانات..."
                value={requestInfoMessage}
                onChange={(e) => setRequestInfoMessage(e.target.value)}
                rows={5}
                required
              />
              <p className="text-sm text-muted-foreground">
                اذكر المعلومات المطلوبة بشكل واضح ومحدد.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRequestInfoDialogOpen(false);
                setRequestInfoMessage("");
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleRequestInfo}
              disabled={!requestInfoMessage.trim()}
            >
              إرسال الرسالة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

