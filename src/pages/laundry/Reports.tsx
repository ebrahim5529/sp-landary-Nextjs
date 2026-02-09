import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FinancialReports } from "@/components/reports/FinancialReports";
import { OperationalReports } from "@/components/reports/OperationalReports";
import { CustomerReports } from "@/components/reports/CustomerReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">التقارير</h2>
        <Tabs defaultValue="financial" className="space-y-4">
          <TabsList>
            <TabsTrigger value="financial">التقارير المالية</TabsTrigger>
            <TabsTrigger value="operational">تقارير التشغيل</TabsTrigger>
            <TabsTrigger value="customers">تقارير العملاء</TabsTrigger>
          </TabsList>
          <TabsContent value="financial">
            <FinancialReports />
          </TabsContent>
          <TabsContent value="operational">
            <OperationalReports />
          </TabsContent>
          <TabsContent value="customers">
            <CustomerReports />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

