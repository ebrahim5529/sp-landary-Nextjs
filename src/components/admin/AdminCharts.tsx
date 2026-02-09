"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { LoadingState } from "@/components/ui/loading";

interface DailyStats {
  date: string;
  users: number;
  invoices: number;
  revenue: number;
}

export function AdminCharts() {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      // Backend removal cleanup - mock chart data
      const mockStats: DailyStats[] = [
        {
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 12,
          invoices: 8,
          revenue: 450,
        },
        {
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 15,
          invoices: 12,
          revenue: 680,
        },
        {
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 8,
          invoices: 15,
          revenue: 920,
        },
        {
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 22,
          invoices: 18,
          revenue: 1200,
        },
        {
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 18,
          invoices: 14,
          revenue: 850,
        },
        {
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 25,
          invoices: 20,
          revenue: 1350,
        },
        {
          date: new Date().toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          users: 20,
          invoices: 16,
          revenue: 1100,
        },
      ];

      setDailyStats(mockStats);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <LoadingState variant="spinner" size="sm" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const chartConfig = {
    users: {
      label: "المستخدمين الجدد",
      color: "hsl(var(--chart-1))",
    },
    invoices: {
      label: "الفواتير الجديدة",
      color: "hsl(var(--chart-2))",
    },
    revenue: {
      label: "الإيرادات",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">تقارير النمو - آخر 7 أيام</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>المستخدمين والفواتير</CardTitle>
            <CardDescription>مقارنة المستخدمين الجدد والفواتير الجديدة</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-users)" />
                <Bar dataKey="invoices" fill="var(--color-invoices)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الإيرادات اليومية</CardTitle>
            <CardDescription>اتجاه الإيرادات على مدار الأسبوع</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

