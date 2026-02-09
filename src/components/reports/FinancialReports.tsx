import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LoadingState } from "@/components/ui/loading";

export function FinancialReports() {
    const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    profit: 0,
    monthlyData: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    setLoading(true);
    // Backend removal cleanup - mock financial data
    const mockMonthlyData = [
      { month: "2023-09", revenue: 8500, expenses: 4200, profit: 4300 },
      { month: "2023-10", revenue: 9200, expenses: 4500, profit: 4700 },
      { month: "2023-11", revenue: 10500, expenses: 4800, profit: 5700 },
      { month: "2023-12", revenue: 12000, expenses: 5200, profit: 6800 },
      { month: "2024-01", revenue: 11000, expenses: 5000, profit: 6000 },
      { month: "2024-02", revenue: 13500, expenses: 5500, profit: 8000 },
    ];

    const totalRevenue = mockMonthlyData.reduce((sum, data) => sum + data.revenue, 0);
    const totalExpenses = mockMonthlyData.reduce((sum, data) => sum + data.expenses, 0);

    setStats({
      totalRevenue,
      totalExpenses,
      profit: totalRevenue - totalExpenses,
      monthlyData: mockMonthlyData,
    });
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
            <CardTitle>إجمالي الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <CurrencyDisplay amount={stats.totalRevenue} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>إجمالي المصروفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              <CurrencyDisplay amount={stats.totalExpenses} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>صافي الربح</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${stats.profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              <CurrencyDisplay amount={stats.profit} />
            </div>
          </CardContent>
        </Card>
      </div>

      {stats.monthlyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>الإيرادات والمصروفات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#22c55e" name="الإيرادات" />
                <Bar dataKey="expenses" fill="#ef4444" name="المصروفات" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

