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
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <WaitlistSignup />
        <FeatureGrid />
        <Architecture />
        <TechStack />
        <DemoHighlight />
        <CTAStrip />
      </main>
      <Footer />
    </>
  );
};

export default Index;
