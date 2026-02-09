"use client";

import { TodayStats } from "@/components/dashboard/TodayStats";
import { DepartmentCards } from "@/components/dashboard/DepartmentCards";
import { OperationalCharts } from "@/components/dashboard/OperationalCharts";
import { TimeTracker } from "@/components/dashboard/TimeTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">لوحة التحكم</h2>
                <Button
                    size="lg"
                    className="flex items-center gap-2"
                    onClick={() => router.push("/dashboard/cashier")}
                >
                    <Receipt className="h-5 w-5" />
                    الكاشير
                </Button>
            </div>

            {/* إحصائيات اليوم */}
            <TodayStats />

            {/* رسومات بيانية لتقارير العمليات */}
            <OperationalCharts />

            {/* عرض الأقسام */}
            <DepartmentCards />

            {/* عداد متوسط الوقت */}
            <div className="grid gap-4 md:grid-cols-2">
                <TimeTracker />
                <Card>
                    <CardHeader>
                        <CardTitle>أيقونة الكاشير</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Button
                            size="lg"
                            className="flex items-center gap-3 text-lg px-8 py-6"
                            onClick={() => router.push("/dashboard/cashier")}
                        >
                            <Receipt className="h-8 w-8" />
                            البدء بالعمل وإدخال الفواتير
                        </Button>
                        <p className="text-sm text-muted-foreground mt-4">
                            اضغط للانتقال إلى شاشة الكاشير
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
