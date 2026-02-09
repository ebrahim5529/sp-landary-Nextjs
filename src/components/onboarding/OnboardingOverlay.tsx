import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StepsIndicator } from "./StepsIndicator";
import { RegistrationForm } from "./RegistrationForm";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface RegistrationRequest {
  id: string;
  status: "pending" | "approved" | "rejected";
}

export function OnboardingOverlay() {
  const { mockUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<RegistrationRequest | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    checkRegistrationStatus();
  }, [mockUser]);

  const checkRegistrationStatus = async () => {
    if (!mockUser) {
      setOpen(false);
      setLoading(false);
      return;
    }

    // Backend removal cleanup - mock status check
    try {
      // Mock that mockUser is not yet registered to show onboarding
      setOpen(true);
      setCurrentStep(1);
    } catch (error) {
      console.error("Error checking registration status:", error);
      setOpen(true);
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setCurrentStep(3);
    checkRegistrationStatus(); // Refresh status
  };

  // Don't render until loading is complete
  if (loading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={() => { }} modal={true}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 4 ? "تم تفعيل حسابك بنجاح!" : "إكمال بيانات التسجيل"}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 4
                ? "تهانينا! يمكنك الآن البدء في استخدام النظام"
                : "يرجى إكمال البيانات التالية للبدء في استخدام النظام"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep !== 4 && (
              <StepsIndicator currentStep={currentStep} totalSteps={3} />
            )}

            {currentStep === 1 && (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold">تم التسجيل/الدخول بنجاح</h3>
                <p className="text-muted-foreground">
                  يرجى إكمال البيانات التالية للبدء في استخدام النظام
                </p>
                <Button onClick={() => setCurrentStep(2)} className="mt-4">
                  التالي
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">الخطوة 2: إكمال البيانات</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    يرجى ملء جميع الحقول التالية لإتمام عملية التسجيل
                  </p>
                </div>
                <RegistrationForm onSuccess={handleFormSuccess} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold">قيد الانتظار - التحقق من البيانات</h3>
                <p className="text-muted-foreground">
                  تم إرسال بياناتك بنجاح. جاري التحقق من البيانات من قبل الأدمن.
                  <br />
                  سيتم تفعيل حسابك بعد التحقق من البيانات وستتمكن من استخدام النظام بالكامل.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  يمكنك تحديث الصفحة للتحقق من حالة التفعيل
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold">تهانينا! تم قبول طلبك</h3>
                <p className="text-muted-foreground">
                  تم قبول طلب تسجيلك بنجاح. يمكنك الآن البدء في استخدام النظام بالكامل.
                  <br />
                  نتمنى لك تجربة ممتعة معنا!
                </p>
                <Button
                  onClick={() => {
                    // Set a flag in localStorage to prevent showing overlay again
                    localStorage.setItem('onboarding_completed', 'true');
                    setOpen(false);
                    // Refresh the page after a short delay to ensure state is saved
                    setTimeout(() => {
                      if (typeof window !== 'undefined') {
                        window.location.reload();
                      }
                    }, 100);
                  }}
                  className="mt-4"
                  size="lg"
                >
                  ابدأ في استخدام النظام
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

