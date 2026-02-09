import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
