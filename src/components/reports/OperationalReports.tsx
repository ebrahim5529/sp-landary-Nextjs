import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/ui/loading";

export function OperationalReports() {
    const [stats, setStats] = useState({
    totalInvoices: 0,
    totalCustomers: 0,
    totalEmployees: 0,
    departmentStats: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData removed
  }, []);

  const fetchOperationalData = async () => {
    setLoading(true);
    // Backend removal cleanup - mock operational data
    const mockStats = {
      totalInvoices: 1450,
      totalCustomers: 450,
      totalEmployees: 12,
      departmentStats: [
        { name: "الرجالي", invoiceCount: 850 },
        { name: "النسائي", invoiceCount: 420 },
        { name: "السجاد والستائر", invoiceCount: 180 },
      ],
    };

    setStats(mockStats);
    setLoading(false);
  };

  if (loading) {
    return <LoadingState variant="spinner" size="lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الفواتير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvoices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>إجمالي العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>الموظفين النشطين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إحصائيات الأقسام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{dept.name}</span>
                <Badge variant="outline">{dept.invoiceCount} فاتورة</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

