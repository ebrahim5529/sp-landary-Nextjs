"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Mail, Shield, CreditCard } from "lucide-react";

export function SystemSettings() {
  const [loading, setLoading] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    system_name: "",
    system_email: "",
    system_phone: "",
    system_address: "",
  });

  const [subscriptionSettings, setSubscriptionSettings] = useState({
    trial_days: "14",
    basic_price: "",
    premium_price: "",
  });

  const handleSaveGeneral = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup
      toast.success("تم حفظ الإعدادات العامة بنجاح (بيئة عرض)");
    } catch (error: any) {
      console.error("Error saving general settings:", error);
      toast.error("حدث خطأ في حفظ الإعدادات");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSubscription = async () => {
    setLoading(true);
    try {
      // Backend removal cleanup
      toast.success("تم حفظ إعدادات الاشتراكات بنجاح (بيئة عرض)");
    } catch (error: any) {
      console.error("Error saving subscription settings:", error);
      toast.error("حدث خطأ في حفظ الإعدادات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Backend removal cleanup
      setGeneralSettings({
        system_name: "نظام إدارة المغاسل",
        system_email: "support@example.com",
        system_phone: "0500000000",
        system_address: "الرياض، المملكة العربية السعودية",
      });

      setSubscriptionSettings({
        trial_days: "14",
        basic_price: "99",
        premium_price: "199",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">
          <Mail className="h-4 w-4 ml-2" />
          إعدادات عامة
        </TabsTrigger>
        <TabsTrigger value="subscription">
          <CreditCard className="h-4 w-4 ml-2" />
          إعدادات الاشتراكات
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات العامة</CardTitle>
            <CardDescription>إعدادات النظام الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system_name">اسم النظام</Label>
              <Input
                id="system_name"
                value={generalSettings.system_name}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, system_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="system_email">البريد الإلكتروني</Label>
              <Input
                id="system_email"
                type="email"
                value={generalSettings.system_email}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, system_email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="system_phone">رقم الهاتف</Label>
              <Input
                id="system_phone"
                value={generalSettings.system_phone}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, system_phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="system_address">العنوان</Label>
              <Textarea
                id="system_address"
                value={generalSettings.system_address}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, system_address: e.target.value })
                }
              />
            </div>
            <Button onClick={handleSaveGeneral} disabled={loading}>
              <Save className="h-4 w-4 ml-2" />
              حفظ الإعدادات
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الاشتراكات</CardTitle>
            <CardDescription>إعدادات خطط الاشتراك والأسعار</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trial_days">أيام التجربة المجانية</Label>
              <Input
                id="trial_days"
                type="number"
                value={subscriptionSettings.trial_days}
                onChange={(e) =>
                  setSubscriptionSettings({
                    ...subscriptionSettings,
                    trial_days: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="basic_price">سعر الباقة الأساسية (ر.س)</Label>
              <Input
                id="basic_price"
                type="number"
                value={subscriptionSettings.basic_price}
                onChange={(e) =>
                  setSubscriptionSettings({
                    ...subscriptionSettings,
                    basic_price: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="premium_price">سعر الباقة المميزة (ر.س)</Label>
              <Input
                id="premium_price"
                type="number"
                value={subscriptionSettings.premium_price}
                onChange={(e) =>
                  setSubscriptionSettings({
                    ...subscriptionSettings,
                    premium_price: e.target.value,
                  })
                }
              />
            </div>
            <Button onClick={handleSaveSubscription} disabled={loading}>
              <Save className="h-4 w-4 ml-2" />
              حفظ الإعدادات
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

