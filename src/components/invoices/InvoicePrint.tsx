import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { maskCustomerName } from "@/utils/name";
import { maskPhoneNumber } from "@/utils/phone";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { printAsPDF } from "@/utils/export";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  service: { name: string } | null;
  sub_item: { name: string } | null;
  department: { name: string } | null;
}

interface Invoice {
  invoice_number: string;
  order_number: string | null;
  created_at: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  tax_rate: number;
  pieces_count: number;
  customer: {
    name: string;
    phone: string | null;
    customer_code: string | null;
  } | null;
  employee: { name: string } | null;
}

interface LaundryInfo {
  name: string;
  tax_number: string | null;
  commercial_registration: string | null;
  address: string | null;
  logo_url: string | null;
  invoice_footer_message: string | null;
}

interface InvoicePrintProps {
  invoiceId: string;
  invoice: Invoice;
  items: InvoiceItem[];
  laundryInfo: LaundryInfo | null;
}

export function InvoicePrint({
  invoiceId,
  invoice,
  items,
  laundryInfo,
}: InvoicePrintProps) {
  const [printReady, setPrintReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPrintReady(true);
  }, []);

  const handlePrint = () => {
    printAsPDF("invoice-print");
  };

  const handleBackToInvoices = () => {
    navigate("/dashboard/invoices");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* زر العودة - خارج منطقة الطباعة */}
      <div className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={handleBackToInvoices}
            variant="outline"
            className="gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الفواتير
          </Button>
        </div>
      </div>

      <div id="invoice-print" className="p-8 bg-white max-w-4xl mx-auto" dir="rtl" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        {laundryInfo?.logo_url && (
          <div className="mb-4">
            <img
              src={laundryInfo.logo_url}
              alt="Logo"
              className="h-20 object-contain"
            />
          </div>
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold">{laundryInfo?.name || "المغسلة"}</h1>
          {laundryInfo?.tax_number && (
            <p className="text-sm">الرقم الضريبي: {laundryInfo.tax_number}</p>
          )}
          {laundryInfo?.commercial_registration && (
            <p className="text-sm">
              السجل التجاري: {laundryInfo.commercial_registration}
            </p>
          )}
          {laundryInfo?.address && (
            <p className="text-sm">{laundryInfo.address}</p>
          )}
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">فاتورة ضريبة مبسطة</h2>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50 w-1/3">رقم الطلب:</td>
              <td className="p-3">{invoice.order_number || "-"}</td>
              <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50 w-1/3">التاريخ والوقت:</td>
              <td className="p-3">{format(new Date(invoice.created_at), "yyyy-MM-dd HH:mm")}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50">رقم الفاتورة:</td>
              <td className="p-3">{invoice.invoice_number}</td>
              <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50">تاريخ الطباعة:</td>
              <td className="p-3">{format(new Date(), "yyyy-MM-dd HH:mm")}</td>
            </tr>
            {(invoice.employee || invoice.customer?.customer_code) && (
              <tr>
                <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50">الموظف:</td>
                <td className="p-3">{invoice.employee?.name || "-"}</td>
                <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50">رقم العميل:</td>
                <td className="p-3">{invoice.customer?.customer_code || "-"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Info */}
      {invoice.customer && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">معلومات العميل:</h3>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50 w-1/3">الاسم:</td>
                <td className="p-3">{maskCustomerName(invoice.customer.name)}</td>
              </tr>
              {invoice.customer.phone && (
                <tr>
                  <td className="p-3 border-l border-gray-300 font-semibold bg-gray-50">رقم الجوال:</td>
                  <td className="p-3">{maskPhoneNumber(invoice.customer.phone)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Items */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-gray-300" style={{ pageBreakInside: 'avoid' }}>
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-400">
              <th className="text-right p-3 font-bold border-l border-gray-300" style={{ backgroundColor: '#f3f4f6' }}>الوصف</th>
              <th className="text-center p-3 font-bold border-l border-gray-300 w-20" style={{ backgroundColor: '#f3f4f6' }}>الكمية</th>
              <th className="text-right p-3 font-bold border-l border-gray-300 w-32" style={{ backgroundColor: '#f3f4f6' }}>السعر</th>
              <th className="text-right p-3 font-bold w-32" style={{ backgroundColor: '#f3f4f6' }}>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200" style={{ pageBreakInside: 'avoid' }}>
                <td className="p-3 border-l border-gray-300">
                  <div className="font-medium">{item.sub_item?.name || item.description}</div>
                  {item.department && (
                    <div className="text-xs text-gray-600 mt-1">
                      القسم: {item.department.name}
                    </div>
                  )}
                  {item.service && (
                    <div className="text-xs text-gray-600 mt-1">الخدمة: {item.service.name}</div>
                  )}
                </td>
                <td className="text-center p-3 border-l border-gray-300 font-medium">
                  {item.quantity}
                </td>
                <td className="text-right p-3 border-l border-gray-300 font-medium">
                  <CurrencyDisplay amount={item.unit_price} />
                </td>
                <td className="text-right p-3 font-semibold">
                  <CurrencyDisplay amount={item.total} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-6">
        <div className="flex justify-end">
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm py-1 border-b border-gray-200">
              <span className="font-medium">عدد القطع:</span>
              <span className="font-semibold">{invoice.pieces_count}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="font-medium">الإجمالي بدون ضريبة:</span>
              <span className="font-semibold">
                <CurrencyDisplay amount={invoice.subtotal - invoice.discount} />
              </span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-green-600 py-1 border-b border-gray-200">
                <span className="font-medium">الخصم:</span>
                <span className="font-semibold">-<CurrencyDisplay amount={invoice.discount} /></span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="font-medium">الضريبة ({invoice.tax_rate}%):</span>
              <span className="font-semibold"><CurrencyDisplay amount={invoice.tax} /></span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t-2 border-gray-400 pt-3 mt-2">
              <span>الإجمالي:</span>
              <span className="text-xl"><CurrencyDisplay amount={invoice.total} /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {laundryInfo?.invoice_footer_message && (
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-600">
          {laundryInfo.invoice_footer_message}
        </div>
      )}

      {printReady && (
        <div className="mt-4 text-center">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            طباعة
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

