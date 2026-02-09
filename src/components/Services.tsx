import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Users, BarChart3, Settings, Clock, CreditCard } from "lucide-react";

export const Services = () => {
  const services = [
    {
      id: "orders",
      title: "إدارة الطلبات",
      icon: Package,
      name: "نظام إدارة الطلبات",
      description:
        "نظام متكامل لإدارة طلبات الغسيل من البداية للنهاية. تتبع حالة كل طلب، إدارة أولويات العمل، وإشعارات تلقائية للعملاء في كل مرحلة.",
      features: [
        "استقبال وتسجيل الطلبات بسهولة",
        "تتبع حالة الطلب بالوقت الفعلي",
        "باركود لكل طلب لسهولة التعرف",
        "إشعارات تلقائية للعملاء عبر SMS وواتساب",
        "جدولة مواعيد الاستلام والتسليم",
      ],
    },
    {
      id: "customers",
      title: "إدارة العملاء",
      icon: Users,
      name: "قاعدة بيانات العملاء",
      description:
        "احفظ جميع بيانات عملائك في مكان واحد آمن. تاريخ الطلبات، التفضيلات، برامج الولاء، والفواتير. كل ما تحتاجه لبناء علاقة قوية مع عملائك.",
      features: [
        "ملف شامل لكل عميل",
        "سجل كامل لطلبات العميل",
        "برنامج نقاط الولاء والخصومات",
        "تذكير تلقائي للعملاء المتكررين",
        "إدارة الاشتراكات الشهرية",
      ],
    },
    {
      id: "reports",
      title: "التقارير والتحليلات",
      icon: BarChart3,
      name: "لوحة تحكم تحليلية",
      description:
        "تقارير مالية وإحصائية شاملة لمساعدتك على اتخاذ قرارات ذكية. اطلع على الإيرادات، المصروفات، أداء الموظفين، وأكثر الخدمات طلباً.",
      features: [
        "تقارير مالية يومية وشهرية وسنوية",
        "تحليل الإيرادات والأرباح",
        "أداء الموظفين والفروع",
        "أكثر الخدمات والعملاء ربحية",
        "رسوم بيانية تفاعلية سهلة القراءة",
      ],
    },
    {
      id: "staff",
      title: "إدارة الموظفين",
      icon: Settings,
      name: "نظام الموظفين",
      description:
        "إدارة كاملة لموظفيك وصلاحياتهم. تتبع ساعات العمل، الأداء، والمهام المكلفين بها. نظام صلاحيات متقدم لحماية بياناتك.",
      features: [
        "إضافة وإدارة حسابات الموظفين",
        "صلاحيات مخصصة لكل موظف",
        "تتبع ساعات العمل والحضور",
        "متابعة أداء الموظفين",
        "إدارة المهام والمسؤوليات",
      ],
    },
    {
      id: "express",
      title: "الخدمة السريعة",
      icon: Clock,
      name: "نظام الأولويات",
      description:
        "ميز الطلبات العاجلة وأدرها بكفاءة. نظام تنبيهات ذكي يساعدك على تسليم الطلبات في الوقت المحدد وإرضاء عملائك.",
      features: [
        "تحديد أولوية الطلبات",
        "تنبيهات للطلبات العاجلة",
        "جدولة ذكية للعمل",
        "تتبع مدة إنجاز كل طلب",
        "تقارير الالتزام بالمواعيد",
      ],
    },
    {
      id: "payments",
      title: "المدفوعات والفواتير",
      icon: CreditCard,
      name: "نظام مالي متكامل",
      description:
        "إدارة كاملة للمدفوعات والفواتير. دعم طرق دفع متعددة، فواتير احترافية، ومتابعة المستحققات والديون بسهولة.",
      features: [
        "فواتير إلكترونية احترافية",
        "دعم الدفع النقدي والإلكتروني",
        "متابعة المستحقات والديون",
        "تقارير مالية مفصلة",
        "ربط مع وسائل الدفع الإلكتروني",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
            مميزات البرنامج
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">كل ما تحتاجه لإدارة مغسلتك</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نظام شامل يغطي جميع جوانب إدارة المغاسل بكفاءة واحترافية
          </p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 h-auto bg-secondary/50 p-4 mb-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center gap-2 px-6 py-3"
                >
                  <Icon className="h-4 w-4" />
                  <span>{service.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {services.map((service) => {
            const Icon = service.icon;
            return (
              <TabsContent
                key={service.id}
                value={service.id}
                className="mt-8"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold">{service.name}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="aspect-video rounded-2xl bg-secondary/30 flex items-center justify-center">
                      <Icon className="h-32 w-32 text-primary/20" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
