"use client";

import { Payments } from "@/components/financial/Payments";
import { Revenues } from "@/components/financial/Revenues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";

export default function FinancialPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const defaultTab = searchParams.get("tab") || "payments";

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", value);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">الحسابات المالية</h2>
            <Tabs
                defaultValue={defaultTab}
                className="space-y-4"
                onValueChange={handleTabChange}
            >
                <TabsList>
                    <TabsTrigger value="payments">المدفوعات (المصروفات)</TabsTrigger>
                    <TabsTrigger value="revenues">الإيرادات</TabsTrigger>
                </TabsList>
                <TabsContent value="payments">
                    <Payments />
                </TabsContent>
                <TabsContent value="revenues">
                    <Revenues />
                </TabsContent>
            </Tabs>
        </div>
    );
}
