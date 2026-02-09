export const Stats = () => {
  const stats = [
    {
      icon: "https://loyapro.com/assets/guest/images/boy-with-shopping-bags.svg",
      number: "+500",
      label: "مغسلة تستخدم البرنامج",
    },
    {
      icon: "https://loyapro.com/assets/guest/images/girl-getting-digital-receipt.svg",
      number: "+100K",
      label: "طلب تمت معالجته شهرياً",
    },
    {
      icon: "https://loyapro.com/assets/guest/images/boy-using-gift-card.svg",
      number: "40%",
      label: "توفير في الوقت والجهد",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
            لماذا برنامج SP؟
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            أرقام تتحدث عن نجاحنا
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            برنامجنا يساعد المئات من المغاسل على تحسين كفاءتها وزيادة أرباحها. نظام متكامل
            يوفر لك الوقت والجهد ويساعدك على التركيز على تطوير عملك ورضا عملائك
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-card hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-32 h-32 mx-auto mb-6"
              />
              <h3 className="text-4xl font-bold text-primary mb-3">
                {stat.number}
              </h3>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
