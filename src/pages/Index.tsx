import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Architecture from "@/components/landing/Architecture";
import TechStack from "@/components/landing/TechStack";
import DemoHighlight from "@/components/landing/DemoHighlight";
import WaitlistSignup from "@/components/landing/WaitlistSignup";
import CTAStrip from "@/components/landing/CTAStrip";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <Architecture />
        <TechStack />
        <DemoHighlight />
        <WaitlistSignup />
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
