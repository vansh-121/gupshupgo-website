import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";

const headline = "Talk. Vibe. Connect. Anywhere.";
const badges = ["Flutter 3.5", "Firebase", "Agora RTC", "Open Source", "MIT License"];

function PhoneMockup() {
  return (
    <div className="relative animate-float">
      <div className="w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] rounded-[40px] border-2 border-border bg-card p-3 shadow-2xl shadow-indigo/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl" />
        {/* Screen */}
        <div className="w-full h-full rounded-[32px] bg-background overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 pt-8 pb-3 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo/20 flex items-center justify-center text-xs font-bold text-indigo">G</div>
            <div>
              <div className="text-xs font-semibold text-foreground">GupShupGo</div>
              <div className="text-[10px] text-teal">online</div>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 px-3 py-4 space-y-3 overflow-hidden">
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-foreground">Hey! Ready for the call? 🎥</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-indigo rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-primary-foreground">Yep, joining now!</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-foreground">Crystal clear as always ✨</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-indigo rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-primary-foreground">Agora does its magic 🚀</p>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="px-3 pb-3">
            <div className="bg-secondary rounded-full px-4 py-2 flex items-center">
              <span className="text-[10px] text-muted-foreground">Type a message...</span>
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
    <section className="grain relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.05] mb-6">
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

            {/* Beta Badge */}
            <div className="flex justify-center lg:justify-start mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo/10 text-indigo border border-indigo/20 rounded-full px-3.5 py-1.5 animate-pulse">
                <Sparkles className="w-3 h-3" />
                Currently in Beta Testing
              </span>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              A production-ready Flutter app with HD video calling, real-time
              messaging and status updates. Built for people who actually use
              their phones.
            </p>

            <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
              <Button
                size="lg"
                className="gap-2 bg-indigo hover:bg-indigo/90 text-primary-foreground"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  Watch Demo <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Source
                </a>
              </Button>
            </div>

            {/* Play Store Hype */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 9.191l-2.302 2.302L5.864 2.658z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Coming Soon on Google Play</p>
                  <p className="text-[10px] text-muted-foreground">Be the first to download — stay tuned!</p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1"
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
