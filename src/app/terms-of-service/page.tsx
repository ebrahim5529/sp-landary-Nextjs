import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from "lucide-react";

export const metadata = {
    title: "شروط الاستخدام - الفرسان المغاسل",
    description: "شروط وأحكام استخدام نظام الفرسان المغاسل وفقاً للأنظمة المعمول بها في المملكة العربية السعودية.",
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-20 mt-12 md:mt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Scale className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h1 className="text-4xl font-bold mb-4">شروط الاستخدام</h1>
                        <p className="text-muted-foreground">
                            آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                القبول بالشروط
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                مرحباً بك في موقع الفرسان المغاسل. باستخدامك لموقعنا وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام موقعنا.
                            </p>
                            <p>
                                هذه الشروط تخضع للقوانين والأنظمة المعمول بها في المملكة العربية السعودية.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                استخدام الخدمة
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">الشروط والأحكام:</h3>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                    <li>يجب أن تكون 18 عاماً أو أكثر لاستخدام خدماتنا</li>
                                    <li>يجب أن تقدم معلومات دقيقة وصحيحة عند التسجيل</li>
                                    <li>أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور</li>
                                    <li>يجب إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك</li>
                                    <li>يجب استخدام الخدمة فقط للأغراض القانونية</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <XCircle className="h-5 w-5" />
                                المحظورات
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>يحظر عليك:</p>
                            <ul className="list-disc list-inside space-y-1 mr-4">
                                <li>استخدام الموقع لأي غرض غير قانوني أو غير مصرح به</li>
                                <li>محاولة الوصول غير المصرح به إلى أنظمتنا أو حسابات المستخدمين الآخرين</li>
                                <li>إرسال أو نشر أي محتوى مسيء أو غير قانوني أو مخالف للشريعة الإسلامية</li>
                                <li>استخدام الموقع لإلحاق الضرر أو التسبب في إزعاج لأي شخص</li>
                                <li>نسخ أو توزيع أو تعديل أي جزء من الموقع دون إذن كتابي</li>
                                <li>استخدام أي برنامج أو أداة تلقائية للوصول إلى الموقع</li>
                                <li>انتحال هوية أي شخص أو كيان</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>الطلبات والدفع</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">الأسعار:</h3>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                    <li>جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة (VAT)</li>
                                    <li>نحتفظ بالحق في تغيير الأسعار في أي وقت دون إشعار مسبق</li>
                                    <li>الأسعار المعروضة على الموقع نهائية عند تأكيد الطلب</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">طرق الدفع:</h3>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                    <li>نقبل الدفع النقدي عند الاستلام</li>
                                    <li>نقبل البطاقات الائتمانية والمدفوعة مسبقاً</li>
                                    <li>نقبل التحويلات البنكية</li>
                                    <li>نقبل طرق الدفع الإلكترونية المعتمدة في المملكة</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">الاسترجاع والاستبدال:</h3>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                    <li>يمكنك إلغاء الطلب قبل بدء المعالجة</li>
                                    <li>في حالة وجود عيب في الخدمة، سنقوم بإعادة الخدمة مجاناً</li>
                                    <li>لا يمكن استرجاع المبالغ المدفوعة بعد إتمام الخدمة إلا في حالات استثنائية</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                المسؤولية والضمان
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">مسؤوليتنا:</h3>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                    <li>نلتزم بتقديم خدمات عالية الجودة</li>
                                    <li>نحافظ على أمان بياناتك الشخصية</li>
                                    <li>نعالج طلباتك في الوقت المحدد</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">حدود المسؤولية:</h3>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                    <li>لا نتحمل مسؤولية أي أضرار غير مباشرة أو عرضية</li>
                                    <li>لا نتحمل مسؤولية فقدان أو تلف الملابس بسبب سوء الاستخدام من قبل العميل</li>
                                    <li>مسؤوليتنا محدودة بقيمة الخدمة المقدمة</li>
                                    <li>لا نتحمل مسؤولية أي تأخير بسبب ظروف خارجة عن إرادتنا</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>الملكية الفكرية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                جميع المحتويات الموجودة على الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، محمية بحقوق الطبع والنشر والملكية الفكرية. لا يجوز نسخ أو توزيع أو تعديل أي من هذه المحتويات دون إذن كتابي منا.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                إلغاء الحساب
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                يحق لنا إلغاء أو تعليق حسابك في أي وقت إذا انتهكت هذه الشروط أو إذا كان هناك أي نشاط مشبوه أو غير قانوني. كما يحق لك إلغاء حسابك في أي وقت من خلال التواصل معنا.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>التعديلات على الشروط</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على موقعنا. استمرار استخدامك للخدمة بعد التعديلات يعني موافقتك على الشروط المحدثة.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>القانون الحاكم</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن هذه الشروط سيتم حله في محاكم المملكة العربية السعودية.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>التواصل معنا</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، يرجى التواصل معنا:
                            </p>
                            <ul className="space-y-2">
                                <li>البريد الإلكتروني: <a href="mailto:legal@splaundry.com" className="text-primary hover:underline">legal@splaundry.com</a></li>
                                <li>الهاتف: +966 50 XXX XXXX</li>
                                <li>العنوان: المملكة العربية السعودية</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>الامتثال للقوانين السعودية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                نحن ملتزمون بالامتثال الكامل لنظام التجارة الإلكترونية السعودي، ونظام حماية المستهلك، وجميع القوانين واللوائح المعمول بها في المملكة العربية السعودية، بما في ذلك الشريعة الإسلامية.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}
