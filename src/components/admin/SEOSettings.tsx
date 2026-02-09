"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Search, Globe, Share2, BarChart3 } from "lucide-react";

export function SEOSettings() {
  const [loading, setLoading] = useState(false);
  const [seoSettings, setSeoSettings] = useState({
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_author: "",
    seo_lang: "ar",
  });

  const [ogSettings, setOgSettings] = useState({
    og_title: "",
    og_description: "",
    og_image: "",
    og_type: "website",
    og_url: "",
  });

  const [twitterSettings, setTwitterSettings] = useState({
    twitter_card: "summary_large_image",
    twitter_site: "",
    twitter_image: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    site_name: "",
    site_logo: "",
    site_favicon: "",
    site_address: "",
    site_email: "",
    site_phone: "",
  });

  const [socialSettings, setSocialSettings] = useState({
    social_facebook: "",
    social_twitter: "",
    social_instagram: "",
    social_linkedin: "",
    social_youtube: "",
  });

  const [analyticsSettings, setAnalyticsSettings] = useState({
    analytics_google: "",
    analytics_gtm: "",
    analytics_facebook_pixel: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Backend removal cleanup
      setSeoSettings({
        seo_title: "نظام إدارة المغاسل المتطور",
        seo_description: "أفضل نظام لإدارة المغاسل في المملكة العربية السعودية",
        seo_keywords: "مغسلة, إدارة, نظام",
        seo_author: "Antigravity",
        seo_lang: "ar",
      });

      setOgSettings({
        og_title: "نظام إدارة المغاسل",
        og_description: "إدارة مغسلتك بكل سهولة",
        og_image: "",
        og_type: "website",
        og_url: "https://example.com",
      });

      setSiteSettings({
        site_name: "مغسلتي",
        site_logo: "",
        site_favicon: "",
        site_address: "الرياض",
        site_email: "info@example.com",
        site_phone: "0500000000",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const saveSettings = async (settings: Record<string, string>, type: string) => {
    setLoading(true);
    try {
      // Backend removal cleanup
      toast.success("تم حفظ الإعدادات بنجاح (بيئة عرض)");
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast.error("حدث خطأ في حفظ الإعدادات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="seo" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="seo">
          <Search className="h-4 w-4 ml-2" />
          SEO
        </TabsTrigger>
        <TabsTrigger value="og">
          <Share2 className="h-4 w-4 ml-2" />
          Open Graph
        </TabsTrigger>
        <TabsTrigger value="site">
          <Globe className="h-4 w-4 ml-2" />
          الموقع
        </TabsTrigger>
        <TabsTrigger value="social">
          <Share2 className="h-4 w-4 ml-2" />
          وسائل التواصل
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <BarChart3 className="h-4 w-4 ml-2" />
          التحليلات
        </TabsTrigger>
      </TabsList>

      <TabsContent value="seo">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات SEO الأساسية</CardTitle>
            <CardDescription>إعدادات محركات البحث</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo_title">عنوان الموقع</Label>
              <Input
                id="seo_title"
                value={seoSettings.seo_title}
                onChange={(e) =>
                  setSeoSettings({ ...seoSettings, seo_title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo_description">وصف الموقع</Label>
              <Textarea
                id="seo_description"
                value={seoSettings.seo_description}
                onChange={(e) =>
                  setSeoSettings({ ...seoSettings, seo_description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo_keywords">الكلمات المفتاحية</Label>
              <Input
                id="seo_keywords"
                value={seoSettings.seo_keywords}
                onChange={(e) =>
                  setSeoSettings({ ...seoSettings, seo_keywords: e.target.value })
                }
                placeholder="مفصولة بفواصل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo_author">المؤلف</Label>
              <Input
                id="seo_author"
                value={seoSettings.seo_author}
                onChange={(e) =>
                  setSeoSettings({ ...seoSettings, seo_author: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo_lang">اللغة</Label>
              <Input
                id="seo_lang"
                value={seoSettings.seo_lang}
                onChange={(e) =>
                  setSeoSettings({ ...seoSettings, seo_lang: e.target.value })
                }
              />
            </div>
            <Button
              onClick={() => saveSettings(seoSettings, "seo")}
              disabled={loading}
            >
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="og">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات Open Graph</CardTitle>
            <CardDescription>إعدادات مشاركة الموقع على وسائل التواصل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="og_title">العنوان</Label>
              <Input
                id="og_title"
                value={ogSettings.og_title}
                onChange={(e) =>
                  setOgSettings({ ...ogSettings, og_title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og_description">الوصف</Label>
              <Textarea
                id="og_description"
                value={ogSettings.og_description}
                onChange={(e) =>
                  setOgSettings({ ...ogSettings, og_description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og_image">رابط الصورة</Label>
              <Input
                id="og_image"
                value={ogSettings.og_image}
                onChange={(e) =>
                  setOgSettings({ ...ogSettings, og_image: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og_type">النوع</Label>
              <Input
                id="og_type"
                value={ogSettings.og_type}
                onChange={(e) =>
                  setOgSettings({ ...ogSettings, og_type: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og_url">الرابط</Label>
              <Input
                id="og_url"
                value={ogSettings.og_url}
                onChange={(e) =>
                  setOgSettings({ ...ogSettings, og_url: e.target.value })
                }
              />
            </div>
            <Button
              onClick={() => saveSettings(ogSettings, "seo")}
              disabled={loading}
            >
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="site">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الموقع العامة</CardTitle>
            <CardDescription>معلومات الموقع الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">اسم الموقع</Label>
              <Input
                id="site_name"
                value={siteSettings.site_name}
                onChange={(e) =>
                  setSiteSettings({ ...siteSettings, site_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_logo">رابط الشعار</Label>
              <Input
                id="site_logo"
                value={siteSettings.site_logo}
                onChange={(e) =>
                  setSiteSettings({ ...siteSettings, site_logo: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_favicon">رابط الأيقونة</Label>
              <Input
                id="site_favicon"
                value={siteSettings.site_favicon}
                onChange={(e) =>
                  setSiteSettings({ ...siteSettings, site_favicon: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_address">العنوان</Label>
              <Textarea
                id="site_address"
                value={siteSettings.site_address}
                onChange={(e) =>
                  setSiteSettings({ ...siteSettings, site_address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_email">البريد الإلكتروني</Label>
              <Input
                id="site_email"
                type="email"
                value={siteSettings.site_email}
                onChange={(e) =>
                  setSiteSettings({ ...siteSettings, site_email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_phone">رقم الهاتف</Label>
              <Input
                id="site_phone"
                value={siteSettings.site_phone}
                onChange={(e) =>
                  setSiteSettings({ ...siteSettings, site_phone: e.target.value })
                }
              />
            </div>
            <Button
              onClick={() => saveSettings(siteSettings, "site")}
              disabled={loading}
            >
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
            <CardDescription>روابط حسابات وسائل التواصل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="social_facebook">Facebook</Label>
              <Input
                id="social_facebook"
                value={socialSettings.social_facebook}
                onChange={(e) =>
                  setSocialSettings({ ...socialSettings, social_facebook: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_twitter">Twitter</Label>
              <Input
                id="social_twitter"
                value={socialSettings.social_twitter}
                onChange={(e) =>
                  setSocialSettings({ ...socialSettings, social_twitter: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_instagram">Instagram</Label>
              <Input
                id="social_instagram"
                value={socialSettings.social_instagram}
                onChange={(e) =>
                  setSocialSettings({ ...socialSettings, social_instagram: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_linkedin">LinkedIn</Label>
              <Input
                id="social_linkedin"
                value={socialSettings.social_linkedin}
                onChange={(e) =>
                  setSocialSettings({ ...socialSettings, social_linkedin: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_youtube">YouTube</Label>
              <Input
                id="social_youtube"
                value={socialSettings.social_youtube}
                onChange={(e) =>
                  setSocialSettings({ ...socialSettings, social_youtube: e.target.value })
                }
              />
            </div>
            <Button
              onClick={() => saveSettings(socialSettings, "social")}
              disabled={loading}
            >
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات التحليلات</CardTitle>
            <CardDescription>رموز التحليلات والتتبع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="analytics_google">Google Analytics ID</Label>
              <Input
                id="analytics_google"
                value={analyticsSettings.analytics_google}
                onChange={(e) =>
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    analytics_google: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="analytics_gtm">Google Tag Manager ID</Label>
              <Input
                id="analytics_gtm"
                value={analyticsSettings.analytics_gtm}
                onChange={(e) =>
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    analytics_gtm: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="analytics_facebook_pixel">Facebook Pixel ID</Label>
              <Input
                id="analytics_facebook_pixel"
                value={analyticsSettings.analytics_facebook_pixel}
                onChange={(e) =>
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    analytics_facebook_pixel: e.target.value,
                  })
                }
              />
            </div>
            <Button
              onClick={() => saveSettings(analyticsSettings, "analytics")}
              disabled={loading}
            >
              <Save className="h-4 w-4 ml-2" />
              حفظ
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

