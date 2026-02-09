import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, UserCheck, Database } from "lucide-react";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
            <p className="text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                مقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                نحن في مغاسل SP ملتزمون بحماية خصوصيتك وبياناتك الشخصية. تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.
              </p>
              <p>
                باستخدامك لموقعنا وخدماتنا، فإنك توافق على ممارسات جمع واستخدام المعلومات الموضحة في هذه السياسة.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                البيانات التي نجمعها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">البيانات الشخصية:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>الاسم الكامل</li>
                  <li>رقم الهاتف</li>
                  <li>البريد الإلكتروني</li>
                  <li>العنوان</li>
                  <li>معلومات الدفع (يتم تشفيرها)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">البيانات التقنية:</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>عنوان IP</li>
                  <li>نوع المتصفح</li>
                  <li>نظام التشغيل</li>
                  <li>معلومات الجهاز</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                كيفية استخدام البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>نستخدم البيانات التي نجمعها للأغراض التالية:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>توفير وتحسين خدماتنا</li>
                <li>معالجة الطلبات والمدفوعات</li>
                <li>التواصل معك بشأن طلباتك</li>
                <li>إرسال التحديثات والعروض الترويجية (بموافقتك)</li>
                <li>تحسين تجربة المستخدم</li>
                <li>الامتثال للالتزامات القانونية</li>
                <li>منع الاحتيال والأنشطة غير القانونية</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                حماية البيانات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                نتخذ إجراءات أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير:
              </p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>تشفير البيانات الحساسة</li>
                <li>استخدام بروتوكولات أمنية متقدمة (SSL/TLS)</li>
                <li>الوصول المحدود للبيانات فقط للموظفين المصرح لهم</li>
                <li>مراجعة دورية لأنظمتنا الأمنية</li>
                <li>نسخ احتياطي آمن للبيانات</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                حقوقك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>وفقاً لنظام حماية البيانات الشخصية السعودي، لديك الحقوق التالية:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>الحق في الاطلاع على بياناتك الشخصية</li>
                <li>الحق في تصحيح البيانات غير الدقيقة</li>
                <li>الحق في حذف بياناتك الشخصية</li>
                <li>الحق في الاعتراض على معالجة بياناتك</li>
                <li>الحق في نقل بياناتك</li>
                <li>الحق في سحب الموافقة في أي وقت</li>
              </ul>
              <p>
                لممارسة أي من هذه الحقوق، يرجى التواصل معنا على: <a href="mailto:privacy@splaundry.com" className="text-primary hover:underline">privacy@splaundry.com</a>
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>مشاركة البيانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>لا نبيع بياناتك الشخصية لأطراف ثالثة. قد نشارك بياناتك فقط في الحالات التالية:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>مع مقدمي الخدمات الموثوقين الذين يساعدوننا في تشغيل موقعنا (مع ضمان حماية بياناتك)</li>
                <li>عندما يكون ذلك مطلوباً بموجب القانون السعودي</li>
                <li>لحماية حقوقنا وممتلكاتنا وأمننا</li>
                <li>مع موافقتك الصريحة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ملفات تعريف الارتباط (Cookies)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>التغييرات على السياسة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                قد نحدث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على موقعنا.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>التواصل معنا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه، يرجى التواصل معنا:
              </p>
              <ul className="space-y-2">
                <li>البريد الإلكتروني: <a href="mailto:privacy@splaundry.com" className="text-primary hover:underline">privacy@splaundry.com</a></li>
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
                نحن ملتزمون بالامتثال الكامل لنظام حماية البيانات الشخصية الصادر بموجب المرسوم الملكي رقم (م/19) وتاريخ 9/2/1443هـ، ونظام التجارة الإلكترونية السعودي، وجميع القوانين واللوائح المعمول بها في المملكة العربية السعودية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

