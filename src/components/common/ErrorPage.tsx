"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Lock,
  ShieldAlert,
  FileQuestion,
  ServerCrash,
  Home,
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface ErrorPageProps {
  errorCode: 401 | 403 | 404 | 500 | number;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
  customActions?: React.ReactNode;
}

const errorConfig: Record<number, {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  401: {
    icon: Lock,
    title: "غير مصرح لك بالوصول",
    description: "يجب عليك تسجيل الدخول للوصول إلى هذه الصفحة. يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى.",
    color: "text-amber-600 dark:text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
  403: {
    icon: ShieldAlert,
    title: "الوصول محظور",
    description: "ليس لديك الصلاحيات اللازمة للوصول إلى هذا المورد. إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بالمسؤول.",
    color: "text-red-600 dark:text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
  404: {
    icon: FileQuestion,
    title: "الصفحة غير موجودة",
    description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يرجى التحقق من الرابط والمحاولة مرة أخرى.",
    color: "text-blue-600 dark:text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  500: {
    icon: ServerCrash,
    title: "خطأ في الخادم",
    description: "حدث خطأ داخلي في الخادم. نحن نعمل على إصلاح المشكلة. يرجى المحاولة مرة أخرى لاحقاً.",
    color: "text-purple-600 dark:text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
};

export function ErrorPage({
  errorCode,
  title,
  description,
  showHomeButton = true,
  showRefreshButton = true,
  customActions,
}: ErrorPageProps) {
  const router = useRouter();
  const config = errorConfig[errorCode] || {
    icon: AlertTriangle,
    title: title || "حدث خطأ",
    description: description || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
  };

  const Icon = config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4" dir="rtl">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center pb-4">
          <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${config.bgColor}`}>
            <Icon className={`h-12 w-12 ${config.color}`} />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-6xl font-bold text-gray-900 dark:text-gray-100">
              {errorCode}
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {displayTitle}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed px-4">
            {displayDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            {showHomeButton && (
              <Button
                onClick={handleGoHome}
                size="lg"
                className="w-full sm:w-auto min-w-[140px]"
                style={{ backgroundColor: "rgb(30, 64, 175)" }}
              >
                <Home className="ml-2 h-4 w-4" />
                العودة للرئيسية
              </Button>
            )}

            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[140px]"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للخلف
            </Button>

            {showRefreshButton && (
              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto min-w-[140px]"
              >
                <RefreshCw className="ml-2 h-4 w-4" />
                إعادة التحميل
              </Button>
            )}

            {customActions}
          </div>

          {errorCode === 401 && (
            <div className="pt-4 border-t">
              <Button
                onClick={() => router.push("/auth")}
                variant="link"
                className="text-base"
                style={{ color: "rgb(30, 64, 175)" }}
              >
                تسجيل الدخول
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
