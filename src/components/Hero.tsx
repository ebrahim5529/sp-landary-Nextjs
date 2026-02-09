import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right space-y-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">
              برنامج SP لإدارة المغاسل
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              نظام إدارة متكامل{" "}
              <span className="text-primary">لمغسلتك</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              برنامج سحابي شامل لإدارة المغاسل يساعدك على تنظيم الطلبات، متابعة العملاء، 
              إدارة الموظفين، وتحليل الأرباح. كل ما تحتاجه لإدارة مغسلتك بكفاءة واحترافية
            </p>
            <Button size="lg" className="text-lg px-8 py-6 font-bold group">
              ابدأ تجربتك المجانية
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
              alt="برنامج SP لإدارة المغاسل - نظام إدارة متكامل"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
