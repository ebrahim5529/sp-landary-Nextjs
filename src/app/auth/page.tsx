"use client";

const mockUser = { email: "user@example.com", id: "mock-user-id" };



import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function AuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
        const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);
    const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);

    useEffect(() => {
        const type = searchParams.get('type');
        if (type === 'recovery') {
            setIsRecoveryMode(true);
            setShowResetPassword(false);
        }
    }, [searchParams]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            { if (typeof window !== "undefined") localStorage.setItem("mockUser", JSON.stringify({ email: "mockUser@example.com" })); };
            toast.success("تم تسجيل الدخول بنجاح");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error("حدث خطأ أثناء تسجيل الدخول");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetLoading(true);
        setTimeout(() => {
            toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
            setShowResetPassword(false);
            setResetEmail("");
            setResetLoading(false);
        }, 1000);
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdatePasswordLoading(true);
        setTimeout(() => {
            toast.success("تم تحديث كلمة المرور بنجاح");
            router.push("/dashboard");
            setUpdatePasswordLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">الفرسان المغاسل</CardTitle>
                        <CardDescription>نظام إدارة المغاسل الاحترافي</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isRecoveryMode ? (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">تعيين كلمة مرور جديدة</h3>
                                    <p className="text-sm text-muted-foreground">
                                        أدخل كلمة المرور الجديدة
                                    </p>
                                </div>
                                <form onSubmit={handleUpdatePassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                                        <div className="relative">
                                            <Input
                                                id="new-password"
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="أدخل كلمة المرور الجديدة (6 أحرف على الأقل)"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                disabled={updatePasswordLoading}
                                                minLength={6}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute left-0 top-0 h-full px-3"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                disabled={updatePasswordLoading}
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirm-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="أعد إدخال كلمة المرور الجديدة"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                disabled={updatePasswordLoading}
                                                minLength={6}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute left-0 top-0 h-full px-3"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                disabled={updatePasswordLoading}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={updatePasswordLoading}>
                                        {updatePasswordLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                        تحديث كلمة المرور
                                    </Button>
                                </form>
                            </div>
                        ) : !showResetPassword ? (
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signin-email">البريد الإلكتروني</Label>
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="example@domain.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="signin-password">كلمة المرور</Label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setResetEmail(email);
                                                setShowResetPassword(true);
                                            }}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            نسيت كلمة المرور؟
                                        </button>
                                    </div>
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                    تسجيل الدخول
                                </Button>

                                <div className="text-center pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        ليس لديك حساب؟ سجّل الآن
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        asChild
                                    >
                                        <Link href="/signup">ابدأ الآن</Link>
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">إعادة تعيين كلمة المرور</h3>
                                    <p className="text-sm text-muted-foreground">
                                        أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
                                    </p>
                                </div>
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="reset-email">البريد الإلكتروني</Label>
                                        <Input
                                            id="reset-email"
                                            type="email"
                                            placeholder="example@domain.com"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            required
                                            disabled={resetLoading}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => {
                                                setShowResetPassword(false);
                                                setResetEmail("");
                                            }}
                                            disabled={resetLoading}
                                        >
                                            إلغاء
                                        </Button>
                                        <Button type="submit" className="flex-1" disabled={resetLoading}>
                                            {resetLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                            إرسال الرابط
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
