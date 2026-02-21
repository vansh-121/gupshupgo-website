import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";

const headline = "Talk. Vibe. Connect. Anywhere.";
const badges = ["Flutter 3.5", "Firebase", "Agora RTC", "Open Source", "MIT License"];

function PhoneMockup() {
  return (
    <div className="relative animate-float">
      {/* Glow behind phone */}
      <div className="absolute -inset-8 bg-indigo/10 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute -inset-12 bg-teal/5 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] rounded-[40px] border border-border bg-card/80 backdrop-blur-sm p-3 shadow-2xl neon-glow">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl" />
        {/* Screen */}
        <div className="w-full h-full rounded-[32px] bg-background overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 pt-8 pb-3 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo to-indigo-deep flex items-center justify-center text-xs font-bold text-primary-foreground">G</div>
            <div>
              <div className="text-xs font-semibold text-foreground">GupShupGo</div>
              <div className="text-[10px] text-teal flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block animate-pulse-subtle" />
                online
              </div>
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
              <div className="bg-gradient-to-r from-indigo to-indigo-deep rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-primary-foreground">Yep, joining now!</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-foreground">Crystal clear as always ✨</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-indigo to-indigo-deep rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
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

function DotGrid() {
  return (
    <div className="absolute inset-0 dot-grid opacity-30 dark:opacity-20 pointer-events-none" />
  );
}

function FloatingOrbs() {
  return (
    <>
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-indigo/8 rounded-full blur-[100px] animate-pulse-subtle" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal/6 rounded-full blur-[120px] animate-pulse-subtle" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-deep/4 rounded-full blur-[150px]" />
    </>
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
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-label="Hero" className="grain relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <DotGrid />
        <FloatingOrbs />
      </div>
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Version badge */}
            <div className="flex justify-center lg:justify-start mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium border border-border rounded-full px-4 py-1.5 bg-card/50 backdrop-blur-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse-subtle" />
                v1.0 Beta — Now Live
              </span>
            </div>

            <h1 className="display-font text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-bold tracking-[-0.04em] leading-[1.1] mb-6">
              {headline.split(" ").map((word, wi) => {
                const charOffset = headline.split(" ").slice(0, wi).join(" ").length + (wi > 0 ? 1 : 0);
                return (
                  <span key={wi} className="inline-block mr-[0.25em] whitespace-nowrap">
                    {word.split("").map((char, ci) => {
                      const globalIdx = charOffset + ci;
                      return (
                        <span
                          key={ci}
                          className={`inline-block transition-all duration-300 ease-out ${
                            globalIdx < visibleChars
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-3"
                          } ${char === "." ? "gradient-text" : ""}`}
                          style={{ transitionDelay: `${globalIdx * 25}ms` }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              A production-ready Flutter app with HD video calling, real-time
              messaging and status updates. Built for people who actually use
              their phones.
            </p>

            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-indigo to-indigo-deep hover:opacity-90 text-primary-foreground shadow-lg shadow-indigo/20 transition-all duration-300 hover:shadow-indigo/30 hover:scale-[1.02]"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  Watch Demo <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-border text-muted-foreground hover:text-foreground hover:border-indigo transition-all duration-300"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Source
                </a>
              </Button>
            </div>

            {/* Play Store */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="glow-card inline-flex items-center gap-3 bg-card/60 backdrop-blur-sm border border-border rounded-xl px-5 py-3.5 transition-all duration-300 hover:border-teal/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center flex-shrink-0">
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
                  className="text-[11px] text-muted-foreground border border-border rounded-full px-3.5 py-1 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-indigo/30 hover:text-foreground"
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
