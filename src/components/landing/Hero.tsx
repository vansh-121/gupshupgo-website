import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const headline = "Talk. Vibe. Connect. Anywhere.";
const badges = ["Flutter 3.5", "Firebase", "Agora RTC", "Open Source", "MIT License"];

function PhoneMockup() {
  return (
    <div className="relative animate-float">
      <div className="w-[260px] h-[520px] rounded-[40px] border-2 border-border bg-card p-3 shadow-2xl shadow-indigo/10">
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.05] mb-6">
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

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              A production-ready Flutter app with HD video calling, real-time
              messaging and status updates. Built for people who actually use
              their phones.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
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
