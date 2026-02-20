import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const headline = "Talk. Vibe. Connect. Anywhere.";
const badges = ["Flutter 3.5", "Firebase", "Agora RTC", "Open Source", "MIT License"];

function PhoneMockup() {
  return (
    <div className="relative animate-float">
      <div className="w-[280px] h-[560px] rounded-[44px] border border-border bg-card p-3.5 shadow-2xl shadow-primary/5">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-card rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="w-full h-full rounded-[36px] bg-background overflow-hidden flex flex-col border border-border/50">
          {/* Header */}
          <div className="px-4 pt-9 pb-3 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">G</div>
            <div>
              <div className="text-sm font-semibold text-foreground tracking-tight">GupShupGo</div>
              <div className="text-[10px] text-teal font-medium">online</div>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 px-3 py-4 space-y-3 overflow-hidden">
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[78%]">
                <p className="text-[11px] text-foreground leading-relaxed">Hey! Ready for the call? 🎥</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[78%]">
                <p className="text-[11px] text-primary-foreground leading-relaxed">Yep, joining now!</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[78%]">
                <p className="text-[11px] text-foreground leading-relaxed">Crystal clear as always ✨</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[78%]">
                <p className="text-[11px] text-primary-foreground leading-relaxed">Agora does its magic 🚀</p>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="px-3 pb-4">
            <div className="bg-secondary rounded-full px-4 py-2.5 flex items-center">
              <span className="text-[11px] text-muted-foreground">Type a message...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= headline.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grain relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.04] dark:bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Left content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Now open source — MIT Licensed
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[1.02] mb-7">
              {headline.split("").map((char, i) => (
                <span
                  key={i}
                  className={`inline-block transition-all duration-200 ease-out ${
                    i < visibleChars
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              A production-ready Flutter app with HD video calling, real-time
              messaging and status updates. Built for people who actually use
              their phones.
            </p>

            <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
              <Button
                size="lg"
                className="gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-7 text-[15px] font-semibold shadow-lg shadow-primary/20"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  Watch Demo <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2.5 rounded-xl h-12 px-7 text-[15px] font-semibold border-border text-foreground hover:bg-secondary"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Source
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-xs text-muted-foreground border border-border rounded-full px-3.5 py-1.5 bg-card/50 font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex-shrink-0">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
