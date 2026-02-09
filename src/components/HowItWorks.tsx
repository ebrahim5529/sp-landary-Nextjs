export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "سجل حسابك",
      description: "اختر الباقة المناسبة وسجل حسابك في دقائق. ابدأ تجربتك المجانية لمدة 14 يوم بدون الحاجة لبطاقة ائتمانية.",
    },
    {
      number: "02",
      title: "أضف بيانات مغسلتك",
      description: "أضف معلومات مغسلتك، الفروع، الخدمات، الأسعار، والموظفين. كل شيء جاهز للبدء.",
    },
    {
      number: "03",
      title: "ابدأ العمل مباشرة",
      description: "استقبل الطلبات، تابع العمليات، أدر العملاء والموظفين، واطلع على التقارير المالية الفورية.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
            آلية العمل
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold">كيف تبدأ مع البرنامج؟</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <span className="text-6xl font-bold text-primary/20">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="كيف تبدأ مع البرنامج"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
