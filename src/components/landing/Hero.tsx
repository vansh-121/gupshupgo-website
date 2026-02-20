import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Phone, Video, Mic, MicOff } from "lucide-react";

const headline = "Talk. Vibe. Connect. Anywhere.";
const badges = ["Flutter 3.5", "Firebase", "Agora RTC", "Open Source", "MIT License"];

function PhoneMockup() {
  const [typingDot, setTypingDot] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTypingDot((p) => (p + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative animate-float">
      {/* Glow behind phone */}
      <div className="absolute -inset-10 bg-primary/8 blur-3xl rounded-full" />
      
      <div className="relative w-[280px] h-[560px] rounded-[44px] border-2 border-border/60 bg-card p-3 shadow-2xl shadow-primary/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="w-full h-full rounded-[36px] bg-background overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 pt-8 pb-3 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">G</div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-foreground">GupShupGo</div>
              <div className="text-[10px] text-accent font-medium">online</div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
              <Video className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 px-3 py-4 space-y-3 overflow-hidden">
            <MessageBubble side="left" delay={800}>Hey! Ready for the call? 🎥</MessageBubble>
            <MessageBubble side="right" delay={1600}>Yep, joining now!</MessageBubble>
            <MessageBubble side="left" delay={2400}>Crystal clear as always ✨</MessageBubble>
            <MessageBubble side="right" delay={3200}>Agora does its magic 🚀</MessageBubble>
            <MessageBubble side="left" delay={4000}>Let's ship it 🔥</MessageBubble>
          </div>
          {/* Input */}
          <div className="px-3 pb-4">
            <div className="bg-muted rounded-full px-4 py-2.5 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                Type a message{".".repeat(typingDot)}
              </span>
              <Mic className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ side, delay, children }: { side: "left" | "right"; delay: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`flex ${side === "right" ? "justify-end" : "justify-start"} transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div
        className={`${
          side === "right"
            ? "bg-primary rounded-2xl rounded-tr-sm"
            : "bg-muted rounded-2xl rounded-tl-sm"
        } px-3.5 py-2 max-w-[80%]`}
      >
        <p className={`text-[11px] ${side === "right" ? "text-primary-foreground" : "text-foreground"}`}>
          {children}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= headline.length) {
          clearInterval(timer);
          setTimeout(() => setShowContent(true), 200);
          return prev;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grain relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 max-w-3xl">
            {/* Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-8 transition-all duration-700 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                Open Source · Production Ready
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-[-0.04em] leading-[0.95] mb-8">
              {headline.split("").map((char, i) => (
                <span
                  key={i}
                  className={`inline-block transition-all duration-300 ease-out ${
                    i < visibleChars
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${i * 18}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <p
              className={`text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl transition-all duration-700 delay-100 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              A production-ready Flutter app with HD video calling, real-time
              messaging and status updates. Built for people who actually use
              their phones.
            </p>

            <div
              className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-200 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-7 text-[15px] font-semibold rounded-xl shadow-lg shadow-primary/20"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  Watch Demo <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2.5 h-12 px-7 text-[15px] font-semibold rounded-xl border-border text-foreground hover:border-primary/40 hover:text-primary"
                asChild
              >
                <a href="https://github.com/vansh-121/GupShupGo" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Source
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div
              className={`flex flex-wrap gap-2.5 transition-all duration-700 delay-300 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-xs text-muted-foreground border border-border rounded-full px-3.5 py-1.5 hover:border-primary/30 hover:text-foreground transition-colors duration-200"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div
            className={`flex-shrink-0 transition-all duration-1000 delay-500 ${
              showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[800ms] ${
        showContent ? "opacity-60" : "opacity-0"
      }`}>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
