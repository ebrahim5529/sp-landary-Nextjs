"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { LoadingState } from "@/components/ui/loading";

interface DailyStats {
  date: string;
  invoices: number;
  paid: number;
  piecesReceived: number;
  piecesDelivered: number;
}

export function OperationalCharts() {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      // استخدام البيانات التجريبية من API
      const { getOperationalChartsData } = await import("@/api/mockData");
      const chartData = getOperationalChartsData();
      setDailyStats(chartData);
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
    invoices: {
      label: "الفواتير الجديدة",
      color: "hsl(var(--chart-1))",
    },
    paid: {
      label: "الفواتير المسلمة",
      color: "hsl(var(--chart-2))",
    },
    piecesReceived: {
      label: "القطع المستلمة",
      color: "hsl(var(--chart-3))",
    },
    piecesDelivered: {
      label: "القطع المسلمة",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">تقارير العمليات - آخر 7 أيام</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>الفواتير اليومية</CardTitle>
            <CardDescription>مقارنة الفواتير الجديدة والمسلمة</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="invoices" fill="var(--color-invoices)" />
                <Bar dataKey="paid" fill="var(--color-paid)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>القطع اليومية</CardTitle>
            <CardDescription>مقارنة القطع المستلمة والمسلمة</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="piecesReceived" stroke="var(--color-piecesReceived)" strokeWidth={2} />
                <Line type="monotone" dataKey="piecesDelivered" stroke="var(--color-piecesDelivered)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
