import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Payments } from "@/components/financial/Payments";
import { Revenues } from "@/components/financial/Revenues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function FinancialAccounts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "payments";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">الحسابات المالية</h2>
        <Tabs
          defaultValue={defaultTab}
          className="space-y-4"
          onValueChange={(value) => setSearchParams({ tab: value })}
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
    </DashboardLayout>
  );
}

