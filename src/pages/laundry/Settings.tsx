import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LaundryInfoForm } from "@/components/settings/LaundryInfoForm";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">الإعدادات</h2>
        <Tabs defaultValue="laundry" className="space-y-4">
          <TabsList>
            <TabsTrigger value="laundry">معلومات المغسلة</TabsTrigger>
            <TabsTrigger value="theme">إعدادات الثيم</TabsTrigger>
          </TabsList>
          <TabsContent value="laundry">
            <LaundryInfoForm />
          </TabsContent>
          <TabsContent value="theme">
            <ThemeSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

