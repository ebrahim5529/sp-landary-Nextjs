import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { maskCustomerName } from "@/utils/name";
import { LoadingState } from "@/components/ui/loading";

export function CustomerReports() {
    const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData removed
  }, []);

  const fetchCustomerData = async () => {
    setLoading(true);
    // Backend removal cleanup - mock customer data
    const mockTopCustomers = [
      {
        customerId: "cust-1",
        name: "أحمد علي",
        total: 1250.50,
        invoiceCount: 12,
      },
      {
        customerId: "cust-2",
        name: "سارة محمود",
        total: 850.00,
        invoiceCount: 8,
      },
      {
        customerId: "cust-3",
        name: "محمد إبراهيم",
        total: 720.00,
        invoiceCount: 6,
      },
      {
        customerId: "cust-4",
        name: "ليلى حسن",
        total: 600.00,
        invoiceCount: 5,
      },
      {
        customerId: "cust-5",
        name: "ياسر قحطاني",
        total: 550.00,
        invoiceCount: 4,
      },
      {
        customerId: "cust-6",
        name: "فهد خالد",
        total: 480.00,
        invoiceCount: 4,
      },
      {
        customerId: "cust-7",
        name: "نورة فيصل",
        total: 420.00,
        invoiceCount: 3,
      },
      {
        customerId: "cust-8",
        name: "خالد سعيد",
        total: 350.00,
        invoiceCount: 3,
      },
      {
        customerId: "cust-9",
        name: "مها العتيبي",
        total: 300.00,
        invoiceCount: 2,
      },
      {
        customerId: "cust-10",
        name: "عبدالله العلي",
        total: 280.00,
        invoiceCount: 2,
      },
    ];

    setTopCustomers(mockTopCustomers);
    setLoading(false);
  };

  if (loading) {
    return <LoadingState variant="spinner" size="lg" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>أفضل 10 عملاء</CardTitle>
        </CardHeader>
        <CardContent>
          {topCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">لا توجد بيانات</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العميل</TableHead>
                  <TableHead>عدد الفواتير</TableHead>
                  <TableHead>إجمالي المبيعات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.customerId}>
                    <TableCell>{maskCustomerName(customer.name)}</TableCell>
                    <TableCell>{customer.invoiceCount}</TableCell>
                    <TableCell>
                      <CurrencyDisplay amount={customer.total} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

