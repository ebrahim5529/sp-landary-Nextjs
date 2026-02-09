"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { useAuth } from "@/contexts/AuthContext";

const PLANS = {
  professional: {
    priceId: 'price_1SV51fBMKHJ2qek1v6FKkFVn',
    productId: 'prod_TRyzajtYoSG8Ni',
    name: 'الباقة الاحترافية',
  },
  enterprise: {
    priceId: 'price_1SV523BMKHJ2qek1IXVE4ivj',
    productId: 'prod_TRz0RHcfRacoyk',
    name: 'الباقة المؤسسية',
  },
};

export const Pricing = () => {
  const { mockUser, subscription: mockSubscription } = useAuth();
  const router = useRouter();

  const packages = [
    {
      name: "الباقة التجريبية",
      planKey: null,
      monthlyPrice: "مجاني",
      yearlyPrice: "مجاني",
      features: [
        { text: "فرع واحد فقط", included: true },
        { text: "حتى 50 طلب شهرياً", included: true },
        { text: "3 مستخدمين", included: true },
        { text: "التقارير الأساسية", included: true },
        { text: "دعم فني محدود", included: true },
        { text: "إدارة العملاء المتقدمة", included: false },
        { text: "تكامل مع وسائل الدفع", included: false },
        { text: "تطبيق الموبايل", included: false },
      ],
    },
    {
      name: "الباقة الاحترافية",
      planKey: 'professional' as const,
      monthlyPrice: "299",
      yearlyPrice: "2990",
      recommended: true,
      features: [
        { text: "حتى 3 فروع", included: true },
        { text: "طلبات غير محدودة", included: true },
        { text: "10 مستخدمين", included: true },
        { text: "جميع التقارير والتحليلات", included: true },
        { text: "دعم فني على مدار الساعة", included: true },
        { text: "إدارة العملاء المتقدمة", included: true },
        { text: "تكامل مع وسائل الدفع", included: true },
        { text: "تطبيق الموبايل", included: false },
      ],
    },
    {
      name: "الباقة المؤسسية",
      planKey: 'enterprise' as const,
      monthlyPrice: "799",
      yearlyPrice: "7990",
      features: [
        { text: "فروع غير محدودة", included: true },
        { text: "طلبات غير محدودة", included: true },
        { text: "مستخدمين غير محدودين", included: true },
        { text: "جميع التقارير والتحليلات", included: true },
        { text: "دعم فني مخصص وأولوية", included: true },
        { text: "إدارة العملاء المتقدمة", included: true },
        { text: "تكامل مع وسائل الدفع", included: true },
        { text: "تطبيق الموبايل", included: true },
      ],
    },
  ];

  const handleSubscribe = async (planKey: 'professional' | 'enterprise' | null) => {
    if (!mockUser) {
      router.push('/auth');
      return;
    }

    if (!planKey) {
      toast.info("الباقة التجريبية: يمكنك البدء باستخدام الباقة التجريبية مجاناً لمدة 30 يوماً");
      return;
    }

    try {
      // Backend removal cleanup - mock checkout creation
      toast.success(`تم إنشاء رابط الدفع: سيتم توجيهك إلى صفحة الدفع لباقة ${PLANS[planKey].name} (بيئة عرض)`);

      // Simulate opening checkout URL
      setTimeout(() => {
        window.open('#', '_blank');
      }, 1000);
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error("حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.");
    }
  };

  const isCurrentPlan = (planKey: 'professional' | 'enterprise' | null) => {
    if (!planKey && mockSubscription?.status === 'trial') return true;
    if (!planKey) return false;
    return mockSubscription?.product_id === PLANS[planKey].productId;
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
            الأسعار
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">اختر الباقة المناسبة لك</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            باقات مرنة تناسب جميع أحجام المغاسل من المشاريع الصغيرة إلى المؤسسات الكبرى
          </p>
        </div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="mb-12 bg-card">
            <TabsTrigger value="monthly" className="text-base px-8 py-3">
              شهري
            </TabsTrigger>
            <TabsTrigger value="yearly" className="text-base px-8 py-3">
              سنوي <span className="mr-2 text-primary">وفر 17%</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <div className="grid lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 ${pkg.recommended
                      ? "bg-primary/5 border-2 border-primary shadow-2xl scale-105"
                      : "bg-card border border-border"
                    }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      الأكثر طلباً
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-2">
                      {pkg.monthlyPrice !== "مجاني" && (
                        <>
                          <h1 className="text-5xl font-bold flex items-center gap-2">
                            <CurrencyDisplay amount={parseFloat(pkg.monthlyPrice)} showIcon={true} className="text-5xl" iconSize={32} />
                          </h1>
                          <span className="text-muted-foreground">/شهر</span>
                        </>
                      )}
                      {pkg.monthlyPrice === "مجاني" && (
                        <span className="text-5xl font-bold text-primary">مجاناً</span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={pkg.recommended ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleSubscribe(pkg.planKey)}
                    disabled={isCurrentPlan(pkg.planKey)}
                  >
                    {isCurrentPlan(pkg.planKey)
                      ? "الباقة الحالية"
                      : pkg.monthlyPrice === "مجاني"
                        ? "ابدأ الآن مجاناً"
                        : "اشترك الآن"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly">
            <div className="grid lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 ${pkg.recommended
                      ? "bg-primary/5 border-2 border-primary shadow-2xl scale-105"
                      : "bg-card border border-border"
                    } ${isCurrentPlan(pkg.planKey) ? "ring-4 ring-primary/50" : ""}`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      الأكثر شعبية
                    </div>
                  )}
                  {isCurrentPlan(pkg.planKey) && (
                    <div className="absolute -top-4 left-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                      باقتك الحالية
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-2">
                      {pkg.yearlyPrice !== "مجاني" && (
                        <>
                          <h1 className="text-5xl font-bold flex items-center gap-2">
                            <CurrencyDisplay amount={parseFloat(pkg.yearlyPrice)} showIcon={true} className="text-5xl" iconSize={32} />
                          </h1>
                          <span className="text-muted-foreground">/سنة</span>
                        </>
                      )}
                      {pkg.yearlyPrice === "مجاني" && (
                        <span className="text-5xl font-bold text-primary">مجاناً</span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={pkg.recommended ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleSubscribe(pkg.planKey)}
                    disabled={isCurrentPlan(pkg.planKey)}
                  >
                    {isCurrentPlan(pkg.planKey)
                      ? "الباقة الحالية"
                      : pkg.yearlyPrice === "مجاني"
                        ? "ابدأ الآن مجاناً"
                        : "اشترك الآن"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            هل لديك احتياجات خاصة؟ تواصل معنا لباقة مخصصة
          </p>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            تواصل معنا
          </Button>
        </div>
      </div>
    </section>
  );
};
