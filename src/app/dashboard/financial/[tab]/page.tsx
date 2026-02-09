"use client";

import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation";
import { Payments } from "@/components/financial/Payments";
import { Revenues } from "@/components/financial/Revenues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FinancialAccountsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const tab = params?.tab as string || "payments";

    const handleTabChange = (value: string) => {
        router.push(`/dashboard/financial/${value}`);
    };

    return (
        <div className="space-y-6" dir="rtl">
            <h2 className="text-3xl font-bold">الحسابات المالية</h2>
            <Tabs
                value={tab}
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
