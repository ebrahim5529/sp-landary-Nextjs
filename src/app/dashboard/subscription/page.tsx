"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Calendar, CheckCircle2 } from "lucide-react";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

const PLANS = {
    professional: {
        priceId: 'price_1SV51fBMKHJ2qek1v6FKkFVn',
        productId: 'prod_TRyzajtYoSG8Ni',
        name: 'الباقة الاحترافية',
        price: '299 ريال/شهر',
    },
    enterprise: {
        priceId: 'price_1SV523BMKHJ2qek1IXVE4ivj',
        productId: 'prod_TRz0RHcfRacoyk',
        name: 'الباقة المؤسسية',
        price: '799 ريال/شهر',
    },
};

export default function SubscriptionPage() {
    const { subscription: mockSubscription, checkSubscription } = useAuth();

    const handleManageSubscription = async () => {
        toast.info("هذه الميزة معطلة في بيئة العرض فقط", {
            description: "إدارة الاشتراك",
        });
    };

    const handleSubscribe = async (priceId: string) => {
        toast.info("هذه الميزة معطلة في بيئة العرض فقط", {
            description: "الاشتراك",
        });
    };

    const getCurrentPlanInfo = () => {
        if (mockSubscription?.status === 'trial') {
            return {
                name: 'الباقة التجريبية',
                price: 'مجاني',
                badge: 'تجريبي',
                badgeVariant: 'secondary' as const,
            };
        }

        if (mockSubscription?.product_id === PLANS.professional.productId) {
            return {
                ...PLANS.professional,
                badge: 'نشط',
                badgeVariant: 'default' as const,
            };
        }

        if (mockSubscription?.product_id === PLANS.enterprise.productId) {
            return {
                ...PLANS.enterprise,
                badge: 'نشط',
                badgeVariant: 'default' as const,
            };
        }

        return null;
    };

    const currentPlan = getCurrentPlanInfo();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">إدارة الاشتراك</h1>
                <p className="text-muted-foreground mt-2">
                    عرض وإدارة تفاصيل اشتراكك الحالي
                </p>
            </div>

            {currentPlan && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
                                <CardDescription className="mt-2">
                                    اشتراكك الحالي
                                </CardDescription>
                            </div>
                            <Badge variant={currentPlan.badgeVariant}>
                                {currentPlan.badge}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">السعر</p>
                                {currentPlan.price === "مجاني" ? (
                                    <p className="text-xl font-bold">{currentPlan.price}</p>
                                ) : (
                                    <h1 className="text-xl font-bold flex items-center gap-2">
                                        <CurrencyDisplay amount={parseFloat(currentPlan.price.replace(" ريال/شهر", ""))} showIcon={true} />
                                        <span className="text-muted-foreground">/شهر</span>
                                    </h1>
                                )}
                            </div>
                        </div>

                        {mockSubscription?.subscription_end && (
                            <div className="flex items-center gap-4">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">تاريخ التجديد القادم</p>
                                    <p className="font-medium">
                                        {new Date(mockSubscription.subscription_end).toLocaleDateString('ar-SA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">الحالة</p>
                                <p className="font-medium">
                                    {mockSubscription?.status === 'active' ? 'نشط' : 'تجريبي'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {mockSubscription?.status === 'active' ? (
                                <Button onClick={handleManageSubscription}>
                                    إدارة الاشتراك
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => handleSubscribe(PLANS.professional.priceId)}
                                        variant="default"
                                    >
                                        ترقية للباقة الاحترافية
                                    </Button>
                                    <Button
                                        onClick={() => handleSubscribe(PLANS.enterprise.priceId)}
                                        variant="outline"
                                    >
                                        ترقية للباقة المؤسسية
                                    </Button>
                                </>
                            )}
                            <Button
                                onClick={checkSubscription}
                                variant="outline"
                            >
                                <Loader2 className="mr-2 h-4 w-4" />
                                تحديث حالة الاشتراك
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>الباقات المتاحة</CardTitle>
                    <CardDescription>
                        قم بترقية اشتراكك للوصول إلى المزيد من الميزات
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className={mockSubscription?.product_id === PLANS.professional.productId ? "border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>{PLANS.professional.name}</CardTitle>
                                <CardDescription className="text-2xl font-bold flex items-center gap-2">
                                    <CurrencyDisplay amount={299} showIcon={true} className="text-2xl" iconSize={24} />
                                    <span className="text-muted-foreground">/شهر</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>✓ حتى 3 فروع</li>
                                    <li>✓ طلبات غير محدودة</li>
                                    <li>✓ 10 مستخدمين</li>
                                    <li>✓ جميع التقارير والتحليلات</li>
                                    <li>✓ دعم فني 24/7</li>
                                </ul>
                                {mockSubscription?.product_id !== PLANS.professional.productId && (
                                    <Button
                                        className="w-full mt-4"
                                        onClick={() => handleSubscribe(PLANS.professional.priceId)}
                                    >
                                        اختر هذه الباقة
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        <Card className={mockSubscription?.product_id === PLANS.enterprise.productId ? "border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>{PLANS.enterprise.name}</CardTitle>
                                <CardDescription className="text-2xl font-bold flex items-center gap-2">
                                    <CurrencyDisplay amount={799} showIcon={true} className="text-2xl" iconSize={24} />
                                    <span className="text-muted-foreground">/شهر</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li>✓ فروع غير محدودة</li>
                                    <li>✓ طلبات غير محدودة</li>
                                    <li>✓ مستخدمين غير محدودين</li>
                                    <li>✓ جميع المميزات</li>
                                    <li>✓ دعم فني مخصص</li>
                                </ul>
                                {mockSubscription?.product_id !== PLANS.enterprise.productId && (
                                    <Button
                                        className="w-full mt-4"
                                        onClick={() => handleSubscribe(PLANS.enterprise.priceId)}
                                    >
                                        اختر هذه الباقة
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
